"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";

export function ServicesV2Hero() {
  const t = useTranslations("servicesPage.hero");

  return (
    <section className="services-v2-hero">
      <SiteHeader compact />
      <div className="services-v2-hero__content">
        <h1 className="services-v2-hero__title">{t("title")}</h1>
        <p className="services-v2-hero__body">{t("body")}</p>
        <Link href="#services-contact" className="services-v2-hero__cta">
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
