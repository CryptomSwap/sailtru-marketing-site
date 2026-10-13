import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  frankRuhlLibre,
  fraunces,
  heebo,
  plexMono,
} from "@/lib/fonts";
import { CodeWaveBackground } from "@/components/ui/code-wave-background";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { AnalyticsBeacon } from "@/components/seo/analytics-beacon";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://sailtru.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        he: "/he"
      }
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      siteName: "SailTru",
      locale: locale === "he" ? "he_IL" : "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description")
    },
    icons: {
      icon: [
        { url: "/images/sailtrue-favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/images/sailtrue-favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/images/sailtrue-favicon-192.png", sizes: "192x192", type: "image/png" }
      ],
      apple: "/images/sailtrue-apple-icon.png"
    }
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "he";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${heebo.variable} ${plexMono.variable} ${fraunces.variable} ${frankRuhlLibre.variable}`}
    >
      <body className={`font-sans antialiased ${isRtl ? "locale-he" : "locale-en"}`}>
        <CodeWaveBackground />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <AnalyticsBeacon />
          <WhatsAppCta />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
