import { HarborHeader } from "./harbor-header";
import { HarborStory } from "./harbor-story";
import {
  BuildSection,
  ClosingSection,
  FaqSection,
  HarborFooter,
  ProofSection,
  SampleReportSection
} from "./harbor-sections";
import "./harbor.css";

/** The SailTru homepage: one illustrated harbor story, then the conversion paths. */
export function HarborHome({ skipLabel }: { skipLabel: string }) {
  return (
    <div className="harbor">
      <a href="#main-content" className="harbor-skip">
        {skipLabel}
      </a>
      <noscript>
        {/* Without JavaScript the story keeps its stacked, fully readable layout. */}
        <style>{`.hs-stage,.hs-nav{display:none!important}.hs-steps{margin-top:0!important}.hs-step{min-height:auto!important;padding:56px var(--gutter)!important}.hs-step__pin{position:static!important;height:auto!important;width:auto!important}.hs-step__demo{position:static!important;width:auto!important;height:auto!important;margin:28px 0 0!important;clip:auto!important;overflow:visible!important;white-space:normal!important}`}</style>
      </noscript>
      <HarborHeader />
      <main id="main-content" className="harbor-main">
        <HarborStory />
        <SampleReportSection />
        <BuildSection />
        <ProofSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <HarborFooter />
    </div>
  );
}
