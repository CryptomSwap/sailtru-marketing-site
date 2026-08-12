"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  diagnosticTimeline,
  heroDiscoveryIds,
} from "@/components/diagnostics/diagnostic-content";
import { useDiagnosticScanContext } from "@/components/diagnostics/diagnostic-scan-context";

export type DiagnosticSequenceState = {
  websiteVisible: boolean;
  websiteSettled: boolean;
  scanActive: boolean;
  scanComplete: boolean;
  hudOpen: boolean;
  visibleMarkers: string[];
  visibleCards: string[];
  illuminatedMarker: string | null;
  sequenceComplete: boolean;
};

const allIds = [...heroDiscoveryIds];

const finalState: DiagnosticSequenceState = {
  websiteVisible: true,
  websiteSettled: true,
  scanActive: false,
  scanComplete: true,
  hudOpen: true,
  visibleMarkers: allIds,
  visibleCards: allIds,
  illuminatedMarker: null,
  sequenceComplete: true,
};

const initialState: DiagnosticSequenceState = {
  websiteVisible: false,
  websiteSettled: false,
  scanActive: false,
  scanComplete: false,
  hudOpen: false,
  visibleMarkers: [],
  visibleCards: [],
  illuminatedMarker: null,
  sequenceComplete: false,
};

const cycleResetState: DiagnosticSequenceState = {
  websiteVisible: true,
  websiteSettled: true,
  scanActive: false,
  scanComplete: false,
  hudOpen: false,
  visibleMarkers: [],
  visibleCards: [],
  illuminatedMarker: null,
  sequenceComplete: false,
};

const diagnosticsClearState: Partial<DiagnosticSequenceState> = {
  hudOpen: false,
  visibleMarkers: [],
  visibleCards: [],
  illuminatedMarker: null,
  sequenceComplete: false,
};

export function useDiagnosticSequence(): DiagnosticSequenceState & {
  cycle: number;
  showAltImage: boolean;
} {
  const reduceMotion = useReducedMotion();
  const scanContext = useDiagnosticScanContext();
  const externalGeneration = scanContext?.scanGeneration ?? 0;
  const [cycle, setCycle] = useState(0);
  const [showAltImage, setShowAltImage] = useState(false);
  const [state, setState] = useState<DiagnosticSequenceState>(
    reduceMotion ? finalState : initialState,
  );

  useEffect(() => {
    if (reduceMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        setState(cycle === 0 && externalGeneration === 0 ? initialState : cycleResetState);
      }, 0)
    );

    const t = diagnosticTimeline;

    const schedule = (delay: number, update: Partial<DiagnosticSequenceState>) => {
      timers.push(
        setTimeout(() => {
          setState((prev) => ({ ...prev, ...update }));
        }, delay),
      );
    };

    schedule(t.websiteIn, { websiteVisible: true });
    schedule(t.websiteIn + t.websiteDuration, { websiteSettled: true });
    schedule(t.scanDelay, { scanActive: true });

    const scanEnd = t.scanDelay + t.scanDuration;
    schedule(scanEnd, { scanActive: false, scanComplete: true });
    schedule(scanEnd + t.hudOpenLag, { hudOpen: true });

    const discoveryStart = scanEnd + t.hudOpenLag + t.hudRevealDuration;

    heroDiscoveryIds.forEach((id, index) => {
      const markerAt = discoveryStart + index * t.discoveryStagger;
      const visibleSoFar = heroDiscoveryIds.slice(0, index + 1);

      schedule(markerAt, {
        visibleMarkers: visibleSoFar,
        illuminatedMarker: id,
      });

      schedule(markerAt + t.cardLag, {
        illuminatedMarker: null,
        visibleCards: visibleSoFar,
      });
    });

    const lastMarkerAt = discoveryStart + (heroDiscoveryIds.length - 1) * t.discoveryStagger;
    const settleAt = lastMarkerAt + t.cardLag + t.settleLag;

    schedule(settleAt, { sequenceComplete: true, illuminatedMarker: null });

    const dissolveAt = settleAt + t.loopPause - t.dissolveDuration;
    const clearAt = dissolveAt - t.diagnosticsClearDuration;

    schedule(clearAt, diagnosticsClearState);

    timers.push(
      setTimeout(() => {
        setShowAltImage((prev) => !prev);
      }, dissolveAt),
    );

    timers.push(
      setTimeout(() => {
        setCycle((prev) => prev + 1);
      }, settleAt + t.loopPause),
    );

    return () => timers.forEach(clearTimeout);
  }, [reduceMotion, cycle, externalGeneration]);

  return {
    ...state,
    cycle,
    showAltImage,
  };
}
