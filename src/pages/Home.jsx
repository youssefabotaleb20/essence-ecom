import AccordScroller from '../components/AccordScroller';
import HeroPour from '../components/HeroPour';
import IndexList from '../components/IndexList';
import NoteIndex from '../components/NoteIndex';
import DiscoverySet from '../components/DiscoverySet';
import HouseBand from '../components/HouseBand';
import { bySlug } from '../data/products';
import { NOTES } from '../data/notes';
import { useLang } from '../lib/useLang';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function Home({ intro }) {
  const { t, pick } = useLang();
  useDocumentTitle(null);
  const p = bySlug('salt-fig');
  const floating = ['orange-blossom-noon', 'salt-fig', 'black-tea-smoke'].map(bySlug);
  const stages = ['top', 'heart', 'base'].map((s) => ({
    id: s, label: t(`stage.${s}`), short: t(`stage.${s}Short`), words: p.notes[s].map((n) => pick(NOTES[n])), line: pick(p.say[s]),
  }));

  return (
    <>
      <HeroPour word="Essence" line={t('home.heroLine')} bottles={floating} intro={intro} />
      <AccordScroller product={p} stages={stages} title={`${t('home.featured')}: ${p.name}`} titleLink={`/p/${p.slug}`} />
      <IndexList />
      <NoteIndex />
      <DiscoverySet />
      <HouseBand />
    </>
  );
}
