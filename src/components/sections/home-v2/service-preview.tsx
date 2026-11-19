"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP);

type Service = "analysis" | "solutions" | "studio";
type AnalysisView = "overview" | "answers" | "competitors" | "priorities";
type Automation = "sales" | "support" | "watch";
type StudioOutput = "video" | "plan";

const analysisViews: AnalysisView[] = ["overview", "answers", "competitors", "priorities"];

function LineChart() {
  return (
    <svg className="product-chart" viewBox="0 0 620 190" role="img" aria-label="Visibility trend">
      <defs>
        <linearGradient id="visibility-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5470ff" stopOpacity=".26" />
          <stop offset="100%" stopColor="#5470ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[28, 76, 124, 172].map((y) => <line key={y} x1="0" x2="620" y1={y} y2={y} className="chart-gridline" />)}
      <path className="chart-fill" d="M0 169 C70 165 108 151 155 152 S248 146 300 121 S402 113 456 86 S550 78 620 41 L620 190 L0 190 Z" />
      <path data-chart-line="" className="chart-line" d="M0 169 C70 165 108 151 155 152 S248 146 300 121 S402 113 456 86 S550 78 620 41" />
      <path className="chart-rival" d="M0 72 C110 69 190 76 278 65 S452 72 620 58" />
      <circle cx="620" cy="41" r="7" className="chart-dot" />
    </svg>
  );
}

function AnalysisOverview() {
  const t = useTranslations("companyHero.preview");
  return <div className="analysis-screen analysis-overview" data-analysis-screen="overview">
    <div className="metric-strip">
      <article><span>{t("visibilityScore")}</span><strong>42</strong><em>+7</em></article>
      <article><span>{t("aiMentions")}</span><strong>9%</strong><em>+1.4</em></article>
      <article><span>{t("searchPosition")}</span><strong>14.2</strong><em>−0.8</em></article>
    </div>
    <div className="analysis-grid">
      <section className="trend-card">
        <header><div><strong>{t("visibilityTrend")}</strong><span>{t("youVsMarket")}</span></div><b>{t("last30Days")}</b></header>
        <LineChart />
        <footer><span><i className="legend-you" />{t("you")}</span><span><i className="legend-market" />{t("marketLeader")}</span></footer>
      </section>
      <aside className="opportunity-stack">
        <header><strong>{t("topOpportunities")}</strong><span>3 {t("found")}</span></header>
        <article><b>01</b><div><strong>{t("officeGap")}</strong><span>{t("highImpact")}</span></div></article>
        <article><b>02</b><div><strong>{t("aiDescriptionGap")}</strong><span>{t("mediumImpact")}</span></div></article>
        <article><b>03</b><div><strong>{t("competitorProofGap")}</strong><span>{t("mediumImpact")}</span></div></article>
      </aside>
    </div>
  </div>;
}

function AnalysisAnswers() {
  const t = useTranslations("companyHero.preview");
  return <div className="analysis-screen answer-screen" data-analysis-screen="answers">
    <header className="screen-title"><div><strong>{t("answerCoverage")}</strong><span>{t("answerCoverageLine")}</span></div><b>9 / 40</b></header>
    <div className="answer-layout">
      <section className="model-coverage">
        {[{ name: "ChatGPT", score: 31 }, { name: "Gemini", score: 24 }, { name: "Perplexity", score: 18 }, { name: "Claude", score: 14 }].map((model) => <article key={model.name}><div><strong>{model.name}</strong><span>{model.score}%</span></div><i><span style={{ width: `${model.score}%` }} /></i></article>)}
      </section>
      <section className="prompt-results">
        <header><span>{t("testedPrompt")}</span><span>{t("result")}</span></header>
        <article><strong>{t("promptOffice")}</strong><em data-state="missing">{t("notNamed")}</em></article>
        <article><strong>{t("promptBest")}</strong><em data-state="wrong">{t("wrongCategory")}</em></article>
        <article><strong>{t("promptResidential")}</strong><em data-state="visible">{t("visible")}</em></article>
      </section>
    </div>
    <div className="recommended-action"><span>{t("recommendedAction")}</span><strong>{t("answerRecommendation")}</strong></div>
  </div>;
}

