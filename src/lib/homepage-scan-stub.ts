import { isPublicHttpsUrl, normalizeToHttpsUrl } from "@/lib/url-safety";

export type HomepageScanStubResult =
  | {
      ok: true;
      host: string;
      message: string;
    }
  | {
      ok: false;
      message: string;
    };

/**
 * Temporary boundary for the homepage URL entry. Replace this function with the
 * real scan adapter when the analysis and checkout APIs are ready.
 */
export function submitHomepageScanStub(input: string): HomepageScanStubResult {
  const url = normalizeToHttpsUrl(input);

  if (!url || !isPublicHttpsUrl(url)) {
    return {
      ok: false,
      message: "Enter a valid public business website, such as yourcompany.com."
    };
  }

  return {
    ok: true,
    host: url.hostname,
    message:
      "Scan connection stubbed. The next integration should submit this website to the analysis API and open the real limited preview when it is ready."
  };
}
