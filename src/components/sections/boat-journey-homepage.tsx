"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useId, useState } from "react";
import { submitHomepageScanStub } from "@/lib/homepage-scan-stub";
import "./boat-journey-homepage.css";

type LocaleKey = "en" | "he";

type SceneTone = "hero" | "fog" | "reef" | "currents" | "chart" | "anchor" | "harbor";

type Scene = {
  tone: SceneTone;
  label: string;
  title: string;
  body: string;
  bridge?: string;
  example?: string;
};

const copy = {
  en: {
    nav: {
      how: "How it works",
      example: "Example report",
      work: "Work",
      build: "Build with SailTru"
    },
    hero: {
      h1: "What should your business improve next?",
      support:
        "SailTru analyzes your website and explains what could be improved, why it matters, and what to change. We can also carry out the work, from website improvements to custom AI systems and automation.",
      label: "Your business website",
      placeholder: "yourcompany.com",
      submit: "Analyze my business",
      expectation:
        "Enter your website to see a limited report based on its analysis. You can then choose whether to buy the full report.",
      build: "Build with SailTru"
    },
    proof: {
      metric: "+275% traffic",
      client: "Laba Records",
      quote:
        "SailTru helped us turn our website into a real growth channel. Traffic grew by 275%, with roughly 10x more conversions and paying clients.",
      link: "See the client story"
    },
    obstacles: {
      title: "Customers need to find you, understand you, and choose you.",
      intro:
        "Each step can create a different problem. Before investing in another change, it helps to understand where customers may be getting stuck.",
      question: "So which of these should your business address first?"
    },
    scenes: [
      {
        tone: "fog",
        label: "Fog / discovery",
        title: "If customers don't find your business, they can't choose it.",
        body:
          "People look for businesses through search, AI answers, recommendations, and other channels. If you aren't visible where your customers look, they may discover another option first.",
        bridge: "But getting someone to your website is only the first step."
      },
      {
        tone: "reef",
        label: "Reef / website journey",
        title: "They reach your website. Can they see what to do next?",
        body:
          "Visitors need to understand what you offer and how to take the next step. Unclear service information, a difficult form, or a hard-to-find enquiry link can make that journey harder.",
        example:
          "Illustrative Example Studio observation: the service page has an enquiry link only in its footer. We can observe that layout; measuring its effect requires more evidence.",
        bridge: "And your website is rarely the only option a customer considers."
      },
      {
        tone: "currents",
        label: "Cross-currents / comparison",
        title: "Your customers are comparing you with other businesses.",
        body:
          "They may see different prices, promises, service details, and reasons to trust each company. Comparing those public differences can help you understand where your own offer needs to be clearer.",
        bridge: "So which of these should your business address first?"
      }
    ] satisfies Scene[],
    journey: {
      title: "Here is what happens after you enter your website.",
      intro:
        "Start with your website. SailTru examines the accessible information included in the analysis, explains what it found, and recommends changes it can support. Review a limited preview before deciding whether to buy the full report.",
      steps: [
        {
          title: "Share your website",
          body: "Enter your business website. SailTru uses it to examine the public pages and information included in the analysis."
        },
        {
          title: "Review your preview",
          body:
            "See a useful finding about your website, the evidence behind it, and a recommended change when the analysis supports one."
        },
        {
          title: "See contents and price",
          body:
            "Review what the full report adds and the price before payment. Implementation remains a separate project."
        },
        {
          title: "Decide whether to purchase",
          body:
            "If you choose to buy, you receive the additional findings, evidence, and recommendations included in that offer."
        }
      ]
    },
    example: {
      badge: "Illustrative example",
      title: "Here is how a website observation becomes a recommendation.",
      intro:
        "The same reef finding carries into the chart as a sample report entry. It is not a live result for the visitor's business.",
      observedTitle: "What we found",
      observed: "A customer reads about the service. The enquiry link appears only in the footer.",
      evidenceTitle: "Evidence",
      evidence: "A service-page excerpt with no nearby enquiry action.",
      recommendationTitle: "Recommendation",
      recommendation:
        "Add an enquiry action beside the service details and explain the real next step: email reply, call, or another process.",
      measurementTitle: "Measurement",
      measurement:
        "With suitable analytics, compare service-page enquiry behavior before and after the change. Check enquiry quality and account for other changes.",
      cta: "View example report"
    },
    offer: {
      title: "The preview helps you decide before buying the full report.",
      body:
        "Your preview shows part of the analysis. The full report adds the findings, supporting evidence, and recommendations listed in the offer. The real product must show contents and price before purchase.",
      limited: "Limited preview",
      full: "Full report",
      limitedItems: [
        "One supported finding when evidence allows it.",
        "Evidence, recommendation, and limitations.",
        "No fake progress, ranking, or purchase state."
      ],
      fullItems: [
        "Additional findings listed in the offer.",
        "Supporting evidence and recommendations.",
        "Contents and price shown before payment."
      ],
      unknown: "Price and exact paid coverage are not configured in this static slice."
    },
    beyond: {
      title: "Beyond the report: implementation is a calmer, separate route.",
      body:
        "You can use the recommendations with your own team. If you want SailTru to do the work, we agree what will be built, what access is needed, how it will be measured, and the project price before starting.",
      anchorTitle: "Manual workflows and automation",
      anchorBody:
        "Copying details between tools, assigning tasks, and chasing follow-ups can keep people busy. Understanding that work needs workflow discovery; it is not measured by a public website scan.",
      action: "Build with SailTru"
    },
    faq: {
      title: "Enter your website to see what the analysis finds.",
      body:
        "Review a limited report about your website, with evidence and a recommended next step when supported. Then decide whether to buy the full report or discuss implementation."
    }
  },
  he: {
    nav: {
      how: "איך זה עובד",
      example: "דוח לדוגמה",
      work: "עבודות ותוצאות",
      build: "בניית פתרון עם SailTru"
    },
    hero: {
      h1: "מה הדבר הבא שכדאי לשפר בעסק שלך?",
      support:
        "SailTru מנתחת את האתר שלך ומסבירה מה אפשר לשפר, למה זה חשוב ומה כדאי לשנות. נוכל גם לבצע את העבודה, משיפורים באתר ועד מערכות AI ואוטומציה מותאמות לעסק.",
      label: "אתר העסק שלך",
      placeholder: "yourcompany.com",
      submit: "לניתוח העסק שלי",
      expectation:
        "מזינים את אתר העסק ומקבלים דוח מצומצם המבוסס על הניתוח שלו. לאחר מכן אפשר להחליט אם לרכוש את הדוח המלא.",
      build: "בניית פתרון עם SailTru"
    },
    proof: {
      metric: "+275% תנועה",
      client: "Laba Records",
      quote:
        "SailTru הפכה את האתר שלנו לערוץ צמיחה אמיתי. התנועה גדלה ב-275%, עם בערך פי 10 יותר המרות ולקוחות משלמים.",
      link: "לקריאת סיפור הלקוח"
    },
    obstacles: {
      title: "כדי שלקוחות יבחרו בך, הם צריכים למצוא אותך ולהבין מה העסק מציע.",
      intro:
        "בכל שלב יכולה להיווצר בעיה אחרת. לפני שמשקיעים בעוד שינוי, כדאי להבין איפה לקוחות אולי נתקעים.",
      question: "אז במה כדאי לעסק שלך לטפל קודם?"
    },
    scenes: [
      {
        tone: "fog",
        label: "ערפל / גילוי",
        title: "אם לקוחות לא מוצאים את העסק שלך, הם לא יכולים לבחור בו.",
        body:
          "אנשים מחפשים עסקים דרך חיפוש, תשובות AI, המלצות וערוצים נוספים. אם העסק לא מופיע במקום שבו הלקוחות מחפשים, הם עשויים לגלות אפשרות אחרת קודם.",
        bridge: "אבל הגעה לאתר היא רק הצעד הראשון."
      },
      {
        tone: "reef",
        label: "שונית / מסע באתר",
        title: "הם הגיעו לאתר. האם ברור להם מה הצעד הבא?",
        body:
          "מבקרים צריכים להבין מה העסק מציע ואיך ממשיכים. מידע שירות לא ברור, טופס מסורבל או קישור פנייה שקשה למצוא יכולים להקשות על המסע.",
        example:
          "דוגמה להמחשה של Example Studio: בעמוד השירות קישור הפנייה מופיע רק בפוטר. אפשר לראות את המבנה הזה; כדי למדוד את ההשפעה צריך עוד ראיות.",
        bridge: "והאתר שלך הוא בדרך כלל לא האפשרות היחידה שהם בודקים."
      },
      {
        tone: "currents",
        label: "זרמים נגדיים / השוואה",
        title: "הלקוחות שלך משווים אותך לעסקים אחרים.",
        body:
          "הם עשויים לראות מחירים, הבטחות, פרטי שירות וסיבות אמון שונות אצל כל חברה. השוואת ההבדלים הציבוריים יכולה לעזור להבין איפה ההצעה שלך צריכה להיות ברורה יותר.",
        bridge: "אז במה כדאי לעסק שלך לטפל קודם?"
      }
    ] satisfies Scene[],
    journey: {
      title: "מה קורה אחרי שמזינים את אתר העסק?",
      intro:
        "מתחילים מהאתר. SailTru בוחנת את המידע הנגיש שכלול בניתוח, מסבירה מה נמצא וממליצה על שינויים שאפשר לתמוך בהם. קודם רואים תצוגה מקדימה מוגבלת, ואז מחליטים אם לרכוש את הדוח המלא.",
      steps: [
        {
          title: "מזינים אתר",
          body: "מזינים את אתר העסק. SailTru משתמשת בו כדי לבחון עמודים ציבוריים ומידע שכלולים בניתוח."
        },
        {
          title: "בודקים תצוגה מקדימה",
          body: "רואים ממצא שימושי על האתר, את הראיות שמאחוריו, והמלצה כשיש לניתוח מספיק בסיס."
        },
        {
          title: "רואים תוכן ומחיר",
          body: "בודקים מה הדוח המלא מוסיף ומה המחיר לפני התשלום. היישום נשאר פרויקט נפרד."
        },
        {
          title: "מחליטים אם לרכוש",
          body: "אם בוחרים לרכוש, מקבלים את הממצאים, הראיות וההמלצות הנוספים שכלולים בהצעה."
        }
      ]
    },
    example: {
      badge: "דוגמה להמחשה",
      title: "כך בדיקה של עמוד באתר הופכת להמלצה לשינוי.",
      intro: "אותו ממצא מהשונית מופיע במפה כממצא דוח לדוגמה. זו לא תוצאה חיה עבור העסק של המבקר.",
      observedTitle: "מה מצאנו",
      observed: "לקוח קורא על השירות. קישור הפנייה מופיע רק בפוטר.",
      evidenceTitle: "על מה זה מבוסס",
      evidence: "מקטע מעמוד שירות ללא פעולת פנייה ליד פרטי השירות.",
      recommendationTitle: "הצעד המומלץ",
      recommendation: "להוסיף פעולת פנייה ליד פרטי השירות ולהסביר את הצעד האמיתי הבא: מייל, שיחה או תהליך אחר.",
      measurementTitle: "איך בודקים",
      measurement: "עם אנליטיקה מתאימה, משווים התנהגות פניות בעמוד השירות לפני ואחרי השינוי ובודקים גם איכות פניות.",
      cta: "דוח לדוגמה"
    },
    offer: {
      title: "התצוגה המקדימה עוזרת להחליט לפני רכישת הדוח המלא.",
      body:
        "התצוגה המקדימה מציגה חלק מהניתוח. הדוח המלא מוסיף את הממצאים, הראיות וההמלצות שמופיעים בהצעה. המוצר האמיתי חייב להציג תוכן ומחיר לפני רכישה.",
      limited: "תצוגה מקדימה מוגבלת",
      full: "הדוח המלא",
      limitedItems: [
        "ממצא נתמך אחד כשיש מספיק ראיות.",
        "ראיות, המלצה ומגבלות.",
        "בלי התקדמות, דירוג או מצב רכישה מומצאים."
      ],
      fullItems: [
        "ממצאים נוספים שמופיעים בהצעה.",
        "ראיות תומכות והמלצות.",
        "תוכן ומחיר מוצגים לפני התשלום."
      ],
      unknown: "המחיר והכיסוי המדויק של הדוח בתשלום עדיין לא מוגדרים בפרוסה הסטטית הזו."
    },
    beyond: {
      title: "מעבר לדוח: יישום הוא מסלול רגוע ונפרד.",
      body:
        "אפשר להשתמש בהמלצות עם הצוות שלך. אם רוצים ש-SailTru תבצע את העבודה, מסכימים מראש מה בונים, איזו גישה נדרשת, איך מודדים ומה מחיר הפרויקט.",
      anchorTitle: "תהליכים ידניים ואוטומציה",
      anchorBody:
        "העתקת פרטים בין כלים, הקצאת משימות ומעקב אחרי המשך טיפול יכולים להעמיס על הצוות. כדי להבין איפה אוטומציה תעזור צריך גילוי תהליך; זה לא נמדד מסריקת אתר ציבורי.",
      action: "בניית פתרון עם SailTru"
    },
    faq: {
      title: "מזינים את האתר ורואים מה הניתוח מוצא.",
      body:
        "בודקים דוח מצומצם על האתר, עם ראיות וצעד מומלץ כשהניתוח תומך בכך. אחר כך מחליטים אם לרכוש את הדוח המלא או לדבר על יישום."
    }
  }
};

