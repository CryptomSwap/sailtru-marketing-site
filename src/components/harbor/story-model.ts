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

/**
 * Supporting lines per step. Each line is one sub-beat: the narrative card
 * shows one line at a time and the scene and demonstration card act it out.
 */
export const STEP_BEATS: Record<StepId, number> = {
  opening: 1,
  find: 3,
  evidence: 3,
  report: 3,
  build: 3,
  workflow: 4,
  review: 3,
  close: 1
};

/** Relative scroll length of each step (in viewport heights) in the cinematic layout. */
export const STEP_LENGTH: Record<StepId, number> = {
  opening: 1.4,
  find: 2.5,
  evidence: 2.4,
  report: 2.4,
  build: 2.5,
  workflow: 2.9,
  review: 2.2,
  close: 1.5
};

/**
 * The story's path. Each stop keeps the composition it was drawn with (the
 * subject, its props, the camera's view of them), and the stretches of open
 * water between stops are SPREAD times as long, in both harbors.
 */
export class StoryPath {
  static readonly SPREAD = 1.45;
}

/**
 * The illustrated harbor's stretches of coast (main-layer world x). Each moves
 * along +x as a whole, so the opening stays where it was and every later stop
 * sits further from the one before it.
 */
export class SvgReach {
  static readonly ORIGIN = 640;
  static readonly FIND = 1450;
  static readonly EVIDENCE = 1850;
  static readonly REPORT = 2300;
  static readonly SHIPYARD = 3200;
  static readonly REVIEW = 3700;

  /** How far a stretch of coast around `anchor` moves. */
  static shift(anchor: number): number {
    return (anchor - SvgReach.ORIGIN) * (StoryPath.SPREAD - 1);
  }

  /** An authored x moved with its stretch of coast (`anchor`), or with the coast itself. */
  static x(x: number, anchor: number = x): number {
    return x + SvgReach.shift(anchor);
  }
}

export type CameraPose = { x: number; y: number; zoom: number };

/**
 * Desktop camera poses (world units). Altitude changes with meaning:
 * medium establishing → medium find → close evidence → wide report →
 * close dock → closer workshop → wide review → settled close.
 * All poses move left-to-right so the camera never crosses back over itself.
 */
export const DESKTOP_POSES: CameraPose[] = [
  { x: 760, y: 560, zoom: 1.05 },
  { x: SvgReach.x(1330, SvgReach.FIND), y: 600, zoom: 0.72 },
  { x: SvgReach.x(1720, SvgReach.EVIDENCE), y: 640, zoom: 1.3 },
  // The whole recommended route, from the chart to the shipyard.
  { x: SvgReach.x(2580, SvgReach.REPORT), y: 600, zoom: 0.58 },
  { x: SvgReach.x(3200, SvgReach.SHIPYARD), y: 620, zoom: 1.0 },
  { x: SvgReach.x(3760, SvgReach.SHIPYARD), y: 640, zoom: 1.05 },
  { x: SvgReach.x(3580, SvgReach.REVIEW), y: 720, zoom: 0.8 },
  { x: SvgReach.x(3720, SvgReach.REVIEW), y: 720, zoom: 0.7 }
];

/** Portrait vignette poses: wider and lower so the subject sits above the caption. */
export const MOBILE_POSES: CameraPose[] = [
  { x: 1060, y: 620, zoom: 0.5 },
  { x: SvgReach.x(1460, SvgReach.FIND), y: 650, zoom: 0.5 },
  { x: SvgReach.x(1800, SvgReach.EVIDENCE), y: 650, zoom: 0.92 },
  { x: SvgReach.x(2860, SvgReach.REPORT), y: 650, zoom: 0.36 },
  { x: SvgReach.x(3170, SvgReach.SHIPYARD), y: 640, zoom: 0.66 },
  { x: SvgReach.x(3560, SvgReach.SHIPYARD), y: 640, zoom: 0.62 },
  { x: SvgReach.x(3640, SvgReach.REVIEW), y: 760, zoom: 0.5 },
  { x: SvgReach.x(3760, SvgReach.REVIEW), y: 760, zoom: 0.45 }
];

