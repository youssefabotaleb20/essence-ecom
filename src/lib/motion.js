import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1];

/** True on devices with a precise pointer (mouse, trackpad): hover effects only run there. */
export function useFinePointer() {
  const [fine, setFine] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const on = () => setFine(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return fine;
}

export function useIsMobile(query = '(max-width: 767px)') {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return m;
}

export { useReducedMotion };
