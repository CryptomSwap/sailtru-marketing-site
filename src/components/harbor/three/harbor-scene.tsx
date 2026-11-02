"use client";

import { advance, Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei/core/Gltf";
import { Component, memo, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { HarborTheme } from "../harbor-theme";
import { CameraRig3D, CobaltArrival, STEP_BEATS, STEP_IDS, StoryCues, sceneAt, sceneForStep, storyFromLinear } from "../story-model";
import { HarborDirector, type HarborModels } from "./harbor-director";
import type { HarborAnchor, HarborFrame, HarborFrameInput, HarborFrameResult, HarborStage } from "./stage-types";
import { ToonKit } from "./toon";

/**
 * The 3D harbor (React Three Fiber). Loaded lazily by the harbor story, which
 * owns the one animation loop: this canvas never renders on its own
 * (frameloop="never"); the story calls `stage.frame()` once per frame so
 * scroll, camera, overlays and cards always agree.
 *
 * Blender-modelled (public/models/harbor, Draco): boats, buoy, lighthouse,
 * dock/workshop/crane, terrain, props. Built in code: water, sky and sun,
 * route ribbons, foam, contact shadows, lamp beams, outlines, toon materials.
 */

export class HarborModelFiles {
  static readonly DECODER = "/draco/";
  static readonly FILES = {
    sailboat: "/models/harbor/sailboat.glb",
    boats: "/models/harbor/boats.glb",
    buoy: "/models/harbor/buoy.glb",
    lighthouse: "/models/harbor/lighthouse.glb",
    dock: "/models/harbor/dock.glb",
    terrain: "/models/harbor/terrain.glb",
    props: "/models/harbor/props.glb"
  } as const;

  static list(): string[] {
    return Object.values(HarborModelFiles.FILES);
  }

}

/** Damping rates (1/s, for THREE.MathUtils.damp) applied in useFrame on top of the smoothed scroll. */
export class StageDamping {
  static readonly PROGRESS = 11;
  static readonly CAMERA = 9;
  static readonly POINTER = 5.4;
  static readonly FOCUS = 5;
}

/** Drawing-buffer size: device pixels up to 1.5×, within a pixel budget so large screens stay smooth. */
export class StageResolution {
  static readonly MAX_DPR = 1.5;
  static readonly PIXEL_BUDGET = 2_600_000;

  static dpr(width: number, height: number, device: number): number {
    const budget = Math.sqrt(StageResolution.PIXEL_BUDGET / Math.max(1, width * height));
    return Math.max(1, Math.min(StageResolution.MAX_DPR, device, budget));
  }
}

// The models are fetched when this lazily loaded chunk first renders (useGLTF below), so
// nothing 3D is requested before the story needs it. The Draco decoder is self-hosted.
useGLTF.setDecoderPath(HarborModelFiles.DECODER);

export type HarborSceneProps = {
  /** "stage": the desktop sticky stage. "vignette": a small, centred still/live view on phones. */
  layout: "stage" | "vignette";
  mirror: boolean;
  /**
   * A transparent canvas laid over the cobalt hero (stage only): SailTru's boat is
   * drawn there too during the cobalt entrance, from the same camera, so it sails
   * in across the cobalt and is exactly the boat in the harbor once the cobalt opens.
   */
  boatCanvas?: HTMLCanvasElement | null;
  onStage: (stage: HarborStage | null) => void;
  onReady: () => void;
  onError: (reason: string) => void;
};

class SceneBoundary extends Component<{ onError: (reason: string) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError(error instanceof Error ? error.message : "render error");
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function World({ layout, mirror, boatCanvas, onStage, onReady, onError }: HarborSceneProps) {
  const gltfs = useGLTF(HarborModelFiles.list(), HarborModelFiles.DECODER);
  const get = useThree((state) => state.get);
  const readyRef = useRef(false);
  /** This frame's targets (set by stage.frame just before advance) and the damped state useFrame produces (one object, updated in place). */
  const inputRef = useRef<HarborFrameInput | null>(null);
  const resultRef = useRef<HarborFrameResult>({ u: 0, s: 0, arrival: 1, scene: sceneAt(0, 0), settled: true });
  const motionRef = useRef({ u: -1, arrival: 1, pointer: { x: 0, y: 0 }, focus: { x: -1, y: 0 } });
  const frameRef = useRef<HarborFrame>({ s: 0, u: 0, scene: sceneAt(0, 0), ambient: 0, pointer: { x: 0, y: 0 }, focus: { x: 0, y: 0 }, freeWidth: 1 });
  const dampingRef = useRef({ dt: 0, lambda: StageDamping.CAMERA, snap: false });
  /** The cobalt overlay's renderer, while it has a context. */
  const boatRendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const director = useMemo(() => {
    const keys = Object.keys(HarborModelFiles.FILES) as (keyof HarborModels)[];
    const models = Object.fromEntries(keys.map((k, i) => [k, gltfs[i].scene])) as unknown as HarborModels;
    return new HarborDirector(models);
  }, [gltfs]);

  const poses = layout === "stage" ? CameraRig3D.DESKTOP : CameraRig3D.MOBILE;

  // Progress, the cobalt entrance, pointer, framing and camera are damped here, frame-rate independent
  // (the story loop's frame time, else the time since the previous advance). Nothing here touches React state
  // or allocates: the motion, frame and result objects are updated in place.
  useFrame((state, delta) => {
    const input = inputRef.current;
    if (!input) return;
    const m = motionRef.current;
    const dt = Math.min(0.1, Math.max(0, input.dt ?? delta));
    const snap = Boolean(input.snap) || m.u < 0;
    const arrivalTarget = input.arrival ?? 1;
    if (snap) {
      m.u = input.uTarget;
      m.arrival = arrivalTarget;
      m.pointer.x = input.pointerTarget.x;
      m.pointer.y = input.pointerTarget.y;
      m.focus.x = input.focusTarget.x;
      m.focus.y = input.focusTarget.y;
    } else {
      m.u = THREE.MathUtils.damp(m.u, input.uTarget, StageDamping.PROGRESS, dt);
      if (Math.abs(m.u - input.uTarget) < 0.0004) m.u = input.uTarget;
      m.arrival = THREE.MathUtils.damp(m.arrival, arrivalTarget, StageDamping.PROGRESS, dt);
      if (Math.abs(m.arrival - arrivalTarget) < 0.0004) m.arrival = arrivalTarget;
      m.pointer.x = THREE.MathUtils.damp(m.pointer.x, input.pointerTarget.x, StageDamping.POINTER, dt);
      m.pointer.y = THREE.MathUtils.damp(m.pointer.y, input.pointerTarget.y, StageDamping.POINTER, dt);
      m.focus.x = THREE.MathUtils.damp(m.focus.x, input.focusTarget.x, StageDamping.FOCUS, dt);
      m.focus.y = THREE.MathUtils.damp(m.focus.y, input.focusTarget.y, StageDamping.FOCUS, dt);
    }
    const result = resultRef.current;
    const s = storyFromLinear(m.u);
    sceneAt(s, m.u, result.scene);
    const { width, height } = state.size;
    const frame = frameRef.current;
    frame.scene = result.scene;
    frame.pointer = m.pointer;
    frame.focus = m.focus;
    frame.s = s;
    frame.u = m.u;
    frame.arrival = input.arrival === undefined ? undefined : m.arrival;
    frame.ambient = input.ambient;
    frame.freeWidth = input.freeWidth;
    const damping = dampingRef.current;
    damping.dt = dt;
    damping.snap = snap;
    const cameraRest = director.update(frame, state.camera as THREE.PerspectiveCamera, width, height, poses, mirror, damping);
    result.u = m.u;
    result.s = s;
    result.arrival = m.arrival;
    result.settled =
      m.u === input.uTarget &&
      m.arrival === arrivalTarget &&
      near(m.pointer, input.pointerTarget, 0.002) &&
      near(m.focus, input.focusTarget, 0.5) &&
      cameraRest < 0.002;
  });

  // The cobalt overlay: a second, transparent renderer that draws only the boat (stage layout, cobalt hero).
  useEffect(() => {
    if (!boatCanvas || layout !== "stage") return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: boatCanvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return; // the harbor still opens around its own boat
    }
    renderer.setClearColor(0x000000, 0);
    boatRendererRef.current = renderer;
    const lost = (event: Event) => {
      event.preventDefault();
      boatRendererRef.current = null;
    };
    boatCanvas.addEventListener("webglcontextlost", lost);
    return () => {
      boatRendererRef.current = null;
      boatCanvas.removeEventListener("webglcontextlost", lost);
      renderer.dispose();
    };
  }, [boatCanvas, layout]);

  useEffect(() => {
    const state = get();
    const { scene, gl } = state;
    scene.background = new THREE.Color(HarborTheme.SKY_HORIZON);
    scene.fog = new THREE.Fog(HarborTheme.SKY_HORIZON, 48, 175);
    scene.add(director.root);
    /** Whether the overlay holds a drawn boat (it is cleared once, when the entrance is over). */
    let boatDrawn = false;

    const lost = (event: Event) => {
      event.preventDefault();
      onError("webgl context lost");
    };
    gl.domElement.addEventListener("webglcontextlost", lost);

    const stage: HarborStage = {
      frame(input: HarborFrameInput) {
        const s = get();
        const { width, height } = s.size;
        if (width < 2 || height < 2) return resultRef.current;
        ToonKit.setResolution(width, height, s.viewport.dpr);
        inputRef.current = input;
        // Runs the useFrame damping above, then renders.
        advance(performance.now() / 1000, true, s);
        // The boat on the cobalt, while any cobalt is left to carry it.
        const boatRenderer = boatRendererRef.current;
        if (boatRenderer) {
          const result = resultRef.current;
          if (input.arrival !== undefined && result.arrival < CobaltArrival.HERO[1]) {
            const dpr = gl.getPixelRatio();
            if (boatRenderer.getPixelRatio() !== dpr) boatRenderer.setPixelRatio(dpr);
            const size = boatRenderer.getSize(scratchSize);
            if (size.x !== width || size.y !== height) boatRenderer.setSize(width, height, false);
            director.renderBoat(boatRenderer, s.camera);
            boatDrawn = true;
          } else if (boatDrawn) {
            boatRenderer.clear();
            boatDrawn = false;
          }
        }
        if (!readyRef.current) {
          readyRef.current = true;
          onReady();
        }
        return resultRef.current;
      },
      project(anchor: HarborAnchor) {
        const s = get();
        return director.project(anchor, s.camera, s.size.width, s.size.height);
      },
      still(step: number, width: number, height: number, anchors: HarborAnchor[]) {
        const s = get();
        const { gl, camera } = s;
        const keep = { w: s.size.width, h: s.size.height, dpr: gl.getPixelRatio() };
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        try {
          gl.setPixelRatio(dpr);
          gl.setSize(width, height, false);
          ToonKit.setResolution(width, height, dpr);
          director.update(
            {
              s: step,
              u: StoryCues.settled(step, STEP_BEATS[STEP_IDS[step]] - 1),
              scene: sceneForStep(step),
              ambient: 2.4,
              pointer: { x: 0, y: 0 },
              focus: { x: width / 2, y: height * 0.56 },
              freeWidth: width
            },
            camera as THREE.PerspectiveCamera,
            width,
            height,
            CameraRig3D.MOBILE,
            false
          );
          gl.render(s.scene, camera);
          const url = gl.domElement.toDataURL("image/webp", 0.86);
          const points = anchors.map((a) => director.project(a, camera, width, height));
          return { url, points };
        } catch {
          return null;
        } finally {
          gl.setPixelRatio(keep.dpr);
          gl.setSize(keep.w, keep.h, false);
        }
      }
    };
    onStage(stage);
    return () => {
      onStage(null);
      gl.domElement.removeEventListener("webglcontextlost", lost);
      scene.remove(director.root);
    };
  }, [director, get, layout, mirror, onError, onReady, onStage, poses]);

  return null;
}

const scratchSize = new THREE.Vector2();

function near(a: { x: number; y: number }, b: { x: number; y: number }, e: number) {
  return Math.abs(a.x - b.x) < e && Math.abs(a.y - b.y) < e;
}

function HarborScene(props: HarborSceneProps) {
  // The drawing-buffer cap is chosen once per mount, from the viewport the canvas fills.
  const [dpr] = useState(() =>
    typeof window === "undefined" ? StageResolution.MAX_DPR : StageResolution.dpr(window.innerWidth, window.innerHeight, window.devicePixelRatio || 1)
  );
  return (
    <SceneBoundary onError={props.onError}>
      <Canvas
        frameloop="never"
        flat
        dpr={[1, dpr]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: CameraRig3D.FOV, near: 0.5, far: 1200, position: [0, 6, 40] }}
        aria-hidden
        tabIndex={-1}
      >
        <Suspense fallback={null}>
          <World {...props} />
        </Suspense>
      </Canvas>
    </SceneBoundary>
  );
}

/** Re-renders of the story (a new beat) never reach the canvas: its props are stable. */
export default memo(HarborScene);
