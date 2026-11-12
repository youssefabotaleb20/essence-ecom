import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBag } from '../lib/bag';
import { useLang } from '../lib/useLang';
import Magnetic from './Magnetic';

export default function AddToBag({ slug, ml, label, className = '', tone = 'light', openBag = true }) {
  const bag = useBag();
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const onClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    bag.add(slug, ml, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setDone(true);
    setTimeout(() => setDone(false), 1800);
    if (openBag) setTimeout(() => bag.setOpen(true), 850);
  };
  const colours = tone === 'deep' ? 'bg-deep-accent text-deep' : 'bg-accent text-surface';
  return (
    <Magnetic className={className}>
      <button type="button" onClick={onClick} className={`ui relative w-full overflow-hidden rounded-sm px-6 py-4 text-sm transition-transform active:scale-[0.97] ${colours}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={done ? 'done' : 'idle'} className="block" initial={{ y: '120%' }} animate={{ y: 0 }} exit={{ y: '-120%' }} transition={{ duration: 0.3 }}>
            {done ? t('product.added') : (label ?? t('product.add'))}
          </motion.span>
        </AnimatePresence>
      </button>
    </Magnetic>
  );
}
