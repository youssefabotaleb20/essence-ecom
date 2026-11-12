import { motion, useReducedMotion } from 'framer-motion';
import { ease } from '../lib/motion';

// Route change: a deep-green veil rises over the old page, then lifts off the new one.
export default function PageVeil({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[55] origin-top bg-deep"
        initial={{ scaleY: 1 }} animate={{ scaleY: 0, transition: { duration: 0.6, ease, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[55] origin-bottom bg-deep"
        initial={{ scaleY: 0 }} animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.45, ease } }}
      />
    </>
  );
}
