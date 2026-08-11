"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useDiagnosticScanContext } from "@/components/diagnostics/diagnostic-scan-context";

export function HeroUrlScan() {
  const t = useTranslations("hero.urlScan");
  const scanContext = useDiagnosticScanContext();
  const [url, setUrl] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    scanContext?.runScan(url);
  }

  return (
    <form className="hero-url-scan" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="hero-url-input">
        {t("label")}
      </label>
      <input
        id="hero-url-input"
        className="hero-url-scan__input"
        type="url"
        inputMode="url"
        autoComplete="url"
        placeholder={t("placeholder")}
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <button type="submit" className="hero-cta hero-cta--primary hero-url-scan__button">
        {t("runScan")}
      </button>
    </form>
  );
}
