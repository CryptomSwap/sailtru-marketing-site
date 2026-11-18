"use client";

import { useEffect, useRef } from "react";

type Dot = {
  gx: number;
  gy: number;
  lift: number;
};

const REST_X = 0.58;
const REST_Y = 0.42;

type FieldProfile = {
  cols: number;
  rows: number;
  /** Draw every nth horizontal / vertical edge (1 = all). */
  linkStride: number;
  dprCap: number;
  /** Skip painter's-algorithm sort when true (mobile). */
  skipDepthSort: boolean;
};

/**
 * Perspective dot field for the cobalt hero.
 * Calm idle drift + restrained pointer parallax; density/link budget scales by viewport.
 */
export function HeroDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const pointer = { x: REST_X, y: REST_Y, inside: false };
    const smooth = { x: REST_X, y: REST_Y };
    const scrollParallax = { x: 0, y: 0, tx: 0, ty: 0 };

    let dots: Dot[] = [];
    let depth = new Float64Array(0);
    let order: number[] = [];
    let scratch = new Float64Array(0);
    let raf = 0;
    let running = true;
    let cols = 0;
    let rows = 0;
    let pixel = 1;
    let profile: FieldProfile = { cols: 0, rows: 0, linkStride: 1, dprCap: 1.75, skipDepthSort: false };
    let lastTime = 0;
    // Homepage story keeps the hero sticky after arrival dissolves it.
    const host = canvas.closest<HTMLElement>(".hs-cobalt-hero");
    let dissolved = host?.hasAttribute("data-dissolved") ?? false;
    let settle = false;
    let onScreen = true;

    const profileFor = (width: number): FieldProfile => {
      // Phones: enough mesh to read as a field, stride-2 links to keep the frame cheap.
      if (width < 400) return { cols: 18, rows: 11, linkStride: 2, dprCap: 1.5, skipDepthSort: true };
      if (width < 760) return { cols: 24, rows: 14, linkStride: 1, dprCap: 1.5, skipDepthSort: true };
      if (width < 1024) return { cols: 32, rows: 17, linkStride: 1, dprCap: 1.75, skipDepthSort: false };
      return { cols: 40, rows: 21, linkStride: 1, dprCap: 1.75, skipDepthSort: false };
    };

    const build = (width: number) => {
      const next = profileFor(width);
      if (next.cols === cols && next.rows === rows) {
        profile = next;
        return;
      }
      profile = next;
      cols = next.cols;
      rows = next.rows;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            gx: cols === 1 ? 0.5 : c / (cols - 1),
            gy: rows === 1 ? 0.5 : r / (rows - 1),
            lift: 0
          });
        }
      }
      depth = new Float64Array(dots.length);
      order = dots.map((_, index) => index);
      scratch = new Float64Array(dots.length * 6);
    };

    const resize = () => {
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      if (cssWidth < 2 || cssHeight < 2) return;
      const next = profileFor(cssWidth);
      const dpr = Math.min(window.devicePixelRatio || 1, next.dprCap);
      const width = Math.max(1, Math.round(cssWidth * dpr));
      const height = Math.max(1, Math.round(cssHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      canvas.dataset.ready = "";
      pixel = width / cssWidth;
      build(cssWidth);
    };

    const easeToward = (current: number, target: number, rate: number, dt: number) => {
      // Frame-rate independent exponential smoothing.
      const t = 1 - Math.exp(-rate * dt);
      return current + (target - current) * t;
    };

    const draw = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      if (width < 2 || height < 2 || dots.length === 0) return;

      const reduce = motionQuery.matches;
      const dt = settle || !lastTime ? 1 / 60 : Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;

      const targetX = pointer.inside ? pointer.x : REST_X;
      const targetY = pointer.inside ? pointer.y : REST_Y;
      if (reduce || settle) {
        smooth.x = targetX;
        smooth.y = targetY;
        scrollParallax.x = scrollParallax.tx;
        scrollParallax.y = scrollParallax.ty;
      } else {
        // Soft critically-damped feel — calm, not laggy.
        smooth.x = easeToward(smooth.x, targetX, 4.2, dt);
        smooth.y = easeToward(smooth.y, targetY, 4.2, dt);
        scrollParallax.x = easeToward(scrollParallax.x, scrollParallax.tx, 2.4, dt);
        scrollParallax.y = easeToward(scrollParallax.y, scrollParallax.ty, 2.4, dt);
      }

      // Dual-frequency idle: slow yaw + slower pitch, tiny amplitude.
      const idleY = reduce ? 0 : Math.sin(time * 0.00022) * 0.028 + Math.sin(time * 0.00011) * 0.012;
      const idleX = reduce ? 0 : Math.sin(time * 0.00017 + 1.1) * 0.016;
      const rotY = (smooth.x - 0.5) * 0.48 - 0.14 + idleY + scrollParallax.x * 0.08;
      const rotX = (smooth.y - 0.5) * -0.3 + 0.22 + idleX + scrollParallax.y * 0.06;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Frozen attractive phase when motion is reduced.
      const flow = reduce ? 0.18 : time * 0.00022;
      const allowLift = pointer.inside && !reduce && finePointer.matches;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.gx - smooth.x;
        const dy = dot.gy - smooth.y;
        const influence = allowLift ? Math.exp(-(dx * dx + dy * dy) * 10) : 0;
        if (reduce || settle) dot.lift = influence;
        else dot.lift = easeToward(dot.lift, influence, 7.5, dt);

        const push = dot.lift * 0.028;
        const crest = Math.sin((dot.gx * 1.45 + dot.gy * 0.35 - flow) * Math.PI * 2) * 0.55 +
          Math.sin((dot.gy * 1.05 - flow * 0.48 + 0.4) * Math.PI * 2) * 0.22;
        // Depth bias by row for a quiet parallax shelf.
        const shelf = (dot.gy - 0.5) * 0.08;
        const x = (dot.gx - 0.5) * 2.35 + dx * push;
        const y = (dot.gy - 0.5) * 1.28 + dy * push;
        const z = crest * 0.24 - dot.lift * 0.62 + shelf;

        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        depth[i] = 2.55 + z2;

        const p = 1.45 / depth[i];
        scratch[i * 6] = width * 0.5 + x1 * p * width * 0.58;
        scratch[i * 6 + 1] = height * 0.48 + y1 * p * height * 0.6;
        scratch[i * 6 + 2] = p;
        // Soft vignette — keep presence under copy, stronger toward the field center.
        const edgeX = Math.sin(dot.gx * Math.PI);
        const edgeY = Math.sin(dot.gy * Math.PI);
        scratch[i * 6 + 3] = Math.max(0.35, edgeX * edgeY) * (0.7 + dot.gx * 0.3);
        scratch[i * 6 + 4] = dot.lift;
        scratch[i * 6 + 5] = crest * 0.5 + 0.5;
        order[i] = i;
      }
      settle = false;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";
      ctx.lineWidth = Math.max(1, pixel * 0.65);

      const stride = profile.linkStride;
      const link = (a: number, b: number) => {
        const ax = scratch[a * 6];
        const ay = scratch[a * 6 + 1];
        const bx = scratch[b * 6];
        const by = scratch[b * 6 + 1];
        if (ax < -24 || bx < -24 || ax > width + 24 || bx > width + 24) return;
        if (ay < -24 || by < -24 || ay > height + 24 || by > height + 24) return;
        const lift = Math.min(scratch[a * 6 + 4], scratch[b * 6 + 4]);
        const signal = Math.max(scratch[a * 6 + 5], scratch[b * 6 + 5]);
        const fade = Math.min(scratch[a * 6 + 3], scratch[b * 6 + 3]);
        const depthFade = 0.7 + Math.min(scratch[a * 6 + 2], scratch[b * 6 + 2]) * 0.4;
        // Stable alpha floor avoids sparkle/flicker as waves pass.
        const alpha = (0.14 + lift * 0.42 + signal * 0.16) * fade * depthFade;
        if (alpha < 0.05) return;
        const lit = lift > 0.28 || signal > 0.72;
        ctx.beginPath();
        ctx.strokeStyle = lit
          ? `rgba(126, 231, 255, ${Math.min(0.68, alpha)})`
          : `rgba(214, 232, 255, ${Math.min(0.34, alpha)})`;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      };

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (c + stride < cols && r % stride === 0) link(i, i + stride);
          if (r + stride < rows && c % stride === 0) link(i, i + cols * stride);
        }
      }

      if (!profile.skipDepthSort) order.sort((a, b) => depth[b] - depth[a]);

      for (let n = 0; n < order.length; n++) {
        const i = order[n];
        const sx = scratch[i * 6];
        const sy = scratch[i * 6 + 1];
        const p = scratch[i * 6 + 2];
        const fade = scratch[i * 6 + 3];
        const lift = scratch[i * 6 + 4];
        const signal = scratch[i * 6 + 5];
        if (sx < -10 || sy < -10 || sx > width + 10 || sy > height + 10) continue;

        const c = i % cols;
        const r = (i / cols) | 0;
        const major = c % 5 === 0 && r % 4 === 0;
        const hot = lift > 0.55;
        const alpha = Math.min(
          0.9,
          (0.28 + lift * 0.55 + signal * 0.28) * (0.45 + fade * 0.75) * (0.78 + p * 0.3)
        );
        if (alpha < 0.05) continue;

        if (major || hot) {
          ctx.beginPath();
          ctx.lineWidth = Math.max(1, pixel * 0.8);
          ctx.strokeStyle = hot
            ? `rgba(126, 231, 255, ${0.28 + lift * 0.45})`
            : `rgba(214, 232, 255, ${alpha * 0.55})`;
          ctx.arc(sx, sy, (1.9 + lift * 1.35) * pixel, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = hot ? `rgba(255, 255, 255, ${alpha})` : `rgba(232, 242, 255, ${alpha})`;
        ctx.arc(sx, sy, Math.max(0.65, (0.75 + (major ? 0.4 : 0) + lift * 0.45) * pixel), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (time: number) => {
      if (canvas.width < canvas.clientWidth || canvas.height < canvas.clientHeight) resize();
      draw(time);
      if (running && !motionQuery.matches) raf = window.requestAnimationFrame(frame);
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        pointer.inside = false;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      pointer.inside = inside;
      if (!inside) return;
      pointer.x = rect.width > 0 ? (event.clientX - rect.left) / rect.width : REST_X;
      pointer.y = rect.height > 0 ? (event.clientY - rect.top) / rect.height : REST_Y;
    };

    const onLeave = () => {
      pointer.inside = false;
    };

    const onScroll = () => {
      // Tiny scroll parallax while the hero is in view — restrained.
      if (!onScreen || motionQuery.matches) {
        scrollParallax.tx = 0;
        scrollParallax.ty = 0;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.5;
      const norm = Math.max(-1, Math.min(1, (window.innerHeight * 0.45 - mid) / window.innerHeight));
      scrollParallax.tx = norm * 0.35;
      scrollParallax.ty = norm * 0.55;
    };

    const start = () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (dissolved || !onScreen || document.hidden) {
        running = false;
        raf = 0;
        return;
      }
      running = true;
      lastTime = 0;
      if (motionQuery.matches) {
        draw(0);
        return;
      }
      raf = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      lastTime = 0;
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    };

    resize();
    onScroll();
    start();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const view = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 }
    );
    view.observe(canvas);
    const dissolve = new MutationObserver(() => {
      const next = host?.hasAttribute("data-dissolved") ?? false;
      if (next === dissolved) return;
      dissolved = next;
      if (dissolved) stop();
      else if (onScreen && document.visibilityState === "visible") {
        settle = true;
        running = true;
        frame(performance.now());
      }
    });
    if (host) dissolve.observe(host, { attributes: true, attributeFilter: ["data-dissolved"] });

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", start);
    finePointer.addEventListener("change", start);

    return () => {
      stop();
      observer.disconnect();
      view.disconnect();
      dissolve.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", start);
      finePointer.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="field-hero__dots" aria-hidden />;
}
