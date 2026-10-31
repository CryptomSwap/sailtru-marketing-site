"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { LogoVessel } from "./logo-vessel";



function Yacht() {
  const root = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!root.current) return;
    root.current.rotation.y = -.58 + Math.sin(clock.elapsedTime * .24) * .055;
    root.current.rotation.z = Math.sin(clock.elapsedTime * .55) * .012;
    root.current.position.y = -.65 + Math.sin(clock.elapsedTime * .7) * .035;
  });

  return (
    <group ref={root} rotation={[0, -.58, 0]} position={[0, -.65, 0]}>
      <LogoVessel />
      <mesh position={[0, .03, .1]} rotation={[-Math.PI / 2, 0, 0]} scale={[2.5, 1.35, 1]} receiveShadow>
        <circleGeometry args={[1.3, 64]} />
        <shadowMaterial transparent opacity={.15} />
      </mesh>
    </group>
  );
}

export function StaticYachtStage({ className = "" }: { className?: string }) {
  return (
    <div className={`ij-yacht-stage ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [10.2, 7.4, 15.8], fov: 35, near: .1, far: 80 }}
        dpr={[1, 1.5]}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, 1.95, 0)}
      >
        <ambientLight intensity={1.8} color="#d9e6ef" />
        <hemisphereLight args={["#ffffff", "#6c89a0", 2.2]} />
        <directionalLight position={[-8, 13, 9]} intensity={4.2} color="#fff5df" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <Suspense fallback={null}><Yacht /></Suspense>
      </Canvas>
    </div>
  );
}


