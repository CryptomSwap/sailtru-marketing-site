"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties, ReactNode } from "react";
import { Providers, type ProviderId } from "./providers";

/**
 * Demonstration cards: the one visual each line of the story acts out.
 *
 * Each card takes the line (`sub`) its step has reached. Everything a later
 * line adds already has its space reserved, so a card never changes size or
 * jumps while it is read; content only fades, highlights or expands into
 * room that was there from the start. `inline` renders the settled, complete
 * state for phones, reduced motion and the WebGL fallback's stacked layout.
 */

type DemoProps = { sub: number; inline?: boolean };

type Finding = {
  id: string;
  area: string;
  title: string;
  observed: string;
  evidence: string;
  why: string;
  action: string;
  uncertainty: string;
};
type FlowStep = { label: string; out: string };

const FIELD_KEYS = ["observed", "evidence", "why", "action", "uncertainty"] as const;

function Badge() {
  const t = useTranslations("harbor.story");
  return <span className="hx-badge">{t("badge")}</span>;
}

function Card({ className, children, inline, sub }: { className: string; children: ReactNode; inline?: boolean; sub: number }) {
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

/** A platform mark on the shared neutral badge. */
export function ProviderMark({ id, size = 22 }: { id: ProviderId; size?: number }) {
  return (
    <span className="hx-provider" style={{ "--size": `${size}px` } as CSSProperties} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG mark, no optimisation needed */}
      <img src={Providers.logo(id)} alt="" width={size} height={size} />
    </span>
  );
}

/** A finding's stable identifier and wording, the same in every chapter. */
export function FindingChip({ id, title, tone = "ink" }: { id: string; title?: string; tone?: "ink" | "accent" }) {
  return (
    <span className={`hx-fchip hx-fchip--${tone}`}>
      <span className="hx-fchip__id" dir="ltr">
        {id}
      </span>
      {title ? <span className="hx-fchip__title">{title}</span> : null}
    </span>
  );
}

function useFinding(index: number) {
  const t = useTranslations("harbor.report");
  return (t.raw("findings") as Finding[])[index];
}

