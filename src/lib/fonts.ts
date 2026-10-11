import { Fraunces, Outfit } from "next/font/google";
import localFont from "next/font/local";

/** Display. Replaces Instrument Serif. The italic is the accent word. */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/** UI and body. Replaces IBM Plex Sans. */
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
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

export const heebo = localFont({
  src: [
    { path: "../../public/fonts/heebo-hebrew-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/heebo-hebrew-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/heebo-hebrew-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/heebo-latin-400-normal.woff2", weight: "400", style: "normal" }
  ],
  variable: "--font-sans-he",
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