/** Boat stations in world units (waterline centre). */
const BOAT_STATIONS = [
  { x: 640, y: 742 },
  { x: SvgReach.x(1100, SvgReach.FIND), y: 744 },
  { x: SvgReach.x(1690, SvgReach.EVIDENCE), y: 748 },
  { x: SvgReach.x(2140, SvgReach.REPORT), y: 746 },
  { x: SvgReach.x(3112, SvgReach.SHIPYARD), y: 792 },
  { x: SvgReach.x(3112, SvgReach.SHIPYARD), y: 792 },
  { x: SvgReach.x(3580, SvgReach.REVIEW), y: 900 },
  { x: SvgReach.x(3840, SvgReach.REVIEW), y: 908 }
];

export const SOURCE_BUOYS = [
  { x: SvgReach.x(1300, SvgReach.FIND), y: 742 },
  { x: SvgReach.x(1470, SvgReach.FIND), y: 770 },
  { x: SvgReach.x(1630, SvgReach.FIND), y: 738 }
];

/** Where the boat moors alongside the pier while we build. */
export const BOAT_DOCKED = { x: SvgReach.x(3112, SvgReach.SHIPYARD), y: 792 };

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

export function boatAt(s: number, out: BoatState = { x: 0, y: 0, heading: 0, sailing: 0 }): BoatState {
  const max = BOAT_STATIONS.length - 1;
  const cs = clamp(s, 0, max);
  const i = Math.min(Math.floor(cs), max - 1);
  const t = cs - i;
  const a = BOAT_STATIONS[i];
  const b = BOAT_STATIONS[i + 1];
  // Limited heading: the mast stays upright; the hull only pitches a few degrees.
  const moving = Math.abs(b.x - a.x) > 1 ? Math.sin(t * Math.PI) : 0;
  out.x = lerp(a.x, b.x, t);
  out.y = lerp(a.y, b.y, t) - Math.sin(t * Math.PI) * 6;
  out.heading = -1.5 * moving;
  out.sailing = moving;
  return out;
}

export type SceneState = {
  boat: BoatState;
  /** 0..1 the provider boats sailing in (Find). */
  providers: number;
  /** 0..1 how much of the recommended route is drawn. */
  route: number;
  /** 0..1 the onward route toward the next decision. */
  nextRoute: number;
  /** 0..1 the three investigation areas (buoys, pings and their labels). */
  sources: number;
  /** Rings around the F01 marker while the finding is being shown. */
  marker: number;
  /** 0..1 the F01 marker turning from ink to the accent once the finding is located; it stays selected. */
  selected: number;
  /** Crane phase: 0 = crate on the quay, 1 = crate lowered onto the boat. */
  crane: number;
  /** 0..1 the empty hook lifting clear once the crate is aboard. */
  hook: number;
  /** 0..1 the mainsail lowered onto the boom while the boat is alongside (Build, Custom systems). */
  mainDown: number;
  /** 0..1 the boom swung out over the water so the crate can be lowered into the cockpit. */
  boomOut: number;
  /** Workshop lamp / activity. */
  workshop: number;
};

/** Global beat: which step is in view and which of its lines is showing. */
export type Beat = { step: number; sub: number };

/**
 * One progression for the whole story. Every line of every step starts at a
 * cue (linear story units, relative to the step's centre). Copy, demonstration
 * cards, overlays and the scene's actions all read their timing from here, so
 * scrolling backward, jumping or resizing always lands on the same state.
 *
 * A step is in view for u in [i - 0.5, i + 0.5); the camera holds on it for
 * u in [i - HOLD, i + HOLD]. The first line shows as the step arrives; the
 * others are spread over the hold so each action happens on a still view.
 */
export class StoryCues {
  static readonly CUES: Record<StepId, number[]> = {
    opening: [-0.5],
    find: [-0.5, -0.06, 0.16],
    evidence: [-0.5, -0.08, 0.15],
    report: [-0.5, -0.08, 0.15],
    // The crane works from the camera's arrival (-HOLD) until the second line, when the page changes.
    build: [-0.5, -0.04, 0.18],
    workflow: [-0.5, -0.14, 0.04, 0.21],
    review: [-0.5, -0.08, 0.15],
    close: [-0.5]
  };

  /** Absolute linear position where line `sub` of `step` starts. */
  static cue(step: StepId, sub: number): number {
    return STEP_IDS.indexOf(step) + StoryCues.CUES[step][sub];
  }

  static beatAt(u: number): Beat {
    const max = STEP_IDS.length - 1;
    const cu = clamp(u, 0, max);
    const step = Math.min(max, Math.floor(cu + 0.5));
    const cues = StoryCues.CUES[STEP_IDS[step]];
    let sub = 0;
    for (let i = 1; i < cues.length; i += 1) if (cu - step >= cues[i]) sub = i;
    return { step, sub };
  }

