# SailTru — Coastal engraving in motion

29 October 2026. Art-direction review, stages 1–2. Production site unchanged by this pass.

## The decision

Recommend a warm-paper, charcoal-engraving world with one restrained cobalt accent. Boats remain potential clients; bays remain businesses. The opening sits close to one buyer, then the camera reveals the market and finally the business's growing bay. This is an original coastal interpretation of Reddgrow's visual discipline, not a copy of its assets or claims.

Review: http://127.0.0.1:3012

The two responsive HTML compositions are static visual targets. They do not demonstrate working fleet animation, 3D cameras, exact marina capacity, traffic attribution, or measured business outcomes. The generated bay has approximate rather than production-exact berths. Those must be authored and verified in the implementation.

## What the fresh comparison shows

Reference: https://reddgrow.ai, inspected on desktop at 1280 × 720 and mobile at 390 × 844. Captures are under `artifacts/art-direction-v3/`.

| Layer | Reference observation | Current SailTru problem | Design response |
|---|---|---|---|
| Visual hierarchy | Large subject, stable headline/card, generous quiet paper behind copy | Pale distant world and oversized channel badges weaken the subject | One close buyer boat; high-contrast charcoal contours; a blue hull; smaller grey marks |
| Materials | Consistent drawn outlines and hatching across bees, flowers and hive | Primitive geometry and inconsistent detail feel like a diagram | A coherent engraving treatment across hulls, sails, piers, palms and coast |
| Palette | Mostly neutral paper and ink, with warm accents; some provider marks are colored | Low contrast makes both text and scenery feel washed out | Three main roles: ivory ground, charcoal structure, cobalt buyer/action; channel marks stay grey |
| Camera | Changes between a close subject, wider map and final outcome | Too much of the journey shares a distant fixed perspective | Six designed shots with visibly different scale/elevation, followed by still reading holds |
| Cards | Bordered foreground cards and compact query/answer details remain legible | Cards and badges can compete with the scene; large cards cover the geography | One primary card and at most one supporting detail at a time; quiet zones planned with camera |
| Story | Question, discovery, intervention and changed answer form a causal sequence | Same buyer returning can read as an unexplained reset | Show the first buyer's trip, then explicitly introduce a later buyer after implementation |
| Mobile | Copy first, then a large cropped subject; readable hierarchy | Shrinking the desktop world turns boats into tiny tokens | Dedicated portrait compositions and shorter copy, preserving a large boat or readable bay |

Reddgrow is not literally limited to three colors. The useful principle is consistent color roles and contrast. Nor should its stronger marketing claims be copied. SailTru can track, compare, prioritize and implement; it cannot promise a particular AI recommendation or conversion.

## Revised six-chapter storyboard

### 01 — A buyer asks

**Message:** Your next customer is looking for you.

A single blue-hulled buyer boat crosses open water. A small grey ChatGPT marker and one compact query bubble connect the boat to a discovery channel. The example question is “Which payment provider is the best?” The copy explains that SailTru helps with Google and AI visibility immediately, before the metaphor needs decoding.

**Camera:** Low three-quarter follow, approximately 15° elevation, 40° vertical FOV. Boat occupies about one-third of the visible scene width. Horizon and an identifiable lighthouse establish orientation. No busy background fleet in the first reading hold.

**Card motion:** Question appears after the boat settles; 240–320 ms opacity and a maximum 8 px translation. No continuous typing loop. The card is HTML, not baked into the artwork.

### 02 — They choose what they can find

**Message:** If you are missing from the shortlist, the journey can lead elsewhere.

An explicitly illustrative answer names fictional providers with criteria rather than invented scores. The buyer travels to the competitor bay. Your bay remains a separate, quieter destination. The grey marker indicates the channel used, not a boat owned by an AI company.

**Camera:** Pull back and rise to about 30°, turning no more than 25° to reveal the long crossing. Place the competitor roughly five main-bay widths away. Never compress both businesses into neighboring docks. A persistent coastline silhouette maintains geography.

