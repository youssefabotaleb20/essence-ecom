import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AccordScroller from '../components/AccordScroller';
import IndexList from '../components/IndexList';
import NoteIndex from '../components/NoteIndex';
import DiscoverySet from '../components/DiscoverySet';
import HouseBand from '../components/HouseBand';
import SplitWord from '../components/SplitWord';
import Magnetic from '../components/Magnetic';
import { bySlug } from '../data/products';
import { NOTES } from '../data/notes';
import { useLang } from '../lib/useLang';
import { ease } from '../lib/motion';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { sentence } from '../lib/detail';

export default function Home({ intro }) {
  const { t, pick } = useLang();
  useDocumentTitle(null);
  const p = bySlug('salt-fig');
  const d = intro ? 1.1 : 0.35;
  const notesFor = (stage) => p.notes[stage].map((n) => pick(NOTES[n]));
  const stages = ['top', 'heart', 'base'].map((s) => ({
    id: s, label: t(`stage.${s}`), short: t(`stage.${s}Short`), words: notesFor(s), line: pick(p.say[s]),
  }));

  const head = (
    <div className="grid gap-6">
      <h1 className="narrow font-sans text-[25vw] leading-[0.82] tracking-[-0.035em] md:text-[13vw]">
        <SplitWord text={p.name} delay={d} />
      </h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: d + 0.6 }} className="max-w-[34ch] text-lg md:text-xl">
        {t('home.heroLine')}
      </motion.p>
      <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: d + 0.8 }} className="hidden gap-1 text-base md:grid">
        {['top', 'heart', 'base'].map((s) => (
          <div key={s} className="flex gap-3">
            <dt className="ui w-16 text-sm text-muted">{t(`stage.${s}Short`)}</dt>
            <dd>{sentence(notesFor(s))}</dd>
          </div>
        ))}
      </motion.dl>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: d + 0.9 }} className="flex flex-wrap items-center gap-3">
        <Magnetic><Link to={`/p/${p.slug}`} className="ui inline-block rounded-sm bg-accent px-6 py-4 text-sm text-surface">{t('home.shopHero')}</Link></Magnetic>
        <Magnetic><Link to="/shop" className="ui inline-block rounded-sm border border-ink/30 px-6 py-4 text-sm">{t('home.seeAll')}</Link></Magnetic>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4, 1] }} transition={{ duration: 2.4, delay: d + 1.4 }} className="ui hidden text-xs text-muted md:block">
        {t('home.scrollHint')}
      </motion.p>
    </div>
  );

  return (
    <>
      <AccordScroller product={p} stages={stages} head={head} />
      <IndexList />
      <NoteIndex />
      <DiscoverySet />
      <HouseBand />
    </>
  );
}
