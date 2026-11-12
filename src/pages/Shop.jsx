import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { products, noteIndex, priceFrom } from '../data/products';
import { NOTES } from '../data/notes';
import { useLang } from '../lib/useLang';
import { ease } from '../lib/motion';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import ProductArt from '../components/ProductArt';
import SplitWord from '../components/SplitWord';
import { FilterTabs } from '../components/IndexList';
import { CloseIcon } from '../components/Icons';

export default function Shop() {
  const { t, pick, price } = useLang();
  useDocumentTitle(t('shop.title'));
  const [params, setParams] = useSearchParams();
  const type = ['fragrance', 'skincare'].includes(params.get('type')) ? params.get('type') : 'all';
  const note = noteIndex.has(params.get('note')) ? params.get('note') : null;

  const list = products.filter((p) => (type === 'all' || p.type === type) && (!note || noteIndex.get(note).includes(p.slug)));
  const set = (next) => {
    const q = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? q.set(k, v) : q.delete(k)));
    setParams(q, { replace: true });
  };

  return (
    <section data-tone="light" className="gutter min-h-[80svh] bg-bg pb-28 pt-28 md:pt-36">
      <div className="mx-auto grid max-w-[1280px] gap-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="narrow font-sans text-[22vw] leading-[0.82] tracking-[-0.035em] md:text-[150px]"><SplitWord text={t('shop.title')} delay={0.4} /></h1>
          <div className="flex flex-wrap items-center gap-3">
            <FilterTabs value={type} onChange={(v) => set({ type: v === 'all' ? null : v })} id="shop" />
            <AnimatePresence>
              {note && (
                <motion.button
                  type="button" onClick={() => set({ note: null })}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  className="ui inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm text-surface"
                >
                  {t('filter.noteActive', { note: pick(NOTES[note]) })}<CloseIcon width={16} height={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className="ui text-sm text-muted" aria-live="polite">{t('shop.count', { count: list.length })}</p>

        {list.length === 0 ? (
          <div className="grid justify-items-start gap-4 py-16">
            <p className="text-xl">{t('shop.empty')}</p>
            <button type="button" onClick={() => setParams({}, { replace: true })} className="ui border-b border-accent pb-1 text-sm text-accent">{t('shop.emptyLink')}</button>
          </div>
        ) : (
          <LayoutGroup>
            <motion.ul layout className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.li
                    key={p.slug} layout
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.04 }}
                  >
                    <Link to={`/p/${p.slug}`} className="group grid gap-4">
                      <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-md bg-surface">
                        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0 transition-[height] duration-700 [transition-timing-function:var(--ease-scent)] group-hover:h-full" style={{ backgroundColor: `${p.liquid}55` }} />
                        <div className="relative h-[78%] transition-transform duration-700 [transition-timing-function:var(--ease-scent)] group-hover:-translate-y-3 group-hover:rotate-[-3deg] group-hover:scale-[1.04]">
                          <ProductArt product={p} className="h-full w-auto" />
                        </div>
                      </div>
                      <div className="grid gap-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="narrow font-sans text-[22px] leading-tight tracking-[-0.01em] md:text-[28px]">{p.name}</span>
                          <span className="ui tabular text-sm">{price(priceFrom(p))}</span>
                        </div>
                        <span className="line-clamp-2 text-sm text-muted">{pick(p.line)}</span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        )}
      </div>
    </section>
  );
}
