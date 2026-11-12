import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { bySlug, products, priceFrom } from '../data/products';
import { NOTES, FAMILIES } from '../data/notes';
import { useLang } from '../lib/useLang';
import { ease, useIsMobile } from '../lib/motion';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import AccordScroller from '../components/AccordScroller';
import ProductArt from '../components/ProductArt';
import AddToBag from '../components/AddToBag';
import SplitWord from '../components/SplitWord';
import { ArrowLeft, ChevronDown } from '../components/Icons';
import NotFound from './NotFound';
import { detailLine } from '../lib/detail';

export default function Product() {
  const { slug } = useParams();
  const p = bySlug(slug);
  useDocumentTitle(p?.name);
  if (!p || p.type === 'set') return <NotFound />;
  return <ProductView key={p.slug} p={p} />;
}

function ProductView({ p }) {
  const { t, pick, price } = useLang();
  const [ml, setMl] = useState(p.sizes[0].ml);
  const size = p.sizes.find((s) => s.ml === ml);
  const buyRef = useRef(null);
  const [pastBuy, setPastBuy] = useState(false);
  useEffect(() => {
    const check = () => { const r = buyRef.current?.getBoundingClientRect(); setPastBuy(Boolean(r && r.bottom < 0)); };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  const mobile = useIsMobile();
  const fragrance = p.type === 'fragrance';

  const stages = fragrance
    ? ['top', 'heart', 'base'].map((s) => ({ id: s, label: t(`stage.${s}`), short: t(`stage.${s}Short`), words: p.notes[s].map((n) => pick(NOTES[n])), line: pick(p.say[s]) }))
    : p.key.map((k, i) => ({ id: `k${i}`, label: `${t('product.keyIngredients')}, ${i + 1}/${p.key.length}`, short: pick(k.name), big: k.amount || null, words: [pick(k.name)], line: pick(k.does) }));

  return (
    <>
      {/* buy block */}
      <section data-tone="light" className="gutter bg-surface pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-16">
          <motion.div
            className="relative grid h-[46svh] place-items-center overflow-hidden rounded-md bg-bg md:aspect-[4/5] md:h-auto md:max-h-[78svh]"
            initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1, ease, delay: 0.35 }}
          >
            <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: `linear-gradient(to top, ${p.liquid}66, transparent)` }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, ease, delay: 0.8 }} />
            <motion.div initial={{ y: 80, rotate: -6, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 1.1, ease, delay: 0.6 }} className="h-[78%]">
              <ProductArt product={p} className="h-full w-auto" title={p.name} />
            </motion.div>
          </motion.div>

          <div className="grid gap-6">
            <Link to="/shop" className="ui inline-flex items-center gap-2 justify-self-start text-sm text-muted hover:text-ink"><ArrowLeft width={18} height={18} />{t('product.back')}</Link>
            <div className="grid gap-3">
              <p className="ui text-sm text-accent">
                {fragrance ? `${t('product.edp')}, ${pick(FAMILIES[p.family]).toLowerCase()}` : t('filter.skincare')}
              </p>
              <h1 className="narrow font-sans text-[16vw] leading-[0.86] tracking-[-0.03em] md:text-[88px]">
                <SplitWord text={p.name} delay={0.5} />
              </h1>
            </div>
            <p className="max-w-[40ch] text-lg md:text-xl">{pick(p.line)}</p>
            <p className="text-base text-muted">{detailLine(p, pick)}</p>

            {p.sizes.length > 1 && (
              <fieldset className="grid gap-2">
                <legend className="ui mb-2 text-sm">{t('product.size')}</legend>
                <div className="ui inline-flex gap-2 justify-self-start">
                  {p.sizes.map((s) => (
                    <label key={s.ml} className={`relative cursor-pointer rounded-sm border px-5 py-3 text-sm transition-colors ${ml === s.ml ? 'border-ink text-surface' : 'border-line hover:border-ink/50'}`}>
                      <input type="radio" name="size" value={s.ml} checked={ml === s.ml} onChange={() => setMl(s.ml)} className="sr-only" />
                      {ml === s.ml && <motion.span layoutId="size-pill" className="absolute inset-0 -z-0 rounded-[2px] bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                      <span className="relative">{s.ml} ml</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div ref={buyRef} className="flex flex-wrap items-center gap-6">
              <span className="ui tabular relative h-9 overflow-hidden text-2xl leading-9" aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={size.price} className="block" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.35, ease }}>
                    {price(size.price)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <AddToBag slug={p.slug} ml={ml} className="min-w-[220px] flex-1 md:flex-none" />
            </div>
            {!fragrance && <p className="ui text-sm text-muted">{size.ml} ml</p>}
          </div>
        </div>
      </section>

      <h2 id={`${p.slug}-notes`} className="sr-only">{fragrance ? t('product.notes') : t('product.keyIngredients')}</h2>
      <AccordScroller product={p} stages={stages} labelledBy={`${p.slug}-notes`} />

      {/* deep details */}
      <section data-tone="deep" className="grain on-deep gutter bg-deep pb-24 pt-8 text-deep-ink md:pb-32">
        <div className="mx-auto grid max-w-[1280px] gap-16">
          {fragrance ? <Wear p={p} /> : <HowToUse p={p} />}
          <Ingredients p={p} />
        </div>
      </section>

      <Pairs p={p} />

      {/* sticky buy bar on phones once the main button scrolls away */}
      <AnimatePresence>
        {mobile && pastBuy && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-line bg-surface/95 px-5 py-3 text-ink backdrop-blur"
            style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 0px))' }}
            initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }} transition={{ duration: 0.4, ease }}
          >
            <div className="grid min-w-0 flex-1">
              <span className="semi truncate font-sans text-base font-medium">{p.name}</span>
              <span className="ui tabular text-xs text-muted">{size.ml} ml, {price(size.price)}</span>
            </div>
            <AddToBag slug={p.slug} ml={ml} className="shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Wear({ p }) {
  const { t, pick } = useLang();
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
      <div>
        <h2 className="ui mb-4 text-sm text-deep-accent">{t('stage.wear')}</h2>
        <motion.p
          className="narrow tabular font-sans text-[22vw] leading-[0.85] tracking-[-0.04em] md:text-[150px]"
          initial={{ opacity: 0, filter: 'blur(16px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 1, ease }}
        >
          {t('stage.hours', { hours: p.wear.hours })}
        </motion.p>
      </div>
      <p className="max-w-[36ch] text-xl text-deep-muted">{pick(p.wear)}</p>
    </div>
  );
}

function HowToUse({ p }) {
  const { t, pick } = useLang();
  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div className="grid content-start gap-4">
        <h2 className="narrow font-sans text-[48px] leading-none tracking-[-0.02em] md:text-[72px]">{t('product.howToUse')}</h2>
        <p className="text-deep-muted"><span className="ui text-sm text-deep-accent">{t('product.suits')}</span><br />{pick(p.suits)}</p>
      </div>
      <ol className="grid gap-0">
        {pick(p.use).map((step, i) => (
          <motion.li
            key={i} className="grid grid-cols-[48px_1fr] items-baseline gap-4 border-t border-deep-line py-6 text-xl"
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, ease, delay: i * 0.1 }}
          >
            <span className="narrow tabular font-sans text-3xl text-deep-accent">{i + 1}</span>
            <span>{step}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function Ingredients({ p }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-deep-line pt-6">
      <button type="button" aria-expanded={open} aria-controls={`${p.slug}-inci`} onClick={() => setOpen((o) => !o)} className="ui flex w-full items-center justify-between py-2 text-left text-base">
        {open ? t('product.hideIngredients') : t('product.showIngredients')}
        <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={`${p.slug}-inci`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
            <p className="max-w-[70ch] pt-4 text-base text-deep-muted">{p.inci}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pairs({ p }) {
  const { t, pick, price } = useLang();
  const pairs = p.pairs.map((s) => products.find((x) => x.slug === s)).filter(Boolean);
  return (
    <section data-tone="light" aria-labelledby="pairs-title" className="gutter bg-bg py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-10">
        <h2 id="pairs-title" className="narrow text-[44px] leading-none tracking-[-0.02em] md:text-[72px]">{t('product.pairs')}</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {pairs.map((x, i) => (
            <motion.li key={x.slug} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease, delay: i * 0.12 }}>
              <Link to={`/p/${x.slug}`} className="group grid grid-cols-[120px_1fr] items-center gap-6 rounded-md bg-surface p-5 md:grid-cols-[160px_1fr]">
                <div className="grid h-40 place-items-center md:h-52">
                  <ProductArt product={x} className="h-full w-auto transition-transform duration-700 [transition-timing-function:var(--ease-scent)] group-hover:-translate-y-3 group-hover:rotate-[-4deg]" />
                </div>
                <div className="grid gap-2">
                  <span className="narrow font-sans text-[32px] leading-none tracking-[-0.02em] md:text-[40px]">{x.name}</span>
                  <span className="text-base text-muted">{pick(x.line)}</span>
                  <span className="ui tabular text-sm">{x.sizes.length > 1 ? t('product.from', { price: price(priceFrom(x)) }) : price(priceFrom(x))}</span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
