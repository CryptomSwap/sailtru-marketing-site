import fs from "node:fs/promises";
import path from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

class NodeFileReader {
  result = null;
  onloadend = null;
  onerror = null;

  readAsArrayBuffer(blob) {
    blob.arrayBuffer()
      .then((buffer) => {
        this.result = buffer;
        this.onloadend?.({ target: this });
      })
      .catch((error) => this.onerror?.(error));
  }

  readAsDataURL(blob) {
    blob.arrayBuffer()
      .then((buffer) => {
        this.result = `data:${blob.type};base64,${Buffer.from(buffer).toString("base64")}`;
        this.onloadend?.({ target: this });
      })
      .catch((error) => this.onerror?.(error));
  }
}

globalThis.FileReader ??= NodeFileReader;

const COLORS = {
  cobalt: 0x0879c8,
  deepBlue: 0x004f94,
  navy: 0x06162b,
  sail: 0x090b10,
  sailEdge: 0x1f2730,
  ivory: 0xf5f2e8,
  wood: 0xa66e35,
  metal: 0xaebac5,
  glass: 0x183c5d,
};

const root = new THREE.Group();
root.name = "SailTru_Logo_Sailboat";

const standard = (name, color, roughness = 0.55, metalness = 0.02) => {
  const material = new THREE.MeshStandardMaterial({ color, roughness, metalness });
  material.name = name;
  return material;
};

const materials = {
  cobalt: new THREE.MeshPhysicalMaterial({ name: "SailTru_Cobalt", color: COLORS.cobalt, roughness: .25, metalness: .06, clearcoat: .72, clearcoatRoughness: .18 }),
  deepBlue: new THREE.MeshPhysicalMaterial({ name: "SailTru_Deep_Blue", color: COLORS.deepBlue, roughness: .23, metalness: .08, clearcoat: .78, clearcoatRoughness: .16 }),
  navy: new THREE.MeshPhysicalMaterial({ name: "SailTru_Navy", color: COLORS.navy, roughness: .22, metalness: .1, clearcoat: .62, clearcoatRoughness: .2 }),
  sail: new THREE.MeshPhysicalMaterial({
    name: "SailTru_Black_Sailcloth",
    color: COLORS.sail,
    roughness: 0.62,
    sheen: 0.45,
    sheenColor: new THREE.Color(0x536273),
    side: THREE.DoubleSide,
  }),
  sailEdge: standard("Sail_Edge", COLORS.sailEdge, 0.5, 0.08),
  ivory: standard("Mast_Ivory", COLORS.ivory, 0.48, 0.03),
  wood: standard("Warm_Teak", COLORS.wood, 0.58, 0.02),
  metal: standard("Brushed_Metal", COLORS.metal, 0.27, 0.72),
  glass: new THREE.MeshPhysicalMaterial({
    name: "Cabin_Glass",
    color: COLORS.glass,
    roughness: 0.16,
    metalness: 0.12,
    transmission: 0.08,
  }),
};

function smoothProfile(profile, subdivisions = 6) {
  const result = [];
  for (let index = 0; index < profile.length - 1; index += 1) {
    const from = profile[index];
    const to = profile[index + 1];
    for (let step = 0; step < subdivisions; step += 1) {
      const raw = step / subdivisions;
      const t = raw * raw * (3 - 2 * raw);
      result.push({
        z: THREE.MathUtils.lerp(from.z, to.z, raw),
        width: THREE.MathUtils.lerp(from.width, to.width, t),
        top: THREE.MathUtils.lerp(from.top, to.top, t),
        bottom: THREE.MathUtils.lerp(from.bottom, to.bottom, t),
      });
    }
  }
  result.push(profile.at(-1));
  return result;
}

