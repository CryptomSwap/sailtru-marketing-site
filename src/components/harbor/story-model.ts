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

/* ------------------------------------------------------------------ */
/* 3D harbor: layout and camera, in world metres                      */
/* (x = story direction, y = up, z = toward the viewer)                */
/* ------------------------------------------------------------------ */

export type XZ = { x: number; z: number };
export type BoatPose3D = { x: number; z: number; yaw: number; sailing: number };

/**
 * Where everything sits in the 3D harbor. The same meanings as the
 * illustrated harbor: boat = the business, buoys = evidence sources, cobalt
 * marker = the selected finding, route = the recommended next action,
 * dock = implementation.
 */
export class HarborLayout3D {
  /** The working dock's origin (dock.glb is authored around it). */
  static readonly DOCK: XZ = { x: 24, z: -2 };
  /** Where the boat moors while we build (dock.glb "Berth"). */
  static readonly BERTH: XZ = { x: 22.4, z: -1.25 };

  /** Boat stations per story step; yaw turns the bow (+x) toward (-) or away from (+) the viewer. */
  static readonly STATIONS: { x: number; z: number; yaw: number }[] = [
    { x: -33, z: 3.2, yaw: -1.4 },
    { x: -23, z: 3.2, yaw: -0.1 },
    { x: -6.2, z: 2.6, yaw: -0.08 },
    { x: 3, z: 3.2, yaw: -0.05 },
    { x: 22.4, z: -1.25, yaw: 0 },
    { x: 22.4, z: -1.25, yaw: 0 },
    { x: 33.5, z: 3.6, yaw: -0.12 },
    { x: 37.5, z: 3.4, yaw: -0.06 }
  ];

  /** Intermediate points for the passage between step i and i + 1. */
  static readonly PASSAGES: Record<number, XZ[]> = {
    0: [{ x: -28, z: 3.0 }],
    1: [{ x: -15, z: 3.6 }],
    3: [
      { x: 9.5, z: 4.1 },
      { x: 16, z: 2.4 },
      { x: 19.6, z: -0.7 }
    ],
    5: [{ x: 27, z: 1.8 }]
  };

  /** A short diagonal line receding from the boat's bow, so all three read beside the copy. */
  static readonly SOURCE_BUOYS: XZ[] = [
    { x: -18.4, z: 0.9 },
    { x: -15.6, z: -1.2 },
    { x: -12.6, z: -3.4 }
  ];

  /** The selected finding: a cobalt channel marker beside the reef. */
  static readonly MARKER: XZ = { x: -1.2, z: 0.6 };
  static readonly REEF: XZ = { x: 1.8, z: -1.6 };

  /** The onward route toward the next decision, and the buoy that ends it. */
  static readonly NEXT_BUOY: XZ = { x: 45, z: 2.2 };

  /** The recommended route: from the report station to the berth (the boat sails it in step 3 → 4). */
  static route(): XZ[] {
    const s = HarborLayout3D.STATIONS;
    return [{ x: s[3].x + 1.6, z: s[3].z }, ...HarborLayout3D.PASSAGES[3], { x: HarborLayout3D.BERTH.x - 2.2, z: HarborLayout3D.BERTH.z }];
  }

  static nextRoute(): XZ[] {
    const s = HarborLayout3D.STATIONS[6];
    return [{ x: s.x + 2.6, z: s.z }, { x: 39.5, z: 4.4 }, HarborLayout3D.NEXT_BUOY];
  }

  /** Centripetal-free uniform Catmull-Rom through `points` at t ∈ [0, 1]. */
  static along(points: XZ[], t: number): XZ {
    const n = points.length - 1;
    if (n <= 0) return points[0];
    const ct = clamp(t) * n;
    const i = Math.min(Math.floor(ct), n - 1);
    const f = ct - i;
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n, i + 2)];
    const cr = (a: number, b: number, c: number, d: number) =>
      0.5 * (2 * b + (-a + c) * f + (2 * a - 5 * b + 4 * c - d) * f * f + (-a + 3 * b - 3 * c + d) * f * f * f);
    return { x: cr(p0.x, p1.x, p2.x, p3.x), z: cr(p0.z, p1.z, p2.z, p3.z) };
  }

  /** Boat pose from the eased story position: held at stations, sailing the passages between them. */
  static boatAt(s: number): BoatPose3D {
    const st = HarborLayout3D.STATIONS;
    const max = st.length - 1;
    const cs = clamp(s, 0, max);
    const i = Math.min(Math.floor(cs), max - 1);
    const t = cs - i;
    const a = st[i];
    const b = st[i + 1];
    const path = [a, ...(HarborLayout3D.PASSAGES[i] ?? []), b];
    const p = HarborLayout3D.along(path, t);
    const moving = Math.hypot(b.x - a.x, b.z - a.z) > 0.01;
    if (!moving) return { x: p.x, z: p.z, yaw: a.yaw, sailing: 0 };
    const q = HarborLayout3D.along(path, Math.min(1, t + 0.01));
    const r = HarborLayout3D.along(path, Math.max(0, t - 0.01));
    const travel = Math.atan2(-(q.z - r.z), q.x - r.x);
    const rest = lerp(a.yaw, b.yaw, t);
    // Bow follows the course mid-passage and settles to the station's heading at each end.
    const sailing = Math.sin(t * Math.PI);
    return { x: p.x, z: p.z, yaw: lerp(rest, travel, Math.min(1, sailing * 1.6)), sailing };
  }
}

