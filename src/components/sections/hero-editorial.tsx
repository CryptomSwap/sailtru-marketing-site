"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { HeroUrlScan } from "@/components/sections/hero-url-scan";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroEditorial() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("hero");

  const reveal = (delay: number, y = 14) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <div className="hero-intel">
      <motion.div className="hero-intel__rail" {...reveal(0.08, 8)}>
        <span className="hero-intel__rail-index" aria-hidden>
          01
        </span>
        <span className="hero-intel__rail-line" aria-hidden />
        <span className="hero-intel__rail-label">{t("railLabel")}</span>
      </motion.div>

      <div className="hero-intel__statement" aria-label={t("headlineAria")}>
        <motion.span className="hero-intel__line hero-intel__line--a" {...reveal(0.18)}>
          {t("headlineLineA")}
        </motion.span>
        <motion.span className="hero-intel__line hero-intel__line--b" {...reveal(0.28)}>
          {t("headlineLineB")}
        </motion.span>
        <motion.span className="hero-intel__line hero-intel__line--c" {...reveal(0.38)}>
          {t("headlineLineC")}
          <br />
          {t("headlineLineD")}
        </motion.span>
      </div>

      <motion.p className="hero-intel__subtitle" {...reveal(0.46, 10)}>
        {t("subtitle")}
      </motion.p>

      <motion.div className="hero-intel__controls" {...reveal(0.52, 10)}>
        <HeroUrlScan />
        <Link href="/how-we-work" className="hero-cta hero-cta--ghost">
          {t("methodology")}
        </Link>
      </motion.div>
    </div>
  );
}
