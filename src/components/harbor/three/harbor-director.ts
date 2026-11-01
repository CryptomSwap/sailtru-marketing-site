import * as THREE from "three";
import { HarborTheme } from "../harbor-theme";
import { CameraRig3D, CraneMotion3D, HarborLayout3D, type CameraPose3D } from "../story-model";
import { HarborSky, HarborWater, HarborWave, LighthouseBeam, RouteRibbon, WaterDecal } from "./harbor-effects";
import type { HarborAnchor, HarborFrame, ScreenPoint } from "./stage-types";
import { ToonKit } from "./toon";

export type HarborModels = {
  sailboat: THREE.Object3D;
  boats: THREE.Object3D;
  buoy: THREE.Object3D;
  lighthouse: THREE.Object3D;
  dock: THREE.Object3D;
  terrain: THREE.Object3D;
  props: THREE.Object3D;
};

type Floater = { group: THREE.Object3D; x: number; z: number; phase: number; amp: number; baseYaw: number };
type Gull = { node: THREE.Object3D; wingL?: THREE.Object3D; wingR?: THREE.Object3D; cx: number; cy: number; cz: number; r: number; speed: number; phase: number };

const tmp = new THREE.Vector3();
const tmp2 = new THREE.Vector3();

/** Find a node by name in a Blender scene and clone it (materials are converted afterwards). */
function part(source: THREE.Object3D, name: string): THREE.Object3D {
  const node = source.getObjectByName(name);
  if (!node) throw new Error(`harbor model is missing ${name}`);
  const copy = node.clone(true);
  copy.position.set(0, 0, 0);
  copy.rotation.set(0, 0, 0);
  copy.scale.set(1, 1, 1);
  return copy;
}

/** True when the mesh or one of its ancestors has a name matching `re`. */
function within(node: THREE.Object3D | null, re: RegExp): boolean {
  for (let n = node; n; n = n.parent) if (re.test(n.name)) return true;
  return false;
}

