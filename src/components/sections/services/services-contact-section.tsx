"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";

const WHATSAPP_URL = "https://wa.me/972547634464";

export function ServicesContactSection() {
  const t = useTranslations("servicesPage.contact");

  return (
    <SectionShell id="services-contact" ruled>
      <Container>
        <ProductStage size="narrow">
          <Reveal>
            <div className="product-close services-contact">
              <div className="product-heading__rail">
                <span className="product-heading__index">{t("index")}</span>
                <span className="product-heading__line" aria-hidden />
                <span className="product-heading__kicker">{t("kicker")}</span>
              </div>
              <h2 className="product-close__title">{t("title")}</h2>
              <p className="product-close__body">{t("body")}</p>
              <div className="product-close__actions services-contact__actions">
                <a href="mailto:hello@sailtrue.io" className="product-close__btn">
                  {t("emailCta")}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services-contact__whatsapp"
                >
                  {t("whatsappCta")}
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
