# SailTru marketing messaging brief

Version: 1.1  
Date: 2026-10-21
Revision: Copy and story mapping for the sailing-boat scroll narrative.  
Repository baseline: main at e2f36a992fd23217363857a7dec56130765bbd75  
Companion: [Design and experience](./sailtru-design.md)  
Audience: Mike, copywriters, designers, developers, and reviewers.

## 1. What this file controls

This is the proposed copy and messaging specification for the next marketing-site and report-purchase experience. It includes exact English copy, a focused Hebrew interface set, source-of-truth rules, and acceptance criteria.

**User-confirmed business journey:** enter a URL → backend analyzes it → show a limited report based on that analysis → sell the full report.

**User-requested visual direction:** a sailing boat travels through the homepage story as the visitor scrolls, inspired by the bee journey Tom identified on ReddGrow. The boat should explain observation, evidence, recommendation, report, and optional implementation.

**Company identity:** business intelligence and AI solutions, including bespoke implementation. The paid report is an entry product, not the entire company.

**Status:** the commercial journey and identity above are confirmed. The wording and section choices below are a concrete implementation proposal based on that direction, not a claim that Tom individually approved every sentence. Use this copy for a reviewable implementation; flag deliberate changes.

The broader Marketing Canon, marketing.md dated 2026-10-14, was read in full for this brief. Preserve its question, evidence discipline, solution-neutral priorities, and implementation breadth. Update the old project-unlock narrative for this report-purchase journey. Do not rewrite the original canon as part of this two-file documentation change.

This file does not assert that analysis, pricing, checkout, or recurring monitoring is currently live. It does not authorize a deployment or a charge.

## 2. Positioning to protect

### Core question

**What should this business improve next — and can we implement it?**

### Customer-facing category

**Business intelligence and AI solutions.**

Use this where a category is necessary. Explain it in ordinary language immediately afterward.

### Company description

**SailTru helps businesses decide what to improve next, explains the evidence behind the recommendation, and can help implement the solution.**

### Public scan description

**Start with your website. SailTru examines the public information it can access and turns supported findings into a clearer plan for what to improve.**

Website, competitors, market context, search visibility, and AI visibility can appear as specific coverage only when those sources/checks are actually included. A URL alone does not reveal private operational performance.

### Broader service description

**SailTru can help carry out the next move—from website and visibility improvements to workflow automation, custom software, AI agents, and coordinated agent teams.**

Broader services can require discovery, access, and a separately agreed scope.

### The commercial relationship

| Offer | Customer receives | What the purchase does not automatically include |
| --- | --- | --- |
| Limited report | A useful personalized preview based on available evidence | Every finding, every category, internal business access |
| Full report | The additional analysis and recommendations explicitly listed in the offer | Implementation, a monitoring subscription, unlimited rescans |
| Implementation | Separately scoped work to carry out a recommendation or known project | A guaranteed revenue result |
| Ongoing monitoring | Only the monitoring defined in an agreed service | An assumed entitlement from report purchase |

Never make purchase of the report a prerequisite for discussing an existing build need.

## 3. Audience and persuasion

Primary reader: an owner, founder, operator, or commercial lead who sees many possible improvements and needs help choosing where to focus.

Secondary reader: a company with a known workflow, software, or AI project.

The emotional progression:
1. Recognition: there are several things we could improve.
2. Curiosity: which ones deserve attention first?
3. Understanding: I can see what SailTru examines and what the report looks like.
4. Trust: this finding about my business is specific and supported.
5. Purchase intent: the additional report has a clear use and defined scope.
6. Execution intent: I can act on this myself or ask SailTru to help.

Make the buying decision about clarity, evidence, and the next move. Do not manufacture panic with unsupported loss estimates.

Reference: the ReddGrow site reviewed on 2026-10-20 is useful for a continuous problem-to-intervention explanation. This brief adapts that narrative principle to SailTru; it does not adopt its Reddit mechanism, copy, or AI-recommendation guarantees.

