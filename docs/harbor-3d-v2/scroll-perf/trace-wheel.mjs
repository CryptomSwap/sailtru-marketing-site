// usage: node.exe trace-wheel.mjs <baseUrl> <outTrace(win path)>
// Chrome trace of 30 wheel steps (120px at 60ms) from the find chapter at 1440x900, for main-thread breakdowns.
import { chromium } from "file:///C:/Users/User/shot-tool/node_modules/playwright-core/index.mjs";
const [base, out] = process.argv.slice(2);
const exe = process.env.LOCALAPPDATA + "\\ms-playwright\\chromium_headless_shell-1228\\chrome-headless-shell-win64\\chrome-headless-shell.exe";
const b = await chromium.launch({ executablePath: exe, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(base + "/en", { waitUntil: "load" });
for (let i = 0; i < 160; i++) { if ((await p.getAttribute("[data-harbor3d]", "data-harbor3d")) === "ready") break; await p.waitForTimeout(250); }
await p.waitForTimeout(2500);
await p.evaluate(() => { const m = document.querySelectorAll(".hs-mark")[1]; const r = m.getBoundingClientRect(); window.scrollTo(0, r.top + scrollY + (r.height - innerHeight) / 2); });
await p.waitForTimeout(2000);
await p.mouse.move(720, 450);
await b.startTracing(p, { path: out, categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "blink", "cc", "gpu", "v8.execute", "toplevel"] });
for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(60); }
await p.waitForTimeout(1500);
await b.stopTracing();
console.log("traced", out);
await b.close();
