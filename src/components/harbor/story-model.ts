/**
 * One narrative model for the harbor story.
 *
 * Scroll produces a story position. Every visual consumer — camera, boat,
 * route, crane, artifact beats — derives its state from that position here,
 * so a paused, reversed, or jumped scroll always resolves to one coherent scene.
 */

export const STEP_IDS = [
  "opening",
  "find",
  "evidence",
  "report",
  "build",
  "workflow",
  "review",
  "close"
] as const;

export type StepId = (typeof STEP_IDS)[number];

/** Sub-beats per step. The artifact for a step advances through these while the camera holds. */
export const STEP_BEATS: Record<StepId, number> = {
  opening: 1,
  find: 3,
  evidence: 3,
  report: 3,
  build: 2,
  workflow: 6,
  review: 2,
  close: 1
};

/** Relative scroll length of each step (in viewport heights) in the cinematic layout. */
export const STEP_LENGTH: Record<StepId, number> = {
  opening: 1,
  find: 1.7,
  evidence: 1.9,
  report: 2.1,
  build: 1.7,
  workflow: 2.6,
  review: 1.7,
  close: 1.15
};

export type CameraPose = { x: number; y: number; zoom: number };

/**
 * Desktop camera poses (world units). Altitude changes with meaning:
 * medium establishing → medium find → close evidence → wide report →
 * close dock → closer workshop → wide review → settled close.
 * All poses move left-to-right so the camera never crosses back over itself.
 */
export const DESKTOP_POSES: CameraPose[] = [
  { x: 760, y: 560, zoom: 1.05 },
  { x: 1180, y: 590, zoom: 0.92 },
  { x: 1720, y: 640, zoom: 1.3 },
  { x: 2480, y: 600, zoom: 0.66 },
  { x: 3200, y: 620, zoom: 1.0 },
  { x: 3760, y: 640, zoom: 1.05 },
  { x: 3580, y: 720, zoom: 0.8 },
  { x: 3720, y: 720, zoom: 0.7 }
];

/** Portrait vignette poses: wider and lower so the subject sits above the caption. */
export const MOBILE_POSES: CameraPose[] = [
  { x: 1060, y: 620, zoom: 0.5 },
  { x: 1300, y: 640, zoom: 0.56 },
  { x: 1800, y: 650, zoom: 0.92 },
  { x: 2560, y: 650, zoom: 0.36 },
  { x: 3170, y: 640, zoom: 0.66 },
  { x: 3560, y: 640, zoom: 0.62 },
  { x: 3640, y: 760, zoom: 0.5 },
  { x: 3760, y: 760, zoom: 0.45 }
];

/** Boat stations in world units (waterline centre). */
const BOAT_STATIONS = [
  { x: 640, y: 742 },
  { x: 1040, y: 744 },
  { x: 1690, y: 748 },
  { x: 2140, y: 746 },
  { x: 3112, y: 792 },
  { x: 3112, y: 792 },
  { x: 3580, y: 900 },
  { x: 3840, y: 908 }
];

export const SOURCE_BUOYS = [
  { x: 1300, y: 742 },
  { x: 1470, y: 770 },
  { x: 1630, y: 738 }
];

/** Where the boat moors alongside the pier while we build. */
export const BOAT_DOCKED = { x: 3112, y: 792 };

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Hold fraction at each end of a transition between two steps. */
const HOLD = 0.28;

/**
 * Story position from the linear scroll position `u` (step index + fraction).
 * Integer story positions are held around each step's centre so the reader
 * gets a still composition while the step text is in view.
 */
export function storyFromLinear(u: number) {
  const max = STEP_IDS.length - 1;
  const cu = clamp(u, 0, max);
  const i = Math.min(Math.floor(cu), max - 1);
  const t = cu - i;
  const held = clamp((t - HOLD) / (1 - 2 * HOLD));
  return i + easeInOut(held);
}

export function cameraAt(s: number, poses: CameraPose[]): CameraPose {
  const max = poses.length - 1;
  const cs = clamp(s, 0, max);
  const i = Math.min(Math.floor(cs), max - 1);
  const t = cs - i;
  const a = poses[i];
  const b = poses[i + 1];
  // Zoom interpolates geometrically so wide-to-close changes feel even.
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    zoom: Math.exp(lerp(Math.log(a.zoom), Math.log(b.zoom), t))
  };
}

export type BoatState = { x: number; y: number; heading: number; sailing: number };

