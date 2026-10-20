# SailTru design and experience brief

Version: 1.1  
Date: 2026-10-21
Revision: Sailing-boat scroll narrative, following Tom's direction.  
Repository baseline: main at e2f36a992fd23217363857a7dec56130765bbd75  
Companion: [Marketing messaging](./sailtru-marketing-messaging.md)  
Audience: Mike, designers, frontend developers, backend integrators, and reviewers.

## 1. Purpose and decision status

Build a site that makes SailTru's offer understandable, demonstrates the quality of its analysis, and guides a visitor from their URL to a limited personalized report and purchase of the full report.

**User-confirmed requirements**
- Preserve SailTru's identity as a business intelligence and AI solutions company.
- Learn from ReddGrow's explanatory flow and presentation.
- Use a sailing boat as the recurring character in a scroll-driven journey, inspired by the bee journey Tom identified on ReddGrow. This motif is user-requested; the detailed storyboard below is the proposed execution.
- Connect the frontend to the backend that analyzes the submitted business URL.
- Show a limited report based on that analysis.
- Make purchase of the full report the main conversion for that journey.
- Retain bespoke implementation: website improvements, automations, software, AI agents, and agent teams.

**Specified implementation proposal**
The layout, tokens, section order, preview allowance, example, motion behavior, and copy in these two briefs are a concrete proposed default. They have not each been individually selected by Tom. Implement reviewable previews to this specification; record a proposed change instead of silently choosing a different direction.

**Still requires a product decision**
Price, currency/tax display, payment provider, exact paid coverage, report availability timing, authentication point, report retention, and any ongoing monitoring offer. Section 13 defines safe fallbacks. These unknowns do not block a static design preview; they do block unsupported live promises and checkout.

This document specifies the target experience. It does not claim that backend analysis or report checkout is already connected. It does not authorize a merge, production deployment, or live charge.

## 2. Source hierarchy and scope

Read this file and its companion together, then:
- [Company identity](../what-sailtru-is.md).
- [Earlier subpage brief](./subpages-cobalt-field.md).
- Tom's SailTrue Marketing Canon, marketing.md, dated 2026-10-14, reviewed when preparing these briefs.
- The user's 2026-10-20 clarification of the scan-to-paid-report business model.

The latest user clarification replaces the old placeholder journey in which a sample finding unlocks when someone starts a project. Buying a report and commissioning implementation are separate decisions.

Preserve the canonical question and company identity. This redesign proposes changes to both desktop and mobile composition; the earlier desktop freeze describes the old slice, rather than this proposed target. Do not alter the old identity document or historical brief as part of the documentation-only change.

Scope: homepage; reusable report example; scan entry/progress; limited report; purchase presentation; paid report presentation; relevant navigation and English/Hebrew strings. Adapt existing subpages to the shared language without rewriting unrelated product functionality.

Non-goals: backend storage migration, payment-provider selection, a new agent marketplace, autonomous deployment, new customer claims, or a monitoring subscription.

## 3. The experience to design

Primary journey:
1. Understand SailTru.
2. Enter the business URL.
3. See real analysis progress.
4. Read useful personalized findings.
5. Understand exactly what the full report adds.
6. Purchase and access the full report.
7. Optionally ask SailTru to implement a recommendation.

Secondary journey: a visitor with a known need can choose **Build with SailTru**, reach the existing project/contact path, and discuss the work without buying a report first.

The first journey must not become a call-booking funnel. The second must not be hidden behind report purchase.

A URL is an outside-in starting point. Public pages can support findings about messaging, journeys, technical observations, and observable competitive differences. Internal sales performance, actual conversion rates, operational bottlenecks, and quantified savings need additional context or connected data.

## 4. Visual direction and tokens

Keep the recognizable cobalt opening, sail mark/wordmark, editorial display type, restrained technical details, and readable body copy. Use a quieter pale ground for reading findings, evidence, and proof.

