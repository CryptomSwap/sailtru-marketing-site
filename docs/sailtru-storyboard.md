# SailTru: story before motion

> Superseded by [the V2 client-journey storyboard](sailtru-client-journey-storyboard.md): boats are potential clients, bays are businesses, and grey logos identify discovery channels. This document preserves the earlier concept.

Concept review, version 1 · 28 October 2026

## The idea

Follow one business and one buyer question from discovery to a useful improvement. Each scene should explain a service through a visible action. The visitor should understand the sequence even when every frame is still.

**Promise:** SailTru helps businesses understand how they appear in search and AI answers, compare themselves with competitors, decide what to improve, and make those improvements. SailTru also builds bespoke AI solutions and agent teams to give people more capacity to grow their business.

The example is **Oak & Form**, a fictional bespoke kitchen company. A customer asks what affects the cost of a bespoke kitchen. Competitors answer that question; Oak & Form's generic service page leaves it open. SailTru identifies the gap and helps create a useful pricing guide. This is one illustrative opportunity, not a claim that all SEO/GEO work is content writing or that a pricing guide guarantees AI mentions or enquiries.

## Six frames

| Frame | What happens | What it explains | Point of view |
| --- | --- | --- | --- |
| [01 — Discovery](../artifacts/storyboard/01-discovery.svg) | A buying question appears in search and an AI conversation. | Customers can discover businesses through both surfaces. | Customer view, close enough to read. |
| [02 — Comparison](../artifacts/storyboard/02-comparison.svg) | The question becomes a comparison of the business and relevant competitors. | SailTru tracks SEO/GEO and identifies competitive differences. | Pull back to the market. |
| [03 — Opportunity](../artifacts/storyboard/03-opportunity.svg) | A missing pricing answer becomes a specific recommendation. | SailTru connects observations to useful next steps. | Zoom into one finding. |
| [04 — Implementation](../artifacts/storyboard/04-implementation.svg) | The generic page gains a useful pricing guide and a relevant next step. | SailTru helps execute the improvement. | Close-up of the work. |
| [05 — AI capacity](../artifacts/storyboard/05-capacity.svg) | Research, follow-up and reporting tasks move from a busy desk into tailored workflows with human review. | Bespoke AI solutions and agent teams can clear capacity. | Move inside the same business. |
| [06 — Keep improving](../artifacts/storyboard/06-continuity.svg) | The business reconnects to visibility, enquiry quality and capacity measures, followed by another review. | Progress is measured and informs the next action. | Pull back to the whole business. |

The core route is **01 → 02 → 03 → 04 → 06**. Frame **05** is an independent capability. A client can start with AI work directly; buying visibility services is not a prerequisite.

## How motion would serve this story

- Carry the same question, business identity and finding between scenes so the viewer can follow cause and effect.
- Change POV when the subject changes: customer, market, finding, work, team, business. Camera movement should reveal relevant context.
- Give each scene one dominant action, then hold the result while the visitor reads.
- Keep reading surfaces stable. Move the relevant card or task rather than making every object animate.
- Use paper, dark ink and blue as the main palette. Blue identifies the current finding, action or next step.
- Keep complete, readable still states for reduced motion and smaller screens.
- Choose the final visual setting after reviewing this sequence. The storyboard does not depend on islands, boats or factory machinery.

The frames are a narrative prototype. Layout, typography and illustration are provisional. Search observations and company names are fictional; there are no invented client results or numeric performance claims. The final buttons illustrate two proposed service paths and are not connected to forms.

## Review before animation

1. Can someone unfamiliar with SailTru describe its services after these six frames?
2. Does the competitor evidence explain the recommendation clearly?
3. Is SailTru's implementation role visible?
4. Does the AI capability feel valuable and available independently?
5. Can any scene be removed without losing meaning? If so, simplify it.

## Open and maintain

- Local review: http://127.0.0.1:3011
- Portable review: open `artifacts/storyboard/index.html` in a browser; no build or network access is required.
- Click a frame for its message, visible action, POV and proposed future motion. Use Previous/Next or arrow keys; Escape returns to the overview.
- Regenerate assets with `node artifacts/storyboard/build-storyboard.cjs`.
- Start the local preview with `node artifacts/storyboard/serve.cjs`.

All six frames were visually reviewed in the local browser, including navigation between them. The next design decision is whether this narrative explains the offer well enough to develop the visual treatment and motion.
