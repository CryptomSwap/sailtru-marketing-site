# Harbor reading hierarchy — 27 October 2026

Reference: https://reddgrow.ai/ (live browser review of the opening, source collection, and missing-brand chapters).

## Observations and interpretation

The reference uses paper and ink for most of its scene, red for the commercial message, and small yellow/provider-color exceptions. It is not literally three RGB values. The useful principle is a limited hierarchy of color roles. Main cards are opaque with strong typography; the illustrated background has less contrast. Secondary cards demonstrate the current statement. Short copy and stable reading positions do as much work as the palette.

SailTru had accumulated independent water, vegetation, brass, architecture and marker colors. The camera crossed the harbor while multiple boats and four boxed signs competed with the message. Its scroll-based text opacity could also leave a paragraph partially transparent when scrolling stopped.

## Implemented

- Shared paper/ink/cobalt palette in `harbor-palette.ts`; neutral material tints throughout the harbor, island terrain, machinery and water. Provider logos remain small branded exceptions.
- Protected reading area, opaque main/evidence cards, shorter English copy, semantic phrase emphasis, and a three-stage indicator.
- One visible reading layer at every scroll position. Camera transitions precede chapter switches and hold during reading intervals.
- Stable view from the same side of the harbor, softer water strokes and hatch marks, fewer simultaneous vessels, unboxed destination captions that appear with their relevant chapter.
- Natural islands and industrial assembly platforms retained. Cargo moves during the build chapter. Fleet speed and constant boat scale retained; the circuit now avoids the enlarged platforms and the mainland.
- Reduced-motion CSS still presents all chapters in document flow with a static harbor illustration. New layout rules apply only under no-preference.

## Validation

TypeScript and targeted ESLint passed. Live local-browser review covered the main English chapters at desktop width and the prioritize/build layouts at 390 × 844. Screenshots are in `artifacts/harbor-focus/`. No backend, form, pricing, testimonial, or deployment changes.

This adopts the reference's visual hierarchy while keeping SailTru's harbor story and cobalt identity; it does not reproduce ReddGrow's bee/garden artwork or business claims.
