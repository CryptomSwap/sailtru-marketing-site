"use client";

import { useTranslations } from "next-intl";
import { BlurWordReveal } from "@/components/ui/blur-word-reveal";
import "@/components/ui/blur-word-reveal.css";

/** Below-fold Observe beat: Profound-style scroll-blur statement, then short lede. */
export function ObserveSection() {
  const t = useTranslations("homeV2.observe");

  return (
    <section className="st-observe" aria-labelledby="observe-title">
      <div className="st-observe__inner">
        <p className="st-observe__index">{t("index")}</p>
        <BlurWordReveal
          as="h2"
          id="observe-title"
          className="st-observe__title st-observe__title--statement"
          text={t("blurStatement")}
          mode="scroll"
        />
        <p className="st-observe__lede">{t("lede")}</p>
      </div>
    </section>
  );
}
