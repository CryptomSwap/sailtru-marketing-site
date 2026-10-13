"use client";

import { useTranslations } from "next-intl";
import { Enter } from "@/components/ui/enter";
import { BlurWordReveal } from "@/components/ui/blur-word-reveal";
import "@/components/ui/blur-word-reveal.css";

const STAGES = ["observe", "understand", "prioritize", "recommend", "build", "monitor"] as const;

export function SystemLoopSection() {
  const t = useTranslations("homeV2.systemLoop");

  return (
    <section id="system-loop" className="st-loop" aria-labelledby="system-loop-title">
      <div className="st-loop__inner">
        <header className="st-loop__intro">
          <p className="st-loop__eyebrow">{t("eyebrow")}</p>
          <BlurWordReveal
            as="h2"
            id="system-loop-title"
            className="st-loop__heading"
            text={t("title")}
            mode="scroll"
          />
          <p className="st-loop__lede">{t("lede")}</p>
        </header>
        <ol className="st-loop__stages">
          {STAGES.map((stage, index) => (
            <Enter as="li" key={stage} delay={index * 0.04} className="st-loop__stage">
              <span className="st-loop__num" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="st-loop__name">{t(`${stage}.title`)}</h3>
                <p className="st-loop__body">{t(`${stage}.body`)}</p>
              </div>
            </Enter>
          ))}
        </ol>
      </div>
    </section>
  );
}
