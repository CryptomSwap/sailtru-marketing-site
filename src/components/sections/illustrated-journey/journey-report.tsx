import { getJourneyContent } from "./journey-content";

const icons = ["⌕", "≋", "↗", "◎"];

export function JourneyReport({ locale }: { locale: string }) {
  const t = getJourneyContent(locale).report;
  return (
    <section id="report" className="ij-report">
      <div className="ij-report__heading">
        <p className="ij-eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p>{t.body}</p>
      </div>
      <div className="ij-report__chart">
        <article className="ij-report-card">
          <p className="ij-report-card__badge">{t.example}</p>
          <div className="ij-report-card__items">
            {t.items.map(([title, body], index) => (
              <section key={title}>
                <span aria-hidden>{icons[index]}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </section>
            ))}
          </div>
        </article>
      </div>
      <div className="ij-offer" aria-label={locale==="he"?"אפשרויות הדוח והיישום":"Report and implementation options"}>
        <article>
          <span>01</span><h3>{t.limitedTitle}</h3><p>{t.limitedBody}</p>
        </article>
        <article>
          <span>02</span><h3>{t.fullTitle}</h3><p>{t.fullBody}</p>
        </article>
        <p className="ij-offer__implementation">{t.implementation}</p>
      </div>
    </section>
  );
}

