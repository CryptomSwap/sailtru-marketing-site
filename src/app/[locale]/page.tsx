import { getTranslations, setRequestLocale } from "next-intl/server";
import { HarborHome } from "@/components/harbor/harbor-home";
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

  return <HarborHome skipLabel={t("skipToContent")} />;
}
