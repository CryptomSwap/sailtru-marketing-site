"use client";

import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import {
  ChartArtifact,
  DockArtifact,
  MeasureArtifact,
  ReportArtifact,
  SiteArtifact,
  WorkflowArtifact
} from "./artifacts";
import {
  ForeLayer,
  FarLayer,
  HarborDefs,
  LAYER_DEPTHS,
  MainLayer,
  MidLayer,
  SkyLayer,
  boatTransform,
  cranePose,
  type LayerName
} from "./harbor-world";
import {
  DESKTOP_POSES,
  MOBILE_POSES,
  SOURCE_BUOYS,
  STEP_IDS,
  STEP_LENGTH,
  beatAt,
  cameraAt,
  clamp,
  layerTransform,
  projectMain,
  sceneAt,
  sceneForStep,
  storyFromLinear,
  StoryScroll,
  type Beat,
  type SceneState
} from "./story-model";
import type { Harbor3DState, HarborAnchor, HarborStage, ScreenPoint } from "./three/stage-types";
import { WebGLSupport } from "./three/webgl-support";

/** The 3D harbor loads on demand, after the page is interactive; the SVG harbor is server-rendered first. */
const HarborScene3D = dynamic(() => import("./three/harbor-scene"), { ssr: false, loading: () => null });

const LAYERS: LayerName[] = ["sky", "far", "mid", "main", "fore"];

/** Harbor anchors the leader lines point at, per step. */
const LEADER_ANCHORS: Record<number, HarborAnchor[]> = {
  1: ["source0", "source1", "source2"],
  2: ["marker"],
  3: ["route"],
  4: ["crate"],
  5: ["workshop"]
};

const TAG_ANCHORS: HarborAnchor[] = ["tag0", "tag1", "tag2"];

/** The same anchors in the illustrated (SVG) harbor's world units. */
const SVG_ANCHORS: Record<HarborAnchor, { x: number; y: number }> = {
  tag0: { x: SOURCE_BUOYS[0].x, y: SOURCE_BUOYS[0].y - 120 },
  tag1: { x: SOURCE_BUOYS[1].x, y: SOURCE_BUOYS[1].y - 120 },
  tag2: { x: SOURCE_BUOYS[2].x, y: SOURCE_BUOYS[2].y - 120 },
  source0: { x: SOURCE_BUOYS[0].x, y: SOURCE_BUOYS[0].y - 96 },
  source1: { x: SOURCE_BUOYS[1].x, y: SOURCE_BUOYS[1].y - 96 },
  source2: { x: SOURCE_BUOYS[2].x, y: SOURCE_BUOYS[2].y - 96 },
  marker: { x: 2060, y: 650 },
  route: { x: 2700, y: 822 },
  crate: { x: 3022, y: 732 },
  workshop: { x: 3594, y: 676 },
  boat: { x: 2140, y: 600 }
};

/** Vignette framing (portrait-friendly stills for mobile and reduced motion). */
const VIGNETTE = { w: 600, h: 380 };

function Layers({ scene, maskId, refs }: { scene: SceneState; maskId: string; refs?: (name: LayerName) => (el: SVGGElement | null) => void }) {
  const content: Record<LayerName, ReactNode> = {
    sky: <SkyLayer />,
    far: <FarLayer />,
    mid: <MidLayer />,
    main: <MainLayer scene={scene} routeMaskId={maskId} />,
    fore: <ForeLayer />
  };
  return (
    <>
      {LAYERS.map((name) => (
        <g key={name} data-layer={name} ref={refs?.(name)}>
          {content[name]}
        </g>
      ))}
    </>
  );
}

