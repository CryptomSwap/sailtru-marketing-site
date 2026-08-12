"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroUrlScan } from "@/components/sections/hero-url-scan";
import { DiagnosticScanProvider } from "@/components/diagnostics/diagnostic-scan-context";
import { HomeProductStage } from "@/components/sections/home-v2/home-product-stage";
import "@/components/sections/home-v2/home-v2.css";

/**
 * THESIS: ATF is a committed SailTru cobalt field - the surface IS the brand signal.
 * OWN-WORLD: Full-bleed cobalt with light/grain, display contrast, instrument annotations.
 * STORY: Category in one scan; Run scan is the decisive contact; evidence is typographic.
 * FIRST VIEWPORT: Wordmark · kinetic headline · annotation column · instrument scan.
 * FORM: Cobalt Field - scan mockup as product evidence (improved; text wordmark only).
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
 */
export function HomeHero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section id="hero" className="field-hero">
      <a href="#main-content" className="sr-only rounded bg-white px-3 py-2 text-[var(--ink)] focus:not-sr-only">
        {tCommon("skipToContent")}
      </a>

      <div className="field-hero__wash" aria-hidden />
      <div className="field-hero__grain" aria-hidden />
      <svg className="field-hero__bearing" aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="fieldBearingFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#fieldBearingFade)" strokeWidth="1">
          <circle cx="1020" cy="120" r="180" />
          <circle cx="1020" cy="120" r="290" />
          <circle cx="1020" cy="120" r="410" />
          <circle cx="1020" cy="120" r="540" strokeDasharray="2 10" />
          <path d="M1020 120 L1188 28" />
          <path d="M1020 120 L1164 248" />
          <path d="M1020 120 L860 18" />
        </g>
        <circle cx="1020" cy="120" r="3.5" fill="rgba(255,255,255,0.55)" />
        <circle cx="1020" cy="120" r="9" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      </svg>

      <DiagnosticScanProvider>
        <div className="field-hero__inner">
          <SiteHeader />

          <div className="field-stage">
            <div className="field-main">
              <h1 className="field-headline" aria-label={t("headlineAria")}>
                <span className="field-headline__line field-headline__line--lead">{t("headlineLineA")}</span>
                <span className="field-headline__line field-headline__line--loud">{t("headlineLineB")}</span>
                <span className="field-headline__line field-headline__line--close">
                  {t("headlineLineC")} {t("headlineLineD")}
                </span>
              </h1>
              <p className="field-lede">{t("subtitle")}</p>

              <div className="field-scan">
                <p className="field-scan__label">{t("urlScan.label")}</p>
                <HeroUrlScan />
                <Link href="/how-we-work" className="field-scan__secondary">
                  {t("methodology")}
                </Link>
              </div>
            </div>

            <HomeProductStage />
          </div>
        </div>
      </DiagnosticScanProvider>
    </section>
  );
}
