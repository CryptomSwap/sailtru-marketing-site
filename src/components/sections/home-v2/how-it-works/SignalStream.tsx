"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { buildCubeField, CUBE_COUNT, LOGO_URLS_LIST, SHARDS, smooth } from "@/components/sections/home-v2/how-it-works/cube-field";
import { streamProgress } from "@/components/sections/home-v2/how-it-works/stream-progress";

const INSTANCES = CUBE_COUNT * SHARDS;
const CUBES_DONE = 0.86;
const LINKS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [1, 4],
  [2, 5],
  [0, 6],
  [3, 6]
];
const INNER = [
  new THREE.Vector3(-0.82, 0.02, 0.14),
  new THREE.Vector3(0, -0.02, 0.2),
  new THREE.Vector3(0.82, 0.02, 0.14)
];
const OUTER = [
  new THREE.Vector3(-1.2, -0.02, 0.1),
  new THREE.Vector3(0, 0.05, 0.38),
  new THREE.Vector3(1.2, -0.02, 0.1)
];
const AGENT_NODES: ReadonlyArray<{ rest: [number, number, number]; scatter: [number, number, number]; r: number }> = [
  { rest: [0.02, 0.06, 0.02], scatter: [0.04, 0.22, 0.08], r: 0.052 },
  { rest: [0.2, 0.16, -0.02], scatter: [0.3, 0.24, 0.06], r: 0.044 },
  { rest: [-0.18, 0.14, 0.02], scatter: [-0.28, 0.22, 0.08], r: 0.048 },
  { rest: [0.16, -0.14, 0.04], scatter: [0.22, -0.26, 0.12], r: 0.042 },
  { rest: [-0.16, -0.08, 0.08], scatter: [-0.26, -0.1, 0.16], r: 0.046 },
  { rest: [0.0, -0.02, -0.1], scatter: [0.06, 0.02, -0.2], r: 0.038 },
  { rest: [-0.02, 0.22, -0.04], scatter: [-0.04, 0.34, 0.02], r: 0.036 }
];
const AGENT_EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 2],
  [1, 6],
  [2, 4],
  [2, 6],
  [3, 5],
  [4, 5],
  [0, 5]
];

type Quality = {
  dpr: number;
  detail: number;
  antialias: boolean;
  segments: number;
};

function readQuality(): Quality {
  const cores = navigator.hardwareConcurrency || 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const weak = cores <= 4 || memory <= 4;
  return {
    dpr: Math.min(window.devicePixelRatio || 1, weak ? 1 : 2),
    detail: weak ? 4 : 5,
    antialias: !weak,
    segments: weak ? 4 : 12
  };
}

function useSvgTexture(url: string, size = 128, inset = 16) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let alive = true;
    let revoke = "";
    const load = async () => {
      const text = await fetch(url).then((response) => response.text());
      const sized = text
        .replace(/<svg\b([^>]*)>/, (_m, attrs: string) => {
          const cleaned = String(attrs).replace(/\s*width="[^"]*"/g, "").replace(/\s*height="[^"]*"/g, "");
          return `<svg width="${size}" height="${size}"${cleaned}>`;
        })
        .replace('filter="url(#shadow)"', "");
      const framed = url.includes("sailtrue-mark")
        ? sized.replace(/viewBox="[^"]*"/, 'viewBox="155 120 280 320"')
        : sized;
      const blob = new Blob([framed], { type: "image/svg+xml" });
      revoke = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        if (!alive) return;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, size, size);
        const inner = size - inset * 2;
        ctx.drawImage(image, inset, inset, inner, inner);
        const next = new THREE.CanvasTexture(canvas);
        next.colorSpace = THREE.SRGBColorSpace;
        next.anisotropy = 4;
        next.needsUpdate = true;
        setTexture(next);
      };
      image.src = revoke;
    };
    void load();
    return () => {
      alive = false;
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [url, size, inset]);

  useEffect(() => () => texture?.dispose(), [texture]);

  return texture;
}

