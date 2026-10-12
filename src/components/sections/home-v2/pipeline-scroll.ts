import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { streamProgress } from "@/components/sections/home-v2/how-it-works/stream-progress";

const DESKTOP = "(min-width: 980px) and (prefers-reduced-motion: no-preference)";

/** Pins the section and scrubs copy plus the 3D stream from one timeline. */
export function mountPipeline(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add(DESKTOP, () => {
    const live = root.querySelector<HTMLElement>(".intel-live");
    if (!live) return;

    const line = (id: string) => live.querySelector<HTMLElement>(`[data-pipe-step='${id}']`);
    const body = (id: string) => live.querySelector<HTMLElement>(`[data-chapter-body='${id}']`);
    const lines = ["a", "b", "c", "d"].map(line);
    const bodies = ["a", "b", "c", "d"].map(body);
    const indexes = [...live.querySelectorAll<HTMLElement>("[data-chapter-index]")];
    const cta = live.querySelector<HTMLElement>("[data-cta]");
    const outputs = [...live.querySelectorAll<HTMLElement>("[data-output]")];
    const stage = live.querySelector<HTMLElement>(".intel-stage-wrap");

    // Pull the engine up as it enters. Opacity stays off the canvas — fading it
    // re-composites the glass and the cubes shift color against the hero.
    const riseScroll = () => ({
      trigger: root,
      start: "top 92%",
      end: "top 32%",
      scrub: 0.45
    });
    const copy = live.querySelector<HTMLElement>(".hsw__copy");
    gsap.fromTo(live, { y: 120 }, { y: 0, ease: "power3.out", scrollTrigger: riseScroll() });
    if (copy) gsap.fromTo(copy, { autoAlpha: 0 }, { autoAlpha: 1, ease: "power3.out", scrollTrigger: riseScroll() });

    const swap = 0.36;
    // Timeline runs 0→5. Rests are finished stages, not the in-between morphs:
    // 0 stage 1, 2 stage 2 (orbit), 3.1 stage 3 (orbit held), 5 stage 4 panels.
    const rests = [0, 2 / 5, 3.1 / 5, 1];
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.55,
        anticipatePin: 1,
        snap: {
          snapTo: rests,
          duration: { min: 0.9, max: 1.75 },
          delay: 0.06,
          ease: "power2.inOut",
          inertia: false
        }
      }
    });

    tl.addLabel("discover", 0);
    tl.addLabel("understand", 1.2);
    tl.addLabel("implement", 2.15);
    tl.addLabel("optimize", 3.4);
    tl.to(streamProgress, { current: 1, duration: 5, ease: "none" }, 0);

    if (lines[0] && lines[1] && bodies[0] && bodies[1]) {
      tl.to([lines[0], bodies[0]], { opacity: 0, duration: swap }, "understand");
      tl.to([lines[1], bodies[1]], { opacity: 1, duration: swap }, "understand");
    }
    if (lines[1] && lines[2] && bodies[1] && bodies[2]) {
      tl.to([lines[1], bodies[1]], { opacity: 0, duration: swap, immediateRender: false }, "implement");
      tl.to([lines[2], bodies[2]], { opacity: 1, duration: swap }, "implement");
    }
    if (lines[2] && lines[3] && bodies[2] && bodies[3]) {
      tl.to([lines[2], bodies[2]], { opacity: 0, duration: swap, immediateRender: false }, "optimize");
      tl.to([lines[3], bodies[3]], { opacity: 1, duration: swap }, "optimize");
    }
    const report = live.querySelector<HTMLElement>("[data-output='report']");
    const sides = ["agents", "implement"].map((id) => live.querySelector<HTMLElement>(`[data-output='${id}']`)).filter(Boolean);
    const path = live.querySelector<HTMLElement>("[data-output='path']");
    const boards = [report, ...sides].filter(Boolean);
    if (boards.length) {
      tl.fromTo(boards, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "none", immediateRender: false }, "optimize+=0.1");
    }
    if (path) {
      tl.fromTo(path, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "none", immediateRender: false }, "optimize+=1.2");
    }
    if (cta) {
      tl.fromTo(cta, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "none", immediateRender: false }, "optimize+=0.55");
    }

    const marks = [0, 1.2, 2.15, 3.4];
    let active = 0;
    const applyChapter = (index: number) => {
      if (index === active) return;
      active = index;
      indexes.forEach((node, i) => node.classList.toggle("is-on", i === index));
      lines.forEach((node, i) => node?.setAttribute("aria-hidden", i === index ? "false" : "true"));
      bodies.forEach((node, i) => node?.setAttribute("aria-hidden", i === index ? "false" : "true"));
      stage?.classList.toggle("is-final", index === 3);
    };

    tl.eventCallback("onUpdate", () => {
      const time = tl.time();
      let index = 0;
      marks.forEach((mark, i) => {
        if (time >= mark) index = i;
      });
      applyChapter(index);
    });

    // One gesture plays the whole stage. Further wheel events wait until the glide settles.
    let glide: gsap.core.Tween | null = null;
    let locked = false;
    let quiet = 0;
    const unlockSoon = () => {
      window.clearTimeout(quiet);
      quiet = window.setTimeout(() => {
        locked = false;
      }, 180);
    };
    const onWheel = (event: WheelEvent) => {
      const st = tl.scrollTrigger;
      if (!st) return;
      const scroll = window.scrollY;
      if (scroll < st.start - 1 || scroll > st.end + 1) return;
      const span = st.end - st.start;
      const progress = span > 0 ? (scroll - st.start) / span : 0;
      const dir = Math.sign(event.deltaY);
      if (!dir) return;
      if (!locked && dir < 0 && progress <= 0.004) return;
      if (!locked && dir > 0 && progress >= 0.996) return;
      event.preventDefault();
      if (locked) {
        unlockSoon();
        return;
      }
      const next = dir > 0 ? rests.find((rest) => rest > progress + 0.03) ?? 1 : [...rests].reverse().find((rest) => rest < progress - 0.03) ?? 0;
      const target = st.start + next * span;
      const proxy = { y: scroll };
      locked = true;
      glide?.kill();
      glide = gsap.to(proxy, {
        y: target,
        duration: next === 1 || progress > 0.7 ? 1.85 : 1.05,
        ease: "sine.inOut",
        overwrite: true,
        onUpdate: () => window.scrollTo(0, proxy.y),
        onComplete: unlockSoon
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(quiet);
      glide?.kill();
      streamProgress.current = 0;
      gsap.set([live, copy, cta, ...lines, ...bodies, ...outputs].filter(Boolean), { clearProps: "opacity,visibility,transform" });
      indexes.forEach((node, i) => node.classList.toggle("is-on", i === 0));
      stage?.classList.remove("is-final");
    };
  });

  return () => mm.revert();
}
