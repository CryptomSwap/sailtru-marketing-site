"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

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
    <SectionShell id="services-process" ruled>
      <Container>
        <Reveal>
          <SectionHeading index={t("index")} kicker={t("kicker")} title={t("title")} />
        </Reveal>

        <Reveal>
          <div className="services-process">
            <div className="services-process__rail" role="tablist" aria-label={t("railLabel")}>
              {steps.map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  className={`services-process__tab ${activeIndex === index ? "services-process__tab--active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="services-process__tab-index">0{index + 1}</span>
                  <span className="services-process__tab-label">{step.label}</span>
                </button>
              ))}
            </div>

            <div className="services-process__panel" role="tabpanel">
              <h3 className="services-process__panel-title">{active.title}</h3>
              <p className="services-process__panel-body">{active.body}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionShell>
  );
}