function useSailDecal() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let alive = true;
    let revoke = "";
    const load = async () => {
      const text = await fetch("/images/sailtrue-mark.svg").then((response) => response.text());
      const svg = text
        .replace(/<svg\b([^>]*)>/, (_m, attrs: string) => {
          const cleaned = String(attrs).replace(/\s*width="[^"]*"/g, "").replace(/\s*height="[^"]*"/g, "");
          return `<svg width="512" height="512"${cleaned}>`;
        })
        .replace('filter="url(#shadow)"', "")
        .replace(/viewBox="[^"]*"/, 'viewBox="155 120 280 320"');
      const blob = new Blob([svg], { type: "image/svg+xml" });
      revoke = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        if (!alive) return;
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, 512, 512);
        ctx.drawImage(image, 18, 18, 476, 476);
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = "#f4fbff";
        ctx.fillRect(0, 0, 512, 512);
        const next = new THREE.CanvasTexture(canvas);
        next.colorSpace = THREE.SRGBColorSpace;
        next.anisotropy = 8;
        next.generateMipmaps = true;
        next.minFilter = THREE.LinearMipmapLinearFilter;
        next.magFilter = THREE.LinearFilter;
        next.needsUpdate = true;
        setTexture(next);
      };
      image.src = revoke;
    };
    void load();
    return () => {
      alive = false;
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, []);

  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}

function infinityPoint(phase: number, scale: number, target: THREE.Vector3) {
  const s = Math.sin(phase);
  const c = Math.cos(phase);
  const denom = 1 + s * s;
  target.set((c / denom) * scale, ((s * c) / denom) * scale * 0.62, Math.sin(phase * 2) * 0.1);
}

