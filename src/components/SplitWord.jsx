import { motion, useReducedMotion } from 'framer-motion';
import { ease } from '../lib/motion';

/** Letters condense out of a blur, one after another, from wide to narrow. Used once per page for the main name. */
export default function SplitWord({ text, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {[...word].map((ch, i) => (
            <motion.span
              key={i} className="inline-block"
              initial={{ y: '0.5em', opacity: 0, filter: 'blur(14px)', fontVariationSettings: '"wdth" 125' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)', fontVariationSettings: '"wdth" 75' }}
              transition={{ duration: 1.1, ease, delay: delay + (wi * 5 + i) * 0.045 }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
