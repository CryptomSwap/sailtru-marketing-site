// usage: node.exe record-lenis.mjs <baseUrl> <outDir(win)> <desktop|mobile>
// Screen recording of the homepage (EN). Frames come from the DevTools screencast (what Playwright's recordVideo
// uses internally; recordVideo itself needs ffmpeg-1013, which is not installed here) and are encoded to VP8 webm at a
// constant 25 fps with Playwright's ffmpeg-1011 (each output frame repeats the latest captured frame): smooth wheel scrolling through the cobalt arrival and the story,
// a chapter-bar jump, keyboard scrolling, and the #build chapter at the end (desktop 1440x900);
// native touch swipes, an anchor jump and #build at the end (phone 390x844).
// Writes <kind>.webm plus <kind>.json (timeline marks and the page's own rAF frame rate while recording).
import { chromium } from "file:///C:/Users/User/shot-tool/node_modules/playwright-core/index.mjs";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
const FFMPEG = process.env.LOCALAPPDATA + "\\ms-playwright\\ffmpeg-1011\\ffmpeg-win64.exe";
const [base, out, kind = "desktop"] = process.argv.slice(2);
const mobile = kind === "mobile";
const exe = process.env.LOCALAPPDATA + "\\ms-playwright\\chromium_headless_shell-1228\\chrome-headless-shell-win64\\chrome-headless-shell.exe";
const vp = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: exe, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
// Warm the server and HTTP cache outside the recording.
{
  const c = await b.newContext({ viewport: vp });
  const q = await c.newPage();
  await q.goto(base + "/en", { waitUntil: "load" });
  await q.waitForTimeout(5000);
  await c.close();
}
const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
const p = await ctx.newPage();
const shotCdp = await ctx.newCDPSession(p);
const shots = [];
shotCdp.on("Page.screencastFrame", (e) => { shots.push({ t: e.metadata.timestamp, data: Buffer.from(e.data, "base64") }); shotCdp.send("Page.screencastFrameAck", { sessionId: e.sessionId }).catch(() => {}); });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
const tStart = Date.now();
await p.goto(base + "/en", { waitUntil: "load" });
for (let i = 0; i < 120; i++) {
  if ((await p.getAttribute("[data-harbor3d]", "data-harbor3d")) === "ready") break;
  await p.waitForTimeout(250);
}
const marks = [];
const mark = async (what) => marks.push({ t: +((Date.now() - tStart) / 1000).toFixed(1), what, y: await p.evaluate(() => Math.round(scrollY)), step: await p.evaluate(() => document.querySelector(".hs-step.is-current")?.dataset.step ?? null) });
await mark("ready");
await shotCdp.send("Page.startScreencast", { format: "jpeg", quality: 85, maxWidth: vp.width, maxHeight: vp.height, everyNthFrame: 1 });
await p.evaluate(() => {
  const w = window;
  w.__rec = { frames: 0, t0: performance.now() };
  const tick = () => { w.__rec.frames++; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
const centre = (i) => p.evaluate((i) => { const m = document.querySelectorAll(".hs-mark")[i]; const r = m.getBoundingClientRect(); return Math.round(r.top + scrollY + (r.height - innerHeight) / 2); }, i);
const wheel = async (n, dy, gap) => { for (let i = 0; i < n; i++) { await p.mouse.wheel(0, dy); await p.waitForTimeout(gap); } };
await p.waitForTimeout(1500);
if (!mobile) {
  await p.mouse.move(900, 500);
  await mark("wheel: cobalt arrival");
  // Through the cobalt arrival into the find chapter.
  const find = await centre(1);
  while ((await p.evaluate(() => scrollY)) < find - 60) await wheel(1, 100, 90);
  await p.waitForTimeout(1200);
  await mark("wheel: find / evidence");
  const evidence = await centre(2);
  while ((await p.evaluate(() => scrollY)) < evidence - 60) await wheel(1, 100, 90);
  await p.waitForTimeout(1200);
  await mark("link: jump to #report");
  await p.evaluate((h) => { const a = document.createElement("a"); a.href = h; document.body.append(a); a.click(); a.remove(); }, "#report");
  await p.waitForTimeout(2600);
  await mark("keyboard: PageDown, ArrowDown x4, PageUp");
  await p.evaluate(() => document.activeElement?.blur());
  await p.keyboard.press("PageDown"); await p.waitForTimeout(1600);
  for (let i = 0; i < 4; i++) { await p.keyboard.press("ArrowDown"); await p.waitForTimeout(350); }
  await p.waitForTimeout(800);
  await p.keyboard.press("PageUp"); await p.waitForTimeout(1600);
  await mark("link: jump to #build");
  await p.evaluate((h) => { const a = document.createElement("a"); a.href = h; document.body.append(a); a.click(); a.remove(); }, "#build");
  await p.waitForTimeout(2600);
  await mark("wheel: through #build (crane) and back");
  await wheel(10, 100, 110);
  await p.waitForTimeout(900);
  await wheel(10, -100, 110);
  await p.waitForTimeout(900);
  await mark("hold on #build");
  await p.evaluate((h) => { const a = document.createElement("a"); a.href = h; document.body.append(a); a.click(); a.remove(); }, "#build");
  await p.waitForTimeout(3500);
} else {
  const cdp = await ctx.newCDPSession(p);
  const swipe = async (dist, ms) => {
    const n = Math.max(2, Math.round(ms / 16));
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 700 }] });
    for (let i = 1; i <= n; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 700 - (dist * i) / n }] }); await p.waitForTimeout(16); }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  };
  await mark("swipes: cobalt hero and the stacked story");
  for (let i = 0; i < 12; i++) { await swipe(420, 260); await p.waitForTimeout(450); }
  await mark("anchor: jump to #build");
  await p.evaluate(() => { const a = document.createElement("a"); a.href = "#build"; a.id = "rec-jump"; document.body.append(a); a.click(); });
  await p.waitForTimeout(2400);
  await mark("swipes: through #build");
  for (let i = 0; i < 3; i++) { await swipe(380, 300); await p.waitForTimeout(600); }
  for (let i = 0; i < 3; i++) { await swipe(-380, 300); await p.waitForTimeout(600); }
  await mark("hold on #build");
  await p.evaluate(() => document.getElementById("rec-jump").click());
  await p.waitForTimeout(3000);
}
await mark("end");
const rec = await p.evaluate(() => ({ frames: window.__rec.frames, seconds: (performance.now() - window.__rec.t0) / 1000 }));
const lenis = await p.evaluate(() => document.documentElement.classList.contains("lenis"));
await shotCdp.send("Page.stopScreencast");
await ctx.close();
const dest = path.join(out, mobile ? "en__390x844.webm" : "en__1440x900.webm");
const fps = 25, start = shots[0].t, end = shots[shots.length - 1].t + 1;
const ff = spawn(FFMPEG, ["-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "pipe:0", "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libvpx", "-b:v", "3000k", "-crf", "10", "-deadline", "good", "-y", dest]);
let ffErr = ""; ff.stderr.on("data", (d) => (ffErr += d));
let k = 0, n = 0;
for (let t = start; t < end; t += 1 / fps) { while (k + 1 < shots.length && shots[k + 1].t <= t) k++; if (!ff.stdin.write(shots[k].data)) await new Promise((r) => ff.stdin.once("drain", r)); n++; }
ff.stdin.end();
const code = await new Promise((r) => ff.on("close", r));
const gaps = shots.slice(1).map((f, i) => f.t - shots[i].t).sort((a, b) => a - b);
const info = { file: dest, viewport: vp, lenis, videoSeconds: +(end - start).toFixed(1), outputFps: fps, outputFrames: n, capturedFrames: shots.length, capturedFps: +(shots.length / (end - start)).toFixed(1), medianFrameGapMs: Math.round(gaps[Math.floor(gaps.length / 2)] * 1000), p90FrameGapMs: Math.round(gaps[Math.floor(gaps.length * 0.9)] * 1000), ffmpegExit: code, ffErr: ffErr.slice(0, 300), wallSeconds: +((Date.now() - tStart) / 1000).toFixed(1), pageRafFps: +(rec.frames / rec.seconds).toFixed(1), pageRafSeconds: +rec.seconds.toFixed(1), marks, errors: [...new Set(errs)] };
fs.writeFileSync(dest.replace(/\.webm$/, ".json"), JSON.stringify(info, null, 1));
console.log(JSON.stringify(info));
await b.close();
