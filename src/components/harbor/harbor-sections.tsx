"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_URL } from "@/components/ui/whatsapp-cta";
import { SampleReport } from "./artifacts";

const CALENDLY_URL = "https://calendly.com/sailtrue";
const CONTACT_EMAIL = "team@sailtru.com";

type Titled = { title: string; body: string };

export function SampleReportSection() {
  const t = useTranslations("harbor.sample");
  const tFields = useTranslations("harbor.report.fields");
  const coverage = t.raw("coverage") as Titled[];
  const anatomy = ["observed", "evidence", "why", "action", "uncertainty"] as const;
  return (
    <section id="sample-report" className="hb-sec hb-sample" aria-labelledby="hb-sample-title">
      <div className="hb-shell">
        <header className="hb-head">
          <p className="hb-eyebrow">{t("eyebrow")}</p>
          <h2 id="hb-sample-title" className="hb-title">
            {t("title")}
          </h2>
          <p className="hb-lede">{t("intro")}</p>
        </header>
        <div className="hb-sample__grid">
          <div className="hb-sample__about">
            <ul className="hb-coverage">
              {coverage.map((item, i) => (
                <li key={item.title}>
                  <span className="hb-coverage__num" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hb-anatomy">
              <h3>{t("anatomyTitle")}</h3>
              <ol>
                {anatomy.map((key) => (
                  <li key={key}>{tFields(key)}</li>
                ))}
              </ol>
            </div>
            <p className="hb-note">{t("limits")}</p>
            <Link href="/contact" className="hs-btn hs-btn--secondary">
              {t("request")}
            </Link>
          </div>
          <SampleReport />
        </div>
      </div>
    </section>
  );
}

export function BuildSection() {
  const t = useTranslations("harbor.build");
  const items = t.raw("items") as (Titled & { example: string })[];
  return (
    <section id="build-examples" className="hb-sec hb-build" aria-labelledby="hb-build-title">
      <div className="hb-shell">
        <header className="hb-head">
          <p className="hb-eyebrow">{t("eyebrow")}</p>
          <h2 id="hb-build-title" className="hb-title">
            {t("title")}
          </h2>
          <p className="hb-lede">{t("intro")}</p>
        </header>
        <ul className="hb-build__list">
          {items.map((item, i) => (
            <li key={item.title} className="hb-build__item">
              <span className="hb-build__num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <p className="hb-build__example">{item.example}</p>
            </li>
          ))}
        </ul>
        <div className="hb-build__foot">
          <p className="hb-note">{t("discovery")}</p>
          <Link href="/contact" className="hs-btn hs-btn--primary">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProofSection() {
  const t = useTranslations("harbor.proof");
  return (
    <section id="work" className="hb-sec hb-proof" aria-labelledby="hb-proof-title">
      <div className="hb-shell hb-proof__inner">
        <p className="hb-eyebrow" id="hb-proof-title">
          {t("eyebrow")}
        </p>
        <figure className="hb-proof__figure">
          <p className="hb-proof__metric">
            <span dir="ltr">{t("metric")}</span>
            <span className="hb-proof__client">{t("client")}</span>
          </p>
          <blockquote className="hb-proof__quote">
            <p>“{t("quote")}”</p>
          </blockquote>
          <figcaption className="hb-proof__cite">— {t("client")}</figcaption>
        </figure>
        <Link href="/work" className="hb-link">
          {t("link")}
        </Link>
      </div>
    </section>
  );
}

export function FaqSection() {
  const t = useTranslations("harbor.faq");
  const items = t.raw("items") as { q: string; a: string }[];
  return (
    <section id="faq" className="hb-sec hb-faq" aria-labelledby="hb-faq-title">
      <div className="hb-shell hb-shell--narrow">
        <h2 id="hb-faq-title" className="hb-title">
          {t("title")}
        </h2>
        <div className="hb-faq__list">
          {items.map((item) => (
            <details key={item.q} className="hb-faq__item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingSection() {
  const t = useTranslations("harbor.closing");
  const tHero = useTranslations("harbor.hero");
  return (
    <section id="contact" className="hb-sec hb-close" aria-labelledby="hb-close-title">
      <div className="hb-shell hb-close__inner">
        <h2 id="hb-close-title" className="hb-title">
          {t("title")}
        </h2>
        <p className="hb-lede">{t("body")}</p>
        <div className="hs-actions hs-actions--center">
          <a href="#sample-report" className="hs-btn hs-btn--primary">
            {tHero("primary")}
          </a>
          <Link href="/contact" className="hs-btn hs-btn--secondary">
            {tHero("secondary")}
          </Link>
        </div>
        <p className="hb-close__direct">
          <span>{t("direct")}</span>
          <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr">
            {CONTACT_EMAIL}
          </a>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            {t("calendly")}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            {t("whatsapp")}
          </a>
        </p>
      </div>
    </section>
  );
}

export function HarborFooter() {
  const t = useTranslations("harbor.footer");
  return (
    <footer className="hb-footer">
      <div className="hb-shell hb-footer__inner">
        <p className="hb-footer__tag">
          <strong>SailTru</strong> · {t("tagline")}
        </p>
        <ul>
          <li>
            <Link href="/services">{t("services")}</Link>
          </li>
          <li>
            <Link href="/how-we-work">{t("how")}</Link>
          </li>
          <li>
            <Link href="/work">{t("work")}</Link>
          </li>
          <li>
            <Link href="/contact">{t("contact")}</Link>
          </li>
        </ul>
        <p className="hb-footer__rights">{t("rights")}</p>
      </div>
    </footer>
  );
}