ReddGrow is a reference for a connected explanation and a character moving through the story. Tom specifically requested a sailing-boat counterpart to its bee journey. Build original sailing artwork and interactions around SailTru's own product. Do not copy its bee assets, scene compositions, product mechanism, text, or outcome claims. The boat must interact with evidence and recommendations; simply moving a decorative boat down the page does not fulfill this direction.

### Proposed tokens

Reuse existing CSS variables where equivalent. Consolidate rather than adding a second competing theme.

| Token | Target | Use |
| --- | --- | --- |
| Brand cobalt | #3B63FF | Hero field, primary buttons, key rules |
| Hero deep | #1737BC | Limited gradient depth |
| Hero cyan | #7EE7FF | One highlighted phrase in the hero |
| Reading ground | #F3F1EB | Main editorial surface |
| Surface | #FFFFFF | Report/evidence panels |
| Ink | #141414 | Primary reading text |
| Muted ink | #50565F | Secondary reading text, subject to contrast verification |
| Hairline | #D9DDE5 | Dividers and panel boundaries |
| Display | Existing Instrument Serif; Frank Ruhl Libre for Hebrew | Hero and major chapter headings |
| Body | Existing Heebo | Paragraphs, findings, forms, report details |
| Utility | Existing IBM Plex Mono with readable Hebrew fallback | Small labels and step numbers |

Use available local fonts. Do not add another font family or a UI library for this redesign.

- Spacing base: 8px; common intervals 16 / 24 / 32 / 48 / 64 / 96.
- Wide container: max-width 1200px; reading column 680px; report area up to 1040px.
- Gutters: 20px phone, 32px tablet, 48px wide desktop.
- Section padding: 48–64px mobile; 80–112px desktop. Proof strip is intentionally compact.
- Panel radius: 16px; small evidence blocks 10px; action pills 999px.
- Shadows: subtle on raised report surfaces only; no glow behind every card.
- Body: 16–18px, line-height 1.5–1.65. Report text stays at least 16px.
- Hero H1: approximately 40–48px mobile, 64–88px desktop; adjust for language and wrapping.
- Section headings: approximately 32–40px mobile, 44–56px desktop.
- Utility labels: 12–14px. Do not put essential explanations into tiny mono text.
- Maintain at least WCAG AA text contrast; verify actual gradients and muted text.
- Color never carries status, confidence, priority, or access state alone.

Avoid dashboard clutter, decorative scores, platform-logo carousels that imply unverified integrations, and four equally loud actions.

## 5. Homepage composition: one shared order

Desktop and mobile tell the same story in the same semantic order. Different responsive markup is allowed where necessary, but avoid duplicate accessible headings and CSS order that contradicts keyboard/screen-reader order.

### H01 — Hero: explain and start

**Question:** What does SailTru do, and how do I start?

- Header: wordmark; concise navigation; one primary journey.
- H1 stays exactly: **What should your business improve next?**
- One supporting paragraph from the messaging brief.
- Primary URL form, visible label, domain placeholder, **Analyze my business** submit.
- One small sentence explaining that the analysis produces a limited preview and the full report is purchased separately.
- Secondary, quieter action: **Build with SailTru**.
- Do not add a separate third primary button, autoplay product demo, feature catalog, or floating social stack. The sailing boat may appear immediately as the opening of the scroll story, without delaying the copy or form.
- Put **See an example report** below the first viewport in H03 rather than beside the primary action.
- Desktop: readable copy and URL entry, with a dedicated illustration lane for the sailing boat and the start of its route. The boat does not impersonate a live result. Keep it separated from the input and primary action.
- Mobile: wordmark + menu; H1, lede, form, expectation text, secondary Build. All controls remain reachable without forcing a fixed-height clipped hero.
- Use min-height only when it does not push the form below the fold on common phone dimensions. At 390 × 844, the action should appear in the first viewport at normal text size.

Navigation target labels: **How it works**, **Example report**, **Work**, **Build with SailTru**. Use homepage anchors where possible; keep existing useful subpage routes and mark active location. Locale selection lives in the mobile drawer.

### H02 — Proof strip: establish credibility early

**Question:** Has SailTru improved a real business?

