# One bay, a working fleet

Implemented 29 October 2026 after the boat/bee and bay/beehive concept review.

The client business is a single crescent bay. SailTru's boats scout discovery channels, compare neighboring businesses, bring back a finding and support the work. The client is no longer represented by a traveling boat.

## Experience

1. Establish the bay: beach, palms, studio, lighthouse and pier; two scouts depart.
2. Pull back to the market: neighboring bays accompany a literal competitor comparison.
3. Return with evidence: the same pricing-answer gap becomes a recommendation.
4. Implement: a page board fills in while the studio, awning, arrival path and pier improve.
5. Add capacity: an optional AI crew takes work off the waterfront, with human review described in the artifact.
6. Return to the opening camera: completed improvements remain visible and the cards explain what to measure next.

Oak & Form and its observations are explicitly illustrative. Physical upgrades represent the work; no invented performance gains are displayed. AI services remain independently available.

## Implementation

- `bay-world.tsx`: procedural shoreline, palms, studio, sails, fleet, evidence delivery and incremental upgrades.
- `bay-story.ts`: deterministic scouting routes and six camera poses. Opening and closing poses match exactly.
- `harbor-three.tsx`: scene integration and error boundary.
- `bay-sketch.tsx`: static bay for reduced motion and WebGL fallback.
- `harbor-story-panels.tsx`: bilingual copy and literal evidence artifacts.
- `harbor-narrative.css`: stable reading areas, scene blending and mobile layout.

No new dependencies or remote model downloads were added. The preexisting hero, report and enquiry integration remain outside this animation change.

## Verification

- TypeScript passed.
- ESLint passed for the changed scene, route, fallback and panel components.
- `node scripts/test-bay-story.mjs`: 10,001 route samples, reverse-scroll determinism, minimum 2.75-unit scout separation, camera reading holds and identical opening/closing composition.
- Production build passed with `node node_modules/next/dist/bin/next build --webpack`, including all 20 static pages. The build required running outside the filesystem sandbox to create generated Next.js folders.
- Browser-reviewed desktop chapters, English at 390 × 844, Hebrew at 390 × 844 and 360 × 667. No horizontal page overflow in the checked mobile views.
- No browser console errors in the final desktop review.
- Screenshots are in `artifacts/bay-story/`.

Reduced-motion fallback is implemented and type-checked; OS reduced-motion emulation was not available through the active browser tools. This was not a device FPS benchmark.

Local site: http://127.0.0.1:3000/en#journey-start

The earlier static storyboard remains at port 3011. This work is local and has not been deployed or pushed to GitHub.
