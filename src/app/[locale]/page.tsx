import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/sections/home-v2/home-hero";
import { HomeScanSurface } from "@/components/sections/home-v2/home-scan-surface";
import { SailtruOpeningJourney } from "@/components/sections/sailtru-opening-journey";
import "@/components/sections/home-v2/home-v2.css";
import "@/components/sections/home-v2/mobile-home.css";
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
    <main id="main-content" className="site-home relative z-10 w-full min-w-0">
      <HomeScanSurface>
        <HomeHero />
      </HomeScanSurface>
      <SailtruOpeningJourney />
    </main>
  );
}
