"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useLayoutEffect, useRef, useState, Fragment } from "react";
import { HeroAnalysisStage } from "@/components/sections/home-v2/hero-analysis-stage";
import "@/components/sections/home-v2/how-sailtru-works.css";

type Signal = {
  id: string;
  label: string;
  kind: "major" | "minor";
};

type Outcome = {
  id: string;
  title: string;
  body: string;
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

const OUTCOMES: Outcome[] = [
  {
    id: "found",
    title: "GET FOUND",
    body: "AI visibility across ChatGPT, Google, and Perplexity."
  },
  {
    id: "ahead",
    title: "GET AHEAD",
    body: "Competitor, website, positioning, and conversion intelligence."
  },
  {
    id: "automate",
    title: "AUTOMATE",
    body: "Reduce manual work with AI workflows and automation."
  },
  {
    id: "build",
    title: "BUILD",
    body: "Custom AI agents, tools, integrations, and software."
  }
];

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
          <path
            d="M4 16 9 10l4 3 7-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "automate":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hsw-out__icon">
          <path
            d="M13 3 5 13h6l-1 8 9-12h-6l0-6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hsw-out__icon">
          <path
            d="M12 4 5 8v8l7 4 7-4V8l-7-4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12 12 5 8m7 4 7-4M12 12v8" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

type Pt = { x: number; y: number };

type WireLayout = {
  width: number;
  height: number;
  inPaths: string[];
  outPaths: string[];
  inStarts: Pt[];
  outEnds: Pt[];
  hubIn: Pt | null;
  hubOut: Pt | null;
};

function curveDown(from: Pt, to: Pt): string {
  const midY = from.y + (to.y - from.y) * 0.55;
  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${from.x.toFixed(1)} ${midY.toFixed(1)}, ${to.x.toFixed(1)} ${midY.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

function measureWires(root: HTMLElement): WireLayout | null {
  const rootBox = root.getBoundingClientRect();
  const width = root.clientWidth;
  const height = root.clientHeight;
  if (width < 40 || height < 40) return null;

  const signals = Array.from(root.querySelectorAll<HTMLElement>("[data-hsw='signal']"));
  const intel = root.querySelector<HTMLElement>("[data-hsw='intel']");
  const outcomes = Array.from(root.querySelectorAll<HTMLElement>("[data-hsw='outcome']"));
  if (!intel || signals.length === 0 || outcomes.length === 0) return null;

  const rel = (el: HTMLElement) => {
    const b = el.getBoundingClientRect();
    return {
      cx: b.left - rootBox.left + b.width / 2,
      bottom: b.bottom - rootBox.top,
      topY: b.top - rootBox.top,
      width: b.width,
      height: b.height
    };
  };

  const intelBox = rel(intel);
  const hubInY = intelBox.topY;
  const hubOutY = intelBox.topY + intelBox.height;

  const inTargets = signals.map((_, i) => {
    const t = signals.length === 1 ? 0.5 : i / (signals.length - 1);
    const spread = Math.min(intelBox.width * 0.72, width * 0.7);
    return {
      x: intelBox.cx - spread / 2 + spread * t,
      y: hubInY
    };
  });

  const inStarts = signals.map((el) => {
    const b = rel(el);
    return { x: b.cx, y: b.bottom };
  });

  const inPaths = inStarts.map((start, i) => curveDown(start, inTargets[i]!));

  const outEnds = outcomes.map((el) => {
    const b = rel(el);
    return { x: b.cx, y: b.topY };
  });

  const outPaths = outEnds.map((end, i) => {
    const t = outcomes.length === 1 ? 0.5 : i / (outcomes.length - 1);
    const spread = Math.min(intelBox.width * 0.78, width * 0.75);
    const from: Pt = {
      x: intelBox.cx - spread / 2 + spread * t,
      y: hubOutY
    };
    return curveDown(from, end);
  });

  return {
    width,
    height,
    inPaths,
    outPaths,
    inStarts,
    outEnds,
    hubIn: { x: intelBox.cx, y: hubInY },
    hubOut: { x: intelBox.cx, y: hubOutY }
  };
}

function PowerLines({
  layout,
  reduceMotion
}: {
  layout: WireLayout | null;
  reduceMotion: boolean;
}) {
  if (!layout || layout.inPaths.length === 0) {
    return <svg className="hsw-wires" aria-hidden />;
  }

  const pulses = reduceMotion
    ? []
    : [
        ...layout.inPaths.map((path, i) => ({
          path,
          dur: `${2.7 + (i % 3) * 0.2}s`,
          delay: `${(i * 0.18).toFixed(2)}s`
        })),
        ...layout.outPaths.map((path, i) => ({
          path,
          dur: `${2.9 + (i % 2) * 0.25}s`,
          delay: `${(0.2 + i * 0.28).toFixed(2)}s`
        }))
      ];

  return (
    <svg
      className="hsw-wires"
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      width={layout.width}
      height={layout.height}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id="hswGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {layout.inPaths.map((d, i) => (
        <path key={`in-b-${i}`} className="hsw-wires__base" d={d} />
      ))}
      {layout.inPaths.map((d, i) => (
        <path key={`in-f-${i}`} className="hsw-wires__flow" d={d} />
      ))}

      {layout.outPaths.map((d, i) => (
        <path key={`out-b-${i}`} className="hsw-wires__base" d={d} />
      ))}
      {layout.outPaths.map((d, i) => (
        <path key={`out-f-${i}`} className="hsw-wires__flow" d={d} />
      ))}

      {pulses.map((pulse, index) => (
        <circle key={`p-${index}`} r="2.5" className="hsw-wires__pulse" filter="url(#hswGlow)">
          <animateMotion
            dur={pulse.dur}
            begin={pulse.delay}
            repeatCount="indefinite"
            path={pulse.path}
          />
        </circle>
      ))}
    </svg>
  );
}

