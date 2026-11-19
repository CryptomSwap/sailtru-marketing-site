"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP);

type Service = "analysis" | "solutions" | "studio";

type Finding = {
  id: string;
  area: string;
  observed: string;
  action: string;
};

type Preview = { before: string; after: string };

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

function AnalysisBoard({ playing }: { playing: boolean }) {
  const s = useTranslations("harbor.sample");
  const fields = useTranslations("harbor.report.fields");
  const t = useTranslations("companyHero.preview");
  const rtl = useLocale() === "he";
  const root = useRef<HTMLDivElement>(null);
  const findings = useTranslations("harbor.report").raw("findings") as Finding[];
  const titles = s.raw("findingTitles") as string[];
  const previews = s.raw("previews") as Preview[];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const pointer = el.querySelector<HTMLElement>("[data-pointer]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-find]");
      const title = el.querySelector<HTMLElement>("[data-dash=title]");
      const observed = el.querySelector<HTMLElement>("[data-dash=observed]");
      const before = el.querySelector<HTMLElement>("[data-dash=before]");
      const after = el.querySelector<HTMLElement>("[data-dash=after]");
      const action = el.querySelector<HTMLElement>("[data-dash=action]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const paint = (index: number) => {
        rows.forEach((row, i) => row.classList.toggle("is-active", i === index));
        if (title) title.textContent = titles[index];
        if (observed) observed.textContent = findings[index].observed;
        if (before) before.textContent = previews[index].before;
        if (after) after.textContent = previews[index].after;
        if (action) action.textContent = findings[index].action;
      };

      paint(0);
      if (!pointer) return;
      if (!playing || reduced) {
        gsap.set(pointer, { autoAlpha: 0 });
        return;
      }

      gsap.set(pointer, { autoAlpha: 1, x: rtl ? el.clientWidth - 48 : 28, y: 36, scale: 1 });
      const detail = el.querySelector<HTMLElement>("[data-dash=detail]");
      const actionBtn = el.querySelector<HTMLElement>("[data-dash=action-wrap]");
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.55 });

      const visit = (index: number) => {
        const row = rows[index];
        if (row) tl.to(pointer, { ...pointerXY(el, row), duration: 0.65, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => {
          paint(index);
        });
        if (detail) tl.fromTo(detail, { autoAlpha: 0.55, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" });
        if (actionBtn) {
          tl.to(pointer, { ...pointerXY(el, actionBtn), duration: 0.55, ease: "power2.inOut" });
          clickPointer(pointer, tl);
          tl.to(actionBtn, { scale: 0.985, duration: 0.1 }).to(actionBtn, { scale: 1, duration: 0.18 });
        }
        tl.to({}, { duration: 1.05 });
      };

      visit(0);
      visit(1);
      visit(2);
    },
    { scope: root, dependencies: [playing, rtl], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="dash-app" aria-label={t("tourDescription")}>
      <header className="dash-chrome">
        <span className="dash-dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span>{s("workspaceLabel")}</span>
        <em>{s("preparedFor")}</em>
      </header>
      <div className="dash-body">
        <nav className="dash-list" aria-hidden="true">
          {findings.map((finding, index) => (
            <button key={finding.id} type="button" tabIndex={-1} data-find={index} className={index === 0 ? "is-active" : undefined}>
              <span>{finding.id}</span>
              <strong>{titles[index]}</strong>
              <small>{finding.area}</small>
            </button>
          ))}
        </nav>
        <div className="dash-main" data-dash="detail">
          <p className="dash-kicker">{s("findingLabel")}</p>
          <h2 data-dash="title">{titles[0]}</h2>
          <p data-dash="observed">{findings[0].observed}</p>
          <div className="dash-split">
            <div>
              <span>{s("today")}</span>
              <p data-dash="before">{previews[0].before}</p>
            </div>
            <div>
              <span>{s("proposed")}</span>
              <p data-dash="after">{previews[0].after}</p>
            </div>
          </div>
          <div className="dash-cta" data-dash="action-wrap">
            <span>{fields("action")}</span>
            <strong data-dash="action">{findings[0].action}</strong>
          </div>
        </div>
      </div>
      <Pointer />
    </div>
  );
}

function SolutionsBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const pointer = el.querySelector<HTMLElement>("[data-pointer]");
      const scenes = gsap.utils.toArray<HTMLElement>("[data-scene]");
      const typed = el.querySelector<HTMLElement>("[data-typed]");
      const request = el.querySelector<HTMLElement>("[data-request]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const company = t("typedCompany");
      const need = t("typedRequest");

      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(scenes[0], { autoAlpha: 1 });
      if (typed) typed.textContent = reduced ? company : "";
      if (request) request.textContent = reduced ? need : "";
      if (!playing || reduced || !pointer) {
        gsap.set(pointer, { autoAlpha: 0 });
        gsap.set(scenes, { autoAlpha: 1, x: 0 });
        return;
      }

      gsap.set(pointer, { autoAlpha: 1, x: 40, y: 64, scale: 1 });
      const field = el.querySelector<HTMLElement>("[data-field=company]");
      const next = el.querySelector<HTMLElement>("[data-next]");
      const approve = el.querySelector<HTMLElement>("[data-approve]");
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      const typeInto = (node: HTMLElement | null, text: string) => {
        if (!node) return;
        const state = { i: 0 };
        tl.to(state, {
          i: text.length,
          duration: Math.min(1.6, text.length * 0.045),
          ease: "none",
          onUpdate: () => {
            node.textContent = text.slice(0, Math.round(state.i));
          }
        });
      };

      if (field) {
        tl.to(pointer, { ...pointerXY(el, field), duration: 0.5, ease: "power2.inOut" });
        clickPointer(pointer, tl);
      }
      typeInto(typed, company);
      typeInto(request, need);
      if (next) {
        tl.to(pointer, { ...pointerXY(el, next), duration: 0.45, ease: "power2.inOut" });
        clickPointer(pointer, tl);
      }
      tl.to(scenes[0], { autoAlpha: 0, x: -24, duration: 0.32, ease: "power2.in" });
      tl.fromTo(scenes[1], { autoAlpha: 0, x: 28 }, { autoAlpha: 1, x: 0, duration: 0.42, ease: "power3.out" }, "<0.12");
      tl.to({}, { duration: 1.2 });
      const continueBtn = el.querySelector<HTMLElement>("[data-continue]");
      if (continueBtn) {
        tl.to(pointer, { ...pointerXY(el, continueBtn), duration: 0.4, ease: "power2.inOut" });
        clickPointer(pointer, tl);
      }
      tl.to(scenes[1], { autoAlpha: 0, x: -24, duration: 0.32, ease: "power2.in" });
      tl.fromTo(scenes[2], { autoAlpha: 0, x: 28 }, { autoAlpha: 1, x: 0, duration: 0.42, ease: "power3.out" }, "<0.12");
      if (approve) {
        tl.set(approve, { backgroundColor: "#fff", color: "#152f85" });
        tl.to(pointer, { ...pointerXY(el, approve), duration: 0.45, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.to(approve, { backgroundColor: "#3154da", color: "#fff", duration: 0.2 });
      }
      tl.to({}, { duration: 1.4 });
      tl.add(() => {
        if (typed) typed.textContent = "";
        if (request) request.textContent = "";
      });
    },
    { scope: root, dependencies: [playing], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="flow-app">
      <div data-scene="form" className="flow-scene">
        <p className="flow-title">{t("receive")}</p>
        <label data-field="company">
          {t("formCompany")}
          <span data-typed="" className="flow-input" />
        </label>
        <label>
          {t("formNeed")}
          <span data-request="" className="flow-input flow-input--tall" />
        </label>
        <button type="button" tabIndex={-1} data-next="" className="flow-next">
          {t("qualify")}
        </button>
      </div>
      <div data-scene="brief" className="flow-scene">
        <p className="flow-title">{t("qualify")}</p>
        <p>{t("qualifyDetail")}</p>
        <dl className="flow-card">
          <div>
            <dt>{t("formCompany")}</dt>
            <dd>{t("typedCompany")}</dd>
          </div>
          <div>
            <dt>{t("formNeed")}</dt>
            <dd>{t("typedRequest")}</dd>
          </div>
        </dl>
        <p className="flow-flag">{t("missing")}</p>
        <button type="button" tabIndex={-1} data-continue="" className="flow-next">
          {t("handoff")}
        </button>
      </div>
      <div data-scene="crm" className="flow-scene">
        <p className="flow-title">{t("handoff")}</p>
        <dl className="flow-card">
          <div>
            <dt>{t("formCompany")}</dt>
            <dd>{t("typedCompany")}</dd>
          </div>
          <div>
            <dt>{t("crmDeal")}</dt>
            <dd>{t("handoffDetail")}</dd>
          </div>
        </dl>
        <button type="button" tabIndex={-1} data-approve="" className="flow-next">
          {t("approve")}
        </button>
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
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const line = el.querySelector<HTMLElement>("[data-line]");
      const post = el.querySelector<HTMLElement>("[data-post]");
      const share = el.querySelector<HTMLElement>("[data-share]");
      const pointer = el.querySelector<HTMLElement>("[data-pointer]");
      if (!playing || reduced) {
        gsap.set([line, post, share, pointer], { clearProps: "all" });
        if (pointer) gsap.set(pointer, { autoAlpha: 0 });
        return;
      }
      if (pointer) gsap.set(pointer, { autoAlpha: 1, x: 80, y: 90 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7, defaults: { ease: "power3.out" } });
      if (line) tl.fromTo(line, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, 0);
      if (post) tl.fromTo(post, { xPercent: 16, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.65 }, 0.55);
      if (share && pointer) {
        tl.set(share, { backgroundColor: "#fff", color: "#152f85" });
        tl.to(pointer, { ...pointerXY(el, share), duration: 0.55, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.to(share, { backgroundColor: "#3154da", color: "#fff", duration: 0.2 });
      }
      tl.to({}, { duration: 1.6 });
    },
    { scope: root, dependencies: [playing], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="studio-board">
      <article className="studio-print" data-print="">
        <small>Northline</small>
        <strong data-line="">{t("adCopy")}</strong>
      </article>
      <article className="studio-post" data-post="">
        <div className="studio-post__photo" aria-hidden="true" />
        <small>{t("social")}</small>
        <strong>{t("postTitle")}</strong>
        <p>{t("postCopy")}</p>
        <button type="button" tabIndex={-1} data-share="" className="studio-share">
          {t("share")}
        </button>
      </article>
      <Pointer />
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
          <StudioBoard playing={service === "studio"} />
        </div>
      </div>
    </figure>
  );
}