  /** A linear position that shows `sub` of `step` settled (used by stills and tests). */
  static settled(step: number, sub: number): number {
    const cues = StoryCues.CUES[STEP_IDS[step]];
    const start = cues[sub];
    const end = sub + 1 < cues.length ? cues[sub + 1] : 0.5;
    return step + Math.max(start, Math.min(end - 0.02, start + 0.06 + (end - start) * 0.4));
  }
}

const cue = StoryCues.cue;

/**
 * Scene state from the eased story position `s` and the linear position `u`.
 * `out` is filled in place when given (the per-frame callers reuse one object).
 */
export function sceneAt(s: number, u: number, out?: SceneState): SceneState {
  const holdIn = 4 - HOLD;
  const scene = out ?? ({ boat: { x: 0, y: 0, heading: 0, sailing: 0 } } as SceneState);
  boatAt(s, scene.boat);
  // Provider boats sail in while the camera arrives at Find.
  scene.providers = clamp((u - 0.42) / 0.36);
  // Investigation areas light up with Find's third line, and fade as the story moves on.
  scene.sources = clamp((u - cue("find", 2)) / 0.1) * (1 - clamp((s - 1.3) / 0.35));
  // Evidence's second line locates the footer link: F01 is found and selected.
  scene.selected = clamp((u - cue("evidence", 1)) / 0.1);
  scene.marker = clamp((u - cue("evidence", 1)) / 0.1) * (1 - clamp((s - 3.4) / 0.5));
  // Report's second line chooses F01: the route draws from the chart to the shipyard.
  scene.route = clamp((u - cue("report", 1)) / 0.22);
  // The crane lifts as the camera settles on the shipyard and lands on Build's second line.
  scene.crane = clamp((u - holdIn) / (cue("build", 1) - holdIn));
  scene.hook = clamp((u - cue("build", 1)) / 0.14);
  // Sails stay coherent with the crane: the main comes down as the boat berths and goes up as it leaves,
  // and the boom swings clear for the crate and back once the hook has lifted away.
  scene.mainDown = clamp((s - 3.45) / 0.35) * (1 - clamp((s - 5.05) / 0.35));
  scene.boomOut = clamp((s - 3.72) / 0.26) * (1 - clamp((u - cue("build", 1) - 0.12) / 0.12));
  scene.workshop = clamp((s - 4.4) / 0.5) * (1 - clamp((s - 5.6) / 0.4));
  // Review's third line: the next decision.
  scene.nextRoute = clamp((u - cue("review", 2)) / 0.24);
  return scene;
}

/** Static scene for a step (used by vignettes and reduced motion): its last line, settled. */
export function sceneForStep(index: number): SceneState {
  return sceneAt(index, StoryCues.settled(index, STEP_BEATS[STEP_IDS[index]] - 1));
}

