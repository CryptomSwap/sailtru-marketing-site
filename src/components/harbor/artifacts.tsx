"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties, ReactNode } from "react";

/**
 * Business artifacts shown beside the harbor scene. Each takes the sub-beat
 * reached in its chapter; `inline` renders the settled, complete state for
 * mobile, reduced motion and the sample report.
 */

type ArtifactProps = { sub: number; inline?: boolean };

type Source = { label: string; detail: string };
type Finding = {
  area: string;
  title: string;
  observed: string;
  evidence: string;
  why: string;
  action: string;
  uncertainty: string;
};
type Step = { label: string; io: string; content: string };
type MeasureRow = { change: string; metric: string; baseline: string };

const FIELD_KEYS = ["observed", "evidence", "why", "action", "uncertainty"] as const;

function Badge() {
  const t = useTranslations("harbor.story");
  return <span className="hx-badge">{t("badge")}</span>;
}

function Card({
  className,
  children,
  inline,
  sub
}: {
  className: string;
  children: ReactNode;
  inline?: boolean;
  sub: number;
}) {
  return (
    <div className={`hx-card ${className}${inline ? " hx-card--inline" : ""}`} data-sub={sub}>
      {children}
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden className="hx-check">
      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter 1 — the incomplete chart                                    */
/* ------------------------------------------------------------------ */

export function ChartArtifact({ sub, inline }: ArtifactProps) {
  const t = useTranslations("harbor.chart");
  const sources = t.raw("sources") as Source[];
  const charted = inline ? 3 : Math.max(0, sub);
  return (
    <Card className="hx-chart" inline={inline} sub={charted}>
      <header className="hx-card__head">
        <div>
          <p className="hx-card__title">{t("title")}</p>
          <p className="hx-card__sub">{t("subtitle")}</p>
        </div>
        <Badge />
      </header>
      <div className="hx-chart__map" aria-hidden>
        <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice">
          <rect width="320" height="150" fill="url(#hx-grid)" />
          <path
            d="M0 104 C30 96 52 108 80 98 C110 88 120 60 150 58 C180 56 196 74 226 70 C256 66 270 40 300 36 L320 34 L320 0 L0 0 Z"
            fill="#e9e1cf"
            stroke="#22252b"
            strokeWidth="1.5"
          />
          <g className="hx-chart__zones">
            {[
              { x: 22, y: 14, w: 92, h: 64 },
              { x: 124, y: 74, w: 86, h: 62 },
              { x: 216, y: 18, w: 90, h: 64 }
            ].map((z, i) => (
              <g key={i} className={`hx-chart__zone${charted > i ? " is-charted" : ""}`}>
                <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="6" fill="url(#hx-unknown)" className="hx-chart__fog" />
                <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="6" fill="none" stroke="#22252b" strokeDasharray="3 4" strokeOpacity="0.45" />
                <g className="hx-chart__pin" transform={`translate(${z.x + z.w / 2} ${z.y + z.h / 2})`}>
                  <circle r="9" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="1.5" />
                  <text y="4" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">
                    {i + 1}
                  </text>
                </g>
              </g>
            ))}
          </g>
          <g transform="translate(290 120)" stroke="#22252b" strokeWidth="1.2" fill="none">
            <circle r="14" strokeOpacity="0.5" />
            <path d="M0 -18 L4 0 L0 18 L-4 0 Z" fill="#22252b" fillOpacity="0.8" />
          </g>
        </svg>
      </div>
      <ol className="hx-chart__sources">
        {sources.map((source, i) => (
          <li key={source.label} className={`hx-chart__source${charted > i ? " is-charted" : ""}`}>
            <span className="hx-chart__num" aria-hidden>
              {i + 1}
            </span>
            <span className="hx-chart__text">
              <span className="hx-chart__label">{source.label}</span>
              <span className="hx-chart__detail">{charted > i ? source.detail : t("uncharted")}</span>
            </span>
            {charted > i ? <Check /> : null}
          </li>
        ))}
      </ol>
      <p className="hx-card__foot">
        <span className={`hx-dot${charted >= 3 ? " is-done" : ""}`} aria-hidden />
        {charted >= 3 ? t("gathered") : t("gathering")}
      </p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter 2 — the observed page                                       */
/* ------------------------------------------------------------------ */

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="hx-browser__bar">
      <span className="hx-browser__dots" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <span className="hx-browser__url" dir="ltr">
        {url}
      </span>
    </div>
  );
}

function ServicePage({ withPanel = false, highlightFooter = false }: { withPanel?: boolean; highlightFooter?: boolean }) {
  const t = useTranslations("harbor.site");
  const tDock = useTranslations("harbor.dock");
  const nav = t.raw("nav") as string[];
  const bullets = t.raw("bullets") as string[];
  const footer = t.raw("footer") as string[];
  const fields = tDock.raw("fields") as string[];
  return (
    <div className={`hx-page${withPanel ? " hx-page--panel" : ""}`}>
      <div className="hx-page__nav">
        <span className="hx-page__brand">{t("brand")}</span>
        <span className="hx-page__links">
          {nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
      </div>
      <div className="hx-page__body">
        <div className="hx-page__main">
          <p className="hx-page__title">{t("title")}</p>
          <p className="hx-page__lead">{t("lead")}</p>
          <ul className="hx-page__list">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <span className="hx-page__ghost" aria-hidden />
          <span className="hx-page__ghost hx-page__ghost--short" aria-hidden />
        </div>
        {withPanel ? (
          <div className="hx-page__panel">
            <p className="hx-page__panel-title">{tDock("panelTitle")}</p>
            <p className="hx-page__panel-body">{tDock("panelBody")}</p>
            {fields.map((f) => (
              <span key={f} className="hx-page__field">
                {f}
              </span>
            ))}
            <span className="hx-page__submit">{tDock("submit")}</span>
          </div>
        ) : null}
      </div>
      <div className="hx-page__footer">
        {footer.map((f, i) => (
          <span key={f} className={i === footer.length - 1 && highlightFooter ? "hx-page__contact" : undefined}>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteArtifact({ sub, inline }: ArtifactProps) {
  const t = useTranslations("harbor.site");
  const level = inline ? 2 : sub;
  return (
    <Card className="hx-site" inline={inline} sub={level}>
      <header className="hx-card__head">
        <p className="hx-card__title">{t("observed")}</p>
        <Badge />
      </header>
      <div className="hx-browser">
        <BrowserBar url={t("url")} />
        <ServicePage highlightFooter={level >= 1} />
      </div>
      <div className="hx-finding" data-on={level >= 1}>
        <span className="hx-finding__tag">{t("findingTag")}</span>
        <p className="hx-finding__text">{t("finding")}</p>
      </div>
      <div className="hx-alt" data-on={level >= 2}>
        <p className="hx-alt__label">{t("alternative")}</p>
        <div className="hx-alt__row">
          <div className="hx-alt__mini" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <span className="hx-alt__cta">{t("alternativeCta")}</span>
        </div>
        <p className="hx-alt__note">{t("alternativeNote")}</p>
      </div>
      <p className="hx-card__foot hx-card__foot--muted">{t("caveat")}</p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter 3 — the report                                              */
/* ------------------------------------------------------------------ */

function FindingFields({ finding }: { finding: Finding }) {
  const t = useTranslations("harbor.report.fields");
  return (
    <dl className="hx-fields">
      {FIELD_KEYS.map((key) => (
        <div key={key} className={`hx-fields__row hx-fields__row--${key}`}>
          <dt>{t(key)}</dt>
          <dd>{finding[key]}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ReportArtifact({ sub, inline }: ArtifactProps) {
  const t = useTranslations("harbor.report");
  const coverage = t.raw("coverage") as string[];
  const findings = t.raw("findings") as Finding[];
  const level = inline ? 2 : sub;
  return (
    <Card className="hx-report" inline={inline} sub={level}>
      <header className="hx-card__head">
        <div>
          <p className="hx-card__title">{t("title")}</p>
          <p className="hx-card__sub">{t("business")}</p>
        </div>
        <Badge />
      </header>
      <div className="hx-report__coverage">
        <p className="hx-mini-label">{t("coverageLabel")}</p>
        <ul>
          {coverage.map((c) => (
            <li key={c}>
              <Check />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="hx-report__findings" data-on={level >= 1}>
        <p className="hx-mini-label">{t("findingsLabel")}</p>
        <ol>
          {findings.map((f, i) => (
            <li key={f.title} className={`hx-report__finding${i === 0 ? " is-selected" : ""}`}>
              <div className="hx-report__finding-head">
                <span className="hx-report__rank">{i + 1}</span>
                <span className="hx-report__finding-title">{f.title}</span>
                <span className="hx-report__area">{i === 0 && level >= 2 ? t("selected") : f.area}</span>
              </div>
              {i === 0 ? (
                <div className="hx-report__detail" data-on={level >= 2}>
                  <FindingFields finding={f} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <p className="hx-report__route" data-on={level >= 2}>
        <span className="hx-route-swatch" aria-hidden />
        {t("route")}
      </p>
    </Card>
  );
}

/** The complete sample report, with every finding readable. */
export function SampleReport() {
  const t = useTranslations("harbor.report");
  const tSample = useTranslations("harbor.sample");
  const coverage = t.raw("coverage") as string[];
  const findings = t.raw("findings") as Finding[];
  return (
    <article className="hx-card hx-report hx-report--full" aria-labelledby="sample-report-title">
      <header className="hx-card__head">
        <div>
          <h3 id="sample-report-title" className="hx-card__title">
            {tSample("sampleTitle")}
          </h3>
          <p className="hx-card__sub">{tSample("sampleIntro")}</p>
        </div>
        <Badge />
      </header>
      <div className="hx-report__coverage">
        <p className="hx-mini-label">{t("coverageLabel")}</p>
        <ul>
          {coverage.map((c) => (
            <li key={c}>
              <Check />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="hx-report__findings" data-on="true">
        <p className="hx-mini-label">{t("findingsLabel")}</p>
        <ol>
          {findings.map((f, i) => (
            <li key={f.title} className="hx-report__finding">
              <details open={i === 0}>
                <summary className="hx-report__finding-head">
                  <span className="hx-report__rank">{i + 1}</span>
                  <span className="hx-report__finding-title">{f.title}</span>
                  <span className="hx-report__area">{f.area}</span>
                </summary>
                <div className="hx-report__detail" data-on="true">
                  <FindingFields finding={f} />
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter 4a — the shipped interface change                           */
/* ------------------------------------------------------------------ */

export function DockArtifact({ sub, inline }: ArtifactProps) {
  const t = useTranslations("harbor.dock");
  const tSite = useTranslations("harbor.site");
  const after = inline || sub >= 1;
  return (
    <Card className="hx-dock" inline={inline} sub={after ? 1 : 0}>
      <header className="hx-card__head">
        <p className="hx-card__title">{after ? t("label") : t("before")}</p>
        <span className="hx-toggle" aria-hidden>
          <span className={!after ? "is-on" : undefined}>{t("before")}</span>
          <span className={after ? "is-on" : undefined}>{t("after")}</span>
        </span>
      </header>
      <div className="hx-browser">
        <BrowserBar url={tSite("url")} />
        <ServicePage withPanel={after} highlightFooter={!after} />
      </div>
      <p className="hx-card__foot">
        <span className={`hx-dot${after ? " is-done" : ""}`} aria-hidden />
        {t("caption")}
      </p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter 4b — discovery and the bespoke AI workflow                  */
/* ------------------------------------------------------------------ */

export function WorkflowArtifact({ sub, inline }: ArtifactProps) {
  const t = useTranslations("harbor.workflow");
  const discovery = t.raw("discovery") as string[];
  const knowledge = t.raw("knowledge") as string[];
  const steps = t.raw("steps") as Step[];
  const reached = inline ? steps.length : sub; // steps revealed
  return (
    <Card className="hx-flow" inline={inline} sub={reached}>
      <div className="hx-flow__discovery">
        <p className="hx-mini-label">{t("discoveryLabel")}</p>
        <ul>
          {discovery.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="hx-flow__system">
        <header className="hx-card__head">
          <p className="hx-card__title">{t("title")}</p>
          <Badge />
        </header>
        <p className="hx-flow__uses">
          <span className="hx-mini-label">{t("uses")}</span>
          {knowledge.map((k) => (
            <span key={k} className="hx-chip">
              {k}
            </span>
          ))}
        </p>
        <ol className="hx-flow__steps">
          {steps.map((step, i) => {
            const state = reached > i ? (reached === i + 1 && !inline ? "active" : "done") : "waiting";
            return (
              <li key={step.label} className={`hx-flow__step is-${state}${i === 3 ? " is-human" : ""}`}>
                <span className="hx-flow__index" aria-hidden>
                  {i + 1}
                </span>
                <div className="hx-flow__content">
                  <p className="hx-flow__label">
                    {step.label}
                    <span className="hx-flow__io">{step.io}</span>
                  </p>
                  <p className="hx-flow__text">{step.content}</p>
                  {i === 3 && reached > 3 ? (
                    <p className="hx-flow__approved">
                      <Check />
                      {t("approved")}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="hx-card__foot hx-card__foot--muted">{t("note")}</p>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter 5 — measurement and the next decision                       */
/* ------------------------------------------------------------------ */

export function MeasureArtifact({ sub, inline }: ArtifactProps) {
  const t = useTranslations("harbor.measure");
  const rows = t.raw("rows") as MeasureRow[];
  const timeline = t.raw("timeline") as string[];
  const level = inline ? 1 : sub;
  return (
    <Card className="hx-measure" inline={inline} sub={level}>
      <header className="hx-card__head">
        <p className="hx-card__title">{t("title")}</p>
        <Badge />
      </header>
      <ul className="hx-measure__rows">
        {rows.map((row) => (
          <li key={row.change}>
            <p className="hx-measure__change">
              <span className="hx-delivered">{t("delivered")}</span>
              {row.change}
            </p>
            <p className="hx-measure__metric">{row.metric}</p>
            <p className="hx-measure__baseline">{row.baseline}</p>
          </li>
        ))}
      </ul>
      <div className="hx-measure__result">
        <span className="hx-mini-label">{t("resultLabel")}</span>
        <span>{t("result")}</span>
      </div>
      <ol className="hx-timeline" data-on={level >= 1} style={{ "--n": timeline.length } as CSSProperties}>
        {timeline.map((item, i) => (
          <li key={item} className={i === timeline.length - 1 ? "is-next" : undefined}>
            {item}
          </li>
        ))}
      </ol>
      <p className="hx-measure__next" data-on={level >= 1}>
        {t("next")}
      </p>
    </Card>
  );
}
