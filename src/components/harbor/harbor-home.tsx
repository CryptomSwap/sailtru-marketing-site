import type { ReactNode } from "react";
import { HarborHeader } from "./harbor-header";
import { HarborStory } from "./harbor-story";
import { HeroChrome } from "./hero-chrome";
import {
  BuildSection,
  ClosingSection,
  FaqSection,
  HarborFooter,
  ProofSection,
  SampleReportSection
} from "./harbor-sections";
import "./harbor.css";

/** Selector of the cobalt hero that opens /en and /he. */
const HERO_SELECTOR = "#hero";

/**
 * The SailTru homepage: one illustrated harbor story, then the conversion paths.
 *
 * With `hero` (the cobalt above-the-fold section) the hero comes first, outside
 * the harbor's own theme, and the harbor story follows directly below it.
 * Without it the story opens the page. `scene3d` turns on the 3D harbor
 * (the SVG harbor stays as the reduced-motion / no-WebGL / error fallback).
 */
export function HarborHome({ skipLabel, hero, scene3d = false }: { skipLabel: string; hero?: ReactNode; scene3d?: boolean }) {
  return (
    <>
      {hero ? (
        <div className="harbor-hero">
          <HeroChrome hero={HERO_SELECTOR} />
          {hero}
        </div>
      ) : null}
      <div className={`harbor${hero ? " harbor--below-hero" : ""}`}>
        {hero ? null : (
          <a href="#main-content" className="harbor-skip">
            {skipLabel}
          </a>
        )}
        <noscript>
          {/* Without JavaScript the story keeps its stacked, fully readable layout. */}
          <style>{`.hs-stage,.hs-nav{display:none!important}.hs-steps{margin-top:0!important}.hs-step{min-height:auto!important;padding:56px var(--gutter)!important}.hs-step__pin{position:static!important;height:auto!important;width:auto!important}.hs-step__demo{position:static!important;width:auto!important;height:auto!important;margin:28px 0 0!important;clip:auto!important;overflow:visible!important;white-space:normal!important}`}</style>
        </noscript>
        <HarborHeader afterHero={hero ? HERO_SELECTOR : undefined} />
        <main id="main-content" className="harbor-main">
          <HarborStory belowHero={Boolean(hero)} scene3d={scene3d} />
          <SampleReportSection />
          <BuildSection />
          <ProofSection />
          <FaqSection />
          <ClosingSection />
        </main>
        <HarborFooter />
      </div>
    </>
  );
}
