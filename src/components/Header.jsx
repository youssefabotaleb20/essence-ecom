import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import Wordmark from './Wordmark';
import LanguageSwitch from './LanguageSwitch';
import { BagIcon, CloseIcon, MenuIcon } from './Icons';
import { useBag } from '../lib/bag';
import { useLang } from '../lib/useLang';
import { ease } from '../lib/motion';

/** Reads the tone of whatever band sits under the header so it can switch to light text on the deep green. */
function useToneUnderHeader() {
  const [tone, setTone] = useState('light');
  const { pathname } = useLocation();
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const els = document.elementsFromPoint(window.innerWidth / 2, 34);
      const band = els.find((el) => el.closest && el.closest('[data-tone]'))?.closest('[data-tone]');
      setTone(band?.dataset.tone === 'deep' ? 'deep' : 'light');
    };
    let late = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
      clearTimeout(late);
      late = setTimeout(check, 120); // bands change tone after React re-renders
    };
    check();
    const id = setTimeout(check, 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); clearTimeout(id); clearTimeout(late); };
  }, [pathname]);
  return tone;
}

/** Hides the header while scrolling down, brings it back on the way up, and gives it a backdrop once off the top. */
function useHeaderScroll() {
  const [state, setState] = useState({ hidden: false, solid: false });
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      const down = y > last + 4, up = y < last - 4;
      setState((s) => ({ hidden: y > 160 && (down ? true : up ? false : s.hidden), solid: y > 24 }));
      last = y;
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return state;
}

export default function Header({ intro }) {
  const { t } = useLang();
  const bag = useBag();
  const tone = useToneUnderHeader();
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const bump = useAnimationControls();

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    if (bag.justAdded) bump.start({ scale: [1, 1.35, 0.9, 1], transition: { duration: 0.6, delay: 0.55 } });
  }, [bag.justAdded, bump]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const deep = tone === 'deep' || menu;
  const { hidden, solid } = useHeaderScroll();
  const showBar = menu || bag.open || !hidden;
  const linkCls = ({ isActive }) => `ui text-sm transition-opacity ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`;

  return (
    <>
      <a href="#main" className="ui sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-surface focus:px-3 focus:py-2">{t('nav.skip')}</a>
      <motion.header
        className={`gutter fixed inset-x-0 top-0 z-50 transition-[color,background-color,backdrop-filter] duration-500 ${deep ? 'text-deep-ink on-deep' : 'text-ink'} ${solid && !menu ? (deep ? 'bg-deep/70 backdrop-blur-md' : 'bg-bg/70 backdrop-blur-md') : ''}`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        animate={{ y: showBar ? 0 : '-100%' }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <Link to="/" className="text-[26px] md:text-[30px]" aria-label={`Essence, ${t('nav.home')}`}>
            <Wordmark intro={intro} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            <NavLink to="/shop" className={linkCls}>{t('nav.shop')}</NavLink>
            <NavLink to="/about" className={linkCls}>{t('nav.about')}</NavLink>
            <LanguageSwitch />
          </nav>

          <div className="flex items-center gap-1">
            <motion.button
              id="bag-button" type="button" animate={bump}
              onClick={() => bag.setOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full"
              aria-label={t('bag.count', { count: bag.count })}
            >
              <BagIcon />
              <AnimatePresence>
                {bag.count > 0 && (
                  <motion.span
                    key={bag.count}
                    initial={{ scale: 0, y: 4 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0 }}
                    className={`ui tabular absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${deep ? 'bg-deep-accent text-deep' : 'bg-accent text-surface'}`}
                  >
                    {bag.count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              type="button" className="grid h-11 w-11 place-items-center md:hidden"
              aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? t('nav.close') : t('nav.menu')}
              onClick={() => setMenu((m) => !m)}
            >
              {menu ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu" key="menu"
            className="grain on-deep fixed inset-0 z-40 flex flex-col bg-deep text-deep-ink md:hidden"
            initial={{ clipPath: 'circle(0% at 92% 40px)' }}
            animate={{ clipPath: 'circle(150% at 92% 40px)' }}
            exit={{ clipPath: 'circle(0% at 92% 40px)' }}
            transition={{ duration: 0.7, ease }}
          >
            <nav aria-label="Mobile" className="gutter flex flex-1 flex-col justify-center gap-2 pt-20">
              {[['/', t('nav.home')], ['/shop', t('nav.shop')], ['/about', t('nav.about')]].map(([to, label], i) => (
                <motion.div key={to} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease }}>
                  <Link to={to} className="narrow block font-sans text-[64px] leading-[1.05] tracking-[-0.02em]">{label}</Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="gutter flex items-center justify-between pb-10" style={{ paddingBottom: 'max(40px, env(safe-area-inset-bottom, 0px))' }}>
              <LanguageSwitch />
              <Link to="/about#contact" className="ui text-sm text-deep-muted">{t("footer.contact")}</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
