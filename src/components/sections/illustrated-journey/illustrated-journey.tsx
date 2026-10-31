"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getJourneyContent } from "./journey-content";
import { JourneyReport } from "./journey-report";
import { JourneyRoute } from "./journey-route";
import { JourneyScanForm } from "./journey-scan-form";
import { HarborStoryPanels } from "./harbor-story-panels";
import { JourneyProof } from "./journey-proof";
import { HarborSketch } from "./harbor-sketch";
import "./harbor-focus.css";
import "./harbor-narrative.css";

export function IllustratedJourney() {
  const locale = useLocale();
  const t = getJourneyContent(locale);

  return (
    <div className="illustrated-journey harbor-journey">
      <div className="ij-transition" aria-hidden>
        <span>{locale === "he" ? "מבינים מה חשוב. בונים את הצעד הבא." : "Understand what matters. Build what comes next."}</span>
        <i />
      </div>
      <section id="journey-start" className="ij-voyage" aria-label={locale==="he"?"מחזור השיפור של SailTru":"The SailTru improvement loop"}>
        <div className="harbor-theater">
        <JourneyRoute />
        <HarborStoryPanels locale={locale}/>
        </div>
      </section>

      <JourneyReport locale={locale} />

      <section className="ij-final">
        <div className="ij-final__copy">
          <p className="ij-eyebrow">{t.final.eyebrow}</p>
          <h2>{t.final.title}</h2>
          <p>{t.final.body}</p>
          <JourneyScanForm locale={locale} compact />
          <Link href="/contact" className="ij-secondary-link">{t.hero.build}<span aria-hidden>↗</span></Link>
        </div>
        <div className="ij-final__harbor" aria-hidden><HarborSketch /></div>
        <p className="ij-final__caption">{t.final.harbor}</p>
      </section>

      <JourneyProof locale={locale} />

      <footer className="ij-footer"><span>SailTru</span><span>{locale==="he"?"מודיעין עסקי. פתרונות AI. שיפור מתמשך.":"Business intelligence. AI solutions. Continuous improvement."}</span></footer>
    </div>
  );
}

