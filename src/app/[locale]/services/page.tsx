import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ServicesContactSection } from "@/components/sections/services/services-contact-section";
import { ServicesGridSection } from "@/components/sections/services/services-grid-section";
import { ServicesHeroSection } from "@/components/sections/services/services-hero-section";
import { ServicesOutcomesSection } from "@/components/sections/services/services-outcomes-section";
import { ServicesPhilosophySection } from "@/components/sections/services/services-philosophy-section";
import { ServicesProcessSection } from "@/components/sections/services/services-process-section";
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
      <ServicesHeroSection />
      <ServicesPhilosophySection />
      <ServicesGridSection />
      <ServicesProcessSection />
      <ServicesOutcomesSection />
      <ServicesContactSection />
    </main>
  );
}
