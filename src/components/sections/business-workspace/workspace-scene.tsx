"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";

export type WorkspaceMotion = { x: number; y: number; scroll: number };
const BLUE = "#345aee";
const INK = "#243146";

function Block({ position, size, color = "#f5f3eb", rotation = 0 }: { position: [number, number, number]; size: [number, number, number]; color?: string; rotation?: number }) {
  const [width, height, depth] = size;
  const edges = useMemo(() => {
    const box = new THREE.BoxGeometry(width, height, depth);
    const outline = new THREE.EdgesGeometry(box);
    box.dispose();
    return outline;
  }, [width, height, depth]);
  useEffect(() => () => edges.dispose(), [edges]);
  return <group position={position} rotation={[0, rotation, 0]}>
    <mesh castShadow receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={.8} /></mesh>
    <lineSegments geometry={edges}><lineBasicMaterial color={color === BLUE ? "#2440aa" : "#a6a9a1"} transparent opacity={.4} /></lineSegments>
  </group>;
}

function Report({ x, z, rotation = 0 }: { x: number; z: number; rotation?: number }) {
  return <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
    {[0, 1, 2].map(i => <Block key={i} position={[i * .06, .18 + i * .14, 0]} size={[2.35, .1, 3.05]} />)}
    <Block position={[-.65, .56, -.96]} size={[.5, .035, .3]} color={BLUE} />
    {[0, 1, 2, 3].map(i => <Block key={i} position={[-.12, .56, -.4 + i * .35]} size={[i === 3 ? 1.1 : 1.7, .035, .065]} color={i === 3 ? BLUE : "#9a9f9e"} />)}
    <Block position={[-.5, .64, .95]} size={[.42, .2, .5]} color="#d8e0f8" />
    <Block position={[.08, .78, .95]} size={[.42, .48, .5]} color="#93a6ed" />
    <Block position={[.66, 1, .95]} size={[.42, .92, .5]} color={BLUE} />
  </group>;
}

function Route({ points }: { points: [number, number, number][] }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), false, "catmullrom", .12), [points]);
  return <mesh><tubeGeometry args={[curve, 50, .018, 5, false]} /><meshBasicMaterial color={BLUE} /></mesh>;
}

function World({ motion, onReady, onFailure }: { motion: RefObject<WorkspaceMotion>; onReady: () => void; onFailure: () => void }) {
  const { camera, invalidate, size, gl } = useThree();
  const hub = useRef<THREE.Group>(null);
  const target = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      // R3F owns this mutable Three camera; updating its projection is an imperative renderer operation.
      // eslint-disable-next-line react-hooks/immutability
      camera.zoom = Math.min(size.width / 13.2, size.height / 10.5);
      camera.updateProjectionMatrix();
      invalidate();
    }
  }, [camera, size.width, size.height, invalidate]);
  useEffect(() => {
    onReady();
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    const restored = () => { onReady(); invalidate(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    gl.domElement.addEventListener("webglcontextrestored", restored);
    return () => { gl.domElement.removeEventListener("webglcontextlost", lost); gl.domElement.removeEventListener("webglcontextrestored", restored); };
  }, [gl, invalidate, onReady, onFailure]);
  // The scene is demand-rendered; the shared motion controller wakes it only while visible.
  useEffect(() => {
    const tick = () => invalidate();
    window.addEventListener("sailtru:workspace-frame", tick);
    return () => window.removeEventListener("sailtru:workspace-frame", tick);
  }, [invalidate]);
  useFrame(() => {
    const { x, y } = motion.current;
    camera.position.set(8.5 + x * 1.1, 10.5 - y * .7 + motion.current.scroll * .8, 12.5 - x * .5);
    target.set(x * .22, -.1, y * .14);
    camera.lookAt(target);
    if (hub.current) hub.current.rotation.y = x * .08;
  });
  return <>
    <ambientLight intensity={1.8} />
    <directionalLight position={[-5, 12, 6]} intensity={3} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} shadow-normalBias={.04} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.12, 0]} receiveShadow><planeGeometry args={[40, 40]} /><shadowMaterial transparent opacity={.12} /></mesh>
    <gridHelper args={[13, 26, "#e5e6df", "#e9eae3"]} position={[0, -.1, 0]} />
    <Report x={-3.5} z={1.2} rotation={-.08} />
    <Block position={[0, .12, 0]} size={[3.25, .24, 3.25]} />
    <group ref={hub}>
      <Block position={[0, .34, 0]} size={[2.4, .16, 2.4]} color={INK} />
      {[0, 1, 2, 3].map(i => <Block key={i} position={[0, .64 + i * .3, 0]} size={[1.65 - i * .15, .19, 1.65 - i * .15]} color={BLUE} rotation={i * .13} />)}
      <mesh position={[0, 2.05, 0]}><octahedronGeometry args={[.47, 0]} /><meshStandardMaterial color={BLUE} metalness={.3} roughness={.3} /></mesh>
    </group>
    <group position={[3.8, 0, -1.4]}>
      <Block position={[0, .15, 0]} size={[2.7, .3, 3.5]} />
      {[-.85, 0, .85].map((z, i) => <group key={z} position={[0, 0, z]}>
        <Block position={[0, .52, 0]} size={[1.95, .38, .58]} color={i === 1 ? BLUE : "#d5dcf0"} />
        <Block position={[-.52, .73, 0]} size={[.16, .04, .16]} color={i === 1 ? "#ffffff" : BLUE} />
        <Block position={[.22, .73, 0]} size={[.73, .04, .055]} color={i === 1 ? "#ffffff" : "#8590a6"} />
      </group>)}
    </group>
    <Route points={[[-2.3, .07, 1.3], [-1.8, .07, 1.3], [-1.8, .07, 0], [-1.2, .07, 0]]} />
    <Route points={[[1.2, .07, 0], [2.2, .07, 0], [2.2, .07, -1.4], [2.8, .07, -1.4]]} />
    {[[-4.5, -2.2], [-3.5, -3.2], [-2.2, -2.7]].map(([x, z], i) => <group key={x}>
      <Block position={[x, .3 + i * .1, z]} size={[.7, .6 + i * .2, .7]} color={i === 1 ? "#b6c5ed" : "#e4e5de"} />
    </group>)}
    <mesh position={[0, .025, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[6.2, 6.215, 100]} /><meshBasicMaterial color="#bfc5bd" transparent opacity={.55} side={THREE.DoubleSide} /></mesh>
  </>;
}

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function WorkspaceScene({ motion, onReady, onFailure }: { motion: RefObject<WorkspaceMotion>; onReady: () => void; onFailure: () => void }) {
  return <SceneBoundary onFailure={onFailure}><Canvas aria-hidden="true" orthographic camera={{ position: [8.5, 10.5, 12.5], zoom: 43, near: .1, far: 100 }} frameloop="demand" dpr={[1, 1.5]} shadows gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}>
    <World motion={motion} onReady={onReady} onFailure={onFailure} />
  </Canvas></SceneBoundary>;
}
