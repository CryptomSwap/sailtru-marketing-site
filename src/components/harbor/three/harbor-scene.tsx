"use client";

import { advance, Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei/core/Gltf";
import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { HarborTheme } from "../harbor-theme";
import { CameraRig3D, STEP_BEATS, STEP_IDS, StoryCues, sceneAt, sceneForStep, storyFromLinear } from "../story-model";
import { HarborDirector, type HarborModels } from "./harbor-director";
import type { HarborAnchor, HarborFrameInput, HarborFrameResult, HarborStage } from "./stage-types";
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

// The models are fetched when this lazily loaded chunk first renders (useGLTF below), so
// nothing 3D is requested before the story needs it. The Draco decoder is self-hosted.
useGLTF.setDecoderPath(HarborModelFiles.DECODER);

export type HarborSceneProps = {
  /** "stage": the desktop sticky stage. "vignette": a small, centred still/live view on phones. */
  layout: "stage" | "vignette";
  mirror: boolean;
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

function World({ layout, mirror, onStage, onReady, onError }: HarborSceneProps) {
  const gltfs = useGLTF(HarborModelFiles.list(), HarborModelFiles.DECODER);
  const get = useThree((state) => state.get);
  const readyRef = useRef(false);
  /** This frame's targets (set by stage.frame just before advance) and the damped state useFrame produces. */
  const inputRef = useRef<HarborFrameInput | null>(null);
  const resultRef = useRef<HarborFrameResult>({ u: 0, s: 0, scene: sceneAt(0, 0), settled: true });
  const motionRef = useRef({ u: -1, pointer: { x: 0, y: 0 }, focus: { x: -1, y: 0 } });

  const director = useMemo(() => {
    const keys = Object.keys(HarborModelFiles.FILES) as (keyof HarborModels)[];
    const models = Object.fromEntries(keys.map((k, i) => [k, gltfs[i].scene])) as unknown as HarborModels;
    return new HarborDirector(models);
  }, [gltfs]);

  const poses = layout === "stage" ? CameraRig3D.DESKTOP : CameraRig3D.MOBILE;

  // Progress, pointer, framing and camera are damped here, frame-rate independent (delta is the
  // time since the previous advance). Nothing here touches React state.
  useFrame((state, delta) => {
    const input = inputRef.current;
    if (!input) return;
    const m = motionRef.current;
    const dt = Math.min(0.1, Math.max(0, delta));
    const snap = Boolean(input.snap) || m.u < 0;
    if (snap) {
      m.u = input.uTarget;
      m.pointer = { ...input.pointerTarget };
      m.focus = { ...input.focusTarget };
    } else {
      m.u = THREE.MathUtils.damp(m.u, input.uTarget, StageDamping.PROGRESS, dt);
      if (Math.abs(m.u - input.uTarget) < 0.0004) m.u = input.uTarget;
      m.pointer = {
        x: THREE.MathUtils.damp(m.pointer.x, input.pointerTarget.x, StageDamping.POINTER, dt),
        y: THREE.MathUtils.damp(m.pointer.y, input.pointerTarget.y, StageDamping.POINTER, dt)
      };
      m.focus = {
        x: THREE.MathUtils.damp(m.focus.x, input.focusTarget.x, StageDamping.FOCUS, dt),
        y: THREE.MathUtils.damp(m.focus.y, input.focusTarget.y, StageDamping.FOCUS, dt)
      };
    }
    const s = storyFromLinear(m.u);
    const scene = sceneAt(s, m.u);
    const { width, height } = state.size;
    const cameraRest = director.update(
      { s, u: m.u, arrival: input.arrival, scene, ambient: input.ambient, pointer: m.pointer, focus: m.focus, freeWidth: input.freeWidth },
      state.camera as THREE.PerspectiveCamera,
      width,
      height,
      poses,
      mirror,
      { dt, lambda: StageDamping.CAMERA, snap }
    );
    const near = (a: { x: number; y: number }, b: { x: number; y: number }, e: number) => Math.abs(a.x - b.x) < e && Math.abs(a.y - b.y) < e;
    resultRef.current = {
      u: m.u,
      s,
      scene,
      settled: m.u === input.uTarget && near(m.pointer, input.pointerTarget, 0.002) && near(m.focus, input.focusTarget, 0.5) && cameraRest < 0.002
    };
  });

  useEffect(() => {
    const state = get();
    const { scene, gl } = state;
    scene.background = new THREE.Color(HarborTheme.SKY_HORIZON);
    scene.fog = new THREE.Fog(HarborTheme.SKY_HORIZON, 48, 175);
    scene.add(director.root);

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

export default function HarborScene(props: HarborSceneProps) {
  return (
    <SceneBoundary onError={props.onError}>
      <Canvas
        frameloop="never"
        flat
        dpr={[1, 1.5]}
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
