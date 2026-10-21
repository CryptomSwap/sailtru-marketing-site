"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useId, useRef, useState } from "react";
import Lenis from "lenis";
import { submitHomepageScanStub } from "@/lib/homepage-scan-stub";
import "./boat-voyage-journey.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const content = {
  en: {
    scenes: [
      {
        id: "fog",
        kicker: "Can customers find you?",
        title: "If customers don't find your business, they can't choose it.",
        body:
          "People look through search, AI answers, recommendations, and other channels. If you are not visible where your customers look, they may discover another option first."
      },
      {
        id: "reef",
        kicker: "Can visitors take the next step?",
        title: "They reach your website. Can they see what to do next?",
        body:
          "Visitors need to understand what you offer and how to enquire. In the Example Studio illustration, the service page has an enquiry link only in its footer. We can observe that layout; measuring its effect requires more evidence."
      },
      {
        id: "currents",
        kicker: "Why should they choose you?",
        title: "Your customers are comparing you with other businesses.",
        body:
          "They may see different prices, promises, service details, and reasons to trust each company. Comparing public differences can show where your own offer needs to be clearer."
      }
    ],
    chart: {
      title: "Know what to improve first.",
      body:
        "The chart turns observations into a report: what was found, the evidence behind it, a supported recommendation, and how to check whether the change helped.",
      badge: "Illustrative example",
      findingTitle: "What we found",
      finding: "The enquiry link appears only in the footer.",
      evidenceTitle: "Evidence",
      evidence: "A service-page excerpt with no nearby enquiry action.",
      recommendationTitle: "Recommendation",
      recommendation: "Add an enquiry action beside the service details and explain the real next step.",
      measurementTitle: "Measurement",
      measurement: "Compare enquiry behavior and enquiry quality before and after the change with suitable analytics."
    },
    scan: {
      title: "Enter your website after the chart.",
      body:
        "Review a limited personalized preview, see the full report contents and price, then decide whether to purchase. The backend is not connected in this slice.",
      label: "Your business website",
      placeholder: "yourcompany.com",
      submit: "Analyze my business",
      expectation:
        "Enter your website to see a limited report based on its analysis. You can then choose whether to buy the full report."
    },
    steps: [
      "Enter website",
      "Review limited personalized preview",
      "See full contents and price",
      "Decide whether to purchase"
    ],
    beyond: {
      title: "Beyond the report: implementation is a separate route.",
      body:
        "You can use the recommendations with your own team. If you want SailTru to carry out the work, we agree what will be built, what access is needed, how it will be measured, and the project price before starting.",
      anchorTitle: "Manual workflows and automation",
      anchor:
        "Workflow automation needs process discovery. A public website scan does not measure internal handoffs, tools, or operational performance.",
      cta: "Build with SailTru"
    }
  },
  he: {
    scenes: [
      {
        id: "fog",
        kicker: "האם לקוחות יכולים למצוא אותך?",
        title: "אם לקוחות לא מוצאים את העסק שלך, הם לא יכולים לבחור בו.",
        body:
          "אנשים מחפשים דרך חיפוש, תשובות AI, המלצות וערוצים נוספים. אם העסק לא מופיע איפה שהלקוחות מחפשים, הם עשויים לגלות אפשרות אחרת קודם."
      },
      {
        id: "reef",
        kicker: "האם ברור מה הצעד הבא?",
        title: "הם הגיעו לאתר. האם ברור להם מה הצעד הבא?",
        body:
          "מבקרים צריכים להבין מה העסק מציע ואיך פונים. בדוגמת Example Studio, קישור הפנייה מופיע רק בפוטר. אפשר לראות את המבנה הזה; כדי למדוד את ההשפעה צריך עוד ראיות."
      },
      {
        id: "currents",
        kicker: "למה שיבחרו דווקא בך?",
        title: "הלקוחות שלך משווים אותך לעסקים אחרים.",
        body:
          "הם עשויים לראות מחירים, הבטחות, פרטי שירות וסיבות אמון שונות. השוואת הבדלים ציבוריים יכולה להראות איפה ההצעה שלך צריכה להיות ברורה יותר."
      }
    ],
    chart: {
      title: "לדעת מה לשפר קודם.",
      body:
        "המפה הופכת תצפיות לדוח: מה נמצא, הראיות שמאחוריו, המלצה נתמכת, ואיך לבדוק אם השינוי עזר.",
      badge: "דוגמה להמחשה",
      findingTitle: "מה מצאנו",
      finding: "קישור הפנייה מופיע רק בפוטר.",
      evidenceTitle: "על מה זה מבוסס",
      evidence: "מקטע מעמוד שירות ללא פעולת פנייה ליד פרטי השירות.",
      recommendationTitle: "הצעד המומלץ",
      recommendation: "להוסיף פעולת פנייה ליד פרטי השירות ולהסביר את הצעד האמיתי הבא.",
      measurementTitle: "איך בודקים",
      measurement: "משווים התנהגות ואיכות פניות לפני ואחרי השינוי עם אנליטיקה מתאימה."
    },
    scan: {
      title: "מזינים את האתר אחרי המפה.",
      body:
        "בודקים תצוגה מקדימה אישית ומוגבלת, רואים את תוכן הדוח המלא והמחיר, ואז מחליטים אם לרכוש. הבקאנד עדיין לא מחובר בפרוסה הזו.",
      label: "אתר העסק שלך",
      placeholder: "yourcompany.com",
      submit: "לניתוח העסק שלי",
      expectation:
        "מזינים את אתר העסק ומקבלים דוח מצומצם המבוסס על הניתוח שלו. לאחר מכן אפשר להחליט אם לרכוש את הדוח המלא."
    },
    steps: ["מזינים אתר", "בודקים תצוגה מקדימה", "רואים תוכן ומחיר", "מחליטים אם לרכוש"],
    beyond: {
      title: "מעבר לדוח: יישום הוא מסלול נפרד.",
      body:
        "אפשר להשתמש בהמלצות עם הצוות שלך. אם רוצים ש-SailTru תבצע את העבודה, מסכימים מראש מה בונים, איזו גישה נדרשת, איך מודדים ומה מחיר הפרויקט.",
      anchorTitle: "תהליכים ידניים ואוטומציה",
      anchor:
        "אוטומציה דורשת גילוי תהליך. סריקת אתר ציבורי לא מודדת תהליכים פנימיים, כלים או ביצועים תפעוליים.",
      cta: "בניית פתרון עם SailTru"
    }
  }
};

