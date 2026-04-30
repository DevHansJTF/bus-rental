"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.03,
      wheelMultiplier: 0.5,
      smoothWheel: true,
    });

    // @ts-expect-error - Adding lenis to window for global access
    window.lenis = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // @ts-expect-error - Removing lenis from window
      delete (window as Window & { lenis?: unknown }).lenis;
    };
  }, []);

  return <>{children}</>;
}
