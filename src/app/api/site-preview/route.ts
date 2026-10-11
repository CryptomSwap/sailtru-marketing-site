import { NextResponse } from "next/server";
import { isPublicHttpsUrl, normalizeToHttpsUrl } from "@/lib/url-safety";

export const runtime = "nodejs";

const CAPTURE_TIMEOUT_MS = 9000;

function reject(reason: string, status: number) {
  return NextResponse.json({ ok: false, reason }, { status });
}

/** Captures a real screenshot of a public https homepage — never iframes the site or reads its share image. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = normalizeToHttpsUrl(searchParams.get("url") ?? "");

  if (!target || !isPublicHttpsUrl(target)) {
    return reject("unsupported-host", 422);
  }

  const captureUrl = `https://api.microlink.io/?url=${encodeURIComponent(target.toString())}&screenshot=true&meta=false&embed=screenshot.url`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CAPTURE_TIMEOUT_MS);

  try {
    const captureResponse = await fetch(captureUrl, { signal: controller.signal });
    clearTimeout(timeout);

    const contentType = captureResponse.headers.get("content-type") ?? "";
    if (!captureResponse.ok || !contentType.startsWith("image/")) {
      return reject("capture-failed", 502);
    }

    const image = await captureResponse.arrayBuffer();
    return new NextResponse(image, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "private, max-age=300"
      }
    });
  } catch {
    clearTimeout(timeout);
    return reject("capture-failed", 502);
  }
}
