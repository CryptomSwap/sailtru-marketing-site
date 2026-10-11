const PRIVATE_IPV4_PATTERNS = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^0\./,
];

function isPrivateIPv4(host: string): boolean {
  return PRIVATE_IPV4_PATTERNS.some((pattern) => pattern.test(host));
}

function isPrivateIPv6(host: string): boolean {
  if (host === "::1" || host === "::") return true;
  return /^(fc|fd|fe8|fe9|fea|feb)/.test(host);
}

/** Strips any scheme the user typed and rebuilds the URL as https. */
export function normalizeToHttpsUrl(input: string): URL | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const withoutScheme = trimmed.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, "");
  if (!withoutScheme) return null;

  try {
    return new URL(`https://${withoutScheme}`);
  } catch {
    return null;
  }
}

/** True when the URL is https and its host is not localhost, loopback, or a private range. */
export function isPublicHttpsUrl(url: URL): boolean {
  if (url.protocol !== "https:") return false;

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (!host) return false;
  if (host === "localhost" || host.endsWith(".localhost")) return false;
  if (isPrivateIPv6(host)) return false;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) && isPrivateIPv4(host)) return false;

  return true;
}
