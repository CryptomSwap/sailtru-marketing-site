import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Heebo", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        panel: "var(--panel)",
        "panel-foreground": "var(--panel-foreground)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        stroke: "var(--stroke)",
        "stroke-strong": "var(--stroke-strong)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(72, 95, 255, 0.16), 0 10px 40px rgba(44, 63, 189, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
