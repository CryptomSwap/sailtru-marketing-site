import Image from "next/image";
import { Link } from "@/i18n/navigation";

const channels = [
  { name: "ChatGPT", image: "openai.svg" },
  { name: "Claude", image: "claude-color.svg" },
  { name: "Google", image: "google-color.svg" },
  { name: "Perplexity", image: "perplexity-color.svg" },
];
function Channel({ name = "ChatGPT" }: { name?: string }) {
  const channel = channels.find(item => item.name === name)!;
  return <span className="client-channel" dir="ltr"><Image src={`/images/brands/${channel.image}`} width={18} height={18} alt="" /><span>{name}</span></span>;
}
function Evidence({ chapter, he }: { chapter: number; he: boolean }) {
  if (chapter === 0) return <div className="client-conversation">
    <div className="client-conversation__from"><Channel /><span>{he ? "השאלה של הלקוח" : "A BUYER ASKS"}</span></div>
    <blockquote>{he ? "איזה ספק תשלומים הכי מתאים לעסק שלי?" : "Which payment provider is the best?"}</blockquote>
    <p className="client-conversation__reply" data-reveal="0.3">{he ? "זה תלוי בעמלות, באינטגרציות ובשווקים שבהם העסק פועל." : "It depends on your fees, integrations and the markets you serve."}</p>
    <div className="client-metaphor"><span aria-hidden="true">↗</span>{he ? "הסירה היא הלקוח. הסמל הוא ערוץ החיפוש שלו." : "The boat is the buyer. The symbol is their discovery channel."}</div>
  </div>;
  if (chapter === 1) return <div className="client-shortlist">
    <div className="client-conversation__from"><Channel /><span>{he ? "אפשרויות להשוואה" : "OPTIONS TO COMPARE"}</span></div>
    <div className="client-provider" data-reveal="0.05"><span className="client-provider__monogram">A</span><div><b>{he ? "ספק א׳" : "Provider A"}</b><small>{he ? "מידע על עמלות ואינטגרציות" : "Fees and integrations explained"}</small></div><span aria-hidden="true">↗</span></div>
    <div className="client-provider" data-reveal="0.2"><span className="client-provider__monogram">B</span><div><b>{he ? "ספק ב׳" : "Provider B"}</b><small>{he ? "מידע על שווקים ויכולות" : "Markets and capabilities covered"}</small></div><span aria-hidden="true">↗</span></div>
    <p className="client-missing" data-reveal="0.4"><i aria-hidden="true" />{he ? "העסק שלך לא מופיע בתשובה הזו." : "Your business is missing from this answer."}</p>
  </div>;
  if (chapter === 2) return <div className="client-evidence">
    <div className="client-channels" aria-label={he ? "ערוצי החיפוש וה-AI" : "Search and AI channels"}>{channels.map(channel => <Channel name={channel.name} key={channel.name} />)}</div>
    <div className="client-evidence__row"><span>{he ? "המתחרה" : "Competitor"}</span><b>{he ? "מסביר עמלות ואינטגרציות" : "Explains fees & integrations"}</b></div>
    <div className="client-evidence__row client-evidence__row--you" data-reveal="0.18"><span>{he ? "העסק שלך" : "Your business"}</span><b>{he ? "השאלות האלה נשארות פתוחות" : "Leaves those questions open"}</b></div>
    <div className="client-next-move" data-reveal="0.4"><span aria-hidden="true">↗</span><div><small>{he ? "הזדמנות לשיפור" : "AN OPPORTUNITY TO IMPROVE"}</small><b>{he ? "לתת תשובה שעוזרת לבחור." : "Give buyers an answer they can use."}</b></div></div>
  </div>;
  if (chapter === 3) return <div className="story-page client-page">
    <div className="story-browser"><i /><i /><i /><span dir="ltr">your-business.example / compare</span></div>
    <div className="story-page__content"><small>{he ? "העסק שלך · שיפור בפועל" : "YOUR BUSINESS · AN IMPLEMENTED IMPROVEMENT"}</small><h4>{he ? "עמלות ואינטגרציות. תמונה ברורה." : "Fees & integrations. Clearly explained."}</h4>
      <div className="story-answer-lines">{(he ? ["מה כלול ואיך מחושבות העמלות", "אילו מערכות ושווקים נתמכים", "הצעד הבא שמתאים ללקוח"] : ["What’s included and how fees work", "Supported systems and markets", "A clear, relevant next step"]).map((text, i) => <div data-reveal={i * .14} key={text}><span aria-hidden="true">✓</span>{text}</div>)}</div>
      <div className="story-page__action" data-reveal="0.5"><span>{he ? "בדקו התאמה לעסק שלכם" : "Find the right fit for your business"}<i aria-hidden="true">↗</i></span></div>
    </div>
  </div>;
  if (chapter === 4) return <div className="client-return">
    <div className="client-conversation__from"><Channel /><span>{he ? "חוזרים לאותה שאלה" : "BACK TO THE SAME QUESTION"}</span></div>
    <p className="client-return__answer">{he ? "עוד אפשרות שכדאי לבדוק:" : "Another option worth exploring:"}<b>{he ? "העסק שלך." : "Your business."}</b></p>
    <div className="client-steps" aria-label={he ? "המסע של הלקוח" : "The buyer’s journey"}>{(he ? ["מגלים", "משווים", "מגיעים"] : ["Discover", "Compare", "Visit"]).map((step, i) => <div key={step} data-reveal={i * .2}><span>{String(i + 1).padStart(2, "0")}</span><b>{step}</b>{i < 2 && <i aria-hidden="true">→</i>}</div>)}</div>
    <p className="client-result-note">{he ? "עוקבים אחרי הנראות ואיכות הפניות כדי להבין מה משתפר." : "Track visibility and enquiry quality to see what improves."}</p>
  </div>;
  return <div className="client-office">
    <div className="client-office__heading"><span aria-hidden="true">✧</span><div><small>{he ? "יכולת נוספת, לפי הצורך" : "AN OPTIONAL, BESPOKE CAPABILITY"}</small><h4>{he ? "AI שעוזר לצוות שלך." : "AI that works for your team."}</h4></div></div>
    {(he ? [["מחקר", "תקציר מוכן"], ["מעקב", "טיוטה לבדיקה"], ["דיווח", "עדכון מוכן"]] : [["Research", "Brief prepared"], ["Follow-up", "Draft for review"], ["Reporting", "Update ready"]]).map(([task, output], i) => <div className="client-office__task" data-reveal={.05 + i * .13} key={task}><span>{task}</span><i aria-hidden="true">→</i><b>{output}</b></div>)}
    <p className="client-office__review">{he ? "תהליכים מותאמים. הצוות שלך נשאר בשליטה." : "Tailored workflows. Your team stays in control."}</p>
    <div className="client-contact-options"><Link href="/contact">{he ? "שפרו את הנראות" : "Improve your visibility"}<span aria-hidden="true">↗</span></Link><Link href="/contact">{he ? "בנו פתרון AI" : "Build an AI solution"}<span aria-hidden="true">↗</span></Link></div>
  </div>;
}
export function HarborStoryPanels({ locale }: { locale: string }) {
  const he = locale === "he";
  const copy = he ? [
    { label: "המסע מתחיל בשאלה", title: "הלקוח הבא שלך.", accent: "כבר מחפש.", lines: ["כל סירה היא לקוח פוטנציאלי. כל מפרץ הוא עסק שהוא עשוי לבחור.", "נלווה לקוח אחד, מהשאלה הראשונה ב־ChatGPT ועד לעסק שיגלה."], artifact: "שאלת קנייה", place: "בעקבות הלקוח", note: "שיחה לדוגמה · לא תשובה חיה" },
    { label: "מגילוי להשוואה", title: "לפני שבוחרים בך,", accent: "צריך למצוא אותך.", lines: ["הלקוח יוצא לבדוק עסק שמצא בתשובה. אבל מה אם העסק שלך לא מופיע שם?", "גם מתחרה רחוק יכול להיות הבחירה הקרובה ביותר, כשהוא זה שמופיע בזמן הנכון."], artifact: "אפשרויות שהלקוח גילה", place: "בדרך למפרץ של מתחרה", note: "תשובה להמחשה · עסקים בדויים" },
    { label: "עוקבים. משווים. מבינים.", title: "רואים את הפער.", accent: "יודעים איפה להתחיל.", lines: ["SailTru עוקבת אחרי SEO ו־GEO, משווה למתחרים ומזהה הזדמנויות לשיפור.", "במקרה הזה, המתחרה עונה על שאלות חשובות שהאתר שלך משאיר פתוחות."], artifact: "משאלה לתובנה", place: "התמונה הרחבה", note: "השוואה להמחשה · לא נתוני דירוג" },
    { label: "עוזרים להוציא לפועל", title: "תשובה טובה יותר.", accent: "דרך ברורה אליך.", lines: ["עוזרים ליישם את השיפורים בתוכן, באתר ובדרך מהביקור לפנייה.", "המפרץ מתרחב עם השיפור: יותר מידע שימושי, וצעד הבא שקל להבין."], artifact: "מהמלצה לשינוי באתר", place: "משפרים את העסק שלך", note: "הרחבת המפרץ ממחישה שיפור בחוויית הלקוח" },
    { label: "חוזרים למסע של הלקוח", title: "להיכנס לתמונה.", accent: "לתת סיבה לבחור.", lines: ["המטרה: לעזור ללקוחות לגלות אותך, להבין מה מתאים להם ולעשות את הצעד הבא.", "חוזרים לאותה שאלה ועוקבים אחרי מה שהשתנה בנראות ובפניות."], artifact: "אפשרות שכדאי לבדוק", place: "בדרך למפרץ שלך", note: "מסע אפשרי להמחשה · לא הבטחת תוצאות" },
    { label: "יותר מקום לצמוח", title: "מפרץ עם תנועה.", accent: "צוות עם יותר פנאי.", lines: ["ממשיכים לעקוב, לשפר ולמדוד. וכשצריך, בונים פתרונות AI וצוותי סוכנים מותאמים.", "מחקר, מעקב ודיווח עוברים לתהליכים שעוזרים לצוות להתמקד בלקוחות ובצמיחה."], artifact: "בתוך העסק שלך", place: "המפרץ שלך, בתנועה", note: "פתרונות AI זמינים גם כשירות עצמאי" },
  ] : [
    { label: "A JOURNEY STARTS WITH A QUESTION", title: "Your next client.", accent: "Already looking.", lines: ["Every boat is a potential client. Every bay is a business they might choose.", "Follow one buyer, from their first question in ChatGPT to the business they discover."], artifact: "A BUYING QUESTION", place: "Following a potential client", note: "Illustrative conversation · not a live answer" },
    { label: "FROM DISCOVERY TO CONSIDERATION", title: "Before they choose you,", accent: "they need to find you.", lines: ["Our buyer heads for a business they found in an answer. But what if your business isn’t there?", "A competitor can be a long way away—and still be the first business a buyer considers."], artifact: "THE BUYER’S SHORTLIST", place: "A distant competitor bay", note: "Illustrative answer · fictional providers" },
    { label: "TRACK. COMPARE. UNDERSTAND.", title: "See the gap.", accent: "Know where to start.", lines: ["SailTru tracks your SEO and GEO visibility, compares competitors and finds opportunities to improve.", "Here, a competitor answers important buying questions that your site leaves open."], artifact: "FROM QUESTION TO FINDING", place: "The wider market", note: "Illustrative comparison · not measured rankings" },
    { label: "HELP MAKE IT HAPPEN", title: "A better answer.", accent: "A clearer way to you.", lines: ["We help implement the improvements across your content, website and enquiry journey.", "Your bay grows with the work: useful information and an easier next step for visitors."], artifact: "FROM RECOMMENDATION TO REAL PAGE", place: "Improving your business", note: "Bay growth illustrates a better visitor experience" },
    { label: "RETURN TO THE BUYER’S JOURNEY", title: "Become an option.", accent: "Give them a reason.", lines: ["Help potential clients discover you, understand the fit and take a useful next step.", "We revisit the same questions and track what changes in visibility and enquiries."], artifact: "AN OPTION WORTH EXPLORING", place: "Approaching your business", note: "An illustrative journey · not a promised outcome" },
    { label: "MORE ROOM TO GROW", title: "A bay with momentum.", accent: "A team with capacity.", lines: ["Keep tracking, improving and measuring. When you need more capacity, we build bespoke AI solutions and agent teams.", "Research, follow-ups and reporting move into tailored workflows, so your team can focus on clients and growth."], artifact: "INSIDE YOUR BUSINESS", place: "Your bay, in motion", note: "Bespoke AI is also available as an independent service" },
  ];
  return <div className="harbor-narrative" dir={he ? "rtl" : "ltr"}>
    <div className="story-masthead"><a href="#hero" aria-label="SailTru">sailtru<span>↗</span></a><span>{he ? "כיוון ברור לצמיחה" : "A CLEARER COURSE FOR YOUR BUSINESS"}</span><Link href="/contact">{he ? "בואו נדבר" : "Let’s talk"}<span aria-hidden="true">↗</span></Link></div>
    {copy.map((scene, chapter) => <section className="story-beat" data-story-panel={chapter} data-side="left" key={scene.label}>
      <div className="story-reading"><div className="story-caption"><p className="story-kicker"><span>{String(chapter + 1).padStart(2, "0")}</span>{scene.label}</p><h2><span>{scene.title}</span><span className="story-accent">{scene.accent}</span></h2><div className="story-lines">{scene.lines.map((line, i) => <p data-story-line={i} key={line}>{line}</p>)}</div></div>
        <aside className={`story-artifact client-artifact client-artifact--${chapter}`} aria-label={scene.artifact}><div className="story-artifact__label"><span className="story-status-dot" />{scene.artifact}</div><Evidence chapter={chapter} he={he} /><p className="story-artifact__note">{scene.note}</p></aside>
      </div>
      <div className="story-place"><span aria-hidden="true">⌖</span>{scene.place}<small>{he ? "סירות: לקוחות פוטנציאליים · מפרצים: עסקים" : "BOATS: POTENTIAL CLIENTS · BAYS: BUSINESSES"}</small></div>
    </section>)}
    <ol className="story-navigation" aria-label={he ? "שלבי המסע" : "Journey chapters"}>{(he ? ["השאלה", "המסע", "הפער", "השיפור", "הדרך אליך", "צמיחה"] : ["The question", "The journey", "The gap", "The work", "The return", "The growth"]).map((label, i) => <li key={label} data-story-step={i}><a href="#journey-start" data-story-jump={i}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a></li>)}</ol>
  </div>;
}
