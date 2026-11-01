import type Lenis from "lenis";

type Gsap = (typeof import("gsap"))["gsap"];

/**
 * Lenis smooth scrolling for the harbor story, driven by gsap.ticker.
 *
 * - Mounted once per page (reference counted); the libraries load lazily, so
 *   nothing is added to the first-load script.
 * - Off under prefers-reduced-motion: Lenis is never created and scrolling is
 *   native. The media query is followed at runtime (on → off destroys Lenis).
 * - Off without a fine pointer (phones, touch-only tablets): there is no wheel
 *   to smooth, so those pages keep plain native scrolling and native anchor
 *   jumps. A mouse or trackpad attached later starts it (any-pointer: fine).
 * - Wheel input only: touch keeps native scrolling (syncTouch stays off), and
 *   keyboard and focus scrolling stay native too; Lenis follows them.
 *   Programmatic jumps (chapter bar, same-page anchors) go through scrollTo.
 * - Lenis scrolls the window itself, so everything that reads window.scrollY
 *   (the story's progress, camera and cards) reads the smoothed scroll.
 *   ScrollTrigger is updated on every Lenis scroll, and requestFrame runs the
 *   story's loop on the same GSAP tick, right after Lenis has moved.
 * - Elements marked data-lenis-prevent (open nav sheets) keep native wheel
 *   scrolling, and an open nav sheet keeps the page locked.
 */
export class SmoothScroll {
  /** gsap.ticker's default lag smoothing (restored when Lenis stops). */
  private static readonly LAG_DEFAULT: [number, number] = [500, 33];

  private static lenis: Lenis | null = null;
  private static gsap: Gsap | null = null;
  private static tick: ((time: number) => void) | null = null;
  /** Lenis runs while motion is allowed and a fine pointer (mouse, trackpad) is present. */
  private static reduced: MediaQueryList | null = null;
  private static finePointer: MediaQueryList | null = null;
  private static mounts = 0;
  /** Bumped on every start/stop, so a slow lazy load can't start Lenis after it was stopped. */
  private static generation = 0;

  private static frames = new Map<number, FrameRequestCallback>();
  private static nextFrame = -1;

  /** Run the scene after Lenis has advanced, on the same GSAP tick. */
  static requestFrame(callback: FrameRequestCallback): number {
    if (!SmoothScroll.lenis) return requestAnimationFrame(callback);
    const id = SmoothScroll.nextFrame--;
    SmoothScroll.frames.set(id, callback);
    return id;
  }

  static cancelFrame(id: number) {
    if (id < 0) SmoothScroll.frames.delete(id);
    else cancelAnimationFrame(id);
  }

  /** Start smooth scrolling for this page; returns the cleanup. */
  static mount(): () => void {
    SmoothScroll.mounts += 1;
    if (SmoothScroll.mounts === 1) {
      SmoothScroll.reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      SmoothScroll.finePointer = window.matchMedia("(any-pointer: fine)");
      SmoothScroll.reduced.addEventListener("change", SmoothScroll.onMediaChange);
      SmoothScroll.finePointer.addEventListener("change", SmoothScroll.onMediaChange);
      SmoothScroll.onMediaChange();
    }
    let done = false;
    return () => {
      if (done) return;
      done = true;
      SmoothScroll.mounts -= 1;
      if (SmoothScroll.mounts > 0) return;
      SmoothScroll.reduced?.removeEventListener("change", SmoothScroll.onMediaChange);
      SmoothScroll.finePointer?.removeEventListener("change", SmoothScroll.onMediaChange);
      SmoothScroll.reduced = SmoothScroll.finePointer = null;
      SmoothScroll.stop();
    };
  }

  /** True while Lenis is smoothing the page. */
  static get active(): boolean {
    return SmoothScroll.lenis !== null;
  }

  /**
   * Scroll the page to a position or element (respecting its scroll-margin).
   * Smooth jumps use Lenis when it runs, otherwise native smooth scrolling;
   * `smooth: false` (and reduced motion) jumps at once.
   */
  static scrollTo(target: number | HTMLElement, { smooth = true }: { smooth?: boolean } = {}) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = SmoothScroll.lenis;
    if (lenis) {
      if (!smooth || reduced) {
        lenis.scrollTo(target, { immediate: true, force: true });
        return;
      }
      const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
      const distance = Math.abs(top - window.scrollY);
      // Long chapter jumps take a little longer, but never drag.
      const duration = Math.min(1.6, Math.max(0.7, 0.55 + distance / 7000));
      lenis.scrollTo(target, { duration, easing: SmoothScroll.ease, force: true });
      return;
    }
    const behavior: ScrollBehavior = smooth && !reduced ? "smooth" : "auto";
    if (typeof target === "number") window.scrollTo({ top: target, behavior });
    else target.scrollIntoView({ behavior, block: "start" });
  }

  private static ease(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private static get wanted(): boolean {
    return Boolean(SmoothScroll.finePointer?.matches) && !SmoothScroll.reduced?.matches;
  }

  private static onMediaChange() {
    if (SmoothScroll.wanted) void SmoothScroll.start();
    else SmoothScroll.stop();
  }

  private static async start() {
    if (SmoothScroll.lenis) return;
    const generation = ++SmoothScroll.generation;
    const [{ default: LenisClass }, { gsap }, { ScrollTrigger }] = await Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]);
    if (generation !== SmoothScroll.generation || SmoothScroll.mounts === 0 || !SmoothScroll.wanted || SmoothScroll.lenis) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new LenisClass({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.12,
      // Same-page anchors are routed by the story (chapters land on their settled state).
      anchors: false,
      // An open nav sheet locks the page (body.nav-open { overflow: hidden }); the wheel stays native there too.
      prevent: () => document.body.classList.contains("nav-open")
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
      const callbacks = [...SmoothScroll.frames.values()];
      SmoothScroll.frames.clear();
      const now = performance.now();
      callbacks.forEach(callback => callback(now));
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    SmoothScroll.lenis = lenis;
    SmoothScroll.gsap = gsap;
    SmoothScroll.tick = tick;
  }

  private static stop() {
    SmoothScroll.generation += 1;
    const { lenis, gsap, tick } = SmoothScroll;
    if (!lenis) return;
    if (gsap && tick) {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(...SmoothScroll.LAG_DEFAULT);
    }
    lenis.destroy();
    const callbacks = [...SmoothScroll.frames.values()];
    SmoothScroll.frames.clear();
    callbacks.forEach(callback => requestAnimationFrame(callback));
    SmoothScroll.lenis = null;
    SmoothScroll.gsap = null;
    SmoothScroll.tick = null;
  }
}