function getCopy(locale: string) {
  return copy[locale === "he" ? "he" : "en"];
}

function BoatMark({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "boat-scene__boat boat-scene__boat--small" : "boat-scene__boat"} viewBox="0 0 128 112" aria-hidden>
      <path d="M25 76c20 12 44 17 68 11 9-2 17-6 25-12-8 17-27 29-51 29-24 0-39-10-42-28Z" fill="#0a1015" />
      <path d="M29 71c18 9 37 10 58 0-5 14-20 24-38 24-13 0-21-8-20-24Z" fill="#2e63ff" />
      <path d="M31 69c19 5 38 5 55 0l-3 10c-16 5-34 5-49 0l-3-10Z" fill="#101828" />
      <path d="M42 67c18-19 27-41 28-64l18 57-46 7Z" fill="#f8fbff" />
      <path d="M76 5c22 16 36 38 38 60L87 78 76 5Z" fill="#dff6ff" />
      <path d="M70 7c5 22 6 43-2 64l8-1c7-20 8-42 2-65l-8 2Z" fill="#101828" />
    </svg>
  );
}

function SceneIllustration({ tone }: { tone: SceneTone }) {
  return (
    <figure className={`boat-scene boat-scene--${tone}`} aria-hidden>
      <svg className="boat-scene__route" viewBox="0 0 320 172">
        <path d="M22 118C73 79 125 150 175 104C217 66 249 82 298 49" />
      </svg>
      {tone === "hero" ? (
        <>
          <div className="boat-scene__course boat-scene__course--one" />
          <div className="boat-scene__course boat-scene__course--two" />
          <div className="boat-scene__marker boat-scene__marker--soft" />
        </>
      ) : null}
      {tone === "fog" ? (
        <>
          <span className="boat-scene__fog boat-scene__fog--a" />
          <span className="boat-scene__fog boat-scene__fog--b" />
          <span className="boat-scene__buoy">search</span>
          <span className="boat-scene__buoy boat-scene__buoy--muted">AI</span>
        </>
      ) : null}
      {tone === "reef" ? (
        <>
          <span className="boat-scene__reef boat-scene__reef--a" />
          <span className="boat-scene__reef boat-scene__reef--b" />
          <span className="boat-scene__page">Service details</span>
          <span className="boat-scene__footer-link">enquiry link</span>
        </>
      ) : null}
      {tone === "currents" ? (
        <>
          <span className="boat-scene__current boat-scene__current--a" />
          <span className="boat-scene__current boat-scene__current--b" />
          <span className="boat-scene__alt-boat boat-scene__alt-boat--a" />
          <span className="boat-scene__alt-boat boat-scene__alt-boat--b" />
        </>
      ) : null}
      {tone === "chart" ? (
        <>
          <span className="boat-scene__chart-card">
            <span>what we found</span>
            <span>evidence</span>
            <span>recommendation</span>
          </span>
          <span className="boat-scene__route-pin" />
        </>
      ) : null}
      {tone === "anchor" ? (
        <>
          <span className="boat-scene__anchor-line" />
          <span className="boat-scene__anchor">CRM</span>
          <span className="boat-scene__handoff">handoff</span>
        </>
      ) : null}
      {tone === "harbor" ? (
        <>
          <span className="boat-scene__harbor" />
          <span className="boat-scene__lighthouse" />
          <span className="boat-scene__measure">measure</span>
        </>
      ) : null}
      <BoatMark small={tone !== "hero"} />
    </figure>
  );
}

