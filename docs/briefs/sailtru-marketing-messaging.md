# SailTru marketing messaging brief

Version: 1.3  
Date: 2026-10-21
Revision: Explanatory obstacle-to-solution story for the sailing-boat journey.  
Repository baseline: main at e2f36a992fd23217363857a7dec56130765bbd75  
Companion: [Design and experience](./sailtru-design.md)  
Audience: Mike, copywriters, designers, developers, and reviewers.

## 1. What this file controls

This is the proposed copy and messaging specification for the next marketing-site and report-purchase experience. It includes exact English copy, a focused Hebrew interface set, source-of-truth rules, and acceptance criteria.

**User-confirmed business journey:** enter a URL → backend analyzes it → show a limited report based on that analysis → sell the full report.

**User-requested visual direction:** a sailing boat travels through obstacles faced by a business owner as the visitor scrolls, inspired by the bee journey Tom identified on ReddGrow. Recognizable problems lead to analysis, evidence, recommendations, the report offer, and optional implementation.

**Company identity:** business intelligence and AI solutions, including bespoke implementation. The paid report is an entry product, not the entire company.

**User-confirmed copy direction:** explain the offer as clearly and sequentially as the ReddGrow reference. A first-time visitor must be able to understand what SailTru does, what happens after URL submission, what is free/limited versus paid, and what implementation means. Clarity takes precedence over cleverness or brevity.

**Status:** the commercial journey, explanatory copy direction, and identity above are confirmed. The wording and section choices below are a concrete implementation proposal based on that direction, not a claim that Tom individually approved every sentence. Use this copy for a reviewable implementation; flag deliberate changes.

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

Do not fill headings with slogans. Each heading must state a business situation, what SailTru does, or what the customer receives. Follow it with enough explanation to remove the next obvious question.

### Explanation is the acceptance standard

- Explain the noun: a report is findings, supporting evidence, and recommendations—not an unexplained “intelligence layer.”
- Explain the sequence: enter a URL, analyze accessible information, read the preview, decide whether to purchase the full report, optionally commission implementation.
- Explain the mechanism: point to the page/source and the observation before recommending a change.
- Explain the transaction: what the full report adds and what implementation costs/scopes separately, using actual offer details.
- Connect sections: end with a question or implication that the next section answers; do not introduce a new company framework at every scroll.
- Keep necessary explanation visible. FAQs and animation must not carry the only explanation of the basic offer.
- Keep paragraphs short, but do not shorten them until they stop answering the question.
- The sailing metaphor supports attention; the literal text must explain the product without the boat.
- Do not promise universal comprehension. Verify understanding with first-time-reader questions in section 15 and revise unclear passages.

**Public brand string: SailTru**, matching the identity document's public-site naming. Preserve official legal/payment entity naming separately when supplied. Do not alternate SailTru, Sailtru, and SailTrue within customer-facing interface copy. Do not redesign the wordmark for this naming cleanup.

Use **limited report** when explaining the access model and **preview** as the shorter interface term. Use **full report** for the paid product. Use **project** for implementation work.

## 5. Exact homepage copy: English

Section IDs match the design brief. These are the default proposed strings; do not randomly rotate alternatives.

### H01 — Hero

| ID | Placement | Copy |
| --- | --- | --- |
| hero.h1 | H1 | What should your business improve next? |
| hero.support | Supporting paragraph | SailTru analyzes your website and explains what could be improved, why it matters, and what to change. We can also carry out the work, from website improvements to custom AI systems and automation. |
| hero.urlLabel | Visible input label | Your business website |
| hero.urlPlaceholder | Placeholder | yourcompany.com |
| hero.submit | Primary form action | Analyze my business |
| hero.expectation | Immediately beneath form | Enter your website to see a limited report based on its analysis. You can then choose whether to buy the full report. |
| hero.build | Quiet secondary action | Build with SailTru |

Do not prepend the old SEO · GEO · Custom AI solutions rail. Do not call the preview a free trial. The supporting line may be set on multiple lines but must not be expanded into an essay.

Navigation: **How it works**, **Example report**, **Work**, **Build with SailTru**. The primary scan is the hero form. Avoid a second competing Begin diagnosis action.

