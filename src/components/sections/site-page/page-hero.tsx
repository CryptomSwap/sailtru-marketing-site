"use client";

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";

type PageHeroProps = {
  kicker?: string;
  title: string;
  body?: string;
  actions?: ReactNode;
};

/**
 * Cobalt ATF for inner pages — same field language as the homepage hero,
 * shortened for page entry rather than full-viewport marketing stage.
 */
export function PageHero({ kicker, title, body, actions }: PageHeroProps) {
  return (
    <section className="sp-hero">
      <div className="sp-hero__wash" aria-hidden />
      <div className="sp-hero__grain" aria-hidden />
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
