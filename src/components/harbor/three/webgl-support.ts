/**
 * Decides whether the 3D harbor may run. Kept free of three.js so the check
 * costs nothing in the main bundle.
 */
export class WebGLSupport {
  private static cached: boolean | null = null;

  /** A real context probe: create a WebGL2 context (three.js needs WebGL2), then release it straight away. */
  static available(): boolean {
    if (WebGLSupport.cached !== null) return WebGLSupport.cached;
    let ok = false;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      ok = Boolean(gl) && !gl!.isContextLost();
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      ok = false;
    }
    WebGLSupport.cached = ok;
    return ok;
  }

  static prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}
