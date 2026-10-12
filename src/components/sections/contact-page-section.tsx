"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/site-page/page-hero";
import "@/components/sections/site-page/site-page.css";

const CALENDLY_URL = "https://calendly.com/sailtrue";
const CONTACT_EMAIL = "team@sailtru.com";

export function ContactPageSection() {
  const t = useTranslations("contactPage");
  const steps = t.raw("steps") as string[];

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} body={t("intro")} />
      <div className="sp-below">
        <section className="sp-section sp-close">
          <div className="sp-shell sp-shell--narrow">
            <ol className="sp-steps">
              {steps.map((step, index) => (
                <li key={step}>
                  <span className="sp-steps__num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="sp-close__panel sp-close__panel--spaced">
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
