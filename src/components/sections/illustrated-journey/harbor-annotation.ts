import * as THREE from "three";
import type { RefObject } from "react";
import type { createHarborTraffic } from "./harbor-traffic";
import { harborStoryBeat } from "./harbor-story";

export type HarborAnnotationRefs = {
  annotationRef: RefObject<HTMLDivElement | null>;
  leaderRef: RefObject<SVGLineElement | null>;
};

export function createHarborAnnotation(refs: HarborAnnotationRefs) {
  const anchor=new THREE.Vector3();
  let key="", age=0, animation: Animation | undefined;
  let title="";
  return {
    dispose(){animation?.cancel();},
    update(camera:THREE.Camera,traffic:ReturnType<typeof createHarborTraffic>,progress:number,width:number,height:number,delta:number){
      const el=refs.annotationRef.current, line=refs.leaderRef.current;
      if(!el||!line)return;
      const show=width>=900 && progress>.12 && progress<.94;
      el.style.visibility=show?"visible":"hidden";
      line.style.visibility=show?"visible":"hidden";
      if(!show)return;
      const state=harborStoryBeat(progress),boat=traffic.boats[0];
      const captions={
        passing:["THE MISSED VISIT","Nothing tells me to stop.","An unclear offer gives a visitor little reason to look closer."],
        signal:["THE SIGNAL","Now I know what you do.","A specific service, a clear audience, and answers to the right questions."],
        approaching:["THE APPROACH","I’m interested. What next?","The visitor needs a visible action—not a hunt for a contact link."],
        docked:["THE ARRIVAL","One clear way to begin.","The enquiry action sits beside the service, with the next step explained."],
        proof:["THE REASON TO CHOOSE","Show me work like mine.","Relevant projects and an understandable process support the decision."],
      };
      const [label,heading,detail]=captions[state];
      title=heading;
      const status="ILLUSTRATIVE CUSTOMER JOURNEY · NOT LIVE DATA";
      anchor.copy(boat.point);anchor.y=1.6;
      if(state==="signal")anchor.set(-1.65,3.9,-2.4);
      if(state==="proof")anchor.set(.85,2.7,-2.4);
      const nextKey=state;
      if(nextKey!==key){
        key=nextKey;age=0;animation?.cancel();
        el.dataset.state=state;
        el.querySelector(".harbor-world-note__label")!.textContent=label;
        el.querySelector(".harbor-world-note__detail")!.textContent=detail;
        el.querySelector(".harbor-world-note__status")!.textContent=status;
        el.querySelector("h3")!.setAttribute("aria-label",title);
        animation=el.firstElementChild!.animate([{opacity:0,transform:"translateY(10px) scale(.94)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:550,easing:"cubic-bezier(.2,.9,.3,1.2)"});
      }
      age+=Math.min(delta,.05);
      el.querySelector("h3")!.textContent=title.slice(0,Math.floor(age/.028));
      el.classList.toggle("is-expanded",age>.65);
      anchor.project(camera);
      if(anchor.z>1||anchor.z< -1){el.style.visibility="hidden";line.style.visibility="hidden";return;}
      const ax=(anchor.x*.5+.5)*width, ay=(-anchor.y*.5+.5)*height;
      const w=el.offsetWidth,h=el.offsetHeight,pad=22;
      let x=Math.min(width-w-pad,Math.max(pad,ax-w/2)),y=Math.min(height-h-pad,Math.max(60,ay-h-30));
      // A tall beacon reaches the top of the frame; keep its lantern uncovered.
      if(state==="signal"&&ay<h+90)x=Math.min(width-w-pad,ax+70);
      // Avoid all currently visible narrative panels, including between chapters.
      const stage=el.parentElement!;
      const origin=stage.getBoundingClientRect();
      stage.closest(".ij-voyage")?.querySelectorAll<HTMLElement>(".ij-scene__copy,.harbor-evidence").forEach(card=>{
        if(Number(getComputedStyle(card).opacity)<.15)return;
        const r=card.getBoundingClientRect();
        const left=r.left-origin.left,top=r.top-origin.top;
        if(x<left+r.width+12&&x+w>left-12&&y<top+r.height+12&&y+h>top-12){
          x=left<width/2?left+r.width+20:left-w-20;
          x=Math.min(width-w-pad,Math.max(pad,x));
          if(x<left+r.width+12&&x+w>left-12)y=Math.max(60,top-h-20);
        }
      });
      el.style.transform=`translate3d(${x}px,${y}px,0)`;
      line.setAttribute("x1",String(x+w/2));line.setAttribute("y1",String(y+h));
      line.setAttribute("x2",String(ax));line.setAttribute("y2",String(ay));
    }
  };
}
