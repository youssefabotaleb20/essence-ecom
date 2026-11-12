import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../lib/useLang';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import ProductArt from '../components/ProductArt';
import { discoverySet } from '../data/products';

export default function NotFound() {
  const { t } = useLang();
  useDocumentTitle(t('notFound.title'));
  return (
    <section data-tone="light" className="gutter grid min-h-[90svh] place-items-center bg-bg pt-24">
      <div className="grid justify-items-center gap-6 text-center">
        <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="h-48">
          <ProductArt product={discoverySet} level={0.08} className="h-full w-auto" />
        </motion.div>
        <h1 className="narrow text-[44px] leading-none tracking-[-0.02em] md:text-[64px]">{t('notFound.title')}</h1>
        <p className="text-lg text-muted">{t('notFound.line')}</p>
        <Link to="/shop" className="ui rounded-sm bg-accent px-6 py-4 text-sm text-surface">{t('notFound.cta')}</Link>
      </div>
    </section>
  );
}
