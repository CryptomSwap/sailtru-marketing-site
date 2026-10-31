"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HARBOR } from "./harbor-palette";

export function MainlandHarbor() {
  const geometry=useMemo(()=>{
    const shape=new THREE.Shape();
    // Continue the mainland beyond the camera so the coastline never reads
    // as a rectangular model base in the wider, quieter framing.
    shape.moveTo(-180,-180);shape.lineTo(180,-180);shape.lineTo(180,-7.2);
    shape.bezierCurveTo(13,-6.5,9,-5.2,6.6,-3.9);
    shape.bezierCurveTo(5.4,-3.25,4.2,-3.15,3.1,-3.35);
    shape.bezierCurveTo(1.8,-3.6,.9,-2.25,-.5,-2.05);
    shape.bezierCurveTo(-2.4,-1.75,-3.7,-2.3,-4.9,-3.5);
    shape.bezierCurveTo(-6.2,-4.8,-10,-5.7,-180,-6.9);shape.closePath();
    const g=new THREE.ExtrudeGeometry(shape,{depth:.38,bevelEnabled:true,bevelSize:.11,bevelThickness:.08,bevelSegments:3,steps:1});
    g.rotateX(Math.PI/2);g.translate(0,.04,0);return g;
  },[]);
  const edge=useMemo(()=>{
    const points=[[-4.9,-3.5],[-3.8,-2.45],[-2.4,-1.9],[-.5,-2.05],[1,-2.35],[2.1,-3.35],[3.3,-3.35],[4.6,-3.2],[6.6,-3.9]];
    return new THREE.CatmullRomCurve3(points.map(([x,z])=>new THREE.Vector3(x,.26,z)),false,"centripetal");
  },[]);
  const edgePoints=useMemo(()=>edge.getPoints(90),[edge]);
  const quayBlocks=useMemo(()=>edgePoints.filter((_,i)=>i%6===0).map((point,i)=>({
    point,
    angle:Math.atan2(edge.getTangent(Math.min(1,i*6/90)).x,edge.getTangent(Math.min(1,i*6/90)).z),
  })),[edge,edgePoints]);
  const edgeLine=useMemo(()=>new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(edgePoints),
    new THREE.LineBasicMaterial({color:HARBOR.muted,transparent:true,opacity:.8}),
  ),[edgePoints]);
  useEffect(()=>()=>{geometry.dispose();edgeLine.geometry.dispose();(edgeLine.material as THREE.Material).dispose();},[geometry,edgeLine]);
  return <group>
    <mesh geometry={geometry} receiveShadow castShadow><HatchedMaterial color={HARBOR.paper}/></mesh>
    <mesh position={[0,.14,-3.6]} rotation={[-Math.PI/2,0,0]} receiveShadow>
      <planeGeometry args={[5.8,2.35]}/><HatchedMaterial color={HARBOR.surface}/>
    </mesh>
    <mesh position={[2.65,.16,-3.35]} rotation={[-Math.PI/2,0,.08]} receiveShadow>
      <planeGeometry args={[5.7,1.05]}/><HatchedMaterial color={HARBOR.surface}/>
    </mesh>
    <primitive object={edgeLine}/>
    {quayBlocks.map(({point,angle},i)=><mesh key={i} position={[point.x,.18,point.z]} rotation={[0,angle,0]} castShadow receiveShadow>
      <boxGeometry args={[.38,.22,.16]}/><meshStandardMaterial color={HARBOR.mid} roughness={1}/>
    </mesh>)}
  </group>;
}

// All reeds and shoreline strokes share one draw call. No image downloads.
export function HarborEnvironment() {
  const reeds = useRef<THREE.LineSegments>(null);
  const strokes = useMemo(() => {
    const points: number[] = [];
    const segment = (a: number[], b: number[]) => points.push(...a, ...b);
    for (let i=0;i<220;i++) {
      const x=Math.sin(i*127.1)*14;
      const z=-6-Math.abs(Math.sin(i*311.7))*10;
      const y=.05+Math.sin(x*.25)*.25;
      const h=.12+Math.abs(Math.sin(i*71.3))*.4;
      segment([x,y,z],[x+.13,y+h,z+.09]);
      if(i%3===0) segment([x,y,z],[x-.12,y+h*.7,z]);
    }
    return new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(points,3));
  },[]);
  const stone=useMemo(()=>new THREE.IcosahedronGeometry(1,1),[]);
  const edges=useMemo(()=>new THREE.EdgesGeometry(stone,35),[stone]);
  useEffect(()=>()=>{strokes.dispose();stone.dispose();edges.dispose();},[strokes,stone,edges]);
  useFrame(({clock})=>{if(reeds.current)reeds.current.rotation.z=Math.sin(clock.elapsedTime*.6)*.002;});
  return <group>
    <MainlandHarbor/>
    <lineSegments ref={reeds} geometry={strokes}><lineBasicMaterial color={HARBOR.line} transparent opacity={.32}/></lineSegments>
    {Array.from({length:18},(_,i)=>{
      const x=Math.sin(i*13.7)*13, z=-7-Math.abs(Math.cos(i*4.8))*8;
      const s=.45+(i%4)*.28;
      return <group key={i} position={[x,.1,z]} scale={[s*1.4,s*.8,s]} rotation={[.1,i*.7,.1]}>
        <mesh geometry={stone}><HatchedMaterial color={HARBOR.paper}/></mesh>
        <lineSegments geometry={edges}><lineBasicMaterial color={HARBOR.line} transparent opacity={.3}/></lineSegments>
      </group>;
    })}
    {[-11,-7,6,10].map((x,i)=><group key={x} position={[x,0,-9-i%2*3]}>
      <mesh position={[0,1,0]}><cylinderGeometry args={[.045,.075,2,6]}/><meshBasicMaterial color={HARBOR.mid}/></mesh>
      {[-1,1].map(side=><mesh key={side} position={[side*.4,1.75,0]} rotation={[0,0,-side*.6]}><cylinderGeometry args={[.025,.045,1,6]}/><meshStandardMaterial color={HARBOR.muted}/></mesh>)}
      {([[-.55,2.1,.12,.82],[.5,2.35,-.1,.95],[0,2.85,0,.7]] as const).map(([cx,cy,cz,s],j)=><mesh key={j} position={[cx,cy,cz]} scale={[s,s*.82,s*.8]}><icosahedronGeometry args={[1,1]}/><HatchedMaterial color={HARBOR.paper}/></mesh>)}
    </group>)}
  </group>;
}

export function HatchedMaterial({color}:{color:string}) {
  return <meshStandardMaterial color={color} roughness={1} onBeforeCompile={shader=>{
    shader.fragmentShader=shader.fragmentShader.replace("#include <opaque_fragment>",`
      float shade = 1.0 - clamp(dot(normalize(normal), normalize(vec3(-.5,.8,1.))), 0.0, 1.0);
      float hatch = 1.0-smoothstep(.8,1.6,mod(gl_FragCoord.x+gl_FragCoord.y,7.0));
      float crosshatch = 1.0-smoothstep(.6,1.4,mod(gl_FragCoord.x-gl_FragCoord.y,9.0));
      outgoingLight *= 1.0-hatch*shade*.34-crosshatch*smoothstep(.55,.9,shade)*.16;
      #include <opaque_fragment>
    `);
  }} customProgramCacheKey={()=>"harbor-ink-v3"}/>;
}
