# Business workspace homepage

30 October 2026. First implementation of the [redesign plan](sailtru-redesign-plan-2026-10-29.md).

## Delivered

- Replaced the homepage's separate cobalt hero and harbor journey with one editorial experience in ivory, cobalt and charcoal, with a contrasting bespoke-work section.
- Added an original Three.js scene: evidence/report, intelligence stack and workflow output connected by routes. A window-level pointer input drives damped camera position and viewing-target offsets, including when the cursor is over HTML. Reading surfaces and hit targets stay fixed.
- Added interactive Business, Competitors, SEO and GEO report examples with evidence, recommendations, coverage and measurement. All examples are labeled illustrative.
- Added a five-stage bespoke workflow: enquiry, company context, research, human review and CRM handoff. Each stage displays its own explanation and example output.
- Added service coverage, measurement loop, FAQs, report/build contact paths and English/Hebrew content. The sample is not connected to a live analysis service or checkout.
- Added responsive compositions, semantic HTML content, keyboard-operable controls, native anchor navigation, reduced-motion handling, a pause-motion toggle, progressive static artwork and WebGL-error fallback.
- Updated homepage metadata. Removed the unrelated background video and floating contact stack only on the homepage via `SiteAmbient`; inner-page behavior is preserved.

## Motion behavior

The pointer listener is passive and viewport-wide. Animation uses elapsed-time damping. Rendering is demand-driven: input wakes the frame loop, which stops when the view settles; the WebGL scene is not awakened when off screen. Hidden-tab work stops. Coarse pointers do not drive parallax. Reduced motion and the pause button select the static composition. A context-loss listener restores fallback visibility.

The main dimensional scene is in the opening; lower sections use restrained pointer-responsive illustration details. This is the first working interpretation, not the complete seven-shot continuous cinematic sequence from the plan. No FPS or Core Web Vitals certification is claimed.

## Verification

- Production Next.js webpack build passed, including TypeScript and static generation for both locales.
- The final sandboxed rerun encountered Windows EPERM on a generated `_not-found` directory. Repeating the same build with approved filesystem access passed all compilation and generation stages.
- Targeted ESLint passed for the new components and modified page/layout.
- Browser review: desktop at default 1266×712 and 1440×900; mobile at 390×844; Hebrew opening at 360×667 and Hebrew report at 390×844. No horizontal overflow observed in the inspected mobile views.
- Report controls: Business, Competitors, SEO and GEO; Hebrew GEO selection also verified.
- All five workflow stages verified against their visible output headings.
- Mobile menu opens and its report link navigates correctly.
- Pointer input over the headline changes the shared motion values and scene viewpoint, while the heading remains at the same horizontal position.
- Pause motion removes the canvas and shows the static artwork; enabling motion remounts the canvas. OS-level reduced-motion emulation and forced WebGL-loss testing were not available in this browser session; those paths were code-reviewed, not claimed as browser-tested.
- Browser console showed no errors or warnings during the reviewed interactions.
- The build emits the repository's existing Next.js middleware-deprecation notice.

Screenshots: `artifacts/business-workspace/desktop-opening.png`, `desktop-workflow.png`, `mobile-workflow.png`, `hebrew-report.png`.

Preview: http://127.0.0.1:3000/en . No production deployment or Git push was performed. Existing harbor assets and unrelated working changes remain in the repository, but the homepage no longer imports the old scene.
