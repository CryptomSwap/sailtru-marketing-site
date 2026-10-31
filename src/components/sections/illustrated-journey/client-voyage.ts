import * as THREE from "three";
import { storyEase } from "./harbor-narrative";

export type BayPoint = [number, number, number];
export const BAY_COLORS = {paper:"#f6f5ef",sand:"#ddd9ca",shore:"#eee9dc",rock:"#9a9d94",ink:"#293c40",leaf:"#92998b",blue:"#315fea",sea:"#edf0eb"} as const;
export const COMPETITOR: BayPoint = [-100, 0, -50];
const curve = (points:BayPoint[], closed=false) => new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),closed,"centripetal");
export const BUYER_OUTBOUND=curve([[-38,0,30],[-52,0,28],[-78,0,8],[-101,0,-28],[-100,0,-43]]);
export const BUYER_INBOUND=curve([[-100,0,-43],[-97,0,-25],[-61,0,18],[-20,0,25],[-.6,0,19],[-.7,0,10],[-2.8,0,8.3],[-2.8,0,6]]);
const scratch = new THREE.Vector3();
export function sampleBuyer(p:number, point:THREE.Vector3,tangent:THREE.Vector3) {
  if(p<.19){point.set(-38+4*(1-storyEase(p,0,.035)),0,30+3*(1-storyEase(p,0,.035)));tangent.set(-4,0,-3).normalize();}
  else if(p<.66){const t=storyEase(p,.19,.305);BUYER_OUTBOUND.getPointAt(t,point);BUYER_OUTBOUND.getTangentAt(t,tangent);}
  else {const t=storyEase(p,.66,.815);BUYER_INBOUND.getPointAt(t,point);BUYER_INBOUND.getTangentAt(t,tangent);}
  return Math.atan2(tangent.x,tangent.z);
}
// Closed voyages preserve boat scale; the centre channel stays clear.
export const CLIENT_LOOPS = Array.from({length:8},(_,i)=>{
  const side=i%2?1:-1, row=Math.floor(i/2), berthZ=1.3+row*2.35;
  return curve([[side*2.8,0,berthZ],[side*.45,0,berthZ+.25],[side*.45,0,16],[side*(15+row*2),0,26],[side*(29+row*3),0,37],[side*(23+row*2),0,48],[side*(11+row),0,38],[side*1.35,0,22],[side*1.35,0,berthZ+1]],true);
});
export function sampleClient(seconds:number,index:number,point:THREE.Vector3,tangent:THREE.Vector3){
  const duration=48+index*3.7,phase=((seconds/duration+index*.139)%1+1)%1;
  const t=phase<.12?0:storyEase(phase,.12,1);
  CLIENT_LOOPS[index].getPointAt(t,point);CLIENT_LOOPS[index].getTangentAt(t,tangent);
  return Math.atan2(tangent.x,tangent.z);
}
type Shot={position:BayPoint;target:BayPoint;fov:number};
const market:Shot={position:[-43,78,95],target:[-50,0,-20],fov:48};
const home:Shot={position:[17,18,27],target:[0,.5,-.5],fov:43};
const final:Shot={position:[14.5,21,29],target:[0,.2,1],fov:43};
const lerpShot=(a:Shot,b:Shot,t:number,position:THREE.Vector3,target:THREE.Vector3)=>{
 position.set(...a.position);scratch.set(...b.position);position.lerp(scratch,t);
 target.set(...a.target);scratch.set(...b.target);target.lerp(scratch,t);
 return THREE.MathUtils.lerp(a.fov,b.fov,t);
};
const buyerPoint=new THREE.Vector3(),buyerTangent=new THREE.Vector3();
export function sampleBayCamera(p:number,portrait:boolean,position:THREE.Vector3,target:THREE.Vector3){
 sampleBuyer(p,buyerPoint,buyerTangent);
 const follow:Shot={position:[buyerPoint.x-9,6,buyerPoint.z+13],target:[buyerPoint.x,1,buyerPoint.z-1],fov:43};
 const approach:Shot={position:[buyerPoint.x+12,13,buyerPoint.z+19],target:[buyerPoint.x,.5,buyerPoint.z-3],fov:44};
 let fov:number;
 if(p<.13) fov=lerpShot(follow,follow,0,position,target);
 else if(p<.31) fov=lerpShot(follow,approach,storyEase(p,.13,.19),position,target);
 else if(p<.47){
   const arrival:Shot={position:[-88,13,-24],target:[-100,.5,-46],fov:44};
   fov=lerpShot(arrival,market,storyEase(p,.31,.365),position,target);
 }else if(p<.63) fov=lerpShot(market,home,storyEase(p,.47,.52),position,target);
 else if(p<.82) {
   if(p<.66) fov=lerpShot(home,approach,storyEase(p,.63,.66),position,target);
   else fov=lerpShot(approach,final,storyEase(p,.775,.82),position,target);
 }else fov=lerpShot(final,final,0,position,target);
 if(portrait){position.sub(target).multiplyScalar(.98).add(target);fov+=2;}
 return fov;
}



