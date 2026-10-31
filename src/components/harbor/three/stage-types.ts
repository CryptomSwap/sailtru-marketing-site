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
  | "boat";

export type ScreenPoint = { x: number; y: number };

/** Everything the 3D scene needs for one frame. Scroll, pointer and time stay separate inputs. */
export type HarborFrame = {
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

/** The 3D scene's handle, driven from the harbor story's single animation loop. */
export interface HarborStage {
  /** Update the scene for a frame and render it. */
  frame(input: HarborFrame): void;
  /** Project an anchor to canvas pixels (before RTL mirroring); null when it is behind the camera. */
  project(anchor: HarborAnchor): ScreenPoint | null;
  /**
   * Render a still of one story step at a given CSS size (phone vignettes) and
   * return it as an image URL, with the source-tag positions in that image.
   */
  still(step: number, width: number, height: number): { url: string; tags: (ScreenPoint | null)[] } | null;
}
