"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type ProcessStep = {
  label: string;
  title: string;
  body: string;
};

export function ServicesProcessSection() {
  const t = useTranslations("servicesPage.process");
  const steps = t.raw("steps") as ProcessStep[];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];

  return (
    <section id="services-process" className="sp-section">
      <div className="sp-shell">
        <header className="sp-intro">
          <p className="sp-eyebrow">{t("kicker")}</p>
          <h2 className="sp-heading">{t("title")}</h2>
        </header>

        <div className="sp-process">
          <div className="sp-process__rail" role="tablist" aria-label={t("railLabel")}>
            {steps.map((step, index) => (
              <button
                key={step.label}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={`sp-process__tab ${activeIndex === index ? "sp-process__tab--active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="sp-process__tab-index">0{index + 1}</span>
                <span className="sp-process__tab-label">{step.label}</span>
              </button>
            ))}
          </div>

          <div className="sp-process__panel" role="tabpanel">
            <h3 className="sp-process__panel-title">{active.title}</h3>
            <p className="sp-process__panel-body">{active.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
