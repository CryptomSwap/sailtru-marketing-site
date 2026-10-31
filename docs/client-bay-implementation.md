# Client bay implementation

29 October 2026. Implements the approved [client-journey storyboard](sailtru-client-journey-storyboard.md).

## Visible behaviour

- Boats represent potential clients; bays represent businesses. The blue boat is the buyer followed through the narrative.
- Grey ChatGPT, Claude, Google and Perplexity medallions identify discovery channels. Correct Claude mark replaces the former generic sparkle. Standalone badge assets include explicit SVG dimensions for reliable WebGL texture rendering.
- Six bilingual chapters: question, voyage, gap, implementation, return, growth. Cards remain in a stable reading region; on phones the scene sits above them.
- Main bay is a larger crescent beach with palms, business buildings, a lighthouse on its own small islet connected to a pier, and an expanding marina: 4 → 8 → 12 berths.
- Competitor centre is over 100 scene units away (about 4.6 main-bay widths). Outbound and return curves are approximately 105 and 152 units long.
- The hero follows scroll continuously. Ambient client boats use independent closed time-driven routes with berth pauses. Boat scale stays fixed during every voyage; no wraparound position reset or disappearing return boat.
- Seven ambient desktop voyages, four on mobile, plus the hero and two final moored visitors. One berth is reserved for the hero. Channel badges adapt to screen size and distance.
- Camera changes from low buyer tracking to travel, a wide market view, a bay close-up, return tracking and a settled final composition. Reading intervals hold the camera still.
- Optional bespoke AI appears as office workflows inside the business, with human review and separate contact paths. It does not change the meaning of client boats.
- Reduced-motion and WebGL fallback use the new static bay illustration alongside the full narrative content.

## Main implementation

- `client-voyage.ts`: pure buyer routes, fleet routes, camera poses and interpolation.
- `client-boats.tsx`: boats, grey channel textures, stable screen-facing badges and bay labels.
- `bay-world.tsx`: shoreline, lighthouse islet, pier growth, buildings, water and scene composition.
- `harbor-story-panels.tsx`, `harbor-narrative.css`: English/Hebrew messaging, cards, navigation and responsive layout.
- `bay-sketch.tsx`: static fallback illustration.
- `scripts/test-client-voyage.mjs`: meaningful motion geometry checks; `test-bay-story.mjs` forwards to the updated test.

## Verification

- 10,001 forward/reverse scroll samples: finite values, deterministic buyer positions and continuous camera movement.
- Explicit reading-hold checks and minimum world distance/path lengths.
- Three simulated minutes of each fleet curve: no positional reset discontinuity.
- TypeScript and ESLint passed for changed components.
- Production Next.js webpack build passed. A sandbox rerun encountered an EPERM error creating a generated page directory; running the build outside the sandbox completed successfully.
- Browser review across all six desktop chapters, English mobile at 390×844 and 360×667, and Hebrew at 360×667. No horizontal overflow in the inspected mobile views. Short-screen artwork was adjusted to avoid the final chapter's heading.
- Fresh mobile browser console was free of errors. No device FPS benchmark was performed. Static fallback is implemented and type/lint checked; OS reduced-motion emulation was not available in the browser tool.

Preview: http://127.0.0.1:3000/en#journey-start

Screenshots are under `artifacts/client-bay/`. This is a local implementation; no public deployment or GitHub push was performed.
