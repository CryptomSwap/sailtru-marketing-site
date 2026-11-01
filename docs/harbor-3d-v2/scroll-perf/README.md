# Scroll performance and behavior harness (harbor homepage)

Scripts used to measure scroll jank and check scroll behavior (Lenis on/off) on the 3D harbor homepage. They drive the
Windows headless Chromium shell through Windows node (from WSL), with WebGL in SwiftShader (software). Absolute numbers
are therefore low; compare builds against each other, interleaved, on the same machine.

The scripts import Playwright from `C:/Users/User/shot-tool/node_modules/playwright-core` and the browser from
`%LOCALAPPDATA%\ms-playwright\chromium_headless_shell-1228`. Adjust those two paths for another machine.

| Script | What it does |
|---|---|
| `perf-jank.mjs` | One run on `/en`: a fresh page, wait for `data-harbor3d="ready"`, then three measured segments: the reference scroll pattern (wheel at 1440x900 or CDP touch at 390x844), a scroll through the `#build` chapter, and a jump to `#build`. Records long tasks, rAF frame times (avg fps, p5 = 1000/p95, 1% low = 1000/p99, frames > 50 ms), scroll events, renders (only if a measurement build defines `window.__perf` counters) and load. |
| `perf-run.sh` | Wrapper: `perf-run.sh <label> <baseUrl> <desktop\|mobile> <n>` writes `<label>-<kind>-<n>.json`. |
| `perf-bc.sh` | Interleaves B (Lenis off, :3101) and C (Lenis on, :3102), 3 runs each per viewport. |
| `perf-summary.mjs` | Medians of the 3 runs as markdown tables (A reference, B, C, C − B). |
| `trace-wheel.mjs`, `trace-summary.mjs` | A Chrome trace of 30 wheel notches, and the time per event on the renderer main, compositor and GPU threads. |
| `lenis-probe.mjs` | Behavior probe: direct loads of `/<lang>#build` and `#build-examples`, reload, the chapter-bar jump, header anchors, keyboard, wheel smoothing, back/forward, reduced motion (on load and toggled at runtime), phones (hash load, swipe, menu anchor). Also saves screenshots. |
| `record-lenis.mjs` | Screen recording (DevTools screencast to VP8 webm via Playwright's ffmpeg): wheel through the cobalt arrival and the story, a chapter jump, keyboard, ending on `#build`; or phone swipes plus an anchor jump. |

The measurement builds used for the numbers in the Lenis commit add temporary render counters (and, for "B", a
one-line patch that keeps Lenis from starting). Those patches are not part of the repo.
