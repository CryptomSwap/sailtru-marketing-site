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

function points(values: number[], width: number, height: number, max: number) {
  const step = width / Math.max(values.length - 1, 1);
  return values.map((value, index) => ({
    x: index * step,
    y: height - (value / max) * height
  }));
}

function smoothPath(values: number[], width: number, height: number, max: number) {
  const pts = points(values, width, height, max);
  if (!pts.length) return "";
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

function smoothArea(values: number[], width: number, height: number, max: number) {
  return `${smoothPath(values, width, height, max)} L${width},${height} L0,${height} Z`;
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
  const you = [12, 14, 16, 21, 28, 36, 44, 52];
  const rivals = [
    { id: "a", color: "#16a34a", values: [54, 55, 55, 56, 56, 57, 57, 58] },
    { id: "b", color: "#d97706", values: [38, 39, 41, 40, 42, 43, 44, 45] },
    { id: "c", color: "#e11d48", values: [26, 27, 28, 29, 28, 30, 31, 32] }
  ];
  const models = [
    { id: "gpt", label: t("modelGpt"), color: "#10a37f", values: [18, 22, 26, 31, 36, 42, 48, 54] },
    { id: "gemini", label: t("modelGemini"), color: "#4285f4", values: [14, 16, 18, 21, 24, 27, 30, 33] },
    { id: "perplexity", label: t("modelPerplexity"), color: "#0f766e", values: [8, 9, 11, 12, 14, 15, 17, 18] },
    { id: "claude", label: t("modelClaude"), color: "#c2410c", values: [11, 13, 14, 16, 18, 20, 22, 24] }
  ];
  const kpis = [
    { key: "google", label: t("kpiGoogle"), value: t("kpiGoogleVal"), delta: t("kpiGoogleDelta"), up: true },
    { key: "pos", label: t("kpiPos"), value: t("kpiPosVal"), delta: t("kpiPosDelta"), up: true },
    { key: "ai", label: t("kpiAi"), value: t("kpiAiVal"), delta: t("kpiAiDelta"), up: true },
    { key: "rival", label: t("kpiRival"), value: t("kpiRivalVal"), delta: t("kpiRivalDelta"), up: false, watch: true }
  ];
  const plot = { w: 640, h: 236, max: 64 };
  const youPts = points(you, plot.w, plot.h, plot.max);
  const last = youPts[youPts.length - 1];
  const ticks = ["3 Sep", "12 Sep", "22 Sep", "1 Oct"];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const pointer = el.querySelector<HTMLElement>("[data-pointer]");
      const lines = gsap.utils.toArray<SVGGeometryElement>("[data-line]");
      const fills = gsap.utils.toArray<SVGElement>("[data-fill]");
      const nav = gsap.utils.toArray<HTMLElement>("[data-nav]");
      const cards = gsap.utils.toArray<HTMLElement>(".ui-kpis article");
      const beam = el.querySelector<HTMLElement>("[data-beam]");
      const tip = el.querySelector<HTMLElement>("[data-tip]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const setNav = (id: string) => {
        nav.forEach((item) => item.classList.toggle("is-on", item.dataset.nav === id));
        el.dataset.view = id;
        cards.forEach((card) => {
          const hot =
            (id === "watch" && card.hasAttribute("data-watch-kpi")) ||
            (id === "seo" && card.dataset.key === "google") ||
            (id === "aeo" && card.dataset.key === "ai");
          card.classList.toggle("is-hot", hot);
        });
      };

      setNav("overview");
      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: reduced ? 0 : length });
      });
      gsap.set(fills, { autoAlpha: reduced ? 1 : 0 });
      if (tip) gsap.set(tip, { autoAlpha: reduced ? 1 : 0 });

      if (!playing || reduced || !pointer) {
        if (pointer) gsap.set(pointer, { autoAlpha: 0 });
        return;
      }

      gsap.set(pointer, { autoAlpha: 1, x: rtl ? el.clientWidth - 40 : 28, y: 56, scale: 1 });
      gsap.from(cards, { y: 14, autoAlpha: 0, stagger: 0.05, duration: 0.45, ease: "power3.out" });
      const seo = el.querySelector<HTMLElement>("[data-nav=seo]");
      const aeo = el.querySelector<HTMLElement>("[data-nav=aeo]");
      const watch = el.querySelector<HTMLElement>("[data-nav=watch]");
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
      tl.to(lines, { strokeDashoffset: 0, duration: 1.35, stagger: 0.07, ease: "power2.out" });
      tl.to(fills, { autoAlpha: 1, duration: 0.5 }, 0.45);
      if (beam) {
        tl.fromTo(beam, { xPercent: rtl ? 80 : -20, autoAlpha: 0.7 }, { xPercent: rtl ? -20 : 110, autoAlpha: 0, duration: 1.1, ease: "none" }, 0.2);
      }
      if (tip) {
        tl.to(tip, { autoAlpha: 1, duration: 0.25 }, 1.1);
      }
      if (seo) {
        tl.to(pointer, { ...pointerXY(el, seo), duration: 0.5, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => setNav("seo"));
      }
      tl.to({}, { duration: 0.95 });
      if (aeo) {
        tl.to(pointer, { ...pointerXY(el, aeo), duration: 0.5, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => setNav("aeo"));
      }
      tl.to({}, { duration: 0.95 });
      if (watch) {
        tl.to(pointer, { ...pointerXY(el, watch), duration: 0.5, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => setNav("watch"));
        tl.to("[data-rival]", { strokeWidth: 3, duration: 0.28 });
      }
      tl.to({}, { duration: 1.2 });
      tl.add(() => setNav("overview"));
    },
    { scope: root, dependencies: [playing, rtl], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="ui-dash" data-view="overview" aria-label={t("tourDescription")}>
      <aside className="ui-rail" aria-hidden="true">
        <strong>SailTru</strong>
        <span>{t("navGroupAnalytics")}</span>
        <button type="button" tabIndex={-1} data-nav="overview" className="is-on">
          {t("navOverview")}
        </button>
        <button type="button" tabIndex={-1} data-nav="seo">
          {t("navSeo")}
        </button>
        <button type="button" tabIndex={-1} data-nav="aeo">
          {t("navAeo")}
        </button>
        <span>{t("navGroupWatch")}</span>
        <button type="button" tabIndex={-1} data-nav="watch">
          {t("navWatch")}
        </button>
      </aside>
      <div className="ui-main">
        <header className="ui-head">
          <span>{t("overview")}</span>
          <em>{t("range")}</em>
          <b>{t("sampleBadge")}</b>
        </header>
        <div className="ui-kpis">
          {kpis.map((kpi) => (
            <article key={kpi.key} data-key={kpi.key} data-watch-kpi={kpi.watch ? "" : undefined}>
              <span>{kpi.label}</span>
              <div>
                <strong>{kpi.value}</strong>
                <em data-up={kpi.up ? "" : undefined}>{kpi.delta}</em>
              </div>
            </article>
          ))}
        </div>
        <div className="ui-charts">
          <section data-chart="seo">
            <p>
              {t("chartSeo")} <small>{t("chartSeoHint")}</small>
            </p>
            <div className="ui-plot">
              <i className="ui-beam" data-beam="" />
              <svg viewBox={`0 0 ${plot.w} ${plot.h}`} role="img" aria-hidden="true" shapeRendering="geometricPrecision">
                <defs>
                  <linearGradient id="sailtruYouFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3558f5" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#3558f5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <ChartGrid width={plot.w} height={plot.h} />
                <path data-fill="" fill="url(#sailtruYouFill)" d={smoothArea(you, plot.w, plot.h, plot.max)} />
                {rivals.map((rival) => (
                  <path
                    key={rival.id}
                    data-line=""
                    data-rival=""
                    fill="none"
                    stroke={rival.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={smoothPath(rival.values, plot.w, plot.h, plot.max)}
                  />
                ))}
                <path
                  data-line=""
                  fill="none"
                  stroke="#3558f5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={smoothPath(you, plot.w, plot.h, plot.max)}
                />
                <circle cx={last.x} cy={last.y} r="6" fill="#fff" stroke="#3558f5" strokeWidth="3" />
              </svg>
              <div className="ui-tip" data-tip="" style={{ left: `${(last.x / plot.w) * 100}%`, top: `${(last.y / plot.h) * 100}%` }}>
                <strong>{t("kpiGoogleVal")}</strong>
                <span>{t("you")}</span>
              </div>
              <ol className="ui-ticks" aria-hidden="true">
                {ticks.map((tick) => (
                  <li key={tick}>{tick}</li>
                ))}
              </ol>
            </div>
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
            <p>
              {t("chartAeo")} <small>{t("chartAeoHint")}</small>
            </p>
            <div className="ui-plot">
              <svg viewBox={`0 0 ${plot.w} ${plot.h}`} role="img" aria-hidden="true" shapeRendering="geometricPrecision">
                <ChartGrid width={plot.w} height={plot.h} />
                {models.map((model) => (
                  <path
                    key={model.id}
                    data-line=""
                    fill="none"
                    stroke={model.color}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={smoothPath(model.values, plot.w, plot.h, 60)}
                  />
                ))}
              </svg>
              <ol className="ui-ticks" aria-hidden="true">
                {ticks.map((tick) => (
                  <li key={tick}>{tick}</li>
                ))}
              </ol>
            </div>
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
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
      const packet = el.querySelector<SVGCircleElement>("[data-packet]");
      const path = el.querySelector<SVGGeometryElement>("[data-wire]");
      const pointer = el.querySelector<HTMLElement>("[data-pointer]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const setTeam = (id: string) => {
        const team = teams.find((item) => item.id === id);
        cards.forEach((item) => item.classList.toggle("is-on", item.dataset.team === id));
        nodes.forEach((node, index) => {
          const label = node.querySelector("strong");
          if (label && team) label.textContent = team.agents[index] ?? "";
        });
      };

      setTeam("sales");
      if (!playing || reduced || !pointer) {
        if (pointer) gsap.set(pointer, { autoAlpha: 0 });
        return;
      }

      gsap.set(pointer, { autoAlpha: 1, x: 24, y: 40 });
      const length = path?.getTotalLength() ?? 0;
      if (packet && path) {
        const start = path.getPointAtLength(0);
        gsap.set(packet, { autoAlpha: 1, attr: { cx: start.x, cy: start.y } });
      }
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.45 });
      cards.forEach((card) => {
        tl.to(pointer, { ...pointerXY(el, card), duration: 0.48, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => setTeam(card.dataset.team ?? "sales"));
        nodes.forEach((node, index) => {
          tl.fromTo(node, { scale: 0.92, filter: "brightness(1)" }, { scale: 1, filter: "brightness(1.08)", duration: 0.22, ease: "back.out(2)" }, index === 0 ? ">" : ">-0.05");
        });
        if (packet && path && length) {
          tl.fromTo(
            packet,
            { autoAlpha: 1 },
            {
              duration: 1.15,
              ease: "none",
              onUpdate() {
                const p = path.getPointAtLength(this.progress() * length);
                gsap.set(packet, { attr: { cx: p.x, cy: p.y } });
              }
            },
            "<"
          );
        }
        tl.to({}, { duration: 0.35 });
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
      <div className="team-live">
        <div className="team-flow" aria-hidden="true">
          <svg className="team-wire" viewBox="0 0 520 86">
            <path data-wire="" d="M36 22 C 140 22, 200 22, 260 22 S 380 22, 484 22" fill="none" stroke="#c9d4ff" strokeWidth="4" />
            <circle data-packet="" r="8" cx="36" cy="22" fill="#3558f5" />
          </svg>
          <div className="team-nodes">
            {teams[0].agents.map((agent, index) => (
              <div key={index} className="team-node" data-node="">
                <i />
                <strong>{agent}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="team-grid">
          {teams.map((team, index) => (
            <article key={team.id} data-team={team.id} className={index === 0 ? "is-on" : ""}>
              <h3>{team.title}</h3>
              <p>{team.line}</p>
            </article>
          ))}
        </div>
      </div>
      <Pointer />
    </div>
  );
}

function StudioBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-offer]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const setOffer = (id: string) => {
        el.dataset.offer = id;
        cards.forEach((item) => item.classList.toggle("is-on", item.dataset.offer === id));
      };
      setOffer("ads");
      if (!playing || reduced) return;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
      cards.forEach((card) => {
        tl.add(() => setOffer(card.dataset.offer ?? "ads"));
        tl.to(card, { duration: 1.55 });
      });
    },
    { scope: root, dependencies: [playing], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="offer-board" data-offer="ads">
      <p className="team-lead">{t("studioLead")}</p>
      <p className="studio-how">{t("studioHow")}</p>
      <div className="studio-stage">
        <article data-offer="ads" className="art art--ad is-on">
          <em>{t("offerAds")}</em>
          <strong>{t("adCopy")}</strong>
          <span>{t("offerAdsEx")}</span>
        </article>
        <article data-offer="social" className="art art--social">
          <div className="art-photo" />
          <div className="art-copy">
            <em>{t("offerSocial")}</em>
            <strong>{t("postTitle")}</strong>
            <p>{t("postCopy")}</p>
          </div>
        </article>
        <article data-offer="pages" className="art art--page">
          <div className="art-bar" />
          <em>{t("offerPages")}</em>
          <strong>{t("adCopy")}</strong>
          <span>{t("offerPagesEx")}</span>
        </article>
      </div>
    </div>
  );
}

export function ServicePreview({ service }: { service: Service }) {
  const viewport = useRef<HTMLDivElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const rtl = useLocale() === "he";

  useGSAP(
    () => {
      const root = viewport.current;
      const frame = device.current;
      if (!root) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 761px)").matches;
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
            { autoAlpha: 0, xPercent: rtl ? -6 : 6, pointerEvents: "auto" },
            { autoAlpha: 1, xPercent: 0, duration: 0.5, ease: "power3.out", delay: 0.04 }
          );
        } else {
          gsap.to(pane, {
            autoAlpha: 0,
            xPercent: rtl ? 5 : -5,
            pointerEvents: "none",
            duration: 0.22,
            ease: "power2.in"
          });
        }
      });
      booted.current = true;

      if (frame) {
        gsap.killTweensOf(frame);
        if (desktop && !reduced) {
          const yaw = rtl ? 7 : -7;
          gsap.set(frame, { rotateY: yaw, rotateX: 3.5, y: 0, force3D: true });
          gsap.to(frame, {
            y: -5,
            duration: 3.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            force3D: true
          });
        } else {
          gsap.set(frame, { rotateY: 0, rotateX: 0, y: 0, clearProps: "transform" });
        }
      }
    },
    { scope: viewport, dependencies: [service, rtl], revertOnUpdate: false }
  );

  return (
    <figure className="service-preview" data-service={service} data-arrival-services="">
      <div className="preview-bloom" aria-hidden="true" />
      <div className="preview-rig" ref={device}>
        <div className="preview-device">
          <div className="preview-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>SailTru</span>
          </div>
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
        </div>
      </div>
    </figure>
  );
}
