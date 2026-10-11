"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroScanSequence } from "@/components/sections/home-v2/hero-scan-sequence";
import "@/components/sections/home-v2/home-v2.css";
import "@/components/sections/home-v2/field-hero-ref.css";
import "@/components/sections/home-v2/how-sailtru-works.css";

/**
 * Reference-led Cobalt Field ATF:
 * editorial left column + How SailTru Works diagram.
 */
export function HomeHero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section id="hero" className="field-hero field-hero--ref">
      <a href="#main-content" className="sr-only rounded bg-white px-3 py-2 text-[var(--ink)] focus:not-sr-only">
        {tCommon("skipToContent")}
      </a>

      <div className="field-hero__wash" aria-hidden />
      <div className="field-hero__grain" aria-hidden />
      <div className="field-hero__radial" aria-hidden />
      <svg className="field-hero__bearing" aria-hidden viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="fieldBearingFadeRef" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(186, 230, 255, 0.34)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#fieldBearingFadeRef)" strokeWidth="1">
          <circle cx="980" cy="320" r="160" />
          <circle cx="980" cy="320" r="250" />
          <circle cx="980" cy="320" r="360" />
          <circle cx="980" cy="320" r="480" strokeDasharray="2 11" />
          <path d="M980 320 L1180 180" />
          <path d="M980 320 L1220 360" />
          <path d="M980 320 L1120 520" />
          <path d="M980 320 L780 160" />
          <path d="M620 120 H980" opacity="0.45" />
          <path d="M700 700 H1180" opacity="0.35" />
        </g>
        <g fill="rgba(186, 230, 255, 0.55)">
          <circle cx="980" cy="320" r="3" />
          <circle cx="1180" cy="180" r="2.2" />
          <circle cx="1220" cy="360" r="2.2" />
          <circle cx="1120" cy="520" r="2.2" />
          <circle cx="780" cy="160" r="2" />
          <circle cx="700" cy="700" r="1.8" />
          <circle cx="860" cy="240" r="1.5" />
          <circle cx="1040" cy="440" r="1.5" />
        </g>
      </svg>

      <div className="field-hero__inner">
        <SiteHeader />

        <div className="field-stage field-stage--ref field-stage--with-diagram">
          <div className="field-main field-main--ref">
            <p className="field-eyebrow">{t("railLabel")}</p>

            <h1 className="field-headline field-headline--ref" aria-label={t("headlineAria")}>
              <span className="field-headline__line field-headline__line--lead">{t("headlineLineA")}</span>
              <span className="field-headline__line field-headline__line--loud">{t("headlineLineB")}</span>
              <span className="field-headline__line field-headline__line--mid">{t("headlineLineC")}</span>
              <span className="field-headline__line field-headline__line--close">{t("headlineLineD")}</span>
            </h1>

            <p className="field-lede field-lede--ref">{t("subtitle")}</p>

            <div className="field-scan field-scan--ref">
              <Link href="/how-we-work" className="field-scan__secondary field-scan__secondary--ref">
                <span className="field-scan__play" aria-hidden>
                  <svg viewBox="0 0 20 20" width="12" height="12">
                    <path d="M7 5.2v9.6L15 10 7 5.2Z" fill="currentColor" />
                  </svg>
                </span>
                {t("methodology")}
              </Link>
            </div>
          </div>

          <HeroScanSequence className="hsw__diagram--hero" />
        </div>
      </div>
    </section>
  );
}