/** Characters revealed one by one while `play` is set (short questions only). */
function Typed({ text, play }: { text: string; play: boolean }) {
  if (!play) return <>{text}</>;
  return (
    <span className="hx-typed">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {Array.from(text).map((ch, i) => (
          <span key={i} className="hx-typed__ch" style={{ "--i": i } as CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}

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

/* ------------------------------------------------------------------ */
/* Find — an illustrative question to an AI assistant                  */
/* ------------------------------------------------------------------ */

export function AskDemo({ sub, inline }: DemoProps) {
  const t = useTranslations("harbor.ask");
  const f02 = useFinding(1);
  const areas = t.raw("areas") as string[];
  const providers = t.raw("providers") as string[];
  const level = inline ? 2 : sub;
  return (
    <Card className="hx-ask" inline={inline} sub={level}>
      <header className="hx-card__head">
        <p className="hx-ask__who">
          <ProviderMark id="chatgpt" size={20} />
          <span>{providers[0]}</span>
        </p>
        <Badge />
      </header>
      <div className="hx-ask__q">
        <span className="hx-mini-label">{t("questionLabel")}</span>
        <p className="hx-ask__question">
          <Typed text={t("question")} play={!inline && sub === 0} />
        </p>
      </div>
      <div className="hx-ask__a hx-reserve" data-on={level >= 1}>
        <span className="hx-mini-label">{t("answerLabel")}</span>
        <p className="hx-ask__answer">
          {t("answerA")}
          <mark className="hx-ask__issue" data-on={level >= 1}>
            {t("answerB")}
          </mark>
        </p>
        <p className="hx-ask__flag" data-on={level >= 1}>
          <span aria-hidden className="hx-ask__flag-dot" />
          {t("issue")}
        </p>
      </div>
      <div className="hx-ask__capture hx-reserve" data-on={level >= 2}>
        <span className="hx-mini-label">{t("capture")}</span>
        <FindingChip id={f02.id} title={f02.title} />
        <ul className="hx-chips" data-on={level >= 2}>
          {areas.map((a, i) => (
            <li key={a} style={{ "--i": i } as CSSProperties}>
              <Check />
              {a}
            </li>
          ))}
        </ul>
      </div>
      <p className="hx-card__foot hx-card__foot--muted">{t("note")}</p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Evidence — Example Studio's service page                            */
/* ------------------------------------------------------------------ */

function ServicePage({
  mode,
  level
}: {
  /** evidence: the observed page; before/after: the shipyard's change. */
  mode: "evidence" | "before" | "after";
  level: number;
}) {
  const t = useTranslations("harbor.site");
  const tDock = useTranslations("harbor.dock");
  const nav = t.raw("nav") as string[];
  const bullets = t.raw("bullets") as string[];
  const footer = t.raw("footer") as string[];
  const fields = tDock.raw("fields") as string[];
  const footerLit = mode === "before" || (mode === "evidence" && level >= 1);
  return (
    <div className={`hx-page hx-page--${mode}`}>
      <div className="hx-page__nav">
        <span className="hx-page__brand">{t("brand")}</span>
        <span className="hx-page__links">
          {nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
      </div>
      <div className="hx-page__body">
        <div className={`hx-page__main${mode === "evidence" && level === 0 ? " is-lit" : ""}`}>
          <p className="hx-page__title">{t("title")}</p>
          <p className="hx-page__lead">{t("lead")}</p>
          <ul className="hx-page__list">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {mode === "evidence" ? (
            <span className="hx-pin hx-pin--ink" data-on={level >= 0}>
              <Check />
              {t("serviceOk")}
            </span>
          ) : null}
        </div>
        {/* The space beside the service description: missing (evidence), reserved (before) or the shipped enquiry action (after).
            Before and after share one grid cell, so the page keeps its size when the change lands. */}
        <div className="hx-page__side">
          {mode !== "evidence" ? (
            <div className={`hx-page__panel${mode === "after" ? " is-shown" : ""}`} aria-hidden={mode !== "after"}>
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
          {mode !== "after" ? (
            <div className="hx-page__gap" data-on={mode === "before" || level >= 2}>
              <span>{mode === "before" ? tDock("slot") : t("missing")}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="hx-page__footer">
        {footer.map((f, i) => (
          <span key={f} className={i === footer.length - 1 && footerLit ? "hx-page__contact" : undefined}>
            {f}
          </span>
        ))}
        {mode === "evidence" ? (
          <span className="hx-pin hx-pin--accent hx-pin--footer" data-on={level >= 1}>
            {t("footerOnly")}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function EvidenceDemo({ sub, inline }: DemoProps) {
  const t = useTranslations("harbor.site");
  const f01 = useFinding(0);
  const level = inline ? 2 : sub;
  return (
    <Card className="hx-site" inline={inline} sub={level}>
      <header className="hx-card__head">
        <p className="hx-card__title">{t("observed")}</p>
        <Badge />
      </header>
      <div className="hx-browser">
        <BrowserBar url={t("url")} />
        <ServicePage mode="evidence" level={level} />
      </div>
      <div className="hx-site__finding" data-on={level >= 2}>
        <FindingChip id={f01.id} title={f01.title} tone="accent" />
        <p className="hx-site__where">
          {t("where")}{" "}
          <span dir="ltr">{t("url").slice(t("url").indexOf("/"))}</span>
        </p>
      </div>
      <p className="hx-card__foot hx-card__foot--muted">{t("caveat")}</p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Report — three priorities, the selected one expanded                */
/* ------------------------------------------------------------------ */

export function ReportDemo({ sub, inline }: DemoProps) {
  const t = useTranslations("harbor.report");
  const tFields = useTranslations("harbor.report.fields");
  const findings = t.raw("findings") as Finding[];
  const level = inline ? 2 : sub;
  const brief = ["observed", "evidence", "action"] as const;
  return (
    <Card className="hx-report" inline={inline} sub={level}>
      <header className="hx-card__head">
        <div>
          <p className="hx-card__title">{t("title")}</p>
          <p className="hx-card__sub">{t("business")}</p>
        </div>
        <Badge />
      </header>
      <p className="hx-mini-label">{t("priorities")}</p>
      <ol className="hx-prio" data-level={level}>
        {findings.map((f, i) => (
          <li
            key={f.id}
            className={`hx-prio__row${i === 0 && level >= 1 ? " is-selected" : ""}${i > 0 && level >= 1 ? " is-muted" : ""}`}
            style={{ "--i": i } as CSSProperties}
          >
            <div className="hx-prio__head">
              <span className="hx-prio__rank">{i + 1}</span>
              <FindingChip id={f.id} tone={i === 0 && level >= 1 ? "accent" : "ink"} />
              <span className="hx-prio__title">{f.title}</span>
              {i === 0 ? (
                <span className="hx-prio__tag" data-on={level >= 1}>
                  {t("selected")}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      {/* The selected priority opens below the list, into space kept for it. */}
      <div className="hx-prio__open hx-reserve" data-on={level >= 2}>
        <FindingChip id={findings[0].id} tone="accent" />
        <dl className="hx-prio__detail">
          {brief.map((key) => (
            <div key={key} className={`hx-prio__field hx-prio__field--${key}`}>
              <dt>{tFields(key)}</dt>
              <dd>{t(`brief.${key}`)}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="hx-card__foot hx-card__foot--muted">{t("full")}</p>
    </Card>
  );
}

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
      <p className="hx-mini-label">{t("priorities")}</p>
      <ol className="hx-full">
        {findings.map((f, i) => (
          <li key={f.id} className="hx-full__finding">
            <details open={i === 0}>
              <summary className="hx-full__head">
                <span className="hx-prio__rank">{i + 1}</span>
                <FindingChip id={f.id} tone={i === 0 ? "accent" : "ink"} />
                <span className="hx-prio__title">{f.title}</span>
                <span className="hx-full__area">{f.area}</span>
              </summary>
              <div className="hx-full__detail">
                <FindingFields finding={f} />
              </div>
            </details>
          </li>
        ))}
      </ol>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Build — the selected recommendation becomes the page change         */
/* ------------------------------------------------------------------ */

export function BuildDemo({ sub, inline }: DemoProps) {
  const t = useTranslations("harbor.dock");
  const tSite = useTranslations("harbor.site");
  const after = sub >= 1;
  if (inline) {
    return (
      <Card className="hx-build hx-build--pair" inline sub={2}>
        {(["before", "after"] as const).map((mode) => (
          <div key={mode} className="hx-build__pane">
            <p className={`hx-build__state${mode === "after" ? " is-after" : ""}`}>{t(mode)}</p>
            <div className="hx-browser">
              <ServicePage mode={mode} level={2} />
            </div>
          </div>
        ))}
        <p className="hx-card__foot">
          <span className="hx-dot is-done" aria-hidden />
          {t("handover")}
        </p>
      </Card>
    );
  }
  return (
    <Card className="hx-build" sub={sub}>
      <header className="hx-card__head">
        <span className="hx-toggle" aria-hidden>
          <span className={!after ? "is-on" : undefined}>{t("before")}</span>
          <span className={after ? "is-on is-after" : undefined}>{t("after")}</span>
        </span>
        <Badge />
      </header>
      <div className="hx-browser">
        <BrowserBar url={tSite("url")} />
        <ServicePage mode={after ? "after" : "before"} level={sub} />
      </div>
      <p className="hx-build__shipped" data-on={sub >= 2}>
        <span className="hx-dot is-done" aria-hidden />
        <strong>{t("shipped")}</strong>
        <span>{t("handover")}</span>
      </p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Custom systems — one step and one output at a time                  */
/* ------------------------------------------------------------------ */

/** Which flow step each line makes active: research, brief, approval, then the CRM handoff. */
const FLOW_ACTIVE = [1, 2, 3, 4];

export function WorkflowDemo({ sub, inline }: DemoProps) {
  const t = useTranslations("harbor.workflow");
  const flow = t.raw("flow") as FlowStep[];
  const active = inline ? flow.length : FLOW_ACTIVE[Math.min(sub, FLOW_ACTIVE.length - 1)];
  const state = (i: number) => {
    if (inline) return "done";
    if (i < active) return "done";
    if (i === active) return "active";
    return i === 4 && sub >= 2 ? "held" : "waiting";
  };
  return (
    <Card className="hx-flow" inline={inline} sub={inline ? 9 : sub}>
      <header className="hx-card__head">
        <div>
          <p className="hx-card__title">{t("title")}</p>
          <p className="hx-flow__origin">{t("origin")}</p>
        </div>
        <Badge />
      </header>
      <ol className="hx-flow__chain">
        {flow.map((step, i) => (
          <li key={step.label} className={`hx-flow__node is-${state(i)}${i === 3 ? " is-human" : ""}`}>
            <span className="hx-flow__index" aria-hidden>
              {i === 3 ? <PersonGlyph /> : i + 1}
            </span>
            <span className="hx-flow__label">{step.label}</span>
          </li>
        ))}
      </ol>
      {inline ? (
        <ol className="hx-flow__list">
          {flow.map((step, i) => (
            <li key={step.label} className={i === 3 ? "is-human" : undefined}>
              <p className="hx-flow__list-label">
                {i + 1}. {step.label}
              </p>
              <p className="hx-flow__out">{step.out}</p>
              {i === 3 ? (
                <p className="hx-flow__approved">
                  <Check />
                  {t("approved")}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <div className="hx-flow__output">
          {/* All outputs share one space; only the active step's output is shown. */}
          {flow.map((step, i) =>
            i === 0 ? null : (
              <div key={step.label} className="hx-flow__panel" data-on={i === active}>
                <p className="hx-mini-label">
                  {t("outputLabel")} · {step.label}
                </p>
                <p className="hx-flow__out">{step.out}</p>
                {i === 3 ? (
                  <p className="hx-flow__gate">
                    <span className="hx-flow__lock" aria-hidden />
                    {t("waiting")}
                  </p>
                ) : null}
                {i === 4 ? (
                  <p className="hx-flow__approved">
                    <Check />
                    {t("approved")}
                  </p>
                ) : null}
              </div>
            )
          )}
        </div>
      )}
      <p className="hx-card__foot hx-card__foot--muted">{t("notScan")}</p>
    </Card>
  );
}

function PersonGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden>
      <circle cx="8" cy="5.2" r="2.8" fill="currentColor" />
      <path d="M2.6 14.2c.6-3 2.8-4.6 5.4-4.6s4.8 1.6 5.4 4.6" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Review — the delivered change, its measurement and the next call    */
/* ------------------------------------------------------------------ */

export function ReviewDemo({ sub, inline }: DemoProps) {
  const t = useTranslations("harbor.measure");
  const f01 = useFinding(0);
  const options = t.raw("options") as string[];
  const level = inline ? 2 : sub;
  return (
    <Card className="hx-review" inline={inline} sub={level}>
      <header className="hx-card__head">
        <p className="hx-review__delivered">
          <span className="hx-dot is-done" aria-hidden />
          <span className="hx-mini-label">{t("delivered")}</span>
        </p>
        <Badge />
      </header>
      <p className="hx-review__change">
        <FindingChip id={f01.id} tone="accent" />
        {t("change")}
      </p>
      <div className="hx-review__metric">
        <span className="hx-mini-label">{t("measureLabel")}</span>
        <p>{t("metric")}</p>
      </div>
      <div className="hx-review__compare hx-reserve" data-on={level >= 1}>
        <div className="hx-review__col">
          <span className="hx-mini-label">{t("baselineLabel")}</span>
          <span className="hx-review__bar" aria-hidden />
          <p>{t("baseline")}</p>
        </div>
        <div className="hx-review__col is-after">
          <span className="hx-mini-label">{t("afterLabel")}</span>
          <span className="hx-review__bar" aria-hidden />
          <p>{t("after")}</p>
        </div>
        <p className="hx-review__none">{t("noNumbers")}</p>
      </div>
      <div className="hx-review__decide hx-reserve" data-on={level >= 2}>
        <span className="hx-mini-label">{t("decideLabel")}</span>
        <ul className="hx-chips hx-chips--options" data-on={level >= 2}>
          {options.map((o, i) => (
            <li key={o} style={{ "--i": i } as CSSProperties} className={i === options.length - 1 ? "is-next" : undefined}>
              {o}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/** The demonstration for a step (1–6). */
export function StepDemo({ step, sub, inline }: { step: number; sub: number; inline?: boolean }) {
  switch (step) {
    case 1:
      return <AskDemo sub={sub} inline={inline} />;
    case 2:
      return <EvidenceDemo sub={sub} inline={inline} />;
    case 3:
      return <ReportDemo sub={sub} inline={inline} />;
    case 4:
      return <BuildDemo sub={sub} inline={inline} />;
    case 5:
      return <WorkflowDemo sub={sub} inline={inline} />;
    case 6:
      return <ReviewDemo sub={sub} inline={inline} />;
    default:
      return null;
  }
}
