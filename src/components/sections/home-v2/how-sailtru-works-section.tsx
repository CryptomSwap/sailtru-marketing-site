"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useRef, useState, type ComponentType } from "react";
import { DeliverBoards } from "@/components/sections/home-v2/deliver-boards";
import { mountPipeline } from "@/components/sections/home-v2/pipeline-scroll";

type StreamProps = { paused?: boolean; onReady?: () => void };
import "@/components/sections/home-v2/how-sailtru-works.css";

gsap.registerPlugin(useGSAP);

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

function SignalChip({
  signal,
  index,
  stagger,
  label,
}: {
  signal: Signal;
  index: number;
  stagger: boolean;
  label: string;
}) {
  const className = `hsw-chip hsw-chip--${signal.kind} hsw-chip--${signal.id}`;
  const body = (
    <>
      <SignalMark id={signal.id} />
      <span>{label}</span>
    </>
  );
  if (!stagger) {
    return (
      <li key={signal.id} className={className} data-pipe-id={signal.id}>
        {body}
      </li>
    );
  }
  return (
    <motion.li
      key={signal.id}
      className={className}
      data-pipe-id={signal.id}
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, delay: 0.05 + index * 0.06, ease: REVEAL }}
    >
      {body}
    </motion.li>
  );
}

/** Input-signal chip band — reused by the hero's scan sequence. Render inside a `.hsw__diagram` ancestor. */
export function SignalChips({
  className = "",
  stagger = false,
  layout = "wrap",
}: {
  className?: string;
  stagger?: boolean;
  layout?: "wrap" | "rows";
}) {
  const t = useTranslations("homeV2.howItWorks");
  const rows = layout === "rows" ? [SIGNALS.slice(0, 3), SIGNALS.slice(3)] : [SIGNALS];

  return (
    <div className={className}>
      <div className="hsw__band">
        <span className="hsw__band-line" aria-hidden />
        <p className="hsw__band-label">{t("inputsLabel")}</p>
        <span className="hsw__band-line" aria-hidden />
      </div>

      <div className={layout === "rows" ? "hsw__signal-rows" : undefined}>
        {rows.map((row) => (
          <ul key={row[0]?.id} className="hsw__signals">
            {row.map((signal) => (
              <SignalChip
                key={signal.id}
                signal={signal}
                index={SIGNALS.findIndex((item) => item.id === signal.id)}
                stagger={stagger}
                label={t(`signals.${signal.id}`)}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** SailTru intelligence layer panel (Identify / Understand / Implement) — reused by the hero's scan sequence. Render inside a `.hsw__diagram` ancestor. */
export function IntelPanel({ className = "", stagger = false }: { className?: string; stagger?: boolean }) {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <div className={className}>
      <div className="hsw-intel hsw-intel--live" data-pipe="core">
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
                transition={{ duration: 0.45, delay: stagger ? 0.08 + index * 0.18 : 0, ease: REVEAL }}
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
        <li
          key={outcome.id}
          className={`hsw-out hsw-out--${outcome.id}`}
          style={{ ["--out-i" as string]: index }}
          data-pipe="card"
          data-pipe-id={outcome.id}
        >
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

const CHAPTERS: { id: "discover" | "understand" | "implement" | "optimize"; step: "a" | "b" | "c" | "d"; index: string }[] = [
  { id: "discover", step: "a", index: "01" },
  { id: "understand", step: "b", index: "02" },
  { id: "implement", step: "c", index: "03" },
  { id: "optimize", step: "d", index: "04" }
];

const DESKTOP_MOTION = "(min-width: 980px) and (prefers-reduced-motion: no-preference)";

function SignalPoster({ tone = "cubes", hidden = false }: { tone?: "cubes" | "orbit" | "outputs"; hidden?: boolean }) {
  return <div className={`signal-poster signal-poster--${tone}${hidden ? " is-hidden" : ""}`} aria-hidden />;
}

/**
 * Second homepage section. Desktop keeps one intelligence engine on screen and
 * scrubs four chapters through it. Smaller viewports and reduced motion get
 * the same four chapters in document order, with a static poster instead of WebGL.
 */
export function HowSailtruWorksSection() {
  const t = useTranslations("homeV2.howItWorks");
  const rootRef = useRef<HTMLElement>(null);
  const [liveDesktop, setLiveDesktop] = useState(false);
  const [armed, setArmed] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [Stream, setStream] = useState<ComponentType<StreamProps> | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const query = window.matchMedia(DESKTOP_MOTION);
    const apply = () => setLiveDesktop(query.matches);
    apply();
    query.addEventListener("change", apply);
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setArmed(true);
    }, { rootMargin: "100% 0px", threshold: 0 });
    const view = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    preload.observe(node);
    view.observe(node);
    return () => {
      query.removeEventListener("change", apply);
      preload.disconnect();
      view.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!liveDesktop || !armed || Stream) return;
    let cancel = false;
    void import("@/components/sections/home-v2/how-it-works/SignalStream").then((mod) => {
      if (!cancel) setStream(() => mod.SignalStream);
    });
    return () => {
      cancel = true;
    };
  }, [liveDesktop, armed, Stream]);

  useEffect(() => {
    if (!liveDesktop) setReady(false);
  }, [liveDesktop]);
  const headline = (step: "a" | "b" | "c" | "d") => {
    if (step === "a") return t("headlineA");
    if (step === "b") return t("headlineB");
    if (step === "c") return t("headlineC");
    return t("engine.headlineD");
  };
  const body = (step: "a" | "b" | "c" | "d") => {
    if (step === "a") return t("engine.bodyA");
    if (step === "b") return t("engine.bodyB");
    if (step === "c") return t("engine.bodyC");
    return t("engine.bodyD");
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      return mountPipeline(root);
    },
    { scope: rootRef }
  );

  return (
    <section id="how-sailtru-works" ref={rootRef} className="hsw hsw--engine" aria-label={t("eyebrow")}>
      <div className="hsw__wash" aria-hidden />
      <div className="hsw__grain" aria-hidden />

      <div className="intel-live">
        <div className="hsw__frame">
          <div className="hsw__copy">
            <p className="hsw__eyebrow">{t("eyebrow")}</p>
            <div className="intel-index" aria-hidden>
              {CHAPTERS.map((chapter, index) => (
                <span key={chapter.index} data-chapter-index={index} className={index === 0 ? "is-on" : undefined}>
                  {chapter.index}
                </span>
              ))}
            </div>
            <h2 id="hsw-title" className="hsw__title">
              {CHAPTERS.map((chapter) => (
                <span key={chapter.step} data-pipe-step={chapter.step} aria-hidden={chapter.step !== "a" ? true : undefined}>
                  {headline(chapter.step)}
                </span>
              ))}
            </h2>
            <div className="hsw__rule" aria-hidden />
            <div className="hsw__bodies">
              {CHAPTERS.map((chapter) => (
                <p key={chapter.step} data-chapter-body={chapter.step} aria-hidden={chapter.step !== "a" ? true : undefined}>
                  {body(chapter.step)}
                </p>
              ))}
            </div>
            <a className="intel-cta" data-cta href="#hero">
              {t("engine.cta")}
            </a>
          </div>
          <div className="intel-stage-wrap">
            <SignalPoster hidden={ready} />
            {liveDesktop && Stream ? <Stream paused={!inView} onReady={() => setReady(true)} /> : null}
            <DeliverBoards />
          </div>
        </div>
      </div>

      <ol className="intel-fallback">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.id} className="intel-fallback__chapter">
            <p className="intel-fallback__index">{chapter.index}</p>
            <h2 className="hsw__title">{headline(chapter.step)}</h2>
            <p className="hsw__lede">{body(chapter.step)}</p>
            <div className="hsw__diagram hsw__diagram--fallback">
              {chapter.step === "a" ? <SignalChips layout="rows" /> : null}
              {chapter.step === "b" ? <IntelPanel /> : null}
              {chapter.step === "c" ? <OutcomeBoard /> : null}
              {chapter.step === "d" ? <DeliverBoards staticMode /> : null}
            </div>
          </li>
        ))}
        <li>
          <a className="intel-cta" href="#hero">
            {t("engine.cta")}
          </a>
        </li>
      </ol>
    </section>
  );
}