export function beatAt(u: number): Beat {
  return StoryCues.beatAt(u);
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

/**
 * The cobalt entrance on the cinematic stage: the first LENGTH viewport heights
 * of the story, before the opening step. As it scrolls, SailTru's boat sails in
 * across the cobalt from beyond the reading-start edge, the cobalt opens around
 * the boat onto the harbor, and the boat comes to rest at the opening stop,
 * where the story path continues. Every phase is a fraction of the entrance.
 */
export class CobaltArrival {
  /** Scroll length in viewport heights (the arrival track is sized from it). */
  static readonly LENGTH = 2.4;
  /** The hero copy, then the hero cards, fade away. */
  static readonly COPY: [number, number] = [0.03, 0.28];
  static readonly CARDS: [number, number] = [0.2, 0.55];
  /** The cobalt opens around the boat (by then it has passed into the open frame). */
  static readonly OPEN: [number, number] = [0.3, 0.86];
  /** The rest of the cobalt fades; from its end the hero is gone. */
  static readonly HERO: [number, number] = [0.62, 0.92];
  /** The opening copy comes in. */
  static readonly STORY: [number, number] = [0.84, 1];
  /** The camera turns from the arrival view to the opening view. */
  static readonly CAMERA: [number, number] = [0.45, 1];

  /** Smoothstep of `a` through a phase. */
  static ease(a: number, [from, to]: [number, number]): number {
    const x = clamp((a - from) / (to - from));
    return x * x * (3 - 2 * x);
  }

  /** How far along its entry path the boat is: quick off the edge, slowing to rest at the opening stop. */
  static boat(a: number): number {
    const r = 1 - clamp(a);
    return 1 - r * r * r;
  }

  /** The boat's way on (0 at rest), continuous with the story path's `sailing` at the opening stop. */
  static sailing(a: number): number {
    const r = 1 - clamp(a);
    return Math.min(1, r * r * 1.6);
  }
}

/* ------------------------------------------------------------------ */
/* 3D harbor: layout and camera, in world metres                      */
/* (x = story direction, y = up, z = toward the viewer)                */
/* ------------------------------------------------------------------ */

export type XZ = { x: number; z: number };
export type BoatPose3D = { x: number; z: number; yaw: number; sailing: number };

/**
 * The 3D harbor's stretches of coast (authored x, metres). Each keeps its
 * composition and moves along +x as a whole (StoryPath.SPREAD), so the open
 * water between stops grows and nothing inside a stop changes.
 */
const REACH = { opening: -33, find: -20, evidence: -3, report: 4, shipyard: 24, town: 36 } as const;

/** An authored x moved with its stretch of coast (`anchor`), or with the coast itself (loose scenery). */
function spread(x: number, anchor: number = x): number {
  return x + (StoryPath.SPREAD - 1) * anchor;
}

const NO_PASSAGE: XZ[] = [];

/** Uniform Catmull-Rom through p1 → p2 at f, with p0 and p3 as neighbours. */
function catmull(p0: XZ, p1: XZ, p2: XZ, p3: XZ, f: number, out: XZ): XZ {
  const cr = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (-a + c) * f + (2 * a - 5 * b + 4 * c - d) * f * f + (-a + 3 * b - 3 * c + d) * f * f * f);
  out.x = cr(p0.x, p1.x, p2.x, p3.x);
  out.z = cr(p0.z, p1.z, p2.z, p3.z);
  return out;
}

/**
 * Where everything sits in the 3D harbor. The same meanings as the
 * illustrated harbor: cobalt boat = SailTru's journey, buoys = investigation areas, cobalt
 * marker = the selected finding, route = the recommended next action,
 * dock = implementation.
 */
export class HarborLayout3D {
  static readonly REACH = REACH;
  static readonly spread = spread;

  /** The working dock's origin (dock.glb is authored around it). */
  static readonly DOCK: XZ = { x: spread(24, REACH.shipyard), z: -2 };
  /** Where the boat moors while we build (dock.glb "Berth"). */
  static readonly BERTH: XZ = { x: spread(22.4, REACH.shipyard), z: -1.25 };

  /** Boat stations per story step; yaw turns the bow (+x) toward (-) or away from (+) the viewer. */
  static readonly STATIONS: { x: number; z: number; yaw: number }[] = [
    { x: spread(-33, REACH.opening), z: 3.2, yaw: 0.45 },
    { x: spread(-23, REACH.find), z: 3.2, yaw: -0.1 },
    { x: spread(-6.2, REACH.evidence), z: 2.6, yaw: -0.08 },
    { x: spread(3, REACH.report), z: 3.2, yaw: -0.05 },
    { x: spread(22.4, REACH.shipyard), z: -1.25, yaw: 0 },
    { x: spread(26.4, REACH.shipyard), z: 2.0, yaw: -0.08 },
    { x: spread(33.5, REACH.town), z: 3.6, yaw: -0.12 },
    { x: spread(37.5, REACH.town), z: 3.4, yaw: -0.06 }
  ];

  /** Intermediate points for the passage between step i and i + 1. */
  static readonly PASSAGES: Record<number, XZ[]> = {
    0: [{ x: spread(-28), z: 3.0 }],
    1: [{ x: spread(-15), z: 3.6 }],
    3: [
      { x: spread(9.5), z: 4.1 },
      { x: spread(16), z: 2.4 },
      // The approach to the berth belongs to the shipyard.
      { x: spread(19.6, REACH.shipyard), z: -0.7 }
    ],
    5: [{ x: spread(27, REACH.shipyard), z: 1.8 }]
  };

  /** A short diagonal line receding from the boat's bow, so all three read beside the copy. */
  static readonly SOURCE_BUOYS: XZ[] = [
    { x: spread(-19.8, REACH.find), z: 2.0 },
    { x: spread(-17.2, REACH.find), z: 0.6 },
    { x: spread(-14.6, REACH.find), z: -0.8 }
  ];

