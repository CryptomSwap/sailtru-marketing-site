"use client";

import { useCallback } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroUrlScan } from "@/components/sections/hero-url-scan";
import { HeroDotField } from "@/components/sections/home-v2/hero-dot-field";
import { HeroScanSequence } from "@/components/sections/home-v2/hero-scan-sequence";
import { BlurWordReveal } from "@/components/ui/blur-word-reveal";
import { RotatingBrandSlot } from "@/components/ui/rotating-brand-slot";
import { normalizeToHttpsUrl } from "@/lib/url-safety";
import "@/components/ui/blur-word-reveal.css";
import "@/components/ui/rotating-brand-slot.css";
import "@/components/sections/home-v2/home-v2.css";
import "@/components/sections/home-v2/field-hero-ref.css";
import "@/components/sections/home-v2/how-sailtru-works.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const CALENDLY_URL = "https://calendly.com/sailtrue";

/**
 * Cobalt Field ATF:
 * desktop — editorial + diagram · mobile — Peec structure + Profound blur craft.
 */
export function HomeHero() {
  const t = useTranslations("hero");
  const tFinal = useTranslations("finalCta");
  const tCommon = useTranslations("common");
  const reduceMotion = useReducedMotion() ?? false;
  const router = useRouter();

  const lead = t("mobile.headlineLead");
  const loud = t("mobile.headlineLoud");
  const leadWords = lead.trim().split(/\s+/).filter(Boolean).length;
  const loudWords = loud.trim().split(/\s+/).filter(Boolean).length;
  const typeDelay = 0.12 + (leadWords + loudWords) * 0.055;

  const runScan = useCallback(
    (url: string) => {
      if (!url.trim()) return;
      const nextHost = normalizeToHttpsUrl(url)?.hostname;
      router.push(nextHost ? { pathname: "/login", query: { host: nextHost } } : "/login");
    },
    [router]
  );

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
            <p className="field-eyebrow field-hero__desktop-only">{t("railLabel")}</p>

            <h1 className="field-headline field-headline--ref field-hero__desktop-only" aria-label={t("headlineAria")}>
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

            <p className="field-lede field-lede--ref field-hero__desktop-only">{t("subtitle")}</p>

            <div className="field-scan field-scan--ref field-hero__desktop-only">
              <Link href="/how-we-work" className="field-scan__secondary field-scan__secondary--ref">
                <span className="field-scan__play" aria-hidden>
                  <svg viewBox="0 0 20 20" width="12" height="12">
                    <path d="M7 5.2v9.6L15 10 7 5.2Z" fill="currentColor" />
                  </svg>
                </span>
                {t("methodology")}
              </Link>
            </div>

            <div className="field-hero-mobile">
              <header className="field-hero-mobile__copy">
                <h1 className="field-headline field-headline--ref field-hero-mobile__title" aria-label={t("mobile.headline")}>
                  <BlurWordReveal
                    as="span"
                    className="field-headline__line field-headline__line--lead"
                    text={lead}
                    mode="mount"
                    delay={0.06}
                    stagger={0.055}
                  />
                  <BlurWordReveal
                    as="span"
                    className="field-headline__line field-headline__line--loud"
                    text={loud}
                    mode="mount"
                    delay={0.06 + leadWords * 0.055}
                    stagger={0.065}
                    duration={0.62}
                    color="#7ee7ff"
                    mutedColor="rgba(126, 231, 255, 0.35)"
                  />
                </h1>

                {reduceMotion ? (
                  <p className="field-lede field-lede--ref field-hero-mobile__lede">{t("mobile.subtitle")}</p>
                ) : (
                  <motion.p
                    className="field-lede field-lede--ref field-hero-mobile__lede"
                    initial={{ opacity: 0.35, filter: "blur(12px)", y: 8 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 0.7, delay: typeDelay, ease: EASE }}
                  >
                    {t("mobile.subtitle")}
                  </motion.p>
                )}

              </header>

              <motion.div
                id="observe"
                className="field-hero-mobile__actions"
                initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: reduceMotion ? 0 : typeDelay + 0.1, ease: EASE }}
              >
                <div className="field-hero-mobile__scan">
                  <HeroUrlScan stacked submitLabel={t("urlScan.runScan")} onRunScan={runScan} />
                </div>
                {reduceMotion ? (
                  <RotatingBrandSlot className="field-hero-mobile__credibility rotating-brand--centered" />
                ) : (
                  <motion.div
                    className="field-hero-mobile__credibility-wrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: typeDelay + 0.18, ease: EASE }}
                  >
                    <RotatingBrandSlot className="field-hero-mobile__credibility rotating-brand--centered" />
                  </motion.div>
                )}
                <a
                  href={CALENDLY_URL}
                  className="field-hero-mobile__build"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tFinal("buildCta")}
                </a>
              </motion.div>
            </div>
          </div>

          <HeroScanSequence className="hsw__diagram--hero field-hero__desktop-only" />
        </div>
      </div>
    </section>
  );
}
