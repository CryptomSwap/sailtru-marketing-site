"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";

export function HowWeWorkSection() {
  const t = useTranslations("howWeWorkPage");

  return (
    <>
      <div className="site-inner__bar">
        <SiteHeader compact />
      </div>
      <article className="site-inner__main">
        <h1 className="site-inner__title">{t("title")}</h1>
        <p className="site-inner__lede">{t("intro")}</p>
        <div className="site-inner__blocks">
          {(["loop", "diagnosis", "implementation", "verification"] as const).map((key) => (
            <section key={key} className="site-inner__block">
              <h2>{t(`sections.${key}.title`)}</h2>
              <p>{t(`sections.${key}.body`)}</p>
            </section>
          ))}
        </div>
        <div className="site-inner__actions">
          <Link href="/contact" className="site-inner__cta">
            {t("cta")}
          </Link>
        </div>
      </article>
    </>
  );
}
