"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { BaySketch } from "../illustrated-journey/bay-sketch";
import type { WorkspaceMotion } from "./workspace-scene";
const HarborScene=dynamic(()=>import("./harbor-scene"),{ssr:false});

const chapters={
  en:[
    {name:"Your business",title:"Every business has",accent:"a wider horizon.",body:"Your customers, competitors and day-to-day operations are connected. Start with a clearer picture of the business you want to grow.",label:"THE BUSINESS, IN CONTEXT",detail:"A harbor represents your business. The surrounding waters represent its market—not a forecast of revenue or customer growth.",items:["Your business","Your market","Your opportunities"]},
    {name:"Survey",title:"Look beyond",accent:"your own shoreline.",body:"Compare competitors, examine your business, and understand where you appear in search and AI answers. Each signal adds context to the report.",label:"FOUR LENSES. ONE PICTURE.",detail:"Business analysis · competitor positioning · SEO placements · GEO mentions and citations. Coverage depends on the available sources and agreed scope.",items:["Business","Competitors","SEO / GEO"]},
    {name:"Chart the course",title:"Find the opportunity.",accent:"Choose the next move.",body:"Turn scattered findings into a report with evidence, priorities and practical recommendations. See what matters, why, and how to act on it.",label:"EXAMPLE / BUSINESS BRIEF 001",detail:"Finding: buyers cannot understand your pricing. Evidence: competitor pages answer the question. Next move: publish a useful pricing guide.",items:["Finding","Evidence","Recommendation"]},
    {name:"Working dock",title:"A clear direction.",accent:"A team to build it.",body:"We help carry the work through: website improvements, custom software and workflow automation. The implementation follows the business need.",label:"FROM RECOMMENDATION TO IMPLEMENTATION",detail:"Define the scope, choose a useful outcome, and build the change. A report purchase does not automatically include implementation.",items:["Scope","Build","Deliver"]},
    {name:"Inside the business",title:"Your knowledge.",accent:"Your bespoke AI crew.",body:"We curate the models and tools, connect your knowledge, and create agents around your workflows—from a focused assistant to a coordinated team.",label:"EXAMPLE / ENQUIRY PREPARATION",detail:"An approved enquiry becomes a researched brief. Your team reviews it before it is handed to the CRM. Internal workflow needs are discovered with you.",items:["Context + research","Human review","CRM handoff"]},
    {name:"A clearer horizon",title:"Measure the change.",accent:"Keep charting forward.",body:"Review what the work changed against an agreed baseline. Visibility, qualified enquiries, quality and handling time help inform the next priority.",label:"THE IMPROVEMENT LOOP",detail:"The harbor’s changing facilities illustrate implementation and capacity—not a promised uplift. Ongoing monitoring is separately scoped.",items:["Baseline","Review","Next priority"]},
  ],
  he:[
    {name:"העסק שלכם",title:"לכל עסק יש",accent:"אופק רחב יותר.",body:"הלקוחות, המתחרים והעבודה היומיומית מחוברים. מתחילים מתמונה ברורה יותר של העסק שאתם רוצים להצמיח.",label:"העסק בתוך ההקשר שלו",detail:"הנמל מייצג את העסק. המים סביבו מייצגים את השוק—לא תחזית להכנסות או לצמיחה בלקוחות.",items:["העסק","השוק","ההזדמנויות"]},
    {name:"סוקרים",title:"מסתכלים מעבר",accent:"לקו החוף שלכם.",body:"משווים מתחרים, בוחנים את העסק ומבינים היכן הוא מופיע בחיפוש ובתשובות AI. כל מקור מוסיף הקשר לדוח.",label:"ארבע נקודות מבט. תמונה אחת.",detail:"ניתוח עסקי, מיצוב מול מתחרים, מיקומי SEO ואזכורים וציטוטים ב־GEO. הכיסוי תלוי במקורות הזמינים ובהיקף המוסכם.",items:["העסק","מתחרים","SEO / GEO"]},
    {name:"בוחרים מסלול",title:"מזהים הזדמנות.",accent:"בוחרים את הצעד הבא.",body:"הופכים ממצאים לדוח עם ראיות, סדרי עדיפויות והמלצות מעשיות. מבינים מה חשוב, למה ואיך לפעול.",label:"דוגמה / תקציר עסקי 001",detail:"ממצא: לקוחות לא מבינים את התמחור. ראיה: עמודי המתחרים עונים על השאלה. הצעד הבא: מדריך תמחור שימושי.",items:["ממצא","ראיות","המלצה"]},
    {name:"הרציף העובד",title:"כיוון ברור.",accent:"צוות שבונה אותו.",body:"עוזרים לבצע: שיפור האתר, תוכנה מותאמת ואוטומציה לתהליכי עבודה. היישום נקבע לפי הצורך העסקי.",label:"מהמלצה ליישום",detail:"מגדירים היקף, בוחרים תוצאה שימושית ובונים את השינוי. רכישת דוח אינה כוללת יישום באופן אוטומטי.",items:["אפיון","בנייה","מסירה"]},
    {name:"בתוך העסק",title:"הידע שלכם.",accent:"צוות ה־AI שלכם.",body:"בוחרים מודלים וכלים, מחברים את הידע ובונים סוכנים סביב תהליכי העבודה—מעוזר ממוקד ועד צוות מתואם.",label:"דוגמה / הכנה לטיפול בפנייה",detail:"פנייה מאושרת הופכת לתקציר מבוסס מחקר. הצוות בודק אותו לפני העברה ל־CRM. הצרכים הפנימיים מתבררים יחד איתכם.",items:["הקשר ומחקר","בקרה אנושית","מסירה ל־CRM"]},
    {name:"אופק ברור",title:"מודדים את השינוי.",accent:"ממשיכים להתקדם.",body:"בוחנים את השינוי מול נקודת בסיס מוסכמת. נראות, פניות מתאימות, איכות וזמן טיפול עוזרים לבחור את העדיפות הבאה.",label:"מחזור השיפור",detail:"המתקנים המשתנים בנמל ממחישים יישום וקיבולת—לא הבטחת צמיחה. ניטור מתמשך מוגדר בנפרד.",items:["נקודת בסיס","בדיקה","עדיפות הבאה"]},
  ],
};

