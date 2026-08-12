import type { MetadataRoute } from "next";

const SITE_URL = "https://sailtru.com";
const LOCALES = ["en", "he"] as const;
const PATHS = ["", "/services", "/how-we-work", "/work", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const routePath of PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${routePath}`,
        lastModified: new Date(),
        changeFrequency: routePath === "" ? "weekly" : "monthly",
        priority: routePath === "" ? 1 : 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${routePath}`,
            he: `${SITE_URL}/he${routePath}`
          }
        }
      });
    }
  }
  return entries;
}
