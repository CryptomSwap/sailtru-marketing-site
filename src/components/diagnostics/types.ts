import { ReactNode } from "react";

export type ThreeDMarker = {
  id: string;
  x: number;
  y: number;
  pulse?: boolean;
  /** Highlight zone width as % of panel */
  zoneWidth?: number;
  /** Highlight zone height as % of panel */
  zoneHeight?: number;
};

export type ThreeDInsightCard = {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
  severity?: "low" | "medium" | "high";
  /** Percentage offsets from panel center */
  offsetX: number;
  offsetY: number;
  depth?: number;
};

export type ThreeDChromeProps = {
  url?: string;
  signalLabel?: string;
};

export type ThreeDPanelPresentation = "layered" | "composite";

export type DiagnosticSequenceProps = {
  websiteVisible?: boolean;
  websiteSettled?: boolean;
  scanActive?: boolean;
  scanComplete?: boolean;
  hudOpen?: boolean;
  visibleMarkerIds?: string[];
  visibleCardIds?: string[];
  illuminatedMarkerId?: string | null;
  sequenceComplete?: boolean;
};

export type ThreeDPanelProps = {
  children: ReactNode;
  chrome?: ThreeDChromeProps;
  markers?: ThreeDMarker[];
  insightCards?: ThreeDInsightCard[];
  className?: string;
  /** Use composite when children is a full pre-rendered scan asset */
  presentation?: ThreeDPanelPresentation;
  /** Base product tilt in degrees (keep under 10) */
  baseRotateX?: number;
  baseRotateY?: number;
  /** Choreographed diagnostic story state */
  sequence?: DiagnosticSequenceProps;
  /** Scale multiplier for the full panel (mock site stays at 1 when overlayScale is set) */
  scale?: number;
  /** Scale diagnostic overlays only — markers, cards, HUD */
  overlayScale?: number;
};
