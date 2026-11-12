import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../lib/useLang';
import LanguageSwitch from './LanguageSwitch';
import Wordmark from './Wordmark';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer data-tone="deep" className="grain on-deep gutter overflow-hidden bg-deep pb-10 pt-20 text-deep-ink" style={{ paddingBottom: 'max(40px, env(safe-area-inset-bottom, 0px))' }}>
      <div className="mx-auto grid max-w-[1280px] gap-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-[44ch] text-lg text-deep-muted">{t('footer.demo')}{' '}
            <a href="https://youssefabotaleb20.github.io/Portfolio/" className="text-deep-accent underline underline-offset-4">{t('footer.portfolio')}</a>
          </p>
          <nav aria-label="Footer" className="ui flex flex-wrap items-center gap-6 text-sm">
            <Link to="/shop">{t('nav.shop')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/about#contact">{t('footer.contact')}</Link>
            <LanguageSwitch />
          </nav>
        </div>
        <motion.div
          initial={{ y: '40%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[27vw] leading-[0.78] text-deep-surface md:text-[24vw]" aria-hidden="true"
        >
          <Wordmark />
        </motion.div>
      </div>
    </footer>
  );
}
