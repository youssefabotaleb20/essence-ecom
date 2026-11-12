import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductArt from './ProductArt';
import AddToBag from './AddToBag';
import { discoverySet, fragrances } from '../data/products';
import { useLang } from '../lib/useLang';
import { ease, useIsMobile } from '../lib/motion';

/** Six vials that start stacked as one and fan out into a row as the section scrolls in. On phones they become a swipeable row. */
export default function DiscoverySet() {
  const { t, price } = useLang();
  const ref = useRef(null);
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });

  return (
    <section ref={ref} id="discovery" aria-labelledby="discovery-title" data-tone="light" className="relative overflow-hidden bg-mid py-24 md:py-36">
      <div className="gutter mx-auto grid max-w-[1280px] gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
        <div className="grid gap-6">
          <h2 id="discovery-title" className="narrow text-[56px] leading-[0.95] tracking-[-0.02em] md:text-[96px]">{t('home.discoveryTitle')}</h2>
          <p className="max-w-[40ch] text-lg">{t('home.discoveryLine')}</p>
          <div className="flex flex-wrap items-center gap-5">
            <AddToBag slug={discoverySet.slug} ml={discoverySet.sizes[0].ml} label={`${t('home.addDiscovery')}, ${price(discoverySet.sizes[0].price)}`} />
          </div>
        </div>

        {mobile ? (
          <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar">
            {fragrances.map((f, i) => (
              <motion.li
                key={f.slug} className="snap-center"
                initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: i * 0.06 }}
              >
                <Link to={`/p/${f.slug}`} className="grid w-28 justify-items-center gap-3 rounded-md bg-bg/60 px-3 py-5">
                  <ProductArt product={{ ...f, shape: 'vial' }} className="h-40 w-auto" />
                  <span className="ui text-center text-xs leading-tight">{f.name}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="relative h-[460px]" aria-hidden="true">
            {fragrances.map((f, i) => <FanVial key={f.slug} f={f} i={i} n={fragrances.length} progress={scrollYProgress} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function FanVial({ f, i, n, progress }) {
  const offset = i - (n - 1) / 2;
  const x = useTransform(progress, [0.15, 1], [0, offset * 96]);
  const rotate = useTransform(progress, [0.15, 1], [offset * 3, offset * 7]);
  const y = useTransform(progress, [0.15, 1], [0, Math.abs(offset) * 22]);
  return (
    <motion.div style={{ x, rotate, y }} className="absolute left-1/2 top-0 h-[400px] w-[100px] -translate-x-1/2 origin-bottom">
      <Link to={`/p/${f.slug}`} tabIndex={-1} className="group grid h-full justify-items-center">
        <motion.div whileHover={{ y: -24 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="h-[340px]">
          <ProductArt product={{ ...f, shape: 'vial' }} className="h-full w-auto" />
        </motion.div>
        <span className="ui mt-2 whitespace-nowrap text-xs opacity-0 transition-opacity group-hover:opacity-100">{f.name}</span>
      </Link>
    </motion.div>
  );
}
