"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type BlurWordRevealProps = {
  text: string;
  as?: "span" | "p" | "h2" | "h3" | "div";
  id?: string;
  className?: string;
  wordClassName?: string;
  wordClassAt?: (word: string, index: number) => string | undefined;
  delay?: number;
  stagger?: number;
  duration?: number;
  /**
   * `mount` — ATF one-shot (Profound hero brand swap grammar).
   * `inView` — fire once when entering.
   * `scroll` — scroll-scrubbed word resolve (Profound “impossible amount of work”).
   */
  mode?: "mount" | "inView" | "scroll";
  /** Resolved text color after blur clears. */
  color?: string;
  /** Muted color while still blurred (scroll/inView). */
  mutedColor?: string;
  children?: ReactNode;
};

function ScrollWord({
  word,
  index,
  total,
  progress,
  className,
  color,
  mutedColor,
  trailing
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  className: string;
  color: string;
  mutedColor: string;
  trailing: boolean;
}) {
  const start = index / total;
  const end = Math.min(1, (index + 1.15) / total);
  const opacity = useTransform(progress, [start, end], [0.55, 1]);
  const blur = useTransform(progress, [start, end], [10, 0]);
  const c = useTransform(progress, [start, end], [mutedColor, color]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span className={className} style={{ opacity, filter, color: c }}>
      {word}
      {trailing ? "\u00A0" : null}
    </motion.span>
  );
}

/**
 * Profound-style word reveal:
 * muted + blurred → sharp + bright, word by word.
 */
export function BlurWordReveal({
  text,
  as = "span",
  id,
  className = "",
  wordClassName = "",
  wordClassAt,
  delay = 0,
  stagger = 0.055,
  duration = 0.58,
  mode = "inView",
  color = "#f4f8ff",
  mutedColor = "rgba(126, 150, 190, 0.55)",
  children
}: BlurWordRevealProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.38"]
  });

  if (reduceMotion || words.length === 0) {
    const StaticTag = as;
    return (
      <StaticTag id={id} className={className}>
        {text}
        {children}
      </StaticTag>
    );
  }

  const wordNodes =
    mode === "scroll"
      ? words.map((word, index) => {
          const extra = wordClassAt?.(word, index);
          return (
            <ScrollWord
              key={`${index}-${word}`}
              word={word}
              index={index}
              total={words.length}
              progress={scrollYProgress}
              className={["blur-words__word", wordClassName, extra].filter(Boolean).join(" ")}
              color={color}
              mutedColor={mutedColor}
              trailing={index < words.length - 1}
            />
          );
        })
      : words.map((word, index) => {
          const extra = wordClassAt?.(word, index);
          const transition = {
            duration,
            delay: delay + index * stagger,
            ease: EASE
          };
          const initial = { opacity: 0.45, filter: "blur(14px)", y: 6, color: mutedColor };
          const shown = { opacity: 1, filter: "blur(0px)", y: 0, color };

          if (mode === "mount") {
            return (
              <motion.span
                key={`${index}-${word}`}
                className={["blur-words__word", wordClassName, extra].filter(Boolean).join(" ")}
                initial={initial}
                animate={shown}
                transition={transition}
              >
                {word}
                {index < words.length - 1 ? "\u00A0" : null}
              </motion.span>
            );
          }

          return (
            <motion.span
              key={`${index}-${word}`}
              className={["blur-words__word", wordClassName, extra].filter(Boolean).join(" ")}
              initial={initial}
              whileInView={shown}
              viewport={{ once: true, amount: 0.55 }}
              transition={transition}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : null}
            </motion.span>
          );
        });

  const shell = (
    <>
      <span className="blur-words" aria-hidden>
        {wordNodes}
      </span>
      {children}
    </>
  );

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  if (as === "h2") {
    return (
      <h2 id={id} ref={setRef} className={className} aria-label={text}>
        {shell}
      </h2>
    );
  }
  if (as === "h3") {
    return (
      <h3 id={id} ref={setRef} className={className} aria-label={text}>
        {shell}
      </h3>
    );
  }
  if (as === "p") {
    return (
      <p id={id} ref={setRef} className={className} aria-label={text}>
        {shell}
      </p>
    );
  }
  if (as === "div") {
    return (
      <div id={id} ref={setRef} className={className} aria-label={text}>
        {shell}
      </div>
    );
  }

  return (
    <span id={id} ref={setRef} className={className} aria-label={text}>
      {shell}
    </span>
  );
}