Keep this single hero version. Explain any additional verified competitor/search/AI checks in the visible coverage list, with their actual scope; do not swap the hero for a more abstract slogan.

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

### H03 — The obstacles a business owner recognizes

| ID | Placement | Copy |
| --- | --- | --- |
| obstacles.heading | H2 | Customers need to find you, understand you, and choose you. |
| obstacles.intro | Intro | Each step can create a different problem. Before investing in another change, it helps to understand where customers may be getting stuck. |

**Scene 1 — Fog: being found**
- Heading: **If customers don't find your business, they can't choose it.**
- Body: **People look for businesses through search, AI answers, recommendations, and other channels. If you aren't visible where your customers look, they may discover another option first.**
- Bridge: **But getting someone to your website is only the first step.**
- Scope rule: this explains a business problem. It does not promise the URL scan measures every discovery channel.

**Scene 2 — Reef: turning a visit into an enquiry**
- Heading: **They reach your website. Can they see what to do next?**
- Body: **Visitors need to understand what you offer and how to take the next step. Unclear service information, a difficult form, or a hard-to-find enquiry link can make that journey harder.**
- Example: **In our Example Studio illustration, the service page has an enquiry link only in its footer. We can observe that layout; measuring its effect requires more evidence.**
- Bridge: **And your website is rarely the only option a customer considers.**

**Scene 3 — Cross-currents: competing for the same customer**
- Heading: **Your customers are comparing you with other businesses.**
- Body: **They may see different prices, promises, service details, and reasons to trust each company. Comparing those public differences can help you understand where your own offer needs to be clearer.**
- Bridge: **So which of these should your business address first?**
- Scope rule: competitor analysis belongs in a purchased offer only when actually performed/included. This scene is not a fabricated comparison of the visitor's company.

Three linked scenes are enough before the diagnostic answer. Do not add an obstacle for every service. Manual work appears after the report explanation in H05, where the scope distinction can be made explicit.

### H04 — How the report journey works

| ID | Placement | Copy |
| --- | --- | --- |
| journey.eyebrow | Label | How it works |
| journey.heading | H2 | Here is what happens after you enter your website. |
| journey.intro | Intro | Start with your website. SailTru examines the accessible information included in the analysis, explains what it found, and recommends changes it can support. Review a limited preview before deciding whether to buy the full report. |
| journey.step1.title | Step | Share your website |
| journey.step1.body | Body | Enter your business website. SailTru uses it to examine the public pages and information included in the analysis. |
| journey.step2.title | Step | Review your preview |
| journey.step2.body | Body | See a useful finding about your website, the evidence behind it, and a recommended change when the analysis supports one. Your preview also explains what could not be assessed. |
| journey.step3.title | Step | Get the full report |
| journey.step3.body | Body | Review the exact contents and price beside your preview. If you choose to buy, you receive the additional findings, evidence, and recommendations included in that offer. |
| journey.action | Repeat URL form submit | Analyze my business |

Do not imply that all customers will have the same number or severity of findings.

The limited/full comparison must use the capability rules in section 8. Publish only rows fulfilled by the selected offer.

### H04A — Worked report example (carried forward from the reef scene)

| ID | Placement | Copy |
| --- | --- | --- |
| example.eyebrow | Label | Inside the report |
| example.heading | Report subheading | Here is how a website observation becomes a recommendation. |
| example.intro | Intro | Imagine a customer reading about one of your services. They understand what you offer, but the enquiry link is difficult to find. The example below shows what SailTru would look at, what it could recommend, and what would still need to be measured. |
| example.badge | Persistent sample label | Illustrative example |
| example.business | Fictional sample name | Example Studio |
| example.cta | Sample disclosure/view | View example report |

**Chapter A — What we observed**
- Heading: **A customer reads about your service. The enquiry link is only in the footer.**
- Body: **In this example, visitors can read about the service, but the enquiry link appears only in the footer.**
- Evidence label: **Page observation**
- Evidence: **A service-page excerpt with no nearby enquiry action.**

