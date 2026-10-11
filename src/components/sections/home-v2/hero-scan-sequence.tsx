"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeroUrlScan } from "@/components/sections/hero-url-scan";
import { HeroAnalysisVisual } from "@/components/sections/home-v2/hero-analysis-stage";
import { IntelPanel, SignalChips } from "@/components/sections/home-v2/how-sailtru-works-section";
import { isPublicHttpsUrl, normalizeToHttpsUrl } from "@/lib/url-safety";
import "@/components/sections/home-v2/how-sailtru-works.css";

const NORTHLINE_IMAGE = "/images/hero-panel-northline.jpg";

type Phase = "idle" | "scan" | "signals" | "intel" | "mockup";

/** How long each phase plays before advancing, in ms. The mockup phase is terminal. */
const PHASE_DURATION: Record<"scan" | "signals" | "intel", number> = {
  scan: 1800,
  signals: 1700,
  intel: 2400
};

const PHASE_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/**
 * The homepage hero's one animated sequence: URL field only, then — after Run scan —
 * scan → input signals → intelligence layer → the Northline-style mockup, last.
 */
export function HeroScanSequence({ className = "" }: { className?: string }) {
  const t = useTranslations("homeV2.howItWorks");
  const reduceMotion = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<Phase>("idle");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [previewFailed, setPreviewFailed] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const runScan = useCallback(
    (url: string) => {
      if (!url.trim()) return;

      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      setSubmittedUrl(url);
      setPreviewFailed(false);

      if (reduceMotion) {
        setPhase("mockup");
        return;
      }

      setPhase("scan");
      const afterScan = PHASE_DURATION.scan;
      const afterSignals = afterScan + PHASE_DURATION.signals;
      const afterIntel = afterSignals + PHASE_DURATION.intel;

      timersRef.current.push(
        setTimeout(() => setPhase("signals"), afterScan),
        setTimeout(() => setPhase("intel"), afterSignals),
        setTimeout(() => setPhase("mockup"), afterIntel)
      );
    },
    [reduceMotion]
  );

  const target = useMemo(() => normalizeToHttpsUrl(submittedUrl), [submittedUrl]);
  const canCapture = Boolean(target && isPublicHttpsUrl(target));
  const previewSrc =
    canCapture && !previewFailed && target
      ? `/api/site-preview?url=${encodeURIComponent(target.toString())}`
      : NORTHLINE_IMAGE;

  // Warm the browser cache as soon as the target is known, so the mockup phase
  // doesn't stall on a capture request that could take a few seconds.
  useEffect(() => {
    if (phase === "idle" || !canCapture) return;
    const preload = new window.Image();
    preload.src = previewSrc;
  }, [phase, canCapture, previewSrc]);

  const handleImageError = useCallback(() => setPreviewFailed(true), []);

  return (
    <div className={`hsw__diagram hsw__sequence ${className}`.trim()} aria-label={t("diagramAria")}>
      <p className="sr-only" aria-live="polite">
        {phase === "scan" && t("sequence.scanning")}
        {phase === "signals" && t("sequence.signals")}
        {phase === "intel" && t("sequence.intel")}
        {phase === "mockup" && t("sequence.ready")}
      </p>

      <AnimatePresence mode="wait">
        {phase === "idle" ? (
          <motion.div
            key="idle"
            className="hsw__scan-stage hsw__scan-stage--idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={PHASE_TRANSITION}
          >
            <HeroUrlScan onRunScan={runScan} />
          </motion.div>
        ) : null}

        {phase === "scan" ? (
          <motion.div
            key="scan"
            className="hsw__scan-stage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={PHASE_TRANSITION}
          >
            <HeroAnalysisVisual
              imageSrc={previewSrc}
              chromeUrl={target?.hostname}
              scanActive
              websiteVisible
              websiteSettled={false}
              scanComplete={false}
              visibleCardIds={new Set()}
              onImageError={handleImageError}
            />
          </motion.div>
        ) : null}

        {phase === "signals" ? (
          <motion.div
            key="signals"
            className="hsw__scan-stage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={PHASE_TRANSITION}
          >
            <SignalChips />
          </motion.div>
        ) : null}

        {phase === "intel" ? (
          <motion.div
            key="intel"
            className="hsw__scan-stage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={PHASE_TRANSITION}
          >
            <IntelPanel />
          </motion.div>
        ) : null}

        {phase === "mockup" ? (
          <motion.div
            key="mockup"
            className="hsw__scan-stage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={PHASE_TRANSITION}
          >
            <HeroAnalysisVisual
              imageSrc={previewSrc}
              chromeUrl={target?.hostname}
              scanActive={false}
              websiteVisible
              websiteSettled
              scanComplete
              visibleCardIds="all"
              onImageError={handleImageError}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
