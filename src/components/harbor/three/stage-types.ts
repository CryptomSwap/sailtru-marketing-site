import type { SceneState } from "../story-model";

/** State of the 3D harbor, exposed as data-harbor3d on the stage. */
export type Harbor3DState = "loading" | "ready" | "fallback" | "error";

/** Named points in the harbor that HTML overlays (leaders, tags) attach to. */
export type HarborAnchor =
  | "tag0"
  | "tag1"
  | "tag2"
  | "source0"
  | "source1"
  | "source2"
  | "marker"
  | "route"
  | "crate"
  | "workshop"
  | "boat"
  /** Mastheads of the provider boats (ChatGPT, Google, Perplexity). */
  | "provider0"
  | "provider1"
  | "provider2"
  /** The client's harbor (Example Studio's town). */
  | "client"
  /** The buoy at the end of the onward route (the next decision). */
  | "nextBuoy";

export type ScreenPoint = { x: number; y: number };

/** Everything the 3D scene needs for one frame. Scroll, pointer and time stay separate inputs. */
export type HarborFrame = {
  /** Cobalt entrance, before the existing story clock starts. */
  arrival?: number;
  /** Eased story position (camera, boat). */
  s: number;
  /** Linear story position (route drawing, crane). */
  u: number;
  scene: SceneState;
  /** Ambient clock in seconds; it only advances while ambient motion is allowed. */
  ambient: number;
  /** Smoothed pointer, -1..1 on both axes. */
  pointer: ScreenPoint;
  /** Where the subject should sit in the canvas (CSS px, before RTL mirroring). */
  focus: ScreenPoint;
  /** Width of the free area beside the copy column (CSS px). */
  freeWidth: number;
};

/**
 * What the story's loop hands the 3D scene each frame: targets only. The scene
 * damps progress, pointer, framing and camera itself (frame-rate independent,
 * in useFrame) and reports the damped state back.
 */
export type HarborFrameInput = {
  /** Cobalt entrance, before the existing story clock starts. */
  arrival?: number;
  /** Linear story position read from the (Lenis-smoothed) scroll. */
  uTarget: number;
  /** Pointer, -1..1 on both axes. */
  pointerTarget: ScreenPoint;
  /** Where the subject should sit in the canvas (CSS px, before RTL mirroring). */
  focusTarget: ScreenPoint;
  freeWidth: number;
  /** Ambient clock in seconds; it only advances while ambient motion is allowed. */
  ambient: number;
  /** Jump straight to the targets (first frame, resize, phone vignettes). */
  snap?: boolean;
};

/** The damped state after a frame, for the HTML overlays and the loop's settle check. */
export type HarborFrameResult = { u: number; s: number; scene: SceneState; settled: boolean };

/** The 3D scene's handle, driven from the harbor story's single animation loop. */
export interface HarborStage {
  /** Advance the scene one frame (damping in useFrame) and render it. */
  frame(input: HarborFrameInput): HarborFrameResult;
  /** Project an anchor to canvas pixels (before RTL mirroring); null when it is behind the camera. */
  project(anchor: HarborAnchor): ScreenPoint | null;
  /**
   * Render a still of one story step at a given CSS size (phone vignettes) and
   * return it as an image URL, with the positions of the requested anchors in that image.
   */
  still(step: number, width: number, height: number, anchors: HarborAnchor[]): { url: string; points: (ScreenPoint | null)[] } | null;
}
