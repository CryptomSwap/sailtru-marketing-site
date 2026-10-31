"use client";

/* React Three Fiber intentionally mutates scene objects inside the render loop. */
/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LogoVessel } from "./logo-vessel";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { DeepSpace, Planet, useAsteroidMaterial } from "./space-world";

type ProgressRef = { current: number };


// Camera offsets are authored as shots, not a fixed chase camera. The spline
// preserves continuous velocity when scrolling backwards through a transition.
const cameraRail = new THREE.CatmullRomCurve3([
  new THREE.Vector3(12, 2, 40), // distant, low establishing shot
  new THREE.Vector3(18, 5, 23), // approach the signal from starboard
  new THREE.Vector3(15, 9, 6), // orbit: reveal the side of the vessel
  new THREE.Vector3(-4, 15, -13), // rise and cross behind it
  new THREE.Vector3(-12, 5, -18), // descend into the asteroid passage
  new THREE.Vector3(-5, 3, -13), // follow the vessel into open space
  new THREE.Vector3(17, 19, -30), // pull back to reveal the destination
], false, "catmullrom", .35);

function shipPosition(p: number, target: THREE.Vector3) {
  return target.set(Math.sin(p * Math.PI * 3.15) * (3.2 + p * 2.6), 1.1, -18 + p * 30);
}

const routeVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const routeFragmentShader = `
  uniform float uProgress;
  varying vec2 vUv;
  void main() {
    float travelled = 1.0 - smoothstep(uProgress - 0.018, uProgress + 0.012, vUv.x);
    float leadingGlow = 1.0 - smoothstep(0.0, 0.035, abs(vUv.x - uProgress));
    vec3 color = mix(vec3(0.035, 0.24, 0.9), vec3(0.38, 0.78, 1.0), leadingGlow);
    gl_FragColor = vec4(color, travelled * (0.42 + leadingGlow * 0.42));
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function ModelYacht({ main = false, progressRef }: { main?: boolean; progressRef?: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const smoothed = useRef(0);
  useFrame(({ clock }, delta) => {
    if (!main || !progressRef || !group.current) return;
    smoothed.current += (progressRef.current - smoothed.current) * (1 - Math.exp(-delta * 3.8));
    const p = smoothed.current;
    const x = Math.sin(p * Math.PI * 3.15) * (3.2 + p * 2.6);
    const z = -18 + p * 30;
    const dx = Math.cos(p * Math.PI * 3.15) * Math.PI * 3.15 * (3.2 + p * 2.6) + Math.sin(p * Math.PI * 3.15) * 2.6;
    const yaw = Math.atan2(dx, 30);
    const time = clock.elapsedTime;
    const targetPitch = Math.sin(time * .44 + p * 8) * .025;
    const targetRoll = -Math.sin(p * Math.PI * 3.15) * .13 + Math.sin(time * .62) * .018;
    const settle = 1 - Math.exp(-delta * 5.2);

    group.current.position.set(x, 1.1 + Math.sin(time * .46 + p * 4.2) * .18, z);
    group.current.rotation.order = "YXZ";
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetPitch, settle);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, yaw, settle);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRoll, settle);
  });

  return <group ref={group} scale={main ? .74 : .3}><LogoVessel /></group>;
}

type Rock = [number, number, number, number, number, number, number];

function createRockGeometry(seed: number) {
  const geometry = mergeVertices(new THREE.IcosahedronGeometry(1, 5));
  const position = geometry.getAttribute("position");
  const vertex = new THREE.Vector3();
  const craters = Array.from({ length: 7 }, (_, i) => {
    const a = i * 2.399 + seed;
    const y = -.8 + i * .25;
    return new THREE.Vector3(Math.cos(a) * Math.sqrt(1 - y * y), y, Math.sin(a) * Math.sqrt(1 - y * y));
  });
  for (let index = 0; index < position.count; index += 1) {
    vertex.fromBufferAttribute(position, index);
    let irregularity = 1
      + Math.sin(vertex.x * 3.1 + vertex.y * 2.7 + seed) * .12
      + Math.sin(vertex.z * 5.3 - vertex.x * 3.2 + seed * 2) * .08
      + Math.sin(vertex.z * 31.3 + vertex.y * 24.2) * .012;
    for (const crater of craters) {
      const d = vertex.distanceTo(crater);
      irregularity -= .11 * Math.exp(-d * d * 42);
      irregularity += .025 * Math.exp(-Math.pow((d - .23) * 20, 2));
    }
    vertex.multiplyScalar(irregularity);
    position.setXYZ(index, vertex.x, vertex.y, vertex.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function RockField() {
  const field = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const step = Math.min(delta, .05);
    field.current?.children.forEach((rock, index) => {
      const direction = index % 2 ? -1 : 1;
      rock.rotation.x += step * (.025 + (index % 3) * .009);
      rock.rotation.y += step * (.045 + (index % 4) * .012) * direction;
      rock.rotation.z += step * .012 * direction;
    });
  });
  const geometries = useMemo(() => [1.2, 3.7, 6.1, 9.4].map(createRockGeometry), []);
  const material = useAsteroidMaterial();
  useEffect(() => () => geometries.forEach((geometry) => geometry.dispose()), [geometries]);
  const rocks = useMemo<Rock[]>(() => [
    [-15.2, 2.8, -10, 2.1, 1.2, 1.8, .1], [-11.8, -2.1, -7.2, 1.05, .72, 1.25, .7],
    [14.8, 3.6, -7.8, 2.0, 1.15, 2.15, 1.2], [11.3, -1.5, -3.8, .9, .64, 1.1, .5],
    [-16.0, -3.2, -.8, 2.3, 1.35, 2.0, .9], [-11.4, 2.1, 1.4, 1.15, .74, 1.4, 1.5],
    [15.8, -2.6, 2.5, 2.2, 1.3, 2.1, .25], [11.7, 2.8, 5.0, 1.0, .66, 1.25, 1.8],
    [-16.4, 3.7, 7.2, 1.8, 1.1, 1.8, 1.35], [-12.0, -2.8, 9.1, .86, .56, 1.1, .2],
    [16.8, 2.2, 10.0, 1.9, 1.15, 1.9, 1.65], [12.3, -3.4, 12.5, 1.0, .62, 1.18, .85]
  ], []);

  return (
    <group ref={field}>
      {rocks.map((rock, index) => (
        <group
          key={index}
          position={[rock[0], rock[1], rock[2]]}
          rotation={[.1 * index, rock[6], .06 * index]}
          scale={[rock[3] * .72, rock[4] * .72, rock[5] * .72]}
        >
          <mesh geometry={geometries[index % geometries.length]} material={material} castShadow receiveShadow />
        </group>
      ))}
    </group>
  );
}

function VoyageRoute({ progressRef }: { progressRef: ProgressRef }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const points = Array.from({ length: 65 }, (_, index) => {
      const p = index / 64;
      return new THREE.Vector3(
        Math.sin(p * Math.PI * 3.15) * (3.2 + p * 2.6),
        .075,
        -18 + p * 30,
      );
    });
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 128, .026, 6, false);
  }, []);

  const markers = useMemo(() => [.18, .43, .69, .91].map((p) => [
    Math.sin(p * Math.PI * 3.15) * (3.2 + p * 2.6),
    -18 + p * 30,
  ] as const), []);
  const uniforms = useMemo(() => ({ uProgress: { value: 0 } }), []);

  useFrame(() => {
    if (material.current) material.current.uniforms.uProgress.value = progressRef.current;
  });

  return (
    <group>
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={routeVertexShader}
          fragmentShader={routeFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {markers.map(([x, z], index) => (
        <mesh key={index} position={[x, .09, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[.1, .16, 24]} />
          <meshBasicMaterial color="#b9e6ff" transparent opacity={.75} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function SpaceBackdrop() {
  const stars = useMemo(() => {
    let seed = 417;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const positions = new Float32Array(1800 * 3);
    for (let index = 0; index < 1800; index += 1) {
      positions[index * 3] = (random() - .5) * 150;
      positions[index * 3 + 1] = (random() - .5) * 80;
      positions[index * 3 + 2] = -72 + random() * 115;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);
  useEffect(() => () => stars.dispose(), [stars]);
  return (
    <group>
      <DeepSpace />
      <points geometry={stars}>
        <pointsMaterial color="#d9eeff" size={.065} sizeAttenuation transparent opacity={.7} depthWrite={false} />
      </points>
      <Planet position={[-25, 12, -58]} radius={13} />
      <Planet position={[31, -12, -62]} radius={8} gas />
    </group>
  );
}

function VoyageScene({ progressRef }: { progressRef: ProgressRef }) {
  const { camera, scene, gl } = useThree();
  const hdri = useLoader(HDRLoader, "/hdr/small-harbour-sunset-1k.hdr");
  const smoothed = useRef(0);
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);
  const ship = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#05091a", .0095);
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.16;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    const pmrem = new THREE.PMREMGenerator(gl);
    const environment = pmrem.fromEquirectangular(hdri).texture;
    scene.environment = environment;
    scene.environmentIntensity = .3;
    scene.environmentRotation.set(0, -.55, 0);
    scene.background = new THREE.Color("#05091a");
    return () => {
      scene.fog = null;
      scene.environment = null;
      scene.background = null;
      environment.dispose();
      pmrem.dispose();
    };
  }, [gl, hdri, scene]);

  useFrame((_, delta) => {
    smoothed.current += (progressRef.current - smoothed.current) * (1 - Math.exp(-delta * 3.5));
    const p = smoothed.current;
    shipPosition(p, ship);
    cameraRail.getPoint(p, offset);
    camera.position.copy(ship).add(offset);
    // Widen the final shot while keeping the logo vessel in frame.
    const reveal = THREE.MathUtils.smoothstep(p, .75, 1);
    lookAt.copy(ship);
    lookAt.y += 2;
    lookAt.z += reveal * 1.5;
    // Compose into the empty side of the page, away from each chapter's copy.
    const copyOnRight = Math.exp(-Math.pow((p - .64) / .16, 4));
    const side = THREE.MathUtils.lerp(-3.8, 3.8, copyOnRight);
    const distance = Math.hypot(offset.x, offset.z);
    lookAt.x += offset.z / distance * side;
    lookAt.z -= offset.x / distance * side;
    camera.lookAt(lookAt);
    if (camera instanceof THREE.PerspectiveCamera) {
      const fov = 42 - Math.sin(p * Math.PI) * 7 + reveal * 5;
      if (Math.abs(camera.fov - fov) > .01) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
    }
  });

  return (
    <>
      <ambientLight intensity={.18} color="#829dff" />
      <directionalLight
        position={[-12, 16, 8]}
        intensity={4.2}
        color="#fff1db"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-bias={-.00025}
      />
      <pointLight position={[14, -3, -4]} intensity={26} distance={48} color="#295dff" decay={2} />
      <directionalLight position={[8, 4, -16]} intensity={2.4} color="#6ca7ff" />
      <hemisphereLight args={["#809cff", "#050817", .38]} />
      <SpaceBackdrop />
      <RockField />
      <VoyageRoute progressRef={progressRef} />
      <ModelYacht main progressRef={progressRef} />
    </>
  );
}

export function JourneyThreeStage({ progressRef }: { progressRef: ProgressRef }) {
  return (
    <Canvas
      className="ij-three__canvas"
      camera={{ position: [7.8, 5.4, 18], fov: 38, near: .1, far: 190 }}
      dpr={[1, 1.5]}
      shadows
      performance={{ min: .55 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      fallback={<div className="ij-three__fallback">A static mission view is shown on this device.</div>}
    >
      <Suspense fallback={null}>
        <VoyageScene progressRef={progressRef} />
      </Suspense>
    </Canvas>
  );
}

useLoader.preload(HDRLoader, "/hdr/small-harbour-sunset-1k.hdr");
