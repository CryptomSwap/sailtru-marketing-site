import type { ThreeDInsightCard } from "@/components/diagnostics/types";

type DiagnosticCardMessage = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  severity: "low" | "medium" | "high";
};

/** Card layout offsets — shared across locales; positions anchor to mock site zones. */
const cardLayout: Record<
  string,
  Pick<ThreeDInsightCard, "offsetX" | "offsetY" | "depth">
> = {
  trust: { offsetX: -40, offsetY: -6, depth: 78 },
  conversion: { offsetX: 34, offsetY: 8, depth: 84 },
  visibility: { offsetX: -6, offsetY: -36, depth: 72 },
  lcp: { offsetX: 38, offsetY: -20, depth: 80 },
  ttfb: { offsetX: -44, offsetY: 16, depth: 76 },
  assets: { offsetX: 36, offsetY: 30, depth: 82 },
};

export function buildInsightCards(cards: DiagnosticCardMessage[]): ThreeDInsightCard[] {
  return cards.map((card) => ({
    ...card,
    ...cardLayout[card.id],
  }));
}

export type PreviewConfig =
  | { mode: "image"; primary: string; alternate: string }
  | { mode: "mock"; variants: string[] };

export function getPreviewConfig(preview: PreviewConfig): PreviewConfig {
  return preview;
}