## 4. Voice and writing rules

Write for a business owner first:
- Plain words and concrete verbs.
- Intelligent, calm, direct, commercially aware.
- Short paragraphs with one thought each.
- A little wit when it makes the business point clearer.
- Evidence and uncertainty in proportion to what is known.
- The customer is the subject; technology supports the explanation.

Prefer: find, compare, understand, prioritize, recommend, improve, build, measure.

Avoid as core copy: signal landscape, intelligence layer, territories, friction risk, integrated transformation, AI-native growth, actionable insights, holistic ecosystem, seamless, supercharge, revolutionize, AI workforce.

Do not fill every heading with a slogan. Follow each claim with an example, deliverable, or concrete explanation.

**Public brand string: SailTru**, matching the identity document's public-site naming. Preserve official legal/payment entity naming separately when supplied. Do not alternate SailTru, Sailtru, and SailTrue within customer-facing interface copy. Do not redesign the wordmark for this naming cleanup.

Use **limited report** when explaining the access model and **preview** as the shorter interface term. Use **full report** for the paid product. Use **project** for implementation work.

## 5. Exact homepage copy: English

Section IDs match the design brief. These are the default proposed strings; do not randomly rotate alternatives.

### H01 — Hero

| ID | Placement | Copy |
| --- | --- | --- |
| hero.h1 | H1 | What should your business improve next? |
| hero.support | Supporting paragraph | SailTru starts with your website, finds opportunities supported by evidence, and helps you decide what deserves attention first. When you're ready to act, we can help build the improvement. |
| hero.urlLabel | Visible input label | Your business website |
| hero.urlPlaceholder | Placeholder | yourcompany.com |
| hero.submit | Primary form action | Analyze my business |
| hero.expectation | Immediately beneath form | Start with a limited report based on your website. Buy the full report for the additional analysis and recommendations. |
| hero.build | Quiet secondary action | Build with SailTru |

Do not prepend the old SEO · GEO · Custom AI solutions rail. Do not call the preview a free trial. The supporting line may be set on multiple lines but must not be expanded into an essay.

Navigation: **How it works**, **Example report**, **Work**, **Build with SailTru**. The primary scan is the hero form. Avoid a second competing Begin diagnosis action.

If real competitor analysis is confirmed in initial scan coverage, the support line may become:
**SailTru examines your website and competitive environment to find what deserves attention first. Get the evidence, a clearer set of priorities, and a practical next move—with implementation help when you need it.**
This is a coverage-dependent replacement, not a rotating second version.

### H02 — Proof strip

| ID | Placement | Copy |
| --- | --- | --- |
| proof.client | Attribution | Laba Records |
| proof.metric | Existing claim, subject to source check | +275% traffic |
| proof.link | Existing Work/case destination | See the client story |

The current approved testimonial may be retained:
**“SailTru helped us turn our website into a real growth channel. Traffic grew by 275%, with roughly 10× more conversions and paying clients.”**

Use the quoted wording only while permission and supporting case evidence remain valid. Do not turn the approximate 10× statement into a precise independent KPI without its definition. Add timeframe, source, and work performed only when available. If the existing Work page contains only a testimonial, use **Read the client testimonial** until a fuller story exists.

No public sentence about “when we have permission” is needed; that is an editorial rule. If evidence is absent, omit the unsupported claim.

### H03 — Worked example

| ID | Placement | Copy |
| --- | --- | --- |
| example.eyebrow | Label | Inside the report |
| example.heading | H2 | See the problem. Understand the next move. |
| example.intro | Intro | A useful finding connects what we observed to what you can change—and how to check whether it helped. |
| example.badge | Persistent sample label | Illustrative example |
| example.business | Fictional sample name | Example Studio |
| example.cta | Sample disclosure/view | View example report |

**Chapter A — What we observed**
- Heading: **Your service page leaves the next step unclear.**
- Body: **In this example, visitors can read about the service, but the enquiry link appears only in the footer.**
- Evidence label: **Page observation**
- Evidence: **A service-page excerpt with no nearby enquiry action.**

