import { Fraunces, Heebo } from "next/font/google";
import localFont from "next/font/local";

/** Display. Replaces Instrument Serif. The italic is the accent word. */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});

/**
 * UI + body for EN and HE. Headers keep serif (Fraunces / Frank Ruhl).
 * One family sitewide so non-header text never falls back to Outfit / system.
 */
export const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap"
});

export const plexSans = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" }
  ],
  variable: "--font-sans",
  display: "swap"
});

export const plexMono = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" }
  ],
  variable: "--font-mono",
  display: "swap"
});

export const instrumentSerif = localFont({
  src: [
    { path: "../../public/fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" }
  ],
  variable: "--font-serif",
  display: "swap"
});

export const frankRuhlLibre = localFont({
  src: [
    { path: "../../public/fonts/frank-ruhl-libre-hebrew-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/frank-ruhl-libre-hebrew-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/frank-ruhl-libre-latin-400-normal.woff2", weight: "400", style: "normal" }
  ],
  variable: "--font-serif-he",
  display: "swap"
});
