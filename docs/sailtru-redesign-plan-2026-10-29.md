# SailTru: from business intelligence to bespoke AI

Design and messaging plan · 29 October 2026

## Decision

Rebuild the homepage around **“Understand your business. Build your next move.”** Give reports and bespoke AI implementation substantial demonstrations within one continuous story. Match the reference's level of visual direction and responsiveness, while explaining SailTru's broader business.

This is a redesign specification, not an implemented redesign. Existing assets are optional. The next deliverable should be a short, working vertical slice of the new experience, not another round of polishing the whole harbor.

## What this review changes

The [27 October assessment](reddgrow-design-motion-audit.md) remains useful historical evidence, but its implementation advice predates the current client-bay version. Today's active path is `IllustratedJourney → JourneyRoute → HarborThree → BayWorld`, with camera shots in `client-voyage.ts`. The old audit's camera-height and scene-width observations must not be treated as measurements of this version.

For this review I read the canonical company definition, commercial messaging brief, previous assessments and current implementation; opened the local preview; and revisited the live reference's opening, collection and mapping compositions. The local preview was available at `http://127.0.0.1:3000/en#journey-start`. The public SailTru page was not retrievable through the web tool, so findings about our current design refer to the local build.

The reference's exact pointer coefficients below come from the archived public script already in this repository. Fetching that script again failed; they are historical implementation evidence, not a claim that I measured today's pointer response. This review is not a device-performance benchmark or a fresh full mobile/RTL audit.

## What to learn from ReddGrow

