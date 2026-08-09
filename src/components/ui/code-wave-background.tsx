"use client";

import { useEffect, useRef } from "react";
import "./code-wave-background.css";

export function CodeWaveBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = () => {
      if (motionQuery.matches) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore seek errors before metadata */
        }
      } else if (document.visibilityState === "visible") {
        void video.play().catch(() => {
          /* autoplay may be blocked until interaction */
        });
      }
    };

    const onVisibility = () => {
      if (document.visibilityState !== "visible" || motionQuery.matches) {
        video.pause();
        return;
      }
      void video.play().catch(() => {});
    };

    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      motionQuery.removeEventListener("change", applyMotionPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, []);

  return (
    <div className="code-wave-bg" aria-hidden>
      <video
        ref={videoRef}
        className="code-wave-bg__video"
        src="/videos/code-wave-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="code-wave-bg__veil" />
    </div>
  );
}