- Compact Laba Records strip immediately below the hero.
- Existing claim: **+275% traffic — Laba Records**, only if current case evidence and permission continue to support it.
- Add a short, factual intervention sentence only after the work is documented.
- Link to the existing Work route or the actual case study.
- Do not invent timeframe, attribution, a before number, or an intervention.
- If evidence has not been confirmed, use the existing permitted testimonial or omit the numerical treatment. Do not substitute a fabricated metric.
- Do not describe an implementation result as evidence that purchasing the report alone caused the result.

This placement replaces the old need to scroll through several methodology sections before encountering proof.

### H03 — Worked example: make the report tangible

**Question:** What will the analysis tell me?

- Heading and copy from the companion brief.
- Show one fictional business consistently across four short chapters:
  1. **What we observed:** a service page makes the visitor search for the next step.
  2. **Why it deserves attention:** the path from that service to an enquiry is unclear.
  3. **What to change:** add a relevant enquiry action and clarify what happens next.
  4. **How to check the result:** compare service-page enquiry behavior after implementation, once analytics is available.
- Label the entire example and each detached preview **Illustrative example**.
- Use a simple annotated page fragment, an evidence excerpt, a recommendation, and a before/after interface state. No fictional conversion number.
- The example is about observable public information; it does not diagnose internal lead response.
- Keep the same fictional business and finding through every chapter.
- Desktop: two-column text + evidence visual. The sailing boat follows the evidence through the four chapters, with scene behavior defined in section 8; ordinary native scrolling.
- Mobile: stacked copy with a compact sailing vignette at each chapter. Retain the boat's story with short scroll-linked movements; no pinned scene, canvas, horizontal carousel, or squeezed desktop dashboard.
- The final example view shows how a report finding can lead to optional implementation.
- Include a clearly labeled **View example report** disclosure or dedicated sample view, without requiring a lead form to view a fictional example.

### H04 — Engagement: explain preview and purchase

**Question:** What happens after I enter my URL?

Use three plain stages:
1. Share the URL.
2. Review a limited personalized report.
3. Buy the full report for the supported deeper analysis and recommendations.

Show the limited/full comparison defined in section 7. Explain what the customer receives before presenting the purchase action. Do not repeat another four-stage process and six-stage process on the homepage.

### H05 — Capabilities: show breadth after comprehension

**Question:** Can this help with my kind of business problem?

Use four editorial rows rather than a grid of interchangeable AI cards:
- Discovery: search and AI visibility, when supported by analysis.
- Choice: website messaging, positioning, and customer journey.
- Operations: workflow automation after the relevant context is gathered.
- Custom systems: software, integrations, AI agents, and coordinated agent teams.

Each row contains one buyer situation, one concrete output, and a relevant Build or capability link. Distinguish scan coverage from services; operations and bespoke systems are not automatically diagnosed from a URL.

### H06 — Implementation and measurement

**Question:** Can someone help carry this out?

Show: recommendation → agreed scope → implementation → measurement against an agreed baseline.

The canonical six-stage loop remains the underlying operating model. Explain it in detail on How we work or inside a disclosure, not as an additional mandatory homepage chapter.

Report purchase does not include implementation, recurring scans, monitoring, integrations, or agents unless the purchased offer explicitly says so. Monitoring is available only within an agreed implementation/ongoing scope.

### H07 — Practical FAQ and final action

FAQ covers report contents, limited versus paid access, data sources, missing evidence, implementation, and the known-need Build path.

Close with the same primary URL action and the same expectation sentence as H01. Repeat Build as the quieter secondary path. Do not change the final conversion into a generic consultation CTA.

## 6. Scan and account experience

### Scan states

