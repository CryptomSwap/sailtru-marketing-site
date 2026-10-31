"use client";

/* Renderer refs hold mutable Three objects, not React state. */
/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CraftedLighthouse } from "./harbor-workshop";
import { storyEase } from "./harbor-narrative";
import { BAY_COLORS as C, BUYER_OUTBOUND, BUYER_INBOUND, COMPETITOR, sampleBayCamera, type BayPoint as Point } from "./bay-story";
import { ClientBoat, BayLabel } from "./client-boats";

type Progress={current:number};
function Material({color=C.paper}:{color?:string}){
  return <meshStandardMaterial color={color} roughness={1} side={THREE.DoubleSide}/>;
}
function Box({p=[0,0,0],s,c=C.paper,r=[0,0,0]}:{p?:Point;s:Point;c?:string;r?:Point}){
  return <mesh position={p} rotation={r} castShadow receiveShadow><boxGeometry args={s}/><Material color={c}/></mesh>;
}
function Line({points,color=C.ink,opacity=.6,width=.02}:{points:Point[];color?:string;opacity?:number;width?:number}){
  const geometry=useMemo(()=>new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),Math.max(8,points.length*5),width,4,false),[points,width]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  return <mesh geometry={geometry}><meshBasicMaterial color={color} transparent opacity={opacity}/></mesh>;
}
function Grow({progress,at,end=at+.08,children}:{progress:Progress;at:number;end?:number;children:ReactNode}){
  const ref=useRef<THREE.Group>(null);
  useFrame(()=>{if(ref.current){const t=storyEase(progress.current,at,end);ref.current.visible=t>.001;ref.current.scale.y=Math.max(.001,t);}});
  return <group ref={ref} visible={false}>{children}</group>;
}
function Plaque({text,p,width=2.5}:{text:string;p:Point;width?:number}){
  const texture=useMemo(()=>{
    const c=document.createElement("canvas");c.width=768;c.height=128;const ctx=c.getContext("2d")!;
    ctx.fillStyle=C.paper;ctx.fillRect(0,0,768,128);ctx.fillStyle=C.ink;ctx.font="600 44px Georgia";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(text,384,67);
    const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;return map;
  },[text]);
  useEffect(()=>()=>texture.dispose(),[texture]);
  return <mesh position={p}><planeGeometry args={[width,width/6]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>;
}

// A continuous crescent shoreline encloses the same cove in every chapter.
const coast:Point[]=[[-7.5,0,3],[-9,0,.2],[-8.4,0,-4],[-5.5,0,-7],[0,0,-8],[5.8,0,-6],[8.6,0,-2],[7.7,0,2],[5.7,0,2.2],[5,0,-.3],[3.1,0,-1.9],[0,0,-2.8],[-3.2,0,-1.5],[-5,0,1.6],[-6.2,0,3.3]];
function Beach({small=false}:{small?:boolean}){
  const {sand,rock,outline}=useMemo(()=>{
    const curve=new THREE.CatmullRomCurve3(coast.map(p=>new THREE.Vector3(...p)),true,"centripetal");
    const points=curve.getPoints(150),shape=new THREE.Shape(points.map(p=>new THREE.Vector2(p.x,-p.z)));
    const sand=new THREE.ExtrudeGeometry(shape,{depth:.42,bevelEnabled:true,bevelThickness:.23,bevelSize:.3,bevelSegments:3,steps:1});sand.rotateX(-Math.PI/2);sand.translate(0,-.02,0);
    const surface=sand.attributes.position;
    for(let i=0;i<surface.count;i++){const x=surface.getX(i),z=surface.getZ(i);surface.setY(i,surface.getY(i)+Math.max(0,-z-4)*.095+.045*Math.sin(x*1.3+z*.7));}
    sand.computeVertexNormals();
    const rock=new THREE.ExtrudeGeometry(shape,{depth:.38,bevelEnabled:true,bevelThickness:.13,bevelSize:.37,bevelSegments:2,steps:1});rock.rotateX(-Math.PI/2);rock.translate(0,-.35,0);
    const outline=new THREE.BufferGeometry().setFromPoints(points.map(p=>p.setY(.15)));
    return {sand,rock,outline};
  },[]);
  useEffect(()=>()=>{sand.dispose();rock.dispose();outline.dispose();},[sand,rock,outline]);
  const shoreLine=useMemo(()=>new THREE.Line(outline,new THREE.LineBasicMaterial({color:C.rock,transparent:true,opacity:.45})),[outline]);
  useEffect(()=>()=>shoreLine.material.dispose(),[shoreLine]);
  return <group>
    <mesh geometry={rock} receiveShadow><Material color={C.rock}/></mesh>
    <mesh geometry={sand} castShadow receiveShadow><Material color={C.shore}/></mesh>
    <primitive object={shoreLine}/>
    {!small&&<>
      <mesh position={[0,.35,-5.8]} scale={[5.8,.68,2]} castShadow receiveShadow><sphereGeometry args={[1,24,12]}/><Material color={C.sand}/></mesh>
      <mesh position={[-5.6,.38,-3.5]} scale={[2.1,.55,3.1]} receiveShadow><sphereGeometry args={[1,16,10]}/><Material color={C.sand}/></mesh>
    </>}
  </group>;
}
function Palm({p,scale=1,lean=1}:{p:Point;scale?:number;lean?:number}){
  const {trunk,leaves,veins}=useMemo(()=>{
    const trunkCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(),new THREE.Vector3(-.15*lean,1,0),new THREE.Vector3(.12*lean,2.1,.04),new THREE.Vector3(.55*lean,3.4,.1)]);
    const trunk=new THREE.TubeGeometry(trunkCurve,20,.095,7,false);
    const vertices:number[]=[],indices:number[]=[],veinPoints:number[]=[];
    for(let j=0;j<8;j++){
      const angle=j*Math.PI/4+.18,base=vertices.length/3;
      const length=1.55+(j%3)*.22;
      for(let i=0;i<=18;i++){
        const t=i/18,rad=t*length,y=3.4+Math.sin(t*Math.PI)*.48-t*t*.6;
        const w=Math.sin(t*Math.PI)*(.22+(i%2)*.09);
        const x=.55*lean+Math.cos(angle)*rad,z=.1+Math.sin(angle)*rad;
        vertices.push(x-Math.sin(angle)*w,y,z+Math.cos(angle)*w,x+Math.sin(angle)*w,y,z-Math.cos(angle)*w);
        if(i<18){const a=base+i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}
        if(i>0){const t0=(i-1)/18,r0=t0*length;veinPoints.push(.55*lean+Math.cos(angle)*r0,3.4+Math.sin(t0*Math.PI)*.48-t0*t0*.6+.015,.1+Math.sin(angle)*r0,x,y+.015,z);}
      }
    }
    const leaves=new THREE.BufferGeometry();leaves.setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));leaves.setIndex(indices);leaves.computeVertexNormals();
    const veins=new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(veinPoints,3));
    return {trunk,leaves,veins};
  },[lean]);
  useEffect(()=>()=>{trunk.dispose();leaves.dispose();veins.dispose();},[trunk,leaves,veins]);
  return <group position={p} scale={scale}>
    <mesh geometry={trunk} castShadow><Material color={C.ink}/></mesh>
    <mesh geometry={leaves} castShadow receiveShadow><Material color={C.leaf}/></mesh>
    <lineSegments geometry={veins}><lineBasicMaterial color={C.ink} transparent opacity={.65}/></lineSegments>
    {[0,1,2].map(i=><mesh key={i} position={[.55*lean+Math.cos(i*2.1)*.13,3.3,.1+Math.sin(i*2.1)*.13]}><sphereGeometry args={[.15,8,6]}/><Material color={C.ink}/></mesh>)}
  </group>;
}
function Rocks(){
  return <group>{[[-7.2,.35,1.7,.8],[-8.1,.25,.7,.6],[-7.8,.5,-.9,1],[6.6,.3,1.4,.7],[7.4,.2,.4,.55],[5.4,.2,-2,.35],[-3,.4,-5,.8]].map(([x,y,z,s],i)=><mesh key={i} position={[x,y,z]} scale={[s,s*.65,s*.85]} rotation={[.15,i*.7,.1]} castShadow receiveShadow><icosahedronGeometry args={[1,1]}/><Material color={i%2?C.rock:C.sand}/></mesh>)}</group>;
}
function Pier({p=[1.5,0,.6],length=5.5,width=1.5,rotation=0}:{p?:Point;length?:number;width?:number;rotation?:number}){
  const n=Math.ceil(length/.27);
  return <group position={p} rotation={[0,rotation,0]}>
    <Box p={[0,.22,0]} s={[width,.16,length]} c={C.ink}/>
    {Array.from({length:n},(_,i)=><Box key={i} p={[0,.34,-length/2+(i+.5)*length/n]} s={[width,.075,length/n-.025]} c={C.shore}/>)}
    {[-1,1].flatMap(side=>[-1,0,1].map((z,i)=><group key={`${side}${i}`} position={[side*width*.5,.15,z*length*.44]}><Box s={[.12,.9,.12]} c={C.ink}/><Box p={[0,.46,0]} s={[.18,.1,.18]} c={C.shore}/></group>))}
    <Line points={[[-width*.5,.57,-length*.44],[-width*.5,.42,0],[-width*.5,.57,length*.44]]} width={.018} opacity={.7}/>
  </group>;
}
function Roof({p=[0,0,0],width=3.3,depth=2.3,color=C.ink}:{p?:Point;width?:number;depth?:number;color?:string}){
  return <group position={p}>
    <Box p={[-width/4,.2,0]} s={[width*.57,.13,depth]} c={color} r={[0,0,.35]}/>
    <Box p={[width/4,.2,0]} s={[width*.57,.13,depth]} c={color} r={[0,0,-.35]}/>
    <Box p={[0,.48,0]} s={[.12,.12,depth+.06]} c={C.ink}/>
    {Array.from({length:9},(_,i)=><group key={i} position={[0,0,-depth/2+(i+.5)*depth/9]}><Box p={[-width/4,.27,0]} s={[width*.57,.025,.025]} c={C.rock} r={[0,0,.35]}/><Box p={[width/4,.27,0]} s={[width*.57,.025,.025]} c={C.rock} r={[0,0,-.35]}/></group>)}
  </group>;
}
function Window({p,blue=false}:{p:Point;blue?:boolean}){
  return <group position={p}>
    <Box s={[.57,.73,.06]} c={C.ink}/><Box p={[0,0,.04]} s={[.45,.61,.02]} c={blue?C.blue:C.rock}/>
    <Box p={[0,0,.06]} s={[.025,.63,.025]} c={C.paper}/><Box p={[0,0,.06]} s={[.47,.025,.025]} c={C.paper}/>
    {[-1,1].map(side=><Box key={side} p={[side*.36,0,0]} s={[.17,.73,.07]} c={C.shore}/>)}
  </group>;
}
function Studio({progress}:{progress:Progress}){
  return <group position={[0,.6,-6.1]}>
    <Box p={[0,.85,0]} s={[3.1,1.7,2.05]}/><Box p={[0,.08,.2]} s={[3.5,.16,2.6]} c={C.sand}/>
    <Roof p={[0,1.75,0]} width={3.5} depth={2.45}/>
    <Box p={[0,.68,1.04]} s={[.66,1.35,.09]} c={C.ink}/><Box p={[0,.66,1.1]} s={[.52,1.25,.03]} c={C.leaf}/>
    <Window p={[-1,.95,1.05]}/><Window p={[1,.95,1.05]}/>
    <Plaque text="YOUR BUSINESS" p={[0,1.56,1.09]} width={1.6}/>
    <Grow progress={progress} at={.53} end={.61}>
      <group position={[2.35,0,-.2]}><Box p={[0,.65,0]} s={[1.55,1.3,1.7]}/><Roof p={[0,1.35,0]} width={1.9} depth={2} color={C.blue}/><Window p={[0,.7,.88]} blue/></group>
      <Box p={[0,1.4,1.63]} s={[3.2,.09,1.18]} c={C.blue} r={[-.12,0,0]}/>
      {[-1.45,1.45].map(x=><Box key={x} p={[x,.68,2.12]} s={[.055,1.36,.055]} c={C.ink}/>)}
      <Box p={[0,.12,1.7]} s={[3.4,.14,1.45]} c={C.shore}/>
    </Grow>
  </group>;
}
function PageBoard({progress}:{progress:Progress}){
  return <Grow progress={progress} at={.54} end={.60}><group position={[-2,.8,-4.3]} rotation={[0,.2,0]}>
    <Box p={[0,.7,0]} s={[1.35,1.5,.12]} c={C.ink}/><Box p={[0,.7,.08]} s={[1.23,1.38,.04]}/>
    <Box p={[0,1.17,.12]} s={[.85,.11,.025]} c={C.ink}/>
    {[0,1,2].map(i=><Grow key={i} progress={progress} at={.575+i*.017} end={.605+i*.017}><Box p={[-.08,.9-i*.19,.12]} s={[.7+i*.05,.055,.025]} c={C.rock}/></Grow>)}
    <Grow progress={progress} at={.625} end={.66}><Box p={[-.1,.27,.12]} s={[.75,.16,.025]} c={C.blue}/></Grow>
    <Box p={[0,-.13,0]} s={[.09,.35,.09]} c={C.ink}/>
  </group></Grow>;
}
function Crane({p,scale=1,progress}:{p:Point;scale?:number;progress:Progress}){
  const jib=useRef<THREE.Group>(null);
  useFrame(()=>{if(jib.current)jib.current.rotation.y=-.5+storyEase(progress.current,.51,.61)*.8;});
  return <group position={p} scale={scale}>
    <Box p={[0,.08,0]} s={[.45,.16,.45]} c={C.ink}/>
    {[-.15,.15].map(x=><Box key={x} p={[x,.9,0]} s={[.045,1.8,.06]} c={C.ink}/>)}
    {[0,1,2,3].map(i=><Box key={i} p={[0,.25+i*.4,0]} s={[.42,.025,.04]} c={C.ink} r={[0,0,i%2?.8:-.8]}/>)}
    <group ref={jib} position={[0,1.85,0]}><Box p={[.45,0,0]} s={[1.7,.08,.1]} c={C.ink}/><Line points={[[-.35,0,0],[0,.45,0],[1.25,0,0]]} width={.013}/><Line points={[[1.15,0,0],[1.15,-.9,0]]} width={.012}/><Box p={[1.15,-1,0]} s={[.25,.22,.25]} c={C.blue}/></group>
  </group>;
}