function AnalysisCompetitors() {
  const t = useTranslations("companyHero.preview");
  const rivals = [{ name: "Apex Studio", score: 82, mentions: 34 }, { name: "Forma", score: 67, mentions: 27 }, { name: t("yourCompany"), score: 42, mentions: 9 }, { name: "North & Co.", score: 35, mentions: 7 }];
  return <div className="analysis-screen competitor-screen" data-analysis-screen="competitors">
    <header className="screen-title"><div><strong>{t("competitorBenchmark")}</strong><span>{t("competitorBenchmarkLine")}</span></div><b>4 {t("tracked")}</b></header>
    <div className="competitor-table">
      <header><span>{t("company")}</span><span>{t("visibility")}</span><span>{t("aiMentions")}</span></header>
      {rivals.map((rival, index) => <article key={rival.name} data-you={index === 2 ? "" : undefined}><div><b>{index + 1}</b><strong>{rival.name}</strong></div><div className="rank-bar"><i><span style={{ width: `${rival.score}%` }} /></i><em>{rival.score}</em></div><span>{rival.mentions}</span></article>)}
    </div>
    <div className="gap-callout"><span>{t("whyTheyLead")}</span><strong>{t("competitorLeadReason")}</strong><p>{t("competitorLeadAction")}</p></div>
  </div>;
}

function AnalysisPriorities() {
  const t = useTranslations("companyHero.preview");
  const priorities = [["P1", "officeGap", "highImpact", "lowEffort"], ["P2", "answerDescription", "highImpact", "mediumEffort"], ["P3", "proofGap", "mediumImpact", "mediumEffort"]] as const;
  return <div className="analysis-screen priorities-screen" data-analysis-screen="priorities">
    <header className="screen-title"><div><strong>{t("priorityPlan")}</strong><span>{t("priorityPlanLine")}</span></div><b>{t("readyToBuild")}</b></header>
    <div className="priority-list">{priorities.map(([id, title, impact, effort], index) => <article key={id}>
      <div className="priority-rank"><b>{id}</b><i>{index + 1}</i></div><div><strong>{t(title)}</strong><p>{t(`${title}Action`)}</p></div>
      <dl><div><dt>{t("impact")}</dt><dd>{t(impact)}</dd></div><div><dt>{t("effort")}</dt><dd>{t(effort)}</dd></div></dl>
    </article>)}</div>
  </div>;
}

function AnalysisBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const rtl = useLocale() === "he";
  const root = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<AnalysisView>("overview");
  const manual = useRef(false);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const screen = el.querySelector<HTMLElement>("[data-analysis-screen]");
    gsap.fromTo(screen, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: reduced ? 0 : .42, ease: "power3.out" });
    if (view === "overview" && !reduced) {
      const line = el.querySelector<SVGPathElement>("[data-chart-line]");
      if (line) { const length = line.getTotalLength(); gsap.fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.25, ease: "power2.out" }); }
      gsap.from(".metric-strip article, .opportunity-stack article", { autoAlpha: 0, y: 9, stagger: .07, duration: .38 });
    }
  }, { scope: root, dependencies: [view] });

  useEffect(() => {
    if (!playing || manual.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    const timer = window.setInterval(() => { index = (index + 1) % analysisViews.length; setView(analysisViews[index]); }, 3600);
    return () => window.clearInterval(timer);
  }, [playing]);

  function selectView(next: AnalysisView) { manual.current = true; setView(next); }

  return <div ref={root} className="analysis-app" dir={rtl ? "rtl" : "ltr"}>
    <aside className="product-sidebar">
      <div className="product-mark"><i />Sailtru</div><span>{t("workspace")}</span>
      {analysisViews.map((item) => <button key={item} type="button" aria-current={view === item ? "page" : undefined} onClick={() => selectView(item)}><i className={`nav-icon nav-icon--${item}`} aria-hidden="true" /><span>{t(`analysisNav.${item}`)}</span></button>)}
      <footer><i />{t("monitoringActive")}</footer>
    </aside>
    <main className="product-main">
      <header className="product-topbar"><div><strong>example.studio</strong><span>{t("lastScan")}</span></div><button type="button">{t("exportReport")}</button></header>
      <div className="screen-shell" key={view}>{view === "overview" && <AnalysisOverview />}{view === "answers" && <AnalysisAnswers />}{view === "competitors" && <AnalysisCompetitors />}{view === "priorities" && <AnalysisPriorities />}</div>
    </main>
  </div>;
}

