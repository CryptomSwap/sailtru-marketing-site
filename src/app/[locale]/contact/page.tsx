import { setRequestLocale } from "next-intl/server";
import { ContactPageSection } from "@/components/sections/contact-page-section";
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
  const t = await getTranslations({ locale, namespace: "contactPage.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="site-page relative z-10 w-full min-w-0">
      <ContactPageSection />
    </main>
  );
}