/** A static still of the harbor for one step. */
function Vignette({ step, live }: { step: number; live?: ReactNode }) {
  const t = useTranslations("harbor.chart");
  const maskId = `hw-route-${useId().replace(/:/g, "")}`;
  const scene = sceneForStep(step);
  const cam = MOBILE_POSES[step];
  const focus = { x: VIGNETTE.w / 2, y: VIGNETTE.h * 0.58 };
  const sources = t.raw("sources") as { label: string }[];
  return (
    <div className={`hs-vignette hs-vignette--${STEP_IDS[step]}`} data-step={step} aria-hidden>
      <svg viewBox={`0 0 ${VIGNETTE.w} ${VIGNETTE.h}`} preserveAspectRatio="xMidYMid slice" className="hs-vignette__svg">
        {LAYERS.map((name) => {
          const lt = layerTransform(cam, LAYER_DEPTHS[name], focus, { x: 0, y: 0 });
          return (
            <g key={name} transform={`translate(${lt.tx.toFixed(1)} ${lt.ty.toFixed(1)}) scale(${lt.zoom.toFixed(4)})`}>
              {name === "sky" ? <SkyLayer /> : null}
              {name === "far" ? <FarLayer /> : null}
              {name === "mid" ? <MidLayer /> : null}
              {name === "main" ? <MainLayer scene={scene} routeMaskId={maskId} /> : null}
              {name === "fore" ? <ForeLayer /> : null}
            </g>
          );
        })}
      </svg>
      {live}
      {step === 1
        ? SOURCE_BUOYS.map((b, i) => {
            // The middle tag sits below its buoy so neighbouring labels never collide.
            const p = projectMain(cam, focus, b.x, i === 1 ? b.y + 46 : b.y - 110);
            return (
              <span
                key={i}
                className={`hs-tag hs-tag--vignette${i === 1 ? " hs-tag--below" : ""}`}
                style={{ "--x": `${(p.x / VIGNETTE.w) * 100}%`, "--y": `${(p.y / VIGNETTE.h) * 100}%` } as CSSProperties}
              >
                {sources[i].label}
              </span>
            );
          })
        : null}
    </div>
  );
}

function StepArtifact({ step, sub, inline }: { step: number; sub: number; inline?: boolean }) {
  switch (STEP_IDS[step]) {
    case "opening":
    case "find":
      return <ChartArtifact sub={step === 0 ? 0 : sub + 1} inline={inline} />;
    case "evidence":
      return <SiteArtifact sub={sub} inline={inline} />;
    case "report":
      return <ReportArtifact sub={sub} inline={inline} />;
    case "build":
      return <DockArtifact sub={sub} inline={inline} />;
    case "workflow":
      return <WorkflowArtifact sub={sub} inline={inline} />;
    case "review":
      return <MeasureArtifact sub={sub} inline={inline} />;
    default:
      return null;
  }
}

/** Which stage artifact slot a step uses (opening and find share the chart). */
function slotFor(step: number) {
  return step <= 1 ? 1 : step;
}