**Chapter B — Why it deserves attention**
- Heading: **Interest needs somewhere to go.**
- Body: **A visitor should be able to move from understanding the service to making an enquiry without searching for the next step.**
- Caveat: **This is an interface observation. It does not establish how many enquiries the business loses.**

**Chapter C — What to change**
- Heading: **Put the next step beside the decision.**
- Body: **Add a relevant enquiry action after the service details. Explain what happens after someone contacts the business.**
- Example interface action: **Discuss your project**

**Chapter D — How to check the result**
- Heading: **Make the change. Measure what follows.**
- Body: **Once the right analytics are available, compare service-page enquiries before and after the change and check the quality of those enquiries.**
- Implementation bridge: **SailTru can help design, build, and evaluate the change as a separate project.**

Every example screenshot/fragment uses the fictional name and sample label. Do not show an invented conversion uplift, industry-average deficit, competitor dataset, confidence score, or elapsed scan.

### H04 — How the report journey works

| ID | Placement | Copy |
| --- | --- | --- |
| journey.eyebrow | Label | How it works |
| journey.heading | H2 | Your URL. A clearer next move. |
| journey.intro | Intro | Start with the public information about your business. See what the analysis supports before deciding whether to buy the full report. |
| journey.step1.title | Step | Share your website |
| journey.step1.body | Body | Give SailTru a starting point for examining your business from the outside. |
| journey.step2.title | Step | Review your preview |
| journey.step2.body | Body | Read a limited personalized report with evidence behind the findings we can support. |
| journey.step3.title | Step | Get the full report |
| journey.step3.body | Body | Purchase the additional analysis and recommendations listed in your offer, then decide what to act on. |
| journey.action | Repeat URL form submit | Analyze my business |

Do not imply that all customers will have the same number or severity of findings.

The limited/full comparison must use the capability rules in section 8. Publish only rows fulfilled by the selected offer.

### H05 — Capabilities

| ID | Placement | Copy |
| --- | --- | --- |
| capabilities.heading | H2 | More ways to improve. One place to start. |
| capabilities.intro | Intro | Start with what we can observe. Go deeper with the context, access, and implementation work your business needs. |

**Discovery**
- Heading: **Help the right customers find you.**
- Body: **Investigate search and AI visibility, understand relevant gaps, and improve the content and technical foundations that support discovery.**
- Scope note: **Visibility checks depend on the analysis coverage.**

**Choice**
- Heading: **Make it easier to choose you.**
- Body: **Examine your positioning, website messaging, and customer journey. Identify where the next step could be clearer.**

**Operations**
- Heading: **Give your team less work to repeat.**
- Body: **With the right business context, map manual handoffs and build useful automations around the work.**
- Scope note: **Requires workflow discovery; this is not measured by the public website scan.**

**Custom systems**
- Heading: **Build the system your business needs.**
- Body: **Custom software, integrations, AI agents, and coordinated agent teams designed around a defined problem.**

Operations/custom systems action: **Build with SailTru**.
Do not make all four rows look like included report features.

### H06 — Implementation and measurement

| ID | Placement | Copy |
| --- | --- | --- |
| implementation.heading | H2 | When the next move is clear, we can help build it. |
| implementation.body | Body | Use the report with your own team, or ask SailTru to scope the work. We can help carry out the recommendation and agree how to measure the result. |
| implementation.scope | Clarifier | Implementation is a separate project. |
| implementation.action | Action | Build with SailTru |
| implementation.monitorHeading | Small heading | Did it help? |
| implementation.monitorBody | Body | For implementation projects, we agree what success should look like and review what changed when the necessary data is available. |

Do not imply that report purchase automatically begins implementation or continuous monitoring.

### H07 — FAQ and close

Closing H2: **Find your next move.**  
Closing body: **Start with your website. Review the evidence, see what deserves attention, and choose what to do next.**  
Primary URL submit: **Analyze my business**  
Expectation sentence: reuse hero.expectation exactly.  
Secondary action: **Build with SailTru**

