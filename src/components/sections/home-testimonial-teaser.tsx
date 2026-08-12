"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function HomeTestimonialTeaser() {
  const t = useTranslations("homeTestimonial");

  return (
    <aside className="home-v2-split" aria-label={t("ariaLabel")}>
      <blockquote className="site-inner__quote">
        <p>{t("quote")}</p>
        <footer>{t("attribution")}</footer>
      </blockquote>
      <Link href="/work" className="site-inner__mail">
        {t("moreLink")}
      </Link>
    </aside>
  );
}
