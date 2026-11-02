// Scroll-jank measurement for the Harbor 3D story homepage.
//
// usage (Windows node, from WSL): node.exe perf-jank.mjs <baseUrl> <outJson(win path)> <desktop|mobile> <label> [wslLoadavg]
//
// One run per invocation: a fresh page, the same scripted scroll pattern every time. Three measured segments:
//  pattern (from the top, identical to the reference "A" runs):
//   desktop: 1440x900, mouse wheel. 40 steps of 120px at 60ms, a fast flick (12 x 400px at 16ms),
//            a slow drag (40 x 40px at 80ms), then 40 steps of 120px at 60ms again.
//   mobile:  390x844, touch emulation, raw CDP touch events: 14 swipes of 560px over 200ms,
//            one fast flick (560px over 60ms), one slow drag (500px over 1.6s), 14 more swipes.
//  buildWheel (through the #build chapter):
//   desktop: from the report chapter's settled position, 120px wheel steps at 60ms until past the
//            workflow chapter's settled position (the whole build chapter: crane lift, slew, lower).
//   mobile:  from 300px above the #build article, 8 swipes of 560px over 200ms.
//  buildJump (a jump to #build):
//   desktop: from the find chapter, a click on an in-page #build link (story jump: Lenis
//            scrollTo when it runs, native smooth scrolling otherwise).
//   mobile:  from the top of the story, a click on an in-page <a href="#build"> (same-page anchor).
// Each segment is measured over its scroll window plus 1.5 s settle:
//  - long tasks (PerformanceObserver "longtask"): count, total, worst
//  - renders: window.__perf counters (only in a measurement build instrumented on purpose)
//  - rAF frame times: average fps, p5 fps (= 1000 / 95th-percentile frame time),
//    1% low (= 1000 / 99th-percentile frame time), frames over 50 ms
// Software WebGL (SwiftShader) is used, as in the screenshot runs: absolute fps is low; compare before/after only.
import { chromium } from "file:///C:/Users/User/shot-tool/node_modules/playwright-core/index.mjs";
import fs from "fs";
import os from "os";
import { execSync } from "child_process";

const [base, outFile, kind = "desktop", label = "run", wslLoad = ""] = process.argv.slice(2);
const exe = process.env.LOCALAPPDATA + "\\ms-playwright\\chromium_headless_shell-1228\\chrome-headless-shell-win64\\chrome-headless-shell.exe";
const mobile = kind === "mobile";
const vp = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };

function windowsCpuPercent() {
  try {
    return Number(execSync('powershell -NoProfile -Command "(Get-CimInstance Win32_Processor | Measure-Object -Property LoadPercentage -Average).Average"', { timeout: 15000 }).toString().trim());
  } catch {
    return null;
  }
}

const load = { wslLoadavg: wslLoad, windowsCpuBefore: windowsCpuPercent(), osLoadavg: os.loadavg() };
const b = await chromium.launch({ executablePath: exe, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
await p.goto(`${base}/en`, { waitUntil: "load", timeout: 120000 });
let state = null;
// "fallback" is also the server-rendered value before the 3D starts: accept it only if it persists for 6 s.
for (let i = 0, since = 0; i < 200; i++) {
  state = await p.evaluate(() => document.querySelector("[data-harbor3d]")?.getAttribute("data-harbor3d"));
  if (state === "ready" || state === "error") break;
  since = state === "fallback" ? since + 1 : 0;
  if (since >= 24) break;
  await p.waitForTimeout(250);
}
await p.waitForTimeout(3000);
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(800);

// Long tasks and scroll events are collected for the whole page; each segment reads its own window.
await p.evaluate(() => {
  const w = window;
  w.__jankAll = { long: [], scrolls: 0 };
  new PerformanceObserver((list) => list.getEntries().forEach((e) => w.__jankAll.long.push({ t: e.startTime, d: e.duration }))).observe({ type: "longtask" });
  window.addEventListener("scroll", () => (w.__jankAll.scrolls += 1), { passive: true });
});

async function startSegment() {
  await p.evaluate(() => {
    const w = window;
    w.__jank = { frames: [], t0: performance.now(), scrolls0: w.__jankAll.scrolls, renders0: { ...(w.__perf ?? {}) } };
    let last = performance.now();
    const j = w.__jank;
    const tick = (t) => {
      if (j.stop) return;
      j.frames.push(t - last);
      last = t;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

async function endSegment() {
  return p.evaluate(() => {
    const w = window;
    const j = w.__jank;
    j.stop = true;
    const now = performance.now();
    const dur = now - j.t0;
    const long = w.__jankAll.long.filter((e) => e.t >= j.t0 && e.t < now).map((e) => e.d);
    const ft = j.frames.slice(1).sort((a, b) => a - b);
    const pct = (q) => ft[Math.min(ft.length - 1, Math.floor(ft.length * q))];
    const renders = {};
    for (const [k, v] of Object.entries(w.__perf ?? {})) renders[k] = v - (j.renders0[k] ?? 0);
    const scrolls = w.__jankAll.scrolls - j.scrolls0;
    const story = renders.story ?? 0;
    return {
      durationMs: Math.round(dur),
      longTasks: { count: long.length, totalMs: Math.round(long.reduce((a, b) => a + b, 0)), worstMs: Math.round(Math.max(0, ...long)) },
      scrollEvents: scrolls,
      renders,
      rendersInstrumented: Boolean(w.__perf),
      storyRendersPer100Scroll: scrolls ? +((story / scrolls) * 100).toFixed(2) : null,
      frames: {
        count: ft.length,
        avgFps: +((ft.length / dur) * 1000).toFixed(1),
        p5Fps: +(1000 / pct(0.95)).toFixed(1),
        low1Fps: +(1000 / pct(0.99)).toFixed(1),
        medianMs: +pct(0.5).toFixed(1),
        p95Ms: +pct(0.95).toFixed(1),
        p99Ms: +pct(0.99).toFixed(1),
        over50ms: ft.filter((x) => x > 50).length
      },
      scrollY: Math.round(scrollY),
      docHeight: document.documentElement.scrollHeight,
      lenis: document.documentElement.classList.contains("lenis")
    };
  });
}

const wheel = async (n, dy, gap) => {
  for (let i = 0; i < n; i++) {
    await p.mouse.wheel(0, dy);
    await p.waitForTimeout(gap);
  }
};
// Raw CDP touch events (touchStart / touchMove every 16 ms / touchEnd): the compositor scrolls and flings
// natively. (Input.synthesizeScrollGesture with gestureSourceType "touch" does not scroll in this headless shell.)
const cdp = mobile ? await ctx.newCDPSession(p) : null;
const swipe = async (dist, ms) => {
  const n = Math.max(2, Math.round(ms / 16));
  const y0 = 740;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: y0 }] });
  for (let i = 1; i <= n; i++) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: y0 - (dist * i) / n }] });
    await p.waitForTimeout(16);
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
};
/** Settled scroll position of story step i (the centre of its track mark). */
const centre = (i) => p.evaluate((i) => { const m = document.querySelectorAll(".hs-mark")[i]; const r = m.getBoundingClientRect(); return Math.round(r.top + scrollY + (r.height - innerHeight) / 2); }, i);
const settleAt = async (y) => {
  await p.evaluate((v) => window.scrollTo(0, v), y);
  await p.waitForTimeout(2000);
};

