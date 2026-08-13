"use client";

import { useTranslations } from "next-intl";

export function ProofSection() {
  const t = useTranslations("proof");
  const stats = t.raw("stats") as string[];
  const logos = t.raw("logos") as string[];

  return (
    <section id="proof" className="hb-section hb-proof">
      <div className="hb-shell hb-shell--narrow">
        <header className="hb-intro">
          <p className="hb-eyebrow">{t("kicker")}</p>
          <h2 className="hb-heading">{t("title")}</h2>
          <p className="hb-lede">{t("description")}</p>
        </header>

        {stats.length > 0 ? (
          <ul className="hb-proof__stats">
            {stats.map((stat) => (
              <li key={stat} className="hb-proof__stat">
                {stat}
              </li>
            ))}
          </ul>
        ) : null}

        <blockquote className="hb-proof__quote">
          <p className="hb-proof__quote-text">&ldquo;{t("quote")}&rdquo;</p>
          <cite className="hb-proof__quote-attrib">{t("attribution")}</cite>
        </blockquote>

        {logos.length > 0 ? (
          <ul className="hb-proof__logos">
            {logos.map((logo) => (
              <li key={logo} className="hb-proof__logo">
                {logo}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
