import { setRequestLocale } from "next-intl/server";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { ExecutionSection } from "@/components/sections/home-v2/execution-section";
import { HomeHero } from "@/components/sections/home-v2/home-hero";
import { HomeScanSurface } from "@/components/sections/home-v2/home-scan-surface";
import { HowSailtruWorksSection } from "@/components/sections/home-v2/how-sailtru-works-section";
import { LoopSection } from "@/components/sections/home-v2/loop-section";
import { MonitorSection } from "@/components/sections/home-v2/monitor-section";
import { ObserveSection } from "@/components/sections/home-v2/observe-section";
import { OpportunitySplit } from "@/components/sections/home-v2/opportunity-split";
import { SystemLoopSection } from "@/components/sections/home-v2/system-loop-section";
import { TerritorySequence } from "@/components/sections/home-v2/territory-sequence";
import { ProofSection } from "@/components/sections/proof-section";
import "@/components/sections/home-v2/home-v2.css";
import "@/components/sections/home-v2/mobile-home.css";
import "@/components/sections/sections.css";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="site-home relative z-10 w-full min-w-0 pb-14">
      <HomeScanSurface>
        <HomeHero />
        <ObserveSection />
      </HomeScanSurface>
      <HowSailtruWorksSection />

      <div className="home-below">
        <SystemLoopSection />
        <ExecutionSection />
        <OpportunitySplit />
        <TerritorySequence />
        <LoopSection />
        <ProofSection />
        <MonitorSection />
        <FinalCtaSection />
      </div>
    </main>
  );
}
