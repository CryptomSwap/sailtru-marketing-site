import * as THREE from "three";
import { HarborTheme } from "../harbor-theme";

/**
 * Toon shading and ink outlines for the harbor.
 *
 * Materials keep each Blender mesh's base colour and shade it in four flat
 * bands. Outlines are inverted hulls pushed out along smoothed normals by a
 * constant number of screen pixels, so lines stay crisp at every distance.
 */
export class ToonKit {
  private static gradient: THREE.DataTexture | null = null;
  private static toonCache = new Map<string, THREE.MeshToonMaterial>();
  private static glowCache = new Map<string, THREE.MeshBasicMaterial>();
  private static outline: THREE.MeshBasicMaterial | null = null;
  /** Shared by every outline: line width in drawing-buffer pixels and the buffer size. */
  static readonly outlineUniforms = {
    uOutlinePx: { value: 1.6 },
    uResolution: { value: new THREE.Vector2(1, 1) }
  };

  static gradientMap(): THREE.DataTexture {
    if (ToonKit.gradient) return ToonKit.gradient;
    // Shadow, half-light, light, highlight.
    const data = new Uint8Array([140, 186, 226, 255]);
    const tex = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    ToonKit.gradient = tex;
    return tex;
  }

  /** A shared toon material for a colour (linear THREE.Color or sRGB hex). */
  static toon(color: THREE.Color | string): THREE.MeshToonMaterial {
    const c = typeof color === "string" ? new THREE.Color(color) : color;
    const key = c.getHexString();
    let mat = ToonKit.toonCache.get(key);
    if (!mat) {
      mat = new THREE.MeshToonMaterial({ color: c.clone(), gradientMap: ToonKit.gradientMap() });
      ToonKit.toonCache.set(key, mat);
    }
    return mat;
  }

  /** Unlit material for lamps and lit windows. */
  static glow(color: THREE.Color | string): THREE.MeshBasicMaterial {
    const c = typeof color === "string" ? new THREE.Color(color) : color;
    const key = c.getHexString();
    let mat = ToonKit.glowCache.get(key);
    if (!mat) {
      mat = new THREE.MeshBasicMaterial({ color: c.clone() });
      ToonKit.glowCache.set(key, mat);
    }
    return mat;
  }

  static outlineMaterial(): THREE.MeshBasicMaterial {
    if (ToonKit.outline) return ToonKit.outline;
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(HarborTheme.INK), side: THREE.BackSide });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uOutlinePx = ToonKit.outlineUniforms.uOutlinePx;
      shader.uniforms.uResolution = ToonKit.outlineUniforms.uResolution;
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          "#include <common>\nattribute vec3 outlineNormal;\nuniform float uOutlinePx;\nuniform vec2 uResolution;"
        )
        .replace(
          "#include <project_vertex>",
          [
            "#include <project_vertex>",
            "vec4 clipN = projectionMatrix * vec4( normalize( normalMatrix * outlineNormal ), 0.0 );",
            "vec2 dirPx = clipN.xy * uResolution;",
            "float lenPx = length( dirPx );",
            "if ( lenPx > 1e-6 ) gl_Position.xy += ( dirPx / lenPx ) * uOutlinePx * 2.0 / uResolution * gl_Position.w;"
          ].join("\n")
        );
    };
    mat.customProgramCacheKey = () => "harbor-outline";
    ToonKit.outline = mat;
    return mat;
  }

  static setResolution(width: number, height: number, dpr: number) {
    ToonKit.outlineUniforms.uResolution.value.set(width * dpr, height * dpr);
    ToonKit.outlineUniforms.uOutlinePx.value = 1.35 * dpr;
  }

  /** Averaged normals per position, so the hull has no gaps at flat-shaded edges. */
  static smoothNormals(geometry: THREE.BufferGeometry) {
    if (geometry.getAttribute("outlineNormal")) return;
    const pos = geometry.getAttribute("position");
    const nor = geometry.getAttribute("normal");
    if (!pos || !nor) return;
    const sums = new Map<string, THREE.Vector3>();
    const key = (i: number) => `${Math.round(pos.getX(i) * 500)},${Math.round(pos.getY(i) * 500)},${Math.round(pos.getZ(i) * 500)}`;
    const n = new THREE.Vector3();
    for (let i = 0; i < pos.count; i += 1) {
      const k = key(i);
      n.fromBufferAttribute(nor, i);
      const acc = sums.get(k);
      if (acc) acc.add(n);
      else sums.set(k, n.clone());
    }
    const out = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i += 1) {
      const v = sums.get(key(i))!;
      const len = v.length() || 1;
      out[i * 3] = v.x / len;
      out[i * 3 + 1] = v.y / len;
      out[i * 3 + 2] = v.z / len;
    }
    geometry.setAttribute("outlineNormal", new THREE.BufferAttribute(out, 3));
  }

  static addOutline(mesh: THREE.Mesh) {
    ToonKit.smoothNormals(mesh.geometry);
    if (!mesh.geometry.getAttribute("outlineNormal")) return;
    const hull = new THREE.Mesh(mesh.geometry, ToonKit.outlineMaterial());
    hull.name = `${mesh.name}__outline`;
    hull.raycast = () => {};
    hull.userData.outline = true;
    mesh.add(hull);
  }

  /**
   * Replace a Blender scene's materials with toon materials (keeping base
   * colours) and give each mesh an ink outline. `pick` can substitute a
   * material by palette name ("pal_glow", "pal_band", ...).
   */
  static prepare(
    root: THREE.Object3D,
    options: { outline?: boolean; pick?: (paletteName: string, mesh: THREE.Mesh) => THREE.Material | undefined } = {}
  ) {
    const meshes: THREE.Mesh[] = [];
    root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh && !obj.userData.outline) meshes.push(obj as THREE.Mesh);
    });
    for (const mesh of meshes) {
      const convert = (m: THREE.Material) => {
        const name = m.name || "";
        const picked = options.pick?.(name, mesh);
        if (picked) return picked;
        if (name === "pal_glow") return ToonKit.glow(HarborTheme.LAMP);
        const color = (m as THREE.MeshStandardMaterial).color ?? new THREE.Color(HarborTheme.PAPER);
        return ToonKit.toon(color);
      };
      mesh.material = Array.isArray(mesh.material) ? mesh.material.map(convert) : convert(mesh.material);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      if (options.outline !== false) ToonKit.addOutline(mesh);
    }
  }
}
