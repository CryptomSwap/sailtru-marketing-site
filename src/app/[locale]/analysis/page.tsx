import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/sections/home-v2/home-hero";
import { HomeScanSurface } from "@/components/sections/home-v2/home-scan-surface";
import { HarborHome } from "@/components/harbor/harbor-home";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "harbor.meta" });
  return { title: t("title"), description: t("description") };
}

/** Cobalt above the fold flows into the canonical 3D harbor story. */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  return <HarborHome skipLabel={t("skipToContent")} scene3d hero={<HomeScanSurface><HomeHero /></HomeScanSurface>} />;
}
