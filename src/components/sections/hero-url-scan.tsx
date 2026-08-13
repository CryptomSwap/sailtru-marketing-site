"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useDiagnosticScanContext } from "@/components/diagnostics/diagnostic-scan-context";

export function HeroUrlScan() {
  const t = useTranslations("hero.urlScan");
  const scanContext = useDiagnosticScanContext();
  const reduceMotion = useReducedMotion() ?? false;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [url, setUrl] = useState("");

  const trackPointer = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (reduceMotion) return;
      const button = buttonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      button.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    [reduceMotion]
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    scanContext?.runScan(url);
  }

  return (
    <form className="hero-url-scan" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="hero-url-input">
        {t("label")}
      </label>
      <span className="hero-url-scan__globe" aria-hidden>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 12h16M12 4c2.4 2.6 3.6 5.4 3.6 8s-1.2 5.4-3.6 8c-2.4-2.6-3.6-5.4-3.6-8s1.2-5.4 3.6-8Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <input
        id="hero-url-input"
        className="hero-url-scan__input"
        type="text"
        inputMode="url"
        autoComplete="url"
        placeholder={t("placeholder")}
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <button
        ref={buttonRef}
        type="submit"
        className={`hero-cta hero-cta--primary hero-url-scan__button hero-url-scan__button--bloom${reduceMotion ? "" : " hero-url-scan__button--bloom-live"}`}
        onPointerEnter={trackPointer}
        onPointerMove={trackPointer}
      >
        <span className="hero-url-scan__button-label">{t("runScan")}</span>
      </button>
    </form>
  );
}
