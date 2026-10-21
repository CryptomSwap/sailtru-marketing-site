import { setRequestLocale } from "next-intl/server";
import { BoatJourneyHomepage } from "@/components/sections/boat-journey-homepage";
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

  return <BoatJourneyHomepage />;
}
