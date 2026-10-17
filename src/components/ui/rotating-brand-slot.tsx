"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

type BrandItem = {
  id: string;
  label: string;
  src: string;
  tone: "color" | "light";
};

/** Surfaces SailTrue actually reads — credibility via logos, not GEO “win in” copy. */
const BRANDS: BrandItem[] = [
  { id: "chatgpt", label: "ChatGPT", src: "/images/brands/openai-white.svg", tone: "light" },
  { id: "claude", label: "Claude", src: "/images/brands/claude-color.svg", tone: "color" },
  { id: "google", label: "Google", src: "/images/brands/google-color.svg", tone: "color" },
  { id: "perplexity", label: "Perplexity", src: "/images/brands/perplexity-color.svg", tone: "color" }
];

const HOLD_MS = 2200;

type RotatingBrandSlotProps = {
  className?: string;
};

/**
 * Profound craft: stem + rotating logo/name slot (blur ↔ sharp).
 * SailTrue identity: signals we observe, not “win in AI search.”
 */
export function RotatingBrandSlot({ className = "" }: RotatingBrandSlotProps) {
  const t = useTranslations("hero.mobile.credibility");
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % BRANDS.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const aria = t("aria", {
    brands: BRANDS.map((b) => b.label).join(", ")
  });

  return (
    <p className={`rotating-brand ${className}`.trim()} aria-label={aria}>
      <span className="rotating-brand__stem">{t("stem")}</span>
      <span className="rotating-brand__slot" aria-hidden>
        {reduceMotion ? (
          <span className="rotating-brand__item" data-active>
            <img
              src={BRANDS[0].src}
              alt=""
              width={16}
              height={16}
              className={`rotating-brand__mark rotating-brand__mark--${BRANDS[0].tone}`}
              draggable={false}
            />
            <span className="rotating-brand__name">{BRANDS[0].label}</span>
          </span>
        ) : (
          BRANDS.map((brand, index) => (
            <span
              key={brand.id}
              className="rotating-brand__item"
              data-active={index === active ? "" : undefined}
            >
              <img
                src={brand.src}
                alt=""
                width={16}
                height={16}
                className={`rotating-brand__mark rotating-brand__mark--${brand.tone}`}
                draggable={false}
              />
              <span className="rotating-brand__name">{brand.label}</span>
            </span>
          ))
        )}
      </span>
    </p>
  );
}
