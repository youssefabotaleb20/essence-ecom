import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useBag } from '../lib/bag';

// When something is added, a drop of that product's liquid arcs from the button into the bag icon.
export default function Droplet() {
  const { flight, setFlight } = useBag();
  const reduce = useReducedMotion();
  if (reduce) return null;
  const target = typeof document !== 'undefined' ? document.getElementById('bag-button')?.getBoundingClientRect() : null;
  return (
    <AnimatePresence>
      {flight && target && (
        <motion.svg
          key={flight.id} viewBox="0 0 10 14" width="18" height="25"
          className="pointer-events-none fixed left-0 top-0 z-[70] drop-shadow"
          initial={{ x: flight.x - 9, y: flight.y - 12, scale: 0.4, opacity: 0 }}
          animate={{
            x: [flight.x - 9, (flight.x + target.left) / 2, target.left + target.width / 2 - 9],
            y: [flight.y - 12, Math.min(flight.y, target.top) - 140, target.top + target.height / 2 - 12],
            scale: [0.4, 1.3, 0.5], opacity: [0, 1, 1], rotate: [0, -20, 0],
          }}
          transition={{ duration: 0.75, ease: [0.5, 0, 0.75, 0], times: [0, 0.45, 1] }}
          onAnimationComplete={() => setFlight(null)}
        >
          <path d="M5 0 C5 0 0 6.2 0 9 a5 5 0 0 0 10 0 C10 6.2 5 0 5 0 Z" fill={flight.color} stroke="#1E2B25" strokeWidth=".6" />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
