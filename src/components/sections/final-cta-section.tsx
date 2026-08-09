"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";

export function FinalCtaSection() {
  const t = useTranslations("finalCta");

  return (
    <SectionShell id="final-cta" ruled>
      <Container>
        <ProductStage size="narrow">
          <Reveal>
            <div className="product-close">
              <div className="product-heading__rail">
                <span className="product-heading__index">{t("index")}</span>
                <span className="product-heading__line" aria-hidden />
                <span className="product-heading__kicker">{t("kicker")}</span>
              </div>
              <h2 className="product-close__title">{t("title")}</h2>
              <p className="product-close__body">{t("body")}</p>
              <div className="product-close__actions">
                <a href="mailto:hello@sailtrue.io" className="product-close__btn">
                  {t("button")}
                </a>
                <p className="product-close__note">{t("note")}</p>
              </div>
            </div>
          </Reveal>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
