"use client";

import { useId, useState } from "react";
import { useLocale } from "next-intl";
import "./visibility-workspace.css";

const trends = [
  [61,58,61,59,63,67,71,68,67,69,68,66,68,67,68],
  [41,40,43,41,42,47,45,47,48,47,46,45,47,46,47],
  [17,20,20,22,21,25,24,25,26,27,28,25,27,27,28],
  [12,12,11,13,12,14,12,13,13,14,14,13,14,15,16],
];
const ink = ["#9226ef","#09864a","#2225fb","#74809f"];
const glyphs = [
  "M2 10 10 3l8 7 M5 9v8h4v-5h3v5h4V9",
  "M3 16v-5h3v5z M9 16V4h3v12z M15 16V8h3v8z",
  "M14 14l4 4 M15 9a6 6 0 1 1-12 0 6 6 0 0 1 12 0",
  "M3 4h14v10H8l-5 4z",
  "m2 7 8-4 8 4-8 4z M2 11l8 4 8-4 M2 15l8 4 8-4",
  "M10 2v3m0 10v3M2 10h3m10 0h3M4 4l2 2m8 8 2 2M4 16l2-2m8-8 2-2 M15 10a5 5 0 1 1-10 0 5 5 0 1 1 10 0",
];

export function VisibilityWorkspace() {
  const he = useLocale() === "he";
  const tr = (en: string, iw: string) => he ? iw : en;
  const gradient = useId();
  const [tab, setTab] = useState(1);
  const [model, setModel] = useState("All");
  const [week, setWeek] = useState(false);
  const [compare, setCompare] = useState(true);
  const [point, setPoint] = useState(10);
  const [row, setRow] = useState(0);
  const your = tr("Your company","החברה שלכם");
  const rival = tr("Competitor","מתחרה");
  const labels = [rival+" A",rival+" B",your,rival+" C"];
  const tabs = he ? ["סקירה","תשובות AI","חיפוש Google","מתחרים"] : ["Overview","AI answers","Google search","Competitors"];
  const metric = [tr("Overall visibility","נראות כוללת"),tr("Mention rate","שיעור אזכורים"),tr("Search visibility","נראות בחיפוש"),tr("Share of answers","נתח תשובות")][tab];
  const questions = he ? ["אילו ספקים כדאי לבדוק?","איך החלופות משתוות?","מי מפרסם תוצאות של לקוחות?"] : ["Which providers should I shortlist?","How do the alternatives compare?","Which provider publishes customer results?"];
  const answers = he ? ["ומתחרה B מפרסמים תוצאות של לקוחות שאפשר להשוות.","מוזכרת לצד החלופות בזכות עמוד ההשוואה שלה.","מציגה תוצאות מדידות בסיפור לקוח."] : ["and Competitor B publish customer results that buyers can compare.","appears alongside the alternatives through its comparison page.","publishes measurable outcomes in a customer case study."];
  const actions = he ? ["הוסיפו תוצאה מדידה לעמוד ההשוואה.","עדכנו את ההשוואה כאשר ההצעה משתנה.","קשרו לסיפור הלקוח מעמוד השירות."] : ["Add a quantified customer result to your comparison page.","Update the comparison when your offer changes.","Link the case study from your service page."];
  const provider = model === "All" ? "ChatGPT" : model;
  const series = trends.map(values => values.slice(week ? -7 : 0).map(value => value + [3,0,6,-2][tab] + (model === "Gemini" ? 3 : model === "ChatGPT" ? 1 : 0)));
  const last = series[0].length-1;
  const current = Math.min(point,last);
  const date = (i: number) => tr("Mar ","מרץ ") + (week ? 23+i : [1,3,5,7,9,11,14,16,18,20,22,24,26,28,29][i]);
  const x = (i: number) => 37+790*i/last;
  const y = (v: number) => 165-v*1.91;
  return <section className="vw-shell" dir={he ? "rtl":"ltr"} aria-label={tr("Sample visibility workspace","סביבת נראות לדוגמה")}>
    <aside className="vw-rail" aria-hidden="true">
      <svg viewBox="0 0 30 30"><path fill="white" d="M2 23 20 2v21z"/><path fill="#46dfb3" d="m16 25 12-15v15z"/></svg>
      {glyphs.map((d,i)=><i key={d} className={i===1?"vw-selected":""}><svg viewBox="0 0 20 20"><path d={d} fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round"/></svg></i>)}
      <span className="vw-avatar">●</span>
    </aside>
    <div className="vw-body">
      <header className="vw-top"><strong>{your}</strong><span>{tr("Sample workspace","סביבת דוגמה")}</span></header>
      <div className="vw-inner">
        <div><b>Sailtru</b> {tr("Website Analysis","ניתוח אתר")}</div>
        <h2>{tr("AI visibility","נראות ב-AI")}</h2>
        <div className="vw-tools"><nav>{tabs.map((name,i)=><button key={name} onClick={()=>setTab(i)} aria-pressed={tab===i}>{name}</button>)}</nav>
          <select aria-label={tr("Model","מודל")} value={model} onChange={e=>setModel(e.target.value)}><option value="All">{tr("All models","כל המודלים")}</option><option>ChatGPT</option><option>Gemini</option></select>
          <select aria-label={tr("Date range","טווח תאריכים")} value={week?"7":"30"} onChange={e=>{setWeek(e.target.value==="7");setPoint(e.target.value==="7"?3:10)}}><option value="30">{tr("Last 30 days","30 ימים אחרונים")}</option><option value="7">{tr("Last 7 days","7 ימים אחרונים")}</option></select>
        </div>
        <div className="vw-metric"><b>{metric}</b><strong>{series[2][last]}%</strong><span>↗ +{week ? 2 : 6} pp</span><small>{week?tr("vs. previous 7 days","לעומת 7 הימים הקודמים"):tr("vs. previous 30 days","לעומת 30 הימים הקודמים")}</small><button aria-pressed={compare} onClick={()=>setCompare(!compare)}>{tr("Compare","השוואה")} · {compare?tr("Competitors","מתחרים"):your} ⌄</button></div>
        <div className="vw-chart" dir="ltr">
          <svg viewBox="0 0 945 191" role="img" aria-label={metric+" · "+your+" "+series[2][current]+"%"}>
            <defs><linearGradient id={gradient} x2="0" y2="1"><stop stopColor="#6269ff" stopOpacity=".16"/><stop offset="1" stopColor="#6269ff" stopOpacity="0"/></linearGradient></defs>
            {Array.from({length:9},(_,i)=><g key={i}><path d={'M37 '+y(i*10)+'H827'} className="vw-grid"/><text x="30" y={y(i*10)+4} textAnchor="end">{i*10}%</text></g>)}
            {[0, .25,.5,.75,1].map((f,i)=><g key={f}><path d={'M'+(37+790*f)+' 12v153'} className="vw-grid"/><text x={37+790*f} y="184" textAnchor="middle">{week?date(Math.round(f*last)):tr("Mar ","מרץ ")+(1+7*i)}</text></g>)}
            {series.map((values,k)=>{if(!compare && k!==2)return null;
              const line = values.map((v,i)=>(i===0?"M":"L")+x(i)+" "+y(v)).join(" ");
              return <g key={k} fill={ink[k]}>{k===2&&<path d={line+"V165H37Z"} fill={'url(#'+gradient+')'}/>}<path key={tab+"-"+model+"-"+week} className="vw-trace" pathLength="1" d={line} fill="none" stroke={ink[k]} strokeWidth="1.6"/>
                {values.map((v,i)=><circle key={i} cx={x(i)} cy={y(v)} r={i===last?4.6:3.3} stroke="white"/>)}
                <text x="836" y={y(values[last])+4} className="vw-series-label">{labels[k]} {values[last]}%</text></g>})}
            <path d={'M'+x(current)+' 12v153'} stroke="#303bff" strokeDasharray="3 2"/><circle cx={x(current)} cy={y(series[2][current])} r="5" fill="#2025ff" stroke="white"/>
            {series[2].map((_,i)=><rect key={i} x={x(i)-14} y="12" width={Math.max(28,790/last)} height="154" fill="transparent" onPointerEnter={()=>setPoint(i)} onClick={()=>setPoint(i)}/>)}
          </svg>
          <button className="vw-tip" style={{left:Math.min(76,Math.max(12,x(current)/9.45))+"%"}} onKeyDown={e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();setPoint(Math.max(0,Math.min(last,current+(e.key==="ArrowRight"?1:-1))))}}} onClick={e=>e.currentTarget.closest("section")?.querySelector<HTMLButtonElement>(".vw-row")?.focus()}>
            <small>{date(current)} · {your}</small><b>{series[2][current]} {tr("of 100","מתוך 100")} {tab===2?tr("searches","חיפושים"):tr("answers","תשובות")}</b><em>{tr("Explore answers","לתשובות")} →</em>
          </button>
        </div>
        <section className="vw-evidence"><header><strong>{tr("Answers behind this point","התשובות מאחורי הנקודה")}</strong><span>{date(current)}</span></header>
          <div className="vw-split"><div className="vw-list"><div className="vw-columns"><b>{tr("Buyer question","שאלת לקוח")}</b><b>{tr("Provider","ספק")}</b><b>{tr("Status","מצב")}</b></div>
            {questions.map((q,i)=><button className="vw-row" key={q} aria-pressed={row===i} onClick={()=>setRow(i)}><b>{q}</b><span>◎ {provider}</span><small data-missing={i===0}>{i===0?tr("Absent","חסר"):tr("✓ Mentioned","✓ הוזכר")}</small></button>)}</div>
            <article className="vw-proof" key={row+model}><span>◎ {tr("Sample answer","תשובה לדוגמה")} · {provider}</span>
              <blockquote>“<mark>{row===0?labels[0]:your}</mark> {answers[row]}” <sup>[1]</sup></blockquote>
              <div className="vw-source">{tr("Source","מקור")}　 [1] <u>{row===0?labels[0]:your} / {row===1?tr("Comparison","השוואה"):tr("Customer results","תוצאות לקוחות")}</u></div>
              <footer><b>✦ {tr("Next action","הצעד הבא")}</b><span>{actions[row]}</span></footer>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>;
}
