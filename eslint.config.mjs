import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  // Vendored, minified Draco decoder copied from three/examples (not project source).
  { ignores: ["public/draco/**"] }
];

export default config;
