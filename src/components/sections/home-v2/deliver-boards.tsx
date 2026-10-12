"use client";

import { useTranslations } from "next-intl";

function Mark({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AGENTS = [
  { id: "research", state: "done", icon: "M6.6 6.8a2.6 2.6 0 1 1 .1 0M8.6 8.8 12.2 12.4" },
  { id: "insight", state: "done", icon: "M8 2.4v1.6M8 12v1.6M2.4 8h1.6M12 8h1.6M4.1 4.1l1.1 1.1M10.8 10.8l1.1 1.1M11.9 4.1 10.8 5.2M5.2 10.8 4.1 11.9" },
  { id: "strategy", state: "run", icon: "M8 3.1 9.3 6.4 12.8 6.8 10.3 9.1 10.9 12.6 8 10.9 5.1 12.6 5.7 9.1 3.2 6.8 6.7 6.4z" },
  { id: "implementation", state: "wait", icon: "M3.2 6.2h9.6v6.4H3.2zM5.2 6.2V4.6h5.6v1.6" }
] as const;
const TABS = ["summary", "findings", "opportunities", "steps"] as const;
const TASKS = [
  { id: "design", state: "done" },
  { id: "test", state: "done" },
  { id: "deploy", state: "run" },
  { id: "monitor", state: "wait" }
] as const;

export function DeliverBoards({ staticMode = false }: { staticMode?: boolean }) {
  const t = useTranslations("homeV2.howItWorks.engine");

  return (
    <div className={`deliver${staticMode ? " deliver--static" : ""}`} aria-hidden>
      <svg className="deliver__path" data-output="path" viewBox="0 0 640 72" preserveAspectRatio="none">
        <path d="M28 22 C 120 22, 180 40, 250 30 S 390 10, 470 24 S 560 42, 612 26" />
      </svg>
      <div className="deliver__col" data-output="agents">
        <article className="deliver__card">
          <header className="deliver__head">
            <h3>{t("outputs.agents.title")}</h3>
            <span className="deliver__badge deliver__badge--live">{t("deliver.running")}</span>
          </header>
          <ul className="deliver__rows">
            {AGENTS.map((row) => (
              <li key={row.id} className={`is-${row.state}`}>
                <span className="deliver__ico">
                  <Mark d={row.icon} />
                </span>
                <span>
                  <b>{t(`deliver.agents.${row.id}.title`)}</b>
                  <small>{t(`deliver.agents.${row.id}.body`)}</small>
                </span>
                <span className="deliver__tick" />
              </li>
            ))}
          </ul>
        </article>
        <p className="deliver__cap">
          <strong>{t("outputs.agents.title")}</strong>
          <span>{t("outputs.agents.body")}</span>
        </p>
      </div>
      <div className="deliver__col deliver__col--main" data-output="report">
        <article className="deliver__card deliver__card--report">
          <header className="deliver__head">
            <h3>{t("outputs.report.title")}</h3>
          </header>
          <div className="deliver__tabs">
            {TABS.map((id) => (
              <span key={id} className={id === "summary" ? "is-on" : undefined}>
                {t(`deliver.tabs.${id}`)}
              </span>
            ))}
          </div>
          <div className="deliver__finding">
            <div className="deliver__finding-top">
              <small>{t("deliver.findingKicker")}</small>
              <small className="deliver__sample">{t("illustrative")}</small>
            </div>
            <b>{t("deliver.findingTitle")}</b>
            <em>{t("deliver.findingStat")}</em>
          </div>
          <div className="deliver__reco">
            <small>{t("deliver.recoKicker")}</small>
            <p>{t("deliver.recoBody")}</p>
          </div>
        </article>
        <p className="deliver__cap">
          <strong>{t("outputs.report.title")}</strong>
          <span>{t("outputs.report.body")}</span>
        </p>
      </div>
      <div className="deliver__col" data-output="implement">
        <article className="deliver__card">
          <header className="deliver__head">
            <h3>{t("outputs.implement.title")}</h3>
            <span className="deliver__badge">{t("deliver.progress")}</span>
          </header>
          <div className="deliver__job">
            <b>{t("deliver.checkout")}</b>
            <div className="deliver__split">
              <div>
                <small>{t("deliver.before")}</small>
                <i className="deliver__mini is-before" />
              </div>
              <div>
                <small>{t("deliver.after")}</small>
                <i className="deliver__mini is-after" />
              </div>
            </div>
          </div>
          <ul className="deliver__checks">
            {TASKS.map((row) => (
              <li key={row.id} className={`is-${row.state}`}>
                <span className="deliver__tick" />
                {t(`deliver.tasks.${row.id}`)}
              </li>
            ))}
          </ul>
        </article>
        <p className="deliver__cap">
          <strong>{t("outputs.implement.title")}</strong>
          <span>{t("outputs.implement.body")}</span>
        </p>
      </div>
    </div>
  );
}
