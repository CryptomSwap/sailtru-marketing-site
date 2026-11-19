"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

function DashboardTour() {
  const locale = useLocale();
  const t = useTranslations("companyHero.preview");
  const video = useRef<HTMLVideoElement>(null);
  const requested = useRef<boolean | null>(null);
  const [chapter, setChapter] = useState(0);
  const chapters = t.raw("chapters") as string[];
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    function update() {
      if (!el) return;
      if (visible && !document.hidden && (requested.current ?? !motion.matches)) {
        void el.play().catch(() => {});
      } else el.pause();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.25 });
    observer.observe(el);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      el.pause();
    };
  }, []);

  function toggle() {
    const el = video.current;
    if (!el) return;
    requested.current = el.paused;
    if (el.paused) void el.play().catch(() => {});
    else el.pause();
  }

  return <>
    <video ref={video} muted loop playsInline preload="metadata" width="840" height="478"
      src={`/videos/tours/analysis-${locale}.mp4`} poster={`/videos/tours/analysis-${locale}.webp`}
      onTimeUpdate={event => setChapter(Math.min(2, Math.floor(event.currentTarget.currentTime / 5)))}
      aria-label={t("tourDescription")} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <figcaption className="film-controls">
      <div className="film-chapters">{chapters.map((label, index) =>
        <button key={label} type="button" aria-pressed={chapter === index} onClick={() => {
          if (video.current) {
            video.current.currentTime = index * 5;
            setChapter(index);
          }
        }}>{label}</button>
      )}</div>
      <button className="film-toggle" type="button" onClick={toggle} aria-label={playing ? t("pause") : t("play")}>
        <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
      </button>
    </figcaption>
  </>;
}

export function ServicePreview({ service }: { service: "analysis" | "solutions" | "studio" }) {
  const t = useTranslations("companyHero.preview");
  return (
    <figure className="company-art service-preview" data-arrival-services="">
      <header><strong>Sailtru</strong><span>{t(service)}</span></header>
      {service === "analysis" ? <DashboardTour /> : service === "solutions" ? (
        <div className="workflow-preview">
          <h2>{t("workflowTitle")}</h2>
          <ol>{(["receive", "qualify", "handoff"] as const).map((step, i) =>
            <li key={step}><span className="workflow-index" aria-hidden="true">{i + 1}</span><div><strong>{t(step)}</strong><small>{t(`${step}Detail`)}</small></div></li>
          )}</ol>
        </div>
      ) : (
        <div className="studio-preview">
          <div className="studio-print"><small>NORTHLINE</small><strong>{t("adCopy")}</strong></div>
          <div className="studio-post"><small>{t("social")}</small><strong>{t("postTitle")}</strong><p>{t("postCopy")}</p></div>
        </div>
      )}
    </figure>
  );
}
