"use client";

import { useTranslations } from "next-intl";
import { Enter } from "@/components/ui/enter";

export function ProofSection() {
  const t = useTranslations("proof");
  const stats = t.raw("stats") as string[];
  const logos = t.raw("logos") as string[];

  return (
    <section id="proof" className="hb-section hb-proof">
      <div className="hb-shell hb-shell--narrow">
        <Enter>
          <header className="hb-intro">
            <p className="hb-eyebrow">{t("kicker")}</p>
            <h2 className="hb-heading">{t("title")}</h2>
            <p className="hb-lede">{t("description")}</p>
          </header>
        </Enter>

        <Enter delay={0.06}>
          <p className="hb-proof__metric">
            <span className="hb-proof__metric-value">{t("metric")}</span>
            <span className="hb-proof__metric-label">{t("metricLabel")}</span>
          </p>
          <p className="hb-proof__implement">{t("implementNote")}</p>
        </Enter>

        {stats.length > 0 ? (
          <Enter delay={0.08}>
            <ul className="hb-proof__stats">
              {stats.map((stat) => (
                <li key={stat} className="hb-proof__stat">
                  {stat}
                </li>
              ))}
            </ul>
          </Enter>
        ) : null}

        <Enter delay={0.12}>
          <blockquote className="hb-proof__quote">
            <p className="hb-proof__quote-text">&ldquo;{t("quote")}&rdquo;</p>
            <cite className="hb-proof__quote-attrib">{t("attribution")}</cite>
          </blockquote>
        </Enter>

        {logos.length > 0 ? (
          <Enter delay={0.2}>
            <ul className="hb-proof__logos">
              {logos.map((logo) => (
                <li key={logo} className="hb-proof__logo">
                  {logo}
                </li>
              ))}
            </ul>
          </Enter>
        ) : null}
      </div>
    </section>
  );
}
