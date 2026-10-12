"use client";

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroDotField } from "@/components/sections/home-v2/hero-dot-field";

type PageHeroProps = {
  kicker?: string;
  title: string;
  body?: string;
  actions?: ReactNode;
  /** "field" matches the homepage's taller cobalt field hero (gradient + grain + orbit dots). */
  variant?: "field";
};

/**
 * Cobalt ATF for inner pages — same field language as the homepage hero,
 * shortened for page entry rather than full-viewport marketing stage.
 */
export function PageHero({ kicker, title, body, actions, variant }: PageHeroProps) {
  const isField = variant === "field";

  return (
    <section className={`sp-hero${isField ? " sp-hero--field" : ""}`}>
      <div className="sp-hero__wash" aria-hidden />
      <div className="sp-hero__grain" aria-hidden />
      {isField ? <HeroDotField /> : null}
      <div className="sp-hero__inner">
        <SiteHeader />
        <div className="sp-hero__content">
          {kicker ? <p className="sp-hero__kicker">{kicker}</p> : null}
          <h1 className="sp-hero__title">{title}</h1>
          {body ? <p className="sp-hero__body">{body}</p> : null}
          {actions ? <div className="sp-hero__actions">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