const automationTypes: Automation[] = ["sales", "support", "watch"];

function SolutionsBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const [automation, setAutomation] = useState<Automation>("sales");
  const [step, setStep] = useState(0);
  const steps = t.raw(`automations.${automation}.steps`) as { title: string; detail: string }[];

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % steps.length), 1500);
    return () => window.clearInterval(timer);
  }, [automation, playing, steps.length]);

  return <div className="automation-app">
    <header className="automation-topbar"><div className="product-mark product-mark--dark"><i />Sailtru</div><span>{t("agentSystem")}</span><b><i />{t("live")}</b></header>
    <div className="automation-body">
      <nav className="automation-picker" aria-label={t("chooseSystem")}><span>{t("systemsWeCanBuild")}</span>
        {automationTypes.map((item) => <button type="button" key={item} aria-pressed={automation === item} onClick={() => { setAutomation(item); setStep(0); }}><i /><div><strong>{t(`automations.${item}.label`)}</strong><small>{t(`automations.${item}.caption`)}</small></div></button>)}
      </nav>
      <main className="automation-workspace">
        <header><div><span>{t("runningNow")}</span><h2>{t(`automations.${automation}.title`)}</h2></div><div className="tool-pills"><i>{t(`automations.${automation}.source`)}</i><span>+</span><i>{t(`automations.${automation}.destination`)}</i></div></header>
        <div className="automation-canvas">
          <section className="agent-run">{steps.map((item, index) => <article key={item.title} data-active={step === index ? "" : undefined} data-complete={step > index ? "" : undefined}>
            <div className="agent-step-state"><i>{step > index ? "✓" : index + 1}</i><span /></div><div><strong>{item.title}</strong><p>{item.detail}</p></div>{step === index && <em>{t("working")}</em>}
          </article>)}</section>
          <aside className="agent-output" key={automation}><span>{t("draftOutput")}</span><h3>{t(`automations.${automation}.outputTitle`)}</h3><p>{t(`automations.${automation}.outputBody`)}</p>
            <dl><div><dt>{t("confidence")}</dt><dd>94%</dd></div><div><dt>{t("sources")}</dt><dd>{t(`automations.${automation}.sourceCount`)}</dd></div></dl>
            <button type="button">{t("approveAndSend")}</button><small>{t("humanApproval")}</small>
          </aside>
        </div>
      </main>
    </div>
  </div>;
}

function StudioBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const [output, setOutput] = useState<StudioOutput>("video");
  const [agentStep, setAgentStep] = useState(0);
  const posts = t.raw("postPlan") as { day: string; format: string; title: string }[];
  const agentSteps = t.raw("studioAgentSteps") as string[];

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setAgentStep((value) => (value + 1) % agentSteps.length), 1600);
    return () => window.clearInterval(timer);
  }, [agentSteps.length, playing]);

  return <div className="studio-app">
    <header className="studio-topbar"><div className="product-mark product-mark--cream"><i />Sailtru Studio</div><b><i />{t("agentActive")}</b></header>
    <div className="studio-body">
      <aside className="studio-agent-panel"><span>{t("yourCampaignAgent")}</span><h2>{t("agentLearningTitle")}</h2>
        <div className="studio-sources">
          <article><i className="source-icon source-icon--site" /><div><strong>{t("websiteScan")}</strong><small>example.studio</small></div><b>✓</b></article>
          <article><i className="source-icon source-icon--social" /><div><strong>{t("socialProfiles")}</strong><small dir="ltr">@example.studio</small></div><b>✓</b></article>
          <article><i className="source-icon source-icon--rivals" /><div><strong>{t("competitorResearch")}</strong><small>{t("threeCompetitors")}</small></div><b>✓</b></article>
        </div>
        <ol className="studio-agent-steps">{agentSteps.map((item, index) => <li key={item} data-active={agentStep === index ? "" : undefined} data-complete={agentStep > index ? "" : undefined}><i>{agentStep > index ? "✓" : index + 1}</i><span>{item}</span></li>)}</ol>
      </aside>
      <main className="studio-workspace">
        <header><div><span>{t("campaignWorkspace")}</span><h2>Northline · {t("springCampaign")}</h2></div><nav aria-label={t("outputChoice")}>{(["video", "plan"] as StudioOutput[]).map((item) => <button type="button" key={item} aria-pressed={output === item} onClick={() => setOutput(item)}>{t(item === "video" ? "videoChoice" : "planChoice")}</button>)}</nav></header>
        <div className="studio-result" key={output}>
          {output === "video" ? <div className="video-result">{playing ? (
            <video controls playsInline muted preload="metadata" poster="/videos/tours/northline-poster.webp" src="/videos/tours/northline-ad.mp4" aria-label={t("videoChoice")} />
          ) : (
            <img className="video-poster" src="/videos/tours/northline-poster.webp" alt="" />
          )}
            <section><span>{t("agentDecision")}</span><h3>{t("adCopy")}</h3><p>{t("adRationale")}</p><dl><div><dt>{t("format")}</dt><dd>4:5 · 8s</dd></div><div><dt>{t("channel")}</dt><dd>Meta</dd></div></dl></section></div>
          : <div className="calendar-result"><header><span>{t("weekTitle")}</span><b>{t("readyForReview")}</b></header>{posts.map((post, index) => <article key={post.day}><time>{post.day}</time><div><small>{post.format}</small><strong>{post.title}</strong><span>{t(`postGoals.${index}`)}</span></div><i>{index === 0 ? "▣" : index === 1 ? "Aa" : "▶"}</i></article>)}</div>}
        </div>
      </main>
    </div>
  </div>;
}

