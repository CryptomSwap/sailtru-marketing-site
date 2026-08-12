import { JsonLd } from "@/components/seo/json-ld";

export function ServiceJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "SailTru Services",
        itemListElement: [
          {
            "@type": "Service",
            name: "Get Found",
            description: "SEO, GEO, and discoverability so the right people find you.",
            provider: { "@type": "Organization", name: "SailTru", url: "https://sailtru.com" }
          },
          {
            "@type": "Service",
            name: "Get Ahead",
            description: "Conversion and competitive clarity that compounds growth.",
            provider: { "@type": "Organization", name: "SailTru", url: "https://sailtru.com" }
          },
          {
            "@type": "Service",
            name: "Automate",
            description: "Workflows and intelligent systems that remove manual drag.",
            provider: { "@type": "Organization", name: "SailTru", url: "https://sailtru.com" }
          },
          {
            "@type": "Service",
            name: "Build",
            description: "Custom tools and applications when off-the-shelf is not enough.",
            provider: { "@type": "Organization", name: "SailTru", url: "https://sailtru.com" }
          }
        ]
      }}
    />
  );
}
