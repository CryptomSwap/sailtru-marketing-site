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
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false }
  };
}

/** Review route for the 3D harbor homepage. Not indexed. */
export default async function Harbor3DPreviewPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  return <HarborHome skipLabel={t("skipToContent")} scene3d />;
}
