import * as THREE from "three";

const vertex = /* glsl */ `
uniform float uForm;
in vec3 aSpine;
out vec2 vUv;
out vec3 vNormal;
out vec3 vView;

void main() {
  vUv = uv;
  float grow = smoothstep(-0.08, 0.16, uForm * 1.22 - uv.x);
  vec3 p = mix(aSpine, position, grow);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vView = -mv.xyz;
  vNormal = normalize(mat3(modelViewMatrix) * normal);
  gl_Position = projectionMatrix * mv;
}
`;

const fragment = /* glsl */ `
uniform float uForm;
uniform float uBody;
in vec2 vUv;
in vec3 vNormal;
in vec3 vView;
out vec4 fragColor;

void main() {
  vec3 viewDir = normalize(vView);
  vec3 n = normalize(vNormal);
  float fres = pow(1.0 - clamp(abs(dot(n, viewDir)), 0.0, 1.0), 2.1);
  float along = vUv.x;
  float reveal = smoothstep(0.0, 0.08, uForm * 1.18 - along);
  float tip = smoothstep(0.0, 0.015, along) * smoothstep(1.0, 0.99, along);
  vec3 cobalt = vec3(0.28, 0.52, 0.98);
  vec3 ice = vec3(0.9, 0.96, 1.0);
  vec3 col = mix(cobalt, ice, smoothstep(0.2, 0.9, fres));
  float alpha = mix(uBody, min(uBody + 0.22, 0.72), fres) * reveal * tip;
  fragColor = vec4(col, alpha);
}
`;

export function createRibbonMaterial(body = 0.2) {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    uniforms: {
      uForm: { value: 0 },
      uBody: { value: body }
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.NormalBlending
  });
}