| State | Required UI | Prohibited behavior |
| --- | --- | --- |
| Idle | URL label, input, submit, expectation text | Hidden price implication or fake live session |
| Invalid URL | Inline explanation; preserve entered text | Navigate to a pretend report |
| Queued | Request accepted; real queue/status text | Invented percentage |
| Running | Backend-confirmed current activity | Timed claims that a check completed |
| Partial | Available findings plus unavailable coverage | Turning unknown into a negative result |
| Complete | Open the corresponding limited report | Show a generic translation card as the user's result |
| Inaccessible/unsupported | Explain the limitation and next useful action | Bypass access restrictions or pretend analysis succeeded |
| Failed | Honest failure, safe retry, preserved URL | Endless spinner or a second accidental paid transaction |

- Do not use the current 13.8-second timed sequence as evidence of analysis.
- An animation can accompany a real backend state. It cannot advance that state.
- Use determinate progress only when the backend supplies a meaningful denominator; otherwise show activity without a percentage.
- On refresh/revisit, recover the same authorized job/report when supported.
- Submission retry must not create duplicate analysis merely because the UI lost its response.
- No hard timing promise until measured behavior supports it.
- Avoid collecting internal business data inside a website URL field.

### Authentication proposal

Recommended default: let the visitor see the limited result before requiring an account; request identity for saving, checkout, or access when the actual backend policy permits it.

This is a proposal, not a confirmed auth decision. If analysis requires an account, explain that before the scan starts, preserve the URL across sign-in, and return to the requested analysis. Do not show analysis-completed language before sign-in if no analysis occurred. Reuse real application authentication rather than treating an unverified email session as proof of account ownership.

## 7. Limited report and full report

### Shared report header

Show the analyzed business/domain, generation timestamp, coverage, completion/partial status, and report identifier. Explain scope and uncertainty in normal language. A report for one URL must never be presented under another URL's name.

### Limited report: proposed reveal policy

- Show at least one complete, genuinely personalized finding when evidence supports one.
- Show observation, evidence/source, why it matters, recommended action, and uncertainty.
- Show the truthful scope of the analysis and any unavailable checks.
- Show additional finding counts and category previews only if produced and intentionally released by the backend.
- If no defensible findings exist, say so and avoid a problem-based upsell.
- The preview allowance is a proposed product default; keep it centrally configurable.
- Do not make the free finding intentionally useless or hide every explanation.
- Do not infer operational performance or invent a revenue-loss estimate.

### Full report offer

Place the offer after meaningful preview value. On desktop, an adjacent sticky purchase summary is allowed once the preview starts; on mobile it becomes an inline panel. A bottom bar is optional only if it does not obscure evidence or controls.

The offer contains:
- What this purchase adds, based on actual deliverables.
- Price, currency, applicable tax/fee presentation, and the report's scope.
- Whether payment buys an already-generated report or triggers more analysis.
- Availability and access details when defined.
- A clear purchase action: **Buy the full report**.
- A statement that implementation is a separate engagement.

No frontend-only locks: paid findings must not be shipped to an unauthorized browser and merely hidden with CSS. The backend owns access and payment entitlement.

### Proposed full-report structure

Only render sections the backend actually supports:
1. Executive summary with the most important supported priorities.
2. Findings ordered by a defensible priority model.
3. Evidence, source references, and limitations.
4. Relevant website/competitive comparisons.
5. Recommended actions with effort/confidence when supportable.
6. Implementation options, including DIY/existing team/SailTru when appropriate.
7. A measurement plan.

Do not display empty sections as completed analysis. Do not sell a PDF export, recurring refresh, or real-time monitoring unless available in the offer.

### Payment/access states

Purchase pending, confirmed, failed, cancelled, and already-owned are distinct states. A return URL alone is not purchase confirmation. Refresh/revisit preserves server-confirmed access. Retrying after an uncertain payment first checks status rather than starting another charge.

After purchase, show **Open full report**. Place optional implementation actions beside relevant recommendations and at the end; do not block report access with a sales-call prompt.

## 8. Signature scroll story: the sailing boat

### 8.1 Creative idea and meaning

**One boat. A clearer course.**

The boat represents the visitor's business moving through decisions. SailTru supplies the observations, chart, and practical help that make the next move clearer. There is no separate crew of animated agents and no new mascot personality that competes with the company.