export function HarborStory({ belowHero = false, scene3d = false }: { belowHero?: boolean; scene3d?: boolean } = {}) {
  const t = useTranslations("harbor");
  const locale = useLocale();
  const rtl = locale === "he";
  const maskId = `hw-route-stage-${useId().replace(/:/g, "")}`;

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Partial<Record<LayerName, SVGGElement | null>>>({});
  const leaderRef = useRef<SVGSVGElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const slotRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [beat, setBeat] = useState<Beat>({ step: 0, sub: 0 });
  /** Which 3D view is loaded: the sticky stage (desktop) or the phone vignettes. */
  const [load3d, setLoad3d] = useState<"stage" | "vignette" | null>(null);
  /** data-harbor3d is written straight to the stage: it mirrors an external system (WebGL), not React state. */
  const setHarbor3d = useCallback((state: Harbor3DState) => {
    if (stageRef.current) stageRef.current.dataset.harbor3d = state;
  }, []);
  const stage3dRef = useRef<HarborStage | null>(null);

  const kickLoop = useCallback(() => rootRef.current?.dispatchEvent(new Event("harbor:kick")), []);
  const onStage3d = useCallback(
    (stage: HarborStage | null) => {
      stage3dRef.current = stage;
      kickLoop();
    },
    [kickLoop]
  );
  const onReady3d = useCallback(() => setHarbor3d("ready"), [setHarbor3d]);
  const onError3d = useCallback(() => {
    stage3dRef.current = null;
    setLoad3d(null);
    setHarbor3d("error");
    kickLoop();
  }, [kickLoop, setHarbor3d]);

  // Decide whether the 3D harbor may run, then load it once the story is near and the page is idle.
  useEffect(() => {
    const root = rootRef.current;
    if (!scene3d || !root) return;
    if (WebGLSupport.prefersReducedMotion() || !WebGLSupport.available()) return;
    setHarbor3d("loading");
    let idle = 0;
    const start = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
      // The cinematic stage on wide screens; otherwise the stacked layout's vignettes.
      const mode = stageRef.current && getComputedStyle(stageRef.current).display !== "none" ? "stage" : "vignette";
      idle = ric(() => setLoad3d(mode), { timeout: 1200 });
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        start();
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(root);
    return () => {
      io.disconnect();
      (window.cancelIdleCallback ?? window.clearTimeout)(idle);
    };
  }, [scene3d, setHarbor3d]);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const beatRef = useRef<Beat>({ step: 0, sub: 0 });

  const setLayerRef = useCallback(
    (name: LayerName) => (el: SVGGElement | null) => {
      layerRefs.current[name] = el;
    },
    []
  );

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let anchors: number[] = [];
    let size = { w: 0, h: 0, col: 0 };
    let cinematic = false;
    let uTarget = 0;
    let uDisp = -1;
    let pointer = { x: 0, y: 0 };
    let pointerTarget = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;
    let inView = true;
    let cardRects: Record<number, DOMRect | null> = {};
    let rowRects: DOMRect[] = [];
    let measureTimer = 0;
    let ambientT = 0;
    let focus3d = { x: -1, y: 0 };

    const q = <T extends Element>(sel: string) => stage.querySelector<T>(sel);
    const nodes = {
      boat: q<SVGGElement>('[data-hw="boat"]'),
      bob: q<SVGGElement>('[data-hw="boat-bob"]'),
      boatCrate: q<SVGGElement>('[data-hw="boat-crate"]'),
      routeMask: q<SVGPathElement>('[data-hw="route-mask"]'),
      routeEnd: q<SVGGElement>('[data-hw="route-end"]'),
      nextRoute: q<SVGPathElement>('[data-hw="next-route"]'),
      nextBuoy: q<SVGGElement>('[data-hw="next-buoy"]'),
      pings: q<SVGGElement>('[data-hw="source-pings"]'),
      marker: q<SVGGElement>('[data-hw="marker-ring"]'),
      craneLoad: q<SVGGElement>('[data-hw="crane-load"]'),
      trolley: q<SVGRectElement>('[data-hw="crane-trolley"]'),
      cable: q<SVGLineElement>('[data-hw="crane-cable"]'),
      crate: q<SVGGElement>('[data-hw="crane-crate"]'),
      glow: q<SVGRectElement>('[data-hw="workshop-glow"]'),
      waves: q<SVGGElement>(".hw-waves"),
      pennant: q<SVGPathElement>(".hw-pennant")
    };

    function measure() {
      const rect = stage!.getBoundingClientRect();
      cinematic = getComputedStyle(stage!).display !== "none";
      const col = root!.querySelector<HTMLElement>(".hs-colmark")?.getBoundingClientRect().width ?? 0;
      size = { w: rect.width, h: rect.height, col };
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      anchors = stepRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top + scrollY + (r.height - vh) / 2;
      });
      if (anchors.length) anchors[0] = StoryScroll.firstAnchor(anchors[0], root!.getBoundingClientRect().top + scrollY);
      measureCards();
    }

    /** Card and row rectangles, relative to the stage, so leaders need no per-frame layout reads. */
    function measureCards() {
      const origin = stage!.getBoundingClientRect();
      const rel = (r: DOMRect) => new DOMRect(r.left - origin.left, r.top - origin.top, r.width, r.height);
      const room = stage!.querySelector<HTMLElement>(".hs-artifacts")?.clientHeight ?? 0;
      cardRects = {};
      for (const key of Object.keys(slotRefs.current)) {
        const el = slotRefs.current[Number(key)]?.firstElementChild as HTMLElement | null;
        if (el && room) {
          // A card taller than the stage scales down to stay whole on short screens.
          const fit = Math.max(0.78, Math.min(1, room / el.offsetHeight));
          el.style.transform = fit < 1 ? `scale(${fit.toFixed(3)})` : "";
          el.style.transformOrigin = rtl ? "top left" : "top right";
        }
        cardRects[Number(key)] = el ? rel(el.getBoundingClientRect()) : null;
      }
      const rows = stage!.querySelectorAll<HTMLElement>(".hs-slot--1 .hx-chart__source");
      rowRects = Array.from(rows).map((r) => rel(r.getBoundingClientRect()));
    }

    function linearFromScroll() {
      const y = window.scrollY;
      if (!anchors.length) return 0;
      if (y <= anchors[0]) return 0;
      for (let i = 0; i < anchors.length - 1; i += 1) {
        if (y < anchors[i + 1]) {
          const span = Math.max(1, anchors[i + 1] - anchors[i]);
          return i + (y - anchors[i]) / span;
        }
      }
      return anchors.length - 1;
    }

    function focusPoint() {
      const sceneW = size.w - size.col;
      return { x: size.col + sceneW * 0.27, y: size.h * 0.6 };
    }

    function zoomScale() {
      const sceneW = size.w - size.col;
      return clamp(Math.min(sceneW / 900, size.h / 880), 0.68, 1.3);
    }

    /** Where the 3D subject sits: the middle of the free area between the copy column and the active card. */
    function focusTarget3d() {
      const step = beatRef.current.step;
      const card = step > 0 && step < STEP_IDS.length - 1 ? cardRects[slotFor(step)] : null;
      const edge = card ? (rtl ? size.w - card.right : card.left) - 24 : size.w * 0.94;
      const free = Math.max(160, edge - size.col);
      return { x: size.col + free * 0.5, y: size.h * 0.57, free };
    }

    function render(time: number, dt: number) {
      const ambient = !pausedRef.current && !reduceQuery.matches;
      const s = storyFromLinear(uDisp);
      const scene = sceneAt(s, uDisp);
      const stage3d = stage3dRef.current;
      if (stage3d) {
        const target = focusTarget3d();
        if (focus3d.x < 0) focus3d = { x: target.x, y: target.y };
        const k = 1 - Math.exp(-dt * 5);
        focus3d = { x: focus3d.x + (target.x - focus3d.x) * k, y: focus3d.y + (target.y - focus3d.y) * k };
        stage3d.frame({
          s,
          u: uDisp,
          scene,
          ambient: ambientT,
          pointer,
          focus: focus3d,
          freeWidth: target.free
        });
        drawLeaders(scene, (a) => stage3d.project(a));
        return;
      }
      const baseCam = cameraAt(s, DESKTOP_POSES);
      const cam = { ...baseCam, zoom: baseCam.zoom * zoomScale() };
      const focus = focusPoint();
      const tsec = time / 1000;

      for (const name of LAYERS) {
        const el = layerRefs.current[name];
        if (!el) continue;
        const lt = layerTransform(cam, LAYER_DEPTHS[name], focus, pointer);
        el.setAttribute("transform", `translate(${lt.tx.toFixed(2)} ${lt.ty.toFixed(2)}) scale(${lt.zoom.toFixed(4)})`);
      }

      nodes.boat?.setAttribute("transform", boatTransform(scene));
      if (nodes.bob) {
        const bobY = ambient ? Math.sin(tsec * 1.4) * 3.2 : 0;
        const bobR = ambient ? Math.sin(tsec * 0.9 + 0.6) * 0.9 : 0;
        nodes.bob.setAttribute("transform", `translate(0 ${bobY.toFixed(2)}) rotate(${bobR.toFixed(2)})`);
      }
      if (nodes.waves) nodes.waves.setAttribute("transform", `translate(${ambient ? (Math.sin(tsec * 0.35) * 10).toFixed(2) : 0} 0)`);
      if (nodes.pennant) nodes.pennant.setAttribute("transform", ambient ? `skewY(${(Math.sin(tsec * 3.1) * 4).toFixed(2)})` : "");
      nodes.routeMask?.setAttribute("stroke-dasharray", `${scene.route.toFixed(4)} 2`);
      nodes.routeEnd?.setAttribute("opacity", scene.route > 0.96 ? "1" : "0");
      nodes.nextRoute?.setAttribute("opacity", (scene.nextRoute * 0.75).toFixed(3));
      nodes.nextBuoy?.setAttribute("opacity", scene.nextRoute.toFixed(3));
      nodes.pings?.setAttribute("opacity", scene.sources.toFixed(3));
      nodes.marker?.setAttribute("opacity", scene.marker.toFixed(3));
      nodes.glow?.setAttribute("opacity", scene.workshop.toFixed(3));
      const landed = scene.crane >= 0.999;
      nodes.boatCrate?.setAttribute("opacity", landed ? "1" : "0");
      nodes.craneLoad?.setAttribute("opacity", landed ? "0" : "1");
      const crane = cranePose(scene.crane);
      nodes.trolley?.setAttribute("x", (crane.x + 7).toFixed(1));
      if (nodes.cable) {
        nodes.cable.setAttribute("x1", (crane.x + 22).toFixed(1));
        nodes.cable.setAttribute("x2", (crane.x + 22).toFixed(1));
        nodes.cable.setAttribute("y2", (crane.y - 10).toFixed(1));
      }
      nodes.crate?.setAttribute("transform", `translate(${crane.x.toFixed(1)} ${crane.y.toFixed(1)})`);

      drawLeaders(scene, (a) => projectMain(cam, focus, SVG_ANCHORS[a].x, SVG_ANCHORS[a].y));
    }

    function toScreen(p: { x: number; y: number }) {
      return { x: rtl ? size.w - p.x : p.x, y: p.y };
    }

    function drawLeaders(scene: SceneState, project: (anchor: HarborAnchor) => ScreenPoint | null) {
      const svg = leaderRef.current;
      if (!svg) return;
      const b = beatRef.current;
      const lines: string[] = [];
      const anchors = LEADER_ANCHORS[b.step] ?? [];
      const card = b.step > 0 ? cardRects[slotFor(b.step)] : null;

      // Buoy tags follow their buoys in every step where they are on screen.
      TAG_ANCHORS.forEach((name, i) => {
        const tag = tagRefs.current[i];
        if (!tag) return;
        const projected = project(name);
        if (!projected) {
          tag.style.opacity = "0";
          return;
        }
        const p = toScreen(projected);
        // Tags never sit over the copy column or under the artifact card.
        const clear = rtl ? p.x < size.w - size.col - 80 : p.x > size.col + 80;
        const underCard = card ? p.x > card.left - 60 && p.x < card.right + 60 && p.y > card.top && p.y < card.bottom + 30 : false;
        const visible = scene.sources > 0.05 && clear && !underCard;
        tag.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) translate(-50%, -100%)`;
        tag.style.opacity = visible ? String(Math.min(1, scene.sources * 1.4)) : "0";
      });

      if (card && anchors.length) {
        anchors.forEach((a, i) => {
          if (b.step === 1 && i >= b.sub + 1) return;
          const projected = project(a);
          if (!projected) return;
          const p = toScreen(projected);
          let from: { x: number; y: number };
          if (b.step === 1 && rowRects[i]) {
            const row = rowRects[i];
            from = { x: rtl ? row.right : row.left, y: row.top + row.height / 2 };
          } else {
            const edgeX = rtl ? card.right : card.left;
            from = { x: edgeX, y: clamp(p.y, card.top + 40, card.bottom - 40) };
          }
          if (Math.abs(from.x - p.x) < 24) return;
          lines.push(
            `<path d="M${from.x.toFixed(1)} ${from.y.toFixed(1)} C${((from.x + p.x) / 2).toFixed(1)} ${from.y.toFixed(1)} ${((from.x + p.x) / 2).toFixed(1)} ${p.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}" />` +
              `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" />`
          );
        });
      }
      svg.innerHTML = lines.join("");
    }

    function updateBeat() {
      const next = beatAt(uTarget);
      const prev = beatRef.current;
      if (next.step !== prev.step || next.sub !== prev.sub) {
        beatRef.current = next;
        setBeat(next);
        window.clearTimeout(measureTimer);
        measureTimer = window.setTimeout(() => {
          measureCards();
          kick();
        }, 480);
      }
    }

    function frame(time: number) {
      raf = 0;
      const dt = last ? Math.min(0.1, (time - last) / 1000) : 0.016;
      last = time;
      const k = 1 - Math.exp(-dt * 9);
      if (uDisp < 0) uDisp = uTarget;
      uDisp += (uTarget - uDisp) * k;
      if (Math.abs(uTarget - uDisp) < 0.0004) uDisp = uTarget;
      if (!pausedRef.current && !reduceQuery.matches) ambientT += dt;
      pointer = {
        x: pointer.x + (pointerTarget.x - pointer.x) * k * 0.6,
        y: pointer.y + (pointerTarget.y - pointer.y) * k * 0.6
      };
      render(time, dt);
      const settled =
        uDisp === uTarget && Math.abs(pointer.x - pointerTarget.x) < 0.002 && Math.abs(pointer.y - pointerTarget.y) < 0.002;
      const ambient = !pausedRef.current && !reduceQuery.matches;
      if (inView && document.visibilityState === "visible" && (!settled || ambient)) {
        raf = requestAnimationFrame(frame);
      } else {
        last = 0;
      }
    }

    function kick() {
      if (!cinematic || raf) return;
      raf = requestAnimationFrame(frame);
    }

    function onScroll() {
      if (!cinematic) return;
      uTarget = linearFromScroll();
      updateBeat();
      kick();
    }

    function onResize() {
      measure();
      uTarget = linearFromScroll();
      uDisp = uTarget;
      updateBeat();
      kick();
    }

    function onPointer(event: PointerEvent) {
      if (event.pointerType === "touch" || !cinematic) return;
      pointerTarget = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1
      };
      kick();
    }

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        if (inView) kick();
      },
      { rootMargin: "0px" }
    );
    io.observe(root);

    const ro = new ResizeObserver(() => onResize());
    ro.observe(root);

    // Cards change height as their beats play (the report expands, the workflow grows).
    const cardRo = new ResizeObserver(() => {
      measureCards();
      kick();
    });
    for (const slot of Object.values(slotRefs.current)) {
      const card = slot?.firstElementChild;
      if (card) cardRo.observe(card);
    }

    const onVisibility = () => kick();
    const onMotionPref = () => onResize();
    const onPauseToggle = () => kick();

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceQuery.addEventListener("change", onMotionPref);
    root.addEventListener("harbor:kick", onPauseToggle);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(measureTimer);
      io.disconnect();
      ro.disconnect();
      cardRo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceQuery.removeEventListener("change", onMotionPref);
      root.removeEventListener("harbor:kick", onPauseToggle);
    };
  }, [rtl]);

  // Phones: one live opening view, and 3D stills for the other chapters, from the same WebGL context.
  useEffect(() => {
    const root = rootRef.current;
    if (load3d !== "vignette" || !root) return;
    const live = root.querySelector<HTMLElement>(".hs-vignette--opening");
    let raf = 0;
    let last = 0;
    let t = 0;
    let inView = true;
    let stills = 0;
    let timer = 0;

    function renderLive() {
      const stage = stage3dRef.current;
      const box = live?.querySelector<HTMLElement>(".hs-vignette__live");
      if (!stage || !box) return false;
      const w = box.clientWidth;
      const h = box.clientHeight;
      stage.frame({ s: 0, u: 0.45, scene: sceneForStep(0), ambient: t, pointer: { x: 0, y: 0 }, focus: { x: w / 2, y: h * 0.56 }, freeWidth: w });
      live?.classList.add("is-3d");
      return true;
    }

    /** One still per chapter vignette, spread over a few tasks so scrolling stays smooth. */
    function renderStills() {
      const stage = stage3dRef.current;
      const items = Array.from(root!.querySelectorAll<HTMLElement>(".hs-vignette:not(.hs-vignette--opening)"));
      const el = items[stills];
      if (!stage || !el) return;
      stills += 1;
      const step = Number(el.dataset.step);
      const result = stage.still(step, el.clientWidth, el.clientHeight);
      renderLive();
      if (result) {
        let img = el.querySelector<HTMLImageElement>(".hs-vignette__still");
        if (!img) {
          img = document.createElement("img");
          img.className = "hs-vignette__still";
          img.alt = "";
          el.prepend(img);
        }
        img.onload = () => el.classList.add("is-3d");
        img.src = result.url;
        el.querySelectorAll<HTMLElement>(".hs-tag--vignette").forEach((tag, i) => {
          const p = result.tags[i];
          if (!p) return;
          tag.classList.remove("hs-tag--below");
          tag.style.setProperty("--x", `${((p.x / el.clientWidth) * 100).toFixed(2)}%`);
          tag.style.setProperty("--y", `${((p.y / el.clientHeight) * 100).toFixed(2)}%`);
        });
      }
      timer = window.setTimeout(renderStills, 40);
    }

    function frame(time: number) {
      raf = 0;
      const dt = last ? Math.min(0.1, (time - last) / 1000) : 0.016;
      last = time;
      const ambient = !pausedRef.current;
      if (ambient) t += dt;
      if (!renderLive()) return;
      if (stills === 0) timer = window.setTimeout(renderStills, 60);
      if (inView && ambient && document.visibilityState === "visible") raf = requestAnimationFrame(frame);
      else last = 0;
    }

    function kick() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      if (inView) kick();
    });
    if (live) io.observe(live);
    root.addEventListener("harbor:kick", kick);
    document.addEventListener("visibilitychange", kick);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      io.disconnect();
      root.removeEventListener("harbor:kick", kick);
      document.removeEventListener("visibilitychange", kick);
    };
  }, [load3d]);

  const togglePause = () => {
    setPaused((p) => !p);
    // Let the loop restart (or settle) under the new preference.
    requestAnimationFrame(() => rootRef.current?.dispatchEvent(new Event("harbor:kick")));
  };

  const jumpTo = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const el = stepRefs.current[index];
    if (!el) return;
    const stage = stageRef.current;
    if (!stage || getComputedStyle(stage).display === "none") return; // stacked layout: native anchor jump
    event.preventDefault();
    const r = el.getBoundingClientRect();
    const top = r.top + window.scrollY + (r.height - window.innerHeight) / 2;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
    history.replaceState(null, "", `#${STEP_IDS[index]}`);
  };

  const sources = t.raw("chart.sources") as { label: string }[];
  const chapters = t.raw("story.chapters") as string[];
  const chapterSteps = [1, 2, 3, 4, 6];
  const activeChapter = chapterSteps.reduce((acc, step, i) => (beat.step >= step ? i : acc), -1);
  const initial = sceneAt(0, 0);

  const copy = (id: (typeof STEP_IDS)[number]) => ({
    label: t(`story.${id}.label`),
    title: t(`story.${id}.title`),
    body: t(`story.${id}.body`)
  });

  return (
    <section
      ref={rootRef}
      className="hs"
      data-story-root
      style={{ "--hs-steps": STEP_IDS.length } as CSSProperties}
    >
      <HarborDefs />
      <div className="hs-colmark" aria-hidden />

      <div ref={stageRef} className="hs-stage" aria-hidden data-harbor3d="fallback">
        <svg className="hs-world" width="100%" height="100%">
          <Layers scene={initial} maskId={maskId} refs={setLayerRef} />
        </svg>
        {load3d === "stage" ? (
          <div className="hs-world3d">
            <HarborScene3D layout="stage" mirror={rtl} onStage={onStage3d} onReady={onReady3d} onError={onError3d} />
          </div>
        ) : null}
        <div className="hs-grain" />
        <div className="hs-stage__veil" />
        <svg ref={leaderRef} className="hs-leaders" width="100%" height="100%" />
        <div className="hs-tags">
          {sources.map((s, i) => (
            <span
              key={s.label}
              ref={(el) => {
                tagRefs.current[i] = el;
              }}
              className="hs-tag"
              style={{ opacity: 0 }}
            >
              {s.label}
            </span>
          ))}
        </div>
        <div className="hs-artifacts">
          {[1, 2, 3, 4, 5, 6].map((slot) => {
            // The opening keeps the scene clear; the chart arrives with the first chapter.
            const active = slotFor(beat.step) === slot && beat.step > 0 && beat.step < STEP_IDS.length - 1;
            const step = slot === 1 ? (beat.step === 0 ? 0 : 1) : slot;
            const sub = beat.step === step ? beat.sub : beat.step > step ? 99 : 0;
            return (
              <div
                key={slot}
                ref={(el) => {
                  slotRefs.current[slot] = el;
                }}
                className={`hs-slot hs-slot--${slot}${active ? " is-active" : ""}${beat.step > slot && slot !== 1 ? " is-past" : ""}`}
              >
                <StepArtifact step={step} sub={Math.min(sub, 9)} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="hs-steps">
        {STEP_IDS.map((id, index) => {
          const isHero = id === "opening";
          const isClose = id === "close";
          const style = { "--len": STEP_LENGTH[id] } as CSSProperties;
          return (
            <article
              key={id}
              id={isHero ? "top" : id}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className={`hs-step hs-step--${id}`}
              style={style}
              aria-labelledby={`hs-title-${id}`}
            >
              <div className="hs-step__pin">
                <div className="hs-step__copy">
                  {isHero ? (
                    <>
                      {/* With the cobalt hero above, that hero owns the page h1. */}
                      {belowHero ? (
                        <h2 id="hs-title-opening" className="hs-hero__title">
                          <span>{t("hero.titleA")}</span> <span className="hs-hero__accent">{t("hero.titleB")}</span>
                        </h2>
                      ) : (
                        <h1 id="hs-title-opening" className="hs-hero__title">
                          <span>{t("hero.titleA")}</span> <span className="hs-hero__accent">{t("hero.titleB")}</span>
                        </h1>
                      )}
                      <p className="hs-hero__support">{t("hero.support")}</p>
                      <div className="hs-actions">
                        <a href="#sample-report" className="hs-btn hs-btn--primary">
                          {t("hero.primary")}
                        </a>
                        <Link href="/contact" className="hs-btn hs-btn--secondary">
                          {t("hero.secondary")}
                        </Link>
                      </div>
                      <p className="hs-hero__note">{t("hero.note")}</p>
                      <a href="#find" className="hs-cue" onClick={(e) => jumpTo(e, 1)}>
                        <span aria-hidden className="hs-cue__line" />
                        {t("hero.cue")}
                      </a>
                    </>
                  ) : isClose ? (
                    <>
                      <h2 id="hs-title-close" className="hs-step__title">
                        {t("story.close.title")}
                      </h2>
                      <p className="hs-step__body">{t("story.close.body")}</p>
                      <div className="hs-doors">
                        <a href="#sample-report" className="hs-door hs-door--report">
                          <span className="hs-door__title">{t("story.close.reportTitle")}</span>
                          <span className="hs-door__body">{t("story.close.reportBody")}</span>
                          <span className="hs-door__action">{t("hero.primary")}</span>
                        </a>
                        <Link href="/contact" className="hs-door hs-door--project">
                          <span className="hs-door__title">{t("story.close.projectTitle")}</span>
                          <span className="hs-door__body">{t("story.close.projectBody")}</span>
                          <span className="hs-door__action">{t("hero.secondary")}</span>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="hs-step__label">{copy(id).label}</p>
                      <h2 id={`hs-title-${id}`} className="hs-step__title">
                        {copy(id).title}
                      </h2>
                      <p className="hs-step__body">{copy(id).body}</p>
                      {id === "evidence" || id === "workflow" || id === "review" || id === "report" ? (
                        <p className="hs-step__body hs-step__body--second">{t(`story.${id}.body2`)}</p>
                      ) : null}
                      {id === "find" ? <p className="hs-step__aside">{t("story.find.aside")}</p> : null}
                    </>
                  )}
                </div>
                {!isClose ? (
                  <div className="hs-step__demo">
                    <Vignette
                      step={index}
                      live={
                        index === 0 && load3d === "vignette" ? (
                          <div className="hs-vignette__live">
                            <HarborScene3D layout="vignette" mirror={rtl} onStage={onStage3d} onReady={onReady3d} onError={onError3d} />
                          </div>
                        ) : null
                      }
                    />
                    {index === 0 && load3d === "vignette" ? (
                      <button type="button" className="hs-live-toggle" aria-pressed={paused} onClick={togglePause}>
                        {paused ? t("story.play") : t("story.pause")}
                      </button>
                    ) : null}
                    {!isHero ? <StepArtifact step={index} sub={9} inline /> : null}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <nav className="hs-nav" aria-label={t("story.navLabel")}>
        <ol>
          {chapters.map((label, i) => (
            <li key={label}>
              <a
                href={`#${STEP_IDS[chapterSteps[i]]}`}
                className={i === activeChapter ? "is-active" : undefined}
                aria-current={i === activeChapter ? "step" : undefined}
                onClick={(e) => jumpTo(e, chapterSteps[i])}
              >
                <span className="hs-nav__num">{i + 1}</span>
                <span className="hs-nav__label">{label}</span>
              </a>
            </li>
          ))}
        </ol>
        <button type="button" className="hs-nav__pause" aria-pressed={paused} onClick={togglePause}>
          {paused ? t("story.play") : t("story.pause")}
        </button>
      </nav>
    </section>
  );
}
