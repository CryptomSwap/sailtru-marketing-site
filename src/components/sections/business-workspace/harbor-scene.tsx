"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { Beach, Palm, Rocks, Pier, Studio, Crane, Marina, PageBoard, Roof, Window, Box } from "../illustrated-journey/bay-world";
import { CraftedHull, CraftedLighthouse } from "../illustrated-journey/harbor-workshop";
import type { WorkspaceMotion } from "./workspace-scene";

type Progress = { current: number };
type Point = [number, number, number];
const shots: { position: Point; target: Point }[] = [
  { position: [-24, 17, 31], target: [-1, 1, 0] },
  { position: [-12, 30, 28], target: [0, 0, -2] },
  { position: [-14, 12, 19], target: [-3, 1, -3] },
  { position: [17, 9, 14], target: [5, 1, -3] },
  { position: [10, 7, 7], target: [3.4, 1.7, -5.2] },
  { position: [-23, 22, 34], target: [0, 0, 1] },
];

function Vessel({ position, accent = false, scale = 1 }: { position: Point; accent?: boolean; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({clock}) => { if (ref.current) { ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * .65 + position[0]) * .045; ref.current.rotation.z = Math.sin(clock.elapsedTime * .5) * .014; } });
  return <group ref={ref} position={position} scale={scale} rotation={[0, -.4, 0]}>
    <CraftedHull accent={accent} />
    <Box p={[0,.65,-.1]} s={[.65,.45,.9]} c="#f7f5ed" />
    <Box p={[0,.7,.36]} s={[.5,.22,.03]} c="#283c40" />
    <Box p={[0,.92,-.12]} s={[.78,.08,1.05]} c="#f7f5ed" />
    <mesh position={[0,1.65,0]}><cylinderGeometry args={[.018,.018,2,6]}/><meshStandardMaterial color="#48585a"/></mesh>
    <mesh position={[.4,1.7,0]}><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([0,-.65,0,0,.85,0,.8,-.65,0]),3]}/></bufferGeometry><meshStandardMaterial color={accent?"#345aee":"#dddcd1"} side={THREE.DoubleSide}/></mesh>
  </group>;
}

function Water() {
  const geometry = useMemo(() => {
    const vertices: number[] = [];
    for(let i=0;i<650;i++) { const x=Math.sin(i*127.1)*43,z=Math.cos(i*47.7)*36; vertices.push(x,-.08,z,x+.3+Math.abs(Math.sin(i))*1.2,-.08,z-.08); }
    return new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));
  },[]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  return <><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.2,0]} receiveShadow><planeGeometry args={[300,300]}/><meshStandardMaterial color="#e4eae5" roughness={.85}/></mesh><lineSegments geometry={geometry}><lineBasicMaterial color="#93a9a7" transparent opacity={.26}/></lineSegments></>;
}

