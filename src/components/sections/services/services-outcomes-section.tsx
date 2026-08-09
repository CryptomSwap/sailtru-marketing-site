"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

type OutcomeCard = {
  title: string;
  metric: string;
  label: string;
  tags: string[];
};

export function ServicesOutcomesSection() {
  const t = useTranslations("servicesPage.outcomes");
  const cards = t.raw("cards") as OutcomeCard[];

  return (
    <SectionShell id="services-outcomes" ruled>
      <Container>
        <Reveal>
          <SectionHeading
            index={t("index")}
            kicker={t("kicker")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <div className="services-outcomes">
          {cards.map((card) => (
            <Reveal key={card.title}>
              <article className="services-outcome">
                <h3 className="services-outcome__title">{card.title}</h3>
                <div className="services-outcome__metrics">
                  <div className="services-outcome__metric">
                    <span className="services-outcome__metric-value">{card.metric}</span>
                    <span className="services-outcome__metric-label">{card.label}</span>
                  </div>
                </div>
                <ul className="services-outcome__tags">
                  {card.tags.map((tag) => (
                    <li key={tag} className="services-outcome__tag">
                      {tag}
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
