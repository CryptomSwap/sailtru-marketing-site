"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { diagnosticTimeline } from "@/components/diagnostics/diagnostic-content";
import { useDiagnosticSequence } from "@/components/diagnostics/use-diagnostic-sequence";
import "@/components/sections/home-v2/hero-analysis.css";

type AnalysisCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  severity: string;
};

/** Pin geometry: hotspot on the 2D screen → straight stem out → floating card. */
type FindingLayout = {
  className: string;
  code: string;
  category: string;
  ox: string;
  oy: string;
  stemAngle: string;
  stemLen: string;
  depth: string;
};

const FINDING_LAYOUT: Record<string, FindingLayout> = {
  visibility: {
    className: "hero-analysis__finding--visibility",
    code: "AI-VIS",
    category: "DISCOVERY",
    ox: "52%",
    oy: "20%",
    stemAngle: "-22deg",
    stemLen: "8.75rem",
    depth: "86px"
  },
  lcp: {
    className: "hero-analysis__finding--perf",
    code: "PERF-LCP",
    category: "PERFORMANCE",
    ox: "68%",
    oy: "38%",
    stemAngle: "6deg",
    stemLen: "7.75rem",
    depth: "78px"
  },
  conversion: {
    className: "hero-analysis__finding--conversion",
    code: "CONV-FLOW",
    category: "CONVERSION",
    ox: "60%",
    oy: "60%",
    stemAngle: "16deg",
    stemLen: "9.25rem",
    depth: "92px"
  },
  assets: {
    className: "hero-analysis__finding--technical",
    code: "ASSET-JS",
    category: "TECHNICAL",
    ox: "44%",
    oy: "80%",
    stemAngle: "38deg",
    stemLen: "7.5rem",
    depth: "74px"
  },
  ttfb: {
    className: "hero-analysis__finding--speed",
    code: "NET-TTFB",
    category: "SPEED",
    ox: "30%",
    oy: "70%",
    stemAngle: "-150deg",
    stemLen: "8.25rem",
    depth: "80px"
  },
  trust: {
    className: "hero-analysis__finding--trust",
    code: "TRUST",
    category: "TRUST",
    ox: "34%",
    oy: "42%",
    stemAngle: "-132deg",
    stemLen: "7.5rem",
    depth: "70px"
  }
};

const PREFERRED_ORDER = ["visibility", "lcp", "conversion", "assets", "ttfb", "trust"];
const MAX_CURSOR_TILT = 5.5;
const BASE_ROTATE_X = 5.2;
const BASE_ROTATE_Y = -9.5;

