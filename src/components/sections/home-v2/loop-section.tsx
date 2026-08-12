"use client";

import { useTranslations } from "next-intl";

const STEPS = ["find", "understand", "build"] as const;

export function LoopSection() {
  const t = useTranslations("homeV2.loop");

  return (
    <section id="methodology" className="home-v2-loop">
      <h2 className="home-v2-heading">{t("title")}</h2>
      <p className="home-v2-lede">{t("lede")}</p>
      <ol className="home-v2-loop__steps">
        {STEPS.map((step, index) => (
          <li key={step} className="home-v2-loop__step">
            <span className="home-v2-loop__index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{t(`${step}.title`)}</h3>
              <p>{t(`${step}.body`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
