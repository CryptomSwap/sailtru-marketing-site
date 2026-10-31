import assert from 'node:assert/strict';
import * as THREE from 'three';
import load from './load-story-module.cjs';
const { sampleHarborCamera } = load('../src/components/sections/illustrated-journey/harbor-camera.ts');
const { createHarborTraffic } = load('../src/components/sections/illustrated-journey/harbor-traffic.ts');
const { narrativeState, getHarborNarrative } = load('../src/components/sections/illustrated-journey/harbor-narrative.ts');

// Readers can stop anywhere or scrub backwards. The scene must be continuous
// and repeatable, and each encounter must leave a genuine reading hold.
const traffic=createHarborTraffic({directed:true});
const previous=new THREE.Vector3(),position=new THREE.Vector3(),target=new THREE.Vector3();
const chapters=new Set();
for(let i=0;i<=10000;i++){
  const p=i/10000;
  traffic.step(0,p);
  if(i)assert.ok(previous.distanceTo(traffic.boats[0].point)<.05,'Hero jumps between encounters');
  previous.copy(traffic.boats[0].point);
  chapters.add(narrativeState(p).chapter);
  // Every journey point is water, outside the main pier and workshop.
  assert.ok(previous.z>=1.8,'Hero crosses the shoreline or foundry pier');
  for(const portrait of [false,true]){
    const fov=sampleHarborCamera(p,portrait,position,target);
    assert.ok(Number.isFinite(fov)&&position.distanceTo(target)>8,'Invalid or cramped camera');
  }
}
assert.equal(chapters.size,6);
for(const he of [false,true])assert.equal(getHarborNarrative(he).length,6);
for(const portrait of [false,true]){
  const angles=[];
  for(const p of [.04,.21,.40,.60,.78,.94]){
    sampleHarborCamera(p,portrait,position,target);
    const start=position.clone();
    sampleHarborCamera(p+.005,portrait,position,target);
    assert.ok(start.distanceTo(position)<1e-8,'Camera drifts during a reading hold');
    angles.push(Math.atan2(position.y-target.y,Math.hypot(position.x-target.x,position.z-target.z)));
    sampleHarborCamera(1-p,portrait,position,target);
    sampleHarborCamera(p,portrait,position,target);
    assert.ok(start.distanceTo(position)<1e-8,'Camera reversal is not deterministic');
  }
  assert.ok(Math.max(...angles)-Math.min(...angles)>.45,'POV needs meaningful elevation changes');
}
console.log('Story passed: 10,001 route positions, six bilingual chapters, desktop/portrait camera holds and reversible POV changes.');
