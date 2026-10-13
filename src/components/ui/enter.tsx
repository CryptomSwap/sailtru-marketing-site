"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type EnterProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

/** One entrance. Used on the pale sections, which otherwise sit still. */
export function Enter({ children, className, delay = 0, as = "div" }: EnterProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return as === "li" ? <li className={className}>{children}</li> : <div className={className}>{children}</div>;
  }

  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