export function HarborJourney({he,motion,enabled}:{he:boolean;motion:RefObject<WorkspaceMotion>;enabled:boolean}){
  const section=useRef<HTMLElement>(null),progress=useRef(0);
  const [active,setActive]=useState(0),[ready,setReady]=useState(false),[desktop,setDesktop]=useState(false);
  const onReady=useCallback(()=>setReady(true),[]),onFailure=useCallback(()=>setReady(false),[]);
  const copy=chapters[he?"he":"en"];
  useEffect(()=>{
    const query=matchMedia("(min-width: 980px)");const resize=()=>setDesktop(query.matches);resize();query.addEventListener("change",resize);
    return()=>query.removeEventListener("change",resize);
  },[]);
  const cinematic=enabled&&desktop;
  useEffect(()=>{
    const node=section.current;if(!node||!cinematic)return;
    let frame=0;
    const update=()=>{frame=0;const r=node.getBoundingClientRect();const p=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));progress.current=p;setActive(Math.min(5,Math.floor(p*6)));};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",scroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);};
  },[cinematic]);
  const jump=(i:number)=>{const node=section.current;if(!node)return;const r=node.getBoundingClientRect();window.scrollTo({top:scrollY+r.top+(i+.48)/6*(r.height-innerHeight),behavior:"smooth"});};
  return <section ref={section} id="harbor" className={`ht-journey ${cinematic?"ht-cinematic":"ht-reading"}`} aria-label={he?"מסע העסק עם SailTru":"Your business journey with SailTru"}>
    <div className="ht-stage"><div className="ht-topline"><span>SAILTRU / {he?"מראיות לפעולה":"FROM EVIDENCE TO ACTION"}</span><a href="#intelligence">{he?"ישירות לדוח":"Skip to the report"} ↓</a></div>
      <div className="ht-environment" aria-hidden="true"><div className="ht-fallback" hidden={cinematic&&ready}><BaySketch/></div>{cinematic&&<HarborScene motion={motion} progress={progress} onReady={onReady} onFailure={onFailure}/>}</div>
      <div className="ht-panels">{copy.map((chapter,i)=><article key={chapter.name} className="ht-panel" hidden={cinematic&&active!==i}>
        <p className="bw-kicker"><span className="bw-dot"/>0{i+1} / {chapter.name}</p><h2>{chapter.title}<em>{chapter.accent}</em></h2><p className="ht-body">{chapter.body}</p>
        <div className="ht-evidence"><p className="bw-kicker">{chapter.label}</p><div className="ht-evidence-path">{chapter.items.map(item=><span key={item}>{item}</span>)}</div><p>{chapter.detail}</p>{(i===2||i===4)&&<a href={i===2?"#intelligence":"#implementation"}>{he?"לגלות איך זה עובד":"Explore the example"} ↗</a>}</div>
      </article>)}</div>
      {cinematic&&<nav className="ht-chapters" aria-label={he?"פרקי המסע":"Journey chapters"}>{copy.map((chapter,i)=><button key={chapter.name} onClick={()=>jump(i)} aria-current={active===i?"step":undefined}><span>0{i+1}</span>{chapter.name}</button>)}</nav>}
    </div>
  </section>;
}
