import { JsonLd } from "@/components/seo/json-ld";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SailTru",
        url: "https://sailtru.com",
        logo: "https://sailtru.com/images/sailtrue-wordmark.png",
        email: "team@sailtru.com",
        sameAs: []
      }}
    />
  );
}
