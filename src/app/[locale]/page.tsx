import { setRequestLocale } from "next-intl/server";
import { BusinessWorkspace } from "@/components/sections/business-workspace/business-workspace";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "he" ? "SailTru — מודיעין עסקי ופתרונות AI מותאמים" : "SailTru — Business Intelligence & Bespoke AI Solutions";
  const description = locale === "he" ? "דוחות עסקיים, ניתוח מתחרים ונראות SEO ו־GEO. מראיות וסדרי עדיפויות לפתרונות AI וסוכנים מותאמים לעסק." : "Business reports, competitor intelligence, SEO and GEO visibility. Turn evidence and priorities into bespoke AI solutions, agents and practical improvements.";
  return { title, description, openGraph: { title, description, url: `/${locale}`, siteName: "SailTru", locale: locale === "he" ? "he_IL" : "en_US", type: "website" }, twitter: { card: "summary_large_image", title, description } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BusinessWorkspace locale={locale} />;
}
