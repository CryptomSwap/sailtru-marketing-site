"use client";

import { useEffect, useState } from "react";

/**
 * True while the homepage cobalt scroll entrance is running (boat + hole).
 * The harbor story root toggles `data-arriving` for this phase.
 */
export function useCobaltArrival(): boolean {
  const [arriving, setArriving] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hs--cobalt-arrival");
    if (!root) return;

    const sync = () => setArriving(root.dataset.arriving === "true");
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-arriving"] });
    return () => observer.disconnect();
  }, []);

  return arriving;
}