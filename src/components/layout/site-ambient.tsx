"use client";

import { usePathname } from "@/i18n/navigation";
import { CodeWaveBackground } from "@/components/ui/code-wave-background";
import { FloatingContactStack } from "@/components/ui/floating-contact-stack";

/** The homepage supplies its own environment and contact navigation. */
export function SiteAmbient() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <><CodeWaveBackground /><FloatingContactStack /></>;
}
