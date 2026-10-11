"use client";

import { useTranslations } from "next-intl";
import { Enter } from "@/components/ui/enter";

const CALENDLY_URL = "https://calendly.com/sailtrue";
const CONTACT_EMAIL = "team@sailtru.com";

export function FinalCtaSection() {
  const t = useTranslations("finalCta");

  return (
    <section id="final-cta" className="hb-section hb-close">
      <div className="hb-shell hb-shell--narrow">
        <Enter>
        <div className="hb-close__panel">
          <p className="hb-eyebrow">{t("kicker")}</p>
          <h2 className="hb-close__title">{t("title")}</h2>
          <p className="hb-close__body">{t("body")}</p>
          <div className="hb-close__actions">
            <a
              href={CALENDLY_URL}
              className="hb-close__btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("button")}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hb-close__email">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        </Enter>
      </div>
    </section>
  );
}