function ScanForm({ variant = "light" }: { variant?: "light" | "paper" }) {
  const locale = useLocale();
  const t = getCopy(locale).hero;
  const inputId = useId();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "error" | "stub"; text: string }>({
    kind: "idle",
    text: t.expectation
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = submitHomepageScanStub(value);

    if (!result.ok) {
      setStatus({ kind: "error", text: result.message });
      return;
    }

    setStatus({
      kind: "stub",
      text: `${result.host}: ${result.message}`
    });
  }

  return (
    <form className={`boat-scan boat-scan--${variant}`} onSubmit={onSubmit} noValidate>
      <label className="boat-scan__label" htmlFor={inputId}>
        {t.label}
      </label>
      <div className="boat-scan__row">
        <input
          id={inputId}
          className="boat-scan__input"
          type="text"
          inputMode="url"
          autoComplete="url"
          dir="ltr"
          placeholder={t.placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button className="boat-scan__button" type="submit">
          {t.submit}
        </button>
      </div>
      <p className={`boat-scan__note boat-scan__note--${status.kind}`} aria-live="polite">
        {status.text}
      </p>
    </form>
  );
}

export function BoatJourneyHomepage() {
  const locale = useLocale() as LocaleKey;
  const t = getCopy(locale);

  return (
    <main id="main-content" className="boat-home">
      <section className="boat-hero">
        <a href="#main-content" className="boat-skip">
          Skip to main content
        </a>
        <header className="boat-nav">
          <Link href="/" className="boat-nav__brand" aria-label="SailTru home">
            <Image src="/images/sailtru-lockup.png" alt="SailTru" width={757} height={183} priority />
          </Link>
          <nav className="boat-nav__links" aria-label="Primary navigation">
            <a href="#how-it-works">{t.nav.how}</a>
            <a href="#example-report">{t.nav.example}</a>
            <Link href="/work">{t.nav.work}</Link>
            <Link href="/contact" className="boat-nav__cta">
              {t.nav.build}
            </Link>
          </nav>
        </header>

        <div className="boat-hero__grid">
          <div className="boat-hero__copy">
            <h1>{t.hero.h1}</h1>
            <p>{t.hero.support}</p>
            <ScanForm />
            <Link href="/contact" className="boat-link-secondary">
              {t.hero.build}
            </Link>
          </div>
          <div className="boat-hero__art">
            <SceneIllustration tone="hero" />
          </div>
        </div>
      </section>

      <section className="boat-proof" aria-label="Client proof">
        <p className="boat-proof__metric">
          <strong>{t.proof.metric}</strong>
          <span>{t.proof.client}</span>
        </p>
        <blockquote>{t.proof.quote}</blockquote>
        <Link href="/work">{t.proof.link}</Link>
      </section>

      <section id="how-it-works" className="boat-paper boat-obstacles">
        <div className="boat-section-head">
          <h2>{t.obstacles.title}</h2>
          <p>{t.obstacles.intro}</p>
        </div>
        <div className="boat-route" aria-hidden />
        {t.scenes.map((scene) => (
          <article className="boat-chapter" key={scene.tone}>
            <SceneIllustration tone={scene.tone} />
            <div className="boat-chapter__copy">
              <p className="boat-label">{scene.label}</p>
              <h3>{scene.title}</h3>
              <p>{scene.body}</p>
              {scene.example ? <p className="boat-chapter__sample">{scene.example}</p> : null}
              {scene.bridge ? <p className="boat-chapter__bridge">{scene.bridge}</p> : null}
            </div>
          </article>
        ))}
        <p className="boat-question">{t.obstacles.question}</p>
      </section>

      <section className="boat-paper boat-journey">
        <div className="boat-section-head">
          <h2>{t.journey.title}</h2>
          <p>{t.journey.intro}</p>
        </div>
        <div className="boat-steps">
          {t.journey.steps.map((step, index) => (
            <article className="boat-step" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="example-report" className="boat-paper boat-report">
        <div className="boat-report__art">
          <SceneIllustration tone="chart" />
        </div>
        <div className="boat-report__panel">
          <p className="boat-sample-badge">{t.example.badge}</p>
          <h2>{t.example.title}</h2>
          <p>{t.example.intro}</p>
          <div className="boat-finding-grid">
            <section>
              <h3>{t.example.observedTitle}</h3>
              <p>{t.example.observed}</p>
            </section>
            <section>
              <h3>{t.example.evidenceTitle}</h3>
              <p>{t.example.evidence}</p>
            </section>
            <section className="boat-finding-grid__accent">
              <h3>{t.example.recommendationTitle}</h3>
              <p>{t.example.recommendation}</p>
            </section>
            <section>
              <h3>{t.example.measurementTitle}</h3>
              <p>{t.example.measurement}</p>
            </section>
          </div>
          <a href="#example-report" className="boat-report__sample-link">
            {t.example.cta}
          </a>
        </div>
      </section>

      <section className="boat-paper boat-repeat-scan">
        <div>
          <h2>{t.offer.title}</h2>
          <p>{t.offer.body}</p>
        </div>
        <ScanForm variant="paper" />
      </section>

      <section className="boat-paper boat-offer">
        <article>
          <h3>{t.offer.limited}</h3>
          <ul>
            {t.offer.limitedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>{t.offer.full}</h3>
          <ul>
            {t.offer.fullItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t.offer.unknown}</p>
        </article>
      </section>

      <section className="boat-paper boat-beyond">
        <SceneIllustration tone="anchor" />
        <div>
          <h2>{t.beyond.title}</h2>
          <p>{t.beyond.body}</p>
          <article>
            <h3>{t.beyond.anchorTitle}</h3>
            <p>{t.beyond.anchorBody}</p>
          </article>
          <Link href="/contact" className="boat-solid-link">
            {t.beyond.action}
          </Link>
        </div>
      </section>

      <section className="boat-paper boat-close">
        <SceneIllustration tone="harbor" />
        <div>
          <h2>{t.faq.title}</h2>
          <p>{t.faq.body}</p>
          <ScanForm variant="paper" />
          <Link href="/contact" className="boat-link-secondary boat-link-secondary--dark">
            {t.hero.build}
          </Link>
        </div>
      </section>
    </main>
  );
}
