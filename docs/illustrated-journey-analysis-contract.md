# Illustrated journey analysis integration contract

The homepage currently validates and normalizes a public website URL through `submitHomepageScanStub`. It does not simulate analysis, progress, findings, pricing, or purchase state.

## UI state

```ts
type HomepageAnalysisState =
  | { kind: "idle" }
  | { kind: "submitting"; websiteUrl: string }
  | { kind: "analyzing"; jobId: string; stage?: string }
  | { kind: "limited-report"; jobId: string; report: LimitedReport }
  | { kind: "purchase-offer"; jobId: string; report: LimitedReport; offer: ReportOffer }
  | { kind: "error"; websiteUrl: string; code: string; message: string; retryable: boolean };
```

`analyzing` must be driven by a backend response or status stream. The client must not advance it on a timer. A percentage may be shown only when the backend returns a meaningful numerator and denominator.

## Submission

```ts
type StartAnalysisRequest = {
  websiteUrl: string; // normalized HTTPS URL
  locale: "en" | "he";
  idempotencyKey: string;
};

type StartAnalysisResponse = {
  jobId: string;
  status: "queued" | "running" | "partial" | "complete";
};
```

The future mutation should accept `StartAnalysisRequest` and return `StartAnalysisResponse`. Reusing an idempotency key must not create a duplicate analysis.

## Status and limited report

```ts
type AnalysisStatusResponse = {
  jobId: string;
  status: "queued" | "running" | "partial" | "complete" | "failed" | "unsupported";
  stage?: string;
  progress?: { completed: number; total: number };
  limitedReport?: LimitedReport;
  offer?: ReportOffer;
  error?: { code: string; message: string; retryable: boolean };
};

type LimitedReport = {
  reportId: string;
  websiteUrl: string;
  generatedAt: string;
  coverage: string[];
  limitations: string[];
  findings: Array<{
    id: string;
    title: string;
    observation: string;
    evidence: Array<{ label: string; sourceUrl?: string }>;
    recommendation?: string;
    measurement?: string;
    uncertainty?: string;
  }>;
};

type ReportOffer = {
  offerId: string;
  currency: string;
  amountMinor: number;
  taxDisplay: string;
  contents: string[];
  availability: string;
  implementationIncluded: false;
};
```

The backend owns report authorization, paid-content release, and purchase entitlement. Paid findings must not be sent to an unauthorized browser and hidden with CSS.

## Component transition

Replace the successful stub branch inside `journey-scan-form.tsx` with a typed analysis client. Preserve the current validation and entered value. Both homepage forms should share the same analysis state through a small provider so a submission in either location can continue into the limited report without duplicate jobs.

