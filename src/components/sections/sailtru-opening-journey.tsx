"use client";

/* eslint-disable react-hooks/immutability, react-hooks/set-state-in-effect */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLocale } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import "./sailtru-opening-journey.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const openingCopy = {
  en: {
    blocks: [
      {
        label: "Dawn fog",
        title: "Can customers find you?",
        body:
          "The journey starts with the boat barely visible in the fog. Customers may be searching, asking AI tools, or following recommendations before they ever reach your site."
      },
      {
        label: "Lighthouse and reef",
        title: "Can visitors take the next step?",
        body:
          "At mid distance, the route passes a lighthouse and reef. The business is visible now, but a visitor still needs to understand the offer and find the right action."
      },
      {
        label: "Close water and chart",
        title: "Know what to improve first.",
        body:
          "The camera closes in through spray. A faint chart and compass sit behind the boat: SailTru turns observations into findings, evidence, recommendations, and measurement."
      }
    ]
  },
  he: {
    blocks: [
      {
        label: "ערפל בוקר",
        title: "האם לקוחות יכולים למצוא אותך?",
        body:
          "המסע מתחיל כשהסירה כמעט נעלמת בערפל. לקוחות עשויים לחפש, לשאול כלי AI או לקבל המלצות עוד לפני שהם מגיעים לאתר."
      },
      {
        label: "מגדלור ושונית",
        title: "האם מבקרים יכולים לעשות את הצעד הבא?",
        body:
          "במרחק ביניים המסלול עובר ליד מגדלור ושונית. העסק כבר נראה, אבל המבקר עדיין צריך להבין את ההצעה ולמצוא את הפעולה הנכונה."
      },
      {
        label: "מים קרובים ומפה",
        title: "לדעת מה לשפר קודם.",
        body:
          "המצלמה מתקרבת דרך רסס מים. מאחורי הסירה מופיעים מפה ומצפן עדינים: SailTru הופכת תצפיות לממצאים, ראיות, המלצות ומדידה."
      }
    ]
  }
};

function getOpeningCopy(locale: string) {
  return locale === "he" ? openingCopy.he : openingCopy.en;
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

const boatCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(1.7, 0.1, -24),
  new THREE.Vector3(0.35, 0.15, -15),
  new THREE.Vector3(-1.4, 0.18, -8.5),
  new THREE.Vector3(0.2, 0.12, -3.8),
  new THREE.Vector3(0.75, 0.16, -1.35)
]);

const cameraCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 2.8, 6.2),
  new THREE.Vector3(0.1, 2.35, 1.8),
  new THREE.Vector3(-0.25, 2.1, -3.6),
  new THREE.Vector3(0.05, 1.75, -6.2)
]);

