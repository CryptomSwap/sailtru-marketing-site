"use client";

import { HomeHero } from "../home-v2/home-hero";
import { HomeScanSurface } from "../home-v2/home-scan-surface";
import "../home-v2/home-v2.css";
import "../home-v2/mobile-home.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { workspaceCopy } from "./workspace-copy";
import type { WorkspaceMotion } from "./workspace-scene";

import { HarborJourney } from "./harbor-journey";
import "./business-workspace.css";


function Arrow() { return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>; }
function Mark() { return <svg className="bw-mark" aria-hidden="true" viewBox="0 0 40 40"><path d="m8 31 12-25 12 25-12-6Z" fill="currentColor" /><path d="M20 6v19" stroke="#f6f5ef" strokeWidth="1.5" /></svg>; }

export function BusinessWorkspace({ locale }: { locale: string }) {
  const he = locale === "he", t = workspaceCopy[he ? "he" : "en"];
  const root = useRef<HTMLDivElement>(null), heroArt = useRef<HTMLDivElement>(null);
  const motion = useRef<WorkspaceMotion>({ x: 0, y: 0, scroll: 0 });
  
  const [chapter, setChapter] = useState(0), [step, setStep] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);


  const finding = t.findings[chapter], output = t.outputs[step];

  useEffect(() => {
    const node = root.current, art = heroArt.current;
    if (!node || !art) return;
    const query = matchMedia("(prefers-reduced-motion: reduce)"), fine = matchMedia("(pointer: fine)");
    const target = { x: 0, y: 0 };
    let x = 0, y = 0, frame = 0, previous = 0, heroVisible = true;
    const tick = (time: number) => {
      frame = 0;
      if (document.hidden) return;
      const dt = Math.min((time - (previous || time - 16)) / 1000, .05); previous = time;
      const a = 1 - Math.exp(-dt / .28);
      x += (target.x - x) * a; y += (target.y - y) * a;
      if (query.matches || motionPaused) { x = 0; y = 0; }
      motion.current.x = x; motion.current.y = y;
      node.style.setProperty("--pointer-x", x.toFixed(4)); node.style.setProperty("--pointer-y", y.toFixed(4));
      if (heroVisible) window.dispatchEvent(new Event("sailtru:workspace-frame"));
      if (Math.abs(target.x - x) + Math.abs(target.y - y) > .0005) frame = requestAnimationFrame(tick);
    };
    function wake() { if (!frame && !document.hidden) frame = requestAnimationFrame(tick); }
    const reset = () => { target.x = 0; target.y = 0; wake(); };
    const refresh = () => {
      setEnhanced(!query.matches && !motionPaused);

      if (query.matches || !fine.matches || motionPaused) reset();
      wake();
    };
    const pointer = (event: PointerEvent) => {
      if (query.matches || motionPaused || !fine.matches || event.pointerType === "touch") return;
      target.x = Math.max(-1, Math.min(1, event.clientX / innerWidth * 2 - 1));
      target.y = Math.max(-1, Math.min(1, event.clientY / innerHeight * 2 - 1)); wake();
    };
    const scroll = () => { motion.current.scroll = Math.min(1, Math.max(0, -art.getBoundingClientRect().top / innerHeight)); wake(); };
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; previous = 0; } else reset(); };
    const observer = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; if (heroVisible) wake(); }); observer.observe(art);
    refresh(); window.addEventListener("pointermove", pointer, { passive: true }); window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("blur", reset); document.addEventListener("pointerleave", reset); document.addEventListener("visibilitychange", visibility); query.addEventListener("change", refresh); fine.addEventListener("change", refresh);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("pointermove", pointer); window.removeEventListener("scroll", scroll); window.removeEventListener("blur", reset); document.removeEventListener("pointerleave", reset); document.removeEventListener("visibilitychange", visibility); query.removeEventListener("change", refresh); fine.removeEventListener("change", refresh); };
  }, [motionPaused]);

  return <main id="main-content" className="site-home relative z-10 w-full min-w-0" dir={he ? "rtl" : "ltr"}>
    <div ref={heroArt} id="top"><HomeScanSurface><HomeHero /></HomeScanSurface></div>
    <div ref={root} className="bw">
      <div className="bw-harbor-entry"><a href="#harbor">{he ? "מכאן, למסע של העסק שלכם" : "From here, chart your next move"} ↓</a><button className="bw-motion-toggle" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? (he ? "הפעלת תנועה" : "Enable motion") : (he ? "השהיית תנועה" : "Pause motion")}</button></div>
    <div className="bw-service-strip">{t.strip.map((item, i) => <span key={item}><span aria-hidden="true">{["◎", "⊞", "↗", "✳"][i]}</span>{item}</span>)}</div>
    <HarborJourney he={he} motion={motion} enabled={enhanced}/>
    <section className="bw-intelligence bw-shell" id="intelligence" aria-labelledby="bw-report-heading"><div className="bw-section-heading"><div><p className="bw-kicker">{t.reportKicker}</p><h2 id="bw-report-heading">{t.reportTitle}<em>{t.reportAccent}</em></h2></div><p>{t.reportBody}</p></div>
      <div className="bw-report"><div className="bw-report-top"><span><Mark />{t.reportId}</span><span className="bw-sample"><span className="bw-dot" />{t.sample}</span></div><div className="bw-report-body">
        <aside className="bw-report-sidebar"><span className="bw-mono">{t.exampleBusiness}</span><div className="bw-report-tabs" aria-label={he ? "פרקי הדוח" : "Report chapters"}>{t.tabs.map((label, i) => <button key={label} aria-pressed={chapter === i} aria-controls="bw-finding" className={chapter === i ? "is-active" : ""} onClick={() => setChapter(i)}><span>0{i + 1}</span>{label}<Arrow /></button>)}</div><div className="bw-report-mini" aria-hidden="true"><div className="bw-mini-bars">{[28, 45, 36, 62, 51, 78, 90].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div><span>OBSERVE → UNDERSTAND</span></div></aside>
        <article className="bw-finding" id="bw-finding" aria-live="polite"><div className="bw-finding-title"><p className="bw-kicker">{finding.label}</p><h3>{finding.title}</h3><p>{finding.summary}</p></div><div className="bw-finding-details"><div><span className="bw-detail-number">01</span><h4>{t.evidence}</h4><p>{finding.evidence}</p></div><div className="bw-recommendation"><span className="bw-detail-number">02</span><h4>{t.action}</h4><p>{finding.action}</p></div></div><div className="bw-measure"><span>↗</span><p><b>{t.measure}</b>{finding.measure}</p></div></article>
        <aside className="bw-report-coverage"><p className="bw-kicker">{t.coverage}</p>{finding.rows.map((row, i) => <div key={row}><span>{row}</span><small>{finding.status[i]}</small></div>)}<div className="bw-compass" aria-hidden="true"><i /><i /><Mark /></div></aside></div><div className="bw-report-bottom"><span>{t.note}</span><span>{t.reportFoot}</span></div></div>
      <div className="bw-report-explainer">{t.reportDetails.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}<Link className="bw-text-link" href="/contact">{t.request}<Arrow /></Link></div>
    </section>
    <section className="bw-bridge bw-shell"><div className="bw-bridge-line" aria-hidden="true"><span /><i /><span /></div><h2>{t.bridge}<em>{t.bridgeAccent}</em></h2><p>{t.bridgeBody}</p></section>
    <section className="bw-build" id="implementation" aria-labelledby="bw-build-heading"><div className="bw-shell"><div className="bw-section-heading"><div><p className="bw-kicker">{t.buildKicker}</p><h2 id="bw-build-heading">{t.buildTitle}<em>{t.buildAccent}</em></h2></div><div><p>{t.buildBody}</p><div className="bw-build-tags">{t.buildTags.map(tag => <span key={tag}>✓ {tag}</span>)}</div></div></div>
      <div className="bw-workflow"><div className="bw-workflow-top"><div><p className="bw-kicker">{t.workflow}</p><h3>{t.workflowTitle}</h3></div><span className="bw-sample">{he ? "תהליך להמחשה" : "ILLUSTRATIVE WORKFLOW"}</span></div><div className="bw-workflow-steps" aria-label={he ? "שלבי התהליך לדוגמה" : "Example workflow stages"}>{t.steps.map((label, i) => <button key={label} onClick={() => setStep(i)} aria-pressed={step === i} aria-controls="bw-output" className={`${i <= step ? "is-reached" : ""} ${step === i ? "is-active" : ""}`}><span className="bw-step-icon" aria-hidden="true">{["↘", "▤", "✳", "◎", "↗"][i]}</span><span className="bw-step-name">{label}</span><small>0{i + 1}</small></button>)}</div>
      <div className="bw-workflow-output" id="bw-output" aria-live="polite"><div className="bw-output-explanation"><span className="bw-output-count">0{step + 1}<small> / 05</small></span><h4>{output.title}</h4><p>{output.text}</p></div><div className="bw-output-paper"><span className="bw-kicker"><span className="bw-dot" />{t.outputLabel}</span>{output.lines.map((line, i) => <div key={line}><span aria-hidden="true">{i === 2 ? "↗" : "—"}</span>{line}</div>)}<div className="bw-paper-sign"><Mark /><span>SailTru / {t.steps[step]}</span></div></div></div><p className="bw-workflow-note">{t.workflowNote}</p></div>
      <div className="bw-build-cta"><Link href="/contact" className="bw-button bw-button--light">{t.configure}<Arrow /></Link><p>{t.noReport}</p></div></div></section>
    <section className="bw-services bw-shell" id="services"><div className="bw-section-heading"><div><p className="bw-kicker">{t.servicesKicker}</p><h2>{t.servicesTitle}<em>{t.servicesAccent}</em></h2></div></div><div className="bw-service-grid">{t.services.map((service, i) => <article key={service.n}><span className="bw-service-number">{service.n}<span aria-hidden="true">{["◎", "✳", "↗"][i]}</span></span><h3>{service.title}</h3><p>{service.text}</p><span className="bw-mono">{service.tags}</span></article>)}</div></section>
    <section className="bw-loop bw-shell"><div><p className="bw-kicker">{t.loopKicker}</p><h2>{t.loopTitle}</h2><p>{t.loopBody}</p></div><div className="bw-loop-art"><div className="bw-loop-orbit" aria-hidden="true"><Mark /></div><ol>{t.loop.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}<Arrow /></li>)}</ol></div></section>
    <section className="bw-faq bw-shell"><h2>{t.faqTitle}</h2><div>{t.faqs.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></section>
    <section className="bw-final"><div className="bw-final-rings" aria-hidden="true"><i /><i /><i /></div><div className="bw-shell"><p className="bw-kicker">{t.finalKicker}</p><h2>{t.finalTitle}<em>{t.finalAccent}</em></h2><p>{t.finalBody}</p><div className="bw-actions"><a href="#intelligence" className="bw-button">{t.reportCta}<Arrow /></a><Link href="/contact" className="bw-text-link">{t.buildCta}<Arrow /></Link></div></div></section>
    <footer className="bw-footer bw-shell"><div><Link className="bw-logo" href="/"><Mark /><span>sailtru.</span></Link><p>{t.footer}</p></div><div><Link href="/work">{t.work}</Link><Link href="/contact">{t.contact}</Link><a href="#top">{t.back} ↑</a></div><span className="bw-mono">© 2026 SAILTRU</span></footer>
    </div>
  </main>;
}
