// Run: node scripts/test-harbor-traffic.mjs
import assert from 'node:assert/strict';
import load from './load-story-module.cjs';
const { createHarborTraffic, createHarborRoute, BOAT_CLEARANCE } = load('../src/components/sections/illustrated-journey/harbor-traffic.ts');

// Independently sweep complete route envelopes, not just a lucky frame schedule.
let envelopeGap=Infinity;
const routes=Array.from({length:4},(_,i)=>createHarborRoute(i).inbound.getSpacedPoints(600));
for(const west of [0,1])for(const east of [2,3]){
  for(const a of routes[west])for(const b of routes[east])envelopeGap=Math.min(envelopeGap,a.distanceTo(b));
}
assert.ok(envelopeGap>BOAT_CLEARANCE+.1,`Route envelopes too close: ${envelopeGap}`);
for(const points of routes)assert.ok(points[0].length()>7.8,'Spawn must be outside visible water traffic');

for(const mode of ['steady','scroll-reversal','frame-stalls']){
  const traffic=createHarborTraffic();
  let gap=Infinity;
  for(let frame=0;frame<72000;frame++){
    // Finish at the fully built harbor to verify each unlocked boat gets served.
    const progress=mode==='scroll-reversal' && frame<54000 ? (Math.sin(frame/1300)+1)/2 : 1;
    const delta=mode==='frame-stalls' && frame%57===0 ? .9 : 1/60;
    traffic.step(delta,progress);
    const active=traffic.boats.filter(b=>b.active);
    for(let i=0;i<active.length;i++)for(let j=i+1;j<active.length;j++){
      assert.notEqual(active[i].index%4<2,active[j].index%4<2,'Shared approach reservation violated');
      const distance=active[i].point.distanceTo(active[j].point);
      gap=Math.min(gap,distance);
      assert.ok(distance>=BOAT_CLEARANCE,`${mode}: boats overlap at frame ${frame}`);
    }
  }
  assert.ok(traffic.boats.every(b=>b.visits>0),'A queued provider never got a turn');
  console.log(`${mode}: passed 72,000 frames; minimum center spacing ${gap.toFixed(3)}; all eight boats completed visits`);
}
console.log(`Independent route envelope clearance: ${envelopeGap.toFixed(3)} (required ${BOAT_CLEARANCE})`);

let directedGap=Infinity;
const directed=createHarborTraffic({directed:true});
for(let frame=0;frame<72000;frame++){
  const p=(Math.sin(frame/310)+1)/2;
  directed.step(frame%101===0?.8:1/60,p);
  const active=directed.boats.filter(b=>b.active);
  assert.equal(active.length,8,'The harbor should sustain all eight boats');
  for(let i=0;i<active.length;i++)for(let j=i+1;j<active.length;j++){
    const gap=active[i].point.distanceTo(active[j].point);
    directedGap=Math.min(directedGap,gap);
    assert.ok(gap>=BOAT_CLEARANCE,'Directed boats overlap');
  }
  assert.ok(active.slice(1).every(b=>b.point.z>17),'Ambient boats must stay beyond the island and pier envelopes');
}
assert.ok(directed.boats.slice(1).every(b=>b.visits>10),'Every provider must circulate continuously');
directed.step(0,.7);const dock=directed.boats[0].point.clone();
for(let i=0;i<100;i++)directed.step(.05,.7);
assert.ok(dock.distanceTo(directed.boats[0].point)<1e-8,'Featured boat must hold when scrolling stops');
directed.step(0,.2);const before=directed.boats[0].point.clone();
directed.step(0,.8);directed.step(0,.2);
assert.ok(before.distanceTo(directed.boats[0].point)<1e-8,'Scroll reversal must restore story position');
console.log(`Directed story: 72,000 reversal frames passed; route gap ${directedGap.toFixed(3)}; hold and replay deterministic`);
