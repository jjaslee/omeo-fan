"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";

/** Pause Lenis + lock page scroll while overlays (modals) are open. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const lenis = getLenis();
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [locked]);
}
