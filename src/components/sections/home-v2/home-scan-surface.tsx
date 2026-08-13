"use client";

import type { ReactNode } from "react";
import { DiagnosticScanProvider } from "@/components/diagnostics/diagnostic-scan-context";

/** Shared scan context so hero URL form can drive the analysis stage below. */
export function HomeScanSurface({ children }: { children: ReactNode }) {
  return (
    <DiagnosticScanProvider>
      <div className="home-cobalt-field">
        <div className="home-cobalt-field__wash" aria-hidden />
        <div className="home-cobalt-field__grain" aria-hidden />
        {children}
      </div>
    </DiagnosticScanProvider>
  );
}