The visitor's scroll drives the boat through one connected journey. The boat notices a marker, reveals its evidence, passes the same finding into a report, and follows a proposed route toward an implementation checkpoint. The visual must communicate cause and effect, rather than merely traveling beside unrelated paragraphs.

The lighthouse/harbor at the end represents a clear next decision and a place to begin work. It is not proof of revenue growth, a purchase confirmation, or a guaranteed business destination.

This is the signature visual treatment for the homepage. The token/layout and product-integrity rules elsewhere still apply.

### 8.2 Boat and world art direction

- Use an original, recognizable sailing boat with a simple hull, one mast, and one or two crisp sails. Reference the existing sail mark's geometry without stretching or replacing the official logo.
- Premium editorial illustration: clean vector shapes, a little dimension through restrained shading, ample breathing room. Avoid clip-art yachts, emoji, pirate imagery, cartoon faces, and a fully simulated sea.
- White/cyan sails on the cobalt opening; cobalt/ink detail on the pale reading ground. The boat must stay recognizable through the surface transition.
- One soft wake records the route already taken. Thin chart lines, a few buoys, and a restrained harbor/light give the story landmarks.
- Buoys point to specific findings. A nautical chart carries evidence and recommendations. The report is an ordinary readable report panel, not an unreadable scroll prop.
- Use SVG/vector artwork and existing motion tools as the default. No new WebGL engine or 3D pipeline is required for the reviewable first implementation.
- Prefer one original boat asset with hull/sail/wake groups. Do not generate a set of unrelated boats for individual chapters.
- Illustrative scenery stays behind/beside readable content. Motion never covers headings, evidence, proof, URL input, menus, or purchase controls.

### 8.3 Scroll storyboard

The order remains H01–H07. Motion links those sections; it does not add a second mandatory six-screen explainer.

| Beat | Placement | Boat/world action | What becomes clearer |
| --- | --- | --- | --- |
| 01 — Starting point | H01 hero | Boat sits on a quiet open-water line. The first route segment leads toward the next section. | There are several possible moves; analysis helps choose a direction. |
| Proof pause | H02 proof strip | Boat glides past in its illustration lane; pause complex action and let proof lead. | A real client result is separate from the fictional voyage. |
| 02 — Observe | H03 chapter A | Boat approaches a buoy attached to the illustrative service-page observation. A faint wake connects it to the source excerpt. | A finding begins with something inspectable. |
| 03 — Understand | H03 chapter B | The source and the unclear enquiry path come into view together. Irrelevant chart marks recede while the finding stays legible. | What was observed and why it may matter are different statements. |
| 04 — Recommend | H03 chapter C | A route is drawn around the finding toward the proposed page change; the boat turns gently onto it. | The evidence leads to a specific recommendation. |
| Measurement marker | H03 chapter D | A small next-check marker appears beyond the proposed change, with a neutral measurement label. | The change still needs to be evaluated; no uplift is invented. |
| 05 — Report | H04 preview/full explanation | The same observation, evidence, and action settle into a report panel. The boat pauses beside a useful visible preview; further route detail illustrates the paid scope. | Preview and full report are different levels of the analysis offer. |
| Capabilities pause | H05 | Boat continues through the margin with no new busy scene; capability rows remain the focus. | The broader company has useful implementation capabilities. |
| 06 — Act and review | H06 implementation | An optional onward route heads toward a small work harbor, then an observation marker. Label the handoff as a separate project. | Acting on recommendations and measuring the work are separate from buying the report. |
| Close | H07 final action | Boat rests beside a clear next-waypoint marker, away from the form and FAQ. | Start with the business URL, or take the known-need Build path. |

The H03 example remains **Example Studio**, the same service-page finding, and the same proposed enquiry-action improvement from section 5 and the messaging brief. No fake storm, sinking business, exploding dashboard, or magical growth island.

At H04, the boat does not become stuck until the visitor buys. The entire homepage remains scrollable. The illustration explains an offer; real report access is controlled in the application.

### 8.4 Interaction behavior

