"use client";

import { useEffect, useRef } from "react";

type Dot = {
  gx: number;
  gy: number;
  lift: number;
};

const REST_X = 0.62;
const REST_Y = 0.4;

/**
 * Perspective dot field for the hero. The plane tilts with the pointer,
 * and the dots under the cursor lift toward the camera.
 */
export function HeroDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: REST_X, y: REST_Y, inside: false };
    const smooth = { x: REST_X, y: REST_Y };

    let dots: Dot[] = [];
    let depth = new Float64Array(0);
    let order: number[] = [];
    let scratch = new Float64Array(0);
    let raf = 0;
    let running = true;
    let cols = 0;
    let rows = 0;
    let pixel = 1;
    // Inside the homepage story the hero stays mounted (sticky) after the arrival has dissolved it; the
    // story marks it data-dissolved then, and the field draws nothing until the hero comes back.
    const host = canvas.closest<HTMLElement>(".hs-cobalt-hero");
    let dissolved = host?.hasAttribute("data-dissolved") ?? false;
    /** The first frame back jumps the pointer easing to where it would have settled meanwhile. */
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
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

      const follow = motionQuery.matches || settle ? 1 : 0.075;
      smooth.x += ((pointer.inside ? pointer.x : REST_X) - smooth.x) * follow;
      smooth.y += ((pointer.inside ? pointer.y : REST_Y) - smooth.y) * follow;

      const idle = motionQuery.matches ? 0 : Math.sin(time * 0.00035) * 0.045;
      const rotY = (smooth.x - 0.5) * 0.7 - 0.2 + idle;
      const rotX = (smooth.y - 0.5) * -0.42 + 0.28;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.gx - smooth.x;
        const dy = dot.gy - smooth.y;
        const influence = pointer.inside && !motionQuery.matches ? Math.exp(-(dx * dx + dy * dy) * 12) : 0;
        dot.lift += (influence - dot.lift) * (motionQuery.matches || settle ? 1 : 0.14);

        const push = dot.lift * 0.035;
        const flow = motionQuery.matches ? 0 : time * 0.00036;
        const crest = motionQuery.matches
          ? 0
          : Math.sin((dot.gx * 1.65 + dot.gy * 0.4 - flow) * Math.PI * 2) * 0.75 +
            Math.sin((dot.gy * 1.2 - flow * 0.55) * Math.PI * 2) * 0.25;
        const x = (dot.gx - 0.5) * 2.45 + dx * push;
        const y = (dot.gy - 0.5) * 1.34 + dy * push;
        const z = crest * 0.32 - dot.lift * 0.82;

        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        depth[i] = 2.55 + z2;

        const p = 1.45 / depth[i];
        scratch[i * 6] = width * 0.5 + x1 * p * width * 0.6;
        scratch[i * 6 + 1] = height * 0.46 + y1 * p * height * 0.64;
        scratch[i * 6 + 2] = p;
        scratch[i * 6 + 3] = Math.sin(dot.gx * Math.PI) * Math.sin(dot.gy * Math.PI);
        scratch[i * 6 + 4] = dot.lift;
        scratch[i * 6 + 5] = crest * 0.5 + 0.5;
        order[i] = i;
      }
      settle = false;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "butt";
      ctx.lineWidth = Math.max(1, pixel * 0.7);

      const link = (a: number, b: number) => {
        const ax = scratch[a * 6];
        const ay = scratch[a * 6 + 1];
        const bx = scratch[b * 6];
        const by = scratch[b * 6 + 1];
        if (ax < -30 || bx < -30 || ax > width + 30 || bx > width + 30) return;
        if (ay < -30 || by < -30 || ay > height + 30 || by > height + 30) return;
        const lift = Math.min(scratch[a * 6 + 4], scratch[b * 6 + 4]);
        const signal = Math.max(scratch[a * 6 + 5], scratch[b * 6 + 5]);
        const fade = Math.min(scratch[a * 6 + 3], scratch[b * 6 + 3]);
        const side = 0.2 + Math.min(dots[a].gx, dots[b].gx) * 0.8;
        const depthFade = 0.72 + Math.min(scratch[a * 6 + 2], scratch[b * 6 + 2]) * 0.45;
        const alpha = (0.14 + lift * 0.55 + signal * 0.22) * fade * side * depthFade;
        if (alpha < 0.04) return;
        const lit = lift > 0.22 || signal > 0.68;
        ctx.beginPath();
        ctx.strokeStyle = lit
          ? `rgba(126, 231, 255, ${Math.min(0.78, alpha)})`
          : `rgba(214, 232, 255, ${Math.min(0.34, alpha)})`;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      };

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (c + 1 < cols) link(i, i + 1);
          if (r + 1 < rows) link(i, i + cols);
        }
      }

      order.sort((a, b) => depth[b] - depth[a]);

      for (let n = 0; n < order.length; n++) {
        const i = order[n];
        const sx = scratch[i * 6];
        const sy = scratch[i * 6 + 1];
        const p = scratch[i * 6 + 2];
        const fade = scratch[i * 6 + 3];
        const lift = scratch[i * 6 + 4];
        const signal = scratch[i * 6 + 5];
        if (sx < -12 || sy < -12 || sx > width + 12 || sy > height + 12) continue;

        const c = i % cols;
        const r = (i / cols) | 0;
        const major = c % 5 === 0 && r % 4 === 0;
        const hot = lift > 0.55;
        const side = 0.28 + dots[i].gx * 0.72;
        const alpha = Math.min(
          0.96,
          (0.32 + lift * 0.7 + signal * 0.38) * (0.5 + fade * 0.7) * side * (0.75 + p * 0.35)
        );

        if (major || hot) {
          ctx.beginPath();
          ctx.lineWidth = Math.max(1, pixel * 0.85);
          ctx.strokeStyle = hot ? `rgba(126, 231, 255, ${0.35 + lift * 0.55})` : `rgba(214, 232, 255, ${alpha * 0.7})`;
          ctx.arc(sx, sy, (2.15 + lift * 1.7) * pixel, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = hot ? `rgba(255, 255, 255, ${alpha})` : `rgba(232, 242, 255, ${alpha})`;
        ctx.arc(sx, sy, Math.max(0.7, (0.85 + (major ? 0.45 : 0) + lift * 0.55) * pixel), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (time: number) => {
      if (canvas.width < canvas.clientWidth || canvas.height < canvas.clientHeight) resize();
      draw(time);
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
      if (dissolved) {
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
        // Drawn now, before this frame paints, so the returning hero never shows a stale frame.
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
  }, []);

  return <canvas ref={canvasRef} className="field-hero__dots" aria-hidden />;
}
