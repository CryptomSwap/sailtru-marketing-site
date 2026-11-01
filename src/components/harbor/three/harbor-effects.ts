import * as THREE from "three";
import { HarborTheme } from "../harbor-theme";
import type { XZ } from "../story-model";

/**
 * Hand-built (not Blender) pieces of the harbor: water, sky and sun, route
 * ribbons, foam rings, contact shadows and the lighthouse beam.
 */

/** Shared GLSL wave so the water, the route and the foam rise and fall together. */
const WAVE_GLSL = /* glsl */ `
float harborWave(vec2 p, float t) {
  return sin(p.x * 0.32 + t * 0.85) * 0.085
       + sin(p.y * 0.55 - t * 1.05 + p.x * 0.18) * 0.065
       + sin((p.x + p.y) * 1.25 + t * 1.6) * 0.022;
}
`;

/** CPU twin of the GLSL wave, for objects that float. */
export class HarborWave {
  static height(x: number, z: number, t: number) {
    return Math.sin(x * 0.32 + t * 0.85) * 0.085 + Math.sin(z * 0.55 - t * 1.05 + x * 0.18) * 0.065 + Math.sin((x + z) * 1.25 + t * 1.6) * 0.022;
  }
}

function fogUniforms() {
  return THREE.UniformsUtils.clone(THREE.UniformsLib.fog);
}

/** Stylised sea: vertex swell, a light crest band and sparse hand-drawn ink ripples. */
export class HarborWater {
  readonly mesh: THREE.Mesh;
  readonly uniforms: Record<string, THREE.IUniform>;

  constructor() {
    const geometry = new THREE.PlaneGeometry(220, 150, 110, 55);
    geometry.rotateX(-Math.PI / 2);
    this.uniforms = {
      ...fogUniforms(),
      uTime: { value: 0 },
      uCam: { value: new THREE.Vector3() },
      uNear: { value: new THREE.Color(HarborTheme.SEA_NEAR) },
      uFar: { value: new THREE.Color(HarborTheme.SEA_FAR) },
      uCrest: { value: new THREE.Color(HarborTheme.SEA_CREST) },
      uInk: { value: new THREE.Color(HarborTheme.INK) }
    };
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      fog: true,
      vertexShader: /* glsl */ `
        #include <fog_pars_vertex>
        uniform float uTime;
        varying vec3 vWorld;
        varying float vH;
        ${WAVE_GLSL}
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          float h = harborWave(wp.xz, uTime);
          wp.y += h;
          vH = h;
          vWorld = wp.xyz;
          vec4 mvPosition = viewMatrix * wp;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }
      `,
      fragmentShader: /* glsl */ `
        #include <common>
        #include <fog_pars_fragment>
        uniform float uTime;
        uniform vec3 uCam;
        uniform vec3 uNear;
        uniform vec3 uFar;
        uniform vec3 uCrest;
        uniform vec3 uInk;
        varying vec3 vWorld;
        varying float vH;
        float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        // One short wavy ink stroke per occupied cell, drifting slowly downwind.
        float ripple(vec2 p, vec2 cell, float density, float width) {
          vec2 q = p / cell;
          vec2 id = floor(q);
          vec2 f = fract(q);
          float on = step(1.0 - density, hash2(id));
          float cx = 0.25 + 0.5 * hash2(id + 3.1);
          float len = 0.16 + 0.16 * hash2(id + 7.7);
          float dx = (f.x - cx) / len;
          float wave = 0.09 * sin(dx * 3.14159 * 2.0);
          float d = abs((f.y - 0.5 - wave) * cell.y);
          float aa = fwidth(d) * 1.2 + 1e-4;
          float line = 1.0 - smoothstep(width - aa, width + aa, d);
          float ends = 1.0 - smoothstep(0.75, 1.0, abs(dx));
          return on * line * ends;
        }
        void main() {
          float dist = length(vWorld.xz - uCam.xz);
          vec3 col = mix(uNear, uFar, smoothstep(6.0, 75.0, dist));
          // Toon crest: the top of each swell turns paper-light.
          col = mix(col, uCrest, smoothstep(0.085, 0.1, vH) * 0.55);
          vec2 p = vWorld.xz + vec2(uTime * 0.22, 0.0);
          float near = 1.0 - smoothstep(22.0, 58.0, dist);
          float r = ripple(p, vec2(2.4, 0.95), 0.36, 0.035) * near;
          r = max(r, ripple(p + vec2(17.3, 4.1), vec2(5.6, 1.6), 0.3, 0.05) * (1.0 - smoothstep(30.0, 90.0, dist)));
          // Strokes right under the camera stay lighter so they never dominate the foreground.
          col = mix(col, uInk, r * 0.3 * mix(0.45, 1.0, smoothstep(8.0, 22.0, dist)));
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          #include <fog_fragment>
        }
      `
    });
    material.extensions = { ...material.extensions } as typeof material.extensions;
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = "Water";
    this.mesh.frustumCulled = false;
  }

  update(time: number, camera: THREE.Camera) {
    this.uniforms.uTime.value = time;
    this.uniforms.uCam.value.copy(camera.position);
    // Follow the camera in whole grid steps so the swell never slides.
    const step = 1;
    this.mesh.position.set(Math.round(camera.position.x / step) * step, 0, Math.round((camera.position.z - 40) / step) * step);
  }
}

