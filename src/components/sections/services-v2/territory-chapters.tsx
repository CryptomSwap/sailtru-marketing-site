"use client";

import { useTranslations } from "next-intl";

const KEYS = ["found", "ahead", "automate", "build"] as const;

export function TerritoryChapters() {
  const t = useTranslations("servicesV2.chapters");

  return (
    <section id="territories" className="services-v2-chapters">
      <h2 className="home-v2-heading">{t("title")}</h2>
      <p className="home-v2-lede">{t("lede")}</p>
      <div className="services-v2-chapters__list">
        {KEYS.map((key) => (
          <article key={key} className="services-v2-chapter">
            <p className="services-v2-chapter__name">{t(`${key}.name`)}</p>
            <h3>{t(`${key}.title`)}</h3>
            <p>{t(`${key}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
