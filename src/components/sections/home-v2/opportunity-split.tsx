"use client";

import { useTranslations } from "next-intl";

export function OpportunitySplit() {
  const t = useTranslations("homeV2.opportunity");

  return (
    <section id="opportunity" className="hb-section hb-split">
      <div className="hb-shell">
        <header className="hb-intro">
          <p className="hb-eyebrow">Opportunity</p>
          <h2 className="hb-heading">{t("title")}</h2>
          <p className="hb-lede">{t("lede")}</p>
        </header>

        <div className="hb-split__pair">
          <article className="hb-split__col">
            <span className="hb-split__index" aria-hidden>
              01
            </span>
            <h3 className="hb-split__label">{t("externalTitle")}</h3>
            <p className="hb-split__body">{t("externalBody")}</p>
          </article>
          <article className="hb-split__col">
            <span className="hb-split__index" aria-hidden>
              02
            </span>
            <h3 className="hb-split__label">{t("internalTitle")}</h3>
            <p className="hb-split__body">{t("internalBody")}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
