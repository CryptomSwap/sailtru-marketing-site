"use client";

import { useTranslations } from "next-intl";

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
    <section id="services-outcomes" className="sp-section">
      <div className="sp-shell">
        <header className="sp-intro">
          <p className="sp-eyebrow">{t("kicker")}</p>
          <h2 className="sp-heading">{t("title")}</h2>
          <p className="sp-lede">{t("description")}</p>
        </header>

        <ol className="sp-rows">
          {cards.map((card, index) => (
            <li key={card.title} className="sp-row">
              <span className="sp-row__num" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="sp-row__title">{card.title}</h3>
                <p className="sp-row__metric">
                  {card.metric} · {card.label}
                </p>
                <ul className="sp-row__tags">
                  {card.tags.map((tag) => (
                    <li key={tag} className="sp-row__tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