- Native scroll is the input. Use normalized scroll progress between stable chapter anchors to position the boat and reveal the route. Do not intercept the wheel, prevent default scrolling, or require a gesture to finish a scene.
- On desktop, reserve a continuous illustration lane occupying roughly 35–45% of the content width through the explanatory chapters. A scoped sticky visual is permitted inside that lane; do not pin the whole page.
- Track one logical boat through the journey. Scene handoffs must preserve position, color, scale, and identity. If separate local SVG scenes are necessary, only one traveling boat is visible at a transition.
- Proposed desktop boat size: 96–144px wide. Use a slim wake and a limited tangent-following heading. Keep the mast generally upright; never rotate the whole boat upside down to follow a curve.
- Progress mapping is geometric and deterministic: scrolling back reverses the journey; jumping to an anchor resolves directly to that beat; refresh at mid-page resolves to the current position.
- Tie reveals to text/evidence anchors so the boat arrives while the relevant paragraph is readable. Do not trigger every scene on initial load.
- Keep all explanatory text in accessible document flow. The boat can guide attention; it must not be the only way to understand the finding.
- Optional tiny bob/sail motion is secondary to scroll. Stop offscreen/when the page is hidden. No autoplay audio.
- Optional entrance: opacity/translate 180–300ms. Scene accents may settle in 250–450ms. Follow scroll without multi-second lag or a forced stop at every marker.
- Reserve scene dimensions before artwork loads. The route must not introduce layout shifts or move the form.
- If the path crosses a full-width proof/FAQ band, render it in a safe gutter or hand it off quietly instead of overlaying the reading surface.

### 8.5 Mobile and RTL behavior

- Keep the same boat, story beats, finding, and report relationship on mobile. Do not drop the motif entirely.
- Use a compact 88–120px-high scene above or beside each relevant H03 chapter, with a 48–72px boat. The text remains stacked and readable.
- Short local route segments connect the vignettes visually. A coherent arrival/exit handoff is acceptable when a single page-spanning path would overlap mobile content.
- No fixed character traveling across paragraphs, no full-screen sticky boat sequence, and no horizontal gesture requirement.
- Hero motion never pushes the URL form out of reach. A small boat can sit near the hero's lower edge after the key copy/action.
- For HE, mirror the route/landmark layout where appropriate. Keep the narrative order and bow direction coherent, and never mirror the logo, text, numbers, report screenshot, or controls as a bitmap.
- At 320px width and with larger text, compact or statically place the artwork rather than clipping the form.

### 8.6 Reduced motion and static fallback

With reduced motion, show the boat at a stable chapter position and the relevant route/landmarks without traveling, bobbing, parallax, or scroll-scrub transitions. The same report example and copy remain available.

If animation or artwork fails, show a static boat/chart illustration where possible and keep every section/action usable. The visual layer is decorative for accessibility; use meaningful accessible labels on the actual report example.

### 8.7 Homepage story versus live analysis

The voyage is an **illustrative explanation**. Scrolling changes the story position; it must never change job state, report access, analysis percentage, purchase state, or evidence.

A future boat-based live-progress treatment may accompany real backend status, but reaching a harbor cannot mean analysis complete or payment confirmed unless the backend says so. Do not reuse the timed pretend-scan sequence underneath the new artwork.

### 8.8 Build and review package

Start with one original SVG boat and a still storyboard for the start, observation, recommendation, report, and optional implementation checkpoint. Then implement the scroll prototype using the existing frontend stack.

Review should include:
- Desktop and mobile stills for those five checkpoints.
- A short forward/backward scroll recording showing the actual boat travel and scene handoffs.
- Normal scroll, deep-link/refresh position, route resize, and HE direction checks.
- Reduced-motion capture and keyboard navigation through the same page.
- A record of console warnings/layout shifts attributable to the visual, if any.

Use manual browser checks for this low-impact visual slice; add targeted automated checks only for meaningful application-state or access regressions. This brief requests the design/story specification, not an already completed animation.

## 9. Responsive, Hebrew, and accessibility rules

Validate EN and HE at 390 × 844 and desktop 1440 × 900; also check 320px width, tablet, keyboard operation, and increased text size.

