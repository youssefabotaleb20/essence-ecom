import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import { BagProvider, useBag } from './lib/bag';
import { useSmoothScroll, getLenis, scrollToTop, scrollToEl } from './lib/smoothScroll';
import { useFinePointer } from './lib/motion';
import Header from './components/Header';
import Footer from './components/Footer';
import BagDrawer from './components/BagDrawer';
import Droplet from './components/Droplet';
import PageVeil from './components/PageVeil';
import Home from './pages/Home';
const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Shell() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const bag = useBag();
  const [intro] = useState(() => {
    try { const seen = sessionStorage.getItem('essence-intro'); sessionStorage.setItem('essence-intro', '1'); return !seen; } catch { return true; }
  });
  useSmoothScroll(fine && !reduce);

  useEffect(() => {
    const l = getLenis();
    if (!l) return;
    if (bag.open) l.stop(); else l.start();
  }, [bag.open]);

  const onExitComplete = () => {
    if (location.hash) {
      setTimeout(() => scrollToEl(document.getElementById(location.hash.slice(1))), 80);
    } else scrollToTop();
  };

  // same-page hash links (and first load with a hash)
  useEffect(() => {
    if (!location.hash) return;
    const id = setTimeout(() => scrollToEl(document.getElementById(location.hash.slice(1))), 350);
    return () => clearTimeout(id);
  }, [location.hash, location.key]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header intro={intro} />
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        <PageVeil key={location.pathname}>
          <main id="main" className="flex-1">
            <Suspense fallback={<div className="min-h-[100svh] bg-bg" />}>
            <Routes location={location}>
              <Route path="/" element={<Home intro={intro} />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/p/:slug" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </main>
          <Footer />
        </PageVeil>
      </AnimatePresence>
      <BagDrawer />
      <Droplet />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BagProvider>
        <Shell />
      </BagProvider>
    </MotionConfig>
  );
}
