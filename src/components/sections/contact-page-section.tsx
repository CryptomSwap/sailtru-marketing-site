"use client";

import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";

const CALENDLY_URL = "https://calendly.com/sailtrue";
const CONTACT_EMAIL = "team@sailtru.com";

export function ContactPageSection() {
  const t = useTranslations("contactPage");

  return (
    <>
      <div className="site-inner__bar">
        <SiteHeader compact />
      </div>
      <article className="site-inner__main">
        <h1 className="site-inner__title">{t("title")}</h1>
        <p className="site-inner__lede">{t("intro")}</p>
        <ol className="site-inner__steps">
          {(t.raw("steps") as string[]).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="site-inner__actions">
          <a href={CALENDLY_URL} className="site-inner__cta" target="_blank" rel="noopener noreferrer">
            {t("calendlyCta")}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="site-inner__mail">
            {CONTACT_EMAIL}
          </a>
        </div>
      </article>
    </>
  );
}
