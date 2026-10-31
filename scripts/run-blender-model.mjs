import { existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

function findBlender() {
  if (process.platform === "win32") {
    const foundation = "C:\\Program Files\\Blender Foundation";
    if (existsSync(foundation)) {
      const installations = readdirSync(foundation, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name.startsWith("Blender "))
        .map((entry) => path.join(foundation, entry.name, "blender.exe"))
        .filter(existsSync)
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
      if (installations.length) return installations[0];
    }
  }
  return "blender";
}

const blender = findBlender();
const result = spawnSync(
  blender,
  ["--background", "--python", "scripts/build-sailtru-boat-blender.py"],
  { cwd: process.cwd(), stdio: "inherit" },
);

if (result.error) {
  console.error(`Could not start Blender at ${blender}: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