**Chapter B — Why it deserves attention**
- Heading: **We explain why the location of that link matters.**
- Body: **Someone ready to enquire has to look elsewhere on the page for a way to contact the business. A relevant enquiry action beside the service details may make that next step easier to find.**
- Caveat: **We can observe the page layout. We would need analytics or a user study to establish whether it affects enquiries.**

**Chapter C — What to change**
- Heading: **We recommend adding an enquiry action beside the service details.**
- Body: **Add a button that lets the visitor enquire about this service. Explain whether the business will reply by email, arrange a call, or take another next step, according to its actual process.**
- Example interface action: **Discuss your project**

**Chapter D — How to check the result**
- Heading: **After the change, check whether more visitors make useful enquiries.**
- Body: **With the right analytics, compare service-page enquiry behavior before and after the change. Check enquiry quality too, and account for other changes that may have affected the result.**
- Implementation bridge: **SailTru can help design, build, and evaluate the change as a separate project.**

Every example screenshot/fragment uses the fictional name and sample label. Do not show an invented conversion uplift, industry-average deficit, competitor dataset, confidence score, or elapsed scan.

### H05 — Capabilities

| ID | Placement | Copy |
| --- | --- | --- |
| capabilities.heading | H2 | What can SailTru help you improve? |
| capabilities.intro | Intro | The website analysis is a starting point. SailTru also helps businesses improve their websites, investigate visibility and competition, automate manual work, and build custom AI systems. Some of that work needs additional business information and a separately agreed project. |

**Discovery**
- Heading: **Search and AI visibility**
- Body: **Investigate search and AI visibility, understand relevant gaps, and improve the content and technical foundations that support discovery.**
- Scope note: **Visibility checks depend on the analysis coverage.**

**Choice**
- Heading: **Website messaging and competitor positioning**
- Body: **Examine what your website says, how it guides visitors, and how your public positioning compares with competitors when comparison research is included. Recommend specific changes to the pages and messages.**

**Operations — the later anchor scene**
- Scene heading: **And every new enquiry can create more work for your team.**
- Scene body: **Copying details between tools, assigning tasks, and chasing follow-ups can keep people busy. To find out where automation would help, we need to understand how your process works today.**
- Heading: **Manual workflows and automation**
- Body: **Tell us how a process works today—for example, moving a new enquiry into your CRM and assigning follow-up. We can map the handoffs and build automation where it is useful.**
- Scope note: **Requires workflow discovery; this is not measured by the public website scan.**

**Custom systems**
- Heading: **Custom software and AI systems**
- Body: **We can build an internal tool, connect existing systems, or create AI agents and coordinated agent teams for a defined workflow. The scope starts with the business problem and the information the system needs.**

Operations/custom systems action: **Build with SailTru**.
Do not make all four rows look like included report features.

### H06 — Implementation and measurement

| ID | Placement | Copy |
| --- | --- | --- |
| implementation.heading | H2 | You receive the recommendations. Who makes the changes? |
| implementation.body | Body | You can use the report with your own team. If you want SailTru to do the work, we agree what will be built, what access is needed, how it will be measured, and the project price before starting. |
| implementation.scope | Clarifier | Buying the report does not include implementation. That is a separate project. |
| implementation.action | Action | Build with SailTru |
| implementation.monitorHeading | Small heading | How do we check whether the change helped? |
| implementation.monitorBody | Body | For an implementation project, we agree what to measure and what data is needed. After the change, we review the evidence against that objective. A completed build does not by itself prove a business improvement. |

Do not imply that report purchase automatically begins implementation or continuous monitoring.

### H07 — FAQ and close

Closing H2: **Enter your website to see what the analysis finds.**  
Closing body: **Review a limited report about your website, with evidence and a recommended next step when supported. Then decide whether to buy the full report or discuss implementation.**  
Primary URL submit: **Analyze my business**  
Expectation sentence: reuse hero.expectation exactly.  
Secondary action: **Build with SailTru**

FAQ copy appears in section 10.

## 5A. Explanatory narration for the obstacle voyage

The detailed motion storyboard is in section 8 of the design brief. Keep one recognizable boat/business across the whole journey. The copy must explain the business meaning even when the illustration is absent.