  /** The selected finding: a cobalt channel marker beside the reef. */
  static readonly MARKER: XZ = { x: spread(-1.2, REACH.evidence), z: 0.6 };
  static readonly REEF: XZ = { x: spread(1.8, REACH.evidence), z: -1.6 };

  /**
   * Provider boats in the Find view: the active provider (ChatGPT) nearest the
   * question card, two supporting boats further off. Each sails in from `from`.
   */
  static readonly PROVIDERS: { x: number; z: number; yaw: number; scale: number; from: XZ }[] = [
    { x: spread(-13.6, REACH.find), z: -6.2, yaw: 2.95, scale: 0.82, from: { x: spread(-6.5, REACH.find), z: -7.5 } },
    { x: spread(-16.2, REACH.find), z: -12, yaw: 2.8, scale: 0.7, from: { x: spread(-10, REACH.find), z: -13.5 } },
    { x: spread(-12.4, REACH.find), z: -18.5, yaw: 3.05, scale: 0.7, from: { x: spread(-6, REACH.find), z: -20 } }
  ];

  /** Example Studio's harbor: a point among the town's houses (the client's business). */
  static readonly CLIENT = { x: spread(35.5, REACH.town), y: 6.2, z: -21 };

  /** The onward route toward the next decision, and the buoy that ends it. */
  static readonly NEXT_BUOY: XZ = { x: spread(42.4, REACH.town), z: 3.4 };

  /**
   * The cobalt entrance (CobaltArrival): the boat crosses the arrival view from
   * beyond its left edge to the opening stop. The view looks at the opening
   * stop from the +z side (CameraRig3D.ARRIVAL), so "across" is its screen-right
   * axis; the boat starts a little nearer the camera and bears away as it comes in.
   * The last point before the stop is fixed, so entry and story path meet in one curve.
   */
  static readonly ENTRY_LAST = { across: 11, near: 1 };
  /** Yaw (degrees) of the arrival view the entry crosses (CameraRig3D.ARRIVAL). */
  static readonly ENTRY_VIEW_YAW = 20;

  /** Entry path points (filled into `out`): beyond the left edge `offscreen` metres across, to the opening stop. */
  static entry(offscreen: number, out: XZ[]): XZ[] {
    const s0 = HarborLayout3D.STATIONS[0];
    const yaw = (HarborLayout3D.ENTRY_VIEW_YAW * Math.PI) / 180;
    // Screen-right (across) and toward-the-camera (near) directions of the arrival view.
    const ax = Math.cos(yaw);
    const az = -Math.sin(yaw);
    const nx = Math.sin(yaw);
    const nz = Math.cos(yaw);
    const last = HarborLayout3D.ENTRY_LAST;
    const points: [number, number][] = [
      [offscreen, 6],
      [(offscreen + last.across) / 2, 3.2],
      [last.across, last.near]
    ];
    points.forEach(([across, near], i) => {
      const p = out[i] ?? (out[i] = { x: 0, z: 0 });
      p.x = s0.x - across * ax + near * nx;
      p.z = s0.z - across * az + near * nz;
    });
    const end = out[3] ?? (out[3] = { x: 0, z: 0 });
    end.x = s0.x;
    end.z = s0.z;
    out.length = 4;
    return out;
  }

  /** The fixed last entry point (the story path's first passage curves away from it). */
  private static readonly entryLast: XZ = HarborLayout3D.entry(0, [])[2];

  /** The recommended route: from the report station to the berth (the boat sails it in step 3 → 4). */
  static route(): XZ[] {
    const s = HarborLayout3D.STATIONS;
    return [{ x: s[3].x + 1.6, z: s[3].z }, ...HarborLayout3D.PASSAGES[3], { x: HarborLayout3D.BERTH.x - 2.2, z: HarborLayout3D.BERTH.z }];
  }

  static nextRoute(): XZ[] {
    const s = HarborLayout3D.STATIONS[6];
    return [{ x: s.x + 2.6, z: s.z }, { x: spread(38.4, REACH.town), z: 4.6 }, HarborLayout3D.NEXT_BUOY];
  }

