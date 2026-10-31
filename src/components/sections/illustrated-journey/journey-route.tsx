"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { BaySketch as HarborSketch } from "./bay-sketch";
import { narrativeState, STORY_STARTS } from "./harbor-narrative";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const HarborThree = dynamic(() => import("./harbor-three").then(m => m.HarborThree), { ssr: false, loading: () => <div className="harbor-loading">Preparing your harbor…</div> });
const subscribeMotion = (callback: () => void) => {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const motionSnapshot = () => !matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverSnapshot = () => false;

export function JourneyRoute() {
  const locale=useLocale();
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const motion = useSyncExternalStore(subscribeMotion, motionSnapshot, serverSnapshot);
  useGSAP(() => {
    const stage = stageRef.current;
    const voyage = stage?.closest<HTMLElement>(".ij-voyage");
    if (!stage || !voyage) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ lerp: .085, smoothWheel: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      const panels=Array.from(voyage.querySelectorAll<HTMLElement>("[data-story-panel]"));
      const steps=Array.from(voyage.querySelectorAll<HTMLElement>("[data-story-step]"));
      const jumps=Array.from(voyage.querySelectorAll<HTMLAnchorElement>("[data-story-jump]"));
      const jump=(event:MouseEvent)=>{
        event.preventDefault();
        const index=Number((event.currentTarget as HTMLElement).dataset.storyJump);
        const start=voyage.getBoundingClientRect().top+window.scrollY;
        const chapterStart=STORY_STARTS[index],chapterEnd=STORY_STARTS[index+1]??1;
        lenis.scrollTo(start+(chapterStart+(chapterEnd-chapterStart)*.6)*(voyage.offsetHeight-window.innerHeight),{duration:1.2});
      };
      jumps.forEach(link=>link.addEventListener("click",jump));
      const update = ({ progress }: { progress: number }) => {
        progressRef.current = progress;
        const {chapter,local,detail,side}=narrativeState(progress);
        voyage.dataset.chapter=String(chapter);
        voyage.dataset.side=side;
        stage.style.setProperty("--harbor-progress", `${progress * 100}%`);
        panels.forEach((panel,index)=>{
          const active=index===chapter;
          panel.classList.toggle("is-active",active);
          panel.classList.toggle("is-detail",active&&detail);
          panel.inert=!active;
          panel.setAttribute("aria-hidden",String(!active));
          panel.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el=>el.classList.toggle("is-revealed",active&&local>Number(el.dataset.reveal)));
        });
        steps.forEach((step,index)=>{
          step.classList.toggle("is-current",index===chapter);
          step.classList.toggle("is-complete",index<chapter);
          step.querySelector("a")?.setAttribute("aria-current",index===chapter?"step":"false");
        });
      };
      const playhead={progress:0};
      const sequence=gsap.to(playhead,{
        progress:1,ease:"none",duration:1,onUpdate:()=>update(playhead),
        scrollTrigger:{trigger:voyage,start:"top top",end:"bottom bottom",scrub:.7,onRefresh:self=>update({progress:self.progress})},
      });
      update({progress:sequence.scrollTrigger?.progress??0});
      return () => {
        sequence.scrollTrigger?.kill();sequence.kill();
        panels.forEach(element=>{element.inert=false;element.removeAttribute("aria-hidden");});
        jumps.forEach(link=>link.removeEventListener("click",jump));
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update); lenis.destroy();
      };
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(stage.querySelectorAll("[data-build]"), { opacity: 1, y: 0 });
    });
    return () => media.revert();
  }, { scope: stageRef });
  return <div className="ij-stage harbor-stage" ref={stageRef} aria-hidden>
    <div className="harbor-stage__art">{motion ? <HarborThree progress={progressRef}/> : <HarborSketch/>}</div>
    <svg className="harbor-sun" viewBox="0 0 180 180" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="90" cy="90" r="55"/><circle cx="90" cy="90" r="59"/>
      {Array.from({length:32},(_,i)=><path key={i} d="M90 17V27" transform={`rotate(${i*11.25} 90 90)`}/>)}
    </svg>
    <div className="harbor-birds" aria-hidden="true">{[0,1,2].map(i=><span key={i}><svg width="28" height="15" viewBox="0 0 28 15" fill="none" stroke="currentColor"><path d="M1 5Q8 0 14 10Q20 0 27 5"/></svg></span>)}</div>
    <div className="harbor-stage__caption">{locale==="he"?"SailTru · מראיות לביצוע":"SAILTRU · EVIDENCE INTO ACTION"}</div>
    <div className="harbor-stage__progress"><i /></div>
  </div>;
}
