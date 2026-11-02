/**
 * The platforms where buyers search and ask, shown as neutral badges on the
 * provider boats. They name the platform being examined; they imply no
 * partnership or recommendation. Sources of the marks:
 * docs/harbor-3d-v2/logo-sources.md.
 */
export type ProviderId = "chatgpt" | "google" | "perplexity";

export class Providers {
  /** The active provider first, then the two supporting boats. */
  static readonly ORDER: ProviderId[] = ["chatgpt", "google", "perplexity"];

  static logo(id: ProviderId): string {
    return `/images/providers/${id}.svg`;
  }
}
