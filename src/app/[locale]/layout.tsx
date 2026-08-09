import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Instrument_Serif,
  Frank_Ruhl_Libre,
  Heebo,
} from "next/font/google";
import { CodeWaveBackground } from "@/components/ui/code-wave-background";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-he",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500"],
  variable: "--font-serif-he",
  display: "swap",
});

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
