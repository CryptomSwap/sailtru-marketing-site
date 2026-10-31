import * as THREE from "three";
import { storyEase } from "./harbor-narrative";

// Berths are beside the piers, not inside them. Routes avoid the island and
// the two perpendicular dock extensions, even after construction completes.
export function createHarborRoute(provider: number) {
  const west = provider < 2;
  const x = west ? -1.45 : provider === 2 ? 1.45 : 4.1;
  const z = [-.55, .85, -.45, 2.25][provider];
  const farX = west ? -5.5 - provider * .3 : 5.7;
  const entranceX = west ? -3 : 4.25;
  const approach = provider === 2
    ? [[5.7, 5.5], [4.4, 3.8], [4.1, .25], [2.0, .25], [x, z + .65], [x, z]]
    : [[farX, 5.8], [entranceX, 4.5], [x, z + 1.8], [x, z + .65], [x, z]];
  const inbound = new THREE.CatmullRomCurve3(approach.map(([a, b]) => new THREE.Vector3(a, 0, b)), false, "centripetal");
  // Depart along the same safe channel in reverse. The dockside turn is made
  // while stationary so boats never swing through the wooden pier.
  const outbound = new THREE.CatmullRomCurve3([...inbound.points].reverse().map(p => p.clone()), false, "centripetal");
  return { inbound, outbound };
}

export function sampleHarborVisit(phase: number, route: ReturnType<typeof createHarborRoute>, point: THREE.Vector3, tangent: THREE.Vector3) {
  if (phase < .4) {
    const t = THREE.MathUtils.smoothstep(phase, 0, .4);
    route.inbound.getPointAt(t, point); route.inbound.getTangentAt(t, tangent);
  } else if (phase < .57) {
    route.inbound.getPointAt(1, point);
    const turn = THREE.MathUtils.smoothstep(phase, .48, .57) * Math.PI;
    tangent.set(Math.sin(turn), 0, -Math.cos(turn));
  } else {
    const t = THREE.MathUtils.smoothstep(phase, .57, 1);
    route.outbound.getPointAt(t, point); route.outbound.getTangentAt(t, tangent);
  }
}

// The hull and sail fit within a .72-unit horizontal radius at full scale,
// including roll. Reserve an entire side channel for the complete visit:
// following boats cannot meet returning boats head-on or occupy their berth.
export const BOAT_CLEARANCE = 1.6;
export const BOAT_SCALE = .62;
export const boatActivation = (index: number) => index < 4 ? .18 + index * .02 : .54 + (index % 4) * .015;

export function createFeaturedRoute() {
  return new THREE.CatmullRomCurve3([
    [-14,0,9.5],[-10.5,0,8.7],[-7,0,6.8],[-4.8,0,6.8],[-2.8,0,5.5],[-2.1,0,2.7],[-1.45,0,.6],[-1.45,0,-.55],
  ].map(p=>new THREE.Vector3(...p)),false,"centripetal");
}

// One-way traffic calls beside each SailTru destination island. Even
// arc-length spacing keeps the fleet moving without queues or overtaking.
export function createHarborCircuit() {
  return new THREE.CatmullRomCurve3([
    [.5,0,16.1],[8,0,15],[15,0,12],[16,0,7.5],
    [16,0,1],[15,0,-2.1],[12.8,0,-3.2],[8,0,-2.5],
    [4.8,0,-2],[4.8,0,.2],[4.8,0,3.8],[4,0,5.9],
    [.5,0,8.2],[-5.2,0,9.1],[-10.8,0,8.8],[-7,0,13.2],
  ].map(p=>new THREE.Vector3(...p)),true,"centripetal");
}

export function createHarborTraffic({directed=false}: {directed?:boolean}={}) {
  const legs = [
    {a:0,b:.12,points:[[5,0,7],[3,0,10],[-2.2,0,12]]},
    {a:.29,b:.38,points:[[-2.2,0,12],[-6,0,11],[-7,0,6]]},
    {a:.45,b:.56,points:[[-7,0,6],[-3,0,5],[2,0,6],[7.2,0,2]]},
    {a:.66,b:.75,points:[[7.2,0,2],[13.7,0,3],[14.5,0,7],[13,0,10.5]]},
    {a:.82,b:.91,points:[[13,0,10.5],[8,0,13],[3,0,11],[0,0,7]]},
  ].map(leg=>({...leg,curve:new THREE.CatmullRomCurve3(leg.points.map(p=>new THREE.Vector3(...p)),false,"centripetal")}));
  // Ambient traffic stays in open water, clear of the scroll-controlled boat.
  // It must remain safe even when the reader pauses the hero indefinitely.
  const circuit=new THREE.CatmullRomCurve3(Array.from({length:16},(_,i)=>{
    const angle=i*Math.PI/8;
    return new THREE.Vector3(2+18*Math.cos(angle),0,23+5*Math.sin(angle));
  }),true,"centripetal");
  let fleetDistance=0;
  const boats = Array.from({length:8},(_,index)=>({
    index, active:false, phase:0, elapsed:0, visits:0,
    route:createHarborRoute(index%4),
    point:new THREE.Vector3(), tangent:new THREE.Vector3(),
  }));
  // Routes 0/1 share the west approach; 2/3 share the east approach.
  // The two route envelopes are separated by more than BOAT_CLEARANCE.
  const queues = [[0,1,4,5],[2,3,6,7]];
  const cursor = [0,0];
  function step(delta: number, progress: number) {
    const dt=Math.min(Math.max(delta,0),.05);
    if(directed){
      const hero=boats[0];
      hero.active=true;hero.elapsed+=dt;
      const leg=legs.findLast(leg=>progress>=leg.a)??legs[0];
      const travel=storyEase(progress,leg.a,leg.b);
      hero.phase=travel;
      leg.curve.getPointAt(travel,hero.point);leg.curve.getTangentAt(travel,hero.tangent);
      fleetDistance=(fleetDistance+dt*.052)%1;
      for(const boat of boats.slice(1)){
        boat.active=true;boat.elapsed+=dt;
        const phase=(fleetDistance+(boat.index-1)/7)%1;
        if(phase<boat.phase)boat.visits++;
        boat.phase=phase;
        circuit.getPointAt(phase,boat.point);circuit.getTangentAt(phase,boat.tangent);
      }
      return;
    }
    for(const boat of boats) {
      if(!boat.active)continue;
      boat.elapsed+=dt;
      boat.phase=Math.min(boat.elapsed/(26+(boat.index%4)*2),1);
      sampleHarborVisit(boat.phase,boat.route,boat.point,boat.tangent);
      if(boat.phase>=1){boat.active=false;boat.visits++;}
    }
    queues.forEach((queue,lane)=>{
      if(queue.some(index=>boats[index].active))return;
      for(let offset=0;offset<queue.length;offset++){
        const slot=(cursor[lane]+offset)%queue.length;
        const boat=boats[queue[slot]];
        if(progress<boatActivation(boat.index)+.02)continue;
        boat.active=true;boat.elapsed=0;boat.phase=0;
        sampleHarborVisit(0,boat.route,boat.point,boat.tangent);
        cursor[lane]=(slot+1)%queue.length;
        break;
      }
    });
  }
  return {boats,step};
}
