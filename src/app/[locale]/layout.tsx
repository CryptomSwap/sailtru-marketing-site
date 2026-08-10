import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  frankRuhlLibre,
  heebo,
  instrumentSerif,
  plexMono,
  plexSans,
} from "@/lib/fonts";
import { CodeWaveBackground } from "@/components/ui/code-wave-background";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
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
      className={`${plexSans.variable} ${heebo.variable} ${plexMono.variable} ${instrumentSerif.variable} ${frankRuhlLibre.variable}`}
    >
      <body className={`font-sans antialiased ${isRtl ? "locale-he" : "locale-en"}`}>
        <CodeWaveBackground />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <WhatsAppCta />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
