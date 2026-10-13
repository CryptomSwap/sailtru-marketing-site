"use client";

import { useTranslations } from "next-intl";
import { Enter } from "@/components/ui/enter";

export function MonitorSection() {
  const t = useTranslations("homeV2.monitor");

  return (
    <section id="monitor" className="st-monitor" aria-labelledby="monitor-title">
      <div className="st-monitor__inner">
        <Enter>
          <p className="st-monitor__eyebrow">{t("eyebrow")}</p>
          <h2 id="monitor-title" className="st-monitor__heading">
            {t("title")}
          </h2>
          <p className="st-monitor__lede">{t("lede")}</p>
        </Enter>
      </div>
    </section>
  );
}
