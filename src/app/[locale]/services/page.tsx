import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ServicesContactSection } from "@/components/sections/services/services-contact-section";
import { ServicesOutcomesSection } from "@/components/sections/services/services-outcomes-section";
import { ServicesProcessSection } from "@/components/sections/services/services-process-section";
import { ServicesV2Hero } from "@/components/sections/services-v2/services-hero";
import { TerritoryChapters } from "@/components/sections/services-v2/territory-chapters";
import "@/components/sections/services-v2/services-v2.css";
import "@/components/sections/services.css";
import "@/components/sections/sections.css";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="relative z-10 w-full min-w-0 pb-14">
      <ServicesV2Hero />
      <TerritoryChapters />
      <ServicesProcessSection />
      <ServicesOutcomesSection />
      <ServicesContactSection />
    </main>
  );
}