/**
 * Signals → intelligence → outcomes diagram (power lines + glass cards).
 * Used in the hero ATF after the visual swap with the analysis stage.
 */
export function HowSailtruWorksDiagram({ className = "" }: { className?: string }) {
  const t = useTranslations("homeV2.howItWorks");
  const reduceMotion = useReducedMotion() ?? false;
  const diagramRef = useRef<HTMLDivElement | null>(null);
  const [wireLayout, setWireLayout] = useState<WireLayout | null>(null);

  const refreshWires = useCallback(() => {
    const root = diagramRef.current;
    if (!root) return;
    setWireLayout(measureWires(root));
  }, []);

  useLayoutEffect(() => {
    const root = diagramRef.current;
    if (!root) return;

    let raf = 0;
    const schedule = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        refreshWires();
        raf = window.requestAnimationFrame(() => refreshWires());
      });
    };

    schedule();

    const ro = new ResizeObserver(() => schedule());
    ro.observe(root);
    for (const el of root.querySelectorAll("[data-hsw]")) {
      ro.observe(el);
    }

    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      void fontsReady.then(() => schedule());
    }

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, [refreshWires]);

  return (
    <div
      ref={diagramRef}
      className={`hsw__diagram ${className}`.trim()}
      aria-label={t("diagramAria")}
    >
      <PowerLines layout={wireLayout} reduceMotion={reduceMotion} />

      <div className="hsw__band">
        <span className="hsw__band-line" aria-hidden />
        <p className="hsw__band-label">{t("inputsLabel")}</p>
        <span className="hsw__band-line" aria-hidden />
      </div>

      <ul className="hsw__signals">
        {SIGNALS.map((signal) => (
          <li
            key={signal.id}
            data-hsw="signal"
            className={`hsw-chip hsw-chip--${signal.kind} hsw-chip--${signal.id}`}
          >
            <SignalMark id={signal.id} />
            <span>{t(`signals.${signal.id}`)}</span>
          </li>
        ))}
      </ul>

      <div data-hsw="intel" className={`hsw-intel ${reduceMotion ? "" : "hsw-intel--live"}`}>
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

      <ul className="hsw__outcomes">
        {OUTCOMES.map((outcome, index) => (
          <li
            key={outcome.id}
            data-hsw="outcome"
            className={`hsw-out hsw-out--${outcome.id}`}
            style={{ ["--out-i" as string]: index }}
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
  );
}

/**
 * Second homepage section — narrative + customer-site analysis stage.
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
