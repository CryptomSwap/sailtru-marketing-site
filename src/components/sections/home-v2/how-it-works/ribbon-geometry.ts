import * as THREE from "three";

/** Horizontal S. Arc-length 0 is the left entrance, 1 is the right tip. */
const POINTS = [
  new THREE.Vector3(-1.82, -0.12, 0.1),
  new THREE.Vector3(-0.88, 0.52, -0.2),
  new THREE.Vector3(0.12, -0.02, 0.16),
  new THREE.Vector3(1.08, -0.5, -0.12),
  new THREE.Vector3(1.92, 0.3, 0.1)
];

export function createRibbonCurve() {
  return new THREE.CatmullRomCurve3(POINTS, false, "catmullrom", 0.5);
}

/**
 * Elliptical glass tube. Width is the on-screen band, thick is the depth.
 * The radius stays well under the curve's bend radius so the shell does not fold.
 */
export function buildRibbonGeometry(lengthSeg = 180, radial = 28, width = 0.26, thick = 0.07) {
  const curve = createRibbonCurve();
  const frames = curve.computeFrenetFrames(lengthSeg, false);
  const positions: number[] = [];
  const spines: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  let prevBinormal: THREE.Vector3 | null = null;
  for (let i = 0; i <= lengthSeg; i++) {
    const t = i / lengthSeg;
    const point = curve.getPointAt(t);
    const tangent = frames.tangents[i].clone().normalize();
    const binormal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 0.55, 1));
    if (binormal.lengthSq() < 1e-6) binormal.set(0, 1, 0);
    binormal.normalize();
    if (prevBinormal && binormal.dot(prevBinormal) < 0) binormal.negate();
    prevBinormal = binormal.clone();
    const normal = new THREE.Vector3().crossVectors(binormal, tangent).normalize();
    const envelope = 0.72 + 0.28 * Math.sin(Math.PI * t);
    const halfW = Math.max(width * envelope, 0.001);
    const halfT = Math.max(thick * envelope, 0.001);

    for (let j = 0; j <= radial; j++) {
      const angle = (j / radial) * Math.PI * 2;
      const cx = Math.cos(angle);
      const sy = Math.sin(angle);
      const pos = point.clone().addScaledVector(binormal, cx * halfW).addScaledVector(normal, sy * halfT);
      const surface = binormal
        .clone()
        .multiplyScalar(cx / halfW)
        .addScaledVector(normal, sy / halfT)
        .normalize();
      positions.push(pos.x, pos.y, pos.z);
      spines.push(point.x, point.y, point.z);
      normals.push(surface.x, surface.y, surface.z);
      uvs.push(t, j / radial);
    }
  }

  const row = radial + 1;
  for (let i = 0; i < lengthSeg; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * row + j;
      indices.push(a, a + 1, a + row, a + 1, a + row + 1, a + row);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("aSpine", new THREE.Float32BufferAttribute(spines, 3));
  geom.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeBoundingSphere();
  return geom;
}
