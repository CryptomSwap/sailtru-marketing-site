const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const THREE = require('three');
require.extensions['.ts'] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  module._compile(code,filename);
};
const {HarborDirector}=require('../src/components/harbor/three/harbor-director.ts');
const d=Object.create(HarborDirector.prototype);
d.dock=new THREE.Group();d.dock.position.set(24,0,-2);
d.slew=new THREE.Group();d.slew.position.set(1.3,8.1,-3.3);d.dock.add(d.slew);
d.trolley=new THREE.Group();d.trolley.position.set(4,.1,0);d.slew.add(d.trolley);
d.hook=new THREE.Group();d.crate=new THREE.Group();d.boatCrate=new THREE.Group();d.cable=new THREE.Mesh(new THREE.BoxGeometry(1,1,1));
d.dock.add(d.hook,d.crate,d.cable);
d.crateRest=new THREE.Vector3(5.2,.7,-2.7);
d.deliverySocket=new THREE.Vector3(21.5,1.4,-1.25);
d.hookMaterial=new THREE.MeshToonMaterial();
d.boat=new THREE.Group();d.socket=new THREE.Object3D();d.boat.add(d.socket);
function sample(value,release){
 d.updateCrane(value,release);d.dock.updateMatrixWorld(true);
 const trolley=d.trolley.getWorldPosition(new THREE.Vector3());
 const cableTop=d.cable.localToWorld(new THREE.Vector3(0,.5,0));
 assert.ok(trolley.distanceTo(cableTop)<1e-8,'Cable must remain attached to the trolley');
 assert.ok(d.trolley.position.x<=6 && d.trolley.position.x>=.4,'Trolley must remain on the boom');
 return {hook:d.hook.position.toArray(),cable:d.cable.position.toArray(),trolley:d.trolley.position.toArray(),yaw:d.slew.rotation.y};
}
for(const value of [0,.25,.5,.75,1]) sample(value,0);
const loaded=sample(1,1);
d.boat.position.set(80,10,30);d.boat.rotation.y=2;
assert.deepEqual(sample(1,1),loaded,'Crane must not follow the departing boat');
assert.equal(d.crate.visible,false);assert.equal(d.boatCrate.visible,true);
for(const value of [1,.75,.5,.25,0]) sample(value,0);
console.log('PASS: cable attachment, boom bounds, departure independence, cargo handoff, reverse progression');