function MarinaDeck({p,length,width=.65}:{p:Point;length:number;width?:number}){
 const seams=useMemo(()=>{
  const vertices:number[]=[];for(let z=-length/2;z<length/2;z+=.24)vertices.push(-width/2,.39,z,width/2,.39,z);
  return new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));
 },[length,width]);
 useEffect(()=>()=>seams.dispose(),[seams]);
 return <group position={p}>
  <Box p={[0,.27,0]} s={[width,.18,length]} c={C.ink}/><Box p={[0,.37,0]} s={[width,.035,length]} c={C.shore}/>
  <lineSegments geometry={seams}><lineBasicMaterial color={C.rock} transparent opacity={.6}/></lineSegments>
  {[-1,1].flatMap(side=>[-1,1].map(end=><Box key={side+":"+end} p={[side*width*.42,.2,end*length*.47]} s={[.085,.8,.085]} c={C.ink}/>))}
 </group>;
}
function BerthPair({row}:{row:number}){
 return <group>{[-1,1].map(side=><group key={side} position={[side*4,0,row*2.35]}><group rotation={[0,Math.PI/2,0]}><MarinaDeck p={[0,0,-side*1.1]} length={2.2} width={.35}/></group></group>)}</group>;
}
function Marina({progress}:{progress:Progress}){
 return <group>
  <group rotation={[0,Math.PI/2,0]}><MarinaDeck p={[2.7,0,0]} length={8.6} width={.9}/></group>
  {[-1,1].map(side=><MarinaDeck key={side} p={[side*4,0,.2]} length={6}/>) }
  {[0,1].map(row=><BerthPair key={row} row={row}/>)}
  <Grow progress={progress} at={.54} end={.61}>
    {[-1,1].map(side=><MarinaDeck key={side} p={[side*4,0,5.55]} length={4.7}/>) }
    {[2,3].map(row=><BerthPair key={row} row={row}/>)}
  </Grow>
  <Grow progress={progress} at={.84} end={.9}>
    {[-1,1].map(side=><MarinaDeck key={side} p={[side*4,0,10.25]} length={4.7}/>) }
    {[4,5].map(row=><BerthPair key={row} row={row}/>)}
  </Grow>
 </group>;
}
function Sea({progress}:{progress:Progress}){
 const routes=useMemo(()=>[BUYER_OUTBOUND,BUYER_INBOUND].map(curve=>{
   const geometry=new THREE.BufferGeometry().setFromPoints(curve.getPoints(240).map(p=>p.setY(.01)));
   const material=new THREE.LineDashedMaterial({color:C.blue,dashSize:.3,gapSize:.5,transparent:true,opacity:.23});
   const line=new THREE.Line(geometry,material);line.computeLineDistances();return line;
 }),[]);
 const ripples=useMemo(()=>{
   const points:number[]=[];for(let i=0;i<1800;i++){const x=-40+Math.sin(i*127.1)*115,z=8+Math.cos(i*47.7)*90,l=.18+Math.abs(Math.sin(i*13.3))*.8;points.push(x,.005,z,x+l,.005,z-.03);}
   return new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(points,3));
 },[]);
 useEffect(()=>()=>{ripples.dispose();routes.forEach(r=>{r.geometry.dispose();r.material.dispose();});},[routes,ripples]);
 useFrame(()=>routes.forEach((r,i)=>{
   const p=progress.current,t=storyEase(p,i===0?.19:.66,i===0?.305:.815);
   r.visible=t>0;r.geometry.setDrawRange(0,Math.floor(241*t));r.material.opacity=i===0&&p>.47?.08:.22;
 }));
 return <group>
   <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.16,0]}><planeGeometry args={[600,600]}/><meshBasicMaterial color={C.sea} toneMapped={false}/></mesh>
   <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.15,0]} receiveShadow><planeGeometry args={[220,220]}/><shadowMaterial transparent opacity={.13}/></mesh>
   <lineSegments geometry={ripples}><lineBasicMaterial color={C.rock} transparent opacity={.18}/></lineSegments>
   {routes.map((r,i)=><primitive key={i} object={r}/>)}
   {[0,1,2].map(i=><Line key={i} points={[[-8.5-i*.4,.02,5],[-7-i*.4,.02,1],[-4,.02,-1.4+i*.3],[0,.02,-2.6+i*.3],[4.5,.02,-.8+i*.2],[7.8+i*.4,.02,4.5]]} color={C.paper} opacity={.65-i*.17} width={.035}/>) }
 </group>;
}
function Competitor({he}:{he:boolean}){
 return <group position={COMPETITOR}>
   <Beach/><Palm p={[-5,.5,-3]} scale={1.2}/><Palm p={[4.5,.5,-4]} scale={1.1} lean={-1}/>
   <group position={[0,.5,-4.2]}><Box p={[0,1,0]} s={[3.6,2,2.3]}/><Roof p={[0,2.05,0]} width={4} depth={2.6}/><Window p={[-1,1,1.17]}/><Window p={[1,1,1.17]}/></group>
   <Pier p={[1.5,0,1]} length={7} width={1}/><Pier p={[-2.5,0,1]} length={7} width={1}/>
   <BayLabel text={he?"מפרץ המתחרה":"Competitor bay"} sub={he?"ספק א׳ · עסק אחר":"PROVIDER A · ANOTHER BUSINESS"} p={[0,5,-4]} width={10}/>
 </group>;
}
export function BayWorld({progress,he=false}:{progress:Progress;he?:boolean}){
 const {camera,size}=useThree(),target=useMemo(()=>new THREE.Vector3(),[]);
 const portrait=size.width<600;
 useFrame(()=>{
   const fov=sampleBayCamera(progress.current,portrait,camera.position,target);camera.lookAt(target);
   if(camera instanceof THREE.PerspectiveCamera&&camera.fov!==fov){camera.fov=fov;camera.updateProjectionMatrix();}
 });
 return <>
   <color attach="background" args={[C.sea]}/><fog attach="fog" args={[C.sea,130,280]}/>
   <ambientLight intensity={1.05}/><hemisphereLight args={[C.paper,C.rock,.9]}/>
   <directionalLight position={[-12,28,12]} intensity={1.7} castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-32} shadow-camera-right={32} shadow-camera-top={32} shadow-camera-bottom={-32} shadow-normalBias={.045} shadow-bias={-.0001}/>
   <Sea progress={progress}/>
   <group scale={1.35}><Beach/><Rocks/>
     <Palm p={[-5.7,.55,-2.8]} scale={1.25}/><Palm p={[-4.5,.55,-5]} scale={.85} lean={-1}/>
     <Palm p={[5.5,.55,-3.7]} scale={1.15} lean={-1}/><Palm p={[6.9,.55,-1.8]} scale={.8}/><Palm p={[-1.8,.7,-6.5]} scale={1}/>
   </group>
   <Studio progress={progress}/><Marina progress={progress}/>
   <BayLabel text={he?"המפרץ של העסק שלך":"Your business bay"} sub={he?"מקום ללקוחות הבאים שלך":"A PLACE FOR YOUR NEXT CUSTOMERS"} p={[0,6,-6.5]} width={10}/>
   <group position={[-11,0,5]}>
     <mesh position={[0,.02,0]} scale={[1.55,.42,1.4]} castShadow receiveShadow><sphereGeometry args={[1,24,12]}/><Material color={C.shore}/></mesh>
     <CraftedLighthouse position={[0,.35,0]} scale={1.05}/>
   </group>
   <Pier p={[-9.8,0,3.8]} length={3.2} width={.6} rotation={-.75}/>
   <Crane p={[4.1,.75,-4.1]} scale={.75} progress={progress}/>
   <Grow progress={progress} at={.54}><PageBoard progress={progress}/></Grow>
   <Grow progress={progress} at={.85} end={.91}>
     <group position={[-4.3,.65,-5.2]}><Box p={[0,.8,0]} s={[2.1,1.6,1.8]}/><Roof p={[0,1.65,0]} width={2.5} depth={2.2} color={C.ink}/><Window p={[0,.8,.93]} blue/></group>
   </Grow>
   <Competitor he={he}/>
   <ClientBoat progress={progress} hero/>
   {Array.from({length:portrait?4:8},(_,i)=>i===4?null:<ClientBoat key={i} progress={progress} index={i}/>)}
   <Grow progress={progress} at={.87} end={.91}><ClientBoat progress={progress} index={2} moored={[-2.8,0,13.05]}/>
   <ClientBoat progress={progress} index={3} moored={[2.8,0,13.05]}/></Grow>
 </>;
}

// Reusable harbor assets. Camera, routes and narrative belong to the host scene.
export { Beach, Palm, Rocks, Pier, Studio, Crane, Marina, PageBoard, Roof, Window, Box };




