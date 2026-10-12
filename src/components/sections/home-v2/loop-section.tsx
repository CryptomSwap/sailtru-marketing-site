"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Enter } from "@/components/ui/enter";

const STEPS = ["diagnose", "ship", "verify"] as const;

export function LoopSection() {
  const t = useTranslations("homeV2.loop");

  return (
    <section id="methodology" className="hb-section hb-loop">
      <div className="hb-shell">
        <Enter>
          <header className="hb-intro">
            <p className="hb-eyebrow">{t("eyebrow")}</p>
            <h2 className="hb-heading">{t("title")}</h2>
            <p className="hb-lede">{t("lede")}</p>
          </header>
        </Enter>

        <ol className="hb-loop__steps">
          {STEPS.map((step, index) => (
            <Fragment key={step}>
              <Enter as="li" delay={index * 0.1} className="hb-loop__step">
                <span className="hb-loop__index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="hb-loop__copy">
                  <h3 className="hb-loop__title">{t(`${step}.title`)}</h3>
                  <p className="hb-loop__body">{t(`${step}.body`)}</p>
                </div>
              </Enter>
              {index < STEPS.length - 1 ? (
                <li className="hb-loop__rail" aria-hidden>
                  <span className="hb-loop__rail-line" />
                </li>
              ) : null}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
