import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function getLenis() {
  if (typeof window === "undefined") return undefined;
  return window.__lenis;
}

export function setLenis(lenis: Lenis | undefined) {
  if (typeof window === "undefined") return;
  if (lenis) {
    window.__lenis = lenis;
  } else {
    delete window.__lenis;
  }
}
