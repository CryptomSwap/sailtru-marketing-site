// One scroll clock for the camera, business journey, and explanation.
export const STORY_STARTS = [0, .13, .31, .47, .63, .82] as const;
export const storyEase = (p: number, a: number, b: number) => {
  const t = Math.max(0, Math.min(1, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
export function narrativeState(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  let chapter = 0;
  STORY_STARTS.forEach((start, i) => { if (p >= start) chapter = i; });
  const local = (p - STORY_STARTS[chapter]) / ((STORY_STARTS[chapter + 1] ?? 1) - STORY_STARTS[chapter]);
  return { chapter, local, detail: local >= .48, side: chapter === 2 || chapter === 4 ? "right" : "left" };
}

export function getHarborNarrative(he: boolean) {
  return he ? [
    { place: "מגדל הנראות", label: "01 / מעקב SEO ו-GEO", title: "שימצאו אותך בחיפוש.", accent: "וגם בתשובות AI.", lines: ["עוקבים אחרי הנראות של העסק במנועי חיפוש ובתשובות AI — כדי להבין איפה מופיעים ואיפה חסרים.", "SEO לחיפוש. GEO לנראות בתשובות AI. תמונה אחת של הדרך שבה לקוחות מוצאים אותך."], artifact: "הנראות של העסק שלך", note: "המחשת המעקב · לא נתונים חיים" },
    { place: "מפרץ המתחרים", label: "02 / מבינים את התחרות", title: "מי עוד נמצא", accent: "בדרך ללקוח שלך?", lines: ["משווים את הנראות, התוכן והאזכורים של העסק למתחרים הרלוונטיים.", "מגלים על אילו שאלות הם עונים, היכן הם מופיעים ומה עדיין חסר אצלך."], artifact: "העסק שלך מול המתחרים", note: "השוואה להמחשה · ללא נתוני דירוג אמיתיים" },
    { place: "נקודת ההזדמנות", label: "03 / מזהים מה לשפר", title: "מהפערים בשטח", accent: "לצעד הבא שלך.", lines: ["הופכים ממצאים לסדרי עדיפויות: מה לשפר, למה זה חשוב ואיך להתקדם.", "למשל: מתחרים עונים על שאלת מחיר חשובה. אצלך התשובה חסרה. זו הזדמנות לתוכן שימושי."], artifact: "פער אחד. פעולה ברורה.", note: "דוגמה: תוכן שעונה על שאלת קנייה" },
    { place: "בית היישום", label: "04 / עוזרים לבצע", title: "לא משאירים אותך", accent: "עם רשימת משימות.", lines: ["עוזרים ליישם שיפורים בתוכן, באתר ובתהליך הפנייה — מההמלצה ועד לשינוי בפועל.", "בונים את התשובה שחסרה, משפרים את העמוד ומחברים את השינוי למעקב."], artifact: "מהמלצה לעמוד שימושי", note: "דוגמת יישום · אותו פער, עכשיו עם תשובה" },
    { place: "צוות ה-AI שלך", label: "05 / פתרונות AI מותאמים", title: "פחות עבודה על השולחן.", accent: "יותר מקום לצמוח.", lines: ["כשצריך, בונים פתרונות AI וצוותי סוכנים מותאמים לעסק — למחקר, מעקב, שירות ותפעול.", "צוות ה-AI שלך מותאם לתהליכי העבודה בעסק, עם גבולות ובקרה אנושית שמתאימים למשימה."], artifact: "העבודה עוברת לצוות שלך", note: "יכולת נוספת, לפי הצורך · לא שלב חובה" },
    { place: "מגדל המעקב", label: "06 / ממשיכים למדוד", title: "רואים מה משתנה.", accent: "יודעים מה לעשות הלאה.", lines: ["ממשיכים לעקוב אחרי SEO, GEO והמתחרים, ובוחנים את ההשפעה על העסק.", "נראות, פניות רלוונטיות וזמן שהתפנה — כדי לבחור את השיפור הבא על בסיס מה שקרה בפועל."], artifact: "מחזור שיפור מתמשך", note: "מעקב → השוואה → שיפור → מדידה" },
  ] : [
    { place: "Visibility Lighthouse", label: "01 / TRACK SEO & GEO", title: "Get found in search.", accent: "And in AI answers.", lines: ["We track your business across search engines and AI answers—so you can see where you appear and where you're missing.", "SEO for search. GEO for visibility in AI-generated answers. One view of how customers discover your business."], artifact: "YOUR BUSINESS VISIBILITY", note: "Tracking concept · illustrative, not live data" },
    { place: "Competitor Bay", label: "02 / COMPARE THE MARKET", title: "Who else is reaching", accent: "your next customer?", lines: ["Compare your visibility, content, and mentions with the competitors that matter to your business.", "See which questions they answer, where they appear, and what your business is missing."], artifact: "YOUR BUSINESS, IN CONTEXT", note: "Illustrative comparison · not measured rankings" },
    { place: "Opportunity Point", label: "03 / FIND THE OPPORTUNITY", title: "Turn the gaps", accent: "into your next move.", lines: ["Get clear priorities: what to improve, why it matters, and how to act on it.", "For example: competitors answer a buying question about pricing. Your site doesn't. That's a useful place to start."], artifact: "ONE GAP. A CLEAR ACTION.", note: "Example: answer a question buyers already ask" },
    { place: "Action House", label: "04 / MAKE IT HAPPEN", title: "More than a list", accent: "of things to fix.", lines: ["We help implement the improvements across your content, website, and enquiry journey.", "We create the missing answer, improve the page, and connect the change to your tracking."], artifact: "FROM RECOMMENDATION TO REAL PAGE", note: "Illustrative implementation · the gap becomes an answer" },
    { place: "Your AI Crew", label: "05 / BESPOKE AI & AGENT TEAMS", title: "Less on your desk.", accent: "More room to grow.", lines: ["When you need it, we build bespoke AI solutions and agent teams for research, follow-up, support, and operations.", "Your bespoke AI team fits your workflow—with the access, boundaries, and human review the work requires."], artifact: "WORK FINDS ITS TEAM", note: "An additional capability when you need it" },
    { place: "The Tracking Lighthouse", label: "06 / KEEP IMPROVING", title: "See what changes.", accent: "Know what's next.", lines: ["Keep tracking SEO, GEO, and competitors—and review what the changes mean for your business.", "Visibility. Relevant enquiries. Time given back to your team. Real signals to guide the next improvement."], artifact: "THE CONTINUOUS IMPROVEMENT LOOP", note: "Track → Compare → Improve → Measure" },
  ];
}


