import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer, useReducedMotion } from '../lib/motion';

// Buttons lean toward the cursor a little on desktop. Does nothing on touch or with reduced motion.
export default function Magnetic({ children, strength = 0.25, className = '' }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  if (!fine || reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      ref={ref} className={`inline-block ${className}`} style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}
