"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

export function HomeTestimonialTeaser() {
  const t = useTranslations("homeTestimonial");

  return (
    <Reveal>
      <aside className="home-testimonial-teaser" aria-label={t("ariaLabel")}>
        <blockquote className="product-quote product-quote--compact">
          <p className="product-quote__text">&ldquo;{t("quote")}&rdquo;</p>
          <footer className="product-quote__attribution">— {t("attribution")}</footer>
        </blockquote>
        <Link href="/work" className="home-testimonial-teaser__link">
          {t("moreLink")}
        </Link>
      </aside>
    </Reveal>
  );
}
