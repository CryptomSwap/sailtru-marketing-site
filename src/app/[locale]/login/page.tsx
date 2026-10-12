import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/layout/site-header";
import { ScanLoginGate } from "@/components/sections/home-v2/scan-login-gate";
import { parseScanHost } from "@/lib/freemium-session";
import { routing } from "@/i18n/routing";
import "@/components/sections/site-page/site-page.css";
import "@/components/sections/home-v2/scan-login-gate.css";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ host?: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "freemium.gate" });
  return { title: t("metadataTitle"), description: t("metadataDescription") };
}

export default async function LoginPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { host } = await searchParams;
  setRequestLocale(locale);

  const cleanHost = parseScanHost(host ?? "");

  return (
    <main id="main-content" className="site-page relative z-10 w-full min-w-0">
      <section className="sp-hero scan-auth-page">
        <div className="sp-hero__wash" aria-hidden />
        <div className="sp-hero__grain" aria-hidden />
        <div className="sp-hero__inner">
          <SiteHeader />
          <ScanLoginGate host={cleanHost} />
        </div>
      </section>
    </main>
  );
}
