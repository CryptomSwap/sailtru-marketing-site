// usage: node.exe lenis-probe.mjs <baseUrl> <lang> <outDir(win)> [label]
// Scroll behavior probe for the harbor homepage (Lenis on or off): direct hash loads (#build chapter,
// #build-examples section), chapter-bar and header anchor clicks, keyboard scrolling, wheel smoothing,
// back/forward and reload restoration, reduced motion (load + runtime toggle), phones (hash load, swipe, menu anchor).
import { chromium } from "file:///C:/Users/User/shot-tool/node_modules/playwright-core/index.mjs";
import fs from "fs";
import path from "path";
const [base, lang = "en", out, label = "probe"] = process.argv.slice(2);
const exe = process.env.LOCALAPPDATA + "\\ms-playwright\\chromium_headless_shell-1228\\chrome-headless-shell-win64\\chrome-headless-shell.exe";
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: exe, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const res = { label, base, lang };
const errs = [];
const DESK = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };

async function open(url, opts = {}) {
  const ctx = await b.newContext({ ...DESK, ...opts });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await p.goto(url, { waitUntil: "load", timeout: 120000 });
  await ready(p);
  return { ctx, p };
}
async function ready(p) {
  for (let i = 0, fb = 0; i < 160; i++) {
    const s = await p.getAttribute("[data-harbor3d]", "data-harbor3d").catch(() => null);
    if (s === "ready" || s === "error") break;
    fb = s === "fallback" ? fb + 1 : 0;
    if (fb > 20) break;
    await p.waitForTimeout(250);
  }
  await p.waitForTimeout(2500);
}
const y = (p) => p.evaluate(() => Math.round(scrollY));
const settle = async (p) => { let a = -1; for (let i = 0; i < 40; i++) { await p.waitForTimeout(200); const v = await y(p); if (v === a) break; a = v; } };
/** Story state plus where the #build chapter's settled scroll position is. */
const st = (p) => p.evaluate(() => {
  const marks = Array.from(document.querySelectorAll(".hs-mark"));
  const vh = innerHeight;
  const centre = (i) => { const el = marks[i]; if (!el) return null; const r = el.getBoundingClientRect(); return Math.round(r.top + scrollY + (r.height - vh) / 2); };
  const cinematic = marks.length > 0 && marks[0].getBoundingClientRect().height > 0;
  const art = document.getElementById("build");
  const sec = document.getElementById("build-examples");
  return {
    y: Math.round(scrollY),
    buildCentre: cinematic ? centre(4) : null,
    cinematic,
    step: document.querySelector(".hs-step.is-current")?.dataset.step ?? null,
    line: document.querySelector(".hs-step.is-current .hs-line.is-on")?.textContent?.slice(0, 50) ?? null,
    stageStep: document.querySelector(".hs-stage")?.dataset.step ?? null,
    buildArticleTop: art ? Math.round(art.getBoundingClientRect().top) : null,
    buildSectionTop: sec ? Math.round(sec.getBoundingClientRect().top) : null,
    hash: location.hash,
    html: document.documentElement.className,
    harbor3d: document.querySelector("[data-harbor3d]")?.getAttribute("data-harbor3d"),
    header: document.querySelector(".hh")?.className,
    docH: document.documentElement.scrollHeight
  };
});
const shot = (p, name) => p.screenshot({ path: path.join(out, `${name}.png`) });

