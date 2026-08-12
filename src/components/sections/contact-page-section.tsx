"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";

const CALENDLY_URL = "https://calendly.com/sailtrue";
const CONTACT_EMAIL = "team@sailtru.com";

export function ContactPageSection() {
  const t = useTranslations("contactPage");

  return (
    <SectionShell id="contact" className="pt-28">
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
          <Reveal>
            <ol className="product-steps">
              {(t.raw("steps") as string[]).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal>
            <div className="product-close product-close--inline">
              <a href={CALENDLY_URL} className="product-close__btn" target="_blank" rel="noopener noreferrer">
                {t("calendlyCta")}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hero-cta hero-cta--ghost">
                {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