export type CameraPose3D = {
  /** Look-at point (metres). */
  target: [number, number, number];
  /** Distance from the target (metres). */
  distance: number;
  /** Degrees; positive swings the camera toward +x. */
  yaw: number;
  /** Degrees above the horizon. */
  pitch: number;
};

/**
 * One camera owner for the 3D harbor: a pose per story step, eased between.
 * Close, medium and wide compositions follow meaning, and every pose moves
 * forward along +x so the camera never crosses back over itself.
 */
export class CameraRig3D {
  /** Vertical field of view (degrees). */
  static readonly FOV = 30;

  /** Desktop poses: the subject is framed into the free area between the copy column and the cards. */
  static readonly DESKTOP: CameraPose3D[] = [
    // Opening: a long view down the harbor — the boat in profile in front, the evidence
    // buoys, the lighthouse and the working dock with its crane across the water.
    { target: [-28, 2.2, 2.2], distance: 30.3, yaw: -68.9, pitch: 8.2 },
    { target: [-18.8, 1.7, 0.2], distance: 30, yaw: -17, pitch: 10 },
    { target: [-3.4, 1.7, 1.6], distance: 27, yaw: -6, pitch: 9 },
    { target: [8.6, 0.6, 0.8], distance: 40, yaw: -24, pitch: 25 },
    { target: [23.2, 3.1, -2.4], distance: 23, yaw: 7, pitch: 9 },
    { target: [29.2, 3.2, -4.6], distance: 19, yaw: 11, pitch: 6 },
    { target: [36.2, 1.9, 2.4], distance: 29, yaw: 5, pitch: 10 },
    { target: [37.6, 2.1, 1.8], distance: 34, yaw: 3, pitch: 12 }
  ];

  /**
   * Phone vignettes: each is a still (or the live opening), so poses are
   * chosen per composition — the subject centred and large enough to read.
   */
  static readonly MOBILE: CameraPose3D[] = [
    { target: [-32.2, 2.7, 3.1], distance: 15.5, yaw: -18, pitch: 7 },
    { target: [-17.8, 1.6, -0.4], distance: 25, yaw: 30, pitch: 11 },
    { target: [-3.6, 1.6, 1.7], distance: 26, yaw: -5, pitch: 9 },
    { target: [11, 0.8, 0.6], distance: 42, yaw: -20, pitch: 22 },
    { target: [23.6, 3.2, -2.6], distance: 26, yaw: 6, pitch: 10 },
    { target: [28.4, 3.2, -4.4], distance: 22, yaw: 9, pitch: 8 },
    { target: [37, 2, 2.4], distance: 32, yaw: 4, pitch: 11 },
    { target: [38.4, 2.1, 2], distance: 36, yaw: 3, pitch: 12 }
  ];

  static poseAt(s: number, poses: CameraPose3D[]): CameraPose3D {
    const max = poses.length - 1;
    const cs = clamp(s, 0, max);
    const i = Math.min(Math.floor(cs), max - 1);
    const t = cs - i;
    const a = poses[i];
    const b = poses[i + 1];
    return {
      target: [lerp(a.target[0], b.target[0], t), lerp(a.target[1], b.target[1], t), lerp(a.target[2], b.target[2], t)],
      // Distance interpolates geometrically so close-to-wide changes feel even.
      distance: Math.exp(lerp(Math.log(a.distance), Math.log(b.distance), t)),
      yaw: lerp(a.yaw, b.yaw, t),
      pitch: lerp(a.pitch, b.pitch, t)
    };
  }

  /** Camera position for a pose. */
  static position(pose: CameraPose3D): [number, number, number] {
    const yaw = (pose.yaw * Math.PI) / 180;
    const pitch = (pose.pitch * Math.PI) / 180;
    const d = pose.distance;
    return [
      pose.target[0] + Math.sin(yaw) * Math.cos(pitch) * d,
      pose.target[1] + Math.sin(pitch) * d,
      pose.target[2] + Math.cos(yaw) * Math.cos(pitch) * d
    ];
  }

  /**
   * How much farther to stand back for a viewport, so the subject keeps its
   * size relative to the free area beside the copy (short and narrow screens).
   */
  static distanceScale(freeWidth: number, height: number): number {
    const aspect = freeWidth / Math.max(1, height);
    return clamp(0.62 / Math.max(0.2, aspect), 0.9, 1.45);
  }
}

/** Crane phases from the scene's crane value: lift off the quay, slew over the boat, lower onto the deck. */
export class CraneMotion3D {
  static phases(crane: number) {
    const smooth = (t: number) => t * t * (3 - 2 * t);
    return {
      lift: smooth(clamp(crane / 0.28)),
      slew: smooth(clamp((crane - 0.28) / 0.44)),
      lower: smooth(clamp((crane - 0.72) / 0.28))
    };
  }
}
