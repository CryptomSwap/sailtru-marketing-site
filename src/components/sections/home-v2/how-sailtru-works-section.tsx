"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
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

const OUTCOMES = [
  { id: "found" },
  { id: "ahead" },
  { id: "automate" },
  { id: "build" }
] as const;

const REVEAL = [0.16, 1, 0.3, 1] as const;

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

function OutcomeIcon({ id }: { id: string }) {
  switch (id) {
    case "found":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hsw-out__icon">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "ahead":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hsw-out__icon">
          <path d="M4 16 9 10l4 3 7-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "automate":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hsw-out__icon">
          <path d="M13 3 5 13h6l-1 8 9-12h-6l0-6Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hsw-out__icon">
          <path d="M12 4 5 8v8l7 4 7-4V8l-7-4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 12 5 8m7 4 7-4M12 12v8" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

/** Input-signal chip band — reused by the hero's scan sequence. Render inside a `.hsw__diagram` ancestor. */
export function SignalChips({ className = "", stagger = false }: { className?: string; stagger?: boolean }) {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <div className={className}>
      <div className="hsw__band">
        <span className="hsw__band-line" aria-hidden />
        <p className="hsw__band-label">{t("inputsLabel")}</p>
        <span className="hsw__band-line" aria-hidden />
      </div>

      <ul className="hsw__signals">
        {SIGNALS.map((signal, index) => {
          const chip = (
            <>
              <SignalMark id={signal.id} />
              <span>{t(`signals.${signal.id}`)}</span>
            </>
          );
          if (!stagger) {
            return (
              <li key={signal.id} className={`hsw-chip hsw-chip--${signal.kind} hsw-chip--${signal.id}`}>
                {chip}
              </li>
            );
          }
          return (
            <motion.li
              key={signal.id}
              className={`hsw-chip hsw-chip--${signal.kind} hsw-chip--${signal.id}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.14, ease: REVEAL }}
            >
              {chip}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/** SailTru intelligence layer panel (Identify / Understand / Implement) — reused by the hero's scan sequence. Render inside a `.hsw__diagram` ancestor. */
export function IntelPanel({ className = "", stagger = false }: { className?: string; stagger?: boolean }) {
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
              <motion.li
                className={`hsw-intel__step hsw-intel__step--${index + 1}`}
                style={{ ["--step-i" as string]: index }}
                initial={stagger ? { opacity: 0, y: 14 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stagger ? 0.2 + index * 0.45 : 0, ease: REVEAL }}
              >
                <span className="hsw-intel__num">{step.num}</span>
                <div className="hsw-intel__copy">
                  <p className="hsw-intel__step-title">{t(`steps.${step.id}.title`)}</p>
                  <p className="hsw-intel__step-body">{t(`steps.${step.id}.body`)}</p>
                </div>
              </motion.li>
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

export function OutcomeBoard({ className = "" }: { className?: string }) {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <ul className={`hsw__outcomes ${className}`.trim()}>
      {OUTCOMES.map((outcome, index) => (
        <li key={outcome.id} className={`hsw-out hsw-out--${outcome.id}`} style={{ ["--out-i" as string]: index }}>
          <div className="hsw-out__head">
            <span className="hsw-out__mark">
              <OutcomeIcon id={outcome.id} />
            </span>
            <h3 className="hsw-out__title">{t(`outcomes.${outcome.id}.title`)}</h3>
          </div>
          <p className="hsw-out__body">{t(`outcomes.${outcome.id}.body`)}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Second homepage section — the system diagram: signals, intelligence layer, four outcomes.
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
          <div className="hsw__diagram hsw__diagram--board" aria-label={t("diagramAria")}>
            <SignalChips />
            <IntelPanel />
            <OutcomeBoard />
            <p className="hsw__tag">
              <span className="hsw__tag-rail" aria-hidden>
                <span className="hsw__tag-dot" />
                <span className="hsw__tag-line" />
              </span>
              {t("tagline")}
              <span className="hsw__tag-rail" aria-hidden>
                <span className="hsw__tag-line" />
                <span className="hsw__tag-dot" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