function lerpAngle(a: number, b: number, t: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

/**
 * Builds the 3D harbor from the Blender models and updates it from the one
 * shared story state. It owns no clock and no scroll: every frame is a pure
 * function of the HarborFrame it is given.
 */
export class HarborDirector {
  readonly root = new THREE.Group();
  private readonly water = new HarborWater();
  private readonly sky: HarborSky;
  private readonly route = new RouteRibbon(HarborLayout3D.route(), { width: 0.9, dash: 1.1 });
  private readonly nextRoute = new RouteRibbon(HarborLayout3D.nextRoute(), { width: 0.7, dash: 1.0, opacity: 0.8 });

  private readonly boat = new THREE.Group();
  private readonly boatBob = new THREE.Group();
  private readonly boatWake: THREE.Mesh;
  private readonly boatCrate: THREE.Object3D;
  private readonly pennant: THREE.Object3D | undefined;

  private readonly sources: Floater[] = [];
  private readonly sourcePings: THREE.Mesh[] = [];
  private readonly marker: Floater;
  /** The marker's band turns from ink to the accent when its finding is selected. */
  private readonly markerBand: THREE.MeshToonMaterial;
  private readonly markerRings: THREE.Mesh[] = [];
  private readonly nextBuoy: Floater;
  private readonly floaters: Floater[] = [];

  private readonly dock: THREE.Object3D;
  private readonly slew: THREE.Object3D;
  private readonly trolley: THREE.Object3D;
  private readonly hook: THREE.Object3D;
  private readonly hookMaterial: THREE.MeshToonMaterial;
  private readonly crate: THREE.Object3D;
  private readonly cable: THREE.Mesh;
  private readonly crateRest = new THREE.Vector3();
  private readonly windowMaterials: THREE.MeshToonMaterial[] = [];
  private readonly windowGlows: THREE.Sprite[] = [];
  private readonly workshopFocus: THREE.Object3D;

  private readonly beam = new LighthouseBeam(18, 1.9);
  private readonly clouds: { node: THREE.Object3D; speed: number; baseX: number }[] = [];
  private readonly gulls: Gull[] = [];

  private readonly socket: THREE.Object3D;

  /** Provider boats (neutral hulls): the platforms buyers search and ask. Their badges are HTML overlays. */
  private readonly providers: { holder: THREE.Group; bob: THREE.Group; masthead: THREE.Object3D; phase: number }[] = [];
  private readonly clientFocus = new THREE.Object3D();

  constructor(models: HarborModels) {
    const sun = new THREE.Vector3(-0.55, 0.32, -0.77);
    this.sky = new HarborSky(sun);
    this.root.add(this.sky.mesh, this.water.mesh, this.route.mesh, this.nextRoute.mesh);

    const hemi = new THREE.HemisphereLight("#fff8ec", "#c3cbc6", 1.55);
    const key = new THREE.DirectionalLight("#fff3df", 1.95);
    key.position.set(-30, 40, 28);
    this.root.add(hemi, key, key.target);

    const accent = ToonKit.toon(HarborTheme.ACCENT);
    const ink = ToonKit.toon(HarborTheme.INK);

    // SailTru's boat: the investigation and delivery journey.
    const sailboat = models.sailboat.clone(true);
    ToonKit.prepare(sailboat, { pick: (name) => (name === "pal_cobalt" ? accent : undefined) });
    this.pennant = sailboat.getObjectByName("Pennant");
    this.boatBob.add(sailboat);
    this.boat.add(WaterDecal.shadow(6.8, 2.8, 0.5));
    const foam = WaterDecal.foam(6.4, 2.6, 0.85);
    this.boat.add(foam);
    this.boatWake = WaterDecal.foam(7, 1.6, 0);
    this.boatWake.position.x = -4.2;
    this.boat.add(this.boatWake, this.boatBob);
    this.root.add(this.boat);

    // The built change, carried by the crane and then by the boat.
    const crateSource = models.dock.getObjectByName("CraneCrate")!;
    this.boatCrate = crateSource.clone(true);
    this.boatCrate.position.set(0, 0, 0);
    ToonKit.prepare(this.boatCrate, { pick: (name) => (name === "pal_cobalt" ? accent : undefined) });
    this.socket = sailboat.getObjectByName("CrateSocket") ?? sailboat;
    this.socket.add(this.boatCrate);
    this.boatCrate.visible = false;

    // Evidence sources and the selected finding.
    HarborLayout3D.SOURCE_BUOYS.forEach((p, i) => {
      const f = this.buoy(models.buoy, p.x, p.z, ink, 1.05);
      f.phase = i * 1.7;
      this.sources.push(f);
      const ping = this.ring(1.0, 1.25, HarborTheme.ACCENT);
      this.root.add(ping);
      this.sourcePings.push(ping);
    });
    this.markerBand = ink.clone();
    this.marker = this.buoy(models.buoy, HarborLayout3D.MARKER.x, HarborLayout3D.MARKER.z, this.markerBand, 1.2);
    for (const [inner, outer] of [
      [1.2, 1.42],
      [1.9, 2.02]
    ]) {
      const ring = this.ring(inner, outer, HarborTheme.ACCENT);
      ring.position.set(HarborLayout3D.MARKER.x, 0.07, HarborLayout3D.MARKER.z);
      this.root.add(ring);
      this.markerRings.push(ring);
    }
    this.nextBuoy = this.buoy(models.buoy, HarborLayout3D.NEXT_BUOY.x, HarborLayout3D.NEXT_BUOY.z, ink, 1.1);

    // The working dock.
    this.dock = models.dock.clone(true);
    this.dock.position.set(HarborLayout3D.DOCK.x, 0, HarborLayout3D.DOCK.z);
    const glass = new THREE.Color(HarborTheme.INK).lerp(new THREE.Color("#5a6170"), 0.4);
    this.hookMaterial = ink.clone();
    ToonKit.prepare(this.dock, {
      pick: (name, mesh) => {
        if (name === "pal_cobalt") return accent;
        if (name === "pal_glass" && within(mesh, /^WorkshopWindow/)) {
          const m = new THREE.MeshToonMaterial({ color: glass.clone(), gradientMap: ToonKit.gradientMap() });
          this.windowMaterials.push(m);
          return m;
        }
        if (name === "pal_ink" && within(mesh, /^CraneHook/)) return this.hookMaterial;
        return undefined;
      }
    });
    this.root.add(this.dock);
    this.slew = this.dock.getObjectByName("CraneSlew")!;
    this.trolley = this.dock.getObjectByName("CraneTrolley")!;
    this.hook = this.dock.getObjectByName("CraneHook")!;
    this.crate = this.dock.getObjectByName("CraneCrate")!;
    this.crateRest.copy(this.crate.position);
    this.workshopFocus = this.dock.getObjectByName("WorkshopFocus") ?? this.dock;
    this.cable = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1, 0.035), ToonKit.glow(HarborTheme.INK));
    this.dock.add(this.cable);
    for (const name of ["WorkshopWindow_0", "WorkshopWindow_1"]) {
      const node = this.dock.getObjectByName(name);
      if (!node) continue;
      const glow = WaterDecal.glow(3.2, 0);
      glow.position.copy(node.position).add(new THREE.Vector3(0, 0, 0.5));
      this.dock.add(glow);
      this.windowGlows.push(glow);
    }
    const quayLamp = this.dock.getObjectByName("QuayLamp");
    if (quayLamp) {
      const g = WaterDecal.glow(1.4, 0.55);
      quayLamp.getWorldPosition(g.position);
      this.dock.worldToLocal(g.position);
      g.position.y += 3.86;
      this.dock.add(g);
    }

    // Lighthouse with a turning lamp.
    const lighthouse = models.lighthouse.clone(true);
    ToonKit.prepare(lighthouse);
    lighthouse.position.set(9, 0, -24);
    lighthouse.scale.setScalar(1.25);
    const lamp = lighthouse.getObjectByName("LighthouseLamp");
    if (lamp) {
      lamp.add(this.beam.group);
      const g = WaterDecal.glow(3.4, 0.7);
      lamp.add(g);
    }
    this.root.add(lighthouse);

    // Land: headland, town, the far ridge, islets, reef, rocks and palms.
    const terrain = models.terrain;
    const place = (node: THREE.Object3D, x: number, y: number, z: number, s = 1, yaw = 0) => {
      ToonKit.prepare(node);
      node.position.set(x, y, z);
      node.scale.setScalar(s);
      node.rotation.y = yaw;
      this.root.add(node);
      return node;
    };
    place(part(terrain, "Headland"), -47, 0, -13, 1.15, 0.1);
    place(part(terrain, "TownHill"), 37, 0, -25, 1.1);
    const ridge = place(part(terrain, "FarRidge"), 6, -0.3, -100, 2.2);
    ridge.scale.y = 0.9;
    place(part(terrain, "Islet_A"), -27, 0, -15, 1.2);
    place(part(terrain, "Islet_B"), 50, 0, -7, 1.3);
    place(part(terrain, "Reef"), HarborLayout3D.REEF.x, 0, HarborLayout3D.REEF.z, 1.3);
    const props = models.props;
    // Foreground framing on the right edge of the opening view.
    place(part(props, "Rock_C"), -39.5, 0, 14.5, 1.3, 0.4);
    place(part(props, "Palm_B"), -39.2, 0.55, 14.2, 1.2, 0.8);
    place(part(props, "Palm_A"), -26.4, 1.0, -14.7, 1.1, 1.2);
    place(part(props, "Palm_B"), -28.2, 0.8, -14.1, 0.9, 2.1);
    // Foreground rocks: the near layer of the opening composition.
    place(part(props, "Rock_A"), -27.5, 0, 10.5, 1.0, 0.7);
    place(part(props, "Rock_B"), -26, 0, 11.6, 0.7, 2.4);
    place(part(props, "Rock_A"), -27, 0, -4.5, 1.0, 1.1);
    place(part(props, "Rock_B"), 14.5, 0, -5.2, 1.1);
    place(part(props, "Rock_A"), 47, 0, 1.2, 0.9, 2.2);
    place(part(props, "Palm_A"), 49.6, 1.1, -7.2, 1.25, 0.6);
    for (const [x, z, w, d] of [
      [-39.5, 14.5, 6, 3.2],
      [-27, -4.5, 3.4, 2.2],
      [-27, 11, 4.6, 3.2],
      [14.5, -5.2, 3.2, 2.2],
      [HarborLayout3D.REEF.x, HarborLayout3D.REEF.z, 6.8, 3.4]
    ]) {
      const f = WaterDecal.foam(w, d, 0.75);
      f.position.set(x, 0.05, z);
      this.root.add(f);
    }

    // Harbour neighbours: never cobalt, they bob quietly.
    const boats = models.boats;
    const neighbour = (name: string, x: number, z: number, yaw: number, s = 1) => {
      const node = part(boats, name);
      ToonKit.prepare(node);
      node.scale.setScalar(s);
      const g = new THREE.Group();
      g.add(node);
      const shadow = WaterDecal.shadow(4.6 * s, 2 * s, 0.4);
      const holder = new THREE.Group();
      holder.add(shadow, g);
      holder.position.set(x, 0, z);
      holder.rotation.y = yaw;
      this.root.add(holder);
      this.floaters.push({ group: g, x, z, phase: x * 0.37, amp: 1, baseYaw: 0 });
    };
    // Provider boats: the same neutral sloop, sailing into the Find view. Never cobalt.
    HarborLayout3D.PROVIDERS.forEach((p, i) => {
      const node = part(boats, "SmallSloop");
      ToonKit.prepare(node);
      node.scale.setScalar(p.scale);
      const bob = new THREE.Group();
      bob.add(node);
      const holder = new THREE.Group();
      holder.add(WaterDecal.shadow(4.6 * p.scale, 2 * p.scale, 0.4), WaterDecal.foam(4.4 * p.scale, 1.9 * p.scale, 0.7), bob);
      this.root.add(holder);
      const masthead = node.getObjectByName("SmallPennant") ?? node;
      this.providers.push({ holder, bob, masthead, phase: 0.8 + i * 1.3 });
    });

    // The client's harbor: Example Studio's town on the hill behind the quay.
    this.clientFocus.position.set(HarborLayout3D.CLIENT.x, HarborLayout3D.CLIENT.y, HarborLayout3D.CLIENT.z);
    this.root.add(this.clientFocus);

    neighbour("SmallSloop", 5.5, -11.5, 0.5);
    neighbour("SmallSloop", 15.5, -13, -0.35, 0.9);
    neighbour("FishingBoat", 35.6, -3.1, 0);
    neighbour("Dinghy", 16.6, -1.7, 0.35);

    // Clouds and gulls.
    // Clouds stay paper-white: no fog, a soft toon band and their own ink line.
    const cloudMaterial = new THREE.MeshToonMaterial({ color: new THREE.Color("#fffaf0"), gradientMap: ToonKit.gradientMap(), fog: false });
    const cloudNames = ["Cloud_A", "Cloud_B", "Cloud_C", "Cloud_A", "Cloud_C", "Cloud_B"];
    cloudNames.forEach((name, i) => {
      const c = part(props, name);
      ToonKit.prepare(c, { pick: () => cloudMaterial });
      c.position.set(-70 + i * 30, 15 + (i % 3) * 3.5, -120 - (i % 2) * 20);
      c.scale.set(5 + (i % 3), 4.2 + (i % 3), 5);
      this.root.add(c);
      this.clouds.push({ node: c, speed: 0.35 + (i % 3) * 0.12, baseX: c.position.x });
    });
    const gullSpots: [number, number, number, number][] = [
      [-30, 9.5, -2, 6],
      [-12, 11, -6, 8],
      [22, 12.5, -5, 7],
      [38, 10, -1, 5]
    ];
    gullSpots.forEach(([cx, cy, cz, r], i) => {
      const node = part(props, "Gull");
      ToonKit.prepare(node);
      node.scale.setScalar(1.25);
      this.root.add(node);
      this.gulls.push({
        node,
        wingL: node.getObjectByName("WingL"),
        wingR: node.getObjectByName("WingR"),
        cx,
        cy,
        cz,
        r,
        speed: 0.22 + i * 0.03,
        phase: i * 1.9
      });
    });
  }

  private buoy(source: THREE.Object3D, x: number, z: number, band: THREE.Material, scale: number): Floater {
    const node = source.clone(true);
    ToonKit.prepare(node, { pick: (name) => (name === "pal_band" ? band : undefined) });
    node.scale.setScalar(scale);
    const g = new THREE.Group();
    g.add(node);
    const holder = new THREE.Group();
    holder.add(WaterDecal.shadow(2.2 * scale, 2.2 * scale, 0.35), WaterDecal.foam(2.1 * scale, 2.1 * scale, 0.8), g);
    holder.position.set(x, 0, z);
    this.root.add(holder);
    const f = { group: g, x, z, phase: x, amp: 1.4, baseYaw: 0 };
    this.floaters.push(f);
    return f;
  }

  private ring(inner: number, outer: number, color: string) {
    const geometry = new THREE.RingGeometry(inner, outer, 48);
    geometry.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false }));
    mesh.renderOrder = 2;
    return mesh;
  }

  /** Update everything for one frame and place the camera. */
  update(frame: HarborFrame, camera: THREE.PerspectiveCamera, width: number, height: number, poses: CameraPose3D[], mirror: boolean) {
    const t = frame.ambient;
    const { scene } = frame;

    // Camera: the step's pose, the viewport's framing, then a restrained pointer offset.
    const pose = CameraRig3D.poseAt(frame.s, poses);
    const scaled: CameraPose3D = {
      ...pose,
      distance: pose.distance * CameraRig3D.distanceScale(frame.freeWidth, height),
      yaw: pose.yaw + frame.pointer.x * (mirror ? -1.6 : 1.6),
      pitch: pose.pitch - frame.pointer.y * 0.8
    };
    const [cx, cy, cz] = CameraRig3D.position(scaled);
    camera.position.set(cx, cy, cz);
    camera.lookAt(pose.target[0], pose.target[1], pose.target[2]);
    camera.fov = CameraRig3D.FOV;
    camera.aspect = width / Math.max(1, height);
    camera.setViewOffset(width, height, width / 2 - frame.focus.x, height / 2 - frame.focus.y, width, height);
    camera.updateProjectionMatrix();

    this.sky.update(camera);
    this.water.update(t, camera);

    // The boat sails the story; the swell and the wind are ambient.
    const b = HarborLayout3D.boatAt(frame.s);
    const swell = HarborWave.height(b.x, b.z, t);
    this.boat.position.set(b.x, 0, b.z);
    this.boat.rotation.y = b.yaw;
    this.boatBob.position.y = swell * 0.9 + Math.sin(t * 1.3) * 0.035;
    this.boatBob.rotation.x = Math.sin(t * 0.9) * 0.035 - b.sailing * 0.07;
    this.boatBob.rotation.z = Math.sin(t * 1.1 + 1) * 0.022;
    (this.boatWake.material as THREE.MeshBasicMaterial).opacity = b.sailing * 0.9;
    if (this.pennant) this.pennant.rotation.y = Math.sin(t * 5.2) * 0.22 + Math.sin(t * 8.1) * 0.08;

    for (const f of this.floaters) {
      f.group.position.y = HarborWave.height(f.x, f.z, t) * 0.9;
      f.group.rotation.x = Math.sin(t * 1.2 + f.phase) * 0.05 * f.amp;
      f.group.rotation.z = Math.sin(t * 0.95 + f.phase * 1.3) * 0.045 * f.amp;
    }

    // Evidence: cobalt pings spread from each source while the chart is being charted.
    this.sourcePings.forEach((ping, i) => {
      const src = HarborLayout3D.SOURCE_BUOYS[i];
      const cycle = (t * 0.45 + i * 0.33) % 1;
      ping.position.set(src.x, 0.08, src.z);
      ping.scale.setScalar(0.8 + cycle * 1.6);
      (ping.material as THREE.MeshBasicMaterial).opacity = scene.sources * (1 - cycle) * 0.85;
      ping.visible = scene.sources > 0.01;
    });
    // Provider boats sail in on Find and lie at their moorings afterwards.
    HarborLayout3D.PROVIDERS.forEach((p, i) => {
      const b = this.providers[i];
      const k = scene.providers;
      const e = k * k * (3 - 2 * k);
      const x = p.from.x + (p.x - p.from.x) * e;
      const z = p.from.z + (p.z - p.from.z) * e;
      b.holder.position.set(x, 0, z);
      b.holder.rotation.y = p.yaw;
      b.bob.position.y = HarborWave.height(x, z, t) * 0.9;
      b.bob.rotation.x = Math.sin(t * 1.05 + b.phase) * 0.04 - (1 - e) * e * 0.18;
      b.bob.rotation.z = Math.sin(t * 0.9 + b.phase * 1.4) * 0.03;
    });

    // Once located (Evidence, second line) the finding F01 stays cobalt.
    this.markerBand.color.set(HarborTheme.INK).lerp(new THREE.Color(HarborTheme.ACCENT), scene.selected);
    this.markerRings.forEach((ring, i) => {
      const pulse = i === 1 ? 1 + ((t * 0.6) % 1) * 0.35 : 1;
      ring.scale.setScalar(pulse);
      (ring.material as THREE.MeshBasicMaterial).opacity = scene.marker * (i === 0 ? 0.9 : 0.5 * (1 - ((t * 0.6) % 1)));
      ring.visible = scene.marker > 0.01;
    });

    this.route.update(t, scene.route);
    this.nextRoute.update(t, scene.nextRoute, 0.85);
    this.nextBuoy.group.scale.setScalar(Math.max(0.001, scene.nextRoute));

    this.updateCrane(scene.crane, scene.hook);

    // Workshop windows warm up while we build.
    const lit = scene.workshop;
    const glass = new THREE.Color(HarborTheme.INK).lerp(new THREE.Color("#5a6170"), 0.4);
    const warm = new THREE.Color(HarborTheme.WINDOW_LIT);
    for (const m of this.windowMaterials) m.color.copy(glass).lerp(warm, lit);
    for (const g of this.windowGlows) g.material.opacity = lit * 0.75;

    this.beam.group.rotation.y = t * 0.55;
    // Clouds drift slowly and wrap around the camera's stretch of coast.
    for (const c of this.clouds) {
      const span = 240;
      const x = (((c.baseX + t * c.speed + span / 2) % span) + span) % span - span / 2;
      c.node.position.x = x + camera.position.x * 0.7;
    }
    for (const g of this.gulls) {
      const a = t * g.speed + g.phase;
      g.node.position.set(g.cx + Math.cos(a) * g.r, g.cy + Math.sin(a * 2.1) * 0.6, g.cz + Math.sin(a) * g.r * 0.55);
      g.node.rotation.y = Math.atan2(Math.cos(a) * g.r * 0.55, Math.sin(a) * g.r) + Math.PI;
      g.node.rotation.z = Math.sin(a * 2.1) * 0.12;
      const flap = Math.sin(t * 7 + g.phase) * 0.55 * (0.4 + 0.6 * Math.max(0, Math.sin(t * 0.7 + g.phase)));
      if (g.wingL) g.wingL.rotation.x = -flap;
      if (g.wingR) g.wingR.rotation.x = flap;
    }
  }

  private updateCrane(value: number, release: number) {
    const { lift, slew, lower } = CraneMotion3D.phases(value);
    const pivot = this.slew.position;
    // Boat socket in dock space (the boat is at its berth while the crane works).
    this.boat.updateMatrixWorld(true);
    this.socket.getWorldPosition(tmp);
    this.dock.worldToLocal(tmp);
    const restAngle = Math.atan2(-(this.crateRest.z - pivot.z), this.crateRest.x - pivot.x);
    const restR = Math.hypot(this.crateRest.x - pivot.x, this.crateRest.z - pivot.z);
    const boatAngle = Math.atan2(-(tmp.z - pivot.z), tmp.x - pivot.x);
    const boatR = Math.hypot(tmp.x - pivot.x, tmp.z - pivot.z);
    const angle = lerpAngle(restAngle, boatAngle, slew);
    const r = restR + (boatR - restR) * slew;
    this.slew.rotation.y = angle;
    this.trolley.position.x = r;

    const sling = 1.26;
    const groundY = this.crateRest.y + sling;
    const highY = pivot.y - 2.6;
    const deckY = tmp.y + sling;
    const landed = value >= 0.999;
    // Once the crate is aboard, the empty hook rises clear of the mast and sails.
    const up = release * release * (3 - 2 * release);
    const y = landed ? deckY + (highY - deckY) * up : lower > 0 ? highY + (deckY - highY) * lower : groundY + (highY - groundY) * lift;
    const hx = pivot.x + Math.cos(angle) * r;
    const hz = pivot.z - Math.sin(angle) * r;
    this.hook.position.set(hx, y, hz);
    this.crate.position.set(hx, y - sling, hz);

    this.crate.visible = !landed;
    this.boatCrate.visible = landed;

    const top = pivot.y + 0.02;
    const bottom = y + 0.3;
    this.cable.position.set(hx, (top + bottom) / 2, hz);
    this.cable.scale.y = Math.max(0.01, top - bottom);

    const active = value > 0.001 && value < 0.999;
    this.hookMaterial.color.set(active ? HarborTheme.ACCENT : HarborTheme.INK);
  }

  /** World position of a named overlay anchor. */
  anchorWorld(anchor: HarborAnchor, out: THREE.Vector3): THREE.Vector3 | null {
    switch (anchor) {
      case "tag0":
      case "tag1":
      case "tag2":
      case "source0":
      case "source1":
      case "source2": {
        const i = Number(anchor.slice(-1));
        const f = this.sources[i];
        f.group.getWorldPosition(out);
        // Labels meet the buoy's top mark; their stems differ in length so neighbours never collide.
        out.y += 2.2;
        return out;
      }
      case "marker":
        this.marker.group.getWorldPosition(out);
        out.y += 2.3;
        return out;
      case "route":
        this.route.pointAt(0.42, out);
        out.y += 0.1;
        return out;
      case "crate":
        (this.crate.visible ? this.crate : this.boatCrate).getWorldPosition(out);
        out.y += 0.7;
        return out;
      case "workshop":
        return this.workshopFocus.getWorldPosition(out);
      case "boat":
        this.boat.getWorldPosition(out);
        out.y += 6.5;
        return out;
      case "provider0":
      case "provider1":
      case "provider2": {
        const b = this.providers[Number(anchor.slice(-1))];
        b.masthead.getWorldPosition(out);
        out.y += 0.55;
        return out;
      }
      case "client":
        return this.clientFocus.getWorldPosition(out);
      case "nextBuoy":
        this.nextBuoy.group.getWorldPosition(out);
        out.y += 2.6;
        return out;
      default:
        return null;
    }
  }

  project(anchor: HarborAnchor, camera: THREE.Camera, width: number, height: number): ScreenPoint | null {
    const p = this.anchorWorld(anchor, tmp2);
    if (!p) return null;
    p.project(camera);
    if (p.z > 1 || p.z < -1) return null;
    return { x: ((p.x + 1) / 2) * width, y: ((1 - p.y) / 2) * height };
  }
}
