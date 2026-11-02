"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import "./site-header-mobile.css";

type SiteHeaderProps = {
  compact?: boolean;
};

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  const navItems = [
    { label: tNav("home"), href: "/" as const },
    { label: tNav("services"), href: "/services" as const },
    { label: tNav("howItWorks"), href: "/how-we-work" as const },
    { label: tNav("work"), href: "/work" as const },
    { label: tNav("beginDiagnosis"), href: "/contact" as const }
  ];

  const alternateLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <header className={`site-header site-header--v2 ${compact ? "site-header--compact" : ""}`}>
      <Link href="/" className="site-header__brand" aria-label={tCommon("brandHome")}>
        <Image
          src="/images/sailtru-lockup.png"
          alt="SailTru"
          width={757}
          height={183}
          className="site-header__logo"
          priority
        />
      </Link>

      <nav
        id="site-primary-nav"
        aria-label={tCommon("primaryNav")}
        className={`site-header__links${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        data-lenis-prevent={menuOpen ? "" : undefined}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/services"
              ? pathname === "/services"
              : item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`site-header__link${item.href === "/contact" ? " site-header__link--cta" : ""}${isActive ? " site-header__link--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href={pathname}
          locale={alternateLocale}
          className="site-header__link site-header__link--locale"
          aria-label={tCommon("localeSwitch")}
        >
          {alternateLocale === "he" ? tCommon("localeHe") : tCommon("localeEn")}
        </Link>
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

      <button
        type="button"
        className="site-header__menu"
        aria-expanded={menuOpen}
        aria-controls="site-primary-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">{menuOpen ? tCommon("closeMenu") : tCommon("openMenu")}</span>
        <span className="site-header__menu-bars" aria-hidden />
      </button>
    </header>
  );
}
