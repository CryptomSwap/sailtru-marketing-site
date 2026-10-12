import { cookies } from "next/headers";
import {
  FREEMIUM_COOKIE,
  freemiumCookieOptions,
  parseFreemiumInput,
  sealFreemiumSession,
} from "@/lib/freemium-session";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as { email?: unknown; host?: unknown }) : {};
  const session = parseFreemiumInput(record.email, record.host);
  if (!session) return Response.json({ error: "invalid" }, { status: 400 });

  const jar = await cookies();
  jar.set(FREEMIUM_COOKIE, await sealFreemiumSession(session), freemiumCookieOptions);
  return Response.json({ ok: true, host: session.host });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(FREEMIUM_COOKIE);
  return Response.json({ ok: true });
}
