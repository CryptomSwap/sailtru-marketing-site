# ReddGrow reference review — 26 October 2026

## Verified implementation

Inspected https://reddgrow.ai/ in the browser at multiple scroll positions and read its publicly served entry and garden bundles. The entry is Astro-generated and dynamically loads the garden after window load; a failure adds a no-WebGL class. The garden bundle includes Three.js and GSAP 3.15.0. The page includes Lenis styles. The camera update explicitly changes position, look-at target, field of view and view offset, plus small time/pointer offsets. This is live 3D with DOM overlays, not a video sequence. The scene code uses instanced repeated geometry, shader materials, hull/outline geometry, bee route updates and independent wing motion. This does not establish their original authoring tools or every runtime detail.

## Why it works — design interpretation

- A persistent world supplies continuity; changes in framing reveal new relationships instead of swapping unrelated illustrations.
- Camera changes serve the argument: establishing view, source/collector detail, missing-brand problem, intervention, outcome.
- Low-saturation scenery and thin ink edges keep dense geometry subordinate to the bees and product message.
- Main captions are readable HTML panels with thin borders and hard offset shadows. Smaller cards demonstrate what the caption means. Alternating sides leave room for the current subject.
- Each beat has one message. Copy moves from a buyer's question to a problem, mechanism and outcome rather than listing generic capabilities.
- Provider marks give moving objects a role. Trails explain travel; idle movement keeps the world alive between scroll events.
- Commercial cards below the story separate outcomes, details and actions. Expanded information stays secondary.

## Adaptation implemented

Keep SailTru's existing cobalt hero. Extend the current harbor into a full-width scene; use authored perspective shots with changing target, lens and horizontal composition. Keep scroll-triggered construction and autonomous logo-bearing boats. Alternate high-contrast narrative panels with smaller concrete example cards. Strengthen edge lines and retain matte materials. Rewrite English chapter copy around discovery, the next step and evidence. Keep example findings explicitly illustrative, retain the pending-analysis disclosure, and do not import testimonials, pricing, growth claims or promises of guaranteed AI citations.

## Remaining art-direction gap

The reference has a more extensive custom ink/hatching treatment and denser environmental composition. Our procedural harbor still has a simpler material vocabulary. This pass changes direction, story and card hierarchy; it is not a pixel-identical recreation or a claim of equal visual finish. The next focused art pass should unify lighthouse, shore, sails and water under a shared ink-and-hatching material system, rather than adding more unrelated objects.

## Verification

TypeScript and targeted ESLint checks; browser review of desktop and mobile layout, changing camera composition, visible provider marks and revised cards. No deployment or backend capability changes.
