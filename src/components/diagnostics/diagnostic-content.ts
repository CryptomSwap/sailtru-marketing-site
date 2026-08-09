import type { ThreeDMarker } from "@/components/diagnostics/types";

export const heroMarkers: ThreeDMarker[] = [
  { id: "trust", x: 28, y: 62, pulse: true, zoneWidth: 22, zoneHeight: 18 },
  { id: "conversion", x: 72, y: 48, pulse: true, zoneWidth: 20, zoneHeight: 16 },
  { id: "visibility", x: 46, y: 24, pulse: true, zoneWidth: 24, zoneHeight: 14 },
  { id: "lcp", x: 55, y: 38, pulse: true, zoneWidth: 26, zoneHeight: 16 },
  { id: "ttfb", x: 14, y: 52, pulse: true, zoneWidth: 16, zoneHeight: 20 },
  { id: "assets", x: 62, y: 82, pulse: true, zoneWidth: 28, zoneHeight: 12 },
];

/** Choreographed hero diagnostic story (ms) */
export const diagnosticTimeline = {
  websiteIn: 0,
  websiteDuration: 900,
  scanDelay: 1000,
  scanDuration: 3600,
  /** Pause after scan beam finishes */
  hudOpenLag: 280,
  /** HUD frame reveal before first diagnostic */
  hudRevealDuration: 650,
  /** Stagger between each signal discovery */
  discoveryStagger: 700,
  /** Marker → card delay */
  cardLag: 420,
  settleLag: 1000,
  /** Idle pause before the sequence restarts */
  loopPause: 10000,
  /** Crossfade between preview images before the next rotation */
  dissolveDuration: 1400,
  /** Fade-out lead time for HUD, markers, and cards before dissolve */
  diagnosticsClearDuration: 650,
} as const;

export const heroDiscoveryIds = heroMarkers.map((m) => m.id);