function buildHullGeometry(controlProfile, name) {
  const profile = smoothProfile(controlProfile);
  const ringSegments = 14;
  const positions = [];
  const indices = [];
  for (const section of profile) {
    const centerY = (section.top + section.bottom) * .5;
    const radiusY = (section.top - section.bottom) * .5;
    for (let segment = 0; segment < ringSegments; segment += 1) {
      const angle = segment / ringSegments * Math.PI * 2;
      const side = Math.cos(angle);
      const vertical = Math.sin(angle);
      const chine = .9 + .1 * Math.abs(vertical);
      positions.push(side * section.width * chine, centerY + vertical * radiusY, section.z);
    }
  }
  for (let section = 0; section < profile.length - 1; section += 1) {
    for (let segment = 0; segment < ringSegments; segment += 1) {
      const next = (segment + 1) % ringSegments;
      const a = section * ringSegments + segment;
      const b = section * ringSegments + next;
      const c = (section + 1) * ringSegments + segment;
      const d = (section + 1) * ringSegments + next;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.name = name;
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function addMesh(name, geometry, material, parent = root) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

const lowerHull = buildHullGeometry([
  { z: -2.55, width: 0.64, top: 0.02, bottom: -0.3, keelWidth: 0.72 },
  { z: -1.75, width: 0.93, top: 0.12, bottom: -0.62, keelWidth: 0.62 },
  { z: -0.3, width: 1.02, top: 0.18, bottom: -0.82, keelWidth: 0.5 },
  { z: 1.25, width: 0.82, top: 0.22, bottom: -0.62, keelWidth: 0.4 },
  { z: 2.55, width: 0.05, top: 0.3, bottom: -0.06, keelWidth: 0.25 },
], "Faceted_Cobalt_Hull");
addMesh("Cobalt_Lower_Hull", lowerHull, materials.cobalt);

const upperHull = buildHullGeometry([
  { z: -2.45, width: 0.6, top: 0.38, bottom: 0.0, keelWidth: 1 },
  { z: -1.55, width: 0.92, top: 0.46, bottom: 0.08, keelWidth: 1 },
  { z: 0.1, width: 0.99, top: 0.5, bottom: 0.14, keelWidth: 1 },
  { z: 1.55, width: 0.72, top: 0.49, bottom: 0.18, keelWidth: 1 },
  { z: 2.52, width: 0.04, top: 0.31, bottom: 0.28, keelWidth: 1 },
], "Deep_Blue_Upper_Hull");
addMesh("Deep_Blue_Upper_Hull", upperHull, materials.deepBlue);

const gunwale = buildHullGeometry([
  { z: -2.35, width: 0.58, top: 0.48, bottom: 0.37, keelWidth: 1 },
  { z: -1.3, width: 0.88, top: 0.57, bottom: 0.44, keelWidth: 1 },
  { z: 0.45, width: 0.9, top: 0.59, bottom: 0.48, keelWidth: 1 },
  { z: 1.65, width: 0.62, top: 0.54, bottom: 0.46, keelWidth: 1 },
  { z: 2.35, width: 0.08, top: 0.36, bottom: 0.3, keelWidth: 1 },
], "Black_Logo_Gunwale");
addMesh("Black_Logo_Gunwale", gunwale, materials.navy);

const deckShape = new THREE.Shape();
deckShape.moveTo(-0.58, -2.18);
deckShape.quadraticCurveTo(-0.95, -0.25, -0.58, 1.62);
deckShape.lineTo(0, 2.28);
deckShape.lineTo(0.58, 1.62);
deckShape.quadraticCurveTo(0.95, -0.25, 0.58, -2.18);
deckShape.closePath();
const deckGeometry = new THREE.ExtrudeGeometry(deckShape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.025, bevelSegments: 2 });
deckGeometry.rotateX(Math.PI / 2);
deckGeometry.translate(0, 0.53, 0);
addMesh("Teak_Deck", deckGeometry, materials.wood);

const cockpit = addMesh("Cockpit", new THREE.CapsuleGeometry(0.38, 0.92, 5, 16), materials.navy);
cockpit.scale.set(1.35, 0.24, 1);
cockpit.rotation.x = Math.PI / 2;
cockpit.position.set(0, 0.69, -0.76);

const cabin = addMesh("Cabin", new RoundedBoxGeometry(0.78, 0.32, 0.92, 5, .09), materials.ivory);
cabina(cabin);

function cabina(mesh) {
  mesh.position.set(0, 0.77, 0.35);
  mesh.geometry.translate(0, 0, 0);
  mesh.scale.set(1, 1, 1);
}

for (const side of [-1, 1]) {
  const windowMesh = addMesh(`Cabin_Window_${side < 0 ? "Port" : "Starboard"}`, new THREE.BoxGeometry(0.018, 0.17, 0.54), materials.glass);
  windowMesh.position.set(side * 0.398, 0.82, 0.34);
}

function addCylinder(name, radius, length, material, position, rotation = [0, 0, 0], segments = 16) {
  const mesh = addMesh(name, new THREE.CylinderGeometry(radius, radius, length, segments), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  return mesh;
}

function addCylinderBetween(name, start, end, radius, material, segments = 8) {
  const from = new THREE.Vector3(...start);
  const to = new THREE.Vector3(...end);
  const midpoint = from.clone().add(to).multiplyScalar(.5);
  const direction = to.clone().sub(from);
  const mesh = addMesh(name, new THREE.CylinderGeometry(radius, radius, direction.length(), segments), material);
  mesh.position.copy(midpoint);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return mesh;
}

addCylinder("Ivory_Mast", 0.047, 5.45, materials.ivory, [0, 3.15, 0.22], [0, 0, 0], 20);
addCylinder("Metal_Mast_Core", 0.018, 5.52, materials.metal, [0, 3.15, 0.22], [0, 0, 0], 12);
addCylinder("Dark_Boom", 0.035, 2.28, materials.sailEdge, [0, 1.25, -0.83], [Math.PI / 2, 0, 0], 12);

function sailShape(points, name) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];
    if (point.length === 4) shape.quadraticCurveTo(point[0], point[1], point[2], point[3]);
    else shape.lineTo(point[0], point[1]);
  }
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.065,
    bevelEnabled: true,
    bevelSize: 0.028,
    bevelThickness: 0.018,
    bevelSegments: 3,
    curveSegments: 18,
  });
  geometry.name = name;
  geometry.rotateY(Math.PI / 2);
  geometry.translate(-0.0325, 0, 0);
  geometry.computeBoundingBox();
  const bounds = geometry.boundingBox;
  const position = geometry.getAttribute("position");
  const height = bounds.max.y - bounds.min.y;
  const length = bounds.max.z - bounds.min.z;
  for (let index = 0; index < position.count; index += 1) {
    const y = (position.getY(index) - bounds.min.y) / height;
    const z = (position.getZ(index) - bounds.min.z) / length;
    const billow = Math.sin(y * Math.PI) * Math.sin(z * Math.PI) * .16;
    position.setX(index, position.getX(index) + billow);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

const mainSail = sailShape([
  [0.17, 1.42],
  [0.28, 4.92],
  [0.25, 5.72, 0.42, 5.9],
  [1.68, 4.82, 2.0, 1.68],
  [1.52, 1.54],
], "Swept_Main_Sail");
addMesh("Black_Main_Sail", mainSail, materials.sail).position.z = 0.05;

const jibSail = sailShape([
  [-0.15, 1.5],
  [-0.22, 5.25],
  [-0.62, 3.35, -2.0, 1.38],
  [-1.62, 1.4],
], "Swept_Jib_Sail");
addMesh("Black_Jib_Sail", jibSail, materials.sail).position.z = 0.05;

addCylinderBetween("Forestay", [0, 5.9, .22], [0, .72, 2.35], .009, materials.metal, 6);
addCylinderBetween("Backstay", [0, 5.9, .22], [0, .68, -2.18], .009, materials.metal, 6);
addCylinderBetween("Main_Sheet", [.03, 1.27, -.95], [.03, .68, -.58], .012, materials.ivory, 6);

for (const side of [-1, 1]) {
  addCylinderBetween(`Upper_Lifeline_${side}`, [side * .72, .98, -1.82], [side * .63, .94, 1.36], .009, materials.metal, 6);
  addCylinderBetween(`Lower_Lifeline_${side}`, [side * .72, .84, -1.82], [side * .63, .8, 1.36], .007, materials.metal, 6);
  const winch = addCylinder(`Winch_${side}`, .08, .14, materials.metal, [side * .46, .72, -.42], [0, 0, 0], 16);
  winch.scale.set(1, 1, 1);
  const cleat = addMesh(`Bow_Cleat_${side}`, new RoundedBoxGeometry(.16, .045, .055, 3, .018), materials.metal);
  cleat.position.set(side * .36, .66, 1.72);
}

for (const z of [-1.8, -1.25, 0.75, 1.35]) {
  const stanchionPort = addCylinder(`Rail_Port_${z}`, 0.012, 0.38, materials.metal, [-0.76 + Math.abs(z) * -0.025, 0.79, z], [0, 0, 0], 8);
  const stanchionStarboard = stanchionPort.clone();
  stanchionStarboard.name = `Rail_Starboard_${z}`;
  stanchionStarboard.position.x *= -1;
  root.add(stanchionStarboard);
}

const bowStripe = addMesh("Logo_Light_Blue_Bow_Facet", new THREE.BoxGeometry(0.018, 0.34, 2.45), materials.cobalt);
bowStripe.position.set(-0.79, 0.03, 0.72);
bowStripe.rotation.x = -0.08;
const mirroredBowStripe = bowStripe.clone();
mirroredBowStripe.name = "Logo_Light_Blue_Bow_Facet_Starboard";
mirroredBowStripe.position.x *= -1;
root.add(mirroredBowStripe);

const roof = addMesh("Cabin_Roof", new RoundedBoxGeometry(.9, .08, 1.04, 4, .045), materials.ivory);
roof.position.set(0, .965, .34);

for (const side of [-1, 1]) {
  const lightMaterial = new THREE.MeshStandardMaterial({
    name: side < 0 ? "Navigation_Red" : "Navigation_Green",
    color: side < 0 ? 0xff3045 : 0x35ff9a,
    emissive: side < 0 ? 0x7a0612 : 0x087a41,
    emissiveIntensity: 2.4,
    roughness: .22,
  });
  const light = addMesh(`Navigation_Light_${side}`, new THREE.SphereGeometry(.035, 12, 8), lightMaterial);
  light.position.set(side * .77, .78, 1.08);
}

const rudder = addMesh("Rudder", new THREE.BoxGeometry(0.12, 0.75, 0.48), materials.deepBlue);
rudder.position.set(0, -0.58, -1.88);
rudder.rotation.x = -0.18;

root.rotation.y = Math.PI;
root.updateMatrixWorld(true);

const exporter = new GLTFExporter();
const output = await exporter.parseAsync(root, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
  maxTextureSize: 1024,
});

const outputPath = path.resolve("public/models/journey/sailtru-logo-boat.glb");
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, Buffer.from(output));

const bounds = new THREE.Box3().setFromObject(root);
const size = bounds.getSize(new THREE.Vector3());
console.log(JSON.stringify({
  output: outputPath,
  bytes: output.byteLength,
  dimensions: { x: size.x.toFixed(2), y: size.y.toFixed(2), z: size.z.toFixed(2) },
  meshes: root.children.length,
}, null, 2));
