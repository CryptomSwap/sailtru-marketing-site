"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Object-space noise keeps the surface anchored while the camera orbits it.
const noise = `
float hash3(vec3 p) { p=fract(p*.3183099+vec3(.1,.2,.3)); p*=17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float noise3(vec3 p) {
  vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
    mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float terrain(vec3 p) { return noise3(p)*.54+noise3(p*2.03)*.27+noise3(p*4.11)*.13+noise3(p*8.21)*.06; }
`;

const planetVertex = `
varying vec3 localP; varying vec3 worldN; varying vec3 worldP;
void main(){ localP=position; worldN=normalize(mat3(modelMatrix)*normal);
  vec4 p=modelMatrix*vec4(position,1.); worldP=p.xyz; gl_Position=projectionMatrix*viewMatrix*p; }
`;

const planetFragment = `
${noise}
uniform vec3 baseColor; uniform vec3 highColor; uniform float gas;
varying vec3 localP; varying vec3 worldN; varying vec3 worldP;
void main(){
  vec3 p=normalize(localP);
  float relief=terrain(p*9.);
  float bands=sin(p.y*57.+terrain(p*5.)*12.)*.5+.5;
  float surface=mix(smoothstep(.36,.64,relief),bands,gas);
  vec3 albedo=mix(baseColor,highColor,surface);
  float cloud=smoothstep(.60,.76,terrain(p*17.+vec3(8.)));
  albedo=mix(albedo,vec3(.48,.61,.72),cloud*.24*(1.-gas));
  vec3 n=normalize(worldN);
  vec3 light=normalize(vec3(-.8,.55,.65));
  float day=max(dot(n,light),0.);
  float rim=pow(1.-max(dot(n,normalize(cameraPosition-worldP)),0.),3.);
  vec3 color=albedo*(.035+day*1.65)+vec3(.12,.36,.82)*rim*pow(day,.4)*.6;
  gl_FragColor=vec4(color,1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function Planet({ position, radius, gas = false }: { position: [number, number, number]; radius: number; gas?: boolean }) {
  const surface = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    // Rotate the surface inside the tilted axis; the ring plane stays stable.
    if (surface.current) surface.current.rotation.y += Math.min(delta, .05) * (gas ? .025 : .035);
  });
  const uniforms = useMemo(() => ({
    baseColor: { value: new THREE.Color(gas ? "#383742" : "#07172b") },
    highColor: { value: new THREE.Color(gas ? "#b7a48f" : "#456780") },
    gas: { value: gas ? 1 : 0 },
  }), [gas]);
  return <group position={position} rotation={[.18, -.4, gas ? -.25 : .2]}>
    <mesh ref={surface}><sphereGeometry args={[radius, 64, 48]} /><shaderMaterial uniforms={uniforms} vertexShader={planetVertex} fragmentShader={planetFragment} /></mesh>
    {gas && <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 1.35, radius * 2.05, 160]} />
      <shaderMaterial transparent side={THREE.DoubleSide} depthWrite={false}
        vertexShader={`varying vec3 p; void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
        fragmentShader={`varying vec3 p; void main(){float r=length(p.xy); float grain=.45+.25*sin(r*85.)+.2*sin(r*213.); gl_FragColor=vec4(.59,.62,.70,grain*.42);}`}
      />
    </mesh>}
  </group>;
}

export function useAsteroidMaterial() {
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({ color: "#646474", roughness: .98, metalness: .08 });
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = `varying vec3 rockP;\n${shader.vertexShader}`.replace("#include <begin_vertex>", "#include <begin_vertex>\nrockP=position;");
      shader.fragmentShader = `varying vec3 rockP;\n${noise}\n${shader.fragmentShader}`
        .replace("#include <color_fragment>", `#include <color_fragment>
          float grain=terrain(rockP*18.);
          diffuseColor.rgb*=mix(.24,1.35,grain);
        `)
        .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
          float height=terrain(rockP*22.);
          vec3 q0=dFdx(vViewPosition), q1=dFdy(vViewPosition);
          vec3 surf=cross(q1,normal)*dFdx(height)+cross(normal,q0)*dFdy(height);
          normal=normalize(normal+surf*.65);
        `);
    };
    mat.customProgramCacheKey = () => "sailtru-asteroid-v1";
    return mat;
  }, []);
  useEffect(() => () => material.dispose(), [material]);
  return material;
}

export function DeepSpace() {
  return <mesh>
    <sphereGeometry args={[140, 32, 24]} />
    <shaderMaterial side={THREE.BackSide} depthWrite={false}
      vertexShader={`varying vec3 p; void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
      fragmentShader={`${noise}
        varying vec3 p;
        void main(){vec3 d=normalize(p); float dust=terrain(d*5.+vec3(4.));
          float band=exp(-pow((d.y+.18+d.x*.22)*5.,2.));
          vec3 color=vec3(.001,.002,.006)+mix(vec3(.008,.013,.033),vec3(.03,.017,.04),dust)*pow(dust,2.)*band;
          gl_FragColor=vec4(color,1.);
          #include <colorspace_fragment>
        }`}
    />
  </mesh>;
}