export function ServicePreview({ service, pauseMotion = false }: { service: Service; pauseMotion?: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const rtl = useLocale() === "he";

  useGSAP(() => {
    const root = viewport.current;
    const frame = device.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 761px)").matches;
    const panes = gsap.utils.toArray<HTMLElement>("[data-pane]");
    panes.forEach((pane) => {
      const on = pane.dataset.pane === service;
      gsap.killTweensOf(pane);
      if (!booted.current || reduced) gsap.set(pane, { autoAlpha: on ? 1 : 0, xPercent: 0, pointerEvents: on ? "auto" : "none" });
      else if (on) gsap.fromTo(pane, { autoAlpha: 0, xPercent: rtl ? -5 : 5, scale: .985, pointerEvents: "auto" }, { autoAlpha: 1, xPercent: 0, scale: 1, duration: .52, ease: "power3.out", delay: .06 });
      else gsap.to(pane, { autoAlpha: 0, xPercent: rtl ? 4 : -4, scale: .99, pointerEvents: "none", duration: .22, ease: "power2.in" });
    });
    booted.current = true;
    if (frame) {
      gsap.killTweensOf(frame);
      if (desktop && !reduced && !pauseMotion) {
        gsap.set(frame, { rotateY: rtl ? 3.5 : -3.5, rotateX: 1.5, y: 0, force3D: true });
        gsap.to(frame, { y: -4, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut", force3D: true });
      } else if (desktop && !reduced && pauseMotion) {
        gsap.set(frame, { rotateY: rtl ? 3.5 : -3.5, rotateX: 1.5, y: 0, force3D: true });
      } else {
        gsap.set(frame, { rotateY: 0, rotateX: 0, y: 0, clearProps: "transform" });
      }
    }
  }, { scope: viewport, dependencies: [service, rtl, pauseMotion], revertOnUpdate: false });

  const motionOn = (pane: Service) => service === pane && !pauseMotion;

  return (
    <figure className="service-preview service-preview--product" data-service={service} data-arrival-services="">
      <div className="preview-bloom" aria-hidden="true" />
      <div className="preview-rig" ref={device}>
        <div className="preview-device product-device">
          <div className="preview-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>Sailtru</span>
            <b>app.sailtru.com</b>
          </div>
          <div ref={viewport} className="preview-viewport product-viewport">
            <div data-pane="analysis" inert={service !== "analysis"} aria-hidden={service !== "analysis"} className="preview-pane">
              <AnalysisBoard playing={motionOn("analysis")} />
            </div>
            <div data-pane="solutions" inert={service !== "solutions"} aria-hidden={service !== "solutions"} className="preview-pane">
              <SolutionsBoard playing={motionOn("solutions")} />
            </div>
            <div data-pane="studio" inert={service !== "studio"} aria-hidden={service !== "studio"} className="preview-pane">
              <StudioBoard playing={motionOn("studio")} />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
