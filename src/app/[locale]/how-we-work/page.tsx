import { setRequestLocale } from "next-intl/server";
import { HowWeWorkSection } from "@/components/sections/how-we-work-section";
import { routing } from "@/i18n/routing";
import "@/components/sections/site-page/site-page.css";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations({ locale, namespace: "howWeWorkPage.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function HowWeWorkPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="site-page relative z-10 w-full min-w-0">
      <HowWeWorkSection />
    </main>
  );
}
