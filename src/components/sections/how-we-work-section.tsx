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
      <PageHero variant="field" kicker={t("kicker")} title={t("title")} body={t("intro")} />
      <div className="sp-below">
        <section className="sp-section">
          <div className="sp-shell">
            <header className="sp-intro">
              <p className="sp-eyebrow">{t("kicker")}</p>
              <h2 className="sp-heading">{t("title")}</h2>
            </header>

            <ol className="sp-method__steps">
              {SECTION_KEYS.map((key, index) => (
                <li key={key} className="sp-method__step">
                  <span className="sp-method__index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="sp-method__title">{t(`sections.${key}.title`)}</h3>
                  <p className="sp-method__body">{t(`sections.${key}.body`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sp-section sp-close">
          <div className="sp-shell sp-shell--narrow">
            <div className="sp-close__panel">
              <div className="sp-close__actions">
                <Link href="/contact" className="sp-btn">
                  {t("cta")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