**Motion:** Show sustained travel in open water before arrival. Fade the answer before the voyage becomes the main subject. One route is emphasized; no network of equally bright dotted lines.

### 03 — See where the gap is

**Message:** Know where you show up. Know who shows up instead.

SailTru observes search visibility, AI mentions and competitor presence. A concise comparison panel shows one query, your business and two competitors. All sample data is marked “Illustrative example.” It is not presented as measured client performance or a fabricated live dashboard.

**Camera:** Rise to a 55° overview. Both bays become visible at genuinely different ends of the water. Show direction and distance, then hold. The comparison card anchors in the quiet left area, with a single visual link to your bay.

**Card motion:** Reveal query, then comparison rows. Allow reading time. Ambient traffic becomes sparse and low contrast.

### 04 — Turn insight into work

**Message:** Find the next move. Then put it to work.

Descend into your bay. Surface concrete priorities: improve a comparison page, clarify service information, address technical SEO, strengthen evidence and relevant citations. A selected priority expands into the work SailTru helps deliver. The shoreline remains the same recognizable place. A lighthouse is repaired or illuminated on its small islet; a connecting pier and useful berths develop in stages, not by inflating the whole island.

**Camera:** Descend to 28° and dolly toward the existing lighthouse and business building. Move during the transition, stop while the priority card is read. Four berths become eight after the work is shown.

**Meaning:** The lighthouse represents discoverability; berths represent business capacity. They are visual metaphors, not a literal causal claim that adding content guarantees leads.

### 05 — Later, another buyer asks

**Message:** Give more buyers a reason to consider you.

Use a visible “Later · a new buyer” transition. Follow a new blue-accented buyer boat through a fresh discovery moment. An illustrative shortlist can now include your business with a relevant reason, but remains explicitly an example, not a guaranteed AI output. The buyer has a coherent path toward your bay. Other boats can still choose competitors.

**Camera:** Return to an 18° buyer-level view from a different bearing, with the same lighthouse ahead. A longer tracking approach makes the distance feel real. No hidden teleport or reset of the opening buyer.

**Motion:** The new buyer traverses the route in order. Its hull scale stays constant in world space; distance changes only through camera perspective. On reverse scroll, narrative progress reverses without disappearance or shrinking hacks.

### 06 — A bay ready for what is next

**Message:** More ways to be found. More room to grow.

Reveal a natural, larger-feeling bay with twelve authored berths and an understandable entrance. Buyers arrive, moor, dwell and depart on distinct lanes. Grey marks for Google, ChatGPT, Claude and Perplexity indicate their discovery channels. Use varied boat designs and modest physical size variation, not random changing scale.

The business building also introduces an optional capability: bespoke AI solutions and agent teams. A separate, calm office detail shows inquiry triage, research/reporting or workflow assistance inside the business. These are not buyer boats and never an assembly line. A primary CTA offers a discussion of the business's needs; no fabricated metrics or booking destination.

**Camera:** Rise to about 38° and ease back to reveal the whole cove, shore business, lighthouse islet and marina. Keep the client bay much larger in frame than the distant competitor. End with a stable composition, not an endless orbit.

## Motion specification for the build

- Roughly 35% of each chapter's scroll range changes the scene; the remaining 65% is a reading hold. Tune after a real browser pass, rather than enforcing long empty scroll stretches.
- Scroll controls camera, the principal buyer and narrative construction state. Time controls only restrained water, rigging and background fleet motion.
- Camera and hero path share one deterministic progress source. Scrubbing backwards restores coherent earlier states. Do not stack independent easing systems that cause drifting holds.
- Keep one hero boat visually primary. Start with no ambient fleet, grow to about six moving buyers on desktop and three on mobile plus moored boats. These are initial performance budgets, not measured limits.
- Boats follow smooth curves, align to route tangents and have distinct entry/exit lanes, docking and dwell segments. Turn offscreen or behind plausible occlusion; never shrink to zero or vanish in open water. Boat identity and grey channel mark remain attached.
- Query cards appear after camera settlement. Use 200–350 ms transitions; no bounce, infinite number counters, moving text or overlapping competing cards. One principal action per beat.
- Pause ambient animation when the scene or page is hidden. Reduced motion uses six stable chapter compositions and immediate readable copy. Chapter links remain keyboard accessible. Static fallback conveys the complete service story.
- Responsive art direction changes camera target and framing; it does not just reduce desktop geometry. At 390 px, keep the buyer recognizable, the question readable and the CTA separate from the illustration.

