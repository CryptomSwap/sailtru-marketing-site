import { cookies } from "next/headers";

export const FREEMIUM_COOKIE = "sailtru_free";
const MAX_AGE = 60 * 60 * 24 * 30;

export type FreemiumSession = {
  email: string;
  host: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOST = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

function secret() {
  return process.env.FREEMIUM_SESSION_SECRET ?? "sailtru-freemium-dev-only";
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlToBytes(value: string) {
  const pad = value.length % 4 === 0 ? "" : "=".repeat(4 - (value.length % 4));
  const binary = atob(value.replaceAll("-", "+").replaceAll("_", "/") + pad);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function hmac(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export function parseScanHost(host: unknown) {
  if (typeof host !== "string") return "";
  const cleanHost = host.trim().toLowerCase().replace(/\.$/, "");
  return HOST.test(cleanHost) ? cleanHost : "";
}

export function parseFreemiumInput(email: unknown, host: unknown): FreemiumSession | null {
  if (typeof email !== "string") return null;
  const cleanEmail = email.trim().toLowerCase();
  if (!EMAIL.test(cleanEmail) || cleanEmail.length > 200) return null;
  return { email: cleanEmail, host: parseScanHost(host ?? "") };
}

export async function sealFreemiumSession(session: FreemiumSession) {
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(session)));
  return `${payload}.${await hmac(payload)}`;
}

export async function openFreemiumSession(token: string | undefined): Promise<FreemiumSession | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  if (!safeEqual(signature, await hmac(payload))) return null;
  try {
    const parsed = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as FreemiumSession;
    return parseFreemiumInput(parsed.email, parsed.host);
  } catch {
    return null;
  }
}

export async function readFreemiumSession() {
  const jar = await cookies();
  return openFreemiumSession(jar.get(FREEMIUM_COOKIE)?.value);
}

export const freemiumCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};
