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

function AnalysisBoard({ playing }: { playing: boolean }) {
  const t = useTranslations("companyHero.preview");
  const rtl = useLocale() === "he";
  const root = useRef<HTMLDivElement>(null);
  const googleRows = [
    { q: t("googleQ1"), you: t("googleYou1"), other: t("googleOther1"), tone: "gap", fill: 0.16 },
    { q: t("googleQ2"), you: t("googleYou2"), other: t("googleOther2"), tone: "weak", fill: 0.34 },
    { q: t("googleQ3"), you: t("googleYou3"), other: t("googleOther3"), tone: "ok", fill: 0.82 }
  ];
  const aiRows = [
    { q: t("aiQ1"), you: t("aiYou1"), other: t("aiOther1"), tone: "gap", fill: 0.1 },
    { q: t("aiQ2"), you: t("aiYou2"), other: t("aiOther2"), tone: "weak", fill: 0.22 },
    { q: t("aiQ3"), you: t("aiYou3"), other: t("aiOther3"), tone: "gap", fill: 0.08 }
  ];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const pointer = el.querySelector<HTMLElement>("[data-pointer]");
      const googleTab = el.querySelector<HTMLElement>("[data-tab=google]");
      const aiTab = el.querySelector<HTMLElement>("[data-tab=ai]");
      const googleTable = el.querySelector<HTMLElement>("[data-table=google]");
      const aiTable = el.querySelector<HTMLElement>("[data-table=ai]");
      const action = el.querySelector<HTMLElement>("[data-action]");
      const title = el.querySelector<HTMLElement>("[data-fix-title]");
      const body = el.querySelector<HTMLElement>("[data-fix-body]");
      const bars = gsap.utils.toArray<HTMLElement>("[data-fill]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const show = (view: "google" | "ai") => {
        el.dataset.view = view;
        googleTab?.classList.toggle("is-on", view === "google");
        aiTab?.classList.toggle("is-on", view === "ai");
        if (googleTable) gsap.set(googleTable, { autoAlpha: view === "google" ? 1 : 0 });
        if (aiTable) gsap.set(aiTable, { autoAlpha: view === "ai" ? 1 : 0 });
        if (title) title.textContent = view === "google" ? t("fixGoogle") : t("fixAi");
        if (body) body.textContent = view === "google" ? t("fixGoogleDo") : t("fixAiDo");
      };

      show("google");
      bars.forEach((bar) => {
        const fill = Number(bar.dataset.fill ?? 0.2);
        gsap.set(bar, { scaleX: reduced ? fill : 0, transformOrigin: rtl ? "100% 50%" : "0% 50%" });
      });

      if (!playing || reduced || !pointer) {
        if (pointer) gsap.set(pointer, { autoAlpha: 0 });
        bars.forEach((bar) => gsap.set(bar, { scaleX: Number(bar.dataset.fill ?? 0.2) }));
        return;
      }

      gsap.set(pointer, { autoAlpha: 1, x: rtl ? el.clientWidth - 40 : 36, y: 28, scale: 1 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
      tl.to(bars, { scaleX: (_, target) => Number((target as HTMLElement).dataset.fill ?? 0.2), duration: 0.7, stagger: 0.06, ease: "power3.out" });
      const firstGoogle = el.querySelector<HTMLElement>("[data-table=google] [data-row]");
      if (firstGoogle) {
        tl.to(pointer, { ...pointerXY(el, firstGoogle), duration: 0.55, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.to(firstGoogle, { backgroundColor: "rgba(94, 124, 255, 0.16)", duration: 0.2 });
      }
      if (action) {
        tl.to(pointer, { ...pointerXY(el, action), duration: 0.5, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.to(action, { boxShadow: "0 0 0 1px #6d8bff, 0 12px 28px rgba(49,84,218,0.28)", duration: 0.2 });
      }
      tl.to({}, { duration: 0.7 });
      if (aiTab) {
        tl.to(pointer, { ...pointerXY(el, aiTab), duration: 0.5, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.add(() => show("ai"));
        if (googleTable && aiTable) {
          tl.fromTo(aiTable, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" });
        }
      }
      const firstAi = el.querySelector<HTMLElement>("[data-table=ai] [data-row]");
      if (firstAi) {
        tl.to(pointer, { ...pointerXY(el, firstAi), duration: 0.5, ease: "power2.inOut" });
        clickPointer(pointer, tl);
        tl.to(firstAi, { backgroundColor: "rgba(94, 124, 255, 0.16)", duration: 0.2 });
      }
      if (action) {
        tl.to(pointer, { ...pointerXY(el, action), duration: 0.48, ease: "power2.inOut" });
        clickPointer(pointer, tl);
      }
      tl.to({}, { duration: 1.3 });
      tl.add(() => {
        firstGoogle?.style.removeProperty("background-color");
        firstAi?.style.removeProperty("background-color");
        show("google");
      });
    },
    { scope: root, dependencies: [playing, rtl], revertOnUpdate: true }
  );

  const table = (id: "google" | "ai", rows: typeof googleRows) => (
    <div className="vis-table" data-table={id}>
      <div className="vis-head">
        <span>{t("colQuery")}</span>
        <span>{t("colYou")}</span>
        <span>{t("colOthers")}</span>
      </div>
      {rows.map((row) => (
        <div key={row.q} className="vis-row" data-row="" data-tone={row.tone}>
          <strong>{row.q}</strong>
          <span className="vis-you">
            <span className="vis-track">
              <i data-fill={String(row.fill)} />
            </span>
            <em>{row.you}</em>
          </span>
          <span>{row.other}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={root} className="vis-app" data-view="google" aria-label={t("tourDescription")}>
      <header className="vis-top">
        <span className="vis-domain">{t("domain")}</span>
        <span className="vis-badge">{t("sampleBadge")}</span>
        <div className="vis-tabs" role="presentation">
          <button type="button" tabIndex={-1} data-tab="google" className="is-on">
            {t("googleTab")}
          </button>
          <button type="button" tabIndex={-1} data-tab="ai">
            {t("aiTab")}
          </button>
        </div>
      </header>
      <div className="vis-stage">
        {table("google", googleRows)}
        {table("ai", aiRows)}
      </div>
      <div className="vis-next" data-action="">
        <span>{t("next")}</span>
        <strong data-fix-title="">{t("fixGoogle")}</strong>
        <p data-fix-body="">{t("fixGoogleDo")}</p>
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
