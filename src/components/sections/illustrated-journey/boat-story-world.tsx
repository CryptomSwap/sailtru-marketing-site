"use client";

/* Scene transforms follow the scroll clock; refs hold renderer objects. */
/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HARBOR as C } from "./harbor-palette";
import { HatchedMaterial } from "./harbor-environment";
import { CraftedHull, CraftedLighthouse } from "./harbor-workshop";
import { ActionHouse } from "./harbor-business-landmarks";
import { sampleHarborCamera } from "./harbor-camera";
import { CLIENT_ROUTES, sampleClientBoat, type VoyagePoint as Point } from "./voyage-model";
import { storyEase } from "./harbor-narrative";

type Progress={current:number};
function Box({p=[0,0,0],s,c=C.paper,r=[0,0,0]}:{p?:Point;s:Point;c?:string;r?:Point}){
  return <mesh position={p} rotation={r} castShadow receiveShadow><boxGeometry args={s}/><HatchedMaterial color={c}/></mesh>;
}
function InkLine({points,color=C.line,dashed=false,opacity=1}:{points:Point[];color?:string;dashed?:boolean;opacity?:number}){
  const line=useMemo(()=>{
    const g=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p)));
    const m=dashed?new THREE.LineDashedMaterial({color,dashSize:.19,gapSize:.13,transparent:true,opacity}):new THREE.LineBasicMaterial({color,transparent:true,opacity});
    const l=new THREE.Line(g,m);l.computeLineDistances();return l;
  },[points,color,dashed,opacity]);
  useEffect(()=>()=>{line.geometry.dispose();line.material.dispose();},[line]);
  return <primitive object={line}/>;
}
function Label({text,position,width=3,blue=false}:{text:string;position:Point;width?:number;blue?:boolean}){
  const ref=useRef<THREE.Group>(null);
  const texture=useMemo(()=>{
    const canvas=document.createElement("canvas");canvas.width=768;canvas.height=128;
    const ctx=canvas.getContext("2d")!;
    ctx.fillStyle=blue?C.blue:C.paper;ctx.beginPath();ctx.roundRect(4,4,760,120,20);ctx.fill();
    ctx.strokeStyle=blue?C.blue:C.line;ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle=blue?"#ffffff":C.ink;ctx.font="600 36px Arial";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(text,384,66);
    const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;return map;
  },[text,blue]);
  useEffect(()=>()=>texture.dispose(),[texture]);
  useFrame(({camera})=>ref.current?.quaternion.copy(camera.quaternion));
  return <group ref={ref} position={position}><mesh renderOrder={5}><planeGeometry args={[width,width/6]}/><meshBasicMaterial map={texture} transparent depthTest={false} depthWrite={false} toneMapped={false}/></mesh></group>;
}
function Island({position,radius=2,seed=0,children}:{position:Point;radius?:number;seed?:number;children?:ReactNode}){
  const {geometry,edge}=useMemo(()=>{
    const shape=new THREE.Shape();
    for(let i=0;i<=64;i++){
      const a=i/64*Math.PI*2,r=radius*(1+.095*Math.sin(a*3+seed)+.07*Math.cos(a*5+seed));
      const x=Math.cos(a)*r,z=Math.sin(a)*r*.8;
      if(i===0)shape.moveTo(x,z);else shape.lineTo(x,z);
    }
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:.65,bevelEnabled:true,bevelSize:.18,bevelThickness:.14,bevelSegments:2,steps:1});
    geometry.rotateX(-Math.PI/2);geometry.translate(0,-.2,0);
    return {geometry,edge:new THREE.EdgesGeometry(geometry,38)};
  },[radius,seed]);
  useEffect(()=>()=>{geometry.dispose();edge.dispose();},[geometry,edge]);
  return <group position={position}>
    <mesh geometry={geometry} castShadow receiveShadow><HatchedMaterial color={C.surface}/></mesh>
    <lineSegments geometry={edge}><lineBasicMaterial color={C.line} transparent opacity={.65}/></lineSegments>
    {Array.from({length:9},(_,i)=>{const a=i*2.399+seed;return <group key={i} position={[Math.cos(a)*radius*.91,-.02,Math.sin(a)*radius*.75]} rotation={[.1,a,.2]}><mesh scale={[.32,.3,.4]} castShadow><icosahedronGeometry args={[1,0]}/><HatchedMaterial color={i%2?C.mid:C.paper}/></mesh></group>;})}
    {children}
  </group>;
}
function Tree({p,scale=1}:{p:Point;scale?:number}){
  return <group position={p} scale={scale}>
    <Box p={[0,.65,0]} s={[.07,1.3,.07]} c={C.line}/>
    {[[-.26,1.3,0,.52],[.22,1.5,.03,.58],[0,1.85,0,.4]].map(([x,y,z,r],i)=><mesh key={i} position={[x,y,z]} scale={[r,r*1.2,r*.8]} castShadow><icosahedronGeometry args={[1,1]}/><HatchedMaterial color={C.paper}/></mesh>)}
  </group>;
}
function Pier({position,length=4,rotation=0,width=1.2}:{position:Point;length?:number;rotation?:number;width?:number}){
  const n=Math.ceil(length/.25);
  return <group position={position} rotation={[0,rotation,0]}>
    <Box p={[0,.22,0]} s={[width,.18,length]} c={C.line}/>
    {Array.from({length:n},(_,i)=><Box key={i} p={[0,.35,-length/2+(i+.5)*length/n]} s={[width,.09,length/n-.025]} c={C.paper}/>)}
    {[-1,1].flatMap(side=>[-1,0,1].map((z,i)=><group key={`${side}${i}`} position={[side*width*.46,.12,z*length*.43]}><Box s={[.12,.85,.12]} c={C.line}/><Box p={[0,.43,0]} s={[.18,.09,.18]} c={C.paper}/></group>))}
  </group>;
}
function Crane({position,scale=1,progress}:{position:Point;scale?:number;progress:Progress}){
  const arm=useRef<THREE.Group>(null);
  useFrame(()=>{if(arm.current)arm.current.rotation.y=-.35+.6*storyEase(progress.current,.015,.09);});
  return <group position={position} scale={scale}>
    <Box p={[0,.08,0]} s={[.75,.2,.75]} c={C.ink}/>
    {[-.23,.23].map(x=><Box key={x} p={[x,1.4,0]} s={[.07,2.8,.1]} c={C.line}/>)}
    {Array.from({length:6},(_,i)=><Box key={i} p={[0,.35+i*.43,0]} s={[.62,.04,.05]} c={C.line} r={[0,0,i%2?.8:-.8]}/>)}
    <group ref={arm} position={[0,2.8,0]}>
      <Box p={[.65,0,0]} s={[2.7,.12,.15]} c={C.ink}/>
      <InkLine points={[[-.7,0,0],[0,.6,0],[1.9,0,0]]}/>
      <Box p={[-.55,-.18,0]} s={[.55,.3,.44]} c={C.mid}/>
      <InkLine points={[[1.8,0,0],[1.8,-1.35,0]]}/>
      <Box p={[1.8,-1.5,0]} s={[.43,.35,.43]} c={C.blue}/>
    </group>
  </group>;
}
function Sail({side=1}:{side?:number}){
  const geometry=useMemo(()=>{
    const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(0,2.05);shape.quadraticCurveTo(.35,1.2,1.05,0);shape.closePath();
    const geo=new THREE.ShapeGeometry(shape,18);geo.rotateY(Math.PI/2);return geo;
  },[]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  return <mesh geometry={geometry} position={[0,.35,side===1?0:.08]} scale={[1,side===1?1:.72,side]} castShadow><meshStandardMaterial color={C.paper} side={THREE.DoubleSide} roughness={1}/></mesh>;
}
function Boat({progress,position,heading=0,scale=1,label,primary=false}:{progress:Progress;position?:Point;heading?:number;scale?:number;label?:string;primary?:boolean}){
  const root=useRef<THREE.Group>(null),hull=useRef<THREE.Group>(null);
  const pos=useMemo(()=>new THREE.Vector3(),[]);
  useFrame(({clock})=>{
    if(!root.current||!hull.current)return;
    if(primary){root.current.rotation.y=sampleClientBoat(progress.current,pos);root.current.position.copy(pos);}
    hull.current.position.y=.14+Math.sin(clock.elapsedTime*.75+(position?.[0]??0))*.035;
    hull.current.rotation.z=Math.sin(clock.elapsedTime*.6)*.012;
  });
  return <group ref={root} position={position} rotation={[0,heading,0]} scale={scale}>
    <group ref={hull}>
      <CraftedHull accent={primary}/>
      <Box p={[0,1.32,0]} s={[.035,2.5,.035]} c={C.ink}/>
      <group rotation={[0,.2,0]}><Sail/><Sail side={-1}/></group>
      <InkLine points={[[0,2.52,0],[0,.3,1.02],[0,.3,-.87],[0,2.52,0]]} color={C.line} opacity={.6}/>
      <Box p={[.13,2.43,0]} s={[.28,.16,.025]} c={primary?C.blue:C.line}/>
      {primary&&<mesh position={[.025,1.14,-.42]} rotation={[0,Math.PI/2,0]}><circleGeometry args={[.17,32]}/><meshBasicMaterial color={C.blue} side={THREE.DoubleSide}/></mesh>}
    </group>
    {label&&<Label text={label} position={[0,3.05,0]} width={primary?2.5:2.1} blue={primary}/>}
  </group>;
}
function ChapterOnly({progress,from,to,children}:{progress:Progress;from:number;to:number;children:ReactNode}){
  const ref=useRef<THREE.Group>(null);
  useFrame(()=>{if(ref.current)ref.current.visible=progress.current>=from&&progress.current<to;});
  return <group ref={ref} visible={false}>{children}</group>;
}
function Routes({progress}:{progress:Progress}){
  const routes=useMemo(()=>CLIENT_ROUTES.map(curve=>{
    const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(90).map(p=>p.setY(.035))),new THREE.LineDashedMaterial({color:C.blue,dashSize:.22,gapSize:.17,transparent:true,opacity:.6}));line.computeLineDistances();return line;
  }),[]);
  useEffect(()=>()=>routes.forEach(l=>{l.geometry.dispose();l.material.dispose();}),[routes]);
  useFrame(()=>routes.forEach((l,i)=>{l.visible=progress.current>.31;l.material.opacity=progress.current>.85?.35:i===2?.8:.18;l.geometry.setDrawRange(0,Math.max(0,Math.floor(91*storyEase(progress.current,.31+i*.025,.39+i*.025))));}));
  return <group>{routes.map((line,i)=><primitive key={i} object={line}/>)}</group>;
}
function Sea(){
  const marks=useMemo(()=>{
    const p:number[]=[];
    for(let i=0;i<440;i++){
      const x=Math.sin(i*127.1)*31,z=8+Math.cos(i*93.7)*26,len=.1+Math.abs(Math.sin(i*11.3))*.4;
      p.push(x,.012,z,x+len,.012,z-.025);
    }
    return new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(p,3));
  },[]);
  useEffect(()=>()=>marks.dispose(),[marks]);
  return <group>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.13,0]} receiveShadow><planeGeometry args={[180,180]}/><meshStandardMaterial color={C.paper} roughness={1}/></mesh>
    <lineSegments geometry={marks}><lineBasicMaterial color={C.muted} transparent opacity={.28}/></lineSegments>
    {[3.5,5,7].map((r,i)=><mesh key={r} rotation={[-Math.PI/2,0,.4]} position={[-4,.02,-2]}><ringGeometry args={[r,r+.014,96,1,.2,Math.PI*1.15]}/><meshBasicMaterial color={C.line} transparent opacity={.14-i*.025}/></mesh>)}
  </group>;
}
function Beacon({progress}:{progress:Progress}){
  const root=useRef<THREE.Group>(null);
  useFrame(()=>{if(root.current){root.current.rotation.y=-.45+storyEase(progress.current,0,.12)*.8;root.current.visible=progress.current<.15||progress.current>.85;}});
  return <group ref={root} position={[-4,5,-2]}><mesh rotation={[Math.PI/2,0,0]} position={[0,-.8,4]}><coneGeometry args={[1.7,8,24,1,true]}/><meshBasicMaterial color={C.blue} transparent opacity={.055} depthWrite={false} side={THREE.DoubleSide}/></mesh></group>;
}
function Opportunity({progress}:{progress:Progress}){
  const token=useRef<THREE.Group>(null);
  useFrame(()=>{if(token.current)token.current.rotation.y=storyEase(progress.current,.35,.43)*.5;});
  return <Island position={[-10,0,7]} radius={2} seed={3}>
    <Tree p={[-.9,.5,-.6]} scale={.8}/><Tree p={[.9,.5,-.7]} scale={.65}/>
    <mesh position={[0,.6,.1]}><cylinderGeometry args={[.95,1.05,.18,48]}/><HatchedMaterial color={C.ink}/></mesh>
    <mesh position={[0,.71,.1]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.87,48]}/><meshBasicMaterial color={C.paper}/></mesh>
    <group ref={token} position={[0,.78,.1]}><mesh scale={[.15,.15,.7]}><octahedronGeometry args={[1,0]}/><meshStandardMaterial color={C.blue}/></mesh></group>
    <ChapterOnly progress={progress} from={.32} to={.5}><Label text="01 / THE OPPORTUNITY" position={[0,2.9,0]} width={3.7}/></ChapterOnly>
  </Island>;
}
function Cargo({progress}:{progress:Progress}){
  const ref=useRef<THREE.Group>(null),point=useMemo(()=>new THREE.Vector3(),[]);
  useFrame(()=>{
    if(!ref.current)return;
    sampleClientBoat(progress.current,point);
    const p=progress.current,delivery=storyEase(p,.53,.61);
    ref.current.visible=p>.35&&p<.68;
    ref.current.position.set(THREE.MathUtils.lerp(point.x,5,delivery),.9+Math.sin(delivery*Math.PI)*2,THREE.MathUtils.lerp(point.z,-.1,delivery));
    ref.current.rotation.y=delivery*.5;
  });
  return <group ref={ref}><Box s={[.65,.8,.14]} c={C.blue}/><Box p={[0,.12,.08]} s={[.4,.045,.02]}/><Box p={[-.05,-.04,.08]} s={[.3,.04,.02]}/></group>;
}
function CrewTasks({progress}:{progress:Progress}){
  const ref=useRef<THREE.Group>(null);
  const destinations:Point[]=[[3,.9,12],[10,.9,16],[10,1.1,10]];
  useFrame(()=>ref.current?.children.forEach((child,i)=>{
    const t=storyEase(progress.current,.71+i*.02,.77+i*.02),end=destinations[i];
    child.position.set(THREE.MathUtils.lerp(7+i*.25-.25,end[0],t),THREE.MathUtils.lerp(1.1,end[1],t)+Math.sin(t*Math.PI)*1.5,THREE.MathUtils.lerp(13,end[2],t));
    child.rotation.y=t*.5;
  }));
  return <ChapterOnly progress={progress} from={.69} to={.85}><group ref={ref}>{[0,1,2].map(i=><group key={i}><Box s={[.45,.5,.12]} c={C.blue}/><Box p={[0,.05,.07]} s={[.25,.03,.02]}/></group>)}</group></ChapterOnly>;
}
export function BoatStoryWorld({progress}:{progress:Progress}){
  const {camera,size}=useThree(),target=useMemo(()=>new THREE.Vector3(),[]);
  useFrame(()=>{
    const fov=sampleHarborCamera(progress.current,size.width<600,camera.position,target);
    camera.lookAt(target);
    if(camera instanceof THREE.PerspectiveCamera&&camera.fov!==fov){camera.fov=fov;camera.updateProjectionMatrix();}
  });
  return <>
    <fog attach="fog" args={[C.paper,38,78]}/>
    <ambientLight intensity={1.25}/><hemisphereLight args={[C.paper,C.mid,1]}/>
    <directionalLight position={[-12,22,9]} intensity={2.2} castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-24} shadow-camera-right={24} shadow-camera-top={24} shadow-camera-bottom={-24} shadow-normalBias={.04} shadow-bias={-.0002}/>
    <Sea/>
    <Island position={[-4,0,-2]} radius={2.25} seed={1}><CraftedLighthouse position={[0,.5,0]} scale={1.12}/><Tree p={[-1.2,.5,-.4]} scale={.55}/></Island>
    <Pier position={[-.8,0,-2]} length={3.4} rotation={Math.PI/2}/>
    <Island position={[4,0,-3]} radius={4} seed={5}>
      <Crane position={[-1,.55,1.4]} scale={1.25} progress={progress}/>
      <Crane position={[1,.55,-1]} scale={.7} progress={progress}/>
      <Crane position={[2.5,.55,-1.8]} scale={.9} progress={progress}/>
      <Tree p={[-2,.5,-1.7]} scale={1.3}/><Tree p={[-1,.5,-2.2]} scale={.9}/>
    </Island>
    <Pier position={[5,0,.7]} length={4.2} width={2}/>
    <group position={[5,0,-1.4]}><ActionHouse progress={progress}/></group>
    <ChapterOnly progress={progress} from={.51} to={.685}><Label text="THE WORKING DOCK" position={[5,4,-1]} width={3.8}/></ChapterOnly>
    <Opportunity progress={progress}/>
    <Island position={[-6,0,16]} radius={2.9} seed={2}>
      <Tree p={[-1.5,.5,-.5]} scale={1.1}/><Tree p={[1.4,.5,-.8]} scale={.7}/>
      {[-.7,.7].map((x,i)=><group key={x}><Box p={[x,1.1,0]} s={[1.05,1.1,.9]}/><mesh position={[x,1.85,0]} rotation={[0,Math.PI/4,0]}><coneGeometry args={[.88,.65,4]}/><HatchedMaterial color={i?C.mid:C.line}/></mesh><Box p={[x,.95,.46]} s={[.35,.65,.03]} c={C.ink}/></group>)}
    </Island>
    <ChapterOnly progress={progress} from={.135} to={.32}>
      <Boat progress={progress} position={[-7,0,11]} heading={.5} scale={1.2} label="STUDIO A"/>
      <Boat progress={progress} position={[-2,0,15]} heading={-.5} scale={1.05} label="STUDIO B"/>
      <InkLine points={[[-7,.03,11],[-5,.03,8],[-2,.03,6]]} dashed opacity={.35}/>
      <InkLine points={[[-2,.03,15],[0,.03,12],[1,.03,9]]} dashed opacity={.35}/>
    </ChapterOnly>
    <Island position={[11,0,9.5]} radius={2.3} seed={7}>
      <Tree p={[1,.5,-.9]} scale={1}/><Tree p={[-1.3,.5,-.6]} scale={.65}/>
      <Box p={[0,1,0]} s={[2.4,.16,1.2]}/>
      {[-.95,.95].map(x=><Box key={x} p={[x,.7,0]} s={[.1,.6,.8]} c={C.line}/>)}
      <Box p={[.45,1.45,-.1]} s={[.9,.6,.09]} c={C.ink}/><Box p={[.45,1.45,-.04]} s={[.77,.47,.025]} c={C.blue}/>
    </Island>
    <ChapterOnly progress={progress} from={.685} to={.85}>
      <Boat progress={progress} position={[3,0,12]} heading={1.6} scale={1.1} label="RESEARCH"/>
      <Boat progress={progress} position={[10,0,16]} heading={-.8} scale={1.1} label="FOLLOW-UP"/>
      <Label text="HUMAN REVIEW" position={[11,2.9,9.5]} width={3.1}/>
    </ChapterOnly>
    <Boat progress={progress} primary scale={1.55} label="YOUR BUSINESS"/>
    <Routes progress={progress}/><Cargo progress={progress}/><CrewTasks progress={progress}/><Beacon progress={progress}/>
  </>;
}
