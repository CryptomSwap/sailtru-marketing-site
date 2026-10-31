import * as THREE from "three";
import { STORY_STARTS, storyEase } from "./harbor-narrative";
export type VoyagePoint = [number, number, number];
// Fixed berths and reading holds: scroll reversal cannot shrink the client boat.
export const CLIENT_BERTHS: VoyagePoint[] = [[0,0,3],[-3,0,11],[-7,0,7],[5,0,4],[7,0,13],[0,0,9]];
const paths = [
  [[0,0,3],[-.8,0,6],[-2,0,9],[-3,0,11]],
  [[-3,0,11],[-5,0,11],[-7,0,9],[-7,0,7]],
  [[-7,0,7],[-5,0,4],[0,0,3],[5,0,4]],
  [[5,0,4],[6,0,7],[6,0,10],[7,0,13]],
  [[7,0,13],[5,0,15],[1,0,13],[0,0,9]],
] as VoyagePoint[][];
export const CLIENT_ROUTES = paths.map(points=>new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,"centripetal"));
const headings = [.45,-.55,-1.9,1.55,.1,-2.65];
export function sampleClientBoat(progress:number, position:THREE.Vector3) {
  const p=THREE.MathUtils.clamp(progress,0,1);
  position.set(...CLIENT_BERTHS[0]);
  let heading=headings[0];
  for(let i=0;i<CLIENT_ROUTES.length;i++) {
    const start=STORY_STARTS[i+1]-.055,end=STORY_STARTS[i+1]+.018;
    if(p<start)break;
    const t=storyEase(p,start,end);
    CLIENT_ROUTES[i].getPointAt(t,position);
    const turn=Math.atan2(Math.sin(headings[i+1]-headings[i]),Math.cos(headings[i+1]-headings[i]));
    heading=headings[i]+turn*t;
  }
  return heading;
}
