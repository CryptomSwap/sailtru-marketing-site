import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BlenderLocator } from "./blender-locator.mjs";

/**
 * Builds the harbor set (public/models/harbor/*.glb) headless with Blender.
 * See scripts/build-harbor-assets-blender.py for what is generated in Blender and what is built in code.
 */
class HarborAssetBuild {
  static repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  static script = path.join(HarborAssetBuild.repoRoot, "scripts", "build-harbor-assets-blender.py");
  static outputs = ["sailboat.glb", "boats.glb", "buoy.glb", "lighthouse.glb", "dock.glb", "terrain.glb", "props.glb"];
  /** Budget per file (the hard limit is 2 MB; the set aims well below 400 KB each). */
  static maxBytes = 400 * 1024;

  static run() {
    let blender;
    let blenderScript;
    try {
      blender = BlenderLocator.find();
      blenderScript = BlenderLocator.toBlenderPath(HarborAssetBuild.script, blender);
    } catch (error) {
      console.error(error.message);
      return 1;
    }

    console.log(`Using Blender: ${blender}`);
    const result = spawnSync(blender, ["--background", "--factory-startup", "--python", blenderScript], {
      cwd: HarborAssetBuild.repoRoot,
      stdio: "inherit",
    });
    if (result.error) {
      console.error(`Could not start Blender at ${blender}: ${result.error.message}`);
      return 1;
    }
    if (result.status !== 0) return result.status ?? 1;
    return HarborAssetBuild.checkOutputs();
  }

  static checkOutputs() {
    let failed = false;
    for (const name of HarborAssetBuild.outputs) {
      const file = path.join(HarborAssetBuild.repoRoot, "public", "models", "harbor", name);
      if (!existsSync(file)) {
        console.error(`missing ${name}`);
        failed = true;
        continue;
      }
      const bytes = statSync(file).size;
      const over = bytes > HarborAssetBuild.maxBytes;
      console.log(`${name.padEnd(16)} ${(bytes / 1024).toFixed(1).padStart(7)} KB${over ? "  OVER BUDGET" : ""}`);
      failed ||= over;
    }
    return failed ? 1 : 0;
  }
}

process.exit(HarborAssetBuild.run());
