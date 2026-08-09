import { routing } from "@/i18n/routing";

/** Root layout — locale-specific html/body live in [locale]/layout.tsx */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