  /**
   * Uniform Catmull-Rom through `points` at t ∈ [0, 1]. `before` and `after`
   * continue the curve past its ends (default: the end points themselves).
   */
  static along(points: XZ[], t: number, out: XZ = { x: 0, z: 0 }, before?: XZ, after?: XZ): XZ {
    const n = points.length - 1;
    if (n <= 0) {
      out.x = points[0].x;
      out.z = points[0].z;
      return out;
    }
    const ct = clamp(t) * n;
    const i = Math.min(Math.floor(ct), n - 1);
    const p0 = i > 0 ? points[i - 1] : (before ?? points[0]);
    const p3 = i + 2 <= n ? points[i + 2] : (after ?? points[n]);
    return catmull(p0, points[i], points[i + 1], p3, ct - i, out);
  }

  private static readonly path: XZ[] = [];
  private static readonly ahead: XZ = { x: 0, z: 0 };
  private static readonly behind: XZ = { x: 0, z: 0 };

  /** Boat pose from the eased story position: held at stations, sailing the passages between them. */
  static boatAt(s: number, out: BoatPose3D = { x: 0, z: 0, yaw: 0, sailing: 0 }): BoatPose3D {
    const st = HarborLayout3D.STATIONS;
    const max = st.length - 1;
    const cs = clamp(s, 0, max);
    const i = Math.min(Math.floor(cs), max - 1);
    const t = cs - i;
    const a = st[i];
    const b = st[i + 1];
    const path = HarborLayout3D.path;
    path.length = 0;
    path.push(a, ...(HarborLayout3D.PASSAGES[i] ?? NO_PASSAGE), b);
    // The first passage continues the cobalt entrance's curve through the opening stop.
    const before = i === 0 ? HarborLayout3D.entryLast : undefined;
    HarborLayout3D.along(path, t, out, before);
    const moving = Math.hypot(b.x - a.x, b.z - a.z) > 0.01;
    if (!moving) {
      out.yaw = a.yaw;
      out.sailing = 0;
      return out;
    }
    const q = HarborLayout3D.along(path, Math.min(1, t + 0.01), HarborLayout3D.ahead, before);
    const r = HarborLayout3D.along(path, Math.max(0, t - 0.01), HarborLayout3D.behind, before);
    const travel = Math.atan2(-(q.z - r.z), q.x - r.x);
    const rest = lerp(a.yaw, b.yaw, t);
    // Bow follows the course mid-passage and settles to the station's heading at each end.
    const sailing = Math.sin(t * Math.PI);
    out.yaw = lerp(rest, travel, Math.min(1, sailing * 1.6));
    out.sailing = sailing;
    return out;
  }

  private static readonly entryPoints: XZ[] = [];
  private static entryOffscreen = NaN;

  /**
   * Boat pose on the cobalt entrance at arrival `a` (0 = beyond the left edge,
   * 1 = at rest at the opening stop, exactly boatAt(0)). `offscreen` is how far
   * across the start lies, so the boat is out of frame at 0 on any viewport.
   */
  static entryAt(a: number, offscreen: number, out: BoatPose3D = { x: 0, z: 0, yaw: 0, sailing: 0 }): BoatPose3D {
    const points = HarborLayout3D.entryPoints;
    if (offscreen !== HarborLayout3D.entryOffscreen) {
      HarborLayout3D.entry(offscreen, points);
      HarborLayout3D.entryOffscreen = offscreen;
    }
    // Past the opening stop the curve heads for the first passage, as the story path does.
    const after = HarborLayout3D.PASSAGES[0][0];
    const p = CobaltArrival.boat(a);
    HarborLayout3D.along(points, p, out, undefined, after);
    const q = HarborLayout3D.along(points, Math.min(1, p + 0.01), HarborLayout3D.ahead, undefined, after);
    const r = HarborLayout3D.along(points, Math.max(0, p - 0.01), HarborLayout3D.behind, undefined, after);
    const travel = Math.atan2(-(q.z - r.z), q.x - r.x);
    const sailing = CobaltArrival.sailing(a);
    // The bow follows the course and settles to the opening stop's heading as the boat comes to rest.
    out.yaw = lerp(HarborLayout3D.STATIONS[0].yaw, travel, Math.min(1, sailing * 1.6));
    out.sailing = sailing;
    return out;
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
    { target: [spread(-28, REACH.opening), 2.2, 2.2], distance: 30.3, yaw: -68.9, pitch: 8.2 },
    { target: [spread(-18.8, REACH.find), 1.7, 0.2], distance: 30, yaw: -17, pitch: 10 },
    { target: [spread(-3.4, REACH.evidence), 1.7, 1.6], distance: 27, yaw: -6, pitch: 9 },
    // Report: high and wide over the whole recommended route, from the chart out to the shipyard.
    { target: [spread(7.4, REACH.report), 0.6, 0.8], distance: 46, yaw: -24, pitch: 25 },
    // Build: the boat at its berth on the left, the crane and the crate on the quay beside it.
    { target: [spread(25, REACH.shipyard), 3.2, -2.6], distance: 28, yaw: 24, pitch: 10 },
    // Custom systems: the lit workshop, with the loaded boat lying off the quay in front of it.
    { target: [spread(27, REACH.shipyard), 3.2, -4], distance: 26, yaw: 14, pitch: 7 },
    // Review: the boat at the client's harbor, the town above and the next decision's buoy ahead.
    { target: [spread(37.6, REACH.town), 1.9, 2.2], distance: 30, yaw: 10, pitch: 10 },
    { target: [spread(37.6, REACH.town), 2.1, 1.8], distance: 34, yaw: 3, pitch: 12 }
  ];

