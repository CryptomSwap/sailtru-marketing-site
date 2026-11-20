"use client";

import { useEffect, useRef } from "react";

type Dot = {
  gx: number;
  gy: number;
  fade: number;
  side: number;
  lift: number;
};

const REST_X = 0.62;
const REST_Y = 0.4;
const LINK_STYLES = ["rgba(214,232,255,", "rgba(126,231,255,"] as const;

/**
 * Perspective dot field for the hero. The plane tilts with the pointer,
 * and the dots under the cursor lift toward the camera.
 */
export function HeroDotField({
  maxFps,
  active = true
}: { maxFps?: number; active?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: REST_X, y: REST_Y, inside: false };
    const smooth = { x: REST_X, y: REST_Y };

    let dots: Dot[] = [];
    let scratch = new Float32Array(0);
    let raf = 0;
    let running = true;
    let cols = 0;
    let rows = 0;
    let pixel = 1;
    const host = canvas.closest<HTMLElement>(".hs-cobalt-hero");
    let dissolved = host?.hasAttribute("data-dissolved") ?? false;
    let settle = false;
    let onScreen = true;

    const build = (width: number) => {
      const nextCols = width < 760 ? 24 : 42;
      const nextRows = width < 760 ? 14 : 22;
      if (nextCols === cols && nextRows === rows) return;
      cols = nextCols;
      rows = nextRows;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = cols === 1 ? 0.5 : c / (cols - 1);
          const gy = rows === 1 ? 0.5 : r / (rows - 1);
          dots.push({
            gx,
            gy,
            fade: Math.sin(gx * Math.PI) * Math.sin(gy * Math.PI),
            side: 0.28 + gx * 0.72,
            lift: 0
          });
        }
      }
      scratch = new Float32Array(dots.length * 5);
    };

    const resize = () => {
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      if (cssWidth < 2 || cssHeight < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

    const draw = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      if (width < 2 || height < 2 || dots.length === 0) return;

      const reduced = motionQuery.matches;
      const follow = reduced || settle ? 1 : 0.075;
      smooth.x += ((pointer.inside ? pointer.x : REST_X) - smooth.x) * follow;
      smooth.y += ((pointer.inside ? pointer.y : REST_Y) - smooth.y) * follow;

      const idle = reduced ? 0 : Math.sin(time * 0.00035) * 0.045;
      const rotY = (smooth.x - 0.5) * 0.7 - 0.2 + idle;
      const rotX = (smooth.y - 0.5) * -0.42 + 0.28;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const flow = reduced ? 0 : time * 0.00036;
      const twoPi = Math.PI * 2;
      const liftEase = reduced || settle ? 1 : 0.14;
      const pointerLive = pointer.inside && !reduced;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.gx - smooth.x;
        const dy = dot.gy - smooth.y;
        const influence = pointerLive ? Math.exp(-(dx * dx + dy * dy) * 12) : 0;
        dot.lift += (influence - dot.lift) * liftEase;

        const push = dot.lift * 0.035;
        const crest = reduced
          ? 0
          : Math.sin((dot.gx * 1.65 + dot.gy * 0.4 - flow) * twoPi) * 0.75 +
            Math.sin((dot.gy * 1.2 - flow * 0.55) * twoPi) * 0.25;
        const x = (dot.gx - 0.5) * 2.45 + dx * push;
        const y = (dot.gy - 0.5) * 1.34 + dy * push;
        const z = crest * 0.32 - dot.lift * 0.82;

        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const p = 1.45 / (2.55 + z2);

        const o = i * 5;
        scratch[o] = width * 0.5 + x1 * p * width * 0.6;
        scratch[o + 1] = height * 0.46 + y1 * p * height * 0.64;
        scratch[o + 2] = p;
        scratch[o + 3] = dot.lift;
        scratch[o + 4] = crest * 0.5 + 0.5;
      }
      settle = false;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "butt";
      ctx.lineWidth = Math.max(1, pixel * 0.7);

      const cool = new Path2D();
      const hot = new Path2D();
      let coolAlpha = 0;
      let hotAlpha = 0;
      let coolN = 0;
      let hotN = 0;

      const link = (a: number, b: number) => {
        const ao = a * 5;
        const bo = b * 5;
        const ax = scratch[ao];
        const ay = scratch[ao + 1];
        const bx = scratch[bo];
        const by = scratch[bo + 1];
        if (ax < -30 || bx < -30 || ax > width + 30 || bx > width + 30) return;
        if (ay < -30 || by < -30 || ay > height + 30 || by > height + 30) return;
        const lift = Math.min(scratch[ao + 3], scratch[bo + 3]);
        const signal = Math.max(scratch[ao + 4], scratch[bo + 4]);
        const fade = Math.min(dots[a].fade, dots[b].fade);
        const side = 0.2 + Math.min(dots[a].gx, dots[b].gx) * 0.8;
        const depthFade = 0.72 + Math.min(scratch[ao + 2], scratch[bo + 2]) * 0.45;
        const alpha = (0.14 + lift * 0.55 + signal * 0.22) * fade * side * depthFade;
        if (alpha < 0.04) return;
        const lit = lift > 0.22 || signal > 0.68;
        if (lit) {
          hot.moveTo(ax, ay);
          hot.lineTo(bx, by);
          hotAlpha += Math.min(0.78, alpha);
          hotN++;
        } else {
          cool.moveTo(ax, ay);
          cool.lineTo(bx, by);
          coolAlpha += Math.min(0.34, alpha);
          coolN++;
        }
      };

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (c + 1 < cols) link(i, i + 1);
          if (r + 1 < rows) link(i, i + cols);
        }
      }

      if (coolN) {
        ctx.strokeStyle = `${LINK_STYLES[0]}${coolAlpha / coolN})`;
        ctx.stroke(cool);
      }
      if (hotN) {
        ctx.strokeStyle = `${LINK_STYLES[1]}${hotAlpha / hotN})`;
        ctx.stroke(hot);
      }

      const fills = new Path2D();
      const rings = new Path2D();
      let fillAlpha = 0;
      let fillN = 0;
      const ringW = Math.max(1, pixel * 0.85);

      for (let i = 0; i < dots.length; i++) {
        const o = i * 5;
        const sx = scratch[o];
        const sy = scratch[o + 1];
        if (sx < -12 || sy < -12 || sx > width + 12 || sy > height + 12) continue;
        const p = scratch[o + 2];
        const lift = scratch[o + 3];
        const signal = scratch[o + 4];
        const c = i % cols;
        const r = (i / cols) | 0;
        const major = c % 5 === 0 && r % 4 === 0;
        const isHot = lift > 0.55;
        const alpha = Math.min(
          0.96,
          (0.32 + lift * 0.7 + signal * 0.38) * (0.5 + dots[i].fade * 0.7) * dots[i].side * (0.75 + p * 0.35)
        );
        if (major || isHot) rings.moveTo(sx + (2.15 + lift * 1.7) * pixel, sy), rings.arc(sx, sy, (2.15 + lift * 1.7) * pixel, 0, Math.PI * 2);
        fills.moveTo(sx + Math.max(0.7, (0.85 + (major ? 0.45 : 0) + lift * 0.55) * pixel), sy);
        fills.arc(sx, sy, Math.max(0.7, (0.85 + (major ? 0.45 : 0) + lift * 0.55) * pixel), 0, Math.PI * 2);
        fillAlpha += alpha;
        fillN++;
      }

      if (fillN) {
        ctx.lineWidth = ringW;
        ctx.strokeStyle = "rgba(214, 232, 255, 0.28)";
        ctx.stroke(rings);
        ctx.fillStyle = `rgba(232, 242, 255, ${fillAlpha / fillN})`;
        ctx.fill(fills);
      }
    };

    let lastDraw = -Infinity;
    const frame = (time: number) => {
      if (!maxFps || settle || time - lastDraw >= 1000 / maxFps) {
        draw(time);
        lastDraw = time;
      }
      if (running && !motionQuery.matches) raf = window.requestAnimationFrame(frame);
    };

    const onPointer = (event: PointerEvent) => {
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

    const start = () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (!active || dissolved || !onScreen || document.hidden) {
        running = false;
        raf = 0;
        return;
      }
      running = true;
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
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    };

    resize();
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
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", start);

    return () => {
      stop();
      observer.disconnect();
      view.disconnect();
      dissolve.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", start);
    };
  }, [maxFps, active]);

  return <canvas ref={canvasRef} className="field-hero__dots" aria-hidden />;
}
