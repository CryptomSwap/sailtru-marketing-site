"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";

type JourneyProofProps = { locale: string };

const copy = {
  en: {
    eyebrow: "Proof, not promises",
    titleA: "Insight matters when it becomes",
    titleB: "measurable improvement.",
    lede: "SailTru connects the evidence, the decision, and the work required to move the business forward.",
    resultLabel: "Client outcome",
    resultMetric: "+275%",
    resultUnit: "traffic",
    resultTitle: "The website became a real growth channel.",
    resultBody: "“SailTru helped us turn our website into a real growth channel. Traffic grew by 275%, with roughly 10× more conversions and paying clients.”",
    resultBy: "Laba Records",
    resultLink: "Read the client testimonial",
    intelligenceLabel: "Ranked intelligence",
    intelligenceTitle: "Know what deserves attention first.",
    intelligenceBody: "A defensible view of your website, market, competitors and workflows—turned into priorities your team can act on.",
    intelligenceTags: ["Finding", "Evidence", "Priority"],
    buildLabel: "Implementation",
    buildTitle: "Move from finding to finished system.",
    buildBody: "When the right next move is clear, SailTru can build it: an improved journey, an automation, a specialized agent, or a bespoke AI system.",
    buildTags: ["Scope", "Build", "Monitor"],
  },
  he: {
    eyebrow: "הוכחות, לא הבטחות",
    titleA: "תובנה חשובה כשהיא הופכת",
    titleB: "לשיפור שאפשר למדוד.",
    lede: "SailTru מחברת בין הראיות, ההחלטה והעבודה שנדרשת כדי לקדם את העסק.",
    resultLabel: "תוצאת לקוח",
    resultMetric: "+275%",
    resultUnit: "תנועה",
    resultTitle: "האתר הפך לערוץ צמיחה אמיתי.",
    resultBody: "“SailTru הפכה את האתר שלנו לערוץ צמיחה אמיתי. התנועה גדלה ב-275%, עם בערך פי 10 יותר המרות ולקוחות משלמים.”",
    resultBy: "Laba Records",
    resultLink: "לקריאת המלצת הלקוח",
    intelligenceLabel: "מודיעין מדורג",
    intelligenceTitle: "לדעת מה ראוי לתשומת לב קודם.",
    intelligenceBody: "תמונה מבוססת של האתר, השוק, המתחרים ותהליכי העבודה—שהופכת לסדרי עדיפויות שאפשר לבצע.",
    intelligenceTags: ["ממצא", "ראיה", "עדיפות"],
    buildLabel: "יישום",
    buildTitle: "לעבור מממצא למערכת שעובדת.",
    buildBody: "כשהצעד הבא ברור, SailTru יכולה לבנות אותו: מסע לקוח משופר, אוטומציה, סוכן ייעודי או מערכת AI מותאמת.",
    buildTags: ["היקף", "בנייה", "ניטור"],
  },
};

export function JourneyProof({ locale }: JourneyProofProps) {
  const section = useRef<HTMLElement>(null);
  const t = locale === "he" ? copy.he : copy.en;

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.visible = "true";
        observer.disconnect();
      }
    }, { threshold: .16 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proof" ref={section} className="ij-proof-wall" aria-labelledby="ij-proof-title">
      <div className="ij-proof-wall__shell">
        <header className="ij-proof-wall__heading">
          <p className="ij-proof-wall__eyebrow"><span aria-hidden>↗</span>{t.eyebrow}</p>
          <h2 id="ij-proof-title">
            <span>{t.titleA}</span>
            <strong>{t.titleB}</strong>
          </h2>
          <p>{t.lede}</p>
        </header>

        <div className="ij-proof-grid">
          <article id="proof-result" className="ij-proof-card ij-proof-card--result">
            <div className="ij-proof-card__meta">
              <span className="ij-proof-card__mark">LR</span>
              <span><b>{t.resultBy}</b><small>{t.resultLabel}</small></span>
            </div>
            <p className="ij-proof-card__metric"><strong>{t.resultMetric}</strong><span>{t.resultUnit}</span></p>
            <h3>{t.resultTitle}</h3>
            <blockquote>{t.resultBody}</blockquote>
            <Link href="/work">{t.resultLink}<span aria-hidden> →</span></Link>
          </article>

          <article id="proof-intelligence" className="ij-proof-card">
            <div className="ij-proof-card__meta">
              <span className="ij-proof-card__icon" aria-hidden>◎</span>
              <span><b>01</b><small>{t.intelligenceLabel}</small></span>
            </div>
            <h3>{t.intelligenceTitle}</h3>
            <p>{t.intelligenceBody}</p>
            <ul aria-label={t.intelligenceLabel}>{t.intelligenceTags.map(item => <li key={item}>{item}</li>)}</ul>
            <div className="ij-proof-card__diagram" aria-hidden><i/><i/><i/><em/></div>
          </article>

          <article id="proof-build" className="ij-proof-card ij-proof-card--build">
            <div className="ij-proof-card__meta">
              <span className="ij-proof-card__icon" aria-hidden>↗</span>
              <span><b>02</b><small>{t.buildLabel}</small></span>
            </div>
            <h3>{t.buildTitle}</h3>
            <p>{t.buildBody}</p>
            <ul aria-label={t.buildLabel}>{t.buildTags.map(item => <li key={item}>{item}</li>)}</ul>
            <div className="ij-proof-card__route" aria-hidden><i/><i/><i/><i/></div>
          </article>
        </div>
      </div>
    </section>
  );
}