// 1. Direct load of the #build chapter (desktop), sampled over time to catch late jumps.
{
  const { ctx, p } = await open(`${base}/${lang}#build`);
  const samples = [];
  for (let i = 0; i < 6; i++) { samples.push(await y(p)); await p.waitForTimeout(500); }
  res.hashBuild = { ...(await st(p)), samples };
  await shot(p, `${lang}__1440x900__hash-build`);
  // 2. Reload keeps the position.
  await p.reload({ waitUntil: "load" }); await ready(p); await settle(p);
  res.hashBuildReload = await st(p);
  await ctx.close();
}
// 3. Direct load of the #build-examples section.
{
  const { ctx, p } = await open(`${base}/${lang}#build-examples`);
  await settle(p);
  res.hashBuildExamples = await st(p);
  await shot(p, `${lang}__1440x900__hash-build-examples`);
  await ctx.close();
}
// 4. Interactions on a fresh /lang load.
{
  const { ctx, p } = await open(`${base}/${lang}`);
  res.initial = await st(p);
  await p.mouse.move(720, 450);
  // Wheel smoothing: 3 notches, sampled while it eases.
  const wheel = [];
  for (let i = 0; i < 3; i++) await p.mouse.wheel(0, 120);
  for (let i = 0; i < 10; i++) { wheel.push(await y(p)); await p.waitForTimeout(50); }
  await settle(p);
  res.wheel = { samples: wheel, end: await y(p) };
  // Past the arrival so the header is showing.
  const find = await p.evaluate(() => { const m = document.querySelectorAll(".hs-mark")[1]; const r = m.getBoundingClientRect(); return Math.round(r.top + scrollY + (r.height - innerHeight) / 2); });
  await p.evaluate((v) => window.scrollTo(0, v), find); await settle(p); await p.waitForTimeout(800);
  // Same-page link -> #build (routed through the story like any chapter link).
  const t0 = Date.now();
  await p.evaluate((h) => { const a = document.createElement("a"); a.href = h; document.body.append(a); a.click(); a.remove(); }, "#build");
  const flight = [];
  for (let i = 0; i < 8; i++) { flight.push(await y(p)); await p.waitForTimeout(120); }
  await settle(p); await p.waitForTimeout(1200);
  res.navBuild = { ...(await st(p)), flight, ms: Date.now() - t0 };
  await shot(p, `${lang}__1440x900__nav-build`);
  // Keyboard from the #build chapter.
  await p.evaluate(() => document.activeElement?.blur());
  const keys = {};
  for (const key of ["ArrowDown", "PageDown", "Space", "PageUp", "ArrowUp"]) { const y0 = await y(p); await p.keyboard.press(key); await settle(p); keys[key] = [y0, await y(p)]; }
  res.keys = keys;
  // Header -> #build-examples (the section after the story).
  await p.evaluate((v) => window.scrollTo(0, v), find); await settle(p); await p.waitForTimeout(600);
  const headerShown = await p.evaluate(() => !document.querySelector(".hh")?.classList.contains("is-parked"));
  await p.click('.hh__nav a[href="#build-examples"]', { force: !headerShown });
  await settle(p); await p.waitForTimeout(600);
  res.headerBuildExamples = { ...(await st(p)), headerShown, focused: await p.evaluate(() => document.activeElement?.id) };
  await shot(p, `${lang}__1440x900__header-build-examples`);
  // Scroll through #build-examples with the wheel, then End / Home.
  for (let i = 0; i < 10; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(60); }
  await settle(p);
  res.wheelInBuildExamples = await st(p);
  for (const key of ["End", "Home"]) { const y0 = await y(p); await p.keyboard.press(key); await settle(p); keys[key] = [y0, await y(p)]; }
  // Back/forward: go to the build chapter, open /contact, come back.
  await p.evaluate((h) => { const a = document.createElement("a"); a.href = h; document.body.append(a); a.click(); a.remove(); }, "#build");
  await p.evaluate(() => { const m = document.querySelectorAll(".hs-mark")[4]; const r = m.getBoundingClientRect(); window.scrollTo(0, Math.round(r.top + scrollY + (r.height - innerHeight) / 2)); });
  await settle(p); await p.waitForTimeout(800);
  const before = await st(p);
  await p.evaluate(() => { const a = document.createElement("a"); a.href = `/${document.documentElement.lang || "en"}/contact`; document.body.append(a); a.click(); });
  await p.waitForURL(/contact/, { timeout: 30000 }).catch(() => {});
  await p.waitForTimeout(1500);
  await p.goBack({ waitUntil: "load" }).catch(() => {});
  await ready(p); await settle(p);
  res.backForward = { before, afterBack: await st(p) };
  await p.goForward().catch(() => {}); await p.waitForTimeout(1500);
  res.backForward.forwardUrl = p.url();
  await p.goBack().catch(() => {}); await ready(p); await settle(p);
  res.backForward.afterSecondBack = await st(p);
  // Reduced motion switched on at runtime: Lenis goes away; and back.
  await p.emulateMedia({ reducedMotion: "reduce" }); await p.waitForTimeout(1000);
  res.toggle = { reduce: await p.evaluate(() => document.documentElement.className) };
  await p.emulateMedia({ reducedMotion: "no-preference" }); await p.waitForTimeout(1500);
  res.toggle.restore = await p.evaluate(() => document.documentElement.className);
  await ctx.close();
}
// 5. Reduced motion: direct #build load and wheel.
{
  const { ctx, p } = await open(`${base}/${lang}#build`, { reducedMotion: "reduce" });
  await settle(p);
  res.reducedHashBuild = await st(p);
  await shot(p, `${lang}__1440x900__reduced-hash-build`);
  await p.mouse.move(720, 450); await p.mouse.wheel(0, 360); await p.waitForTimeout(500);
  res.reducedWheel = await y(p) - res.reducedHashBuild.y;
  await ctx.close();
}
// 6. Phones: #build direct load, swipe, menu -> #build-examples.
{
  const { ctx, p } = await open(`${base}/${lang}#build`, PHONE);
  await settle(p);
  res.phoneHashBuild = await st(p);
  await shot(p, `${lang}__390x844__hash-build`);
  await p.evaluate(() => window.scrollTo(0, 0)); await settle(p);
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 700 }] });
  for (let i = 1; i <= 12; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 700 - i * 40 }] }); await p.waitForTimeout(16); }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await settle(p);
  res.phoneSwipe = await y(p);
  // The harbor header shows after the cobalt hero; open its menu and jump.
  await p.evaluate(() => window.scrollTo(0, document.getElementById("main-content").getBoundingClientRect().top + scrollY + 1400)); await settle(p); await p.waitForTimeout(500);
  const menu = await p.$(".hh__menu");
  if (menu && (await menu.isVisible())) {
    await menu.click(); await p.waitForTimeout(400);
    res.phoneMenu = await p.evaluate(() => ({ open: document.querySelector(".hh")?.classList.contains("is-open"), prevent: document.getElementById("hh-nav")?.hasAttribute("data-lenis-prevent") }));
    await p.click('.hh__nav a[href="#build-examples"]'); await settle(p);
    res.phoneMenuBuildExamples = await st(p);
    await shot(p, `${lang}__390x844__menu-build-examples`);
  } else res.phoneMenu = "menu not visible";
  await ctx.close();
}
res.errors = [...new Set(errs)];
fs.writeFileSync(path.join(out, `${label}-${lang}.json`), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
await b.close();
