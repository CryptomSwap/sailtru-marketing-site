"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, type KeyboardEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/site-header";
import { Link } from "@/i18n/navigation";
import { ServicePreview } from "./service-preview";
import { HeroDotField } from "./hero-dot-field";
import { useCobaltEntranceBusy } from "./use-cobalt-arrival";
import { HeroScanSequence } from "./hero-scan-sequence";
import "./home-v2.css";
import "./field-hero-ref.css";
import "./company-hero.css";

gsap.registerPlugin(useGSAP);

const services = ["analysis", "solutions", "studio"] as const;
type Service = (typeof services)[number];

export function CompanyHero() {
  const t = useTranslations("companyHero");
  const common = useTranslations("common");
  const rtl = useLocale() === "he";
  const [active, setActive] = useState<Service>("analysis");
  const stageRef = useRef<HTMLDivElement>(null);
  const gliderRef = useRef<HTMLSpanElement>(null);
  const previous = useRef<Service>("analysis");
  const entranceBusy = useCobaltEntranceBusy();

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = {
      ArrowRight: index + (rtl ? -1 : 1),
      ArrowLeft: index + (rtl ? 1 : -1),
      Home: 0,
      End: services.length - 1
    }[event.key as "ArrowRight" | "ArrowLeft" | "Home" | "End"];
    if (next === undefined) return;
    event.preventDefault();
    const service = services[(next + services.length) % services.length];
    setActive(service);
    document.getElementById(`tab-${service}`)?.focus();
  }

  useGSAP(
    () => {
      const stage = stageRef.current;
      const glider = gliderRef.current;
      if (!stage) return;
      const tab = stage.querySelector<HTMLButtonElement>(`#tab-${active}`);
      if (tab && glider) {
        const parent = tab.parentElement;
        if (parent) {
          const box = tab.getBoundingClientRect();
          const frame = parent.getBoundingClientRect();
          gsap.to(glider, {
            x: box.left - frame.left,
            width: box.width,
            duration: 0.45,
            ease: "power3.out"
          });
        }
      }

      const from = previous.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const panes = services.map((service) => stage.querySelector<HTMLElement>(`#panel-${service}`));
      const going = services.indexOf(active) - services.indexOf(from);
      const dir = (rtl ? -1 : 1) * (going === 0 ? 1 : Math.sign(going));

      panes.forEach((pane, i) => {
        if (!pane) return;
        gsap.killTweensOf(pane);
        const on = services[i] === active;
        if (from === active || reduced) {
          gsap.set(pane, { autoAlpha: on ? 1 : 0, y: 0 });
          return;
        }
        if (on) {
          gsap.fromTo(
            pane,
            { autoAlpha: 0, y: 22 * dir },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.08 }
          );
        } else if (services[i] === from) {
          gsap.to(pane, { autoAlpha: 0, y: -14 * dir, duration: 0.22, ease: "power2.in" });
        } else {
          gsap.set(pane, { autoAlpha: 0, y: 0 });
        }
      });
      previous.current = active;
    },
    { scope: stageRef, dependencies: [active, rtl] }
  );

  return (
    <section id="hero" className="field-hero field-hero--ref company-hero">
      <a className="sr-only focus:not-sr-only" href="#observe">
        {common("skipToContent")}
      </a>
      <HeroDotField maxFps={entranceBusy ? 30 : undefined} />
      <div className="company-shell">
        <SiteHeader company />
        <div id="observe" className="company-stage" data-service={active} ref={stageRef}>
          <div className="company-entry">
            <div className="company-tabs" role="tablist" aria-label={t("services")}>
              <span className="company-tabs__glider" ref={gliderRef} aria-hidden="true" />
              {services.map((service, index) => (
                <button
                  key={service}
                  type="button"
                  role="tab"
                  id={`tab-${service}`}
                  aria-controls={`panel-${service}`}
                  aria-selected={active === service}
                  tabIndex={active === service ? 0 : -1}
                  onClick={() => setActive(service)}
                  onKeyDown={(event) => navigateTabs(event, index)}
                >
                  <span className="company-tab-dot" aria-hidden="true" />
                  {t(`${service}.label`)}
                </button>
              ))}
            </div>
            <div className="field-main company-copy">
              {services.map((service) => (
                <div
                  key={service}
                  role="tabpanel"
                  id={`panel-${service}`}
                  aria-labelledby={`tab-${service}`}
                  aria-hidden={active !== service}
                  inert={active !== service ? true : undefined}
                >
                  <h1>
                    {t(`${service}.lead`)} <em>{t(`${service}.accent`)}</em>
                  </h1>
                  <p>{t(`${service}.line`)}</p>
                  {service === "analysis" ? (
                    <>
                      <HeroScanSequence simpleEntry />
                      <Link className="company-report" prefetch={false} href="/analysis#sample-report">
                        {t("analysis.report")}
                      </Link>
                    </>
                  ) : (
                    <a
                      className="company-action"
                      href={`mailto:team@sailtru.com?subject=${encodeURIComponent(t(`${service}.subject`))}&body=${encodeURIComponent(t(`${service}.brief`))}`}
                    >
                      {t(`${service}.cta`)}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          <ServicePreview service={active} pauseMotion={entranceBusy} />
        </div>
      </div>
    </section>
  );
}
