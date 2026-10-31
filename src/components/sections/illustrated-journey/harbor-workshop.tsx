"use client";

/* Scene transforms are updated by the renderer, not React state. */
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HARBOR } from "./harbor-palette";
import { HatchedMaterial } from "./harbor-environment";
import { storyEase } from "./harbor-narrative";

const paper=HARBOR.paper, ink=HARBOR.ink, cobalt=HARBOR.blue, brass=HARBOR.muted;
type Point=[number,number,number];
type Progress={current:number};

function Box({p,s,c=paper,r=0}:{p:Point;s:Point;c?:string;r?:number}) {
  return <mesh position={p} rotation={[0,0,r]} castShadow receiveShadow><boxGeometry args={s}/><HatchedMaterial color={c}/></mesh>;
}
function Ring({y,r,c=ink,t=.025}:{y:number;r:number;c?:string;t?:number}) {
  return <mesh position={[0,y,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[r,t,6,48]}/><meshStandardMaterial color={c} roughness={.9}/></mesh>;
}

export function CraftedLighthouse({scale=1,position=[-1.65,.45,-2.4]}:{scale?:number;position?:Point}={}) {
  const lamp=useRef<THREE.Group>(null);
  useFrame((_,dt)=>{if(lamp.current)lamp.current.rotation.y+=Math.min(dt,.05)*.28;});
  return <group position={position} scale={scale}>
    {[0,1,2].map(i=><mesh key={i} position={[0,i*.1,0]} receiveShadow castShadow><cylinderGeometry args={[.85-i*.1,.88-i*.1,.12,32]}/><HatchedMaterial color={i===2?ink:paper}/></mesh>)}
    <mesh position={[0,1.5,0]} castShadow receiveShadow><cylinderGeometry args={[.36,.58,2.6,40]}/><HatchedMaterial color={paper}/></mesh>
    {[.75,1.8].map(y=><mesh key={y} position={[0,y,0]} castShadow><cylinderGeometry args={[.58-(y-.2)/2.6*.22,.59-(y-.2)/2.6*.22,.22,40]}/><HatchedMaterial color={cobalt}/></mesh>)}
    {Array.from({length:14},(_,i)=><Ring key={i} y={.3+i*.18} r={.58-i*.0155} t={.008} c={HARBOR.surface}/>)}
    {[0,1,2,3].map(i=><group key={i} rotation={[0,i*Math.PI/2,0]}>
      <Box p={[0,1.2,.515]} s={[.19,.39,.06]} c={ink}/><Box p={[0,1.2,.55]} s={[.115,.28,.02]} c={HARBOR.surface}/>
      <Box p={[0,1.2,.568]} s={[.02,.3,.02]}/><Box p={[0,1.2,.57]} s={[.13,.02,.02]}/>
      <Box p={[0,2.28,.42]} s={[.13,.25,.05]} c={ink}/>
    </group>)}
    <Box p={[0,.53,.57]} s={[.29,.59,.08]} c={ink}/>
    <Box p={[0,.53,.62]} s={[.23,.52,.035]} c={HARBOR.muted}/>
    <mesh position={[.07,.52,.65]}><sphereGeometry args={[.025,8,6]}/><meshStandardMaterial color={brass}/></mesh>
    <mesh position={[0,2.83,0]} castShadow><cylinderGeometry args={[.64,.52,.15,32]}/><HatchedMaterial color={ink}/></mesh>
    <Ring y={2.95} r={.6} c={brass}/><Ring y={3.22} r={.6}/>
    {Array.from({length:16},(_,i)=><Box key={i} p={[Math.cos(i*Math.PI/8)*.6,3.06,Math.sin(i*Math.PI/8)*.6]} s={[.024,.32,.024]} c={ink}/>)}
    <mesh position={[0,3.18,0]}><cylinderGeometry args={[.38,.38,.55,16]}/><meshStandardMaterial color={HARBOR.surface} transparent opacity={.35} roughness={.65} depthWrite={false}/></mesh>
    <group ref={lamp} position={[0,3.18,0]}>
      <mesh><sphereGeometry args={[.14,16,12]}/><meshStandardMaterial color={HARBOR.paper} emissive={HARBOR.surface} emissiveIntensity={.7}/></mesh>
      <mesh position={[0,0,-.13]} rotation={[Math.PI/2,0,0]}><coneGeometry args={[.2,.2,20,1,true]}/><meshStandardMaterial color={brass} side={THREE.DoubleSide} roughness={.65}/></mesh>
    </group>
    {Array.from({length:8},(_,i)=><Box key={i} p={[Math.cos(i*Math.PI/4)*.39,3.19,Math.sin(i*Math.PI/4)*.39]} s={[.026,.62,.026]} c={ink}/>)}
    <mesh position={[0,3.65,0]} castShadow><coneGeometry args={[.65,.43,16]}/><HatchedMaterial color={cobalt}/></mesh>
    <Ring y={3.45} r={.64} c={ink}/>
    <mesh position={[0,3.95,0]}><sphereGeometry args={[.065,12,8]}/><meshStandardMaterial color={brass} roughness={.7}/></mesh>
    <Box p={[0,4.1,0]} s={[.025,.3,.025]} c={ink}/>
    <Box p={[.12,4.17,0]} s={[.32,.09,.025]} c={brass}/>
  </group>;
}

function Upgrade({progress,at,children}:{progress:Progress;at:number;children:React.ReactNode}) {
  const root=useRef<THREE.Group>(null);
  useFrame(()=>{if(!root.current)return;const t=THREE.MathUtils.smoothstep(progress.current,at,at+.1);root.current.visible=t>.001;root.current.scale.y=Math.max(.001,t);});
  return <group ref={root} visible={false}>{children}</group>;
}

function Crane({position,scale=1,phase=0,progress}:{position:Point;scale?:number;phase?:number;progress:Progress}) {
  const jib=useRef<THREE.Group>(null),cargo=useRef<THREE.Group>(null);
  useFrame(()=>{
    const cycle=storyEase(progress.current,.015+phase*.005,.12+phase*.005);
    if(jib.current)jib.current.rotation.y=-.35+cycle*.7;
    if(cargo.current) { cargo.current.position.y=-1.65+Math.sin(cycle*Math.PI)*.8; }
  });
  return <group position={position} scale={scale}>
    <Box p={[0,0,0]} s={[.65,.18,.65]} c={ink}/>
    {[-.19,.19].map(x=><Box key={x} p={[x,1.25,0]} s={[.075,2.5,.09]} c={brass}/>)}
    {Array.from({length:5},(_,i)=><Box key={i} p={[0,.3+i*.42,0]} s={[.45,.035,.04]} c={ink} r={i%2?.65:-.65}/>)}
    <group ref={jib} position={[0,2.55,0]}>
      <Box p={[.7,0,0]} s={[2.1,.13,.16]} c={brass}/>
      <Box p={[.45,.25,0]} s={[1.7,.035,.04]} c={ink} r={-.28}/>
      <group ref={cargo} position={[1.55,-1.65,0]}><Box p={[0,.65,0]} s={[.018,1.3,.018]} c={ink}/><Box p={[0,0,0]} s={[.35,.3,.35]} c={cobalt}/></group>
    </group>
  </group>;
}

export function HarborWorkshop({progress}:{progress:Progress}) {
  return <group>
    <Upgrade progress={progress} at={-.08}>
      <Crane position={[2,.55,-.5]} scale={1.4} progress={progress}/>
      <Crane position={[3.55,.48,-2.7]} scale={.72} phase={2.1} progress={progress}/>
      <Crane position={[5.55,.5,-3.35]} scale={.95} phase={4.2} progress={progress}/>
    </Upgrade>
    <Upgrade progress={progress} at={.12}>
      <Box p={[4.5,.8,-5]} s={[3.8,1.5,2]}/>
      <Box p={[4.5,1.64,-5]} s={[4.15,.18,2.3]} c={paper}/>
      <Box p={[4.5,1.77,-5]} s={[3.8,.08,2.1]} c={cobalt}/>
      {[-1.2,-.4,.4,1.2].map(x=><group key={x} position={[4.5+x,.9,-3.96]}><Box p={[0,0,0]} s={[.55,.65,.04]} c={ink}/><Box p={[0,0,.03]} s={[.45,.55,.03]} c={HARBOR.surface}/></group>)}
      <Box p={[5.7,2.1,-5]} s={[.06,.7,.06]} c={ink}/>
      <mesh position={[5.7,2.5,-5]} rotation={[.5,0,.5]}><sphereGeometry args={[.35,16,12,0,Math.PI]}/><HatchedMaterial color={paper}/></mesh>
    </Upgrade>
  </group>;
}
export function CraftedHull({accent=true}:{accent?:boolean}={}) {
  const {hull,deck,rim}=useMemo(()=>{
    const outline=new THREE.Shape();outline.moveTo(0,1.1);outline.bezierCurveTo(.56,.62,.62,-.46,.36,-.9);outline.lineTo(-.36,-.9);outline.bezierCurveTo(-.62,-.46,-.56,.62,0,1.1);
    const ring=outline.getPoints(28),n=ring.length,vertices:number[]=[],indices:number[]=[];
    const levels=[[-.25,.3],[-.13,.68],[.08,1],[.2,.96]];
    levels.forEach(([y,scale])=>ring.forEach(p=>vertices.push(p.x*scale,y,p.y*(.88+scale*.12))));
    for(let j=0;j<levels.length-1;j++)for(let i=0;i<n-1;i++){const a=j*n+i,b=a+n;indices.push(a,b,a+1,b,b+1,a+1);}
    const hull=new THREE.BufferGeometry();hull.setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));hull.setIndex(indices);hull.computeVertexNormals();
    const deck=new THREE.ShapeGeometry(outline);deck.rotateX(Math.PI/2);
    const rim=new THREE.BufferGeometry().setFromPoints(ring.map(p=>new THREE.Vector3(p.x*.96,.21,p.y)));
    return {hull,deck,rim};
  },[]);
  useEffect(()=>()=>{hull.dispose();deck.dispose();rim.dispose();},[hull,deck,rim]);
  return <group>
    <mesh geometry={hull} castShadow receiveShadow><meshStandardMaterial color={accent?cobalt:HARBOR.muted} roughness={.95} side={THREE.DoubleSide}/></mesh>
    <mesh geometry={deck} position={[0,.2,0]} scale={[.96,1,1]} receiveShadow><meshStandardMaterial color={HARBOR.surface} side={THREE.DoubleSide} roughness={1}/></mesh>
    <lineLoop geometry={rim}><lineBasicMaterial color={paper}/></lineLoop>
    <Box p={[0,.225,-.5]} s={[.45,.035,.55]} c={ink}/>
    {[-.27,.27].map(x=><Box key={x} p={[x,.27,-.5]} s={[.12,.08,.56]} c={paper}/>)}
    <Box p={[0,.31,.13]} s={[.45,.21,.4]} c={paper}/><Box p={[0,.35,.345]} s={[.36,.12,.025]} c={ink}/>
    {[-.22,.22].map(x=><Box key={x} p={[x,.35,.12]} s={[.025,.1,.27]} c={HARBOR.surface}/>)}
    <Box p={[0,.25,-.93]} s={[.25,.06,.12]} c={ink}/>
    {[-1,1].map(side=><group key={side}>
      {[-.65,-.2,.45].map(z=><Box key={z} p={[side*.46,.31,z]} s={[.018,.22,.018]} c={ink}/>)}
      <Box p={[side*.46,.42,-.1]} s={[.018,.018,1.1]} c={paper}/>
    </group>)}
    {[0,1,2].map(i=><mesh key={i} position={[0,-.055,-1.15-i*.22]} rotation={[-Math.PI/2,0,0]} scale={[1+i*.3,1,1]}><torusGeometry args={[.25+i*.09,.012,4,24,Math.PI]}/><meshBasicMaterial color={HARBOR.paper} transparent opacity={.45-i*.1}/></mesh>)}
  </group>;
}

