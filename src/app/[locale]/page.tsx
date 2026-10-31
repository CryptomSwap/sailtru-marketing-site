import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

/**
 * The SailTru homepage: one continuous 3D harbor from the first viewport (the
 * opening hero is part of the scene), then the report, build, proof and
 * contact sections. The cobalt hero (home-v2/home-hero.tsx) is kept in the
 * repo for possible reuse but is not rendered here.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  return <HarborHome skipLabel={t("skipToContent")} scene3d />;
}
