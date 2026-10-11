"use client";

import { useTranslations } from "next-intl";
import { Enter } from "@/components/ui/enter";

export function OpportunitySplit() {
  const t = useTranslations("homeV2.opportunity");

  return (
    <section id="opportunity" className="hb-section hb-split">
      <div className="hb-shell">
        <Enter>
          <header className="hb-intro">
            <p className="hb-eyebrow">Opportunity</p>
            <h2 className="hb-heading">{t("title")}</h2>
            <p className="hb-lede">{t("lede")}</p>
          </header>
        </Enter>

        <div className="hb-split__pair">
          <Enter delay={0.12}>
          <article className="hb-split__col">
            <span className="hb-split__index" aria-hidden>
              01
            </span>
            <h3 className="hb-split__label">{t("externalTitle")}</h3>
            <p className="hb-split__body">{t("externalBody")}</p>
          </article>
          </Enter>
          <Enter delay={0.24}>
          <article className="hb-split__col">
            <span className="hb-split__index" aria-hidden>
              02
            </span>
            <h3 className="hb-split__label">{t("internalTitle")}</h3>
            <p className="hb-split__body">{t("internalBody")}</p>
          </article>
          </Enter>
        </div>
      </div>
    </section>
  );
}
