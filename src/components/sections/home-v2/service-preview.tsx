"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP);

type Service = "analysis" | "solutions" | "studio";

function AnalysisBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const rtl = useLocale() === "he";
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set("[data-tour=rows] li", { autoAlpha: 0.4, x: 0 });
      gsap.set("[data-tour=rows] li:first-child", { autoAlpha: 1 });
      gsap.set("[data-tour=detail]", { autoAlpha: reduced ? 1 : 0, y: reduced ? 0 : 16 });
      gsap.set("[data-tour=action]", { autoAlpha: reduced ? 1 : 0, y: reduced ? 0 : 10 });
      if (!playing || reduced) return;

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.8,
        defaults: { ease: "power3.out" }
      });
      tl.fromTo(
        "[data-tour=scan]",
        { scaleX: 0, transformOrigin: rtl ? "100% 50%" : "0% 50%" },
        { scaleX: 1, duration: 0.7 }
      )
        .to("[data-tour=rows] li:first-child", { autoAlpha: 1, duration: 0.2 }, "<0.15")
        .fromTo("[data-tour=detail]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo("[data-tour=action]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.12")
        .to({}, { duration: 2.6 });
    },
    { scope: root, dependencies: [playing, rtl], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="analysis-board">
      <ol data-tour="rows">
        <li className="is-live">
          <span>{t("findingId")}</span>
          <strong>{t("findingTitle")}</strong>
          <em>{t("findingArea")}</em>
        </li>
        <li>
          <span>F02</span>
          <strong>{t("findingTwo")}</strong>
          <em>{t("findingAreaAi")}</em>
        </li>
        <li>
          <span>F03</span>
          <strong>{t("findingThree")}</strong>
          <em>{t("findingAreaMarket")}</em>
        </li>
      </ol>
      <div className="analysis-detail">
        <p data-tour="detail">{t("findingEvidence")}</p>
        <div data-tour="action" className="analysis-action">
          <span>{t("actionLabel")}</span>
          <strong>{t("findingAction")}</strong>
        </div>
        <i data-tour="scan" aria-hidden="true" />
      </div>
    </div>
  );
}

function SolutionsBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const root = useRef<HTMLDivElement>(null);
  const steps = [
    { id: "receive" as const, from: "form" },
    { id: "qualify" as const, from: "brief" },
    { id: "handoff" as const, from: "crm" }
  ];

  useGSAP(
    () => {
      if (!playing) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set("[data-step]", { autoAlpha: 1 });
        gsap.set("[data-bead]", { autoAlpha: 0 });
        return;
      }
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      gsap.set(items, { autoAlpha: 0.38, y: 10 });
      const origin = items[0]?.offsetTop ?? 0;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7, defaults: { ease: "power3.out" } });
      items.forEach((item, i) => {
        tl.to(item, { autoAlpha: 1, y: 0, duration: 0.42 }, i === 0 ? 0 : "+=0.12");
        tl.to("[data-bead]", { y: item.offsetTop - origin, duration: 0.42, ease: "power2.inOut" }, "<");
      });
      tl.to({}, { duration: 1.6 });
    },
    { scope: root, dependencies: [playing], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="workflow-board">
      <p className="workflow-board__title">{t("workflowTitle")}</p>
      <div className="workflow-rail" aria-hidden="true">
        <span data-bead="" />
      </div>
      <ol>
        {steps.map((step, i) => (
          <li key={step.id} data-step={step.id}>
            <span className="workflow-glyph" data-kind={step.from} aria-hidden="true" />
            <div>
              <strong>{t(step.id)}</strong>
              <small>{t(`${step.id}Detail`)}</small>
            </div>
            <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StudioBoard() {
  const t = useTranslations("companyHero.preview");
  return (
    <div className="studio-board">
      <article className="studio-print">
        <small>Northline</small>
        <strong>{t("adCopy")}</strong>
      </article>
      <article className="studio-post">
        <div className="studio-post__photo" aria-hidden="true" />
        <small>{t("social")}</small>
        <strong>{t("postTitle")}</strong>
        <p>{t("postCopy")}</p>
      </article>
    </div>
  );
}

export function ServicePreview({ service }: { service: Service }) {
  const t = useTranslations("companyHero.preview");
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
      <figcaption>
        <strong>SailTru</strong>
        <span>{t(service)}</span>
      </figcaption>
      <div ref={viewport} className="preview-viewport">
        <div data-pane="analysis" className="preview-pane">
          <AnalysisBoard playing={service === "analysis"} />
        </div>
        <div data-pane="solutions" className="preview-pane">
          <SolutionsBoard playing={service === "solutions"} />
        </div>
        <div data-pane="studio" className="preview-pane">
          <StudioBoard />
        </div>
      </div>
    </figure>
  );
}