function Scene({motion,progress,onReady,onFailure,hero}:{motion:RefObject<WorkspaceMotion>;progress:Progress;onReady:()=>void;onFailure:()=>void;hero:boolean}) {
  const {camera,size,gl} = useThree();
  const build = useRef(.48);
  const vectors = useRef({look:new THREE.Vector3(),destination:new THREE.Vector3(),next:new THREE.Vector3()});
  useEffect(()=>{onReady();const lost=(e:Event)=>{e.preventDefault();onFailure();};gl.domElement.addEventListener("webglcontextlost",lost);gl.domElement.addEventListener("webglcontextrestored",onReady);return()=>{gl.domElement.removeEventListener("webglcontextlost",lost);gl.domElement.removeEventListener("webglcontextrestored",onReady);};},[gl,onReady,onFailure]);
  useFrame((_,dt)=>{
    const {look,destination,next}=vectors.current;
    const p=hero?0:Math.max(0,Math.min(1,progress.current));
    build.current=hero?.65:.48+p*.48;
    const segment=Math.min(5.999,p*6), index=Math.floor(segment);
    // A brief transition at the start of each interval, followed by a reading hold.
    const local=Math.min(1,(segment-index)/.38), eased=local*local*(3-2*local);
    const a=shots[Math.max(0,index-1)],b=shots[index];
    destination.set(...a.position).lerp(next.set(...b.position),eased);
    look.set(...a.target).lerp(next.set(...b.target),eased);
    if(hero) { destination.set(-25,18,33);look.set(-1,1,0); }
    if(size.width<600) destination.sub(look).multiplyScalar(1.4).add(look);
    destination.x+=motion.current.x*1.5;destination.y-=motion.current.y*.7;
    look.x+=motion.current.x*.55;
    camera.position.lerp(destination,1-Math.exp(-Math.min(dt,.05)/.16));camera.lookAt(look);
  });
  return <>
    <color attach="background" args={["#e4eae5"]}/><fog attach="fog" args={["#e4eae5",55,105]}/>
    <ambientLight intensity={.9}/><hemisphereLight args={["#fffaf0","#87958d",1.3]}/>
    <directionalLight position={[-16,30,12]} intensity={2.3} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-24} shadow-camera-right={24} shadow-camera-top={24} shadow-camera-bottom={-24} shadow-normalBias={.04}/>
    <Water/>
    <group scale={1.35}><Beach/><Rocks/><Palm p={[-5.7,.55,-2.8]} scale={1.25}/><Palm p={[-4.5,.55,-5]} scale={.85} lean={-1}/><Palm p={[5.5,.55,-3.7]} scale={1.15} lean={-1}/><Palm p={[6.9,.55,-1.8]} scale={.8}/></group>
    <Studio progress={build}/><Marina progress={build}/><PageBoard progress={build}/>
    <group position={[-11,0,5]}><mesh scale={[1.8,.55,1.65]} castShadow receiveShadow><icosahedronGeometry args={[1,1]}/><meshStandardMaterial color="#989f94"/></mesh><CraftedLighthouse position={[0,.4,0]} scale={1.2}/></group>
    <Pier p={[-9.8,0,3.8]} length={3.6} width={.7} rotation={-.75}/>
    <Crane p={[5,.7,-3.8]} scale={1.7} progress={build}/>
    <group position={[5,.5,-6]}><Box p={[0,.75,0]} s={[2.6,1.5,2]}/><Roof p={[0,1.55,0]} width={3} depth={2.4} color="#345aee"/><Window p={[0,.8,1.03]} blue/></group>
    <group position={[22,-.1,-19]} scale={.8}><Beach small/><Box p={[0,1,-4]} s={[3.4,2,2.4]}/><Roof p={[0,2,-4]} width={3.8} depth={2.7}/><Palm p={[-4,.6,-3]}/></group>
    <Vessel position={[-5,.15,9]} accent scale={1.6}/><Vessel position={[3,.15,4]} scale={.8}/><Vessel position={[-2.7,.15,1]} scale={.65}/>
  </>;
}

class Boundary extends Component<{children:ReactNode;onFailure:()=>void},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true};}componentDidCatch(){this.props.onFailure();}render(){return this.state.failed?null:this.props.children;}}
export default function HarborScene({motion,progress,onReady,onFailure,hero=false}:{motion:RefObject<WorkspaceMotion>;progress:Progress;onReady:()=>void;onFailure:()=>void;hero?:boolean}) {
  const wrapper=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(true);
  useEffect(()=>{const node=wrapper.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));observer.observe(node);const visibility=()=>setVisible(!document.hidden&&node.getBoundingClientRect().bottom>0&&node.getBoundingClientRect().top<innerHeight);document.addEventListener("visibilitychange",visibility);return()=>{observer.disconnect();document.removeEventListener("visibilitychange",visibility);};},[]);
  return <div ref={wrapper} className="ht-canvas"><Boundary onFailure={onFailure}><Canvas aria-hidden="true" camera={{position:[-25,18,33],fov:40,near:.1,far:180}} frameloop={visible?"always":"never"} dpr={[1,1.4]} shadows><Suspense fallback={null}><Scene motion={motion} progress={progress} onReady={onReady} onFailure={onFailure} hero={hero}/></Suspense></Canvas></Boundary></div>;
}
