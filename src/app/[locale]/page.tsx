import { setRequestLocale } from "next-intl/server";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HomeHero } from "@/components/sections/home-v2/home-hero";
import { LoopSection } from "@/components/sections/home-v2/loop-section";
import { OpportunitySplit } from "@/components/sections/home-v2/opportunity-split";
import { TerritorySequence } from "@/components/sections/home-v2/territory-sequence";
import { ProofSection } from "@/components/sections/proof-section";
import { HomeTestimonialTeaser } from "@/components/sections/home-testimonial-teaser";
import "@/components/sections/home-v2/home-v2.css";
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
    <main id="main-content" className="relative z-10 w-full min-w-0 pb-14">
      <HomeHero />
      <OpportunitySplit />
      <TerritorySequence />
      <LoopSection />
      <HomeTestimonialTeaser />
      <ProofSection />
      <FinalCtaSection />
    </main>
  );
}
