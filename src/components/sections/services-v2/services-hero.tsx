"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/site-page/page-hero";
import "@/components/sections/site-page/site-page.css";

export function ServicesV2Hero() {
  const t = useTranslations("servicesPage.hero");

  return (
    <PageHero
      variant="field"
      kicker={t("kicker")}
      title={t("title")}
      body={t("body")}
      actions={
        <Link href="#services-contact" className="sp-hero__cta">
          {t("cta")}
        </Link>
      }
    />
  );
}
