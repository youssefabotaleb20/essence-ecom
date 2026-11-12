import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from 'framer-motion';
import ProductArt from './ProductArt';
import { products, priceFrom } from '../data/products';
import { detailLine } from '../lib/detail';
import { useLang } from '../lib/useLang';
import { ease, useFinePointer, useIsMobile } from '../lib/motion';
import { ChevronDown } from './Icons';

export function FilterTabs({ value, onChange, id = 'filter' }) {
  const { t } = useLang();
  return (
    <div role="tablist" aria-label={t('nav.shop')} className="ui relative inline-flex rounded-full border border-current/20 p-1 text-sm">
      {['all', 'fragrance', 'skincare'].map((k) => (
        <button
          key={k} role="tab" type="button" aria-selected={value === k} onClick={() => onChange(k)}
          className={`relative rounded-full px-4 py-2 transition-colors duration-300 ${value === k ? 'text-surface' : 'opacity-75 hover:opacity-100'}`}
        >
          {value === k && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          <span className="relative">{t(`filter.${k}`)}</span>
        </button>
      ))}
    </div>
  );
}

/** The collection as a perfumer's index: one row per product. */
export default function IndexList() {
  const { t, pick, price } = useLang();
  const [filter, setFilter] = useState('all');
  const fine = useFinePointer();
  const mobile = useIsMobile();
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });

  const list = products.filter((p) => filter === 'all' || p.type === filter);
  const hovered = products.find((p) => p.slug === hover);

  return (
    <section aria-labelledby="collection-title" className="gutter relative bg-bg py-24 md:py-36" data-tone="light">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-4">
            <h2 id="collection-title" className="narrow text-[56px] leading-[0.95] tracking-[-0.02em] md:text-[96px]">{t('home.collection')}</h2>
            <p className="max-w-[46ch] text-lg text-muted">{t('home.collectionLine')}</p>
          </div>
          <FilterTabs value={filter} onChange={(v) => { setFilter(v); setOpen(null); }} id="home" />
        </div>

        <LayoutGroup>
          <ul
            className="border-b border-line"
            onPointerMove={(e) => { if (fine) { x.set(e.clientX + 24); y.set(e.clientY - 140); } }}
            onPointerLeave={() => setHover(null)}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {list.map((p, i) => {
                const isOpen = open === p.slug;
                const detail = detailLine(p, pick);
                const size = p.sizes.map((s) => `${s.ml} ml`).join(' / ');
                return (
                  <motion.li
                    key={p.slug} layout
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5, ease, delay: i * 0.03 }}
                    className="border-t border-line"
                    onPointerEnter={() => fine && setHover(p.slug)}
                  >
                    {mobile ? (
                      <MobileRow p={p} isOpen={isOpen} toggle={() => setOpen(isOpen ? null : p.slug)} detail={detail} size={size} />
                    ) : (
                      <Link to={`/p/${p.slug}`} className="group grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_100px_90px] items-baseline gap-8 py-6">
                        <span className="font-sans text-[40px] leading-none tracking-[-0.02em] transition-[font-variation-settings,letter-spacing,color] duration-500 [font-variation-settings:'wdth'_75] group-hover:text-accent group-hover:[font-variation-settings:'wdth'_105] group-focus-visible:[font-variation-settings:'wdth'_105]">
                          {p.name}
                        </span>
                        <span className="truncate text-base text-muted transition-transform duration-500 group-hover:translate-x-2">{detail}</span>
                        <span className="ui text-sm text-muted">{size}</span>
                        <span className="ui tabular text-right text-base">{price(priceFrom(p))}</span>
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </LayoutGroup>
      </div>

      {/* cursor preview, desktop only */}
      <AnimatePresence>
        {fine && hovered && (
          <motion.div
            key="preview" aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-30 grid h-[260px] w-[200px] place-items-center rounded-md bg-surface/90 shadow-[0_20px_60px_rgba(31,48,41,.18)] backdrop-blur"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div key={hovered.slug} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.3 }} className="h-[220px]">
                <ProductArt product={hovered} className="h-full w-auto" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MobileRow({ p, isOpen, toggle, detail, size }) {
  const { t, pick, price } = useLang();
  return (
    <div>
      <button type="button" onClick={toggle} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="grid min-w-0 gap-1">
          <span className="narrow font-sans text-[30px] leading-none tracking-[-0.02em]">{p.name}</span>
          <span className="truncate text-sm text-muted">{detail}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="ui tabular text-sm">{price(priceFrom(p))}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown width={18} height={18} /></motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
            <div className="flex items-end gap-5 pb-6">
              <motion.div initial={{ y: 60, rotate: -10, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="h-40 shrink-0">
                <ProductArt product={p} className="h-full w-auto" />
              </motion.div>
              <div className="grid gap-3">
                <p className="text-base">{pick(p.line)}</p>
                <p className="ui text-xs text-muted">{size}</p>
                <Link to={`/p/${p.slug}`} className="ui justify-self-start rounded-sm bg-ink px-4 py-3 text-sm text-surface">{t('home.openProduct', { name: p.name })}</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
