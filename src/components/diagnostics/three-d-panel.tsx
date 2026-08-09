"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ThreeDPanelProps } from "@/components/diagnostics/types";
import { diagnosticTimeline } from "@/components/diagnostics/diagnostic-content";
import "./three-d-panel.css";

const MAX_CURSOR_TILT = 3;
const DEFAULT_BASE_X = 5.5;
const DEFAULT_BASE_Y = -7;

export function ThreeDPanel({
  children,
  chrome,
  markers = [],
  insightCards = [],
  className = "",
  presentation = "layered",
  baseRotateX = DEFAULT_BASE_X,
  baseRotateY = DEFAULT_BASE_Y,
  sequence,
  scale = 1,
  overlayScale = 1,
}: ThreeDPanelProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const t = useTranslations("diagnostics");
  const [cursorTilt, setCursorTilt] = useState({ x: 0, y: 0 });
  const isComposite = presentation === "composite";

  const websiteVisible = sequence?.websiteVisible ?? true;
  const websiteSettled = sequence?.websiteSettled ?? true;
  const scanActive = sequence?.scanActive ?? !reduceMotion;
  const scanComplete = sequence?.scanComplete ?? !!reduceMotion;
  const hudOpen = sequence?.hudOpen ?? !!reduceMotion;
  const visibleMarkerIds = sequence?.visibleMarkerIds ?? markers.map((m) => m.id);
  const visibleCardIds = sequence?.visibleCardIds ?? insightCards.map((c) => c.id);
  const illuminatedMarkerId = sequence?.illuminatedMarkerId ?? null;
  const sequenceComplete = sequence?.sequenceComplete ?? !!reduceMotion;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const bounds = sceneRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const px = (event.clientX - bounds.left) / bounds.width - 0.5;
      const py = (event.clientY - bounds.top) / bounds.height - 0.5;

      setCursorTilt({
        x: -py * MAX_CURSOR_TILT * 2,
        y: px * MAX_CURSOR_TILT * 2,
      });
    },
    [reduceMotion],
  );

  const handlePointerLeave = useCallback(() => {
    setCursorTilt({ x: 0, y: 0 });
  }, []);

  const cameraRotateX = baseRotateX + cursorTilt.x;
  const cameraRotateY = baseRotateY + cursorTilt.y;

  const scanLoop = !sequence && !reduceMotion;
  const scanClass = scanActive || scanLoop ? "three-d-scan-beam--active" : "";
  const scanGlowClass = scanActive || scanLoop ? "three-d-scan-glow--active" : "";
  const scanOnceClass = scanActive && !scanLoop ? "three-d-scan-beam--once" : "";
  const scanGlowOnceClass = scanActive && !scanLoop ? "three-d-scan-glow--once" : "";
  const scanReflectionClass =
    scanActive || scanLoop ? "three-d-scan-reflection--active" : "";
  const scanReflectionOnceClass =
    scanActive && !scanLoop ? "three-d-scan-reflection--once" : "";
  const scanTrailClass = scanActive || scanLoop ? "three-d-scan-trail--active" : "";
  const scanTrailOnceClass = scanActive && !scanLoop ? "three-d-scan-trail--once" : "";

  const scanLayers = (
    <div
      className={`three-d-layer three-d-layer--scan three-d-layer--scan-full ${
        scanComplete ? "three-d-layer--scan-settled" : ""
      } ${scanActive ? "three-d-layer--scan-live" : ""}`}
    >
      <div className="three-d-scan-grid" aria-hidden />
      <div
        className={`three-d-scan-reflection ${scanReflectionClass} ${scanReflectionOnceClass}`}
      />
      <div className={`three-d-scan-glow ${scanGlowClass} ${scanGlowOnceClass}`} />
      <div className={`three-d-scan-bloom ${scanGlowClass} ${scanGlowOnceClass}`} />
      <div className={`three-d-scan-trail ${scanTrailClass} ${scanTrailOnceClass}`} />
      <div className={`three-d-scan-beam ${scanClass} ${scanOnceClass}`} />
      <div className={`three-d-scan-beam three-d-scan-beam--core ${scanClass} ${scanOnceClass}`} />
    </div>
  );

  const hudLayer = isComposite && (
    <motion.div
      className="three-d-hud"
      initial={false}
      animate={{
        opacity: hudOpen ? 1 : 0,
        scale: hudOpen ? 1 : 0.985,
      }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      <div className="three-d-hud__vignette" />
      <div className="three-d-hud__frame">
        <span className="three-d-hud__corner three-d-hud__corner--tl" />
        <span className="three-d-hud__corner three-d-hud__corner--tr" />
        <span className="three-d-hud__corner three-d-hud__corner--bl" />
        <span className="three-d-hud__corner three-d-hud__corner--br" />
      </div>
      <div className="three-d-hud__header">
        <span className="three-d-hud__status">
          <span className="three-d-hud__status-dot" />
          {t("hudStatus")}
        </span>
        <span className="three-d-hud__label">{t("hudLabel")}</span>
        <span className="three-d-hud__count">{t("hudSignals", { count: markers.length })}</span>
      </div>
      <div className="three-d-hud__rail" aria-hidden />
    </motion.div>
  );

  const markerLayer = markers.length > 0 && hudOpen && (
    <div className="three-d-layer three-d-layer--markers three-d-layer--markers-full">
      {markers.map((marker) => {
        const isVisible = visibleMarkerIds.includes(marker.id);
        const isIlluminated = illuminatedMarkerId === marker.id;
        const zoneW = marker.zoneWidth ?? 18;
        const zoneH = marker.zoneHeight ?? 14;
        return (
          <motion.div
            key={marker.id}
            className="three-d-marker-anchor"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.85,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={`three-d-zone ${isIlluminated ? "three-d-zone--active" : ""}`}
              style={{
                width: `${zoneW}%`,
                height: `${zoneH}%`,
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{
                opacity: isVisible ? (isIlluminated ? 1 : 0.7) : 0,
                scale: isVisible ? 1 : 0.88,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="three-d-zone__corner three-d-zone__corner--tl" />
              <span className="three-d-zone__corner three-d-zone__corner--tr" />
              <span className="three-d-zone__corner three-d-zone__corner--bl" />
              <span className="three-d-zone__corner three-d-zone__corner--br" />
            </motion.div>
            <motion.span
              className={`three-d-marker ${
                marker.pulse && sequenceComplete ? "three-d-marker--pulse" : ""
              } ${isIlluminated ? "three-d-marker--illuminated" : ""}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? (isIlluminated ? 1.15 : 1) : 0.4,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        );
      })}
    </div>
  );

  const insightLayer = hudOpen
    ? insightCards.map((card) => {
        const isVisible = visibleCardIds.includes(card.id);
        const isLatest =
          visibleCardIds.length > 0 && visibleCardIds[visibleCardIds.length - 1] === card.id;
        return (
          <div
            key={card.id}
            className="three-d-insight-anchor"
            style={{
              left: `${50 + card.offsetX}%`,
              top: `${50 + card.offsetY}%`,
              transform: `translate(-50%, -50%) translateZ(${card.depth ?? 72}px) rotateX(${-baseRotateX * 0.35}deg) rotateY(${baseRotateY * 0.2}deg) scale(${overlayScale})`,
            }}
          >
            <motion.div
              className={`three-d-insight three-d-insight--readout ${
                card.severity ? `three-d-insight--${card.severity}` : ""
              } ${isLatest && !sequenceComplete ? "three-d-insight--pop" : ""}`}
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 14,
                scale: isVisible ? 1 : 0.92,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="three-d-insight__header">
                <p className="three-d-insight__eyebrow">{card.eyebrow}</p>
                {card.severity ? (
                  <span className="three-d-insight__severity">
                    {t(`severity.${card.severity}`)}
                  </span>
                ) : null}
              </div>
              <p className="three-d-insight__title">{card.title}</p>
              {card.body ? <p className="three-d-insight__body">{card.body}</p> : null}
            </motion.div>
          </div>
        );
      })
    : null;

  return (
    <div
      ref={sceneRef}
      className={`three-d-scene ${isComposite ? "three-d-scene--composite three-d-scene--hero" : ""} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden
      style={
        {
          "--panel-scale": scale,
          "--overlay-scale": overlayScale,
          "--scan-duration": `${diagnosticTimeline.scanDuration}ms`,
          "--signal-count": markers.length,
        } as React.CSSProperties
      }
    >
      <div
        className="three-d-camera"
        style={{
          transform: `rotateX(${cameraRotateX}deg) rotateY(${cameraRotateY}deg)`,
        }}
      >
        <div className="three-d-rig">
          <motion.div
            className="three-d-device"
            style={{
              transform: `rotateX(${baseRotateX * 0.15}deg) rotateY(${baseRotateY * -0.12}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{
              opacity: websiteVisible ? 1 : 0,
              scale: websiteVisible ? (websiteSettled ? 1 : 0.985) : 0.97,
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`three-d-viewport-spacer ${isComposite ? "three-d-viewport-spacer--composite" : ""}`}
            >
              <div className="three-d-viewport-body">
                {isComposite ? (
                  <div
                    className={`three-d-composite ${scanActive ? "three-d-composite--scanning" : ""} ${hudOpen ? "three-d-composite--hud" : ""}`}
                  >
                    <div className="three-d-composite__asset">{children}</div>
                    <div className="three-d-composite__reticle" aria-hidden />
                    {scanLayers}
                    {hudLayer}
                    {markerLayer}
                  </div>
                ) : (
                  <div className="three-d-device__bezel">
                    <div className="three-d-layer three-d-layer--chrome">
                      <div className="three-d-layer--chrome-dots" aria-hidden>
                        <span />
                        <span />
                        <span />
                      </div>
                      <span>{chrome?.url ?? t("chromeUrl")}</span>
                      <span>{chrome?.signalLabel ?? t("chromeSignalLabel")}</span>
                    </div>

                    <div className="three-d-layer three-d-layer--preview">
                      <div className="three-d-layer--preview-inner">{children}</div>
                    </div>

                    <div className="three-d-layer three-d-layer--scan">
                      <div className={`three-d-scan-glow ${scanGlowClass}`} />
                      <div className={`three-d-scan-beam ${scanClass}`} />
                    </div>

                    {markerLayer}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {insightLayer}
        </div>
      </div>
    </div>
  );
}
