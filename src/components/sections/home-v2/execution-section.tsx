"use client";

import { useTranslations } from "next-intl";
import { Enter } from "@/components/ui/enter";

const ITEMS = [
  "research",
  "competitive",
  "leads",
  "ops",
  "support",
  "knowledge",
  "automations",
  "teams"
] as const;

export function ExecutionSection() {
  const t = useTranslations("homeV2.execution");

  return (
    <section id="execution" className="st-execute" aria-labelledby="execution-title">
      <div className="st-execute__inner">
        <Enter>
          <header>
            <p className="st-execute__eyebrow">{t("eyebrow")}</p>
            <h2 id="execution-title" className="st-execute__heading">
              {t("title")}
            </h2>
            <p className="st-execute__lede">{t("lede")}</p>
          </header>
        </Enter>
        <ul className="st-execute__list">
          {ITEMS.map((item, index) => (
            <Enter as="li" key={item} delay={index * 0.03} className="st-execute__item">
              {t(`items.${item}`)}
            </Enter>
          ))}
        </ul>
        <p className="st-execute__note">{t("note")}</p>
      </div>
    </section>
  );
}
