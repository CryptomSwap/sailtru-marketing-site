import * as THREE from "three";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float blobDisp(vec3 p, float time){
  float a=snoise(p*0.62+vec3(0.2,time*0.11,0.4));
  float b=snoise(p*1.2+vec3(time*0.06,1.6,0.3));
  return a*0.78+b*0.22;
}
`;

export type BlobMaterial = {
  material: THREE.ShaderMaterial;
  uniforms: { uTime: { value: number }; uForm: { value: number }; uClear: { value: number } };
};

/**
 * Alpha glass, not transmission. Transmission refracts the 3D scene only,
 * and with a clear canvas that scene is empty, so the droplet fills in as a solid.
 */
export function createBlobMaterial(): BlobMaterial {
  const uniforms = {
    uTime: { value: 0 },
    uForm: { value: 0 },
    uClear: { value: 0 }
  };
  const material = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
    blending: THREE.NormalBlending,
    uniforms,
    vertexShader: `
      uniform float uTime;
      uniform float uForm;
      uniform float uClear;
      out vec3 vNormal;
      out vec3 vView;
      ${NOISE}
      void main() {
        float amp = mix(0.18, 0.36, uForm) * (1.0 - uClear * 0.8);
        float lobe = snoise(position * 0.38 + vec3(1.7, uTime * 0.04, 0.4));
        float e = 0.16;
        float dx = blobDisp(position + vec3(e, 0.0, 0.0), uTime) - blobDisp(position - vec3(e, 0.0, 0.0), uTime);
        float dy = blobDisp(position + vec3(0.0, e, 0.0), uTime) - blobDisp(position - vec3(0.0, e, 0.0), uTime);
        float dz = blobDisp(position + vec3(0.0, 0.0, e), uTime) - blobDisp(position - vec3(0.0, 0.0, e), uTime);
        vec3 n = normalize(normal - vec3(dx, dy, dz) * amp / (2.0 * e));
        vec3 stretched = vec3(position.x * (1.14 + lobe * 0.08), position.y * (0.76 + lobe * 0.05), position.z * 1.22);
        vec3 p = stretched + normalize(normal) * blobDisp(position, uTime) * amp;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vView = -mv.xyz;
        vNormal = normalize(mat3(modelViewMatrix) * n);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform float uClear;
      in vec3 vNormal;
      in vec3 vView;
      out vec4 fragColor;
      void main() {
        vec3 n = normalize(vNormal);
        vec3 viewDir = normalize(vView);
        float ndv = clamp(abs(dot(n, viewDir)), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 2.9);
        vec3 key = normalize(vec3(0.32, 0.86, 0.42));
        vec3 halfDir = normalize(key + viewDir);
        float spec = pow(clamp(dot(n, halfDir), 0.0, 1.0), 90.0);
        float fill = pow(clamp(dot(n, normalize(vec3(-0.55, 0.15, 0.75))), 0.0, 1.0), 12.0);
        vec3 body = vec3(0.55, 0.76, 1.0);
        vec3 ice = vec3(0.94, 0.98, 1.0);
        vec3 col = mix(body, ice, fres);
        col += spec * 0.9;
        col += fill * vec3(0.65, 0.82, 1.0) * 0.18;
        float alpha = (0.025 + fres * 0.78 + spec * 0.5) * (1.0 - uClear * 0.94);
        fragColor = vec4(col, alpha);
      }
    `
  });
  return { material, uniforms };
}
