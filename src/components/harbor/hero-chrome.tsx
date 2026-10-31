"use client";

import { useEffect } from "react";

/**
 * Marks the body while the cobalt hero is on screen, so the page chrome that
 * belongs to the hero (the floating contact stack) can show there and stay
 * out of the harbor story below.
 */
export function HeroChrome({ hero }: { hero: string }) {
  useEffect(() => {
    const el = document.querySelector(hero);
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        document.body.toggleAttribute("data-cobalt-hero", entries.some((e) => e.isIntersecting));
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.body.removeAttribute("data-cobalt-hero");
    };
  }, [hero]);
  return null;
}