FAQ copy appears in section 10.

## 5A. Copy for the sailing-boat scroll story

The detailed motion storyboard is in section 8 of the design brief. The boat is the visual thread through H01–H07; it does not introduce an additional explanation that competes with the page.

**Meaning:** the business needs to choose its next move; SailTru supplies evidence, a clearer course, and implementation help when requested. Navigation is a visual metaphor. The report and business benefit must stay understandable without nautical knowledge.

Use short stage labels beside the illustration; keep the existing H1, form action, H03 finding text, preview/purchase language, and Build distinction. This avoids turning the entire site into sailing puns.

| Motion beat | Short label | Optional single supporting line | Required literal explanation |
| --- | --- | --- | --- |
| Hero / starting point | Your next move | A clearer course starts with evidence. | Protected H1, website input, limited/full report expectation |
| H03 observation | Observe | Start with what we can see. | The actual fictional service-page observation |
| H03 significance | Understand | See why it may matter. | Evidence versus possible business implication |
| H03 recommendation | Recommend | Choose a practical next move. | Specific proposed enquiry action |
| H03 measurement | Check the change | Define how to evaluate it. | Measurement requires appropriate data |
| H04 report | Your report | The findings, evidence, and next steps—together. | Useful preview, supported paid scope, purchase action |
| H06 implementation | Build and review | Turn the recommendation into work. | Separately scoped implementation and measurement |
| H07 close | Choose your next move | Start with your website. | Analyze my business plus quieter Build path |

These supporting lines are optional; do not place every line on the page if it duplicates adjacent copy. The short labels are the default scene-caption set.

### The report moment

When the boat arrives beside the report, show the same finding the visitor just followed:
- **What we found**
- **Why we say this**
- **Recommended next move**

Use **Illustrative example** on this homepage scene. Include a legible preview and scope explanation; do not show fabricated counts or blur real paid findings into the public page.

The boat continues through the homepage whether or not someone submits a URL or purchases. It never visually punishes a visitor for declining an offer.

### Copy guardrails

- Keep the protected hero question. Do not replace it with “Set sail for growth.”
- Use a light touch: course and next move can connect the brand to the story; the product explanation remains literal.
- Avoid “guaranteed smooth sailing,” “navigate to guaranteed growth,” “your business is sinking,” and “unlock treasure.”
- A harbor/waypoint represents a decision or work handoff, not proof of success.
- Never describe scroll-driven scenes as live analysis, real-time findings, completed implementation, or verified payment.
- The scene's route may illustrate prioritization, but a real report can claim ranked priorities only when the backend supplies them.
- Use the same sample business and finding throughout. No new fictional customer metrics or claims are introduced by the animation.

### Hebrew scene captions

| EN | HE |
| --- | --- |
| Your next move | הצעד הבא שלך |
| Observe | בוחנים |
| Understand | מבינים |
| Recommend | ממליצים |
| Check the change | בודקים את השינוי |
| Your report | הדוח שלך |
| Build and review | מיישמים ובודקים |
| Choose your next move | בוחרים את הצעד הבא |
| A clearer course starts with evidence. | כיוון ברור מתחיל בממצאים. |

The route mirrors for layout, not for literal wordplay. Do not insert awkward sailing vocabulary into the Hebrew purchase controls.

## 6. Scan, account, and failure copy

Interface language must describe real state. The table does not require adding backend stages that do not exist.

