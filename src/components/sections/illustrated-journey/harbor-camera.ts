import * as THREE from "three";
import { STORY_STARTS, storyEase } from "./harbor-narrative";
type Shot = {position:[number,number,number];target:[number,number,number];fov:number};
// Each shot is composed inside the scene viewport; reading holds are still.
export const DESKTOP_SHOTS:Shot[]=[
  {position:[11,7,17],target:[0,1.1,1],fov:38},
  {position:[7,13,25],target:[-4,1,11],fov:38},
  {position:[-4,24,12],target:[-6,0,6],fov:43},
  {position:[16,6.8,14],target:[5.2,1.2,1.5],fov:38},
  {position:[18,11,25],target:[7.5,.8,12],fov:40},
  {position:[15,18,30],target:[0,.5,6],fov:46},
];
export const PORTRAIT_SHOTS:Shot[]=[
  {position:[10,7,17],target:[0,1,1],fov:46},
  {position:[8,15,25],target:[-4,1,11],fov:46},
  {position:[-4,26,12],target:[-6,0,6],fov:48},
  {position:[16,8,15],target:[5,1.2,1.2],fov:45},
  {position:[17,12,25],target:[7.5,1,12],fov:46},
  {position:[15,20,32],target:[0,.5,6],fov:48},
];
export function sampleHarborCamera(p:number,portrait:boolean,position:THREE.Vector3,target:THREE.Vector3){
  const shots=portrait?PORTRAIT_SHOTS:DESKTOP_SHOTS;
  const time=STORY_STARTS.slice(1).reduce<number>((sum,start)=>sum+storyEase(p,start-.055,start+.018),0);
  const index=Math.min(shots.length-2,Math.floor(time)),t=time-index,a=shots[index],b=shots[index+1];
  position.set(THREE.MathUtils.lerp(a.position[0],b.position[0],t),THREE.MathUtils.lerp(a.position[1],b.position[1],t),THREE.MathUtils.lerp(a.position[2],b.position[2],t));
  target.set(THREE.MathUtils.lerp(a.target[0],b.target[0],t),THREE.MathUtils.lerp(a.target[1],b.target[1],t),THREE.MathUtils.lerp(a.target[2],b.target[2],t));
  return THREE.MathUtils.lerp(a.fov,b.fov,t);
}