/** Paper sky: a warm gradient and a hand-drawn sun (disc, ink ring and rays). */
export class HarborSky {
  readonly mesh: THREE.Mesh;

  constructor(sunDirection: THREE.Vector3) {
    const geometry = new THREE.SphereGeometry(500, 32, 16);
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uTop: { value: new THREE.Color(HarborTheme.SKY_TOP) },
        uMid: { value: new THREE.Color(HarborTheme.SKY_MID) },
        uHorizon: { value: new THREE.Color(HarborTheme.SKY_HORIZON) },
        uInk: { value: new THREE.Color(HarborTheme.INK) },
        uSun: { value: sunDirection.clone().normalize() }
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz - cameraPosition);
          vec4 p = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uTop;
        uniform vec3 uMid;
        uniform vec3 uHorizon;
        uniform vec3 uInk;
        uniform vec3 uSun;
        varying vec3 vDir;
        void main() {
          vec3 d = normalize(vDir);
          float e = d.y;
          vec3 col = mix(uHorizon, uMid, smoothstep(-0.02, 0.12, e));
          col = mix(col, uTop, smoothstep(0.12, 0.45, e));
          // Sun: tangent frame around its direction.
          vec3 right = normalize(cross(uSun, vec3(0.0, 1.0, 0.0)));
          vec3 up = cross(right, uSun);
          float a = acos(clamp(dot(d, uSun), -1.0, 1.0));
          float ang = atan(dot(d, up), dot(d, right));
          float aa = fwidth(a) * 1.5;
          float disc = 1.0 - smoothstep(0.052 - aa, 0.052 + aa, a);
          col = mix(col, vec3(0.985, 0.955, 0.89), disc * 0.9);
          float ring = 1.0 - smoothstep(0.0, aa * 1.2 + 0.0012, abs(a - 0.053));
          float rays = step(0.5, fract(ang / 6.28318 * 36.0)) * step(0.066, a) * step(a, mix(0.08, 0.088, step(0.5, fract(ang / 6.28318 * 18.0))));
          col = mix(col, uInk, (ring + rays * 0.7) * 0.32);
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = "Sky";
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -10;
  }

  update(camera: THREE.Camera) {
    this.mesh.position.copy(camera.position);
  }
}

/** A dashed cobalt route ribbon lying on the water, drawn progressively. */
export class RouteRibbon {
  readonly mesh: THREE.Mesh;
  readonly uniforms: Record<string, THREE.IUniform>;
  readonly points: THREE.Vector3[];
  private readonly curve: THREE.CatmullRomCurve3;

