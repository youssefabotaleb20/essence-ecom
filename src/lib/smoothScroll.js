import { useEffect } from 'react';
import Lenis from 'lenis';

let lenis = null;
export const getLenis = () => lenis;

/** Smooth wheel scrolling on desktop. Touch keeps native scrolling, which feels right on phones. */
export function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
    let id = requestAnimationFrame(function raf(time) { lenis?.raf(time); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); lenis?.destroy(); lenis = null; };
  }, [enabled]);
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export function scrollToEl(el) {
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