| ID | Trigger | Copy |
| --- | --- | --- |
| scan.invalid | Invalid domain/URL | Enter a valid business website, such as yourcompany.com. |
| scan.submitting | Request being submitted | Starting your analysis… |
| scan.queued | Backend confirms queued | Your analysis is queued. |
| scan.running | Backend confirms running | Your analysis is in progress. |
| scan.reviewingPages | Page review is actually running | Reviewing accessible public pages… |
| scan.comparing | Supported comparison is actually running | Comparing the available evidence… |
| scan.preparing | Report assembly actually running | Preparing your preview… |
| scan.complete | Backend confirms preview ready | Your preview is ready. |
| scan.open | Preview available | Open my preview |
| scan.partial | Report has unavailable checks | Some checks couldn't be completed. Your report shows what was assessed and what remains unknown. |
| scan.inaccessible | Site could not be accessed | We couldn't access enough of this website to complete the analysis. Check the address or try again later. |
| scan.failed | Analysis failed | We couldn't complete this analysis. Your website address is saved here so you can try again. |
| scan.retry | Safe retry action | Try again |
| scan.noFindings | No supported opportunities found | We don't have enough evidence to recommend a priority from this analysis. |
| scan.noFindingsBody | Explanation | Review the coverage and limitations below. Additional business context may help us investigate further. |

Do not show scan.failed's “saved here” phrase unless the input/report context is actually preserved. If not, use **We couldn't complete this analysis. Please try again.**

No-findings is distinct from a failed scan and from “your business is perfect.” Do not promote a paid list of supposedly found problems when none are supported.

### Account gate, if required

Before analysis:
- Heading: **Save your analysis to your account.**
- Body: **Continue to start the analysis for {host} and return to your report.**
- Action: **Continue**

After preview, if required for access/purchase:
- Heading: **Keep your report in one place.**
- Body: **Continue to save the report for {host} and access your purchase.**
- Action: **Continue**

Use only the variant matching the actual authentication policy. Do not say an email entry creates a secured account unless that is the real system. Preserve the domain through authentication. Do not say a report is ready before the backend confirms it.

## 7. Personalized report language

### Header

- Title: **Your business report**
- Limited-access badge: **Preview**
- Paid-access badge: **Full report**
- Domain label: **Website**
- Date label: **Generated**
- Coverage label: **What we assessed**
- Limitations label: **What remains unknown**

### Finding anatomy

| Field | Label | Content requirement |
| --- | --- | --- |
| Observation | What we found | A supported statement about this business |
| Evidence | Why we say this | Source references/excerpts and observation date where available |
| Significance | Why it matters | Plausible business consequence, separated from measured impact |
| Action | Recommended next move | A concrete intervention |
| Confidence | How certain we are | Backend-supported confidence/limitations; omit unsupported score |
| Effort | What it may take | An evidenced estimate or explicit scoping need |
| Measurement | How to check it | A relevant measurement plan |
| Implementation | Need help implementing this? | Optional separate Build action |

A source must support the claim being made. Missing structured data, for example, does not establish that an AI system will refuse to recommend a brand. An awkward CTA does not quantify lost customers.

Use **Priorities** only if backend output is actually prioritized. Otherwise use **Findings**. Use **observed** for direct evidence, **may/could** for plausible implications, and **unknown/not assessed** for missing evidence.

Do not call a finding high impact merely because its visual card needs a red badge.

## 8. Limited report versus full report

The following is the proposed merchandising structure. It is conditional on supported backend deliverables and the selected offer. It is not a promise that all these features already exist.

| Dimension | Limited report | Full report |
| --- | --- | --- |
| Personalized findings | At least one complete supported finding, under the proposed preview policy | All findings included in the purchased scope |
| Evidence | Enough evidence to understand the visible finding | Evidence supporting the additional included findings |
| Prioritization | Only priorities actually released in the preview | Prioritized recommendations if supported by the backend |
| Competitor context | Only released/available observations | The comparisons explicitly included in the offer |
| Next steps | A useful action for the visible finding | The additional action plan included in the offer |
| Implementation | Available separately | Available separately |

Do not render a feature row as available unless the product fulfills it. Do not sell information already fully visible in the preview.

### Offer-panel copy

- Heading: **Get the full picture.**
- Body: **Buy the full report to review the additional findings, supporting evidence, and recommendations included in this analysis.**
- Primary action: **Buy the full report**
- Owned action: **Open full report**
- Clarifier: **Implementation is available as a separate project.**