- Under 980px: wordmark + hamburger, locale in drawer, no homepage floating social controls.
- Preserve the shared section sequence and buying promise.
- Mobile URL input uses a readable input font and can accept a long domain without forcing horizontal scrolling. Stack input and button if the chosen locale does not fit.
- Mobile report findings and pricing comparison remain readable without sideways scrolling.
- Use actual dir=rtl and logical layout properties. Preserve readable LTR direction for URLs, prices where appropriate, and code.
- Match hierarchy and interaction, rather than translating line breaks literally.
- Buttons have visible focus and at least 44 × 44px interaction areas.
- Fields have labels and associated errors. Progress announcements use a restrained status/live region.
- Do not announce every animation frame.
- Dialogs/disclosures have correct focus behavior and accessible names.
- Locked content has a text access explanation. Color/blur alone is insufficient.
- Essential content remains available if motion fails.

## 10. Frontend/backend boundary

This is a semantic contract, not a prescribed endpoint, database, or payment design. Integrate with the actual backend; do not create a second source of business truth in the marketing repo.

Backend-owned concepts:
- Analysis identity, submitted/canonical URL, job status, and generation time.
- Evidence-backed findings, stable finding IDs, priority/confidence where computed.
- Coverage/limitations and partial failures.
- Preview-safe fields and paid entitlement.
- The purchasable offer, price/currency, availability, and payment status.
- Access to the correct report after purchase.

Frontend responsibilities:
- Submit/preserve the URL and context.
- Render genuine status, evidence, unavailable states, and offer scope.
- Distinguish illustrative examples from live results.
- Recover state and route authorized users to their report.
- Translate interface labels while preserving source evidence faithfully.

Never generate priority numbers, competitor names, performance claims, finding counts, or payment status inside display components. Illustrative fixtures must be explicitly tagged and isolated from the live adapter.

If the backend's ranking is absent, show **Findings** rather than falsely claiming **Your top priorities**. If competitor coverage is absent, do not sell it.

## 11. Repository implementation map

Confirm current composition before modifying files. Paths below were inspected at the recorded baseline.

| Area | Existing starting point | Target |
| --- | --- | --- |
| Homepage order | src/app/[locale]/page.tsx | H01–H07 shared narrative |
| Hero | src/components/sections/home-v2/home-hero.tsx | One promise, URL entry, secondary Build |
| Scan form | src/components/sections/hero-url-scan.tsx | Validation and real submit state |
| Timed sequence | src/components/sections/home-v2/hero-scan-sequence.tsx | Real status adapter; no timer-driven completion |
| Engine story | src/components/sections/home-v2/how-sailtru-works-section.tsx | Concrete worked example |
| Scroll handling | src/components/sections/home-v2/pipeline-scroll.ts | Remove custom wheel interception |
| Mobile | src/components/sections/home-v2/mobile-home.css | Same narrative and proof order |
| Theme | home-v2.css, field-hero-ref.css, how-sailtru-works.css | Consolidated tokens and quieter reading surfaces |
| Proof | src/components/sections/proof-section.tsx | Early evidence and case context |
| Final action | src/components/sections/final-cta-section.tsx | URL/report entry plus Build |
| Gate/dashboard | login/page.tsx, dashboard/page.tsx and scan-login-gate.tsx | Actual identity/access policy and real report data |
| Copy | src/messages/en.json and src/messages/he.json | Companion message IDs mapped into locale keys |

Paths for report/checkout screens are to follow the actual application architecture; this brief does not require inventing new public API routes. Remove obsolete visible frameworks after their useful content is incorporated, and avoid leaving hidden legacy experiences mounted.

## 12. Suggested delivery slices and review evidence

Use the team's existing governed implementation/review workflow. Do not start backend/checkout work inside a cosmetic slice.

