"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { HeroAnalysisStage } from "@/components/sections/home-v2/hero-analysis-stage";
import "@/components/sections/home-v2/how-sailtru-works.css";

type Signal = {
  id: string;
  label: string;
  kind: "major" | "minor";
};

const SIGNALS: Signal[] = [
  { id: "chatgpt", label: "ChatGPT", kind: "major" },
  { id: "google", label: "Google", kind: "major" },
  { id: "perplexity", label: "Perplexity", kind: "major" },
  { id: "competitors", label: "Competitors", kind: "minor" },
  { id: "analytics", label: "Analytics", kind: "minor" },
  { id: "workflows", label: "Workflows", kind: "minor" },
  { id: "crm", label: "CRM", kind: "minor" }
];

const STEPS = [
  { id: "identify", num: "1" },
  { id: "understand", num: "2" },
  { id: "implement", num: "3" }
] as const;

const SIGNAL_BRANDS: Record<
  string,
  { src: string; alt: string; tone: "color" | "light" }
> = {
  chatgpt: { src: "/images/brands/openai-white.svg", alt: "OpenAI", tone: "light" },
  google: { src: "/images/brands/google-color.svg", alt: "Google", tone: "color" },
  perplexity: { src: "/images/brands/perplexity-color.svg", alt: "Perplexity", tone: "color" },
  competitors: { src: "/images/brands/semrush-color.svg", alt: "Semrush", tone: "color" },
  analytics: { src: "/images/brands/googleanalytics-color.svg", alt: "Google Analytics", tone: "color" },
  workflows: { src: "/images/brands/n8n-color.svg", alt: "n8n", tone: "color" },
  crm: { src: "/images/brands/hubspot-color.svg", alt: "HubSpot", tone: "color" }
};

function SignalMark({ id }: { id: string }) {
  const brand = SIGNAL_BRANDS[id];
  if (brand) {
    return (
      // local brand SVGs; avoid optimizer color shifts
      <img
        src={brand.src}
        alt=""
        width={16}
        height={16}
        className={`hsw-chip__mark hsw-chip__mark--brand hsw-chip__mark--${brand.tone}`}
        draggable={false}
      />
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="hsw-chip__mark">
      <rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Input-signal chip band — reused by the hero's scan sequence. Render inside a `.hsw__diagram` ancestor. */
export function SignalChips({ className = "" }: { className?: string }) {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <div className={className}>
      <div className="hsw__band">
        <span className="hsw__band-line" aria-hidden />
        <p className="hsw__band-label">{t("inputsLabel")}</p>
        <span className="hsw__band-line" aria-hidden />
      </div>

      <ul className="hsw__signals">
        {SIGNALS.map((signal) => (
          <li
            key={signal.id}
            className={`hsw-chip hsw-chip--${signal.kind} hsw-chip--${signal.id}`}
          >
            <SignalMark id={signal.id} />
            <span>{t(`signals.${signal.id}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** SailTru intelligence layer panel (Identify / Understand / Implement) — reused by the hero's scan sequence. Render inside a `.hsw__diagram` ancestor. */
export function IntelPanel({ className = "" }: { className?: string }) {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <div className={className}>
      <div className="hsw-intel hsw-intel--live">
        <div className="hsw-intel__glow" aria-hidden />
        <div className="hsw-intel__head">
          <Image
            src="/images/sailtru-lockup.png"
            alt="SailTru"
            width={220}
            height={62}
            className="hsw-intel__logo"
            priority={false}
            unoptimized
          />
          <p className="hsw-intel__label">{t("intelLabel")}</p>
        </div>
        <ol className="hsw-intel__steps">
          {STEPS.map((step, index) => (
            <Fragment key={step.id}>
              <li
                className={`hsw-intel__step hsw-intel__step--${index + 1}`}
                style={{ ["--step-i" as string]: index }}
              >
                <span className="hsw-intel__num">{step.num}</span>
                <div className="hsw-intel__copy">
                  <p className="hsw-intel__step-title">{t(`steps.${step.id}.title`)}</p>
                  <p className="hsw-intel__step-body">{t(`steps.${step.id}.body`)}</p>
                </div>
              </li>
              {index < STEPS.length - 1 ? (
                <li
                  className={`hsw-intel__progress hsw-intel__progress--${index + 1}`}
                  aria-hidden
                >
                  <span className="hsw-intel__progress-track">
                    <span className="hsw-intel__progress-fill" />
                  </span>
                </li>
              ) : null}
            </Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * Second homepage section — narrative + a looping illustrative example (always Northline, captioned as such).
 */
export function HowSailtruWorksSection() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <section id="how-sailtru-works" className="hsw" aria-labelledby="hsw-title">
      <div className="hsw__wash" aria-hidden />
      <div className="hsw__grain" aria-hidden />
      <div className="hsw__sail" aria-hidden />

      <div className="hsw__inner">
        <div className="hsw__copy">
          <p className="hsw__eyebrow">{t("eyebrow")}</p>
          <h2 id="hsw-title" className="hsw__title">
            <span>{t("headlineA")}</span>
            <span>{t("headlineB")}</span>
            <span>{t("headlineC")}</span>
          </h2>
          <div className="hsw__rule" aria-hidden />
          <p className="hsw__lede">{t("lede")}</p>
        </div>

        <div className="hsw__stage">
          <HeroAnalysisStage />
        </div>
      </div>
    </section>
  );
}
