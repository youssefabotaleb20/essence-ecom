import { motion, useReducedMotion } from 'framer-motion';

// The redrawn Essence wordmark: Mona Sans pulled to its narrowest width, with a drop for the last "e"'s counter.
// On first load it condenses from wide to narrow, the way a scent is concentrated.
export default function Wordmark({ intro = false, className = '' }) {
  const reduce = useReducedMotion();
  const animate = intro && !reduce;
  return (
    <span className={`inline-flex items-baseline gap-[0.08em] font-sans font-medium leading-none ${className}`}>
      <span className="sr-only">Essence</span>
      <motion.span
        aria-hidden="true"
        initial={animate ? { fontVariationSettings: '"wdth" 125', letterSpacing: '0.04em' } : false}
        animate={{ fontVariationSettings: '"wdth" 75', letterSpacing: '-0.02em' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ fontVariationSettings: '"wdth" 75' }}
      >
        Essence
      </motion.span>
      <motion.svg
        aria-hidden="true" viewBox="0 0 10 14" className="h-[0.42em] w-auto fill-current text-accent"
        initial={animate ? { y: '-1.2em', opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 1.2 }}
      >
        <path d="M5 0 C5 0 0 6.2 0 9 a5 5 0 0 0 10 0 C10 6.2 5 0 5 0 Z" />
      </motion.svg>
    </span>
  );
}
