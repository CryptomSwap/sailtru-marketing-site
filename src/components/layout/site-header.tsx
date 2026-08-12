"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

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
    { label: tNav("howItWorks"), href: "/how-we-work" as const },
    { label: tNav("work"), href: "/work" as const },
  ];

  const alternateLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <header className={`site-header site-header--v2 ${compact ? "site-header--compact" : ""}`}>
      <Link href="/" className="site-header__brand" aria-label={tCommon("brandHome")}>
        <span className="site-header__wordmark">
          Sail<span className="site-header__wordmark-accent">Tru</span>
        </span>
      </Link>

      <nav aria-label={tCommon("primaryNav")} className="site-header__links">
        {navItems.map((item) => {
          const isActive =
            item.href === "/services"
              ? pathname === "/services"
              : item.href === "/" && pathname === "/";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`site-header__link ${isActive ? "site-header__link--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="site-header__actions">
        <Link
          href={pathname}
          locale={alternateLocale}
          className="site-header__locale"
          aria-label={tCommon("localeSwitch")}
        >
          {alternateLocale === "he" ? tCommon("localeHe") : tCommon("localeEn")}
        </Link>
        <Link href="/contact" className="site-header__cta">
          {tNav("beginDiagnosis")}
        </Link>
      </div>
    </header>
  );
}
