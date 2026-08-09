"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ThreeDPanel } from "@/components/diagnostics/three-d-panel";
import { HeroPreview, useHeroPreviewPreload } from "@/components/diagnostics/hero-preview";
import { heroMarkers } from "@/components/diagnostics/diagnostic-content";
import { buildInsightCards } from "@/lib/content/locale-content";
import { useDiagnosticSequence } from "@/components/diagnostics/use-diagnostic-sequence";

export function HeroDiagnosticExperience() {
  const t = useTranslations("diagnostics");
  const preloadSources = useHeroPreviewPreload();
  const cards = buildInsightCards(t.raw("cards"));
  const { showAltImage, ...sequence } = useDiagnosticSequence();

  useEffect(() => {
    preloadSources.forEach((src) => {
      const preload = new window.Image();
      preload.src = src;
    });
  }, [preloadSources]);

  return (
    <div className="hero-campaign__product" aria-hidden>
      <ThreeDPanel
        presentation="composite"
        markers={heroMarkers}
        insightCards={cards}
        scale={1}
        overlayScale={1.25}
        sequence={{
          websiteVisible: sequence.websiteVisible,
          websiteSettled: sequence.websiteSettled,
          scanActive: sequence.scanActive,
          scanComplete: sequence.scanComplete,
          hudOpen: sequence.hudOpen,
          visibleMarkerIds: sequence.visibleMarkers,
          visibleCardIds: sequence.visibleCards,
          illuminatedMarkerId: sequence.illuminatedMarker,
          sequenceComplete: sequence.sequenceComplete,
        }}
      >
        <HeroPreview showAlt={showAltImage} />
      </ThreeDPanel>
    </div>
  );
}
