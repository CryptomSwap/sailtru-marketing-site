"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { revealUp } from "@/lib/motion/presets";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className = "" }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} {...revealUp}>
      {children}
    </motion.div>
  );
}
