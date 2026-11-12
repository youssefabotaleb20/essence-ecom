import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useBag } from '../lib/bag';
import { useLang } from '../lib/useLang';
import { useIsMobile, ease } from '../lib/motion';
import { discoverySet } from '../data/products';
import ProductArt from './ProductArt';
import QtyStepper from './QtyStepper';
import { CloseIcon } from './Icons';

// Side panel on desktop, a bottom sheet you can drag down on phones.
export default function BagDrawer() {
  const bag = useBag();
  const { t, pick, price } = useLang();
  const mobile = useIsMobile();
  const panel = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!bag.open) return;
    lastFocus.current = document.activeElement;
    const id = setTimeout(() => panel.current?.querySelector('button, a')?.focus(), 50);
    const onKey = (e) => {
      if (e.key === 'Escape') bag.setOpen(false);
      if (e.key === 'Tab' && panel.current) {
        const f = [...panel.current.querySelectorAll('button:not([disabled]), a[href]')];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(id); window.removeEventListener('keydown', onKey); lastFocus.current?.focus?.(); };
  }, [bag.open]); // eslint-disable-line react-hooks/exhaustive-deps

  const variants = mobile
    ? { hidden: { y: '100%' }, shown: { y: 0 } }
    : { hidden: { x: '100%' }, shown: { x: 0 } };

  return (
    <AnimatePresence>
      {bag.open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-deep/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => bag.setOpen(false)}
          />
          <motion.aside
            ref={panel} role="dialog" aria-modal="true" aria-labelledby="bag-title"
            variants={variants} initial="hidden" animate="shown" exit="hidden"
            transition={{ duration: 0.55, ease }}
            drag={mobile ? 'y' : false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => { if (info.offset.y > 120 || info.velocity.y > 600) bag.setOpen(false); }}
            className={`absolute flex flex-col bg-surface text-ink shadow-[0_-10px_60px_rgba(31,48,41,.25)] ${mobile ? 'inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[18px]' : 'inset-y-0 right-0 w-[440px] max-w-full'}`}
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {mobile && <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-ink/20" aria-hidden="true" />}
            <div className="flex items-center justify-between px-6 pb-4 pt-5">
              <h2 id="bag-title" className="narrow text-2xl">{t('bag.title')}</h2>
              <button type="button" onClick={() => bag.setOpen(false)} className="grid h-11 w-11 place-items-center" aria-label={t('nav.close')}><CloseIcon /></button>
            </div>

            {bag.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-start gap-5 px-6 pb-10">
                <p className="max-w-[34ch] text-muted">{t('bag.empty')}</p>
                <button type="button" className="ui rounded-sm bg-accent px-5 py-3.5 text-sm text-surface" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); bag.add(discoverySet.slug, discoverySet.sizes[0].ml, { x: r.left + r.width / 2, y: r.top }); }}>
                  {t('home.addDiscovery')}, {price(discoverySet.sizes[0].price)}
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
                  <AnimatePresence initial={false}>
                    {bag.lines.map((l) => (
                      <motion.li
                        key={`${l.slug}-${l.ml}`} layout
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                        className="flex gap-4 border-t border-line py-4"
                      >
                        <div className="grid h-24 w-20 shrink-0 place-items-center rounded-sm bg-bg">
                          <ProductArt product={l.product} wave={false} label={false} className="h-20" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                          <div className="flex items-baseline justify-between gap-3">
                            <Link to={l.product.type === 'set' ? '/#discovery' : `/p/${l.slug}`} onClick={() => bag.setOpen(false)} className="semi font-sans text-base font-medium">{l.product.name}</Link>
                            <span className="ui tabular text-sm">{price(l.total)}</span>
                          </div>
                          <span className="text-sm text-muted">{l.product.type === 'set' ? pick(l.product.line) : `${l.ml} ml`}</span>
                          <div className="flex items-center justify-between">
                            <QtyStepper value={l.qty} onChange={(q) => bag.setQty(l.slug, l.ml, q)} />
                            <button type="button" className="ui text-xs text-muted underline underline-offset-4" onClick={() => bag.remove(l.slug, l.ml)}>{t('bag.remove')}</button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="grid gap-3 border-t border-line px-6 py-5">
                  <div className="ui flex justify-between text-base"><span>{t('bag.subtotal')}</span><span className="tabular">{price(bag.subtotal)}</span></div>
                  <p className="text-sm text-muted">{t('bag.shipping')}</p>
                  <Link to="/checkout" onClick={() => bag.setOpen(false)} className="ui rounded-sm bg-accent px-5 py-4 text-center text-sm text-surface">{t('bag.checkout')}</Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
