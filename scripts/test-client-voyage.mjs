import assert from 'node:assert/strict';
import * as THREE from 'three';
import load from './load-story-module.cjs';
const {sampleBuyer,sampleClient,sampleBayCamera,COMPETITOR,BUYER_OUTBOUND,BUYER_INBOUND}=load('../src/components/sections/illustrated-journey/client-voyage.ts');
const p=new THREE.Vector3(),tan=new THREE.Vector3(),camera=new THREE.Vector3(),target=new THREE.Vector3(),previous=new THREE.Vector3();
let maxCameraStep=0,maxBuyerStep=0;
for(let i=0;i<=10000;i++){
 const progress=i/10000;
 assert.ok(Number.isFinite(sampleBuyer(progress,p,tan)));
 if(i)maxBuyerStep=Math.max(maxBuyerStep,p.distanceTo(previous));previous.copy(p);
 sampleBuyer(1-progress,new THREE.Vector3(),tan);
 const repeated=new THREE.Vector3();sampleBuyer(progress,repeated,tan);
 assert.ok(p.distanceTo(repeated)<1e-8,'Reverse scrolling changed a buyer position');
 for(const portrait of [false,true]){
  const fov=sampleBayCamera(progress,portrait,camera,target);
  assert.ok(fov>=38&&fov<=55&&camera.y>3&&camera.distanceTo(target)>10,'Invalid camera framing');
  if(i){const before=new THREE.Vector3();sampleBayCamera(progress-.0001,portrait,before,new THREE.Vector3());maxCameraStep=Math.max(maxCameraStep,camera.distanceTo(before));}
 }
}
assert.ok(maxBuyerStep<.2,`Buyer jumps: ${maxBuyerStep}`);
assert.ok(maxCameraStep<1,`Camera jumps: ${maxCameraStep}`);
assert.ok(Math.hypot(COMPETITOR[0],COMPETITOR[2])>100,'Competitor must be genuinely distant');
assert.ok(BUYER_OUTBOUND.getLength()>90&&BUYER_INBOUND.getLength()>120,'Voyages are too short');
for(const [a,b] of [[.045,.11],[.38,.45],[.55,.61],[.91,.99]]){
 const start=new THREE.Vector3();sampleBayCamera(a,false,start,target);sampleBayCamera(b,false,camera,target);
 assert.ok(start.distanceTo(camera)<1e-6,'A reading hold moves the camera');
}
let maxLoopStep=0;
for(let boat=0;boat<8;boat++){
 for(let t=0;t<180;t+=.025){
  assert.ok(Number.isFinite(sampleClient(t,boat,p,tan)));
  const next=new THREE.Vector3();sampleClient(t+.025,boat,next,tan);
  maxLoopStep=Math.max(maxLoopStep,p.distanceTo(next));
  assert.ok(p.z>-.1,'Ambient boat enters the beach');
 }
}
assert.ok(maxLoopStep<.4,`A looping boat teleports: ${maxLoopStep}`);
console.log(`Passed: 10,001 reversible story positions; ${BUYER_OUTBOUND.getLength().toFixed(1)}/${BUYER_INBOUND.getLength().toFixed(1)}-unit voyages; camera continuity/reading holds; 3 minutes of all 8 continuous fleet loops. Max frame steps: buyer ${maxBuyerStep.toFixed(3)}, camera ${maxCameraStep.toFixed(3)}, fleet ${maxLoopStep.toFixed(3)}.`);
