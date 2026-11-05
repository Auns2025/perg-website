import { useEffect } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      const reqId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(reqId);
        lenis.destroy();
      };
    } catch (e) {
      console.warn('Lenis smooth scrolling disabled, using native scrolling:', e);
    }
  }, []);
}