Replace the generic body with an exact supported deliverable list once the backend contract is confirmed. Avoid “full picture” if important coverage is absent without a visible limitation.

### Dynamic quantities

- Allowed when verified: **{count} additional findings in this report**.
- Allowed when verified: **Competitor comparison included**.
- Allowed when verified: **Your recommendations, in priority order**.
- Otherwise: omit the quantity/claim rather than inventing a placeholder.

Locked items may reveal only intentionally preview-safe metadata. The frontend must not receive the paid body and blur it.

### Commercial facts

The team must supply price, currency, taxes/fees, availability, paid coverage, access conditions, and whether purchase triggers further work. Do not assume a one-time fee, monthly plan, instant delivery, lifetime access, refund policy, unlimited scans, downloadable export, or implementation credit.

Internal mockups may show **Price to be configured**. Never publish that text or enable live purchase against an undefined offer.

The working assumption is a no-charge limited preview; publish “free” only after that offer is confirmed. A report preview is not a SaaS trial.

## 9. Checkout and post-purchase language

| State | Heading/body | Action |
| --- | --- | --- |
| Pending | Confirming your purchase. / We're checking the payment status. | Check status |
| Confirmed, report ready | Your full report is ready. | Open full report |
| Confirmed, deeper analysis pending | Payment confirmed. Your full report is being prepared. | View report status |
| Failed, confirmed failure | Your payment wasn't completed. / Your preview is still available. | Return to preview |
| Cancelled | Purchase cancelled. / You can return to your preview whenever you're ready. | Return to preview |
| Uncertain | We haven't confirmed the payment yet. / Check its status before trying another payment. | Check status |
| Already owned | You already have access to this report. | Open full report |
| Return access needs sign-in | Sign in to access your report. | Sign in |

Only use confirmed-payment copy after backend verification. Do not claim the user was not charged unless payment state establishes that. Never turn a checkout return parameter into proof of payment.

Post-purchase implementation message:
**Want help carrying this out? Choose a recommendation and ask SailTru to scope the work.**

Contextual action:
**Discuss this recommendation**

Pass report/finding context through an authorized project handoff rather than exposing paid evidence in a public URL.

## 10. FAQ: proposed public answers

### What does SailTru analyze?

**The scan starts with your website and the public information available to the analysis. Your report shows what was assessed, the evidence behind the findings, and any limits to the conclusions.**

Add named search/AI/competitor sources only when coverage is real. Do not imply access to private analytics or internal tools from a URL.

### What do I see before purchasing?

**A limited personalized report, with a useful finding and the evidence behind it when the analysis can support one. You can review that preview before deciding whether to buy the full report.**

This answer assumes the proposed preview policy is implemented.

### What does the full report add?

**The offer beside your preview lists the additional analysis and recommendations included in that report. You can see the scope and price before purchasing.**

Once the product scope is fixed, replace this answer with the concrete deliverable list. Do not leave it vague to conceal missing features.

### Can SailTru implement the recommendations?

**Yes. We can discuss the recommendation, agree a scope, and help carry out the work. Implementation is a separate engagement.**

### Can I use the report with my own team?

**Yes. The report is designed to help you decide what to do next. You can act on the recommendations with your own team or discuss implementation with SailTru.**

Do not promise export formats in this answer until they exist.

### Can you understand our internal workflows from the website?

**The public scan provides an outside-in view. Understanding internal workflows, sales processes, or operational performance requires more context and, where relevant, access to the right information.**

### Do you build custom AI systems and agent teams?

**Yes. We can build automations, integrations, custom software, AI agents, and coordinated agent teams around a defined business need.**

### Do I need to buy a report before discussing a project?

**No. If you already know what you need built, choose Build with SailTru and tell us about the project.**

### Does the report include ongoing monitoring?

**Ongoing monitoring is a separate scope unless your offer explicitly includes it. We explain the coverage before you commit.**