[ReddGrow's live page](https://reddgrow.ai/) connects a buyer question, a missing brand, a specific intervention and a changed answer. Its illustrated environment and foreground UI share a consistent visual treatment. Changes in camera distance make individual actions and wider relationships legible. The page then moves into proof and commercial offers.

The archived [public scene script](https://reddgrow.ai/_astro/garden.o4yyCp_X.js) normalizes pointer coordinates, smooths them, and offsets both camera position and viewing target. Ambient drift is a separate input. Pointer amplitude is modulated by the current shot. This creates depth while leaving the primary reading surface stable.

My interpretation: its strength is coordination. Copy, viewpoint, demonstration and motion explain the same event. SailTru needs that coordination across a broader offer. Copying the garden, adding more scenery, or making every element follow the cursor would not achieve it.

## Where SailTru falls short now

| Area | Current evidence | Required change |
| --- | --- | --- |
| Company story | Most of the six chapters follow a buyer through AI discovery; custom AI enters mainly at the end | Make business intelligence and implementation the main story; search is one important application |
| Reports | The report explanation follows the immersive sequence | Put a recognizable report and its coverage inside the main sequence |
| Bespoke work | Mostly summarized in a final workflow panel and supporting copy | Show a substantial scoped system, how it uses client context, and what it produces |
| Visual composition | The opening has a prominent boat, but the wider map can reduce the business to a small island surrounded by empty space | Design around legible business artifacts and purposeful close, medium and overhead shots |
| Mouse response | Hero dots respond to the pointer; the active bay camera samples only scroll progress | Use one shared pointer input across the immersive experience, including over HTML overlays |
| Continuity | Cobalt hero followed by a separate pale scene, with another story masthead | One visual environment and one navigation hierarchy from first paint |
| Conversion | Hero and later scan paths differ; later form calls a stub and displays integration-pending copy | One honest, consistent report entry; a separate direct route for bespoke projects |

The buyer/bay metaphor explains acquisition reasonably well. It is less effective at explaining business analysis, report contents, operational problems and tailored AI. Do not force all of those services to become additional islands or boats.

## Positioning and opening copy

**Category:** Business intelligence and bespoke AI solutions.

**Eyebrow:** Business intelligence. Bespoke AI.

**Headline:** Understand your business. Build your next move.

**Supporting copy:** See where your business stands—with reports on competitors, search and AI visibility, and opportunities to improve. Then turn the priorities into action with solutions and AI agents built around your business.

**Primary action:** Explore your business report.

**Secondary action:** Build with SailTru.

**Orientation line below the opening:** What should your business improve next—and how can we make it happen?

These are proposed words, not claims that all report checks are live. “Explore your business report” should lead to an explanation/sample while analysis is unavailable. Once connected, the form can say “Analyze my business” and explain the limited preview before submission. Do not make an inactive scan look functional.

Use the same identity in page titles, social metadata and service pages. The current browser title leads with SEO/GEO; the proposed title is “SailTru — Business Intelligence & Bespoke AI Solutions.”

## The story: evidence becomes action

Use one illustrative business throughout: a B2B service company that wants better-qualified enquiries and less repetitive preparation work. Its public presence can reveal visibility/content gaps; discovering its internal preparation bottleneck requires a conversation and client-provided workflow information. Show that handoff explicitly.

The recurring object is the **business brief**: sources become findings, findings become priorities, and a chosen priority becomes an implementation brief. Preserve the same title, identifier and cobalt accent through those transformations.

Do not imply every finding needs AI. A content or website change may be the appropriate recommendation. A visitor with an existing AI project can enter directly through Build without purchasing a report.

| Beat | Proposed heading and message | Visible demonstration | Camera and movement |
| --- | --- | --- | --- |
| 1. Orient | **Understand your business. Build your next move.** Establish both offers immediately | A single business at the center of a restrained dimensional workspace, with evidence arriving on one side and a completed workflow visible on the other | Close three-quarter establishing view; immediate gentle pointer depth |
| 2. Understand | **See the whole picture.** Bring competitors, visibility and business opportunities into one view | Four clearly labeled report sections gather source-backed findings: Business, Competitors, SEO, GEO | Rise to a readable overview; select one finding rather than filling the screen with dashboards |
| 3. Prioritize | **Know what deserves attention first.** Explain what matters and why | One finding expands into evidence, implication, confidence, recommended action and estimated effort | Move close enough to read the artifact; hold the camera while the finding is explained |
| 4. Deliver the report | **A report you can act on.** Show the actual product and scope | A short executive summary, category coverage, source references and prioritized action plan; distinguish limited preview from full report | Report becomes the focal object; HTML text stays crisp and still |
| 5. Choose the implementation | **Turn the next move into real work.** Implementation follows the need | The brief branches into a website/content improvement and a separately discovered workflow opportunity; a small handoff says “With your team: map the workflow” | Move from the evidence view into an implementation workspace; no unexplained boat transformation |
| 6. Build bespoke AI | **AI built around the way you work.** Demonstrate curation, not a generic agent catalog | Approved enquiry → company context → research → draft preparation brief → human review → CRM handoff. Highlight the systems, rules and review steps chosen for this client | Close workflow view; one step activates at a time; a readable output replaces abstract machinery |
| 7. Measure and continue | **See what changed. Choose what comes next.** Close the intelligence/execution loop | Compare defined visibility measures or workflow handling time against a baseline; feedback returns to the brief | Pull back to reveal the connected process; settled closing composition and two clear actions |

Suggested supporting copy for beat 6: “We curate the models, tools and knowledge your team needs, then build the workflows, agents and integrations around them. From a focused automation to a coordinated agent team, the system fits your process.”

Label all hypothetical examples as illustrative. Show no invented uplift, fabricated ranking, live progress or simulated customer analysis. Proposed workflow examples are capabilities to scope, not a claim that a packaged product exists.

## Give every service a concrete deliverable

The homepage story introduces the relationship between services. A scannable section immediately afterward explains their individual scope; visitors should not need to replay the animation to find an offer.

| Service | Buyer question | What to show or describe |
| --- | --- | --- |
| Business analysis | Where should we focus? | Business and digital-presence findings, strengths/gaps, growth opportunities, ranked actions and assumptions; deeper operational analysis requires discovery and data access |
| Competitor analysis | Who are we competing with, and where are the gaps? | Named comparison set, positioning, offers, content, visibility and evidence-supported opportunities |
| SEO visibility and placements | Where do we appear in search? | Query/page/market context, observed positions where available, technical/content findings and prioritized improvements |
| GEO visibility and placements | Where does our brand appear in AI answers? | Prompt, engine, date and location where available; brand mentions, citations and comparison with competitors. Explain that these are sampled answers, not a universal ranking |
| Reports | What do I receive? | Executive summary, included categories, evidence references, recommended priorities and next steps; show limited versus full coverage explicitly |
| Bespoke AI solutions | What can you build for our actual process? | Curated model/tool selection, knowledge integration, custom interfaces, workflow automation and integrations, defined during discovery |
| Specialized agents and agent teams | Which tasks can a system help handle? | Research, competitive monitoring, lead qualification, internal knowledge, customer support or reporting examples; show inputs, output, review and ownership |
| Implementation and monitoring | Who does the work and checks it? | Website/content/software delivery where appropriate; scoped deployment, evaluation, handover and ongoing measurement where contracted |

“Placements” needs a plain-language definition: observed search positions or presence in AI answers. Do not imply guaranteed inclusion or guaranteed placement purchasing. If placement execution is offered, explain the specific work and its limits separately from measurement.

The report may recommend implementation, but implementation and recurring monitoring are separately scoped. Never make a report purchase the price of admission to a bespoke project.

## Visual direction: a living business workspace

Recommended direction: an editorial, dimensional environment that moves from an evidence table to a working system. Subtle navigation/chart motifs preserve SailTru's identity without requiring a literal voyage to explain every capability.

- Warm ivory ground, charcoal structure, cobalt for the active finding or action. Use restrained secondary colors only when needed for real status distinctions.
- Large crafted objects with clear silhouettes, consistent edge treatment, material detail and lighting. Spend detail where the camera actually looks.
- Make the business brief, report and workflow the hero assets. A boat, coastline or lighthouse may provide atmosphere if it earns its place in a composition; none is mandatory.
- Build foreground, middle and background layers so pointer movement reveals real depth. Keep the headline and controls in a protected reading area.
- One display type treatment, comfortable body copy, understated labels. Start around 64–80 px desktop and 36–44 px mobile headings, 18–20 px desktop and 16–18 px mobile body, then tune using real English and Hebrew text.
- Plan each still at 1440×900 and 390×844 before animation. Each must communicate one service idea without requiring the motion to rescue it.
- Preserve scene continuity between the hero and story. Remove the visual restart and duplicate masthead.

Create new assets where they materially improve the result: business scene, report anatomy, evidence cards, custom workflow components, and finished output. Reuse old assets only after they pass the new composition and material tests.

## Mouse movement: a first-class acceptance requirement

The experience should respond whenever the visitor moves the mouse within the page viewport while an immersive scene is visible—including when the pointer is over copy, cards or the navigation. This does not mean moving the text or making forms chase the cursor.

**Reference evidence:** the archived script smooths normalized pointer values with a `0.04` per-frame blend. It applies horizontal camera offset `1.6 × pointerX × shotStrength`, vertical offset `−0.5 × pointerY × shotStrength`, and horizontal look-target offset `2 × pointerX × shotStrength`. Sine drift is added separately. These world-unit values are scale-dependent; they are not drop-in values for SailTru.

**Implementation specification:**

1. One passive window-level pointer listener stores normalized coordinates in refs. Avoid React renders on every pointer event. Pointer tracking must continue over DOM overlays.
2. Use frame-rate-independent damping: `alpha = 1 - exp(-deltaSeconds / tau)`. Start with `tau = 0.25–0.4s`; tune the feel in the prototype rather than copying frame-dependent coefficients.
3. Compute the scroll-directed base pose first. Add pointer offsets in the camera's local right/up axes; apply a smaller separately tuned target offset. Never accumulate offsets into last frame's pose.
4. Define pointer strength per shot. Start with background landmark displacement around 8–24 CSS pixels at full pointer travel, with stronger depth at the opening and less during report reading. This is a proposed visual target, not a reference measurement.
5. Keep text, buttons, forms and the pointer itself stable. A scene-attached card may have up to 2–6 px of optional secondary movement if readability survives. No cursor replacement or magnetic form controls.
6. Add slow ambient motion at lower amplitude than intentional pointer motion. Ambient time must not advance report findings or workflow completion.
7. Ease toward center when the pointer leaves or the window loses focus. Stop unnecessary rendering in hidden tabs and outside the scene; clean up listeners on navigation.
8. Disable pointer parallax for reduced motion and coarse pointers. Keep native touch scrolling; do not require device tilt. A static composition must retain the complete message.

Outside the immersive sequence, use quieter depth in section artwork while keeping service and proof content still. “Immersive” should feel responsive and controlled, not like every page element is floating.

**Verification:** at a fixed scroll position move left/right and up/down across the canvas, headline and CTA. Depth must respond smoothly without scroll or clicks; text and hit targets must remain fixed. Repeat at the report close-up, during scroll transitions, after leaving/re-entering the viewport, and at 60/120 Hz when available. Check that the scene settles without jitter and that reduced motion removes the effect.

## Page structure and conversion

1. Unified opening with report and bespoke-build entry points.
2. Compact verified proof strip early, before the longer explanation. Use existing client evidence only after its wording, measurement period and attribution are checked.
3. The seven-beat story, with visible chapter navigation and “Skip to services.” No forced wheel capture or required viewing duration.
4. Clear service coverage: Intelligence & Reports / Bespoke AI & Implementation. Include real/sample deliverables and direct links.
5. A detailed case study connecting problem, decision, delivered work and measured outcome. A sample deliverable is preferable to invented social proof.
6. Report offer: limited versus full, included categories, delivery expectations and actual price when available.
7. Bespoke engagement: discovery → scope → prototype → evaluate → deploy/handover → optional monitoring. Explain what makes the solution specific to the client.
8. FAQ and final two-door CTA. Questions should cover report coverage, source limitations, AI build scope, access requirements, ownership/support terms when defined, and whether a report is required.

Keep service headings and substantive copy in semantic HTML. The cinematic version enhances the explanation; it must not be the only way to access it.

## Build plan and completion gates

| Phase | Work and deliverable | Gate before expanding |
| --- | --- | --- |
| 1. Message and scope | Finalize hero, seven beats, service matrix, report contents, sample business and CTA destinations | A reader can identify both offers, name the report coverage, and understand the separate build path without seeing artwork |
| 2. Art direction | Create a small new asset kit and rendered desktop/mobile stills for opening, report and bespoke workflow | Clear focal point, distinct camera compositions, readable artifacts, cohesive materials; old assets earn reuse individually |
| 3. Working vertical slice | Implement opening → finding → report close-up with pointer camera movement, one artifact handoff and a reduced-motion version | Live mouse response over the entire viewport, stable copy, no washed-out intermediate stops, convincing depth and readable evidence |
| 4. Complete story | Extend the same motion/state system through implementation and measurement; add service and proof sections | Bespoke AI gets its own substantial demonstration; one traceable brief connects the story; reverse/fast scrolling remains coherent |
| 5. Product paths and languages | Unify report entry, implement real available states, connect build contact, complete English/Hebrew layouts | No dead CTAs or fake analysis; RTL and keyboard paths work; report purchase and project scope are clearly distinct |
| 6. Performance and final review | Profile rendering/loading; test touch, reduced motion, WebGL failure and content readability | Meets the checklist below; compare against reference at the same viewport before release |

This is a sequence of reviewable deliverables, not a promise of a delivery date. Asset creation and actual report integration are the main scope variables. The first implementation investment should stop at phase 3 until the visual and motion quality is demonstrated.

### Technical approach

The installed Next.js, Three/R3F and GSAP stack is sufficient. No library migration is required to achieve this direction.

- Introduce a single renderer-independent story definition: chapters, transitions, reading holds, active artifact and implementation state. Camera, DOM and objects consume it.
- Keep three inputs distinct: scroll controls narrative progress; pointer controls view offset; time controls ambient life. Scroll reversal should deterministically restore story state.
- Use a single smooth-scroll owner and avoid competing camera writers. The existing hero pointer field and bay scene should share a consistent input policy.
- Keep meaningful copy server-renderable. Load the 3D enhancement progressively over a composed fallback image; avoid blank “preparing” states as the main first impression.
- Replace the current composition through a dedicated preview route before switching the homepage. Preserve existing unrelated working changes. Do not retain legacy scenes in the new route's import graph merely because they exist.
- Primary integration points: `src/app/[locale]/page.tsx`, `home-v2/home-hero.tsx`, `illustrated-journey/illustrated-journey.tsx`, `journey-route.tsx`, `harbor-three.tsx`, `bay-world.tsx`, `client-voyage.ts`, `harbor-story-panels.tsx`, report/scan components and both locale files. These are current entry points, not a requirement to keep their names in the redesign.

### Definition of done

- After a five-second opening view, a new visitor can identify business intelligence/reports and bespoke AI as the two offers. Validate with a small comprehension review, not an aesthetic opinion alone.
- Business, competitors, SEO and GEO each have a named, visible report deliverable.
- The bespoke example shows client context, selected tools/knowledge, a workflow, a useful output and human oversight where appropriate.
- At every sampled stop, at least one full-strength headline and explanation remain readable. Test fast scroll, reverse scroll and direct chapter jumps.
- Pointer movement produces visible depth over canvas and HTML at every desktop story beat, with no moving text or controls.
- Inspect 1440×900 and 1280×720 desktop; 390×844 and 360×667 mobile; both locales. No clipped artifact, horizontal overflow or oversized empty geography.
- Mobile uses a shorter normal-flow sequence of large compositions and complete copy, rather than shrinking a long desktop theater. Reduced motion and WebGL failure retain all service information and CTAs.
- Target 60 fps on the chosen representative desktop, with sustained frames near/below 16.7 ms during pointer + scroll. Profile before claiming success; scale DPR, shadows and detail for slower devices. Proposed loading targets: LCP ≤2.5s, INP ≤200ms and CLS ≤0.1, validated in a documented test setup and later field data.
- Every shown outcome is either supported client evidence or explicitly illustrative. Report coverage, payment and ongoing services match what is actually available.

## Recommended next deliverable

Build the new opening, one source-backed report finding and the transition into a custom workflow as a small preview. Use newly designed assets and the shared mouse-responsive camera from the start. That slice will answer the decisive question: can SailTru's story, artwork and interaction feel like one coherent experience?