function getContent(locale: string) {
  return locale === "he" ? content.he : content.en;
}

function VoyageScanForm() {
  const locale = useLocale();
  const t = getContent(locale).scan;
  const inputId = useId();
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(t.expectation);
  const [kind, setKind] = useState<"idle" | "error" | "stub">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = submitHomepageScanStub(url);

    if (!result.ok) {
      setKind("error");
      setMessage(result.message);
      return;
    }

    setKind("stub");
    setMessage(`${result.host}: ${result.message}`);
  }

  return (
    <form className="voyage-scan" onSubmit={onSubmit} noValidate>
      <label htmlFor={inputId}>{t.label}</label>
      <div className="voyage-scan__control">
        <input
          id={inputId}
          type="text"
          inputMode="url"
          autoComplete="url"
          dir="ltr"
          value={url}
          placeholder={t.placeholder}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type="submit">{t.submit}</button>
      </div>
      <p className={`voyage-scan__status voyage-scan__status--${kind}`} aria-live="polite">
        {message}
      </p>
    </form>
  );
}

function WatercolorWorld() {
  return (
    <svg className="voyage-world" viewBox="0 0 1000 3250" preserveAspectRatio="xMidYMin slice" aria-hidden>
      <defs>
        <filter id="voyage-paper">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="9" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.18" />
          </feComponentTransfer>
        </filter>
        <filter id="voyage-wash" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="4" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="18" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        <linearGradient id="sea-blue" x1="0" x2="1">
          <stop offset="0" stopColor="#d9eef8" />
          <stop offset="0.55" stopColor="#8ebedf" />
          <stop offset="1" stopColor="#2f6fbc" />
        </linearGradient>
        <linearGradient id="ink-blue" x1="0" x2="1">
          <stop offset="0" stopColor="#1745df" />
          <stop offset="1" stopColor="#4f82ff" />
        </linearGradient>
      </defs>

      <rect width="1000" height="3250" fill="#f3f1eb" />
      <rect width="1000" height="3250" filter="url(#voyage-paper)" opacity="0.55" />

      <g className="voyage-layer voyage-layer--far" filter="url(#voyage-wash)" opacity="0.78">
        <path d="M40 230C190 130 335 155 470 90C600 28 785 40 950 120V450H40Z" fill="#d8e8f0" />
        <path d="M670 180C750 90 840 75 985 145V365C870 325 755 315 640 365Z" fill="#b8d7e9" />
        <path d="M0 2620C160 2540 300 2575 420 2490C560 2392 720 2400 1000 2500V3250H0Z" fill="#d8e8f0" />
      </g>

      <g className="voyage-layer voyage-layer--water" opacity="0.92">
        <path
          d="M-40 500C160 390 280 460 405 382C510 315 655 310 1040 360V950C855 880 720 900 600 980C455 1076 300 1010 145 1090C75 1126 15 1160 -40 1180Z"
          fill="url(#sea-blue)"
          opacity="0.4"
          filter="url(#voyage-wash)"
        />
        <path
          d="M-20 1320C185 1190 332 1275 492 1190C625 1120 820 1130 1030 1240V1880C840 1775 665 1788 510 1900C350 2014 165 1938 -20 2060Z"
          fill="url(#sea-blue)"
          opacity="0.44"
          filter="url(#voyage-wash)"
        />
        <path
          d="M-30 2460C135 2360 320 2395 520 2290C690 2202 835 2230 1030 2350V3160C840 3040 690 3060 530 3145C335 3248 130 3160 -30 3215Z"
          fill="url(#sea-blue)"
          opacity="0.44"
          filter="url(#voyage-wash)"
        />
      </g>

      <g className="voyage-layer voyage-layer--land" fill="#314054" opacity="0.88">
        <path d="M100 815l58-102 38 67 42-116 78 151H100Z" />
        <path d="M178 838l70-126 45 78 48-138 88 186H178Z" fill="#52657c" />
        <path d="M530 1145l52-90 34 58 36-105 70 137H530Z" />
        <path d="M596 1168l72-120 42 72 46-132 92 180H596Z" fill="#596a7b" />
        <path d="M80 2700c90-75 170-120 255-92 58 19 90 78 150 92H80Z" fill="#d0c4ab" opacity="0.75" />
      </g>

      <g className="voyage-layer voyage-layer--fog">
        <path d="M40 520C220 455 408 480 570 530C390 590 185 615 40 572Z" fill="#fff" opacity="0.62" filter="url(#voyage-wash)" />
        <path d="M120 610C315 555 495 578 670 635C460 695 260 705 120 660Z" fill="#fff" opacity="0.5" filter="url(#voyage-wash)" />
        <g className="voyage-lighthouse">
          <path d="M735 455h28l16 135h-60Z" fill="#f7f4ea" />
          <path d="M724 590h70v22h-70Z" fill="#c6a77c" />
          <path d="M728 438h42v25h-42Z" fill="#14224a" />
          <path d="M770 447c62 8 112 32 150 72" fill="none" stroke="#7ea6d8" strokeWidth="4" opacity="0.42" />
        </g>
      </g>

      <g className="voyage-layer voyage-layer--reef-town">
        <path d="M695 1108h145v118H695Z" fill="#d8c4a1" />
        <path d="M718 1048h94v60h-94Z" fill="#f4ead6" />
        <path d="M682 1108l86-78 90 78Z" fill="#b3885b" />
        <path d="M742 1168a28 28 0 0 1 56 0v58h-56Z" fill="#16306e" opacity="0.72" />
        <path d="M685 1228h210" stroke="#795f43" strokeWidth="12" strokeLinecap="round" />
        <path d="M718 1228v70M790 1228v70M862 1228v70" stroke="#795f43" strokeWidth="8" strokeLinecap="round" />
      </g>

      <g className="voyage-layer voyage-layer--currents" fill="none" stroke="#2f6fbc" strokeLinecap="round" opacity="0.56">
        <path d="M125 1530C240 1490 320 1525 410 1498" strokeWidth="3" strokeDasharray="18 22" />
        <path d="M65 1600C225 1538 350 1625 520 1560" strokeWidth="4" strokeDasharray="22 20" />
        <path d="M615 1540C740 1492 845 1505 980 1575" strokeWidth="3" strokeDasharray="18 18" />
      </g>

      <g className="voyage-layer voyage-layer--competitors" opacity="0.78">
        <g transform="translate(720 1675) scale(.75)">
          <path d="M15 62c50 20 95 18 138-3-16 34-57 52-102 48-22-2-34-17-36-45Z" fill="#6d7889" />
          <path d="M55 55c28-44 42-76 42-120l42 110Z" fill="#f4f2ea" />
        </g>
        <g transform="translate(820 1605) scale(.55)">
          <path d="M15 62c50 20 95 18 138-3-16 34-57 52-102 48-22-2-34-17-36-45Z" fill="#8a96a8" />
          <path d="M55 55c28-44 42-76 42-120l42 110Z" fill="#f4f2ea" />
        </g>
      </g>

      <g className="voyage-layer voyage-layer--chart" transform="translate(180 1995)">
        <path d="M0 150c205-85 365-80 560 0l-48 410c-180-88-330-90-520 0Z" fill="#efe3cc" stroke="#d0b98d" strokeWidth="6" />
        <path d="M560 150c115-45 210-38 300 0l-48 410c-90-42-185-44-300 0Z" fill="#eadbc0" stroke="#d0b98d" strokeWidth="6" />
        <path d="M80 255c130-55 250-42 382 20M78 350c140-40 255-32 390 26M596 250h178M594 330h150M594 410h190" stroke="#b8a785" strokeWidth="5" opacity="0.5" />
        <path d="M138 470C260 360 355 370 468 250" fill="none" stroke="#275cff" strokeWidth="5" strokeDasharray="12 14" />
        <circle cx="138" cy="470" r="13" fill="#fff" stroke="#275cff" strokeWidth="5" />
        <circle cx="468" cy="250" r="13" fill="#fff" stroke="#275cff" strokeWidth="5" />
      </g>

      <g className="voyage-layer voyage-layer--harbor">
        <path d="M560 2910h370v120H560Z" fill="#e8d8bb" opacity="0.86" />
        <path d="M600 2860h92v170h-92Z" fill="#f6ecd9" />
        <path d="M708 2888h86v142h-86Z" fill="#e5d0ab" />
        <path d="M812 2848h70v182h-70Z" fill="#f7efe1" />
        <path d="M574 3035h380" stroke="#8c7557" strokeWidth="12" strokeLinecap="round" />
        <path d="M140 3005C300 2940 430 2985 555 3035" stroke="#2f6fbc" strokeWidth="4" fill="none" opacity="0.35" />
      </g>

      <path
        className="voyage-route-path"
        d="M625 120C545 275 700 380 590 540C485 694 320 650 280 825C235 1020 562 1005 505 1210C454 1390 215 1365 230 1570C246 1788 570 1760 520 1980C480 2158 355 2190 418 2375C490 2585 210 2705 340 2915C430 3060 595 3000 705 3090"
        fill="none"
        stroke="url(#ink-blue)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 22"
      />

      <g className="voyage-boat" transform="translate(625 120) scale(.46)">
        <path d="M-54 44c42 20 94 23 148-4-17 44-73 67-128 59-24-4-34-22-20-55Z" fill="#0a1326" />
        <path d="M-40 34c38 17 78 17 119 0-14 27-48 43-88 41-22-1-34-14-31-41Z" fill="#245cff" />
        <path d="M-33 26c40-49 58-99 56-154l52 143Z" fill="#fffaf0" stroke="#d2c0a2" strokeWidth="2" />
        <path d="M36-138c58 43 92 103 98 174L74 65Z" fill="#f7efe1" stroke="#d2c0a2" strokeWidth="2" />
        <path d="M23-128c10 62 9 114-10 160" stroke="#0a1326" strokeWidth="7" strokeLinecap="round" />
        <path d="M-75 78c55 18 120 18 190-2" fill="none" stroke="#6bb9f0" strokeWidth="5" opacity=".55" />
      </g>
    </svg>
  );
}

