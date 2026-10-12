"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroDotField } from "@/components/sections/home-v2/hero-dot-field";
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
      <HeroDotField />

      <div className="field-hero__inner">
        <SiteHeader />

        <div className="field-stage field-stage--ref field-stage--with-diagram">
          <div className="field-main field-main--ref">
            <p className="field-eyebrow">{t("railLabel")}</p>

            <h1 className="field-headline field-headline--ref" aria-label={t("headlineAria")}>
              {t("headlineLineA") ? (
                <span className="field-headline__line field-headline__line--lead">{t("headlineLineA")}</span>
              ) : null}
              {t("headlineLineB") ? (
                <span className="field-headline__line field-headline__line--loud">{t("headlineLineB")}</span>
              ) : null}
              {t("headlineLineC") ? (
                <span className="field-headline__line field-headline__line--mid">{t("headlineLineC")}</span>
              ) : null}
              {t("headlineLineD") ? (
                <span className="field-headline__line field-headline__line--close">{t("headlineLineD")}</span>
              ) : null}
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
