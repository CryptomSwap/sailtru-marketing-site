"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

// Curves follow the supplied SailTru symbol. +Z is the pointed bow, +Y is up.
// The logo is the side profile; thickness and sail camber make it a 3D object.
function profile(start: [number, number], curves: number[][]) {
  const shape = new THREE.Shape();
  const x = (v: number) => (v - 514) / 55;
  const y = (v: number) => (451 - v) / 55;
  shape.moveTo(x(start[0]), y(start[1]));
  curves.forEach(([a, b, c, d, e, f]) => shape.bezierCurveTo(x(a), y(b), x(c), y(d), x(e), y(f)));
  shape.closePath();
  return shape;
}

function sculpt(shape: THREE.Shape, depth: number, sail = false) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth, steps: 1, curveSegments: 40,
    bevelEnabled: true, bevelThickness: sail ? .012 : .025,
    bevelSize: sail ? .012 : .025, bevelSegments: 3,
  });
  const position = geometry.getAttribute("position");
  for (let i = 0; i < position.count; i++) {
    const along = position.getX(i);
    const height = position.getY(i);
    const thickness = position.getZ(i) - depth / 2;
    // Taper the hull toward the bow/stern instead of making a flat logo slab.
    const breadth = sail ? 1 : Math.sqrt(Math.max(.025, 1 - Math.pow(along / 2.72, 2)));
    const camber = sail ? .17 * Math.sin(height / 6.1 * Math.PI) * Math.sin((along + 2.7) / 5.4 * Math.PI) : 0;
    position.setXYZ(i, thickness * breadth + camber, height, along);
  }
  // Swapping the profile axes reverses handedness; restore outward winding.
  const indices = geometry.index;
  if (indices) {
    for (let i = 0; i < indices.count; i += 3) {
      const b = indices.getX(i + 1);
      indices.setX(i + 1, indices.getX(i + 2)); indices.setX(i + 2, b);
    }
  } else {
    for (const attribute of Object.values(geometry.attributes)) {
      const data = attribute.array;
      for (let i = 0; i < attribute.count; i += 3) {
        for (let c = 0; c < attribute.itemSize; c++) {
          const b = (i + 1) * attribute.itemSize + c;
          const d = (i + 2) * attribute.itemSize + c;
          const value = data[b]; data[b] = data[d]; data[d] = value;
        }
      }
    }
  }
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

export function LogoVessel() {
  const pieces = useMemo(() => [
    // Broad azure hull, swept cobalt sheer, and inset navy upper edge.
    { color: "#2997ce", geometry: sculpt(profile([370, 400], [
      [443, 427, 548, 343, 658, 325], [609, 430, 501, 500, 406, 414], [390, 409, 378, 404, 370, 400],
    ]), .85) },
    { color: "#1268a5", geometry: sculpt(profile([370, 400], [
      [442, 430, 551, 347, 648, 329], [556, 393, 462, 467, 370, 400],
    ]), .91) },
    { color: "#218ac5", geometry: sculpt(profile([368, 380], [
      [405, 371, 463, 353, 497, 341], [497, 373, 436, 417, 382, 392], [376, 389, 371, 384, 368, 380],
    ]), .62) },
    { color: "#080b11", geometry: sculpt(profile([382, 391], [
      [428, 410, 491, 372, 499, 335], [506, 343, 508, 356, 506, 367],
      [539, 350, 568, 339, 595, 335], [539, 375, 431, 430, 382, 391],
    ]), .64) },
    // Negative space between the two black sails is intentional: no straight mast.
    { color: "#0b0d12", geometry: sculpt(profile([375, 363], [
      [435, 305, 490, 219, 508, 143], [516, 213, 514, 275, 506, 321],
      [462, 338, 415, 349, 375, 363],
    ]), .045, true) },
    { color: "#0b0d12", geometry: sculpt(profile([520, 116], [
      [573, 160, 606, 223, 614, 302], [583, 318, 548, 335, 515, 352],
      [532, 278, 529, 191, 520, 116],
    ]), .055, true) },
  ], []);
  useEffect(() => () => pieces.forEach(({ geometry }) => geometry.dispose()), [pieces]);
  return <group name="SailTru_Logo_Vessel">
    {pieces.map(({ color, geometry }, index) => <mesh key={index} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial color={color} roughness={.94} metalness={0} clearcoat={0} specularIntensity={.04} envMapIntensity={0} />
    </mesh>)}
  </group>;
}