export function BoatVoyageJourney() {
  const locale = useLocale();
  const t = getContent(locale);
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        root.classList.add("voyage-reduced");
        return;
      }

      root.classList.add("voyage-motion");
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const route = root.querySelector<SVGPathElement>(".voyage-route-path");
      const boat = root.querySelector<SVGGElement>(".voyage-boat");
      const layers = gsap.utils.toArray<HTMLElement | SVGElement>(".voyage-layer", root);
      const reveals = gsap.utils.toArray<HTMLElement>(".voyage-copy, .voyage-chart-copy, .voyage-scan-block, .voyage-beyond-copy", root);

      if (route && boat) {
        const length = route.getTotalLength();
        gsap.set(route, { strokeDasharray: `1 22`, strokeDashoffset: length * 0.08 });

        ScrollTrigger.create({
          trigger: root,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 0.8,
          onUpdate: (self) => {
            const distance = length * self.progress;
            const point = route.getPointAtLength(distance);
            const nextPoint = route.getPointAtLength(Math.min(length, distance + 6));
            const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
            gsap.set(boat, { x: point.x, y: point.y, scale: 0.46, rotation: angle + 90, transformOrigin: "50% 50%" });
          }
        });
      }

      layers.forEach((layer, index) => {
        gsap.to(layer, {
          y: index % 2 === 0 ? -70 : -38,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        });
      });

      gsap.fromTo(
        ".voyage-fog-soft",
        { opacity: 0.82, scale: 1.08 },
        {
          opacity: 0.22,
          scale: 1.24,
          ease: "none",
          scrollTrigger: { trigger: ".voyage-block--fog", start: "top 70%", end: "bottom 35%", scrub: true }
        }
      );

      gsap.to(".voyage-layer--competitors", {
        x: 38,
        ease: "none",
        scrollTrigger: { trigger: ".voyage-block--currents", start: "top 75%", end: "bottom 30%", scrub: true }
      });

      gsap.fromTo(
        ".voyage-layer--chart",
        { rotate: -4, y: 80, opacity: 0.7 },
        {
          rotate: 0,
          y: 0,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: { trigger: ".voyage-chart", start: "top 75%", end: "center center", scrub: 0.8 }
        }
      );

      reveals.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 36, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      ScrollTrigger.refresh();

      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="voyage" aria-label="SailTru boat journey">
      <WatercolorWorld />
      <div className="voyage-fog-soft" aria-hidden />

      <div className="voyage-content">
        {t.scenes.map((scene) => (
          <article key={scene.id} className={`voyage-block voyage-block--${scene.id}`}>
            <div className="voyage-copy">
              <p>{scene.kicker}</p>
              <h2>{scene.title}</h2>
              <span>{scene.body}</span>
            </div>
          </article>
        ))}

        <article className="voyage-chart">
          <div className="voyage-chart-copy">
            <h2>{t.chart.title}</h2>
            <p>{t.chart.body}</p>
            <div className="voyage-finding">
              <strong>{t.chart.badge}</strong>
              <dl>
                <div>
                  <dt>{t.chart.findingTitle}</dt>
                  <dd>{t.chart.finding}</dd>
                </div>
                <div>
                  <dt>{t.chart.evidenceTitle}</dt>
                  <dd>{t.chart.evidence}</dd>
                </div>
                <div>
                  <dt>{t.chart.recommendationTitle}</dt>
                  <dd>{t.chart.recommendation}</dd>
                </div>
                <div>
                  <dt>{t.chart.measurementTitle}</dt>
                  <dd>{t.chart.measurement}</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>

        <article className="voyage-scan-block">
          <div>
            <h2>{t.scan.title}</h2>
            <p>{t.scan.body}</p>
            <ol className="voyage-steps">
              {t.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <VoyageScanForm />
        </article>

        <article className="voyage-beyond">
          <div className="voyage-beyond-copy">
            <h2>{t.beyond.title}</h2>
            <p>{t.beyond.body}</p>
            <h3>{t.beyond.anchorTitle}</h3>
            <p>{t.beyond.anchor}</p>
            <Link href="/contact">{t.beyond.cta}</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
