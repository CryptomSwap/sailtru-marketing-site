# Reddgrow and SailTru: design and motion audit

Inspected 27 October 2026. This is an analysis and redesign brief; no production UI was changed during this audit.

The main problem in SailTru is weak visual storytelling and composition. The previous palette change improved separation between text and scenery, but it also washed out the environment. Similar camera angles, small subjects, explanatory paragraphs, and independently moving boats make the harbor feel like a model displayed beside a presentation. The next iteration needs to be designed around readable actions and deliberate shots.

**Method and evidence**

I traversed the live desktop story, checked intermediate and settled scroll positions, reversed part of the sequence, inspected its mobile layout at 390 × 844, and compared SailTru at the same desktop browser size. I also inspected the public camera/timeline script and page styles, then read our local implementation. This is not an FPS benchmark or a full accessibility audit.

- [Live reference](https://reddgrow.ai/)
- [Public scene and timeline script](https://reddgrow.ai/_astro/garden.o4yyCp_X.js)
- [Reference overhead composition](../artifacts/reddgrow-audit/01-map.jpg)
- [Reference drafting composition](../artifacts/reddgrow-audit/02-draft.jpg)
- [Current SailTru evidence composition](../artifacts/reddgrow-audit/03-sailtru-evidence.jpg)
- [Current SailTru later composition](../artifacts/reddgrow-audit/04-sailtru-build.jpg)
- [Reference mobile composition](../artifacts/reddgrow-audit/05-reference-mobile.jpg)

**1. Design: color needs a job, and shapes need contrast**

The reference uses paper and graphite scenery, orange-red messaging, and amber moving agents and routes. Its strong outlines, hatching, large subjects, and quiet text areas create depth without relying on realistic materials. Caption panels alternate sides; smaller demonstration cards connect to scene locations. Testimonials use softer card borders inside a larger paper surface. These are observations of the [live page](https://reddgrow.ai/).

My interpretation is that consistency of visual treatment matters more than counting colors. The scene and interface share an illustrated vocabulary, while color indicates significance. A scenic object can be detailed without stealing focus if its contrast and position are controlled.

Our water, land, rock, sky, and vegetation now occupy a narrow range of pale values. Distance fog removes further contrast. This creates empty-looking space even when there is substantial geometry. Blue roofs and tiny blue objects become disconnected spots rather than a deliberate route through the image.

For SailTru, keep paper, charcoal, and blue, but restore tonal structure. Coast edges and foreground silhouettes need stronger ink; background detail can remain pale. Give the blue to the active ship, selected evidence, active machinery, and changed result. Establish a material vocabulary that works across hulls, cranes, piers, rocks, and cards. A restrained palette must still distinguish water from land and the foreground from the distance.

**2. POV: each shot should answer a question**

The reference script defines nine desktop camera poses and nine mobile poses. It interpolates position and look target with eased transitions, changes subject-follow weighting, and adds restrained pointer response and drift. Most desktop poses use a 40-degree field of view; the final pose uses 46. Mobile uses wider framing and vertical offsets. Camera travel is separated into eight timeline intervals, with holds between them. These are verified details from the [public scene script](https://reddgrow.ai/_astro/garden.o4yyCp_X.js), not estimates from screenshots.

The useful lesson is the relationship between view and meaning. A low viewpoint makes an individual encounter feel important. An overhead view makes relationships legible. A close view shows work happening. A wider return establishes the outcome in context. Changing altitude has an explanatory purpose.

Our camera positions remain between heights 18 and 22, with a constant 43-degree desktop field of view and similar distances. The viewer receives almost the same kind of information in every chapter. We also constrain the scene to 72% of the width and 88% of the height. The result resembles a distant tabletop with cards covering part of it.

Rebuild the camera plan before adding detail. Compose every shot as a useful still image: one subject, one event, one readable card, one clear destination for the eye. Use a low harbor establishing shot, a ship-level evidence encounter, an overhead priority view, a close assembly-line view, and a wider result shot. Design portrait poses separately. Measure the ship's projected size in pixels; constant world scale alone does not guarantee recognizability.

**3. Cards: separate the explanation from the demonstration**

The reference has three useful layers: a caption, a contextual example, and scene-attached metadata. Its headline words rise and fade in sequence. Short body lines replace one another. Example content types in, citation rows expand, and result tokens appear in order. Floating overlays are projected from world positions, then constrained around viewport edges and the current caption. Collection events can trigger supporting-card changes. These behaviors are visible and corroborated by its [script](https://reddgrow.ai/_astro/garden.o4yyCp_X.js).

Our main panel switches visibility at chapter thresholds. The supporting panel is another paragraph in a fixed upper-right box. The one before/after text swap is a useful beginning, but the interface does not visibly transform. Viewers have to read both panels to infer the relationship.

The replacement should make the supporting card a small, understandable artifact. Examples appropriate to SailTru:

| Chapter | Main sentence's purpose | Supporting card's visible action |
| --- | --- | --- |
| Understand | Establish what we know | A miniature service page exposes a finding and its source |
| Prioritize | Explain the selected opportunity | A few findings become an ordered queue; one is selected |
| Build | Show what SailTru actually produces | The selected item becomes a scoped build and a visible interface or workflow change |
| Review | Explain how improvement is assessed | A before/after artifact shows the changed element and names the measurement to review |

Use a stable reading rectangle, strong type, and enough whitespace for a single thought. Reveal body lines in a planned sequence instead of adding longer paragraphs. Keep primary copy crisp while the scene moves. Anchor an evidence card to the relevant object, with collision avoidance and a leader line, rather than scattering permanent world labels.

The reference has imperfections worth avoiding: I could stop in a partially transparent card transition, and some auxiliary overlays competed with one another. We should retain readable hold states and explicitly test arbitrary stops, fast scrolls, and reversals.

**4. Motion: establish cause and effect**

The reference combines scroll-controlled narrative state with time-based ambient activity. That distinction is essential. A meaningful event needs to occur at a predictable point in the explanation; background life can continue independently.

Our traffic advances with elapsed time, the boats loop, the camera responds to scroll, and the text uses chapter thresholds. These layers share progress in places, but there is no strong, visible handoff of the same evidence from ship to recommendation to built result. Faster boats or additional landmarks cannot repair that missing connection.

Make one ship the narrative lead. It should arrive with evidence, stop while the reader inspects it, carry the selected priority, and deliver it to the build area. Keep other boats subordinate. Tie crane lifting, loading, machine processing, and unloading to named story events. Use local ambient motion only for small bobbing, subtle water movement, and machinery that is relevant to the current beat.

Use a shared story state such as `evidence-arriving`, `evidence-readable`, `priority-selected`, `build-processing`, and `result-ready`. The camera, ship, card, and machinery should consume the same state. A visitor who pauses should see a coherent situation; a visitor who reverses should see a coherent previous situation.

**5. Modeling and environment: make the harbor feel inhabited and intentional**

The current scene mixes rounded low-poly land, fine procedural edges, small hulls, and block-like machinery. The shoreline reads as a shallow pale strip. The labels are too small to explain distant destinations. The foundry and execution platforms appear as conveyor props on open water, without enough context to establish their relationship to the working harbor.

Preserve the requested elements, but arrange them into a believable place:

- Bring a large crane into the first composed shot. Use the smaller cranes to establish scale and distance.
- Place the larger lighthouse on a clearly separate rocky island with a visible pier connection. Give it room to read as a silhouette.
- Spread natural destinations across foreground, middle distance, and background. Vary coastline contours and land height, and leave navigable channels between them.
- Treat AI Foundry and Execution Harbor as working dock facilities. Conveyors need loading areas, processing stations, output areas, and a visible connection to shipping routes.
- Use asymmetry, overlap, and foreground occlusion to create depth. Stop placing everything where the viewer can see its whole outline at once.
- Reduce detail that is invisible at the intended shot size. Spend that geometry and contrast on the objects the viewer is meant to understand.

**6. Typography, page continuity, and mobile**

Our current main headings are readable, but narrow-looking type, dense paragraphs, tiny uppercase labels, and small landmark text produce an uneven hierarchy. The solid blue technology hero and pale harbor also feel like different visual chapters before the story has established a connection.

Design the hero and harbor as one continuous introduction. Define a clear display style, comfortable body text, and an understated metadata style. The heading should communicate the immediate idea; body text should advance it; the example should prove it. Move detailed scope and commercial qualifications into appropriate supporting content while preserving their accuracy.

On mobile, choose the important subject and frame it above the caption. Reserve a separate zone for the evidence card. Changing only canvas dimensions or widening the field of view will not preserve the desktop composition. Our current mobile camera largely reuses desktop positions, so it needs its own shot design.

**7. Proposed SailTru storyboard**

This is an original implementation direction, not a claim about current functionality.

| Beat | POV and composition | Scene action | What the visitor learns |
| --- | --- | --- | --- |
| Arrival | Low view across the water; prominent crane; visible lead ship | Crane introduces the first evidence cargo | SailTru starts with the business and its evidence |
| Understand | Closer ship-level view toward Evidence Point | Ship arrives; one evidence artifact opens | Findings have an observable basis |
| Prioritize | Rise to an overhead route view | Multiple possibilities become one selected route | SailTru helps choose what deserves attention |
| Build | Descend beside AI Foundry's assembly line | The selected item passes through distinct work stations | SailTru implements software, automation, and AI systems |
| Deliver | View along the pier toward Execution Harbor | Finished work is installed or delivered | Recommendations become concrete changes |
| Review | Wider view that includes the completed route | The same artifact returns with a defined measurement | Improvement is reviewed and informs the next cycle |

The crane should arrive early, and the lighthouse should remain an orienting landmark. Secondary boats can continue traveling further across the water. All examples should be identified as illustrations; avoid inventing business results or showing simulated analysis as a live service.

**8. Implementation order and acceptance criteria**

First approve the design through rendered stills of the key shots at desktop and mobile sizes. Then connect those shots with camera movement. Then connect the ship, machinery, and evidence to the same timeline. Add card transitions and ambient motion last.

The next implementation should pass these visual checks:

1. Every chapter has a recognizable subject and a distinguishable camera composition.
2. The active ship and landmark are readable at normal browser size without relying on tiny labels.
3. Water, coastline, structures, and background remain distinguishable in grayscale.
4. Main copy, example card, and active scene action do not compete for the same screen area.
5. A visible object or artifact persists across finding, priority, build, and result.
6. Stopping or reversing the scroll preserves a coherent, readable state.
7. Mobile has deliberate camera poses and unclipped cards; Hebrew receives equivalent composition checks.
8. Reduced motion exposes the whole explanation without requiring animation.

The highest-priority files for the next pass are `harbor-three.tsx` for the camera and visual composition, `journey-route.tsx` and `harbor-story.ts` for coordinated story state, `journey-scene.tsx` for demonstrated rather than merely described evidence, and `harbor-focus.css` for the card hierarchy. The palette alone is not the remaining design problem.
