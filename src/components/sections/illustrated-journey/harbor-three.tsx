"use client";
import { Canvas } from "@react-three/fiber";
import { Component, Suspense, type ReactNode } from "react";
import { BaySketch as HarborSketch } from "./bay-sketch";
import { BayWorld } from "./bay-world";
import { useLocale } from "next-intl";
class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?<HarborSketch/>:this.props.children;}
}
export function HarborThree({progress}:{progress:{current:number}}){
  const he=useLocale()==="he";
  return <SceneBoundary><Suspense fallback={<HarborSketch/>}>
    <Canvas camera={{position:[-11,9,35],fov:40,near:.1,far:300}} dpr={[1,1.5]} shadows gl={{antialias:true,alpha:true,powerPreference:"high-performance"}} fallback={<HarborSketch/>}>
      <BayWorld progress={progress} he={he}/>
    </Canvas>
  </Suspense></SceneBoundary>;
}
