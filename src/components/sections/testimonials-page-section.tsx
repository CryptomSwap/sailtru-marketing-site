"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";

export function TestimonialsPageSection() {
  const t = useTranslations("workPage");
  const items = t.raw("testimonials") as Array<{ quote: string; attribution: string }>;

  return (
    <>
      <div className="site-inner__bar">
        <SiteHeader compact />
      </div>
      <article className="site-inner__main">
        <h1 className="site-inner__title">{t("title")}</h1>
        <p className="site-inner__lede">{t("intro")}</p>
        <div className="site-inner__blocks">
          {items.map((item) => (
            <blockquote key={item.attribution} className="site-inner__quote">
              <p>{item.quote}</p>
              <footer>{item.attribution}</footer>
            </blockquote>
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