export function boatAt(s: number): BoatState {
  const max = BOAT_STATIONS.length - 1;
  const cs = clamp(s, 0, max);
  const i = Math.min(Math.floor(cs), max - 1);
  const t = cs - i;
  const a = BOAT_STATIONS[i];
  const b = BOAT_STATIONS[i + 1];
  const x = lerp(a.x, b.x, t);
  const y = lerp(a.y, b.y, t) - Math.sin(t * Math.PI) * 6;
  // Limited heading: the mast stays upright; the hull only pitches a few degrees.
  const moving = Math.abs(b.x - a.x) > 1 ? Math.sin(t * Math.PI) : 0;
  return { x, y, heading: -1.5 * moving, sailing: moving };
}

export type SceneState = {
  boat: BoatState;
  /** 0..1 how much of the recommended route is drawn. */
  route: number;
  /** 0..1 the onward route toward the next decision. */
  nextRoute: number;
  /** 0..1 evidence lines from source buoys to the chart. */
  sources: number;
  /** Selected finding highlight on the channel marker. */
  marker: number;
  /** Crane phase: 0 = crate on dock, 1 = crate lowered onto the boat. */
  crane: number;
  /** Workshop lamp / activity. */
  workshop: number;
};

/** Scene state from the eased story position `s` and the linear position `u`. */
export function sceneAt(s: number, u: number): SceneState {
  return {
    boat: boatAt(s),
    route: clamp((u - 2.62) / 0.5),
    nextRoute: clamp((u - 5.7) / 0.6),
    sources: clamp((u - 0.62) / 0.5) * (1 - clamp((s - 1.25) / 0.45)),
    marker: clamp((s - 1.4) / 0.5) * (1 - clamp((s - 3.4) / 0.5)),
    crane: clamp((u - 3.55) / 0.42),
    workshop: clamp((s - 4.4) / 0.5) * (1 - clamp((s - 5.6) / 0.4))
  };
}

/** Static scene for a step (used by vignettes and reduced motion). */
export function sceneForStep(index: number): SceneState {
  return sceneAt(index, index + 0.45);
}

/** Global beat for the artifacts: which step is in view and which sub-beat it has reached. */
export type Beat = { step: number; sub: number };

export function beatAt(u: number): Beat {
  const max = STEP_IDS.length - 1;
  const cu = clamp(u, 0, max);
  const step = Math.round(cu);
  const n = STEP_BEATS[STEP_IDS[step]];
  if (n <= 1) return { step, sub: 0 };
  // Sub-beats play as the step arrives and are complete once it is centred,
  // so the settled state gets a still reading hold.
  const start = step - 0.46;
  const span = 0.5;
  const sub = Math.floor(clamp((cu - start) / span, 0, 0.9999) * n);
  return { step, sub: Math.max(0, Math.min(n - 1, sub)) };
}

/** World y of the horizon / still-water line. Every layer meets here. */
export const HORIZON = 600;

/**
 * Screen transform for a parallax layer. Layer content is authored in
 * "layer space": x = worldX * depth, y = world y. The horizon lands on the
 * same screen line for every layer, so islands and hills never float.
 */
export function layerTransform(
  cam: CameraPose,
  depth: number,
  focus: { x: number; y: number },
  pointer: { x: number; y: number }
) {
  const zoom = 1 + (cam.zoom - 1) * depth;
  const horizon = focus.y + (HORIZON - cam.y) * cam.zoom;
  const px = pointer.x * 16 * (depth - 0.5);
  const py = pointer.y * 7 * (depth - 0.5);
  const tx = focus.x - cam.x * depth * zoom + px;
  const ty = horizon - HORIZON * zoom + py;
  return { tx, ty, zoom };
}

/** Project a main-layer world point to stage pixels (pointer depth ignored). */
export function projectMain(cam: CameraPose, focus: { x: number; y: number }, x: number, y: number) {
  return {
    x: focus.x + (x - cam.x) * cam.zoom,
    y: focus.y + (y - cam.y) * cam.zoom
  };
}

/**
 * Where the story sits on a page that has other content above it (the cobalt
 * hero on /en and /he). All values are document pixels.
 */
export class StoryScroll {
  /**
   * Scroll position at which the opening scene is fully in view. The story
   * root is the earliest it can be: with nothing above it this is 0, so the
   * opening scene holds until the first step transition, as before.
   */
  static firstAnchor(openingCentered: number, storyTop: number): number {
    return Math.min(openingCentered, storyTop);
  }
}

/** When the harbor header takes over from the cobalt hero's own header. */
export class HeaderReveal {
  /** The harbor header shows once the hero has scrolled up behind it. */
  static isRevealed(heroBottom: number, headerHeight: number): boolean {
    return heroBottom <= headerHeight;
  }
}
