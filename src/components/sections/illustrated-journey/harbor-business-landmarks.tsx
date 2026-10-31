"use client";

/* Scene objects deliberately follow the scroll clock without React rerenders. */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HARBOR } from "./harbor-palette";
import { HatchedMaterial } from "./harbor-environment";
import { storyEase } from "./harbor-narrative";

type Point = [number,number,number];
type Progress = {current:number};
function Box({p=[0,0,0],s,color=HARBOR.paper,r=[0,0,0]}:{p?:Point;s:Point;color?:string;r?:Point}){
  return <mesh position={p} rotation={r} castShadow receiveShadow><boxGeometry args={s}/><HatchedMaterial color={color}/></mesh>;
}

// A coastal studio with an oversized working page at its open front. The page
// fills in as the missing answer is written; nothing travels down a conveyor.
export function ActionHouse({progress}:{progress:Progress}){
  const answers=useRef<THREE.Group>(null);
  useFrame(()=>answers.current?.children.forEach((line,i)=>{
    const t=storyEase(progress.current,.55+i*.025,.59+i*.025);
    line.scale.x=Math.max(.001,t);
    line.visible=t>.001;
  }));
  return <group>
    <Box p={[0,.55,0]} s={[5.3,.22,2.9]} color={HARBOR.surface}/>
    {[-2.35,2.35].map(x=><Box key={x} p={[x,1.8,-.7]} s={[.14,2.6,.14]} color={HARBOR.line}/>)}
    <Box p={[0,1.7,-1.15]} s={[4.9,2.35,.12]}/>
    <Box p={[-1.28,3.22,-.2]} s={[2.65,.14,3]} r={[0,0,.16]}/>
    <Box p={[1.28,3.22,-.2]} s={[2.65,.14,3]} r={[0,0,-.16]}/>
    <Box p={[0,3.44,-.2]} s={[.13,.1,3.12]} color={HARBOR.blue}/>
    <Box p={[0,1.68,.58]} s={[3.6,2.05,.16]} color={HARBOR.ink}/>
    <Box p={[0,1.68,.68]} s={[3.43,1.89,.07]}/>
    <Box p={[0,2.43,.73]} s={[3.43,.28,.04]} color={HARBOR.surface}/>
    {[-1.48,-1.32,-1.16].map(x=><mesh key={x} position={[x,2.43,.76]}><sphereGeometry args={[.035,8,6]}/><meshBasicMaterial color={HARBOR.muted}/></mesh>)}
    <Box p={[-.4,2.06,.75]} s={[2.2,.13,.04]} color={HARBOR.ink}/>
    <group ref={answers}>
      {[0,1,2].map(i=><group key={i} position={[-1.48,1.77-i*.22,.76]}><Box p={[1.2,0,0]} s={[2.4-i*.3,.075,.04]} color={HARBOR.mid}/></group>)}
      <group position={[-1.48,.96,.76]}><Box p={[.66,0,0]} s={[1.32,.25,.05]} color={HARBOR.blue}/></group>
    </group>
    <Box p={[0,.93,1.1]} s={[4,.13,.65]} color={HARBOR.surface}/>
    {[-1.7,1.7].map(x=><Box key={x} p={[x,.65,1.1]} s={[.09,.55,.4]} color={HARBOR.line}/>)}
    <Box p={[-2.1,.82,1.1]} s={[.42,.3,.42]} color={HARBOR.blue}/>
    <mesh position={[-2.1,1.2,1.1]} scale={[.25,.32,.25]}><icosahedronGeometry args={[1,1]}/><HatchedMaterial color={HARBOR.mid}/></mesh>
  </group>;
}

function Agent({position,index,progress}:{position:Point;index:number;progress:Progress}){
  const task=useRef<THREE.Group>(null);
  useFrame(()=>{if(task.current){const t=storyEase(progress.current,.735+index*.02,.775+index*.02);task.current.scale.setScalar(Math.max(.001,t));}});
  return <group position={position}>
    <mesh position={[0,.48,0]} castShadow><cylinderGeometry args={[.45,.6,.72,16]}/><HatchedMaterial color={HARBOR.paper}/></mesh>
    <mesh position={[0,1.03,0]} castShadow><sphereGeometry args={[.46,20,14]}/><HatchedMaterial color={HARBOR.paper}/></mesh>
    <Box p={[0,1.04,.38]} s={[.6,.25,.09]} color={HARBOR.ink}/>
    {[-.14,.14].map(x=><mesh key={x} position={[x,1.05,.435]}><sphereGeometry args={[.045,8,6]}/><meshBasicMaterial color={HARBOR.blue}/></mesh>)}
    <mesh position={[0,1.55,0]}><sphereGeometry args={[.07,10,8]}/><meshBasicMaterial color={HARBOR.blue}/></mesh>
    <group ref={task} position={[0,.55,.65]} rotation={[-.25,0,0]}><Box s={[.55,.64,.06]} color={HARBOR.blue}/><Box p={[0,.1,.04]} s={[.32,.04,.02]}/><Box p={[-.05,-.03,.04]} s={[.22,.04,.02]}/></group>
  </group>;
}

// Work leaves a busy desk and lands with three distinct assistants. It is an
// optional team capability, not a mandatory step in SEO/GEO implementation.
export function AgentCrew({progress}:{progress:Progress}){
  const papers=useRef<THREE.Group>(null);
  const destinations:Point[]=[[-1.8,1.2,-.45],[0,1.2,-1.2],[1.8,1.2,-.45]];
  useFrame(()=>papers.current?.children.forEach((paper,i)=>{
    const t=storyEase(progress.current,.72+i*.02,.775+i*.02),dest=destinations[i];
    paper.position.set(THREE.MathUtils.lerp(-.4+i*.35,dest[0],t),1.15+Math.sin(t*Math.PI)*1.3,THREE.MathUtils.lerp(1.1,dest[2],t));
    paper.scale.setScalar(1-t);
    paper.rotation.z=t*.3;
  }));
  return <group>
    <mesh position={[0,.45,0]} receiveShadow><cylinderGeometry args={[2.9,3.1,.23,32]}/><HatchedMaterial color={HARBOR.surface}/></mesh>
    {destinations.map(([x,,z],i)=><Agent key={i} index={i} position={[x,.57,z-.5]} progress={progress}/>)}
    <Box p={[0,1,1.1]} s={[3.8,.13,1.25]}/>
    {[-1.6,1.6].map(x=><Box key={x} p={[x,.7,1.1]} s={[.1,.55,.9]} color={HARBOR.line}/>)}
    <Box p={[.85,1.35,1.05]} s={[.85,.55,.08]} color={HARBOR.ink}/>
    <Box p={[.85,1.35,1.1]} s={[.73,.43,.035]} color={HARBOR.blue}/>
    <Box p={[.85,1.06,1.32]} s={[.95,.04,.35]} color={HARBOR.mid}/>
    <group ref={papers}>{[0,1,2].map(i=><group key={i}><Box s={[.58,.05,.7]} color={HARBOR.paper}/><Box p={[0,.035,0]} s={[.38,.01,.04]} color={HARBOR.blue}/></group>)}</group>
    <mesh position={[-2.3,.96,1.25]}><cylinderGeometry args={[.22,.25,.7,12]}/><HatchedMaterial color={HARBOR.blue}/></mesh>
    <mesh position={[-2.3,1.55,1.25]} scale={[.45,.55,.4]}><icosahedronGeometry args={[1,1]}/><HatchedMaterial color={HARBOR.mid}/></mesh>
  </group>;
}