  constructor(path: XZ[], options: { width?: number; dash?: number; opacity?: number } = {}) {
    const width = options.width ?? 0.42;
    this.curve = new THREE.CatmullRomCurve3(path.map((p) => new THREE.Vector3(p.x, 0, p.z)), false, "catmullrom", 0.5);
    const segments = 160;
    this.points = this.curve.getSpacedPoints(segments);
    const length = this.curve.getLength();
    const positions: number[] = [];
    const uvs: number[] = [];
    const index: number[] = [];
    for (let i = 0; i <= segments; i += 1) {
      const p = this.points[i];
      const tangent = this.curve.getTangentAt(i / segments);
      const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(width / 2);
      positions.push(p.x - side.x, 0, p.z - side.z, p.x + side.x, 0, p.z + side.z);
      uvs.push((i / segments) * length, 0, (i / segments) * length, 1);
      if (i < segments) {
        const a = i * 2;
        index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(index);
    this.uniforms = {
      ...fogUniforms(),
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uLength: { value: length },
      uDash: { value: options.dash ?? 0.9 },
      uOpacity: { value: options.opacity ?? 1 },
      uColor: { value: new THREE.Color(HarborTheme.ACCENT) }
    };
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      fog: true,
      vertexShader: /* glsl */ `
        #include <fog_pars_vertex>
        uniform float uTime;
        varying vec2 vUv;
        ${WAVE_GLSL}
        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          wp.y += harborWave(wp.xz, uTime) + 0.06;
          vec4 mvPosition = viewMatrix * wp;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }
      `,
      fragmentShader: /* glsl */ `
        #include <common>
        #include <fog_pars_fragment>
        uniform float uProgress;
        uniform float uLength;
        uniform float uDash;
        uniform float uOpacity;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float along = vUv.x;
          if (along > uProgress * uLength) discard;
          float across = abs(vUv.y - 0.5) * 2.0;
          // A faint wash the full width, with round dashes down the middle.
          float cell = fract(along / uDash);
          vec2 q = vec2((cell - 0.5) * uDash, (vUv.y - 0.5) * 0.42);
          float dot = 1.0 - smoothstep(0.075, 0.1, length(q));
          float wash = (1.0 - smoothstep(0.6, 1.0, across)) * 0.2;
          float a = max(dot, wash) * uOpacity;
          gl_FragColor = vec4(uColor, a);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          #include <fog_fragment>
        }
      `
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = "Route";
    this.mesh.renderOrder = 2;
    this.mesh.frustumCulled = false;
  }

  /** World point at a fraction of the route. */
  pointAt(t: number, out = new THREE.Vector3()) {
    return out.copy(this.curve.getPointAt(Math.min(1, Math.max(0, t))));
  }

  update(time: number, progress: number, opacity = 1) {
    this.uniforms.uTime.value = time;
    this.uniforms.uProgress.value = progress;
    this.uniforms.uOpacity.value = opacity;
    this.mesh.visible = progress > 0.001 && opacity > 0.001;
  }
}

/** Radial textures drawn once on a 2D canvas (foam ring, soft shadow, glow). */
class RadialTextures {
  private static cache = new Map<string, THREE.CanvasTexture>();

  static get(kind: "shadow" | "foam" | "glow"): THREE.CanvasTexture {
    const hit = RadialTextures.cache.get(kind);
    if (hit) return hit;
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    if (kind === "shadow") {
      g.addColorStop(0, "rgba(34,37,43,0.55)");
      g.addColorStop(0.55, "rgba(34,37,43,0.22)");
      g.addColorStop(1, "rgba(34,37,43,0)");
    } else if (kind === "foam") {
      g.addColorStop(0, "rgba(255,253,246,0)");
      g.addColorStop(0.62, "rgba(255,253,246,0)");
      g.addColorStop(0.74, "rgba(255,253,246,0.95)");
      g.addColorStop(0.84, "rgba(255,253,246,0.35)");
      g.addColorStop(1, "rgba(255,253,246,0)");
    } else {
      g.addColorStop(0, "rgba(255,236,190,0.9)");
      g.addColorStop(0.4, "rgba(255,230,170,0.35)");
      g.addColorStop(1, "rgba(255,230,170,0)");
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    RadialTextures.cache.set(kind, tex);
    return tex;
  }
}

/** Flat decals that sit on the water: contact shadows and foam rings. */
export class WaterDecal {
  static shadow(width: number, depth: number, opacity = 0.5): THREE.Mesh {
    return WaterDecal.make("shadow", width, depth, opacity, 0.03);
  }

  static foam(width: number, depth: number, opacity = 0.9): THREE.Mesh {
    return WaterDecal.make("foam", width, depth, opacity, 0.05);
  }

  private static make(kind: "shadow" | "foam", width: number, depth: number, opacity: number, lift: number) {
    const geometry = new THREE.PlaneGeometry(width, depth);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({
      map: RadialTextures.get(kind),
      transparent: true,
      opacity,
      depthWrite: false,
      fog: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = lift;
    mesh.renderOrder = 1;
    mesh.name = `decal-${kind}`;
    return mesh;
  }

  /** A billboard glow (lamps, lit windows). */
  static glow(size: number, opacity = 0.8): THREE.Sprite {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: RadialTextures.get("glow"), transparent: true, opacity, depthWrite: false, fog: true })
    );
    sprite.scale.set(size, size, 1);
    return sprite;
  }
}

/** Two soft, rotating light beams for the lighthouse lantern. */
export class LighthouseBeam {
  readonly group = new THREE.Group();

  constructor(length = 16, radius = 1.6) {
    const geometry = new THREE.ConeGeometry(radius, length, 20, 1, true);
    // Apex at the lamp, opening outward along +x.
    geometry.translate(0, -length / 2, 0);
    geometry.rotateZ(Math.PI / 2);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: { uColor: { value: new THREE.Color(HarborTheme.LAMP) }, uLength: { value: length } },
      vertexShader: /* glsl */ `
        varying float vAlong;
        void main() {
          vAlong = position.x;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uLength;
        varying float vAlong;
        void main() {
          float t = clamp(vAlong / uLength, 0.0, 1.0);
          float a = (1.0 - t) * (1.0 - t) * 0.42;
          gl_FragColor = vec4(uColor, a);
          #include <colorspace_fragment>
        }
      `
    });
    for (const turn of [0, Math.PI]) {
      const beam = new THREE.Mesh(geometry, material);
      beam.rotation.y = turn;
      beam.renderOrder = 3;
      this.group.add(beam);
    }
    this.group.name = "LighthouseBeam";
  }
}