function CardIcon({ id }: { id: string }) {
  switch (id) {
    case "lcp":
    case "ttfb":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hero-analysis__icon">
          <path
            d="M3 17h3v-5H3v5Zm5 0h3V7H8v10Zm5 0h3v-8h-3v8Zm5 0h3V4h-3v13Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      );
    case "assets":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hero-analysis__icon">
          <path
            d="M8.5 6.5 4 12l4.5 5.5M15.5 6.5 20 12l-4.5 5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "conversion":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hero-analysis__icon">
          <circle cx="7" cy="12" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="7" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="17" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9.2 11.2 14.8 8.2M9.2 12.8 14.8 15.8" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="hero-analysis__icon">
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <path d="M12 5v2.2M12 16.8V19M5 12h2.2M16.8 12H19" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

export type HeroAnalysisVisualProps = {
  imageSrc: string;
  /** Hostname shown in the fake browser chrome bar; falls back to the translated default. */
  chromeUrl?: string;
  scanActive: boolean;
  websiteVisible: boolean;
  websiteSettled: boolean;
  scanComplete: boolean;
  /** "all" reveals every finding card at once; a set reveals only those ids. */
  visibleCardIds: Set<string> | "all";
  onImageError?: () => void;
};

/**
 * Presentational device mockup — the website canvas, scan beam, and finding cards.
 * Driven by props so both the looping example below the fold and the hero's
 * one-shot scan sequence can reuse the exact same visual.
 */
export function HeroAnalysisVisual({
  imageSrc,
  chromeUrl,
  scanActive,
  websiteVisible,
  websiteSettled,
  scanComplete,
  visibleCardIds,
  onImageError
}: HeroAnalysisVisualProps) {
  const t = useTranslations("diagnostics");
  const sceneRef = useRef<HTMLElement>(null);
  const [cursorTilt, setCursorTilt] = useState({ x: 0, y: 0 });

  const cards = useMemo(() => {
    const raw = (t.raw("cards") as AnalysisCard[]) ?? [];
    const byId = new Map(raw.map((card) => [card.id, card]));
    const ordered: AnalysisCard[] = [];
    for (const id of PREFERRED_ORDER) {
      const card = byId.get(id);
      if (card) ordered.push(card);
    }
    for (const card of raw) {
      if (!ordered.some((c) => c.id === card.id)) ordered.push(card);
    }
    return ordered.slice(0, 5);
  }, [t]);

  const reduceMotion = useReducedMotion();

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const bounds = sceneRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const px = (event.clientX - bounds.left) / bounds.width - 0.5;
      const py = (event.clientY - bounds.top) / bounds.height - 0.5;
      setCursorTilt({
        x: -py * MAX_CURSOR_TILT * 2,
        y: px * MAX_CURSOR_TILT * 2
      });
    },
    [reduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    setCursorTilt({ x: 0, y: 0 });
  }, []);

  const cameraRotateX = BASE_ROTATE_X + cursorTilt.x;
  const cameraRotateY = BASE_ROTATE_Y + cursorTilt.y;

  const resolvedCardIds =
    visibleCardIds === "all" ? new Set(cards.map((card) => card.id)) : visibleCardIds;

  return (
    <aside
      ref={sceneRef}
      className="hero-analysis"
      aria-label={t("hudLabel")}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        {
          "--scan-duration": `${diagnosticTimeline.scanDuration}ms`
        } as React.CSSProperties
      }
    >
      <div className="hero-analysis__bloom" aria-hidden />

      <div className="hero-analysis__perspective">
        <div
          className="hero-analysis__camera"
          style={{
            transform: `rotateX(${cameraRotateX}deg) rotateY(${cameraRotateY}deg)`
          }}
        >
          <div className="hero-analysis__depth hero-analysis__depth--back" aria-hidden />
          <div className="hero-analysis__depth hero-analysis__depth--mid" aria-hidden />

          <div
            className={`hero-analysis__device ${websiteVisible ? "hero-analysis__device--visible" : ""}`}
          >
            <div className="hero-analysis__rim" aria-hidden />
            <div className="hero-analysis__rim hero-analysis__rim--inner" aria-hidden />

            <div
              className={`hero-analysis__canvas ${scanActive ? "hero-analysis__canvas--scanning" : ""} ${
                websiteSettled ? "hero-analysis__canvas--settled" : ""
              }`}
            >
              <div className="hero-analysis__glass" aria-hidden />
              <div className="hero-analysis__chrome">
                <span className="hero-analysis__dot" />
                <span className="hero-analysis__dot" />
                <span className="hero-analysis__dot" />
                <span className="hero-analysis__chrome-url">{chromeUrl ?? t("chromeUrl")}</span>
              </div>
              <div className="hero-analysis__viewport">
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 900px) 92vw, 58vw"
                  className="hero-analysis__image"
                  onError={onImageError}
                  unoptimized={imageSrc.startsWith("/api/")}
                />
                <div className="hero-analysis__reticle" aria-hidden />
                <div className="hero-analysis__vignette" aria-hidden />

                <div
                  className={`hero-analysis__scan ${scanComplete ? "hero-analysis__scan--settled" : ""}`}
                  aria-hidden
                >
                  <div className="hero-analysis__scan-grid" />
                  <div
                    className={`hero-analysis__scan-glow ${scanActive ? "hero-analysis__scan-glow--active" : ""}`}
                  />
                  <div
                    className={`hero-analysis__scan-trail ${scanActive ? "hero-analysis__scan-trail--active" : ""}`}
                  />
                  <div
                    className={`hero-analysis__scan-beam ${scanActive ? "hero-analysis__scan-beam--active" : ""}`}
                  />
                  <div
                    className={`hero-analysis__scan-beam hero-analysis__scan-beam--core ${
                      scanActive ? "hero-analysis__scan-beam--active" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <ul className="hero-analysis__findings">
            {cards.map((card, index) => {
              const layout = FINDING_LAYOUT[card.id] ?? FINDING_LAYOUT.visibility;
              const isVisible = resolvedCardIds.has(card.id);
              return (
                <li
                  key={card.id}
                  className={`hero-analysis__finding ${layout.className} ${
                    isVisible ? "hero-analysis__finding--visible" : ""
                  }`}
                  style={
                    {
                      "--ox": layout.ox,
                      "--oy": layout.oy,
                      "--stem-angle": layout.stemAngle,
                      "--stem-len": layout.stemLen,
                      "--depth": layout.depth,
                      "--expand-delay": `${index * 0.09}s`
                    } as React.CSSProperties
                  }
                >
                  <span className="hero-analysis__hotspot" aria-hidden />
                  <span className="hero-analysis__stem" aria-hidden />
                  <article className="hero-analysis__card">
                    <div className="hero-analysis__card-meta">
                      <span className="hero-analysis__card-code">{layout.code}</span>
                      <span className="hero-analysis__card-category">{layout.category}</span>
                    </div>
                    <div className="hero-analysis__card-top">
                      <span className="hero-analysis__icon-wrap">
                        <CardIcon id={card.id} />
                      </span>
                      <span className="hero-analysis__card-label">{card.eyebrow}</span>
                    </div>
                    <p className="hero-analysis__card-title">{card.title}</p>
                    <p className="hero-analysis__card-body">{card.body}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

/**
 * Looping illustrative example used below the hero's own real sequence —
 * always the Northline sample, captioned as an example, not a scan of the visitor's site.
 */
export function HeroAnalysisStage() {
  const tPreview = useTranslations("preview");
  const sequence = useDiagnosticSequence();
  const reduceMotion = useReducedMotion() ?? false;

  const imageSrc =
    tPreview("mode") === "mock" ? "/images/hero-panel-northline.jpg" : tPreview("primary");

  return (
    <HeroAnalysisVisual
      imageSrc={imageSrc}
      scanActive={sequence.scanActive && !reduceMotion}
      websiteVisible={sequence.websiteVisible}
      websiteSettled={sequence.websiteSettled || sequence.sequenceComplete}
      scanComplete={sequence.scanComplete}
      visibleCardIds={reduceMotion ? "all" : new Set(sequence.visibleCards)}
    />
  );
}