const segments = {};
let t0 = Date.now();

// 1. The reference pattern from the top.
await startSegment();
if (!mobile) {
  await p.mouse.move(720, 450);
  await wheel(40, 120, 60);
  await wheel(12, 400, 16);
  await wheel(40, 40, 80);
  await wheel(40, 120, 60);
} else {
  for (let i = 0; i < 14; i++) {
    await swipe(560, 200);
    await p.waitForTimeout(120);
  }
  await swipe(560, 60); // fast flick
  await p.waitForTimeout(900);
  await swipe(500, 1600); // slow drag
  await p.waitForTimeout(120);
  for (let i = 0; i < 14; i++) {
    await swipe(560, 200);
    await p.waitForTimeout(120);
  }
}
await p.waitForTimeout(1500);
segments.pattern = { patternMs: Date.now() - t0, ...(await endSegment()) };

// 2. Through the #build chapter.
let buildWheelSteps = null;
if (!mobile) {
  const from = await centre(3);
  const to = await centre(5);
  buildWheelSteps = Math.min(80, Math.ceil((to - from) / 120) + 2);
  await settleAt(from);
  t0 = Date.now();
  await startSegment();
  await wheel(buildWheelSteps, 120, 60);
} else {
  const top = await p.evaluate(() => Math.round(document.getElementById("build").getBoundingClientRect().top + scrollY) - 300);
  await settleAt(top);
  t0 = Date.now();
  await startSegment();
  for (let i = 0; i < 8; i++) {
    await swipe(560, 200);
    await p.waitForTimeout(120);
  }
}
await p.waitForTimeout(1500);
segments.buildWheel = { patternMs: Date.now() - t0, wheelSteps: buildWheelSteps, ...(await endSegment()) };

// 3. A jump to #build.
if (!mobile) {
  await settleAt(await centre(1));
  t0 = Date.now();
  await startSegment();
  await p.evaluate((h) => { const a = document.createElement("a"); a.href = h; document.body.append(a); a.click(); a.remove(); }, "#build");
} else {
  await settleAt(await p.evaluate(() => Math.round(document.querySelector("[data-story-root]").getBoundingClientRect().top + scrollY)));
  await p.evaluate(() => {
    const a = document.createElement("a");
    a.href = "#build";
    a.id = "perf-jump";
    a.textContent = "jump";
    document.body.append(a);
  });
  t0 = Date.now();
  await startSegment();
  await p.evaluate(() => document.getElementById("perf-jump").click());
}
await p.waitForTimeout(2500);
segments.buildJump = {
  patternMs: Date.now() - t0,
  ...(await endSegment()),
  landed: await p.evaluate(() => ({ step: document.querySelector(".hs-step.is-current")?.dataset.step ?? null, buildTop: Math.round(document.getElementById("build").getBoundingClientRect().top), hash: location.hash }))
};

load.windowsCpuAfter = windowsCpuPercent();
const result = {
  label,
  kind,
  base,
  viewport: vp,
  harbor3d: state,
  // Top-level fields = the pattern segment, comparable with the reference "A" JSONs.
  ...segments.pattern,
  segments,
  load,
  errors,
  at: new Date().toISOString()
};
fs.writeFileSync(outFile, JSON.stringify(result, null, 1));
const brief = (s) => ({ fps: s.frames.avgFps, p5: s.frames.p5Fps, low1: s.frames.low1Fps, o50: s.frames.over50ms, lt: s.longTasks, sc: s.scrollEvents, r: s.renders });
console.log(JSON.stringify({ label, kind, harbor3d: state, lenis: segments.pattern.lenis, pattern: brief(segments.pattern), buildWheel: brief(segments.buildWheel), buildJump: { ...brief(segments.buildJump), landed: segments.buildJump.landed } }));
await b.close();
