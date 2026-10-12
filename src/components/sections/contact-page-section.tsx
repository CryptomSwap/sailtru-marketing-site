"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/site-page/page-hero";
import { WHATSAPP_URL } from "@/components/ui/whatsapp-cta";
import "@/components/sections/site-page/site-page.css";

const CALENDLY_URL = "https://calendly.com/sailtrue";
const CONTACT_EMAIL = "team@sailtru.com";

export function ContactPageSection() {
  const t = useTranslations("contactPage");
  const tServicesContact = useTranslations("servicesPage.contact");
  const steps = t.raw("steps") as string[];

  return (
    <>
      <PageHero variant="field" kicker={t("kicker")} title={t("title")} body={t("intro")} />
      <div className="sp-below">
        <section className="sp-section">
          <div className="sp-shell">
            <ol className="sp-method__steps">
              {steps.map((step, index) => (
                <li key={step} className="sp-method__step">
                  <span className="sp-method__index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="sp-method__body">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sp-section sp-close">
          <div className="sp-shell sp-shell--narrow">
            <div className="sp-close__panel">
              <h2 className="sp-close__title">{t("panelTitle")}</h2>
              <div className="sp-close__actions">
                <a
                  href={CALENDLY_URL}
                  className="sp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("calendlyCta")}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="sp-link">
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-link"
                >
                  {tServicesContact("whatsappCta")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
