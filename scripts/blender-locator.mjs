import { existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

/**
 * Finds a Blender executable and prepares paths for it.
 *
 * Works on Windows, Linux and WSL. Under WSL the Windows blender.exe is used, so
 * script and output paths are translated with `wslpath -w` before they reach it.
 */
export class BlenderLocator {
  static WINDOWS_FOUNDATION = "C:\\Program Files\\Blender Foundation";
  static WSL_FOUNDATION = "/mnt/c/Program Files/Blender Foundation";

  static isWsl() {
    return process.platform === "linux" && Boolean(process.env.WSL_DISTRO_NAME || process.env.WSL_INTEROP);
  }

  /** The newest "Blender x.y/blender.exe" under a Blender Foundation directory, or null. */
  static newestInstall(foundation, joinPath) {
    if (!existsSync(foundation)) return null;
    const installs = readdirSync(foundation, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name.startsWith("Blender "))
      .map((entry) => ({ name: entry.name, exe: joinPath(foundation, entry.name, "blender.exe") }))
      .filter((install) => existsSync(install.exe))
      .sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }));
    return installs[0]?.exe ?? null;
  }

  /**
   * Order: BLENDER_PATH, Windows install, WSL view of the Windows install, then `blender` on PATH.
   * A BLENDER_PATH that points at a missing file is an error, not a silent fallback.
   */
  static find(env = process.env) {
    const override = env.BLENDER_PATH?.trim();
    if (override) {
      if (BlenderLocator.isWsl() && /^[A-Za-z]:[\\/]/.test(override)) return BlenderLocator.fromWindowsPath(override);
      const isBareCommand = !override.includes("/") && !override.includes("\\");
      if (!isBareCommand && !existsSync(override)) throw new Error(`BLENDER_PATH does not exist: ${override}`);
      return override;
    }
    if (process.platform === "win32") {
      const found = BlenderLocator.newestInstall(BlenderLocator.WINDOWS_FOUNDATION, path.win32.join);
      if (found) return found;
    }
    if (BlenderLocator.isWsl()) {
      const found = BlenderLocator.newestInstall(BlenderLocator.WSL_FOUNDATION, path.posix.join);
      if (found) return found;
    }
    return "blender";
  }

  /** A Windows-style BLENDER_PATH (C:\\...) seen from WSL, translated with `wslpath -u`. */
  static fromWindowsPath(windowsPath) {
    const result = spawnSync("wslpath", ["-u", windowsPath], { encoding: "utf8" });
    const unixPath = result.status === 0 ? result.stdout.trim() : "";
    if (!unixPath || !existsSync(unixPath)) throw new Error(`BLENDER_PATH does not exist: ${windowsPath}`);
    return unixPath;
  }

  /** True when `blender` is a Windows executable launched from WSL, which needs Windows-style paths. */
  static needsWindowsPaths(blender) {
    return BlenderLocator.isWsl() && /\.exe$/i.test(blender);
  }

  /** Translate a path for the given Blender with `wslpath -w` when it is blender.exe under WSL. */
  static toBlenderPath(target, blender) {
    if (!BlenderLocator.needsWindowsPaths(blender)) return target;
    const result = spawnSync("wslpath", ["-w", target], { encoding: "utf8" });
    if (result.error || result.status !== 0) {
      throw new Error(`wslpath -w failed for ${target}: ${result.error?.message ?? result.stderr.trim()}`);
    }
    return result.stdout.trim();
  }
}
