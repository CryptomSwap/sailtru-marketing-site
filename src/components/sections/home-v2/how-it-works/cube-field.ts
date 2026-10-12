import * as THREE from "three";

export const CUBE_COUNT = 64;
export const SHARDS = 4;

const LOGO_URLS = [
  "/images/brands/openai-white.svg",
  "/images/brands/google-color.svg",
  "/images/brands/perplexity-color.svg",
  "/images/brands/semrush-color.svg",
  "/images/brands/googleanalytics-color.svg",
  "/images/brands/n8n-color.svg",
  "/images/brands/hubspot-color.svg"
] as const;

export const LOGO_URLS_LIST = LOGO_URLS;

export type CubeField = {
  home: THREE.Vector3[];
  target: THREE.Vector3[];
  tangent: THREE.Vector3[];
  size: number[];
  delay: number[];
  along: number[];
  shardDir: THREE.Vector3[];
  logoOf: number[];
};

function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function buildCubeField(): CubeField {
  const home: THREE.Vector3[] = [];
  const target: THREE.Vector3[] = [];
  const tangent: THREE.Vector3[] = [];
  const size: number[] = [];
  const delay: number[] = [];
  const along: number[] = [];
  const shardDir: THREE.Vector3[] = [];

  for (let i = 0; i < CUBE_COUNT; i++) {
    const a = rand(i + 1);
    const b = rand(i + 19);
    const c = rand(i + 41);
    const d = rand(i + 53);
    const station = 0.08 + d * 0.72;
    const inward = new THREE.Vector3(a - 0.5, b - 0.5, c - 0.5);
    if (inward.lengthSq() < 1e-4) inward.set(0.2, 1, 0.1);
    inward.normalize().multiplyScalar(0.06 + rand(i + 3) * 0.38);
    home.push(new THREE.Vector3(-0.55 + (a - 0.5) * 0.85, (b - 0.5) * 1.2, (c - 0.5) * 0.7));
    target.push(inward);
    tangent.push(inward.clone().normalize());
    size.push(0.038 + Math.pow(rand(i + 7), 1.45) * 0.095);
    delay.push(rand(i + 13));
    along.push(station);
    for (let shard = 1; shard < SHARDS; shard++) {
      shardDir.push(
        new THREE.Vector3(rand(i * 17 + shard) - 0.5, rand(i * 29 + shard) - 0.5, rand(i * 11 + shard) - 0.5).normalize()
      );
    }
  }

  const order = size.map((value, index) => ({ value, index })).sort((p, q) => q.value - p.value);
  const logoOf = LOGO_URLS.map((_, index) => order[index].index);

  return { home, target, tangent, size, delay, along, shardDir, logoOf };
}

export function smooth(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

/** Ease-in. Cubes linger, then speed up into the stream. */
export function accel(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x;
}
