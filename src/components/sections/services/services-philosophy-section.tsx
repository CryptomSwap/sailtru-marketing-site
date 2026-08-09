"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";

export function ServicesPhilosophySection() {
  const t = useTranslations("servicesPage.philosophy");

  return (
    <SectionShell id="services-philosophy" ruled>
      <Container>
        <Reveal>
          <div className="services-philosophy">
            <p className="services-philosophy__kicker">{t("kicker")}</p>
            <h2 className="services-philosophy__title">{t("title")}</h2>
            <div className="services-philosophy__body">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>{t("paragraph3")}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionShell>
  );
}
