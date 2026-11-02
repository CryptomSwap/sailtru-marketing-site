"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { CobaltArrival, HeaderReveal } from "./story-model";

/**
 * `afterHero` is a selector for a hero above the story. While that hero (which
 * carries its own header) is on screen this header stays out of the way.
 */
export function HarborHeader({ afterHero }: { afterHero?: string }) {
  const t = useTranslations("harbor.header");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(!afterHero);
  const alternate = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  useEffect(() => {
    if (!afterHero) return;
    const hero = document.querySelector(afterHero);
    if (!hero) return;
    const story = hero.closest<HTMLElement>(".hs--cobalt-arrival");
    const stage = story?.querySelector<HTMLElement>(".hs-stage") ?? null;
    /** The scroll position from which the header shows, measured on resize (scrolling never reads layout). */
    let revealAt = 0;
    const measure = () => {
      const bar = document.querySelector(".hh__bar")?.getBoundingClientRect().height ?? 64;
      const cinematic = Boolean(stage) && getComputedStyle(stage!).display !== "none";
      if (cinematic) {
        // On the cinematic stage the cobalt hero dissolves in place: the header shows once it is gone.
        revealAt = story!.getBoundingClientRect().top + window.scrollY + window.innerHeight * CobaltArrival.LENGTH * CobaltArrival.HERO[1];
      } else {
        // Stacked: once the hero has scrolled up behind the header.
        const bottom = hero.getBoundingClientRect().bottom + window.scrollY;
        revealAt = bottom - bar;
      }
      update();
    };
    const update = () => setShown(HeaderReveal.isRevealed(revealAt - window.scrollY, 0));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    if (story) ro.observe(story);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, [afterHero]);

  const close = () => setOpen(false);
  const links = [
    { href: "#find", label: t("how") },
    { href: "#sample-report", label: t("report") },
    { href: "#build-examples", label: t("build") },
    { href: "#work", label: t("work") }
  ];

  return (
    <header className={`hh${open ? " is-open" : ""}${shown ? "" : " is-parked"}`}>
      <div className="hh__bar">
        <Link href="/" className="hh__brand" aria-label={t("home")} onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/sailtrue-mark.svg" alt="" width="40" height="40" className="hh__mark" />
          <span className="hh__word" aria-hidden />
        </Link>
        {/* The open sheet scrolls natively (Lenis skips it); the closed bar doesn't interrupt smooth wheel scrolling. */}
        <nav id="hh-nav" className="hh__nav" aria-label={t("nav")} data-lenis-prevent={open ? "" : undefined}>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="hh__locale-item">
              <Link href={pathname} locale={alternate} className="hh__locale" aria-label={t("localeLabel")} onClick={close}>
                {t("locale")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hh__cta" onClick={close}>
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className="hh__menu"
          aria-expanded={open}
          aria-controls="hh-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
          <span className="hh__bars" aria-hidden />
        </button>
      </div>
    </header>
  );
}