| Scene | Main visible explanation | What the boat demonstrates |
| --- | --- | --- |
| Hero | What should your business improve next? | Several possible courses; URL entry and the actual report offer remain visible |
| Fog | If customers don't find your business, they can't choose it. | Discovery is difficult when the business is not visible to the relevant customer |
| Reef | They reach your website. Can they see what to do next? | The route from service information to enquiry may be unclear |
| Cross-currents | Your customers are comparing you with other businesses. | Customers see alternatives; comparison may reveal useful differences |
| Diagnostic report | So which of these should your business address first? | Evidence is organized into findings and supported recommendations |
| Report journey | Here is what happens after you enter your website. | The limited preview, full report, and purchase are explained concretely |
| Anchor / operations | And every new enquiry can create more work for your team. | Manual handoffs need workflow context; a separately scoped automation can help |
| Implementation | You receive the recommendations. Who makes the changes? | Own-team work or separately scoped SailTru implementation, followed by measurement |
| Close | Enter your website to see what the analysis finds. | The visitor can start with analysis or take the known-need Build path |

Render each main explanation once. A boat caption can be shorter when the full heading is visible nearby.

### The diagnostic/report moment

Connect the earlier Example Studio reef observation to a real-looking, clearly illustrative report entry:
- **What we found:** the enquiry link is only in the footer.
- **Why we say this:** the visible page excerpt.
- **Recommended next move:** add an enquiry action beside the service details.
- **How to check it:** measure enquiries/quality with appropriate data after the change.

The homepage scene is an **Illustrative example**. The visitor's actual scan produces a separate personalized preview. Show exactly what the full-report purchase adds; do not suggest it measures every illustrated business problem.

The boat keeps moving through the homepage without a purchase. Paid report access is an application entitlement, not a scroll obstacle.

### Narrative and scope rules

- Problem recognition comes first; supported diagnosis follows. Do not assert that every visitor has all the illustrated problems.
- Let each transition follow the customer's path: being found → understanding the site → comparing choices → deciding what to improve.
- Introduce internal manual work after explaining the public-URL report, and state that workflow discovery requires more context.
- A chart is visual shorthand for understanding the evidence. It does not guarantee a correct route, a revenue result, or live report completeness.
- The boat can cross fog, reefs, currents, and a later anchor. Do not portray failure, bankruptcy, or a sinking business to create an unsupported fear.
- Keep the literal product controls and protected hero question. Avoid replacing explanations with sailing puns.
- Do not claim that scrolling confirms analysis, implementation, payment, or paid access.

### Hebrew obstacle headings and bridges

| Scene | Hebrew |
| --- | --- |
| Obstacle introduction | כדי שלקוחות יבחרו בך, הם צריכים למצוא אותך ולהבין מה העסק מציע. |
| Fog | אם לקוחות לא מוצאים את העסק שלך, הם לא יכולים לבחור בו. |
| Fog-to-reef bridge | אבל הגעה לאתר היא רק הצעד הראשון. |
| Reef | הם הגיעו לאתר. האם ברור להם מה הצעד הבא? |
| Reef-to-competition bridge | והאתר שלך הוא בדרך כלל לא האפשרות היחידה שהם בודקים. |
| Cross-currents | הלקוחות שלך משווים אותך לעסקים אחרים. |
| Diagnostic question | אז במה כדאי לעסק שלך לטפל קודם? |
| Report journey | מה קורה אחרי שמזינים את אתר העסק? |
| Manual-work anchor | וכל פנייה חדשה יכולה להוסיף עוד עבודה לצוות. |
| Implementation | קיבלת את ההמלצות. מי מיישם את השינויים? |
| Close | מזינים את האתר ורואים מה הניתוח מוצא. |

Translate the full paragraphs with the same scope distinctions and the established Hebrew terminology. Mirror the visual route where appropriate without mirroring screenshots, words, or controls.

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

- Heading: **See the rest of your report.**
- Body: **Your preview shows part of the analysis. The full report adds the findings, supporting evidence, and recommendations listed below. Review the contents and price before deciding whether to buy.**
- Primary action: **Buy the full report**
- Owned action: **Open full report**
- Clarifier: **Implementation is available as a separate project.**