Do not add a delivery-time, “no credit card,” data-retention, refund, or no-access-required answer until the actual policy is defined.

## 11. Subpage direction and metadata

### How we work

Opening: **Find the priority. Build the improvement. Check what changed.**

Explain the canonical loop once:
- Observe: gather available evidence.
- Understand: put the evidence in business context.
- Prioritize: decide what deserves attention first.
- Recommend: propose a defensible next action.
- Build: separately scope and implement the intervention.
- Monitor: measure against the agreed objective when data is available.

Do not imply the report includes every stage as a fulfilled service.

### What we do / capabilities

Use the four customer situations in H05. Explain scope, example deliverable, required access/context, and how to start. Keep website analysis and internal automation distinct.

### Work

Lead with the client, the work performed, and the supported result. Explain period, source, and caveats when available. Distinguish quoted client testimony from independently measured results.

### Build/contact

Heading: **Tell us what you want to improve.**

Body: **Already have a project in mind? Share the problem, the tools involved, and what a useful result would look like.**

Action: **Discuss my project**

Use existing working contact/booking destinations. Do not silently route report purchase to a consultation page.

### Homepage metadata: proposed English

Title: **SailTru — What Should Your Business Improve Next?**

Description: **Start with your website. SailTru identifies evidence-backed opportunities, helps you choose what to improve, and can help implement the next move.**

Social preview: use the protected question and brand mark, not unsupported metrics. Do not describe the company primarily as an SEO/GEO checker.

## 12. Hebrew localization: essential exact strings

Keep the same meaning, section order, access model, and commercial distinctions. Use natural Hebrew and RTL layout. This table supplies the key interface set, not a complete translation of every paragraph above.

| ID | Hebrew |
| --- | --- |
| hero.h1 | מה הדבר הבא שכדאי לשפר בעסק שלך? |
| hero.support | SailTru מתחילה באתר שלך, מזהה הזדמנויות על בסיס ממצאים, ועוזרת להבין מה כדאי לשפר קודם. כשמגיע הזמן לפעול, נוכל גם לעזור ביישום. |
| hero.urlLabel | אתר העסק שלך |
| hero.submit | לניתוח העסק שלי |
| hero.expectation | מתחילים בדוח מצומצם המבוסס על ניתוח האתר. את הדוח המלא, עם הניתוח וההמלצות הנוספים, אפשר לרכוש בנפרד. |
| hero.build | בניית פתרון עם SailTru |
| nav.how | איך זה עובד |
| nav.example | דוח לדוגמה |
| nav.work | עבודות ותוצאות |
| example.badge | דוגמה להמחשה |
| example.heading | להבין את הבעיה. לראות מה כדאי לעשות. |
| journey.heading | מתחילים באתר. מבינים מה הצעד הבא. |
| preview.badge | תצוגה מקדימה |
| report.title | הדוח על העסק שלך |
| report.fullBadge | הדוח המלא |
| report.coverage | מה נבדק |
| report.limitations | מה עדיין לא ידוע |
| finding.observation | מה מצאנו |
| finding.evidence | על מה זה מבוסס |
| finding.significance | למה זה חשוב |
| finding.action | הצעד המומלץ |
| finding.measurement | איך בודקים אם זה עזר |
| offer.heading | לראות את התמונה המלאה |
| offer.buy | לרכישת הדוח המלא |
| offer.owned | פתיחת הדוח המלא |
| offer.implementation | היישום מוצע כפרויקט נפרד. |
| scan.running | ניתוח האתר מתבצע כעת. |
| scan.complete | התצוגה המקדימה שלך מוכנה. |
| scan.open | פתיחת התצוגה המקדימה |
| scan.retry | לנסות שוב |
| implementation.action | נדבר על יישום ההמלצה |
| close.heading | להבין מה הצעד הבא שלך. |

Keep URLs in a readable LTR field. Preserve provider/product names when translating. Translate the remaining page copy using these tone and terminology choices; review the full EN/HE experience side by side before release. Do not ship English-only errors, mixed-direction prices, or raw translation keys.