1. **Narrative and design preview:** homepage H01–H07, labeled report example, sailing-boat storyboard and scroll prototype, tokens, EN/HE, normal scrolling. Backend remains explicitly unconnected.
2. **Live scan and preview:** agreed adapter, URL identity, real progress, genuine findings, partial/failure handling.
3. **Report commerce and access:** agreed offer, checkout, server-confirmed entitlement, paid report and revisit.
4. **Implementation handoff and measurement:** contextual Build actions, funnel events, final responsive/accessibility review.

For each slice, attach relevant screenshots, changed-file scope, build/lint/type-check results available in package scripts, and scenario evidence. Reuse existing test infrastructure; do not introduce a broad testing framework solely for static layout.

Suggested events: scan_submitted, analysis_completed, preview_viewed, full_report_offer_viewed, checkout_started, purchase_confirmed, full_report_opened, implementation_requested. Purchase confirmation must originate from verified state. Minimize event payloads; do not send raw submitted URLs, email, payment details, or report evidence into general analytics.

## 13. Decision register and launch gates

| Decision | Proposed/default behavior | Before live sale |
| --- | --- | --- |
| Preview price | No-charge limited preview is the working assumption | Confirm before publishing “free” |
| Preview depth | At least one complete supported finding | Agree the backend reveal policy |
| Paid content | Supported analysis + priorities + recommendations | Confirm the exact deliverable list |
| Analysis timing | Real status, no duration claim | Define whether purchase triggers deeper work |
| Price/currency/taxes | No invented amount | Supply the real offer and checkout display |
| Payment provider | Existing agreed backend integration | Confirm provider and verified entitlement path |
| Authentication | Preview before identity where permitted | Agree actual access/abuse controls |
| Access/retention | No “forever” or guaranteed download claim | Define return access and retention |
| Monitoring | Separate scope | Do not imply it is included |
| Case proof | Existing approved Laba claim only | Confirm evidence/permission and context |

Unresolved offer details appear as **Configuration required** in internal previews only. Do not publish placeholders or enable checkout before the offer and entitlement are real. Complete the independent design work while those decisions are resolved.

## 14. Acceptance checklist

### Narrative and design
- [ ] Protected H1 is unchanged; supporting copy explains a tangible output.
- [ ] H01–H07 appear in the agreed order in both languages and viewport classes.
- [ ] Laba proof appears immediately after the hero, subject to evidence availability.
- [ ] One coherent illustrative example explains observation, recommendation, implementation, and measurement.
- [ ] SEO/GEO and agent services are capabilities within the company, not the hero identity.
- [ ] No duplicated methodology chapters or custom wheel lock remain.
- [ ] One sailing boat carries the journey through observation, evidence, recommendation, report, and optional implementation.
- [ ] The boat interacts with the report example and uses coherent scene handoffs; it is not a generic floating ornament.
- [ ] Reverse scroll, anchor entry, resize, HE, mobile, and reduced motion preserve the story and controls.
- [ ] Scroll position never impersonates analysis completion, purchase confirmation, or report entitlement.
- [ ] Report purchase and project engagement are distinct and both understandable.
- [ ] Core copy/actions are readable without animation.

### Product integrity
- [ ] Submitted URL, job, preview, checkout offer, and paid report stay correctly associated.
- [ ] Every live finding comes from the backend; no static diagnostic is presented as personalized.
- [ ] Partial coverage, no findings, inaccessible pages, and failures have honest states.
- [ ] Preview reveals useful evidence; additional counts/coverage reflect real data.
- [ ] Paid content is withheld by backend entitlement, not CSS.
- [ ] Pending/failed/cancelled/already-owned payments are handled; verified access survives revisit.
- [ ] No report purchase implies implementation or ongoing monitoring by default.
- [ ] Unconfigured pricing/coverage prevents live checkout without blocking design preview work.

### Craft and handoff
- [ ] EN/HE screenshots at required dimensions show readable content and correct RTL.
- [ ] Keyboard, focus, field errors, reduced motion, and text zoom are checked.
- [ ] Useful existing routes remain accessible; final CTA targets a real action.
- [ ] Exact copy is mapped from the companion brief into translations.
- [ ] Review evidence identifies what was implemented, what remains proposed, and what is blocked.
