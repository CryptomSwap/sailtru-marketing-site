"use client";

import { useTranslations } from "next-intl";

const WHATSAPP_URL = "https://wa.me/972547634464";
const CONTACT_EMAIL = "team@sailtru.com";

export function ServicesContactSection() {
  const t = useTranslations("servicesPage.contact");

  return (
    <section id="services-contact" className="sp-section sp-close">
      <div className="sp-shell sp-shell--narrow">
        <div className="sp-close__panel">
          <p className="sp-eyebrow">{t("kicker")}</p>
          <h2 className="sp-close__title">{t("title")}</h2>
          <p className="sp-close__body">{t("body")}</p>
          <div className="sp-close__actions">
            <a href={`mailto:${CONTACT_EMAIL}`} className="sp-btn">
              {t("emailCta")}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sp-link"
            >
              {t("whatsappCta")}
            </a>
          </div>
          <p className="sp-close__note">{t("note")}</p>
        </div>
      </div>
    </section>
  );
}
