import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BlenderLocator } from "./blender-locator.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(repoRoot, "scripts", "build-sailtru-boat-blender.py");

let blender;
let blenderScript;
try {
  blender = BlenderLocator.find();
  blenderScript = BlenderLocator.toBlenderPath(script, blender);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`Using Blender: ${blender}`);
const result = spawnSync(blender, ["--background", "--python", blenderScript], {
  cwd: repoRoot,
  stdio: "inherit",
});

if (result.error) {
  console.error(`Could not start Blender at ${blender}: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
