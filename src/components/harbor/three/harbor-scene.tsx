"use client";

import { advance, Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei/core/Gltf";
import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { HarborTheme } from "../harbor-theme";
import { CameraRig3D } from "../story-model";
import { HarborDirector, type HarborModels } from "./harbor-director";
import type { HarborAnchor, HarborFrame, HarborStage } from "./stage-types";
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

  /** Start fetching the models as soon as this chunk loads. */
  static preload() {
    useGLTF.setDecoderPath(HarborModelFiles.DECODER);
    useGLTF.preload(HarborModelFiles.list(), HarborModelFiles.DECODER);
  }
}

HarborModelFiles.preload();

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

  const director = useMemo(() => {
    const keys = Object.keys(HarborModelFiles.FILES) as (keyof HarborModels)[];
    const models = Object.fromEntries(keys.map((k, i) => [k, gltfs[i].scene])) as unknown as HarborModels;
    return new HarborDirector(models);
  }, [gltfs]);

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

    const poses = layout === "stage" ? CameraRig3D.DESKTOP : CameraRig3D.MOBILE;
    const stage: HarborStage = {
      frame(input: HarborFrame) {
        const s = get();
        const { width, height } = s.size;
        if (width < 2 || height < 2) return;
        ToonKit.setResolution(width, height, s.viewport.dpr);
        director.update(input, s.camera as THREE.PerspectiveCamera, width, height, poses, mirror);
        advance(performance.now() / 1000, true, s);
        if (!readyRef.current) {
          readyRef.current = true;
          onReady();
        }
      },
      project(anchor: HarborAnchor) {
        const s = get();
        return director.project(anchor, s.camera, s.size.width, s.size.height);
      }
    };
    onStage(stage);
    return () => {
      onStage(null);
      gl.domElement.removeEventListener("webglcontextlost", lost);
      scene.remove(director.root);
    };
  }, [director, get, layout, mirror, onError, onReady, onStage]);

  return null;
}

export default function HarborScene(props: HarborSceneProps) {
  return (
    <SceneBoundary onError={props.onError}>
      <Canvas
        frameloop="never"
        flat
        dpr={[1, 1.75]}
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