Use “דוח” consistently. Avoid literal translations of signals/territories as primary customer language.

## 13. Claims and evidence rules

| Claim | Required basis | If absent |
| --- | --- | --- |
| A finding about this business | Actual analysis evidence | Omit or label the uncertainty |
| A ranked priority | Real prioritization logic and supporting context | Call it a finding |
| Competitor coverage | Identified comparison sources and actual work | Do not sell the comparison |
| AI/search visibility | Relevant supported measurement and scope | State not assessed; no recommendation guarantee |
| Revenue/conversion change | Appropriate connected data and method | Do not estimate from a screenshot |
| Implementation outcome | Documented case evidence and clear scope | Use service capability language only |
| Time saved | Observed baseline and defensible method | Explain the workflow without a number |
| Monitoring | Agreed active service and data | Describe separately scoped follow-up |
| Partner/integration | Real relationship or implemented connection | Do not imply endorsement through logos |

The sample report label does not permit unsupported claims in a live report. “Illustrative” belongs with the sample itself.

Never:
- Guarantee revenue, ranking, AI citation, or a fixed uplift.
- Say a service-page observation proves lost customers.
- Claim an internal workflow is broken based only on the public URL.
- Use invented “industry averages” or unrelated benchmarks.
- Claim all recommendations need an AI agent.
- Describe all software/agents as already operating autonomously.
- Say “buy the full report” when the destination actually starts a project.

## 14. Copy cleanup map for the current repo

| Existing direction | Action |
| --- | --- |
| SEO · GEO · Custom AI solutions hero rail | Remove from the hero identity |
| Begin diagnosis | Replace in the primary report journey with the scan/report action |
| Spot the difference / Analyze what it means | Replace public sequence with the worked-example story |
| External / Internal opportunity split | Incorporate useful context into H05 and FAQ |
| Four territories / Delivery / six-stage loops | Use one public engagement explanation; detail the canonical loop on How we work |
| “Agents and automations appear after…” | Remove internal positioning commentary from public copy |
| “Real client outcomes when we have permission…” | Keep permission as editorial control, lead with actual evidence |
| “The rest unlocks when you start a project” | Replace with full-report purchase language |
| “One signal is open” / sample dashboard | Replace with actual personalized preview/access states |
| Timed scan captions | Bind to real backend activity or remove |
| Generic final call booking | Repeat scan primary + Build secondary |

Map the semantic IDs in this file into the existing next-intl catalogs rather than hardcoding copy into components. Remove obsolete visible strings only after checking all consumers. Preserve dynamic domain/count/state interpolation and safe text rendering.

## 15. Review checklist

- [ ] A new visitor can describe SailTru, the report, and the next step after the first two substantive sections.
- [ ] The protected question remains the H1 in English; Hebrew preserves its meaning.
- [ ] Primary conversion is limited personalized report → full report purchase.
- [ ] Bespoke implementation remains visible and separately scoped.
- [ ] The known-need Build path works without a report purchase.
- [ ] Exact English copy above is used or deliberate edits are recorded.
- [ ] Full Hebrew copy follows the supplied terminology and is checked beside English.
- [ ] Illustrative examples and real findings are unmistakably different.
- [ ] Boat scenes use the same example finding and add no fabricated outcomes.
- [ ] Nautical captions support literal product copy; the hero/report/purchase actions stay explicit.
- [ ] Scrolling the boat never produces live-status or payment claims.
- [ ] Preview, paid access, account, progress, and payment language match actual product behavior.
- [ ] Offer contents and price are explicit before purchase.
- [ ] No unsupported timing, free-preview, trial, refund, access, monitoring, or performance promise is published.
- [ ] Evidence supports client and product claims; absent evidence is described honestly.
- [ ] Copy has no internal team instructions, raw field names, or translation keys in public UI.
- [ ] A report can be useful without turning every recommendation into an agency upsell.
