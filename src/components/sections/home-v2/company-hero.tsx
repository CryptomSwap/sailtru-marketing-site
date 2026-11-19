"use client";

import { useState, type KeyboardEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";
import { Link } from "@/i18n/navigation";
import { ServicePreview } from "./service-preview";
import { HeroDotField } from "./hero-dot-field";
import { HeroScanSequence } from "./hero-scan-sequence";
import "./home-v2.css";
import "./field-hero-ref.css";
import "./company-hero.css";

const services = ["analysis", "solutions", "studio"] as const;
type Service = typeof services[number];

export function CompanyHero() {
  const t = useTranslations("companyHero");
  const common = useTranslations("common");
  const rtl = useLocale() === "he";
  const [active, setActive] = useState<Service>("analysis");

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = {
      ArrowRight: index + (rtl ? -1 : 1),
      ArrowLeft: index + (rtl ? 1 : -1),
      Home: 0,
      End: services.length - 1
    }[event.key as "ArrowRight" | "ArrowLeft" | "Home" | "End"];
    if (next === undefined) return;
    event.preventDefault();
    const service = services[(next + services.length) % services.length];
    setActive(service);
    document.getElementById(`tab-${service}`)?.focus();
  }

  return (
    <section id="hero" className="field-hero field-hero--ref company-hero">
      <a className="sr-only focus:not-sr-only" href="#observe">{common("skipToContent")}</a>
      <HeroDotField maxFps={24} />
      <div className="company-shell">
        <SiteHeader company />
        <div id="observe" className="company-stage" data-service={active}>
          <div className="company-tabs" role="tablist" aria-label={t("services")}>
            {services.map((service, index) => (
              <button key={service} type="button" role="tab" id={`tab-${service}`}
                aria-controls={`panel-${service}`} aria-selected={active === service}
                tabIndex={active === service ? 0 : -1} onClick={() => setActive(service)}
                onKeyDown={(event) => navigateTabs(event, index)}>
                <span className="company-tab-dot" aria-hidden="true" />
                {t(`${service}.label`)}
              </button>
            ))}
          </div>
          <div className="field-main company-copy">
            {services.map((service) => (
              <div key={service} role="tabpanel" id={`panel-${service}`}
                aria-labelledby={`tab-${service}`} hidden={active !== service}>
                {active === service && <>
                  <h1>{t(`${service}.lead`)} <em>{t(`${service}.accent`)}</em></h1>
                  <p>{t(`${service}.line`)}</p>
                  {service === "analysis" ? <>
                    <HeroScanSequence simpleEntry />
                    <Link className="company-report" prefetch={false} href="/analysis#sample-report">{t("analysis.report")}</Link>
                  </> : (
                    <a className="company-action" href={`mailto:team@sailtru.com?subject=${encodeURIComponent(t(`${service}.subject`))}&body=${encodeURIComponent(t(`${service}.brief`))}`}>
                      {t(`${service}.cta`)}
                    </a>
                  )}
                </>}
              </div>
            ))}
          </div>
          <ServicePreview service={active} />
        </div>
      </div>
    </section>
  );
}
