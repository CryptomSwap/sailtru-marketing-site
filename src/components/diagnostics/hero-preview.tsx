"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HebrewMockPreview } from "@/components/diagnostics/hebrew-mock-preview";

/** Hero 3D panel fill image — aspect ratio 1024×682 */
export const HERO_PANEL_IMAGE_SRC = "/images/hero-panel-northline.jpg";
export const HERO_PANEL_IMAGE_SRC_ALT = "/images/hero-panel-cycle-2.png";
export const HERO_PANEL_ASPECT = 682 / 1024;

type HeroPreviewProps = {
  showAlt?: boolean;
};

/** Full-bleed preview inside the 3D product panel — locale-aware. */
export function HeroPreview({ showAlt = false }: HeroPreviewProps) {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("preview");
  const mode = t("mode");

  if (mode === "mock") {
    const variants = t.raw("variants") as string[];
    const primary = (variants[0] ?? "clinic") as "clinic" | "lawFirm";
    const alternate = (variants[1] ?? "lawFirm") as "clinic" | "lawFirm";

    return (
      <div className="three-d-composite__asset-inner">
        <div
          className={`hero-preview__stack ${reduceMotion ? "hero-preview__stack--reduced" : ""}`}
        >
          <div className="hero-preview__layer hero-preview__layer--mock">
            <HebrewMockPreview variant={primary} />
          </div>
          <div
            className={`hero-preview__layer hero-preview__layer--mock hero-preview__layer--alt ${
              showAlt ? "hero-preview__layer--visible" : ""
            }`}
          >
            <HebrewMockPreview variant={alternate} />
          </div>
        </div>
        <div className="three-d-composite__grade" aria-hidden />
        <div className="three-d-composite__edge-light" aria-hidden />
        <div className="three-d-composite__vignette" aria-hidden />
      </div>
    );
  }

  const primarySrc = t("primary");
  const alternateSrc = t("alternate");

  return (
    <div className="three-d-composite__asset-inner">
      <div
        className={`hero-preview__stack ${reduceMotion ? "hero-preview__stack--reduced" : ""}`}
      >
        <Image
          src={primarySrc}
          alt=""
          fill
          priority
          quality={100}
          unoptimized
          sizes="(max-width: 1024px) 92vw, 50vw"
          className="three-d-composite__image hero-preview__layer"
          aria-hidden
        />
        <Image
          src={alternateSrc}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes="(max-width: 1024px) 92vw, 50vw"
          className={`three-d-composite__image hero-preview__layer hero-preview__layer--alt ${
            showAlt ? "hero-preview__layer--visible" : ""
          }`}
          aria-hidden
        />
      </div>
      <div className="three-d-composite__grade" aria-hidden />
      <div className="three-d-composite__edge-light" aria-hidden />
      <div className="three-d-composite__vignette" aria-hidden />
    </div>
  );
}

/** Preload hero preview assets for the active locale. */
export function useHeroPreviewPreload(): string[] {
  const t = useTranslations("preview");
  const mode = t("mode");

  if (mode === "mock") return [];

  return [t("primary"), t("alternate")];
}
