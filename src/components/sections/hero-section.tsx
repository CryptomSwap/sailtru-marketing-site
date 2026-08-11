"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { SectionShell } from "@/components/ui/section-shell";
import { HeroDiagnosticExperience } from "@/components/sections/hero-diagnostic-experience";
import { HeroEditorial } from "@/components/sections/hero-editorial";
import { routing, type Locale } from "@/i18n/routing";
import "./hero.css";

const edgeInset = "px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12";

export function HeroSection() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const navItems = [
    { label: tNav("services"), href: "/services" as const },
    { label: tNav("howItWorks"), href: "/how-we-work" as const },
    { label: tNav("work"), href: "/work" as const },
    { label: tNav("contact"), href: "/contact" as const },
  ];

  const alternateLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <SectionShell id="hero" className="hero-product overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only rounded bg-[var(--accent)] px-3 py-2 text-white focus:not-sr-only"
      >
        {tCommon("skipToContent")}
      </a>

      <div className={`hero-product__frame ${edgeInset}`}>
        <header className="hero-nav">
          <Link href="/" className="hero-nav__brand" aria-label={tCommon("brandHome")}>
            <img
              src="/images/sailtrue-wordmark.png"
              alt="SailTru"
              className="hero-nav__logo-img hero-nav__logo-img--wordmark"
            />
          </Link>

          <nav aria-label={tCommon("primaryNav")} className="hero-nav__links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hero-nav__link ${item.href === "/services" && pathname === "/services" ? "hero-nav__link--active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hero-nav__actions">
            <Link
              href={pathname}
              locale={alternateLocale}
              className="hero-nav__locale"
              aria-label={tCommon("localeSwitch")}
            >
              {alternateLocale === "he" ? tCommon("localeHe") : tCommon("localeEn")}
            </Link>
            <Link href="#final-cta" className="hero-cta hero-cta--primary hero-cta--nav">
              {tNav("beginDiagnosis")}
            </Link>
          </div>
        </header>

        <div className="hero-product__stage">
          <div className="hero-product__intel">
            <HeroEditorial />
          </div>
          <HeroDiagnosticExperience />
        </div>
      </div>

      <div className="hero-product__grid" aria-hidden />
    </SectionShell>
  );
}
