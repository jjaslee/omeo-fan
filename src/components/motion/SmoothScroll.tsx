"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * Luxury-weighted smooth scroll via Lenis.
 * Lower lerp + wheelMultiplier = heavier, slower wheel feel.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.06,
      wheelMultiplier: 0.65,
      touchMultiplier: 1.1,
      smoothWheel: true,
    });

    document.documentElement.classList.add("lenis");
    setLenis(lenis);

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      setLenis(undefined);
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
