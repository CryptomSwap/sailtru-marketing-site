"use client";
/* Three objects are mutated by the render loop. */

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CraftedHull } from "./harbor-workshop";
import { BAY_COLORS as C, sampleBuyer, sampleClient, type BayPoint } from "./client-voyage";

type Progress={current:number};
const logoPaths=["openai","claude","google","perplexity"].map(n=>`/images/brands/grey/${n}.svg`);
export function ClientBoat({progress,index=0,hero=false,moored}:{progress:Progress;index?:number;hero?:boolean;moored?:BayPoint}){
 const root=useRef<THREE.Group>(null),body=useRef<THREE.Group>(null),badge=useRef<THREE.Sprite>(null);
 const textures=useLoader(THREE.TextureLoader,logoPaths);
 const {size}=useThree();
 const point=useMemo(()=>new THREE.Vector3(),[]),tangent=useMemo(()=>new THREE.Vector3(),[]);
 const boatScale=hero?1.5:.62+(index%3)*.06;
 useFrame(({clock,camera},dt)=>{
   if(!root.current||!body.current)return;
   const heading=moored?(point.set(...moored),Math.PI):hero?sampleBuyer(progress.current,point,tangent):sampleClient(clock.elapsedTime,index,point,tangent);
   root.current.position.copy(point);root.current.position.y=.16+Math.sin(clock.elapsedTime*1.1+index)*.028;
   const delta=Math.atan2(Math.sin(heading-body.current.rotation.y),Math.cos(heading-body.current.rotation.y));
   body.current.rotation.y+=delta*Math.min(1,dt*9);
   body.current.rotation.z=Math.sin(clock.elapsedTime*.75+index)*.018;
   if(badge.current){
     const distance=camera.position.distanceTo(root.current.position);
     const fov=camera instanceof THREE.PerspectiveCamera?camera.fov:43;
     const mobile=size.width<600;
     const pixels=hero?(distance>70?23:mobile?32:42):Math.max(mobile?11:14,Math.min(mobile?21:27,(mobile?620:850)/distance));
     const world=pixels/size.height*2*distance*Math.tan(THREE.MathUtils.degToRad(fov/2));
     badge.current.scale.setScalar(Math.max(.75,Math.min(4,world)));
   }
 });
 return <group ref={root}>
   <group ref={body} scale={boatScale}>
     <CraftedHull accent={hero}/>
     <mesh position={[0,.64,-.1]} castShadow><boxGeometry args={[.63,.42,.85]}/><meshStandardMaterial color={C.paper} roughness={.8}/></mesh>
     <mesh position={[0,.68,.34]} rotation={[-.22,0,0]}><boxGeometry args={[.52,.22,.025]}/><meshStandardMaterial color={C.ink} roughness={.6}/></mesh>
     <mesh position={[0,.88,-.13]} castShadow><boxGeometry args={[.76,.08,1.05]}/><meshStandardMaterial color={C.paper} roughness={1}/></mesh>
     {[-1,1].map(side=><mesh key={side} position={[side*.32,.69,-.12]}><boxGeometry args={[.018,.2,.52]}/><meshStandardMaterial color={C.ink} roughness={.65}/></mesh>)}
     <mesh position={[.2,1.05,-.25]}><cylinderGeometry args={[.009,.009,.35,5]}/><meshStandardMaterial color={C.ink}/></mesh>
   </group>
   <sprite ref={badge} position={[0,hero?3:2,0]} renderOrder={3}><spriteMaterial map={textures[hero?0:index%4]} transparent toneMapped={false} depthWrite={false}/></sprite>
 </group>;
}

export function BayLabel({text,sub,p,width=9}:{text:string;sub:string;p:BayPoint;width?:number}){
 const ref=useRef<THREE.Sprite>(null);
 const {size}=useThree();
 const point=useMemo(()=>new THREE.Vector3(...p),[p]);
 useFrame(({camera})=>{
   if(!ref.current)return;
   const fov=camera instanceof THREE.PerspectiveCamera?camera.fov:43;
   const readable=145/size.height*2*camera.position.distanceTo(point)*Math.tan(THREE.MathUtils.degToRad(fov/2));
   const w=Math.max(width,Math.min(34,readable));ref.current.scale.set(w,w*210/1024,1);
 });
 const texture=useMemo(()=>{
   const canvas=document.createElement("canvas");canvas.width=1024;canvas.height=210;
   const ctx=canvas.getContext("2d")!;
   ctx.fillStyle="#fffefaef";ctx.beginPath();ctx.roundRect(2,2,1020,206,42);ctx.fill();
   ctx.strokeStyle="#d9dfd8";ctx.lineWidth=3;ctx.stroke();ctx.textAlign="center";
   ctx.fillStyle=C.ink;ctx.font="600 59px Arial";ctx.fillText(text,512,88);
   ctx.fillStyle="#748080";ctx.font="29px Arial";ctx.fillText(sub,512,151);
   const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;return map;
 },[text,sub]);
 useEffect(()=>()=>texture.dispose(),[texture]);
 return <sprite ref={ref} position={p} scale={[width,width*210/1024,1]}><spriteMaterial map={texture} transparent toneMapped={false} depthWrite={false}/></sprite>;
}



