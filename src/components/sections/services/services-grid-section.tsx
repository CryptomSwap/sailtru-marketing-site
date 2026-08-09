"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

type ServiceItem = {
  title: string;
  body: string;
  features: string[];
};

export function ServicesGridSection() {
  const t = useTranslations("servicesPage.services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <SectionShell id="services-offerings" ruled>
      <Container>
        <Reveal>
          <SectionHeading
            index={t("index")}
            kicker={t("kicker")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <div className="services-grid">
          {items.map((item, index) => (
            <Reveal key={item.title}>
              <article className={`services-card ${index === 0 ? "services-card--lead" : ""}`}>
                <span className="services-card__index">0{index + 1}</span>
                <h3 className="services-card__title">{item.title}</h3>
                <p className="services-card__body">{item.body}</p>
                <ul className="services-card__features">
                  {item.features.map((feature) => (
                    <li key={feature} className="services-card__feature">
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
