"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeroUrlScan } from "@/components/sections/hero-url-scan";
import { HeroAnalysisVisual } from "@/components/sections/home-v2/hero-analysis-stage";
import { IntelPanel, SignalChips } from "@/components/sections/home-v2/how-sailtru-works-section";
import { useRouter } from "@/i18n/navigation";
import { isPublicHttpsUrl, normalizeToHttpsUrl } from "@/lib/url-safety";
import "@/components/sections/home-v2/how-sailtru-works.css";

const NORTHLINE_IMAGE = "/images/hero-panel-northline.jpg";

type Phase = "idle" | "scan" | "signals" | "intel" | "mockup";

/** How long each phase plays before advancing, in ms. The mockup phase is terminal. */
const PHASE_DURATION: Record<"scan" | "signals" | "intel", number> = {
  scan: 4400,
  signals: 4600,
  intel: 4800
};

const PHASE_TRANSITION = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };
const PHASE_ENTER = { opacity: 0, scale: 0.992 };
const PHASE_SHOW = { opacity: 1, scale: 1 };
const PHASE_EXIT = { opacity: 0, scale: 1.008 };

/**
 * The homepage hero's one animated sequence: URL field only, then — after Run scan —
 * scan → input signals → intelligence layer → the Northline-style mockup, last.
 */
export function HeroScanSequence({ className = "" }: { className?: string }) {
  const t = useTranslations("homeV2.howItWorks");
  const router = useRouter();
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

      const nextHost = normalizeToHttpsUrl(url)?.hostname;
      const goLogin = () => {
        router.push(nextHost ? { pathname: "/login", query: { host: nextHost } } : "/login");
      };

      if (reduceMotion) {
        goLogin();
        return;
      }

      setPhase("scan");
      const afterScan = PHASE_DURATION.scan;
      const afterSignals = afterScan + PHASE_DURATION.signals;
      const afterIntel = afterSignals + PHASE_DURATION.intel;

      timersRef.current.push(
        setTimeout(() => setPhase("signals"), afterScan),
        setTimeout(() => setPhase("intel"), afterSignals),
        setTimeout(goLogin, afterIntel)
      );
    },
    [reduceMotion, router]
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

  const caption =
    phase === "scan"
      ? t("sequence.scanning")
      : phase === "signals"
        ? t("sequence.signals")
        : phase === "intel"
          ? t("sequence.intel")
          : "";

  return (
    <div className={`hsw__diagram hsw__sequence ${className}`.trim()} aria-label={t("diagramAria")}>
      <div className="hsw__play">
        <div className="hsw__play-caption">
          <p className="hsw__phase-caption" data-on={caption ? "" : undefined} aria-live="polite">
            {caption}
          </p>
        </div>
        <div className="hsw__play-visual">
      <AnimatePresence mode="popLayout">
        {phase === "idle" ? (
          <motion.div
            key="idle"
            className="hsw__scan-stage hsw__scan-stage--idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={PHASE_TRANSITION}
          >
            <div className="field-scan field-scan--ref">
              <HeroUrlScan onRunScan={runScan} />
            </div>
          </motion.div>
        ) : null}

        {phase === "scan" ? (
          <motion.div
            key="scan"
            className="hsw__scan-stage"
            initial={PHASE_ENTER}
            animate={PHASE_SHOW}
            exit={PHASE_EXIT}
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
            initial={PHASE_ENTER}
            animate={PHASE_SHOW}
            exit={PHASE_EXIT}
            transition={PHASE_TRANSITION}
          >
            <SignalChips stagger layout="rows" />
          </motion.div>
        ) : null}

        {phase === "intel" ? (
          <motion.div
            key="intel"
            className="hsw__scan-stage"
            initial={PHASE_ENTER}
            animate={PHASE_SHOW}
            exit={PHASE_EXIT}
            transition={PHASE_TRANSITION}
          >
            <IntelPanel stagger />
          </motion.div>
        ) : null}

        {phase === "mockup" ? (
          <motion.div
            key="mockup"
            className="hsw__scan-stage"
            initial={PHASE_ENTER}
            animate={PHASE_SHOW}
            exit={PHASE_EXIT}
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
      </div>
    </div>
  );
}
