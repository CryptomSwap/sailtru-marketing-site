// usage: node trace-summary.mjs <trace.json> — main-thread (CrRendererMain) time by event name, plus GPU/compositor threads.
import fs from "fs";
const t = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const ev = t.traceEvents ?? t;
const names = {};
for (const e of ev) if (e.name === "thread_name") names[`${e.pid}:${e.tid}`] = e.args.name;
const threads = {};
for (const e of ev) {
  if (e.ph !== "X" || !e.dur) continue;
  const th = names[`${e.pid}:${e.tid}`] ?? "?";
  if (!/CrRendererMain|Compositor|CrGpuMain|VizCompositor|CompositorTileWorker/.test(th)) continue;
  const k = th.replace(/\d+/g, "");
  threads[k] ??= {};
  threads[k][e.name] = (threads[k][e.name] ?? 0) + e.dur / 1000;
}
for (const [th, m] of Object.entries(threads)) {
  const top = Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 14);
  console.log(`\n${th}`);
  for (const [n, ms] of top) console.log(`  ${ms.toFixed(0).padStart(7)} ms  ${n}`);
}
