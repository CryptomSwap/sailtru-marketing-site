"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";

export function TestimonialsPageSection() {
  const t = useTranslations("workPage");
  const items = t.raw("testimonials") as Array<{ quote: string; attribution: string }>;

  return (
    <SectionShell id="work" className="pt-28">
      <Container>
        <ProductStage size="narrow">
          <Reveal>
            <div className="product-heading">
              <div className="product-heading__rail">
                <span className="product-heading__index">{t("index")}</span>
                <span className="product-heading__line" aria-hidden />
                <span className="product-heading__kicker">{t("kicker")}</span>
              </div>
              <h1 className="product-heading__title">{t("title")}</h1>
              <p className="product-heading__body">{t("intro")}</p>
            </div>
          </Reveal>
          <div className="product-stack product-stack--spaced">
            {items.map((item) => (
              <Reveal key={item.attribution}>
                <blockquote className="product-quote">
                  <p className="product-quote__text">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="product-quote__attribution">— {item.attribution}</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="product-close product-close--inline">
              <Link href="/contact" className="product-close__btn">
                {t("cta")}
              </Link>
            </div>
          </Reveal>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
