import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { noteIndex } from '../data/products';
import { NOTES } from '../data/notes';
import { useLang } from '../lib/useLang';
import { ease, useIsMobile } from '../lib/motion';

/** Every note in the range as words. Desktop: a field of words that sharpen on hover. Phone: two drifting rows to swipe through. */
export default function NoteIndex() {
  const { t, pick } = useLang();
  const mobile = useIsMobile();
  const notes = [...noteIndex.entries()];

  return (
    <section aria-labelledby="notes-title" data-tone="light" className="relative overflow-hidden bg-surface py-24 md:py-36">
      <div className="gutter mx-auto mb-10 grid max-w-[1280px] gap-4 md:mb-16">
        <h2 id="notes-title" className="narrow text-[56px] leading-[0.95] tracking-[-0.02em] md:text-[96px]">{t('home.byNote')}</h2>
        <p className="max-w-[40ch] text-lg text-muted">{t('home.byNoteLine')}</p>
      </div>

      {mobile ? (
        <div className="grid gap-3">
          {[notes.filter((_, i) => i % 2 === 0), notes.filter((_, i) => i % 2 === 1)].map((row, r) => (
            <div key={r} className="marquee-wrap overflow-x-auto no-scrollbar">
              <div className={`marquee flex w-max gap-3 ${r ? 'reverse' : ''}`} style={{ '--marquee-duration': `${46 + r * 8}s` }}>
                {[...row, ...row].map(([key, slugs], i) => (
                  <Link
                    key={`${key}-${i}`} to={`/shop?note=${key}`} tabIndex={i >= row.length ? -1 : 0} aria-hidden={i >= row.length}
                    className="ui flex items-baseline gap-2 whitespace-nowrap rounded-full border border-line bg-bg px-5 py-3 text-lg"
                  >
                    {pick(NOTES[key])}<span className="tabular text-xs text-muted">{slugs.length}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="gutter mx-auto flex max-w-[1280px] flex-wrap items-baseline gap-x-8 gap-y-2">
          {notes.map(([key, slugs], i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease, delay: (i % 10) * 0.05 }}
            >
              <Link
                to={`/shop?note=${key}`}
                className="group relative inline-flex items-start font-sans text-[54px] leading-[1.08] tracking-[-0.02em] text-ink/45 transition-[color,font-variation-settings] duration-500 [font-variation-settings:'wdth'_75] hover:text-ink hover:[font-variation-settings:'wdth'_112] focus-visible:text-ink"
              >
                {pick(NOTES[key])}
                <sup className="ui tabular ml-1 mt-3 text-xs text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">{slugs.length}</sup>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
