"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/site-page/page-hero";
import "@/components/sections/site-page/site-page.css";

const SECTION_KEYS = ["loop", "diagnosis", "implementation", "verification"] as const;

export function HowWeWorkSection() {
  const t = useTranslations("howWeWorkPage");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} body={t("intro")} />
      <div className="sp-below">
        <section className="sp-section">
          <div className="sp-shell sp-shell--narrow">
            <div className="sp-blocks">
              {SECTION_KEYS.map((key, index) => (
                <section key={key} className="sp-block">
                  <span className="sp-block__index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="sp-block__title">{t(`sections.${key}.title`)}</h2>
                  <p className="sp-block__body">{t(`sections.${key}.body`)}</p>
                </section>
              ))}
            </div>
            <div className="sp-close__actions sp-close__actions--after">
              <Link href="/contact" className="sp-btn">
                {t("cta")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