Replace the generic body with an exact supported deliverable list once the backend contract is confirmed. Show coverage limitations beside the offer. A heading cannot imply that the report examines parts of the business that were not assessed.

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

Opening: **We analyze the business, recommend changes, and can help implement them.**

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
| hero.support | SailTru מנתחת את האתר שלך ומסבירה מה אפשר לשפר, למה זה חשוב ומה כדאי לשנות. נוכל גם לבצע את העבודה, משיפורים באתר ועד מערכות AI ואוטומציה מותאמות לעסק. |
| hero.urlLabel | אתר העסק שלך |
| hero.submit | לניתוח העסק שלי |
| hero.expectation | מזינים את אתר העסק ומקבלים דוח מצומצם המבוסס על הניתוח שלו. לאחר מכן אפשר להחליט אם לרכוש את הדוח המלא. |
| hero.build | בניית פתרון עם SailTru |
| nav.how | איך זה עובד |
| nav.example | דוח לדוגמה |
| nav.work | עבודות ותוצאות |
| example.badge | דוגמה להמחשה |
| example.heading | כך בדיקה של עמוד באתר הופכת להמלצה לשינוי. |
| journey.heading | מה קורה אחרי שמזינים את אתר העסק? |
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
| offer.heading | לראות את יתר הדוח |
| offer.buy | לרכישת הדוח המלא |
| offer.owned | פתיחת הדוח המלא |
| offer.implementation | היישום מוצע כפרויקט נפרד. |
| scan.running | ניתוח האתר מתבצע כעת. |
| scan.complete | התצוגה המקדימה שלך מוכנה. |
| scan.open | פתיחת התצוגה המקדימה |
| scan.retry | לנסות שוב |
| implementation.action | נדבר על יישום ההמלצה |
| close.heading | מזינים את האתר ורואים מה הניתוח מוצא. |

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
- [ ] Boat obstacles describe recognizable possibilities; actual diagnosis is evidence-backed and scope-aware.
- [ ] The same reef/service-page observation carries into the worked report example with no fabricated outcomes.
- [ ] Scene headings explain the situation or action directly; nautical captions never replace product explanation.
- [ ] Scrolling the boat never produces live-status or payment claims.
- [ ] Preview, paid access, account, progress, and payment language match actual product behavior.
- [ ] Offer contents and price are explicit before purchase.
- [ ] No unsupported timing, free-preview, trial, refund, access, monitoring, or performance promise is published.
- [ ] Evidence supports client and product claims; absent evidence is described honestly.
- [ ] Copy has no internal team instructions, raw field names, or translation keys in public UI.
- [ ] A report can be useful without turning every recommendation into an agency upsell.

### First-time-reader comprehension check

Have reviewers unfamiliar with the project answer these questions from the rendered page without a verbal explanation from its builder:
1. What does SailTru do?
2. What happens after I enter my website?
3. What information does the analysis use, and what cannot it know from a URL?
4. What do I receive before paying?
5. What does the full-report purchase add, and what does it cost?
6. Does buying the report include someone making the changes?
7. Can I ask SailTru to build something without buying a report?

For release, none of these core answers should depend on guessing, boat symbolism, a hidden tooltip, or a salesperson. The price/scope answer requires the real configured offer; an internal preview may mark that as not yet configured. If a reviewer misunderstands a core answer, identify and rewrite the responsible passage before marking the copy complete. This is a practical review standard, not a guarantee that every possible visitor will understand.

### Explanation examples for the team

| Avoid as the only explanation | Use instead |
| --- | --- |
| Find your next move. | Enter your website. We analyze it and show a limited report with findings, evidence, and recommendations. |
| Intelligence that drives impact. | See what we observed on your website, why it may matter, and what we recommend changing. |
| Unlock the full picture. | Buy the full report to see the additional findings and recommendations listed in the offer. |
| From insight to execution. | Use the recommendations with your team, or hire SailTru separately to make the changes. |

These replacements illustrate the clarity requirement; the exact page strings remain in section 5.
