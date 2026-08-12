"use client";

import { useTranslations } from "next-intl";

export function OpportunitySplit() {
  const t = useTranslations("homeV2.opportunity");

  return (
    <section id="opportunity" className="home-v2-split">
      <div className="home-v2-split__intro">
        <h2 className="home-v2-heading">{t("title")}</h2>
        <p className="home-v2-lede">{t("lede")}</p>
      </div>
      <div className="home-v2-split__pair">
        <article className="home-v2-split__col">
          <h3 className="home-v2-split__label">{t("externalTitle")}</h3>
          <p>{t("externalBody")}</p>
        </article>
        <article className="home-v2-split__col home-v2-split__col--internal">
          <h3 className="home-v2-split__label">{t("internalTitle")}</h3>
          <p>{t("internalBody")}</p>
        </article>
      </div>
    </section>
  );
}
