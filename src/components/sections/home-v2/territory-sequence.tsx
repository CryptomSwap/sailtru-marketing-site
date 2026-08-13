"use client";

import { useTranslations } from "next-intl";

const KEYS = ["found", "ahead", "automate", "build"] as const;

export function TerritorySequence() {
  const t = useTranslations("homeV2.territories");

  return (
    <section id="territories" className="hb-section hb-territories">
      <div className="hb-shell">
        <header className="hb-intro">
          <p className="hb-eyebrow">Territories</p>
          <h2 className="hb-heading">{t("title")}</h2>
          <p className="hb-lede">{t("lede")}</p>
        </header>

        <ol className="hb-territories__list">
          {KEYS.map((key, index) => (
            <li
              key={key}
              className={`hb-territories__item hb-territories__item--${key}`}
            >
              <span className="hb-territories__num" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="hb-territories__copy">
                <p className="hb-territories__name">{t(`${key}.name`)}</p>
                <h3 className="hb-territories__title">{t(`${key}.title`)}</h3>
                <p className="hb-territories__body">{t(`${key}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
