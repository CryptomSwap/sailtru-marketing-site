"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SiteHeader } from "@/components/layout/site-header";

export function ServicesHeroSection() {
  const t = useTranslations("servicesPage.hero");

  return (
    <section className="services-hero">
      <div className="services-hero__grid" aria-hidden />
      <Container>
        <SiteHeader compact />
        <Reveal>
          <div className="services-hero__content">
            <p className="services-hero__kicker">{t("kicker")}</p>
            <h1 className="services-hero__title">{t("title")}</h1>
            <p className="services-hero__body">{t("body")}</p>
            <Link href="#services-contact" className="services-hero__cta">
              {t("cta")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
