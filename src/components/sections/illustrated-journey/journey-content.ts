export type JourneyLocale = "en" | "he";

export type JourneySceneContent = {
  id: "discovery" | "reef" | "currents";
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  card?: { label: string; title: string; detail: string };
};

const content = {
  en: {
    nav: { journey: "The journey", report: "The report", work: "Work", build: "Build with SailTru" },
    hero: {
      title: "Track your visibility. Build your next move.",
      body: "SailTru tracks your SEO and GEO visibility, compares competitors, identifies opportunities, and helps you implement improvements. When you need it, we also build bespoke AI solutions and agent teams to take work off your desk.",
      label: "Your business website",
      placeholder: "yourcompany.com",
      submit: "Analyze my business",
      expectation: "See a limited report first. You will see the full report contents and price before deciding whether to purchase.",
      build: "Build with SailTru"
    },
    scenes: [
      {
        id: "discovery",
        eyebrow: "01 · Track & compare",
        title: "See your business through your customers' search.",
        accent: "your customers' search.",
        body: "Track SEO visibility in search engines and GEO visibility in AI answers. Compare relevant competitors to see where they appear, what they answer, and what your business is missing.",
        card: { label: "01 / VISIBILITY IN CONTEXT", title: "Your business alongside its competitors.", detail: "Search presence, AI mentions, and the content behind them help explain where the gaps are." }
      },
      {
        id: "reef",
        eyebrow: "02 · Prioritize & recommend",
        title: "Choose the next move that matters.",
        accent: "the next move",
        body: "Turn the gaps into priorities: what to improve, why it matters, and how to act. Then get help making the changes to your content, website, and enquiry journey.",
        card: { label: "02 / ILLUSTRATIVE IMPROVEMENT", title: "Answer the question buyers already ask.", detail: "In this example, competitors explain what affects the price of a service. Your site doesn't. Create a useful pricing guide, then track how people discover and use it." }
      },
      {
        id: "currents",
        eyebrow: "03 · Build, monitor & improve",
        title: "Build the solution. Keep learning.",
        accent: "Build the solution.",
        body: "Keep tracking SEO, GEO, competitors, and the impact of your changes. If your team needs more capacity, we can also build bespoke AI solutions and agent teams around its work.",
        card: { label: "03 / BESPOKE AI WHEN YOU NEED IT", title: "Less on your desk. More room to grow.", detail: "Research, follow-up, customer support, and operations—with access, boundaries, and human review suited to the work." }
      }
    ] satisfies JourneySceneContent[],
    report: {
      eyebrow: "Your next improvements",
      title: "A clear recommendation. A practical way forward.",
      body: "See how findings about your search visibility, AI visibility, and competitors become specific improvements. Start with the limited report, review the full report offer, and choose whether to implement with your team or with SailTru.",
      example: "Illustrative example",
      items: [
        ["Finding", "Buyers ask what affects the price of the service. Your website does not answer that question."],
        ["Evidence", "In this illustrative comparison, competitor pages explain pricing factors and what is included. Your service page does not."],
        ["Recommendation", "Create a useful pricing guide, link it from the service page, and give readers a clear way to discuss their needs."],
        ["Measurement", "Track the page's search visibility, relevant AI mentions or citations, and enquiries over time. Compare changes with competitors."]
      ],
      limitedTitle: "Limited preview",
      limitedBody: "A supported finding, its evidence, a recommendation when justified, and the limits of what the public website can show.",
      fullTitle: "Full report",
      fullBody: "The additional findings, evidence and recommendations listed in the offer. You see the contents and price before purchasing.",
      implementation: "Need a bespoke AI solution or agent team? Talk to us directly—no report purchase is required. Implementation, AI development, and ongoing tracking are scoped around your business."
    },
    final: {
      eyebrow: "Let's build from here",
      title: "What's holding your business back?",
      body: "Start with your website to explore visibility and competitor gaps. Or tell us which tasks are filling your team's day, and let's scope the AI solution that could help.",
      harbor: "Track. Compare. Prioritize. Implement. Measure. Improve."
    },
    form: {
      invalid: "Enter a public website address, such as example.com.",
      accepted: "This preview is ready for the real analysis service. No analysis has been simulated.",
      integration: "Analysis API integration pending"
    }
  },
  he: {
    nav: { journey: "המסע", report: "הדוח", work: "עבודות", build: "בניית פתרון עם SailTru" },
    hero: {
      title: "לראות איפה העסק עומד. לבנות את הצעד הבא.",
      body: "SailTru עוקבת אחרי נראות ה-SEO וה-GEO של העסק, משווה למתחרים, מזהה הזדמנויות ועוזרת ליישם שיפורים. כשצריך, בונים גם פתרונות AI וצוותי סוכנים מותאמים שמורידים עבודה מהשולחן שלך.",
      label: "אתר העסק שלך",
      placeholder: "yourcompany.com",
      submit: "לניתוח העסק שלי",
      expectation: "קודם רואים דוח מצומצם. את תוכן הדוח המלא והמחיר רואים לפני שמחליטים אם לרכוש.",
      build: "בניית פתרון עם SailTru"
    },
    scenes: [
      {
        id: "discovery",
        eyebrow: "01 · מעקב והשוואה",
        title: "רואים את העסק דרך החיפוש של הלקוחות.",
        accent: "החיפוש של הלקוחות.",
        body: "עוקבים אחרי נראות בחיפוש באמצעות SEO ואחרי נראות בתשובות AI באמצעות GEO. משווים למתחרים הרלוונטיים כדי להבין היכן הם מופיעים, על מה הם עונים ומה חסר אצלך."
      },
      {
        id: "reef",
        eyebrow: "02 · סדרי עדיפויות והמלצות",
        title: "בוחרים את הצעד החשוב הבא.",
        accent: "הצעד החשוב הבא.",
        body: "הופכים את הפערים לסדרי עדיפויות: מה כדאי לשפר, למה זה חשוב ואיך להתקדם. ואז עוזרים ליישם את השינויים בתוכן, באתר ובתהליך הפנייה."
      },
      {
        id: "currents",
        eyebrow: "03 · בנייה, מדידה ושיפור",
        title: "בונים פתרון. ממשיכים ללמוד.",
        accent: "בונים פתרון.",
        body: "ממשיכים לעקוב אחרי SEO, GEO, המתחרים וההשפעה של השינויים. אם הצוות צריך לפנות זמן, בונים גם פתרונות AI וצוותי סוכנים מותאמים למחקר, מעקב, שירות ותפעול."
      }
    ] satisfies JourneySceneContent[],
    report: {
      eyebrow: "השיפורים הבאים שלך",
      title: "המלצה ברורה. דרך מעשית קדימה.",
      body: "רואים איך ממצאים על הנראות בחיפוש, בתשובות AI ומול המתחרים הופכים לשיפורים מוגדרים. מתחילים בדוח המצומצם, בוחנים את הצעת הדוח המלא ובוחרים אם ליישם עם הצוות שלך או עם SailTru.",
      example: "דוגמה להמחשה",
      items: [
        ["ממצא", "לקוחות שואלים מה משפיע על מחיר השירות. האתר שלך עדיין לא עונה על השאלה."],
        ["ראיות", "בהשוואה להמחשה, עמודי המתחרים מסבירים את גורמי המחיר ומה כלול בשירות. עמוד השירות שלך אינו מסביר זאת."],
        ["המלצה", "ליצור מדריך מחירים שימושי, לקשר אליו מעמוד השירות ולתת לקוראים דרך ברורה לשוחח על הצורך שלהם."],
        ["מדידה", "לעקוב לאורך זמן אחרי נראות העמוד בחיפוש, אזכורים או ציטוטים רלוונטיים בתשובות AI ופניות. להשוות את השינויים גם למתחרים."]
      ],
      limitedTitle: "תצוגה מצומצמת",
      limitedBody: "ממצא נתמך, הראיות שלו, המלצה כשיש לה בסיס, והמגבלות של מה שניתן להבין מאתר ציבורי.",
      fullTitle: "הדוח המלא",
      fullBody: "הממצאים, הראיות וההמלצות הנוספים שמופיעים בהצעה. רואים את התוכן והמחיר לפני הרכישה.",
      implementation: "צריכים פתרון AI מותאם או צוות סוכנים? אפשר לפנות ישירות, בלי לרכוש דוח. היישום, פיתוח ה-AI והמעקב השוטף מוגדרים סביב הצרכים של העסק."
    },
    final: {
      eyebrow: "מכאן מתחילים לבנות",
      title: "מה מעכב את העסק שלך?",
      body: "מתחילים מהאתר כדי לבחון נראות ופערים מול המתחרים. או מספרים לנו אילו משימות ממלאות את היום של הצוות, ונאפיין יחד פתרון AI שיכול לעזור.",
      harbor: "מעקב. השוואה. תעדוף. יישום. מדידה. שיפור."
    },
    form: {
      invalid: "יש להזין כתובת אתר ציבורית, למשל example.com.",
      accepted: "התצוגה מוכנה לחיבור לשירות הניתוח האמיתי. לא הוצגה כאן אנליזה מדומה.",
      integration: "ממתין לחיבור API לניתוח"
    }
  }
} as const;

export function getJourneyContent(locale: string) {
  return content[locale === "he" ? "he" : "en"];
}

