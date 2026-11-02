// usage: node perf-summary.mjs <perfDir> [bLabel=before-B] [cLabel=after-C]  -> markdown tables (medians of 3 runs) on stdout
import fs from "fs";
import path from "path";
const [dir, bLabel = "before-B", cLabel = "after-C"] = process.argv.slice(2);
const load = (label, kind) =>
  [1, 2, 3].map((n) => path.join(dir, `${label}-${kind}-${n}.json`)).filter(fs.existsSync).map((f) => JSON.parse(fs.readFileSync(f, "utf8")));
const med = (xs) => { const s = xs.filter((x) => x != null).sort((a, b) => a - b); if (!s.length) return null; const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : +((s[m - 1] + s[m]) / 2).toFixed(2); };
const per100 = (s, key) => (s.scrollEvents ? +(((s.renders?.[key] ?? 0) / s.scrollEvents) * 100).toFixed(2) : null);
const metrics = [
  ["long tasks (count)", (s) => s.longTasks.count],
  ["long tasks total ms", (s) => s.longTasks.totalMs],
  ["worst long task ms", (s) => s.longTasks.worstMs],
  ["scroll events", (s) => s.scrollEvents],
  ["story renders (absolute)", (s) => (s.rendersInstrumented ? s.renders.story ?? 0 : null)],
  ["header renders (absolute)", (s) => (s.rendersInstrumented ? s.renders.header ?? 0 : null)],
  ["story renders / 100 scroll ev.", (s) => (s.rendersInstrumented ? per100(s, "story") : null)],
  ["header renders / 100 scroll ev.", (s) => (s.rendersInstrumented ? per100(s, "header") : null)],
  ["hero renders / 100 scroll ev.", (s) => (s.rendersInstrumented && s.renders.hero != null ? per100(s, "hero") : null)],
  ["avg fps", (s) => s.frames.avgFps],
  ["p5 fps (1000/p95 frame)", (s) => s.frames.p5Fps],
  ["1% low fps (1000/p99 frame)", (s) => s.frames.low1Fps],
  ["median frame ms", (s) => s.frames.medianMs],
  ["frames > 50 ms", (s) => s.frames.over50ms]
];
const fmt = (v) => (v == null ? "–" : String(v));
const runs = (rs, f) => rs.map((r) => fmt(f(r))).join(" / ");
for (const kind of ["desktop", "mobile"]) {
  const A = load("before", kind);
  const B = load(bLabel, kind);
  const C = load(cLabel, kind);
  for (const seg of ["pattern", "buildWheel", "buildJump"]) {
    const get = (r) => (seg === "pattern" ? r.segments?.pattern ?? r : r.segments?.[seg]);
    const a = seg === "pattern" ? A.map(get) : [];
    const bs = B.map(get).filter(Boolean);
    const cs = C.map(get).filter(Boolean);
    console.log(`\n#### ${kind === "desktop" ? "1440x900, wheel" : "390x844, touch"}: ${seg}\n`);
    console.log(`| metric | A ref (fd59811) | B (ec172e9, Lenis off) | C (Lenis on) | C − B | B runs | C runs |`);
    console.log(`|---|---|---|---|---|---|---|`);
    for (const [name, f] of metrics) {
      const ma = a.length ? med(a.map(f)) : null, mb = med(bs.map(f)), mc = med(cs.map(f));
      const d = mb != null && mc != null ? +(mc - mb).toFixed(2) : null;
      console.log(`| ${name} | ${fmt(ma)} | ${fmt(mb)} | ${fmt(mc)} | ${d == null ? "–" : (d > 0 ? "+" : "") + d} | ${runs(bs, f)} | ${runs(cs, f)} |`);
    }
    if (seg === "buildJump") console.log(`| landed (step, #build top) | – | ${B.map((r) => r.segments?.buildJump?.landed ? r.segments.buildJump.landed.step + "," + r.segments.buildJump.landed.buildTop : "–").join(" / ")} | ${C.map((r) => r.segments?.buildJump?.landed ? r.segments.buildJump.landed.step + "," + r.segments.buildJump.landed.buildTop : "–").join(" / ")} | | | |`);
  }
  const loads = (rs) => rs.map((r) => `${r.load.wslLoadavg.split(" ")[0]} (win CPU ${r.load.windowsCpuBefore}%→${r.load.windowsCpuAfter}%)`).join(" / ");
  console.log(`\nLoad per run (${kind}), WSL 1-min loadavg (Windows CPU % before→after): A ${loads(A)}; B ${loads(B)}; C ${loads(C)}`);
  console.log(`Lenis active: B ${B.map((r) => r.lenis).join("/")}, C ${C.map((r) => r.lenis).join("/")}; harbor3d: B ${B.map((r) => r.harbor3d).join("/")}, C ${C.map((r) => r.harbor3d).join("/")}`);
}
