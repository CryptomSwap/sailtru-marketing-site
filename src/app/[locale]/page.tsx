import { getTranslations, setRequestLocale } from "next-intl/server";
import { HarborHome } from "@/components/harbor/harbor-home";
import { HomeHero } from "@/components/sections/home-v2/home-hero";
import { HomeScanSurface } from "@/components/sections/home-v2/home-scan-surface";
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
  const t = await getTranslations({ locale, namespace: "common" });

  // The cobalt above-the-fold hero from the previous homepage, then the harbor story below it.
  return (
    <HarborHome
      skipLabel={t("skipToContent")}
      hero={
        <HomeScanSurface>
          <HomeHero />
        </HomeScanSurface>
      }
    />
  );
}
