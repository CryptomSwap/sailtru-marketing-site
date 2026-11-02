/**
 * SailTru's boat keeps its bow along its course over the whole story: the cobalt entrance
 * (entryAt), the hand-off at the opening stop and every passage of the story path (boatAt),
 * in EN and in the mirrored HE stage.
 *
 * Run: npm run test:heading (Node's test runner; Node strips the types).
 */
import assert from "node:assert/strict";
import test from "node:test";
import { CobaltArrival, HarborLayout3D, type BoatPose3D, type XZ } from "../src/components/harbor/story-model.ts";

const DEG = 180 / Math.PI;
/** Largest turn between neighbouring samples (degrees). */
const MAX_STEP = 30;
/** Largest angle between the bow and the course (degrees). */
const MAX_OFF_COURSE = 60;

type Sample = { where: string; pose: BoatPose3D; course: XZ };

/** Bow direction on the water for a yaw (the bow is +x, turned about +y). */
function bow(yaw: number): XZ {
  return { x: Math.cos(yaw), z: -Math.sin(yaw) };
}

/** Angle (degrees) between two directions on the water. */
function between(a: XZ, b: XZ): number {
  return Math.abs(Math.atan2(a.x * b.z - a.z * b.x, a.x * b.x + a.z * b.z)) * DEG;
}

/** The stretch of the authored path (from one point to the next) that the boat is on at `t` ∈ [0, 1]. */
function stretch(points: XZ[], t: number): XZ {
  const n = points.length - 1;
  const i = Math.min(Math.floor(Math.min(1, Math.max(0, t)) * n), n - 1);
  return { x: points[i + 1].x - points[i].x, z: points[i + 1].z - points[i].z };
}

/**
 * The HE stage is the EN stage mirrored left-right as a whole (the canvases are flipped on
 * screen); the mirror image of a pose on the water is x → -x, with the bow turned to match.
 */
function mirror(sample: Sample): Sample {
  const { x, z, yaw, sailing } = sample.pose;
  return {
    where: sample.where,
    pose: { x: -x, z, yaw: Math.PI - yaw, sailing },
    course: { x: -sample.course.x, z: sample.course.z }
  };
}

/** The whole progression in order: the cobalt entrance, then the story path from the opening stop to the close. */
function journey(): Sample[] {
  const samples: Sample[] = [];
  const entry = HarborLayout3D.entry();
  const ENTRY_STEPS = 2000;
  for (let k = 0; k <= ENTRY_STEPS; k += 1) {
    const a = k / ENTRY_STEPS;
    samples.push({ where: `entry a=${a.toFixed(4)}`, pose: HarborLayout3D.entryAt(a), course: stretch(entry, CobaltArrival.boat(a)) });
  }
  const stations = HarborLayout3D.STATIONS;
  const max = stations.length - 1;
  const STORY_STEPS = 7000;
  for (let k = 0; k <= STORY_STEPS; k += 1) {
    const s = (max * k) / STORY_STEPS;
    const i = Math.min(Math.floor(s), max - 1);
    const passage = [stations[i], ...(HarborLayout3D.PASSAGES[i] ?? []), stations[i + 1]];
    samples.push({ where: `story s=${s.toFixed(4)}`, pose: HarborLayout3D.boatAt(s), course: stretch(passage, s - i) });
  }
  return samples;
}

const LOCALES: [string, (sample: Sample) => Sample][] = [
  ["en", (sample) => sample],
  ["he", mirror]
];

for (const [locale, stage] of LOCALES) {
  test(`${locale}: the boat never turns more than ${MAX_STEP}° between neighbouring samples`, () => {
    const samples = journey().map(stage);
    for (let k = 1; k < samples.length; k += 1) {
      const turn = Math.abs(HarborLayout3D.wrapAngle(samples[k].pose.yaw - samples[k - 1].pose.yaw)) * DEG;
      assert.ok(turn <= MAX_STEP, `${locale}: turns ${turn.toFixed(1)}° from ${samples[k - 1].where} to ${samples[k].where}`);
    }
  });

  test(`${locale}: under way, the boat moves along its course and its bow stays within ${MAX_OFF_COURSE}° of it`, () => {
    const samples = journey().map(stage);
    for (let k = 0; k + 1 < samples.length; k += 1) {
      const { pose, course, where } = samples[k];
      const next = samples[k + 1].pose;
      const travel = { x: next.x - pose.x, z: next.z - pose.z };
      // Held at a stop (and the hand-off sample itself) there is no way on to compare with.
      if (Math.hypot(travel.x, travel.z) < 1e-9) continue;
      const heading = bow(pose.yaw);
      const back = between(travel, course);
      assert.ok(back < 90, `${locale}: at ${where} the boat moves ${back.toFixed(1)}° off its course (it runs back along the path)`);
      const offTravel = between(heading, travel);
      assert.ok(offTravel <= MAX_OFF_COURSE, `${locale}: at ${where} the bow is ${offTravel.toFixed(1)}° off the direction of travel`);
      const offCourse = between(heading, course);
      assert.ok(offCourse <= MAX_OFF_COURSE, `${locale}: at ${where} the bow is ${offCourse.toFixed(1)}° off the course`);
    }
  });
}

test("the cobalt entrance hands off to the story path in place and heading", () => {
  const end = HarborLayout3D.entryAt(1);
  const start = HarborLayout3D.boatAt(0);
  assert.ok(Math.hypot(end.x - start.x, end.z - start.z) < 1e-9);
  assert.ok(Math.abs(HarborLayout3D.wrapAngle(end.yaw - start.yaw)) < 1e-9);
});

test("lerpAngle turns the short way round", () => {
  const a = HarborLayout3D.lerpAngle(Math.PI - 0.1, -Math.PI + 0.1, 0.5);
  assert.ok(Math.abs(HarborLayout3D.wrapAngle(a - Math.PI)) < 1e-12);
  assert.ok(Math.abs(HarborLayout3D.lerpAngle(0.2, 0.6, 0.25) - 0.3) < 1e-12);
});
