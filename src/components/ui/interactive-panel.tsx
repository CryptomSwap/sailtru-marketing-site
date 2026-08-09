"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type InteractivePanelProps = {
  children: ReactNode;
  className?: string;
  accent?: "default" | "high" | "warm" | "muted";
};

const accentClass = {
  default: "",
  high: "readout--accent-high",
  warm: "readout--accent-warm",
  muted: "readout--accent-muted",
} as const;

export function InteractivePanel({
  children,
  className = "",
  accent = "default",
}: InteractivePanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 1 }}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`readout readout--interactive product-module ${accentClass[accent]} ${className}`}
    >
      {children}
    </motion.article>
  );
}
