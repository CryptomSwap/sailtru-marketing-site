import { setRequestLocale } from "next-intl/server";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MethodologySection } from "@/components/sections/methodology-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProofSection } from "@/components/sections/proof-section";
import { SignalLayersSection } from "@/components/sections/signal-layers-section";
import { TransformationSection } from "@/components/sections/transformation-section";
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
      <HeroSection />
      <ProblemSection />
      <MethodologySection />
      <SignalLayersSection />
      <TransformationSection />
      <ProofSection />
      <ProcessSection />
      <FinalCtaSection />
    </main>
  );
}
