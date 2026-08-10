"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import "@/components/sections/hero.css";

const edgeInset = "px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12";

type SiteHeaderProps = {
  compact?: boolean;
};

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const navItems = [
    { label: tNav("home"), href: "/" as const },
    { label: tNav("services"), href: "/services" as const },
    { label: tNav("howItWorks"), href: "/#methodology" as const },
    { label: tNav("proof"), href: "/#proof" as const },
  ];

  const alternateLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""} ${edgeInset}`}>
      <Link href="/" className="hero-nav__brand" aria-label={tCommon("brandHome")}>
        <img
          src="/images/sailtrue-wordmark.png"
          alt="SailTru"
          className="hero-nav__logo-img hero-nav__logo-img--wordmark"
        />
      </Link>

      <nav aria-label={tCommon("primaryNav")} className="hero-nav__links">
        {navItems.map((item) => {
          const isActive =
            item.href === "/services"
              ? pathname === "/services"
              : item.href === "/" && pathname === "/";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`hero-nav__link ${isActive ? "hero-nav__link--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
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
        <Link href="/#final-cta" className="hero-cta hero-cta--ghost hero-cta--nav">
          {tNav("beginDiagnosis")}
        </Link>
      </div>
    </header>
  );
}
