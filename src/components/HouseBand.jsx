import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../lib/useLang';

/** Deep band where the sentence reads itself in: each word goes from faint to full as you scroll. */
export default function HouseBand() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = t('home.houseLine').split(' ');
  return (
    <section ref={ref} aria-labelledby="house-title" data-tone="deep" className="grain on-deep gutter bg-deep py-28 text-deep-ink md:py-44">
      <div className="mx-auto grid max-w-[1100px] gap-10">
        <h2 id="house-title" className="ui text-sm text-deep-accent">{t('home.houseTitle')}</h2>
        <p className="font-serif text-[30px] leading-[1.25] md:text-[52px] md:leading-[1.18]">
          <span className="sr-only">{t('home.houseLine')}</span>
          <span aria-hidden="true">
            {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
          </span>
        </p>
        <Link to="/about" className="ui justify-self-start border-b border-deep-accent pb-1 text-sm text-deep-accent">{t('home.aboutLink')}</Link>
      </div>
    </section>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{children}</motion.span>;
}
