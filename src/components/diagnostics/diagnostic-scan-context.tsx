"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type DiagnosticScanContextValue = {
  scanUrl: string;
  scanGeneration: number;
  runScan: (url: string) => void;
};

const DiagnosticScanContext = createContext<DiagnosticScanContextValue | null>(null);

export function DiagnosticScanProvider({ children }: { children: ReactNode }) {
  const [scanUrl, setScanUrl] = useState("");
  const [scanGeneration, setScanGeneration] = useState(0);

  const runScan = useCallback((url: string) => {
    const trimmed = url.trim();
    setScanUrl(trimmed);
    setScanGeneration((value) => value + 1);
  }, []);

  const value = useMemo(
    () => ({ scanUrl, scanGeneration, runScan }),
    [scanUrl, scanGeneration, runScan]
  );

  return <DiagnosticScanContext.Provider value={value}>{children}</DiagnosticScanContext.Provider>;
}

export function useDiagnosticScanContext(): DiagnosticScanContextValue | null {
  return useContext(DiagnosticScanContext);
}
