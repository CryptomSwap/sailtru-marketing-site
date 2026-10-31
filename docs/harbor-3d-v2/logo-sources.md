# Provider logo sources (harbor homepage)

The harbor story shows three platform marks on neutral badges attached to the
provider boats in the Find chapter. They identify the platforms SailTru examines
(where buyers search and ask); they do not imply affiliation, partnership,
endorsement or a guaranteed recommendation, and the page says so beside them.

Files are self-hosted under `public/images/providers/` and are byte-identical
copies of the package files listed below (no edits, no redrawing). Checked on
2026-11-01.

| file | mark | source (package, version, path) | license of the file | sha256 |
|---|---|---|---|---|
| `chatgpt.svg` | OpenAI blossom (the ChatGPT mark) | npm `@lobehub/icons-static-svg@1.101.0`, `icons/openai.svg` (https://github.com/lobehub/lobe-icons) | MIT (package) | `a595df6b423920c67a7f8f73c063e4bfb72d415948097b6cac063a2366bb5186` |
| `google.svg` | Google "G", four colours | npm `@lobehub/icons-static-svg@1.101.0`, `icons/google-color.svg` | MIT (package) | `4e6aa8892ef15a6b431f40f2c9045979bf7e2357524e7bbb89b353cf4f32a5ac` |
| `perplexity.svg` | Perplexity mark, brand turquoise `#22B8CD` | npm `@lobehub/icons-static-svg@1.101.0`, `icons/perplexity-color.svg` | MIT (package) | `8353f3ab20822f1a933224b0ea32cc39f0c32d5740f4af8c254b0f418e0a3a70` |

Sizes: chatgpt.svg 1,687 B (910 B gzip -9), google.svg 920 B (548 B), perplexity.svg 603 B (427 B).

## How they were checked

- Downloaded `@lobehub/icons-static-svg@1.101.0` and `simple-icons@16.36.0` with `npm pack` into a scratch directory.
- Rendered the candidates side by side in headless Chromium:
  - Google: the lobe-icons colour G and the simple-icons G (source `partnermarketinghub.withgoogle.com`, guidelines `about.google/brand-resource-center/brand-elements/`) have the same shape. The lobe-icons file uses the four Google colours.
  - Perplexity: the lobe-icons and simple-icons marks (source `perplexity.ai`) show the same design; the lobe-icons file has the current, thinner line weight.
  - ChatGPT/OpenAI: simple-icons 16 no longer ships an OpenAI icon. The lobe-icons blossom was compared with the older OpenAI blossom already in this repo (`public/images/brands/openai.svg`, from an earlier simple-icons release); same mark, current geometry.
- Not checked against the providers' own press kits directly (no download of those kits in this run).

## Usage notes

- The marks are trademarks of their owners (OpenAI, Google, Perplexity AI). The package licenses cover the SVG files, not the trademarks; simple-icons' DISCLAIMER makes the same point.
- Use: nominative, to name the platforms being examined in an illustrative example. Each mark sits unaltered on the same neutral circular badge (ivory fill, charcoal outline). Marks are not recoloured, stretched or combined with SailTru's logo.
- Claude and Gemini marks are not used: no story beat needs them.
- `public/images/brands/` (used elsewhere on the site) is unchanged.