## Asset strategy and feasibility

**Recommended:** Author one coherent 3D coastal environment with a deliberately illustrated material treatment. Reuse the project's Three.js/R3F scene architecture, but replace placeholder-looking hero assets with properly modeled boats, natural shoreline and marina. Use a consistent silhouette/contour approach and baked hatching textures. Define the actual 4/8/12 berth groups, routes and camera shots in that shared world. Render real HTML type and cards above it.

**Proof assets:** The new raster illustrations were made with built-in imagegen. They are art-direction references and useful static fallback candidates. They do not contain separate boat/land/water layers and cannot honestly support arbitrary 3D POV changes. A flat image with CSS panning is not an acceptable substitute for the approved camera plan.

**First implementation gate:** Build one close buyer shot and one wide bay shot using the intended runtime assets, with a short working transition between them. Compare against these compositions before rebuilding all six chapters. If the engraving treatment cannot remain clean and performant in motion, report that gap and refine the assets; do not call approximate procedural geometry a match.

**Alternatives considered:** A layered 2D shot library could reproduce the still quality more directly, but would limit continuous camera movement and require individually separated boats and shoreline layers. Because meaningful POV changes are a fixed user requirement, it is a fallback tradeoff, not the default recommendation.

**Required authored assets:** One distinctive buyer hull plus two variations; sails/rigging at appropriate detail; main beach cove; distant competitor coast; lighthouse islet and pier; business house; office interior/detail; 4/8/12 berth marina groups; palms and rocks with repeatable linework; subtle water/wake treatment. Channel SVGs remain separate monochrome assets.

## Review and acceptance

Produced: opening and final-bay HTML compositions at desktop and mobile, screenshot comparisons, revised storyboard, camera/motion plan, asset strategy and generation prompts. Existing production source files have not been changed by this review pass.

Verified in the browser: 1280 × 720 desktop compositions; 390 × 844 mobile compositions; no horizontal overflow or unloaded images in checked mobile outcome; no console errors there. The review links navigate between the compositions and review board. Broader viewport, accessibility, runtime animation and performance checks belong to implementation, not this static proof.

Still unproven: consistent runtime linework, camera transitions, dock spacing/boat collision avoidance, persistent fleet loops, loading performance, Hebrew layout, reduced-motion scene substitution and real small-device frame rate. No claim of Reddgrow-level animated execution is made from static images.

The approved execution prompt specifies: “Pause for approval before implementing the full experience.” This review is that concrete stage-2 decision point. Approval should cover the engraving direction, the two compositions and the corrected buyer story; it does not waive the runtime quality gate.

## Files

- `artifacts/art-direction-v3/index.html` — comparison and storyboard review.
- `artifacts/art-direction-v3/opening.html` — responsive opening proof.
- `artifacts/art-direction-v3/outcome.html` — responsive bay proof.
- `artifacts/art-direction-v3/prompts.json` — exact image-generation prompts.
- `artifacts/art-direction-v3/serve.cjs` — local-only preview server, `node artifacts/art-direction-v3/serve.cjs`.

Original generated files remain in `C:/Users/User/.codex/generated_images/01a17a16-afb7-7a00-88c7-35b0e4016c80/`. Selected opening: `exec-964c9cf2-4239-4f44-9cae-9068b8ef1bb1.png`. Selected bay: `exec-2533a983-301f-485b-93d7-002511ae81ca.png`. The local copies are `opening-art.png` and `outcome-art.png`.
