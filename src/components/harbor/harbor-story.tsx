"use client";

import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ProviderMark, StepDemo } from "./artifacts";
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
import type { ProviderId } from "./providers";
import {
  DESKTOP_POSES,
  MOBILE_POSES,
  SOURCE_BUOYS,
  STEP_BEATS,
  STEP_IDS,
  STEP_LENGTH,
  StoryCues,
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

/** Steps 1–6 are the chapters with a narrative card, lines and a demonstration. */
const CHAPTER_STEPS = [1, 2, 3, 4, 5, 6];

type OverlaySpec = {
  key: string;
  anchor: HarborAnchor;
  kind: "badge" | "label";
  provider?: ProviderId;
  /** Accent (cobalt) for the active finding F01 only. */
  accent?: boolean;
  /** The active provider's badge is larger than the supporting ones. */
  lead?: boolean;
  /** Opacity on the cinematic stage for a beat and scene. */
  show: (b: Beat, scene: SceneState) => number;
  /** Phone and reduced-motion stills that carry this overlay. */
  stills?: number[];
  /** Stem length in px (a longer stem lifts a label above its neighbours). */
  stem?: number;
};

/**
 * Context labels and platform badges attached to things in the harbor. They
 * follow their anchors as the camera and the boats move; a label that would
 * cover a card, the chapter bar or another label is hidden instead.
 */
const OVERLAYS: OverlaySpec[] = [
  { key: "provider0", anchor: "provider0", kind: "badge", provider: "chatgpt", lead: true, show: (b, s) => (b.step === 1 ? s.providers : 0), stills: [1] },
  { key: "provider1", anchor: "provider1", kind: "badge", provider: "google", show: (b, s) => (b.step === 1 && b.sub < 2 ? s.providers * 0.92 : 0) },
  { key: "provider2", anchor: "provider2", kind: "badge", provider: "perplexity", show: (b, s) => (b.step === 1 && b.sub < 2 ? s.providers * 0.92 : 0) },
  { key: "boat", anchor: "boat", kind: "label", show: (b) => (b.step === 1 && b.sub < 2 ? 1 : 0) },
  { key: "area0", anchor: "tag0", kind: "label", show: (b, s) => (b.step === 1 ? s.sources : 0) },
  { key: "area1", anchor: "tag1", kind: "label", stem: 22, show: (b, s) => (b.step === 1 ? s.sources : 0) },
  { key: "area2", anchor: "tag2", kind: "label", stem: 92, show: (b, s) => (b.step === 1 ? s.sources : 0) },
  { key: "f01", anchor: "marker", kind: "label", accent: true, show: (b) => (b.step === 2 && b.sub >= 1 ? 1 : 0), stills: [2] },
  { key: "crate", anchor: "crate", kind: "label", accent: true, show: (b) => (b.step === 4 ? 1 : 0), stills: [4] },
  { key: "client", anchor: "client", kind: "label", show: (b) => (b.step === 6 ? 1 : 0), stills: [6] },
  { key: "next", anchor: "nextBuoy", kind: "label", show: (b, s) => (b.step === 6 ? s.nextRoute : 0) }
];

/** Demonstration-card leaders: from the card to the thing it is about. */
const LEADERS: Record<number, (b: Beat) => HarborAnchor | null> = {
  1: () => "provider0",
  2: (b) => (b.sub >= 1 ? "marker" : null)
};

/** The same anchors in the illustrated (SVG) harbor's main-layer world units. */
const SVG_ANCHORS: Record<HarborAnchor, { x: number; y: number }> = {
  tag0: { x: SOURCE_BUOYS[0].x, y: SOURCE_BUOYS[0].y - 96 },
  tag1: { x: SOURCE_BUOYS[1].x, y: SOURCE_BUOYS[1].y - 96 },
  tag2: { x: SOURCE_BUOYS[2].x, y: SOURCE_BUOYS[2].y - 96 },
  source0: { x: SOURCE_BUOYS[0].x, y: SOURCE_BUOYS[0].y - 96 },
  source1: { x: SOURCE_BUOYS[1].x, y: SOURCE_BUOYS[1].y - 96 },
  source2: { x: SOURCE_BUOYS[2].x, y: SOURCE_BUOYS[2].y - 96 },
  marker: { x: 2060, y: 640 },
  route: { x: 2700, y: 822 },
  crate: { x: 3022, y: 700 },
  workshop: { x: 3594, y: 676 },
  boat: { x: 1040, y: 420 },
  provider0: { x: 1790, y: 560 },
  provider1: { x: 1910, y: 590 },
  provider2: { x: 1660, y: 590 },
  client: { x: 3690, y: 560 },
  nextBuoy: { x: 4340, y: 790 }
};

/** Vignette framing (portrait-friendly stills for mobile and reduced motion). */
const VIGNETTE = { w: 600, h: 380 };

type Rect = { left: number; top: number; right: number; bottom: number };

function overlaps(a: Rect, b: Rect, pad = 0) {
  return a.left < b.right + pad && a.right > b.left - pad && a.top < b.bottom + pad && a.bottom > b.top - pad;
}

/** Which line a step shows: its own line while current, its last line once passed, its first line before. */
function lineFor(step: number, beat: Beat) {
  if (step < beat.step) return STEP_BEATS[STEP_IDS[step]] - 1;
  if (step > beat.step) return 0;
  return beat.sub;
}

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

/** The visible content of one context label or badge. */
function OverlayBody({ spec, text }: { spec: OverlaySpec; text: string }) {
  if (spec.kind === "badge" && spec.provider) {
    return <ProviderMark id={spec.provider} size={spec.lead ? 30 : 22} />;
  }
  return (
    <>
      {spec.accent ? <span className="hs-ctx__dot" aria-hidden /> : null}
      {text}
    </>
  );
}

/** A static still of the harbor for one step. */
function Vignette({ step, live, texts }: { step: number; live?: ReactNode; texts: Record<string, string> }) {
  const maskId = `hw-route-${useId().replace(/:/g, "")}`;
  const scene = sceneForStep(step);
  const cam = MOBILE_POSES[step];
  const focus = { x: VIGNETTE.w / 2, y: VIGNETTE.h * 0.58 };
  const overlays = OVERLAYS.filter((o) => o.stills?.includes(step));
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
      {overlays.map((o) => {
        const a = SVG_ANCHORS[o.anchor];
        const p = projectMain(cam, focus, a.x, a.y);
        return (
          <span
            key={o.key}
            data-anchor={o.anchor}
            className={`hs-ctx hs-ctx--${o.kind} hs-ctx--still${o.accent ? " hs-ctx--accent" : ""}${o.lead ? " hs-ctx--lead" : ""}`}
            style={{ "--x": `${(p.x / VIGNETTE.w) * 100}%`, "--y": `${(p.y / VIGNETTE.h) * 100}%` } as CSSProperties}
          >
            <OverlayBody spec={o} text={texts[o.key] ?? ""} />
          </span>
        );
      })}
    </div>
  );
}

