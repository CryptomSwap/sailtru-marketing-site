import { useTranslations } from "next-intl";
import { SOURCES, pct } from "@/components/sections/home-v2/how-it-works/circuit-geometry";

const MARKS: Record<string, string> = {
  chatgpt: "/images/brands/openai-white.svg",
  google: "/images/brands/google-color.svg",
  perplexity: "/images/brands/perplexity-color.svg",
  competitors: "/images/brands/semrush-color.svg",
  analytics: "/images/brands/googleanalytics-color.svg",
  workflows: "/images/brands/n8n-color.svg",
  crm: "/images/brands/hubspot-color.svg"
};

export function SourceNodes() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <>
      {SOURCES.map((source) => (
        <div
          key={source.id}
          className={`intel-source${source.major ? " intel-source--major" : " intel-source--minor"}`}
          style={pct(source.x, source.y)}
        >
          <div data-source={source.id} data-major={source.major ? "true" : "false"}>
            {/* local brand SVGs; the optimizer shifts their colors */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MARKS[source.id]} alt="" width={18} height={18} draggable={false} />
            <span>{t(`signals.${source.id}`)}</span>
          </div>
        </div>
      ))}
    </>
  );
}