function WaterMaterial({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uNear: { value: new THREE.Color("#0f78a8") },
          uFar: { value: new THREE.Color("#b9ddeb") },
          uPeach: { value: new THREE.Color("#ffd8a8") }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vWave;
          uniform float uTime;
          uniform float uProgress;
          void main() {
            vUv = uv;
            vec3 p = position;
            float wave = sin((p.x * 1.8) + uTime * 0.7) * 0.08;
            wave += sin((p.y * 2.6) - uTime * 0.42) * 0.04;
            wave *= 0.35 + uProgress * 0.9;
            p.z += wave;
            vWave = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          varying float vWave;
          uniform vec3 uNear;
          uniform vec3 uFar;
          uniform vec3 uPeach;
          uniform float uProgress;
          void main() {
            float wash = smoothstep(0.0, 1.0, vUv.y);
            float paper = sin(vUv.x * 90.0) * sin(vUv.y * 63.0) * 0.03;
            vec3 blue = mix(uNear, uFar, wash + paper);
            vec3 color = mix(uPeach, blue, 0.64 + uProgress * 0.24);
            float alpha = 0.45 + (1.0 - wash) * 0.22 + abs(vWave) * 1.4;
            gl_FragColor = vec4(color, alpha);
          }
        `
      }),
    []
  );

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uProgress.value = progressRef.current;
  });

  return <primitive object={material} attach="material" />;
}

function ProceduralBoat({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const next = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const boat = group.current;
    if (!boat) return;
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const point = boatCurve.getPoint(p);
    boatCurve.getPoint(Math.min(1, p + 0.01), next);
    tangent.copy(next).sub(point).normalize();
    boat.position.copy(point);
    boat.rotation.y = Math.atan2(tangent.x, tangent.z);
    boat.rotation.z = Math.sin(p * Math.PI * 4) * 0.05;
    const scale = THREE.MathUtils.lerp(0.08, 1.0, Math.pow(p, 1.35));
    boat.scale.setScalar(scale);
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.06, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.25, 0.22, 0.42]} />
        <meshStandardMaterial color="#0d244b" roughness={0.55} metalness={0.04} />
      </mesh>
      <mesh position={[0.02, 0.06, -0.02]} rotation={[0, 0, -0.08]}>
        <coneGeometry args={[0.2, 1.48, 3]} />
        <meshStandardMaterial color="#fff8e9" roughness={0.8} metalness={0} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.28, 0.04, 0.02]} rotation={[0, 0, 0.28]}>
        <coneGeometry args={[0.16, 1.18, 3]} />
        <meshStandardMaterial color="#e9f5ff" roughness={0.85} metalness={0} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.42, 8]} />
        <meshStandardMaterial color="#7d5a32" roughness={0.7} />
      </mesh>
    </group>
  );
}

function LighthouseAndReef() {
  return (
    <group position={[-4.1, 0.1, -10.5]}>
      <group position={[0, 0.55, 0]}>
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.18, 0.26, 1.25, 14]} />
          <meshStandardMaterial color="#f1e7d1" roughness={0.88} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.2, 14]} />
          <meshStandardMaterial color="#b75a35" roughness={0.7} />
        </mesh>
        <pointLight position={[0, 1.35, 0.25]} intensity={1.4} distance={5} color="#ffd8a8" />
      </group>
      <mesh position={[0.2, -0.18, 0.15]} rotation={[0.08, 0.3, 0]}>
        <dodecahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color="#57606a" roughness={0.94} />
      </mesh>
      <mesh position={[1.25, -0.3, 0.7]} rotation={[0.2, -0.3, 0.2]}>
        <dodecahedronGeometry args={[0.58, 0]} />
        <meshStandardMaterial color="#34414f" roughness={0.95} />
      </mesh>
    </group>
  );
}

function ChartAndCompass({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const chart = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!chart.current) return;
    const reveal = THREE.MathUtils.smoothstep(progressRef.current, 0.58, 0.92);
    chart.current.rotation.x = -0.9 + reveal * 0.35;
    chart.current.position.y = -0.35 + reveal * 0.28;
    chart.current.traverse((child) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.Material | undefined;
      if (mat && "opacity" in mat) {
        mat.opacity = 0.1 + reveal * 0.62;
      }
    });
  });

  return (
    <group ref={chart} position={[1.4, -0.32, -3.2]} rotation={[-0.78, 0.05, -0.08]}>
      <mesh>
        <planeGeometry args={[4.4, 2.7, 1, 1]} />
        <meshBasicMaterial color="#efe1c4" transparent opacity={0.42} side={THREE.DoubleSide} />
      </mesh>
      {Array.from({ length: 7 }).map((_, index) => (
        <mesh key={index} position={[-1.7 + index * 0.55, 0.05 * Math.sin(index), 0.01]} rotation={[0, 0, index * 0.16]}>
          <planeGeometry args={[0.02, 2.2]} />
          <meshBasicMaterial color="#7d9fc1" transparent opacity={0.28} />
        </mesh>
      ))}
      <mesh position={[-1.35, 0.62, 0.02]}>
        <ringGeometry args={[0.34, 0.36, 48]} />
        <meshBasicMaterial color="#8aa7ba" transparent opacity={0.36} />
      </mesh>
      <mesh position={[-1.35, 0.62, 0.03]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.04, 0.92]} />
        <meshBasicMaterial color="#8aa7ba" transparent opacity={0.36} />
      </mesh>
      <mesh position={[-1.35, 0.62, 0.04]} rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[0.04, 0.92]} />
        <meshBasicMaterial color="#8aa7ba" transparent opacity={0.36} />
      </mesh>
    </group>
  );
}

function PaperFog({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const fog = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!fog.current) return;
    const p = progressRef.current;
    fog.current.position.z = -7 + p * 3;
    fog.current.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0.08, 0.6 - p * 0.75 + index * 0.04);
    });
  });

  return (
    <group ref={fog}>
      {[0, 1, 2, 3].map((index) => (
        <mesh key={index} position={[-2 + index * 1.35, 0.28 + index * 0.05, -9 - index * 3]} rotation={[-0.32, 0, 0.08 * index]}>
          <planeGeometry args={[5.6, 1.45]} />
          <meshBasicMaterial color="#f4efe4" transparent opacity={0.5} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function OpeningScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera, gl } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }, [gl]);

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const camPoint = cameraCurve.getPoint(p);
    camera.position.copy(camPoint);
    const boatPoint = boatCurve.getPoint(Math.min(1, p + 0.05));
    lookAt.copy(boatPoint);
    lookAt.y += THREE.MathUtils.lerp(0.35, 0.05, p);
    camera.lookAt(lookAt);
  });

  return (
    <>
      <color attach="background" args={["#f5efe2"]} />
      <fog attach="fog" args={["#f5efe2", 7, 28]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} color="#ffe1ba" />
      <mesh position={[0, -0.45, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[42, 44, 96, 96]} />
        <WaterMaterial progressRef={progressRef} />
      </mesh>
      <PaperFog progressRef={progressRef} />
      <LighthouseAndReef />
      <ChartAndCompass progressRef={progressRef} />
      <ProceduralBoat progressRef={progressRef} />
    </>
  );
}

function StaticPoster({ reduced }: { reduced: boolean }) {
  return (
    <div className={`opening-poster${reduced ? " opening-poster--reduced" : ""}`} aria-hidden>
      <div className="opening-poster__sun" />
      <div className="opening-poster__water" />
      <div className="opening-poster__lighthouse" />
      <div className="opening-poster__boat opening-poster__boat--far" />
      <div className="opening-poster__boat opening-poster__boat--near" />
      <div className="opening-poster__chart" />
    </div>
  );
}

export function SailtruOpeningJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const invalidateRef = useRef<(() => void) | null>(null);
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);
  const locale = useLocale();
  const t = getOpeningCopy(locale);

  useEffect(() => {
    setWebgl(canUseWebGL());
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || reduced || !webgl) return;

      const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          invalidateRef.current?.();
        }
      });

      gsap.utils.toArray<HTMLElement>(".opening-story__block", root).forEach((block) => {
        gsap.fromTo(
          block,
          { autoAlpha: 0, y: 42, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 74%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    },
    { scope: rootRef, dependencies: [reduced, webgl], revertOnUpdate: true }
  );

  return (
    <section ref={rootRef} className="opening-journey" aria-label="Opening SailTru boat journey prototype">
      <div className="opening-canvas" aria-hidden>
        {webgl && !reduced ? (
          <Canvas
            camera={{ position: [0, 2.8, 6.2], fov: 44, near: 0.1, far: 60 }}
            frameloop="demand"
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            onCreated={({ invalidate }) => {
              invalidateRef.current = invalidate;
              invalidate();
            }}
          >
            <OpeningScene progressRef={progressRef} />
          </Canvas>
        ) : (
          <StaticPoster reduced={reduced} />
        )}
      </div>

      <div className="opening-story">
        {t.blocks.map((block) => (
          <article key={block.title} className="opening-story__block">
            <p>{block.label}</p>
            <h2>{block.title}</h2>
            <span>{block.body}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