/** A headline whose words rise into place when its chapter arrives. */
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          {i > 0 ? " " : null}
          <span className="hs-word" style={{ "--i": i } as CSSProperties}>
            {w}
          </span>
        </span>
      ))}
    </>
  );
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
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const markRefs = useRef<(HTMLElement | null)[]>([]);
  const slotRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<(index: number, smooth: boolean) => boolean>(() => false);

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
    let blockers: Rect[] = [];
    let overlaySizes: { w: number; h: number; stem: number }[] = [];
    const overlayHidden = new Set<number>();
    let measureTimer = 0;
    let ambientT = 0;
    // Slow devices (software WebGL, old phones): once the story is settled, ambient-only
    // frames are throttled so text, cards and controls keep the main thread.
    let frameEma = 0;
    let frameCount = 0;
    let lowPower = false;
    let idleTimer = 0;
    let focus3d = { x: -1, y: 0 };

    const q = <T extends Element>(sel: string) => stage.querySelector<T>(sel);
    const nodes = {
      bob: q<SVGGElement>('[data-hw="boat-bob"]'),
      boat: q<SVGGElement>('[data-hw="boat"]'),
      boatCrate: q<SVGGElement>('[data-hw="boat-crate"]'),
      routeMask: q<SVGPathElement>('[data-hw="route-mask"]'),
      routeEnd: q<SVGGElement>('[data-hw="route-end"]'),
      nextRoute: q<SVGPathElement>('[data-hw="next-route"]'),
      nextBuoy: q<SVGGElement>('[data-hw="next-buoy"]'),
      pings: q<SVGGElement>('[data-hw="source-pings"]'),
      marker: q<SVGGElement>('[data-hw="marker-ring"]'),
      providers: q<SVGGElement>('[data-hw="providers"]'),
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
      anchors = markRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top + scrollY + (r.height - vh) / 2;
      });
      if (anchors.length) anchors[0] = StoryScroll.firstAnchor(anchors[0], root!.getBoundingClientRect().top + scrollY);
      measureCards();
    }

    /**
     * Card, chapter-bar and overlay sizes relative to the stage, so overlays
     * and leaders need no per-frame layout reads.
     */
    function measureCards() {
      const origin = stage!.getBoundingClientRect();
      const rel = (r: DOMRect) => new DOMRect(r.left - origin.left, r.top - origin.top, r.width, r.height);
      const room = stage!.querySelector<HTMLElement>(".hs-artifacts")?.clientHeight ?? 0;
      cardRects = {};
      for (const key of Object.keys(slotRefs.current)) {
        const el = slotRefs.current[Number(key)]?.firstElementChild as HTMLElement | null;
        if (el && room) {
          // A card taller than the stage scales down to stay whole on short screens.
          const fit = Math.max(0.8, Math.min(1, room / el.offsetHeight));
          el.style.transform = fit < 1 ? `scale(${fit.toFixed(3)})` : "";
          el.style.transformOrigin = rtl ? "top left" : "top right";
        }
        cardRects[Number(key)] = el ? rel(el.getBoundingClientRect()) : null;
      }
      const step = beatRef.current.step;
      blockers = [];
      const card = cardRects[step];
      if (card) blockers.push({ left: card.left, top: card.top, right: card.right, bottom: card.bottom });
      const narr = deckRef.current?.querySelector<HTMLElement>(`.hs-step[data-step="${step}"] .hs-step__copy`);
      if (narr) {
        const r = rel(narr.getBoundingClientRect());
        blockers.push({ left: r.left, top: r.top, right: r.right + 8, bottom: r.bottom + 8 });
      }
      if (navRef.current) {
        const r = rel(navRef.current.getBoundingClientRect());
        blockers.push({ left: r.left, top: r.top, right: r.right, bottom: r.bottom });
      }
      const header = document.querySelector<HTMLElement>(".hh");
      blockers.push({ left: 0, top: 0, right: size.w, bottom: (header?.getBoundingClientRect().bottom ?? 64) + 4 });
      overlaySizes = OVERLAYS.map((o, i) => {
        const el = overlayRefs.current[i];
        return { w: el?.offsetWidth ?? 0, h: el?.offsetHeight ?? 0, stem: o.stem ?? (o.kind === "badge" ? 12 : 16) };
      });
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
      const card = step > 0 && step < STEP_IDS.length - 1 ? cardRects[step] : null;
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
        drawOverlays(scene, (a) => stage3d.project(a));
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
      nodes.providers?.setAttribute("transform", `translate(${((1 - scene.providers) * 160).toFixed(1)} 0)`);
      nodes.providers?.setAttribute("opacity", (0.35 + scene.providers * 0.65).toFixed(3));
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

      drawOverlays(scene, (a) => {
        if (a === "crate") return projectMain(cam, focus, crane.x + 22, crane.y - 26);
        if (a === "boat") return projectMain(cam, focus, scene.boat.x, scene.boat.y - 330);
        return projectMain(cam, focus, SVG_ANCHORS[a].x, SVG_ANCHORS[a].y);
      });
    }

    function toScreen(p: { x: number; y: number }) {
      return { x: rtl ? size.w - p.x : p.x, y: p.y };
    }

    /** Context labels and badges follow their anchors; leaders tie the active card to its subject. */
    function drawOverlays(scene: SceneState, project: (anchor: HarborAnchor) => ScreenPoint | null) {
      const b = beatRef.current;
      const placed: Rect[] = [];
      const points: Partial<Record<HarborAnchor, { x: number; y: number }>> = {};
      OVERLAYS.forEach((o, i) => {
        const el = overlayRefs.current[i];
        if (!el) return;
        let opacity = o.show(b, scene);
        const projected = opacity > 0.01 ? project(o.anchor) : null;
        if (!projected) {
          el.style.opacity = "0";
          return;
        }
        const p = toScreen(projected);
        const dim = overlaySizes[i] ?? { w: 0, h: 0, stem: 16 };
        const box = { left: p.x - dim.w / 2, top: p.y - dim.stem - dim.h, right: p.x + dim.w / 2, bottom: p.y };
        // Hysteresis: a label hidden by a collision needs a little clearance before it returns.
        const pad = overlayHidden.has(i) ? 10 : 0;
        const hits = (r: Rect) => blockers.some((x) => overlaps(r, x, pad)) || placed.some((x) => overlaps(r, x, 4 + pad));
        // A label may slide sideways along its stem (never off it) to clear a card or another label.
        if (hits(box) && o.kind === "label") {
          const room = Math.max(0, dim.w / 2 - 14);
          for (const dx of [-room * 0.5, room * 0.5, -room, room]) {
            const moved = { ...box, left: box.left + dx, right: box.right + dx };
            if (!hits(moved)) {
              box.left = moved.left;
              box.right = moved.right;
              break;
            }
          }
        }
        const offStage = box.left < 4 || box.right > size.w - 4 || box.top < 0 || box.bottom > size.h;
        const blocked = offStage || hits(box);
        if (blocked) {
          overlayHidden.add(i);
          opacity = 0;
        } else {
          overlayHidden.delete(i);
          placed.push(box);
          // Leaders meet the label on the side facing the card.
          points[o.anchor] = { x: rtl ? box.left : box.right, y: box.top + dim.h / 2 };
        }
        el.style.setProperty("--stem-x", `${(p.x - box.left).toFixed(1)}px`);
        el.style.transform = `translate(${box.left.toFixed(1)}px, ${box.top.toFixed(1)}px)`;
        el.style.opacity = opacity.toFixed(3);
      });

      const svg = leaderRef.current;
      if (!svg) return;
      const card = cardRects[b.step];
      const anchor = LEADERS[b.step]?.(b) ?? null;
      let path = "";
      if (card && anchor) {
        // Only a visible label gets a leader.
        const end = points[anchor];
        if (end) {
          const edgeX = rtl ? card.right : card.left;
          const from = { x: edgeX, y: clamp(end.y, card.top + 36, card.bottom - 36) };
          if (Math.abs(from.x - end.x) > 24 && (rtl ? end.x > from.x : end.x < from.x)) {
            const mx = (from.x + end.x) / 2;
            path =
              `<path d="M${from.x.toFixed(1)} ${from.y.toFixed(1)} C${mx.toFixed(1)} ${from.y.toFixed(1)} ${mx.toFixed(1)} ${end.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}" />` +
              `<circle cx="${from.x.toFixed(1)}" cy="${from.y.toFixed(1)}" r="3.5" />`;
          }
        }
      }
      if (svg.dataset.d !== path) {
        svg.dataset.d = path;
        svg.innerHTML = path;
      }
    }

    function updateBeat(u: number) {
      const next = StoryCues.beatAt(u);
      const prev = beatRef.current;
      if (next.step !== prev.step || next.sub !== prev.sub) {
        beatRef.current = next;
        setBeat(next);
        window.clearTimeout(measureTimer);
        measureTimer = window.setTimeout(() => {
          measureCards();
          kick();
        }, 420);
      }
    }

    function frame(time: number) {
      raf = 0;
      const realDt = last ? (time - last) / 1000 : 0.016;
      const dt = Math.min(0.1, realDt);
      last = time;
      if (stage3dRef.current && !lowPower) {
        frameCount += 1;
        frameEma = frameCount === 1 ? realDt : frameEma * 0.9 + realDt * 0.1;
        if (frameCount > 24 && frameEma > 0.045) lowPower = true;
      }
      const k = 1 - Math.exp(-dt * 9);
      if (uDisp < 0) uDisp = uTarget;
      uDisp += (uTarget - uDisp) * k;
      if (Math.abs(uTarget - uDisp) < 0.0004) uDisp = uTarget;
      // Copy, cards and overlays follow the same smoothed position as the scene.
      updateBeat(uDisp);
      if (!pausedRef.current && !reduceQuery.matches) ambientT += Math.min(0.3, realDt);
      pointer = {
        x: pointer.x + (pointerTarget.x - pointer.x) * k * 0.6,
        y: pointer.y + (pointerTarget.y - pointer.y) * k * 0.6
      };
      render(time, dt);
      const settled =
        uDisp === uTarget && Math.abs(pointer.x - pointerTarget.x) < 0.002 && Math.abs(pointer.y - pointerTarget.y) < 0.002;
      const ambient = !pausedRef.current && !reduceQuery.matches;
      if (inView && document.visibilityState === "visible" && (!settled || ambient)) {
        if (settled && lowPower) {
          idleTimer = window.setTimeout(() => {
            idleTimer = 0;
            kick();
          }, 220);
        } else {
          raf = requestAnimationFrame(frame);
        }
      } else {
        last = 0;
      }
    }

    function kick() {
      if (!cinematic || raf) return;
      window.clearTimeout(idleTimer);
      idleTimer = 0;
      raf = requestAnimationFrame(frame);
    }

    function onScroll() {
      if (!cinematic) return;
      uTarget = linearFromScroll();
      kick();
    }

    function onResize() {
      measure();
      uTarget = linearFromScroll();
      uDisp = uTarget;
      updateBeat(uDisp);
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

    /** Scroll to a step's centre, so every jump lands on the same settled state. */
    jumpRef.current = (index: number, smooth: boolean) => {
      if (!cinematic) return false;
      const el = markRefs.current[index];
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const top = index === 0 ? anchors[0] : r.top + window.scrollY + (r.height - window.innerHeight) / 2;
      window.scrollTo({ top, behavior: smooth && !reduceQuery.matches ? "smooth" : "auto" });
      return true;
    };

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

    // Cards and labels change size with the language and fonts.
    const cardRo = new ResizeObserver(() => {
      measureCards();
      kick();
    });
    for (const slot of Object.values(slotRefs.current)) {
      const card = slot?.firstElementChild;
      if (card) cardRo.observe(card);
    }
    overlayRefs.current.forEach((el) => el && cardRo.observe(el));

    const onVisibility = () => kick();
    const onMotionPref = () => onResize();
    const onPauseToggle = () => kick();

    onResize();
    // A chapter link opened directly (/#report) lands on that chapter's settled state.
    const hashIndex = STEP_IDS.indexOf(window.location.hash.slice(1) as (typeof STEP_IDS)[number]);
    if (hashIndex > 0) jumpRef.current(hashIndex, false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceQuery.addEventListener("change", onMotionPref);
    root.addEventListener("harbor:kick", onPauseToggle);
    document.fonts?.ready.then(() => {
      measureCards();
      kick();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(measureTimer);
      window.clearTimeout(idleTimer);
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
    let stillsStarted = false;
    let timer = 0;

    function renderLive() {
      const stage = stage3dRef.current;
      const box = live?.querySelector<HTMLElement>(".hs-vignette__live");
      if (!stage || !box) return false;
      const w = box.clientWidth;
      const h = box.clientHeight;
      stage.frame({ s: 0, u: 0, scene: sceneForStep(0), ambient: t, pointer: { x: 0, y: 0 }, focus: { x: w / 2, y: h * 0.56 }, freeWidth: w });
      live?.classList.add("is-3d");
      return true;
    }

    /**
     * One still per chapter vignette, spread over a few tasks so scrolling stays
     * smooth; the vignette nearest the viewport is rendered first.
     */
    function renderStills() {
      const stage = stage3dRef.current;
      const mid = window.innerHeight / 2;
      const items = Array.from(root!.querySelectorAll<HTMLElement>(".hs-vignette:not(.hs-vignette--opening):not([data-still])"));
      const distance = (e: HTMLElement) => {
        const r = e.getBoundingClientRect();
        return Math.abs(r.top + r.height / 2 - mid);
      };
      const el = items.sort((a, b) => distance(a) - distance(b))[0];
      if (!stage || !el) return;
      el.dataset.still = "1";
      const step = Number(el.dataset.step);
      const overlays = Array.from(el.querySelectorAll<HTMLElement>(".hs-ctx--still"));
      const anchors = overlays.map((o) => o.dataset.anchor as HarborAnchor);
      const result = stage.still(step, el.clientWidth, el.clientHeight, anchors);
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
        overlays.forEach((tag, i) => {
          const p = result.points[i];
          if (!p) {
            tag.style.opacity = "0";
            return;
          }
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
      if (!stillsStarted) {
        stillsStarted = true;
        timer = window.setTimeout(renderStills, 60);
      }
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
    if (!jumpRef.current(index, true)) return; // stacked layout: native anchor jump
    event.preventDefault();
    history.replaceState(null, "", index === 0 ? "#top" : `#${STEP_IDS[index]}`);
  };

  /** Keyboard focus moving into a chapter that isn't showing brings that chapter into view. */
  const onDeckFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    const article = (event.target as HTMLElement).closest<HTMLElement>(".hs-step");
    const index = Number(article?.dataset.step);
    if (Number.isFinite(index) && index !== beatRef.current.step) jumpRef.current(index, false);
  };

  const chapters = t.raw("story.chapters") as string[];
  const activeChapter = CHAPTER_STEPS.reduce((acc, step, i) => (beat.step >= step ? i : acc), -1);
  const initial = sceneAt(0, 0);
  const areas = t.raw("ask.areas") as string[];
  const overlayText: Record<string, string> = {
    boat: t("ask.boat"),
    area0: areas[0],
    area1: areas[1],
    area2: areas[2],
    f01: `F01 · ${(t.raw("report.findings") as { title: string }[])[0].title}`,
    crate: t("dock.crate"),
    client: t("measure.client"),
    next: t("measure.next")
  };
  const hintId = `hs-motion-hint-${useId().replace(/:/g, "")}`;

  const nav = (
    <nav ref={navRef} className="hs-nav" aria-label={t("story.navLabel")}>
      <ol>
        {chapters.map((label, i) => (
          <li key={label}>
            <a
              href={`#${STEP_IDS[CHAPTER_STEPS[i]]}`}
              className={i === activeChapter ? "is-active" : undefined}
              aria-current={i === activeChapter ? "step" : undefined}
              onClick={(e) => jumpTo(e, CHAPTER_STEPS[i])}
            >
              <span className="hs-nav__num">{i + 1}</span>
              <span className="hs-nav__label">{label}</span>
            </a>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="hs-nav__pause"
        aria-pressed={paused}
        aria-describedby={hintId}
        title={t("story.motionHint")}
        onClick={togglePause}
      >
        <span className={`hs-nav__glyph${paused ? " is-play" : ""}`} aria-hidden />
        {paused ? t("story.play") : t("story.pause")}
      </button>
      <span id={hintId} className="sr-only">
        {t("story.motionHint")}
      </span>
    </nav>
  );

  return (
    <section
      ref={rootRef}
      className={`hs${paused ? " is-still" : ""}`}
      data-story-root
      style={{ "--hs-steps": STEP_IDS.length } as CSSProperties}
    >
      <HarborDefs />
      <div className="hs-colmark" aria-hidden />

      <div ref={stageRef} className="hs-stage" aria-hidden data-harbor3d="fallback" data-step={beat.step}>
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
        <div className="hs-overlays">
          {OVERLAYS.map((o, i) => (
            <span
              key={o.key}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className={`hs-ctx hs-ctx--${o.kind}${o.accent ? " hs-ctx--accent" : ""}${o.lead ? " hs-ctx--lead" : ""}`}
              style={{ opacity: 0, ...(o.stem ? { "--stem": `${o.stem}px` } : null) } as CSSProperties}
            >
              <OverlayBody spec={o} text={overlayText[o.key] ?? ""} />
            </span>
          ))}
        </div>
        <div className="hs-artifacts">
          {CHAPTER_STEPS.map((step) => {
            const active = beat.step === step;
            return (
              <div
                key={step}
                ref={(el) => {
                  slotRefs.current[step] = el;
                }}
                className={`hs-slot hs-slot--${step}${active ? " is-active" : ""}${beat.step > step ? " is-past" : ""}`}
              >
                <StepDemo step={step} sub={lineFor(step, beat)} />
              </div>
            );
          })}
        </div>
      </div>

      <div ref={deckRef} className="hs-deck" onFocus={onDeckFocus}>
        {STEP_IDS.map((id, index) => {
          const isHero = id === "opening";
          const isClose = id === "close";
          const current = beat.step === index;
          const article = (
            <article
              key={id}
              id={isHero ? "top" : id}
              data-step={index}
              className={`hs-step hs-step--${id}${current ? " is-current" : ""}${beat.step > index ? " is-past" : ""}`}
              aria-labelledby={`hs-title-${id}`}
            >
              <div className="hs-step__pin">
                {isHero ? (
                  <div className="hs-step__copy">
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
                  </div>
                ) : isClose ? (
                  <div className="hs-step__copy hs-narr hs-narr--close">
                    <h2 id="hs-title-close" className="hs-step__title hs-close__title">
                      <span className="hs-close__line">
                        <Words text={t("story.close.titleA")} />
                      </span>{" "}
                      <span className="hs-close__line hs-close__line--accent">
                        <Words text={t("story.close.titleB")} />
                      </span>
                    </h2>
                    <p className="hs-close__body">{t("story.close.body")}</p>
                    <div className="hs-doors">
                      <a href="#sample-report" className="hs-door">
                        <span className="hs-door__title">{t("story.close.reportTitle")}</span>
                        <span className="hs-door__body">{t("story.close.reportBody")}</span>
                        <span className="hs-door__action hs-btn hs-btn--primary">{t("hero.primary")}</span>
                      </a>
                      <Link href="/contact" className="hs-door">
                        <span className="hs-door__title">{t("story.close.projectTitle")}</span>
                        <span className="hs-door__body">{t("story.close.projectBody")}</span>
                        <span className="hs-door__action hs-btn hs-btn--secondary">{t("hero.secondary")}</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="hs-step__copy hs-narr">
                    <p className="hs-narr__label">
                      <span className="hs-narr__num" dir="ltr">
                        {String(index).padStart(2, "0")}
                      </span>
                      {t(`story.${id}.label`)}
                    </p>
                    <h2 id={`hs-title-${id}`} className="hs-step__title">
                      <Words text={t(`story.${id}.title`)} />
                    </h2>
                    <div className="hs-lines">
                      {(t.raw(`story.${id}.lines`) as string[]).map((line, i) => {
                        const at = lineFor(index, beat);
                        return (
                          <p key={i} className={`hs-line${i === at ? " is-on" : i < at ? " is-done" : ""}`}>
                            {line}
                          </p>
                        );
                      })}
                    </div>
                    <span className="hs-dots" aria-hidden>
                      {Array.from({ length: STEP_BEATS[id] }, (_, i) => (
                        <i key={i} className={i === lineFor(index, beat) ? "is-on" : i < lineFor(index, beat) ? "is-done" : undefined} />
                      ))}
                    </span>
                  </div>
                )}
                {!isClose ? (
                  <div className="hs-step__demo">
                    <Vignette
                      step={index}
                      texts={overlayText}
                      live={
                        index === 0 && load3d === "vignette" ? (
                          <div className="hs-vignette__live">
                            <HarborScene3D layout="vignette" mirror={rtl} onStage={onStage3d} onReady={onReady3d} onError={onError3d} />
                          </div>
                        ) : null
                      }
                    />
                    {index === 0 && load3d === "vignette" ? (
                      <button type="button" className="hs-live-toggle" aria-pressed={paused} aria-describedby={hintId} onClick={togglePause}>
                        <span className={`hs-nav__glyph${paused ? " is-play" : ""}`} aria-hidden />
                        {paused ? t("story.play") : t("story.pause")}
                      </button>
                    ) : null}
                    {!isHero ? <StepDemo step={index} sub={9} inline /> : null}
                  </div>
                ) : null}
              </div>
            </article>
          );
          // The chapter bar follows the opening in the tab order, before the closing doors.
          return isHero ? [article, <div key="nav">{nav}</div>] : article;
        })}
      </div>

      <div className="hs-track" aria-hidden>
        {STEP_IDS.map((id, index) => (
          <div
            key={id}
            ref={(el) => {
              markRefs.current[index] = el;
            }}
            className="hs-mark"
            style={{ "--len": STEP_LENGTH[id] } as CSSProperties}
          />
        ))}
      </div>
    </section>
  );
}
