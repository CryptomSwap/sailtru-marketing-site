"use client";

import { cubicBezier } from "framer-motion";

export const motionTimings = {
  short: 0.28,
  medium: 0.45,
};

export const motionEase = cubicBezier(0.22, 1, 0.36, 1);

export const revealUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.28 },
  transition: { duration: motionTimings.medium, ease: motionEase },
};

export const revealSoft = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: motionTimings.short, ease: motionEase },
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTimings.short, ease: motionEase },
  },
};

export const cardHover = {
  rest: { y: 0, borderColor: "rgba(156, 175, 224, 0.2)" },
  hover: {
    y: -1,
    borderColor: "rgba(186, 205, 255, 0.32)",
    transition: { duration: motionTimings.short, ease: motionEase },
  },
};