const OUTPUT_VERT = `
  out vec3 vNormal;
  out vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = -mv.xyz;
    vNormal = normalize(mat3(modelViewMatrix) * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

function createOutputMaterials() {
  const glass = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
    vertexShader: OUTPUT_VERT,
    fragmentShader: `
      in vec3 vNormal;
      in vec3 vView;
      out vec4 fragColor;
      void main() {
        vec3 n = normalize(vNormal);
        vec3 viewDir = normalize(vView);
        float ndv = clamp(abs(dot(n, viewDir)), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 2.7);
        vec3 slate = vec3(0.07, 0.1, 0.16);
        vec3 smoke = vec3(0.18, 0.24, 0.34);
        vec3 silver = vec3(0.86, 0.9, 0.94);
        vec3 cyan = vec3(0.49, 0.9, 1.0);
        vec3 col = mix(slate, smoke, 0.45 + ndv * 0.35);
        col += silver * fres * 0.7;
        col += cyan * pow(fres, 2.6) * 0.18;
        float spec = pow(clamp(dot(n, normalize(vec3(0.22, 0.72, 0.52) + viewDir)), 0.0, 1.0), 80.0);
        col += spec * 0.7;
        fragColor = vec4(col, 0.88 + fres * 0.1);
      }
    `
  });
  const metal = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
    vertexShader: OUTPUT_VERT,
    fragmentShader: `
      in vec3 vNormal;
      in vec3 vView;
      out vec4 fragColor;
      void main() {
        vec3 n = normalize(vNormal);
        vec3 viewDir = normalize(vView);
        float fres = pow(1.0 - clamp(abs(dot(n, viewDir)), 0.0, 1.0), 1.6);
        vec3 graphite = vec3(0.34, 0.39, 0.45);
        vec3 silver = vec3(0.9, 0.93, 0.96);
        float spec = pow(clamp(dot(n, normalize(vec3(0.3, 0.8, 0.4) + viewDir)), 0.0, 1.0), 36.0);
        vec3 col = mix(graphite, silver, fres * 0.8 + spec);
        fragColor = vec4(col, 0.94);
      }
    `
  });
  return { glass, metal };
}

function Outputs({
  glass,
  metal,
  paused
}: {
  glass: THREE.Material;
  metal: THREE.Material;
  paused: boolean;
}) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const agentNodes = useRef<(THREE.Mesh | null)[]>([]);
  const spot = useMemo(() => new THREE.Vector3(), []);
  const sample = useMemo(() => new THREE.Vector3(), []);
  const nodeGeom = useMemo(() => new THREE.IcosahedronGeometry(1, 2), []);
  const cover = useMemo(() => new RoundedBoxGeometry(0.46, 0.62, 0.04, 3, 0.03), []);
  const sheet = useMemo(() => new RoundedBoxGeometry(0.4, 0.54, 0.028, 3, 0.025), []);
  const rule = useMemo(() => new THREE.BoxGeometry(0.24, 0.012, 0.006), []);
  const plinth = useMemo(() => new RoundedBoxGeometry(0.5, 0.06, 0.32, 2, 0.02), []);
  const tower = useMemo(() => new RoundedBoxGeometry(0.18, 0.34, 0.18, 2, 0.02), []);
  const wing = useMemo(() => new RoundedBoxGeometry(0.2, 0.22, 0.2, 2, 0.02), []);
  const lintel = useMemo(() => new RoundedBoxGeometry(0.3, 0.06, 0.14, 2, 0.016), []);
  const cap = useMemo(() => new RoundedBoxGeometry(0.1, 0.1, 0.1, 2, 0.016), []);
  const hairline = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#7ee7ff", transparent: true, opacity: 0.55, depthWrite: false, toneMapped: false }),
    []
  );
  const agentLinks = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(AGENT_EDGES.length * 6), 3));
    const material = new THREE.LineBasicMaterial({
      color: 0xd5dee8,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      toneMapped: false
    });
    const line = new THREE.LineSegments(geometry, material);
    line.frustumCulled = false;
    return line;
  }, []);
  const thread = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(28 * 3), 3));
    const material = new THREE.LineBasicMaterial({
      color: 0xc5d4e2,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false
    });
    const line = new THREE.Line(geometry, material);
    line.frustumCulled = false;
    line.renderOrder = 2;
    return line;
  }, []);

  useEffect(
    () => () => {
      nodeGeom.dispose();
      cover.dispose();
      sheet.dispose();
      rule.dispose();
      plinth.dispose();
      tower.dispose();
      wing.dispose();
      lintel.dispose();
      cap.dispose();
      hairline.dispose();
      agentLinks.geometry.dispose();
      (agentLinks.material as THREE.Material).dispose();
      thread.geometry.dispose();
      (thread.material as THREE.Material).dispose();
    },
    [agentLinks, cap, cover, hairline, lintel, nodeGeom, plinth, rule, sheet, thread, tower, wing]
  );

  useFrame((state) => {
    if (paused) return;
    const t = streamProgress.current;
    const time = state.clock.elapsedTime;
    const build = smooth((t - 0.46) / 0.16);
    const emerge = smooth((t - 0.68) / 0.2);
    const shown = Math.max(build, emerge);
    const calm = 0.3 + emerge * 0.7;
    groups.current.forEach((group, index) => {
      if (!group) return;
      spot.copy(INNER[index]).lerp(OUTER[index], emerge);
      group.position.copy(spot);
      const weight = index === 1 ? 1.16 : 1;
      const breath = 1 + Math.sin(time * 0.32 + index * 0.8) * 0.012 * emerge;
      const retreat = 1 - emerge;
      group.scale.setScalar(
        Math.max(THREE.MathUtils.lerp(0.84, 1.28, emerge) * weight * breath * Math.max(shown, 0.001) * Math.max(retreat, 0.001), 0.001)
      );
      group.visible = false;
      group.rotation.y = Math.sin(time * 0.16 + index * 0.7) * 0.07 * calm;
      group.rotation.x = Math.sin(time * 0.12 + index) * 0.028 * calm;
      group.renderOrder = 3;
      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.renderOrder = 3 + ((mesh.userData.layer as number) || 0);
        const scatter = mesh.userData.scatter as [number, number, number] | undefined;
        const rest = mesh.userData.rest as [number, number, number] | undefined;
        if (!scatter || !rest) return;
        mesh.position.set(
          THREE.MathUtils.lerp(scatter[0], rest[0], build),
          THREE.MathUtils.lerp(scatter[1], rest[1], build),
          THREE.MathUtils.lerp(scatter[2], rest[2], build)
        );
      });
    });
    const linkAttr = agentLinks.geometry.getAttribute("position") as THREE.BufferAttribute;
    AGENT_EDGES.forEach(([from, to], index) => {
      const a = agentNodes.current[from];
      const b = agentNodes.current[to];
      if (!a || !b) return;
      linkAttr.setXYZ(index * 2, a.position.x, a.position.y, a.position.z);
      linkAttr.setXYZ(index * 2 + 1, b.position.x, b.position.y, b.position.z);
    });
    linkAttr.needsUpdate = true;
    const left = groups.current[0]?.position;
    const mid = groups.current[1]?.position;
    const right = groups.current[2]?.position;
    if (left && mid && right) {
      const attr = thread.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < 28; i++) {
        const u = i / 27;
        const k = u < 0.5 ? u * 2 : (u - 0.5) * 2;
        const s = k * k * (3 - 2 * k);
        if (u < 0.5) sample.lerpVectors(left, mid, s);
        else sample.lerpVectors(mid, right, s);
        sample.y += Math.sin(k * Math.PI) * 0.045;
        attr.setXYZ(i, sample.x, sample.y, sample.z - 0.08);
      }
      attr.needsUpdate = true;
    }
    const threadMat = thread.material as THREE.LineBasicMaterial;
    threadMat.opacity = 0;
    thread.visible = false;
  });

  return (
    <>
      <primitive object={thread} />
      <group ref={(node) => { groups.current[0] = node; }}>
        {AGENT_NODES.map((node, index) => (
          <mesh
            key={index}
            ref={(item) => { agentNodes.current[index] = item; }}
            geometry={nodeGeom}
            material={index === 1 || index === 4 ? metal : glass}
            scale={node.r}
            userData={{ rest: node.rest, scatter: node.scatter, layer: 1 }}
          />
        ))}
        <primitive object={agentLinks} />
      </group>
      <group ref={(node) => { groups.current[1] = node; }}>
        <mesh geometry={cover} material={metal} userData={{ rest: [-0.02, 0, -0.07], scatter: [-0.16, 0.08, -0.02], layer: 0 }} />
        <mesh geometry={sheet} material={glass} userData={{ rest: [0.012, 0.01, -0.02], scatter: [0.08, -0.1, 0.06], layer: 1 }} />
        <mesh geometry={sheet} material={glass} scale={[0.92, 0.92, 1]} userData={{ rest: [0.03, -0.008, 0.03], scatter: [0.16, 0.12, 0.14], layer: 2 }} />
        <mesh geometry={rule} material={hairline} userData={{ rest: [0.02, 0.16, 0.055], scatter: [0.18, 0.28, 0.12], layer: 3 }} />
        <mesh geometry={rule} material={metal} userData={{ rest: [0.02, 0.08, 0.055], scatter: [-0.14, 0.16, 0.16], layer: 3 }} />
        <mesh geometry={rule} material={metal} scale={[0.82, 1, 1]} userData={{ rest: [0.0, 0.0, 0.055], scatter: [0.12, -0.02, 0.18], layer: 3 }} />
        <mesh geometry={rule} material={metal} scale={[0.62, 1, 1]} userData={{ rest: [-0.02, -0.08, 0.055], scatter: [-0.1, -0.2, 0.12], layer: 3 }} />
      </group>
      <group ref={(node) => { groups.current[2] = node; }}>
        <mesh geometry={plinth} material={metal} userData={{ rest: [0, -0.18, 0], scatter: [0.02, -0.34, 0.04], layer: 0 }} />
        <mesh geometry={wing} material={glass} userData={{ rest: [-0.12, -0.02, 0.02], scatter: [-0.26, -0.04, 0.12], layer: 1 }} />
        <mesh geometry={tower} material={glass} userData={{ rest: [0.11, 0.04, -0.01], scatter: [0.24, 0.08, -0.1], layer: 1 }} />
        <mesh geometry={lintel} material={metal} userData={{ rest: [0.0, 0.2, 0.02], scatter: [0.02, 0.34, 0.12], layer: 2 }} />
        <mesh geometry={cap} material={metal} userData={{ rest: [0.11, 0.28, -0.01], scatter: [0.2, 0.42, 0.06], layer: 2 }} />
      </group>
    </>
  );
}

function createArcMaterial(glow: boolean) {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
    uniforms: {
      uReveal: { value: 0 },
      uTime: { value: 0 },
      uGlow: { value: glow ? 1 : 0 }
    },
    vertexShader: `
      out vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      in vec2 vUv;
      uniform float uReveal;
      uniform float uTime;
      uniform float uGlow;
      out vec4 fragColor;
      void main() {
        if (vUv.y > uReveal) discard;
        float head = smoothstep(1.0, 0.88, vUv.y);
        float root = smoothstep(0.0, 0.06, vUv.y);
        float bead = exp(-pow((fract(vUv.y * 0.4 - uTime * 0.16) - 0.1) * 11.0, 2.0));
        vec3 col = mix(vec3(0.45, 0.8, 1.0), vec3(0.95, 0.99, 1.0), bead);
        float alpha = mix(0.55, 0.16, uGlow) * (0.72 + bead * 0.28) * root * head;
        fragColor = vec4(col, alpha);
      }
    `
  });
}

function createHeroMaterial() {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    toneMapped: false,
    uniforms: {
      uPulse: { value: 0 },
      uBoost: { value: 1 }
    },
    vertexShader: `
      out vec3 vNormal;
      out vec3 vView;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView = -mv.xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      in vec3 vNormal;
      in vec3 vView;
      uniform float uPulse;
      uniform float uBoost;
      out vec4 fragColor;
      void main() {
        vec3 n = normalize(vNormal);
        vec3 viewDir = normalize(vView);
        float ndv = clamp(abs(dot(n, viewDir)), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 1.45);
        vec3 tint = vec3(0.62, 0.82, 1.0);
        vec3 ice = vec3(0.94, 0.98, 1.0);
        vec3 col = mix(tint, ice, fres);
        float alpha = 0.05 + fres * 0.9;
        if (gl_FrontFacing) {
          vec3 light = normalize(vec3(0.35, 0.86, 0.5));
          float spec = pow(clamp(dot(n, normalize(light + viewDir)), 0.0, 1.0), 18.0);
          col += spec * 1.35;
          alpha += spec * 0.45;
        } else {
          alpha *= 0.75;
        }
        col += ice * (0.12 + uPulse * 0.28) * uBoost;
        alpha = clamp(alpha + uBoost * 0.08, 0.0, 1.0);
        fragColor = vec4(col, alpha);
      }
    `
  });
}

function createBeamMaterial() {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    toneMapped: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uAmount: { value: 0 },
      uPulse: { value: 0 }
    },
    vertexShader: `
      out vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      in vec2 vUv;
      uniform float uAmount;
      uniform float uPulse;
      out vec4 fragColor;
      void main() {
        float fall = 0.2 + 0.4 * (1.0 - vUv.y);
        vec3 col = mix(vec3(0.4, 0.75, 1.0), vec3(0.88, 0.97, 1.0), uPulse);
        fragColor = vec4(col, fall * uAmount);
      }
    `
  });
}

function LivingStream({
  quality,
  paused,
  onReady
}: {
  quality: Quality;
  paused: boolean;
  onReady?: () => void;
}) {
  const field = useMemo(() => buildCubeField(), []);
  const cubeGeom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const cubeMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        toneMapped: false,
        vertexShader: `
          out vec3 vNormal;
          out vec3 vView;
          void main() {
            vec4 local = instanceMatrix * vec4(position, 1.0);
            vec4 mv = modelViewMatrix * local;
            vView = -mv.xyz;
            vNormal = normalize(mat3(modelViewMatrix) * mat3(instanceMatrix) * normal);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          in vec3 vNormal;
          in vec3 vView;
          out vec4 fragColor;
          void main() {
            vec3 n = normalize(vNormal);
            vec3 viewDir = normalize(vView);
            float ndv = clamp(abs(dot(n, viewDir)), 0.0, 1.0);
            float fres = pow(1.0 - ndv, 1.45);

            vec3 tint = vec3(0.62, 0.82, 1.0);
            vec3 ice = vec3(0.94, 0.98, 1.0);
            vec3 col = mix(tint, ice, fres);
            float alpha = 0.05 + fres * 0.9;

            if (gl_FrontFacing) {
              vec3 light = normalize(vec3(0.35, 0.86, 0.5));
              float spec = pow(clamp(dot(n, normalize(light + viewDir)), 0.0, 1.0), 18.0);
              col += spec * 1.35;
              alpha += spec * 0.45;
            } else {
              alpha *= 0.75;
            }

            fragColor = vec4(col, clamp(alpha, 0.0, 1.0));
          }
        `
      }),
    []
  );
  const outputMats = useMemo(() => createOutputMaterials(), []);
  const arcGeom = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 8, 1, true), []);
  const arcs = useMemo(
    () =>
      LINKS.map(() => {
        const coreMat = createArcMaterial(false);
        const glowMat = createArcMaterial(true);
        const glow = new THREE.Mesh(arcGeom, glowMat);
        const core = new THREE.Mesh(arcGeom, coreMat);
        glow.scale.set(0.008, 1, 0.008);
        core.scale.set(0.0022, 1, 0.0022);
        glow.renderOrder = 5;
        core.renderOrder = 6;
        const group = new THREE.Group();
        group.add(glow, core);
        group.visible = false;
        return { group, coreMat, glowMat };
      }),
    [arcGeom]
  );
  const heroMat = useMemo(() => createHeroMaterial(), []);
  const beamMat = useMemo(() => createBeamMaterial(), []);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const hero = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);
  const logos = useRef<(THREE.Group | null)[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const slot = useMemo(() => new THREE.Vector3(), []);
  const tumble = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const reported = useRef(false);
  const logoBorn = useRef<number | null>(null);
  const lineBorn = useRef<number | null>(null);
  const scanBorn = useRef<number | null>(null);
  const yUp = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const textures = [
    useSvgTexture(LOGO_URLS_LIST[0]),
    useSvgTexture(LOGO_URLS_LIST[1]),
    useSvgTexture(LOGO_URLS_LIST[2]),
    useSvgTexture(LOGO_URLS_LIST[3]),
    useSvgTexture(LOGO_URLS_LIST[4]),
    useSvgTexture(LOGO_URLS_LIST[5]),
    useSvgTexture(LOGO_URLS_LIST[6])
  ];
  const sail = useSailDecal();
  const loaded = textures.filter(Boolean).length;

  useEffect(() => {
    camera.position.set(0.12, 0.28, 7.15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(
    () => () => {
      cubeGeom.dispose();
      cubeMat.dispose();
      outputMats.glass.dispose();
      outputMats.metal.dispose();
      arcGeom.dispose();
      heroMat.dispose();
      beamMat.dispose();
      arcs.forEach((arc) => {
        arc.coreMat.dispose();
        arc.glowMat.dispose();
      });
    },
    [cubeGeom, cubeMat, arcGeom, arcs, outputMats, heroMat, beamMat]
  );

  useEffect(() => {
    invalidate();
  }, [invalidate, loaded, sail]);

  useFrame((state) => {
    if (paused) return;
    if (!reported.current) {
      reported.current = true;
      onReady?.();
    }
    const t = streamProgress.current;
    const time = state.clock.elapsedTime;
    if (logoBorn.current === null) logoBorn.current = time;
    const lived = time - logoBorn.current;
    // Timeline is 5s: understand @ 1.2 → t 0.24, implement @ 2.15 → t 0.43, optimize @ 3.4 → t 0.68.
    // The orbit holds through implement and leaves as the stage 4 panels arrive.

    const current = mesh.current;
    if (!current) return;

    if (t >= CUBES_DONE) {
      current.visible = false;
    } else {
      let alive = false;
      for (let i = 0; i < INSTANCES; i++) {
        const cube = Math.floor(i / SHARDS);
        const shard = i % SHARDS;
        const gather = smooth((t - 0.245 - field.delay[cube] * 0.07) / 0.17);
        const absorb = smooth((t - 0.68 - field.delay[cube] * 0.02) / 0.1);
        const drift = 1 - gather;
        infinityPoint(field.along[cube] * Math.PI * 2 + time * 0.5, 0.96, slot);
        pos.copy(field.home[cube]).lerp(slot, gather);
        pos.x += Math.sin(time * 0.45 + cube) * 0.07 * drift;
        pos.y += Math.cos(time * 0.36 + cube * 1.2) * 0.07 * drift;
        pos.z += Math.sin(time * 0.28 + cube * 0.7) * 0.04 * drift;

        let scale = 0;
        if (shard === 0) {
          scale = field.size[cube] * (1 - absorb);
        } else {
          const burst = smooth((absorb - 0.1) / 0.32);
          const fade = 1 - smooth((absorb - 0.55) / 0.32);
          const dir = field.shardDir[(cube * (SHARDS - 1) + (shard - 1)) % field.shardDir.length];
          pos.addScaledVector(dir, burst * 0.1);
          scale = field.size[cube] * 0.4 * burst * fade;
        }

        euler.set(time * 0.12 + cube * 0.4 + shard, time * 0.08 + cube * 0.2, cube * 0.15);
        tumble.setFromEuler(euler);
        dummy.position.copy(pos);
        dummy.quaternion.copy(tumble);
        dummy.scale.setScalar(Math.max(scale, 0.0001));
        dummy.updateMatrix();
        current.setMatrixAt(i, dummy.matrix);
        if (scale > 0.02) alive = true;
      }
      current.instanceMatrix.needsUpdate = true;
      current.visible = alive;
      current.renderOrder = 1;
    }

    logos.current.forEach((group, index) => {
      if (!group) return;
      const cube = field.logoOf[index];
      const timed = smooth((lived - 0.2 - index * 0.48) / 0.22);
      const scrolled = smooth((t - 0.02 - index * 0.04) / 0.07);
      const popIn = Math.max(timed, scrolled);
      const enter = smooth((t - 0.25 - index * 0.016) / 0.16);
      const fade = smooth((t - 0.68 - index * 0.006) / 0.1);
      const drift = (1 - enter) * popIn;
      infinityPoint((index / 7) * Math.PI * 2 + time * 0.42, 0.88, slot);
      pos.copy(field.home[cube]).lerp(slot, enter);
      pos.x += Math.sin(time * 0.45 + cube) * 0.07 * drift;
      pos.y += Math.cos(time * 0.36 + cube * 1.2) * 0.07 * drift;
      pos.z += Math.sin(time * 0.28 + cube * 0.7) * 0.04 * drift;
      group.position.set(pos.x, pos.y, pos.z + 0.52);
      group.lookAt(camera.position);
      group.renderOrder = 10;
      const overshoot = 1 + Math.sin(popIn * Math.PI) * (popIn < 0.999 ? 0.22 : 0);
      const scale = 0.44 * popIn * overshoot * (1 - fade);
      group.scale.setScalar(Math.max(scale, 0.001));
      group.visible = scale > 0.04;
    });

    if (t < 0.42) lineBorn.current = null;
    else if (lineBorn.current === null) lineBorn.current = time;
    const lineLived = lineBorn.current === null ? 0 : time - lineBorn.current;
    const lineGate = smooth((t - 0.435) / 0.03);
    const linkFade = 1 - smooth((t - 0.68) / 0.1);

    LINKS.forEach(([from, to], index) => {
      const a = logos.current[from];
      const b = logos.current[to];
      const arc = arcs[index];
      if (!a || !b || !arc) return;
      const timed = smooth((lineLived - index * 0.4) / 0.45);
      const scrolled = smooth((t - 0.495 - index * 0.0155) / 0.05);
      const reveal = lineGate * linkFade * Math.max(timed, scrolled);
      if (reveal < 0.02) {
        arc.group.visible = false;
        return;
      }
      dir.copy(b.position).sub(a.position);
      const len = dir.length();
      if (len < 1e-4) {
        arc.group.visible = false;
        return;
      }
      dir.multiplyScalar(1 / len);
      const draw = Math.min(1, reveal);
      mid.copy(a.position).addScaledVector(dir, len * draw * 0.5);
      arc.group.position.copy(mid);
      arc.group.quaternion.setFromUnitVectors(yUp, dir);
      arc.group.scale.set(1, Math.max(len * draw, 0.0001), 1);
      arc.group.visible = true;
      arc.coreMat.uniforms.uReveal.value = 1;
      arc.glowMat.uniforms.uReveal.value = 1;
      arc.coreMat.uniforms.uTime.value = time;
      arc.glowMat.uniforms.uTime.value = time;
    });

    const heroGroup = hero.current;
    if (heroGroup) {
      const toAbove = smooth((t - 0.22) / 0.14);
      const toLeft = smooth((t - 0.43) / 0.16);
      const leave = smooth((t - 0.68) / 0.12);
      const focusRight = smooth((t - 0.4) / 0.1);
      const pulse = 0.5 + 0.5 * Math.sin(time * 2.35);
      const boost = (0.55 + toAbove * 0.55) * (1 - leave);
      heroMat.uniforms.uPulse.value = pulse;
      heroMat.uniforms.uBoost.value = boost;
      pos.set(
        THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.58, 0.04, toAbove), -0.88, toLeft),
        THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.08, 0.92, toAbove), 0.62, toLeft),
        THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.18, 0.1, toAbove), 0.14, toLeft)
      );
      const live = 1 - leave;
      pos.x += Math.sin(time * 0.65) * 0.055 * live;
      pos.y += Math.sin(time * 1.12) * 0.06 * live;
      pos.z += Math.cos(time * 0.82) * 0.04 * live;
      heroGroup.position.copy(pos);
      euler.set(
        Math.sin(time * 0.58) * 0.18 * live,
        Math.sin(time * 0.47) * 0.32 * live,
        Math.sin(time * 0.74) * 0.12 * live
      );
      heroGroup.quaternion.setFromEuler(euler);
      const shown = 0.38 * live;
      heroGroup.scale.setScalar(Math.max(shown, 0.001));
      heroGroup.visible = shown > 0.03;
      if (t < 0.03) scanBorn.current = null;
      else if (t < 0.24 && scanBorn.current === null) scanBorn.current = time;
      const scanAge = scanBorn.current === null ? 1 : time - scanBorn.current;
      const scanPulse = scanAge >= 0 && scanAge <= 0.5 ? Math.sin((scanAge / 0.5) * Math.PI) : 0;
      const beamMesh = beam.current;
      if (beamMesh) {
        const hover = toAbove * 0.16 * (1 - toLeft);
        const amount = (scanPulse * 0.34 + hover) * live * (0.85 + pulse * 0.15);
        beamMat.uniforms.uAmount.value = amount;
        beamMat.uniforms.uPulse.value = pulse;
        slot.set(THREE.MathUtils.lerp(-0.42, -0.06, focusRight), THREE.MathUtils.lerp(0, 0.05, focusRight), 0);
        dir.copy(slot).sub(pos);
        const len = Math.max(dir.length(), 0.001);
        dir.multiplyScalar(1 / len);
        mid.copy(pos).addScaledVector(dir, len * 0.5);
        beamMesh.position.copy(mid);
        beamMesh.quaternion.setFromUnitVectors(yUp, dir);
        beamMesh.scale.set(1, len, 1);
        beamMesh.visible = amount > 0.02;
      }
    }
  });

  return (
    <group scale={1.22} position={[0.22, 0, 0]}>
      <group ref={hero} renderOrder={8}>
        <mesh geometry={cubeGeom} material={heroMat} renderOrder={8} />
        {sail ? (
          <mesh position={[0, 0, 0.51]} renderOrder={9}>
            <planeGeometry args={[0.68, 0.68]} />
            <meshBasicMaterial
              map={sail}
              transparent
              opacity={0.92}
              depthWrite={false}
              depthTest={false}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        ) : null}
      </group>
      <mesh ref={beam} renderOrder={4} frustumCulled={false}>
        <cylinderGeometry args={[0.48, 0.028, 1, 24, 1, true]} />
        <primitive object={beamMat} attach="material" />
      </mesh>
      {textures.map((texture, index) => (
        <group key={LOGO_URLS_LIST[index]} ref={(node) => { logos.current[index] = node; }} renderOrder={10}>
          <mesh renderOrder={10}>
            <circleGeometry args={[0.2, 24]} />
            <meshBasicMaterial color="#f4f8ff" transparent opacity={0.92} depthWrite={false} depthTest={false} toneMapped={false} />
          </mesh>
          {texture ? (
            <mesh position={[0, 0, 0.01]} renderOrder={10}>
              <circleGeometry args={[0.15, 24]} />
              <meshBasicMaterial map={texture} transparent depthWrite={false} depthTest={false} toneMapped={false} />
            </mesh>
          ) : null}
        </group>
      ))}
      {arcs.map((arc, index) => (
        <primitive key={`arc-${index}`} object={arc.group} />
      ))}
      <Outputs glass={outputMats.glass} metal={outputMats.metal} paused={paused} />
      <instancedMesh ref={mesh} args={[cubeGeom, cubeMat, INSTANCES]} frustumCulled={false} renderOrder={2} />
    </group>
  );
}

export function SignalStream({ paused = false, onReady }: { paused?: boolean; onReady?: () => void }) {
  const quality = useMemo(readQuality, []);
  const readyOnce = useRef(onReady);
  readyOnce.current = onReady;

  return (
    <div className="signal-stream" aria-hidden>
      <Canvas
        frameloop={paused ? "never" : "always"}
        dpr={quality.dpr}
        camera={{ fov: 28, position: [0.12, 0.28, 7.15], near: 0.1, far: 40 }}
        gl={{
          antialias: quality.antialias,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "default"
        }}
        onCreated={({ gl, scene, invalidate }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          invalidate();
        }}
      >
        <LivingStream quality={quality} paused={paused} onReady={() => readyOnce.current?.()} />
      </Canvas>
    </div>
  );
}
