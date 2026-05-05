"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    const initLenis = () => {
      if (window.innerWidth >= 768 && !lenis) {
        lenis = new Lenis({
          lerp: 0.03,
          wheelMultiplier: 0.5,
          smoothWheel: true,
        });

        // @ts-expect-error - Adding lenis to window for global access
        window.lenis = lenis;

        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } else if (window.innerWidth < 768 && lenis) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenis = null;
        // @ts-expect-error - Removing lenis from window
        delete (window as Window & { lenis?: unknown }).lenis;
      }
    };

    // Initial check
    initLenis();

    // Listen to resize to enable/disable on the fly
    window.addEventListener("resize", initLenis);

    return () => {
      window.removeEventListener("resize", initLenis);
      if (lenis) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        // @ts-expect-error - Removing lenis from window
        delete (window as Window & { lenis?: unknown }).lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
