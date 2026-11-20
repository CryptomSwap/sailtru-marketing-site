"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { VisibilityWorkspace } from "./visibility-workspace";

gsap.registerPlugin(useGSAP);

type Service = "analysis" | "solutions" | "studio";
type Automation = "sales" | "support" | "watch";
type StudioOutput = "video" | "plan";

const automationTypes: Automation[] = ["sales", "support", "watch"];

function SolutionsBoard({ playing }: { playing: boolean }) {
  const hebrew = useLocale() === "he";
  const [testing, setTesting] = useState(false);
  const [selected, setSelected] = useState(1);
  const agents = hebrew ? [
    ["סוכן מחקר", "חברו את הפנייה לפרטי החברה.", "טופס האתר ואתר החברה", "סוכן סינון"],
    ["סוכן סינון", "חלצו גודל צוות ומועד יעד. סמנו תקציב חסר.", "הפנייה וכללי המכירות", "סוכן מסירה"],
    ["סוכן מסירה", "הכינו רשומת עסקה ושאלת המשך לאישור.", "סיכום הפנייה", "טיוטה ב-HubSpot"],
  ] : [
    ["Research agent", "Match the enquiry to the company and collect relevant context.", "Website form and company site", "Qualification agent"],
    ["Qualification agent", "Extract team size and timing. Flag a missing budget.", "Enquiry and sales rules", "Handoff agent"],
    ["Handoff agent", "Draft a deal and a follow-up question for the sales owner.", "Qualified enquiry", "HubSpot draft"],
  ];
  const agent = agents[selected];
  return <div className="automation-app">
    <header className="automation-topbar">
      <strong>Sailtru</strong>
      <span>{hebrew ? "צוות קליטת פניות · סביבת דוגמה" : "Sales intake team · Sample workspace"}</span>
      <button type="button" onClick={() => setTesting(!testing)} style={{color:"white",border:"1px solid #838bb0",borderRadius:8,padding:".4rem .65rem"}}>
        {testing ? (hebrew ? "חזרה לתכנון" : "Back to design") : (hebrew ? "הרצת דוגמה" : "Run sample")}
      </button>
    </header>
    {testing ? <SampleRunBoard playing={playing} /> : <div className="automation-body">
      <nav className="automation-picker" aria-label={hebrew ? "סוכנים" : "Agent roles"}>
        <span>{hebrew ? "תכנון הצוות" : "Team design"}</span>
        {agents.map(([name], index) => <button key={name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><i/><strong>{name}</strong></button>)}
      </nav>
      <section className="automation-workspace">
        <header><div><span>{hebrew ? "הגדרות הסוכן" : "Agent configuration"}</span><h2>{agent[0]}</h2></div></header>
        <aside className="agent-output" key={agent[0]}>
          <span>{hebrew ? "הוראות" : "Instructions"}</span><h3>{agent[1]}</h3>
          <dl><div><dt>{hebrew ? "מקורות" : "Reads from"}</dt><dd>{agent[2]}</dd></div><div><dt>{hebrew ? "יעד" : "Hands off to"}</dt><dd>{agent[3]}</dd></div></dl>
          <small>{hebrew ? "איש המכירות בודק את הטיוטה לפני עדכון ה-CRM." : "The sales owner reviews the draft before the CRM is updated."}</small>
        </aside>
      </section>
    </div>}
  </div>;
}

function SampleRunBoard({ playing }: { playing: boolean }) {
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
      if (service === "analysis") {
        gsap.set(frame, { clearProps: "transform" });
      } else if (desktop && !reduced && !pauseMotion) {
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
              <VisibilityWorkspace />
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

