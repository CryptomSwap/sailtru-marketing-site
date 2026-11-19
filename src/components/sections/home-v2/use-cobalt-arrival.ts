"use client";

import { useEffect, useState } from "react";

/**
 * True while the cobalt scroll entrance is actively opening (mask, fade, boat).
 * At rest on the ATF arrival is 0 and this stays false so the dot field runs.
 */
export function useCobaltEntranceBusy(): boolean {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hs--cobalt-arrival");
    if (!root) return;

    const sync = () => setBusy(root.dataset.entranceBusy === "true");
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-entrance-busy"] });
    return () => observer.disconnect();
  }, []);

  return busy;
}