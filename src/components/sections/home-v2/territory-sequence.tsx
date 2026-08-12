"use client";

import { useTranslations } from "next-intl";

const KEYS = ["found", "ahead", "automate", "build"] as const;

export function TerritorySequence() {
  const t = useTranslations("homeV2.territories");

  return (
    <section id="territories" className="home-v2-territories">
      <h2 className="home-v2-heading">{t("title")}</h2>
      <p className="home-v2-lede">{t("lede")}</p>
      <ol className="home-v2-territories__list">
        {KEYS.map((key) => (
          <li key={key} className={`home-v2-territories__item home-v2-territories__item--${key}`}>
            <p className="home-v2-territories__name">{t(`${key}.name`)}</p>
            <h3 className="home-v2-territories__title">{t(`${key}.title`)}</h3>
            <p className="home-v2-territories__body">{t(`${key}.body`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