  /**
   * Phone vignettes: each is a still (or the live opening), so poses are
   * chosen per composition — the subject centred and large enough to read.
   */
  static readonly MOBILE: CameraPose3D[] = [
    { target: [spread(-32.6, REACH.opening), 2.7, 3.2], distance: 16.5, yaw: -64, pitch: 8 },
    { target: [spread(-17.8, REACH.find), 1.6, -0.4], distance: 25, yaw: 30, pitch: 11 },
    { target: [spread(-3.6, REACH.evidence), 1.6, 1.7], distance: 26, yaw: -5, pitch: 9 },
    { target: [spread(11), 0.8, 0.6], distance: 54, yaw: -20, pitch: 22 },
    { target: [spread(23.6, REACH.shipyard), 3.2, -2.6], distance: 26, yaw: 6, pitch: 10 },
    { target: [spread(28.4, REACH.shipyard), 3.2, -4.4], distance: 22, yaw: 9, pitch: 8 },
    { target: [spread(37, REACH.town), 2, 2.4], distance: 32, yaw: 4, pitch: 11 },
    { target: [spread(38.4, REACH.town), 2.1, 2], distance: 36, yaw: 3, pitch: 12 }
  ];

  /**
   * The cobalt entrance's view: the opening stop seen from the +z side, far
   * enough back that the boat crossing the cobalt reads whole. The camera turns
   * from here to the opening pose (CobaltArrival.CAMERA).
   */
  static readonly ARRIVAL: CameraPose3D = {
    target: [HarborLayout3D.STATIONS[0].x, 2.2, HarborLayout3D.STATIONS[0].z],
    distance: 44,
    yaw: HarborLayout3D.ENTRY_VIEW_YAW,
    pitch: 7
  };

  static poseAt(s: number, poses: CameraPose3D[], out?: CameraPose3D): CameraPose3D {
    const max = poses.length - 1;
    const cs = clamp(s, 0, max);
    const i = Math.min(Math.floor(cs), max - 1);
    return CameraRig3D.blend(poses[i], poses[i + 1], cs - i, out);
  }

  /** A pose between two poses (`out` may be either of them). */
  static blend(a: CameraPose3D, b: CameraPose3D, t: number, out: CameraPose3D = { target: [0, 0, 0], distance: 1, yaw: 0, pitch: 0 }): CameraPose3D {
    out.target[0] = lerp(a.target[0], b.target[0], t);
    out.target[1] = lerp(a.target[1], b.target[1], t);
    out.target[2] = lerp(a.target[2], b.target[2], t);
    // Distance interpolates geometrically so close-to-wide changes feel even.
    out.distance = Math.exp(lerp(Math.log(a.distance), Math.log(b.distance), t));
    out.yaw = lerp(a.yaw, b.yaw, t);
    out.pitch = lerp(a.pitch, b.pitch, t);
    return out;
  }

  /** Camera position for a pose. */
  static position(pose: CameraPose3D, out: [number, number, number] = [0, 0, 0]): [number, number, number] {
    const yaw = (pose.yaw * Math.PI) / 180;
    const pitch = (pose.pitch * Math.PI) / 180;
    const d = pose.distance;
    out[0] = pose.target[0] + Math.sin(yaw) * Math.cos(pitch) * d;
    out[1] = pose.target[1] + Math.sin(pitch) * d;
    out[2] = pose.target[2] + Math.cos(yaw) * Math.cos(pitch) * d;
    return out;
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
