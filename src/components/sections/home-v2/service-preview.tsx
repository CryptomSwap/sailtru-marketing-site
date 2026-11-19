"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP);

type Service = "analysis" | "solutions" | "studio";

function Pointer() {
  return (
    <svg className="dash-pointer" data-pointer="" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#fff"
        stroke="#12141a"
        strokeWidth="1.4"
        d="M4.2 3.2 19 13.1l-6.4.7 2.8 6.6-2.7 1.1-2.8-6.6-3.8 3.6z"
      />
    </svg>
  );
}

function pointerXY(root: HTMLElement, target: HTMLElement) {
  const frame = root.getBoundingClientRect();
  const box = target.getBoundingClientRect();
  return {
    x: box.left - frame.left + box.width * 0.62,
    y: box.top - frame.top + box.height * 0.42
  };
}

function clickPointer(pointer: HTMLElement, tl: gsap.core.Timeline) {
  tl.to(pointer, { scale: 0.82, duration: 0.08, ease: "power2.in" });
  tl.to(pointer, { scale: 1, duration: 0.14, ease: "power2.out" });
}

function seriesPath(values: number[], width: number, height: number, max: number) {
  const step = width / Math.max(values.length - 1, 1);
  return values
    .map((value, index) => `${index === 0 ? "M" : "L"}${index * step},${(height - (value / max) * height).toFixed(1)}`)
    .join(" ");
}

function seriesArea(values: number[], width: number, height: number, max: number) {
  return `${seriesPath(values, width, height, max)} L${width},${height} L0,${height} Z`;
}

function ChartGrid({ width, height }: { width: number; height: number }) {
  return (
    <g className="ui-grid" aria-hidden="true">
      {[0.25, 0.5, 0.75, 1].map((n) => (
        <line key={n} x1="0" x2={width} y1={height * (1 - n)} y2={height * (1 - n)} />
      ))}
    </g>
  );
}

function AnalysisBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const rtl = useLocale() === "he";
  const root = useRef<HTMLDivElement>(null);
  const you = [18, 19, 20, 19, 21, 22, 23, 24];
  const rivals = [
    { id: "a", color: "#22c55e", values: [48, 49, 50, 51, 51, 52, 53, 54] },
    { id: "b", color: "#f59e0b", values: [32, 33, 34, 33, 35, 36, 36, 37] },
    { id: "c", color: "#ef4444", values: [22, 23, 24, 25, 24, 25, 26, 26] }
  ];
  const models = [
    { id: "gpt", label: t("modelGpt"), color: "#10a37f", values: [28, 30, 29, 31, 33, 34, 36, 38] },
    { id: "gemini", label: t("modelGemini"), color: "#4285f4", values: [22, 23, 24, 24, 25, 26, 27, 28] },
    { id: "perplexity", label: t("modelPerplexity"), color: "#20808d", values: [14, 15, 15, 16, 16, 17, 18, 18] },
    { id: "claude", label: t("modelClaude"), color: "#d97706", values: [18, 18, 19, 19, 20, 21, 21, 22] }
  ];
  const kpis = [
    { key: "google", label: t("kpiGoogle"), value: t("kpiGoogleVal"), delta: t("kpiGoogleDelta"), up: true },
    { key: "pos", label: t("kpiPos"), value: t("kpiPosVal"), delta: t("kpiPosDelta"), up: true },
    { key: "ai", label: t("kpiAi"), value: t("kpiAiVal"), delta: t("kpiAiDelta"), up: true },
    { key: "sov", label: t("kpiSov"), value: t("kpiSovVal"), delta: t("kpiSovDelta"), up: false },
    { key: "rival", label: t("kpiRival"), value: t("kpiRivalVal"), delta: t("kpiRivalDelta"), up: false, watch: true }
  ];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const pointer = el.querySelector<HTMLElement>("[data-pointer]");
      const lines = gsap.utils.toArray<SVGGeometryElement>("[data-line]");
      const fills = gsap.utils.toArray<HTMLElement>("[data-fill]");
      const nav = gsap.utils.toArray<HTMLElement>("[data-nav]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const caption = el.querySelector<HTMLElement>("[data-caption]");

      const setNav = (id: string) => {
        nav.forEach((item) => item.classList.toggle("is-on", item.dataset.nav === id));
        el.dataset.view = id;
        const source = nav.find((item) => item.dataset.nav === id);
        if (caption && source?.dataset.note) caption.textContent = source.dataset.note;
      };

      setNav("overview");
      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: reduced ? 0 : length });
      });
      gsap.set(fills, { autoAlpha: reduced ? 0.16 : 0 });

      if (!playing || reduced || !pointer) {
        if (pointer) gsap.set(pointer, { autoAlpha: 0 });
        return;
      }

      gsap.set(pointer, { autoAlpha: 1, x: rtl ? el.clientWidth - 36 : 24, y: 48, scale: 1 });
      const seo = el.querySelector<HTMLElement>("[data-nav=seo]");
      const aeo = el.querySelector<HTMLElement>("[data-nav=aeo]");
      const watch = el.querySelector<HTMLElement>("[data-nav=watch]");
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      tl.to(lines, { strokeDashoffset: 0, duration: 1.15, stagger: 0.08, ease: "power2.out" });
      tl.to(fills, { autoAlpha: 0.16, duration: 0.4 }, 0.35);
      if (seo) {
        tl.to(pointer, { ...pointerXY(el, seo), duration: 0.45, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => setNav("seo"));
      }
      tl.to({}, { duration: 0.9 });
      if (aeo) {
        tl.to(pointer, { ...pointerXY(el, aeo), duration: 0.45, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => setNav("aeo"));
      }
      tl.to({}, { duration: 0.9 });
      if (watch) {
        tl.to(pointer, { ...pointerXY(el, watch), duration: 0.45, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => setNav("watch"));
        tl.to("[data-rival]", { strokeWidth: 2.8, duration: 0.25 });
      }
      tl.to({}, { duration: 1.15 });
      tl.add(() => setNav("overview"));
    },
    { scope: root, dependencies: [playing, rtl], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="ui-dash" data-view="overview" aria-label={t("tourDescription")}>
      <aside className="ui-rail" aria-hidden="true">
        <strong>SailTru</strong>
        <span>{t("navGroupAnalytics")}</span>
        <button type="button" tabIndex={-1} data-nav="overview" data-note={t("captionOverview")} className="is-on">
          {t("navOverview")}
        </button>
        <button type="button" tabIndex={-1} data-nav="seo" data-note={t("captionSeo")}>
          {t("navSeo")}
        </button>
        <button type="button" tabIndex={-1} data-nav="aeo" data-note={t("captionAeo")}>
          {t("navAeo")}
        </button>
        <span>{t("navGroupWatch")}</span>
        <button type="button" tabIndex={-1} data-nav="watch" data-note={t("captionWatch")}>
          {t("navWatch")}
        </button>
      </aside>
      <div className="ui-main">
        <header className="ui-head">
          <span>{t("overview")}</span>
          <em>{t("range")}</em>
          <b>{t("sampleBadge")}</b>
        </header>
        <p className="ui-caption" data-caption="">
          {t("captionOverview")}
        </p>
        <div className="ui-kpis">
          {kpis.map((kpi) => (
            <article key={kpi.key} data-watch-kpi={kpi.watch ? "" : undefined}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <em data-up={kpi.up ? "" : undefined}>{kpi.delta}</em>
            </article>
          ))}
        </div>
        <div className="ui-charts">
          <section data-chart="seo">
            <p>{t("chartSeo")}</p>
            <svg viewBox="0 0 280 92" role="img" aria-hidden="true">
              <ChartGrid width={280} height={92} />
              <path data-fill="" fill="#3558f5" d={seriesArea(you, 280, 92, 60)} />
              {rivals.map((rival) => (
                <path
                  key={rival.id}
                  data-line=""
                  data-rival=""
                  fill="none"
                  stroke={rival.color}
                  strokeWidth="1.8"
                  d={seriesPath(rival.values, 280, 92, 60)}
                />
              ))}
              <path data-line="" fill="none" stroke="#3558f5" strokeWidth="2.4" d={seriesPath(you, 280, 92, 60)} />
            </svg>
            <ul>
              <li>
                <i className="is-you" /> {t("you")}
              </li>
              <li>
                <i className="is-rival" /> {t("competitors")}
              </li>
            </ul>
          </section>
          <section data-chart="aeo">
            <p>{t("chartAeo")}</p>
            <svg viewBox="0 0 280 92" role="img" aria-hidden="true">
              <ChartGrid width={280} height={92} />
              {models.map((model) => (
                <path
                  key={model.id}
                  data-line=""
                  fill="none"
                  stroke={model.color}
                  strokeWidth="1.8"
                  d={seriesPath(model.values, 280, 92, 50)}
                />
              ))}
            </svg>
            <ul>
              {models.map((model) => (
                <li key={model.id}>
                  <i style={{ background: model.color }} /> {model.label}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <Pointer />
    </div>
  );
}

function SolutionsBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const root = useRef<HTMLDivElement>(null);
  const teams = [
    { id: "sales", title: t("teamSales"), line: t("teamSalesLine"), agents: [t("agentInbox"), t("agentBrief"), t("agentCrm")] },
    { id: "support", title: t("teamSupport"), line: t("teamSupportLine"), agents: [t("agentDocs"), t("agentReply"), t("agentHand")] },
    { id: "watch", title: t("teamWatch"), line: t("teamWatchLine"), agents: [t("agentScan"), t("agentAlert"), t("agentWatchNote")] },
    { id: "ops", title: t("teamOps"), line: t("teamOpsLine"), agents: [t("agentOpsQ"), t("agentOpsA"), t("agentOpsLog")] }
  ];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-team]");
      const pointer = el.querySelector<HTMLElement>("[data-pointer]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(cards, { autoAlpha: 1 });
      if (!playing || reduced || !pointer) {
        if (pointer) gsap.set(pointer, { autoAlpha: 0 });
        return;
      }
      gsap.set(pointer, { autoAlpha: 1, x: 28, y: 36 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      cards.forEach((card) => {
        tl.to(pointer, { ...pointerXY(el, card), duration: 0.5, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => {
          cards.forEach((item) => item.classList.toggle("is-on", item === card));
        });
        tl.from(card.querySelectorAll("li"), { y: 6, autoAlpha: 0, stagger: 0.08, duration: 0.28, ease: "power3.out" });
        tl.to({}, { duration: 0.95 });
      });
    },
    { scope: root, dependencies: [playing], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="team-board">
      <p className="team-lead">{t("teamsLead")}</p>
      <ol className="team-how">
        <li>{t("how1")}</li>
        <li>{t("how2")}</li>
        <li>{t("how3")}</li>
      </ol>
      <div className="team-grid">
        {teams.map((team, index) => (
          <article key={team.id} data-team={team.id} className={index === 0 ? "is-on" : ""}>
            <h3>{team.title}</h3>
            <p>{team.line}</p>
            <ol>
              {team.agents.map((agent) => (
                <li key={agent}>{agent}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <Pointer />
    </div>
  );
}

function StudioBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const root = useRef<HTMLDivElement>(null);
  const offers = [
    { id: "ads", title: t("offerAds"), line: t("offerAdsLine"), example: t("offerAdsEx") },
    { id: "social", title: t("offerSocial"), line: t("offerSocialLine"), example: t("offerSocialEx") },
    { id: "pages", title: t("offerPages"), line: t("offerPagesLine"), example: t("offerPagesEx") }
  ];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-offer]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(cards, { autoAlpha: 1, y: 0 });
      if (!playing || reduced) return;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, defaults: { ease: "power3.out" } });
      cards.forEach((card) => {
        tl.add(() => {
          cards.forEach((item) => item.classList.toggle("is-on", item === card));
        });
        tl.to({}, { duration: 1.25 });
      });
    },
    { scope: root, dependencies: [playing], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="offer-board">
      <p className="team-lead">{t("studioLead")}</p>
      <p className="studio-how">{t("studioHow")}</p>
      <div className="offer-grid">
        {offers.map((offer, index) => (
          <article key={offer.id} data-offer={offer.id} className={index === 0 ? "is-on" : ""}>
            <em>{t("studioStep", { n: index + 1 })}</em>
            <h3>{offer.title}</h3>
            <p>{offer.line}</p>
            <span>{offer.example}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ServicePreview({ service }: { service: Service }) {
  const viewport = useRef<HTMLDivElement>(null);
  const booted = useRef(false);

  useGSAP(
    () => {
      const root = viewport.current;
      if (!root) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const panes = gsap.utils.toArray<HTMLElement>("[data-pane]");
      panes.forEach((pane) => {
        const on = pane.dataset.pane === service;
        gsap.killTweensOf(pane);
        if (!booted.current || reduced) {
          gsap.set(pane, { autoAlpha: on ? 1 : 0, xPercent: 0, pointerEvents: on ? "auto" : "none" });
          return;
        }
        if (on) {
          gsap.fromTo(
            pane,
            { autoAlpha: 0, xPercent: 10, pointerEvents: "auto" },
            { autoAlpha: 1, xPercent: 0, duration: 0.55, ease: "power3.out", delay: 0.05 }
          );
        } else {
          gsap.to(pane, {
            autoAlpha: 0,
            xPercent: -8,
            pointerEvents: "none",
            duration: 0.22,
            ease: "power2.in"
          });
        }
      });
      booted.current = true;
    },
    { scope: viewport, dependencies: [service], revertOnUpdate: false }
  );

  return (
    <figure className="service-preview" data-service={service} data-arrival-services="">
      <div ref={viewport} className="preview-viewport">
        <div data-pane="analysis" className="preview-pane">
          <AnalysisBoard playing={service === "analysis"} />
        </div>
        <div data-pane="solutions" className="preview-pane">
          <SolutionsBoard playing={service === "solutions"} />
        </div>
        <div data-pane="studio" className="preview-pane">
          <StudioBoard playing={service === "studio"} />
        </div>
      </div>
    </figure>
  );
}
