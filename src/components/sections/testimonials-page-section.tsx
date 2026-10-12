"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/site-page/page-hero";
import "@/components/sections/site-page/site-page.css";

export function TestimonialsPageSection() {
  const t = useTranslations("workPage");
  const items = t.raw("testimonials") as Array<{ quote: string; attribution: string }>;

  return (
    <>
      <PageHero variant="field" kicker={t("kicker")} title={t("title")} body={t("intro")} />
      <div className="sp-below">
        <section className="sp-section">
          <div className="sp-shell sp-shell--narrow">
            <div className="sp-blocks">
              {items.map((item) => (
                <blockquote key={item.attribution} className="sp-quote">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                  <cite>{item.attribution}</cite>
                </blockquote>
              ))}
            </div>
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
