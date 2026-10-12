/** Authored stage. 1000×1080 matches the stage aspect ratio, so nodes and paths share one grid. */

export const VB = { w: 1000, h: 1080 };

export const ENGINE = {
  top: 368,
  bottom: 572,
  right: 642,
  midY: 470
};

export type SourceId =
  | "chatgpt"
  | "google"
  | "perplexity"
  | "competitors"
  | "analytics"
  | "workflows"
  | "crm";

export type OutputId = "found" | "ahead" | "automate" | "build";

export const SOURCES: { id: SourceId; x: number; y: number; landX: number; major: boolean }[] = [
  { id: "chatgpt", x: 74, y: 62, landX: 398, major: true },
  { id: "google", x: 206, y: 62, landX: 434, major: true },
  { id: "perplexity", x: 338, y: 62, landX: 470, major: true },
  { id: "competitors", x: 500, y: 48, landX: 506, major: false },
  { id: "analytics", x: 662, y: 62, landX: 542, major: false },
  { id: "workflows", x: 794, y: 62, landX: 578, major: false },
  { id: "crm", x: 926, y: 62, landX: 614, major: false }
];

export const OUTPUTS: { id: OutputId; x: number; y: number }[] = [
  { id: "found", x: 132, y: 868 },
  { id: "ahead", x: 376, y: 868 },
  { id: "automate", x: 624, y: 868 },
  { id: "build", x: 868, y: 868 }
];

export function pct(x: number, y: number) {
  return {
    left: `${(x / VB.w) * 100}%`,
    top: `${(y / VB.h) * 100}%`
  };
}

export function route(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const span = Math.abs(dx);
  const rise = Math.abs(dy);
  const n = (v: number) => v.toFixed(1);
  if (span < 2 || rise < 12) return `M ${n(x1)} ${n(y1)} L ${n(x2)} ${n(y2)}`;

  const dir = dx > 0 ? 1 : -1;
  const down = dy > 0 ? 1 : -1;
  const r = Math.min(16, span / 2, rise * 0.28);
  const mid = y1 + dy * 0.46;
  return [
    `M ${n(x1)} ${n(y1)}`,
    `L ${n(x1)} ${n(mid - r * down)}`,
    `Q ${n(x1)} ${n(mid)} ${n(x1 + r * dir)} ${n(mid)}`,
    `L ${n(x2 - r * dir)} ${n(mid)}`,
    `Q ${n(x2)} ${n(mid)} ${n(x2)} ${n(mid + r * down)}`,
    `L ${n(x2)} ${n(y2)}`
  ].join(" ");
}

export function inboundPath(x: number, landX: number) {
  return route(x, 108, landX, ENGINE.top);
}

export function outboundPath(x: number) {
  return route(500, ENGINE.bottom, x, 824);
}

export const RETURN_PATH = "M 868 948 H 972 Q 984 948 984 936 V 482 Q 984 470 972 470 H 648";
