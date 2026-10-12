import { CircuitPaths } from "@/components/sections/home-v2/how-it-works/CircuitPaths";
import { FeedbackLoop } from "@/components/sections/home-v2/how-it-works/FeedbackLoop";
import { InsightOverlay } from "@/components/sections/home-v2/how-it-works/InsightOverlay";
import { IntelligenceCore } from "@/components/sections/home-v2/how-it-works/IntelligenceCore";
import { ServiceOutputs } from "@/components/sections/home-v2/how-it-works/ServiceOutputs";
import { SourceNodes } from "@/components/sections/home-v2/how-it-works/SourceNodes";
import "@/components/sections/home-v2/how-it-works/intelligence-stage.css";

export type StageChapter = "live" | "discover" | "understand" | "implement" | "optimize";

export function IntelligenceStage({ chapter = "live" }: { chapter?: StageChapter }) {
  return (
    <div className={`intel-stage intel-stage--${chapter}`} data-intel-stage={chapter}>
      <CircuitPaths />
      <SourceNodes />
      <IntelligenceCore />
      <InsightOverlay />
      <ServiceOutputs />
      <FeedbackLoop />
    </div>
  );
}
