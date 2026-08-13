"use client";

import { useTranslations } from "next-intl";

const KEYS = ["found", "ahead", "automate", "build"] as const;

export function TerritoryChapters() {
  const t = useTranslations("servicesV2.chapters");

  return (
    <section id="territories" className="sp-section">
      <div className="sp-shell">
        <header className="sp-intro">
          <p className="sp-eyebrow">Territories</p>
          <h2 className="sp-heading">{t("title")}</h2>
          <p className="sp-lede">{t("lede")}</p>
        </header>

        <ol className="sp-rows">
          {KEYS.map((key, index) => (
            <li key={key} className="sp-row">
              <span className="sp-row__num" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="sp-row__name">{t(`${key}.name`)}</p>
                <h3 className="sp-row__title">{t(`${key}.title`)}</h3>
                <p className="sp-row__body">{t(`${key}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
