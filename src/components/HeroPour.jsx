import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ProductArt from './ProductArt';
import Magnetic from './Magnetic';
import { useLang } from '../lib/useLang';
import { C } from '../lib/tokens';
import { ease } from '../lib/motion';

/**
 * Home hero. The screen fills with dark liquid behind a full-width "Essence"; where the wave crosses
 * the letters they flip from ink to fig green. The pointer (or a tap) makes ripples, a few small bottles
 * float on the surface, bubbles rise, and the liquid drains away as you scroll into the notes.
 */
const FLOAT = { desktop: [0.64, 0.79, 0.92], mobile: [0.56, 0.74, 0.9] };

export default function HeroPour({ word, line, bottles, intro }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const track = useRef(null);
  const stage = useRef(null);
  const waveA = useRef(null);
  const waveB = useRef(null);
  const clip = useRef(null);
  const floats = useRef([]);
  const [size, setSize] = useState({ w: 1440, h: 900 });
  const ripples = useRef([]);
  const pour = useMotionValue(reduce ? 1 : 0);

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end start'] });
  const drain = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // draw only while the hero is on screen
  const visible = useRef(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    io.observe(track.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = stage.current;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    const c = animate(pour, 1, { duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: intro ? 0.9 : 0.25 });
    return () => c.stop();
  }, [pour, reduce, intro]);

  const { w, h } = size;
  const mobile = w < 768;
  const gutter = mobile ? 20 : 40;
  const fill = mobile ? 0.34 : 0.46; // share of the screen under the liquid at rest
  const fontSize = Math.min((w - gutter * 2) / (mobile ? 1.5 : 1.75), h * (mobile ? 0.34 : 0.58));
  const baseline = h * (1 - fill) + fontSize * 0.36;

  const surface = (x, time, level) => {
    let y = level
      + Math.sin(x * 0.005 + time * 0.8) * (mobile ? 6 : 10)
      + Math.sin(x * 0.013 - time * 1.1) * (mobile ? 2 : 3);
    for (const r of ripples.current) {
      const age = time - r.t;
      const d = Math.abs(x - r.x);
      y += Math.sin(d * 0.045 - age * 7) * 12 * Math.exp(-age * 1.8) * Math.exp(-d / 260);
    }
    return y;
  };

  useAnimationFrame((ms) => {
    if (!visible.current) return; // off screen: stop drawing
    const time = reduce ? 0 : ms / 1000;
    ripples.current = ripples.current.filter((r) => time - r.t < 3);
    const level = h - h * fill * pour.get() * drain.get();
    const step = mobile ? 14 : 18;
    let a = '', b = '';
    for (let x = 0; x <= w + step; x += step) {
      const y = surface(x, time, level);
      a += `${x === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
      b += `${x === 0 ? 'M' : 'L'}${x.toFixed(1)} ${(y - 10 + Math.sin(x * 0.01 + time * 0.8) * 8).toFixed(1)}`;
    }
    const close = `L${w + step} ${h + 2} L0 ${h + 2} Z`;
    waveA.current?.setAttribute('d', a + close);
    waveB.current?.setAttribute('d', b + close);
    clip.current?.setAttribute('d', a + close);
    floats.current.forEach((el, i) => {
      if (!el) return;
      const bx = w * (mobile ? FLOAT.mobile : FLOAT.desktop)[i];
      const y1 = surface(bx - 20, time + i * 0.7, level), y2 = surface(bx + 20, time + i * 0.7, level);
      const tilt = (Math.atan2(y2 - y1, 40) * 180) / Math.PI;
      const bob = Math.sin(time * 1.3 + i * 2) * 4;
      el.style.transform = `translate(${bx - el.offsetWidth / 2}px, ${(y1 + y2) / 2 - el.offsetHeight * 0.6 + bob}px) rotate(${tilt + (i - 1) * 6}deg)`;
    });
  });

  const addRipple = (clientX) => {
    if (reduce) return;
    const r = stage.current.getBoundingClientRect();
    const now = performance.now() / 1000;
    const last = ripples.current[ripples.current.length - 1];
    if (last && now - last.t < 0.12) return;
    ripples.current.push({ x: clientX - r.left, t: now });
    if (ripples.current.length > 6) ripples.current.shift();
  };

  // Fit the word to the full width by measuring it, then stretching it with a transform.
  // (SVG textLength isn't applied the same way in every browser, which clipped the word in Safari.)
  const measure = useRef(null);
  const [sx, setSx] = useState(1);
  useEffect(() => {
    let alive = true;
    const fit = () => {
      const el = measure.current;
      if (!el || !alive) return;
      const natural = el.getBBox().width;
      if (natural > 0) setSx((w - gutter * 2) / natural);
    };
    fit();
    document.fonts?.ready.then(fit);
    return () => { alive = false; };
  }, [w, gutter, fontSize, word]);

  const textStyle = { fontFamily: 'var(--font-sans)', fontVariationSettings: '"wdth" 75', fontStretch: '75%', fontWeight: 500 };
  const name = (
    <g transform={`translate(${w / 2} ${baseline}) scale(${sx} 1)`}>
      <text x="0" y="0" textAnchor="middle" fontSize={fontSize} style={textStyle}>{word}</text>
    </g>
  );

  return (
    <section ref={track} aria-labelledby="hero-name" className="relative h-[170svh]" data-tone="light">
      <div
        ref={stage}
        className="sticky top-0 h-[100svh] overflow-hidden bg-bg"
        onPointerDown={(e) => addRipple(e.clientX)}
      >
        <h1 id="hero-name" className="sr-only">{word}</h1>

        <motion.svg
          aria-hidden="true" width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0"
        >
          <defs>
            <clipPath id="pour-clip"><path ref={clip} /></clipPath>
            <linearGradient id="pour-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C.deepSurface} />
              <stop offset="1" stopColor={C.deep} />
            </linearGradient>
          </defs>

          <text ref={measure} x="0" y="-9999" fontSize={fontSize} style={textStyle} opacity="0">{word}</text>

          {/* name above the liquid */}
          <motion.g fill={C.ink} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: intro ? 0.5 : 0.1 }}>{name}</motion.g>

          {/* liquid */}
          <path ref={waveB} fill={C.deepSurface} opacity=".55" />
          <path ref={waveA} fill="url(#pour-fill)" />

          {/* name inside the liquid, in the fragrance's own colour */}
          <g clipPath="url(#pour-clip)">
            <g fill={C.figText}>{name}</g>
            {!reduce && <Bubbles w={w} h={h} color={C.figText} />}
          </g>
        </motion.svg>

        {/* small bottles floating on the surface */}
        {bottles.map((b, i) => (
          <div key={b.slug} ref={(el) => { floats.current[i] = el; }} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-[9svh] will-change-transform md:h-[17svh]" style={{ transform: `translate(${w * 0.8}px, ${h + 50}px)` }}>
            <ProductArt product={b} level={0.7} label={false} className="h-full w-auto text-ink" />
          </div>
        ))}

        {/* copy above the surface */}
        <motion.div style={{ opacity: copyOpacity }} className="gutter absolute inset-x-0 top-0 pt-24 md:pt-28">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: intro ? 1.6 : 0.6 }}
            className="max-w-[30ch] text-lg md:text-xl"
          >
            {line}
          </motion.p>
        </motion.div>

        {/* actions inside the liquid */}
        <motion.div style={{ opacity: copyOpacity }} className="gutter on-deep absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 pb-[max(28px,env(safe-area-inset-bottom,0px))] md:pb-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: intro ? 2.4 : 1.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic><Link to="/shop" className="ui inline-block rounded-sm bg-deep-accent px-6 py-4 text-sm text-deep">{t('home.shopAll')}</Link></Magnetic>
            <Magnetic><Link to="/#discovery" className="ui inline-block rounded-sm border border-deep-ink/40 px-6 py-4 text-sm text-deep-ink">{t('home.discoveryTitle')}</Link></Magnetic>
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: intro ? 2.8 : 1.6 }}
            className="ui hidden items-center gap-3 text-xs text-deep-muted md:flex"
          >
            <motion.span aria-hidden="true" className="block h-8 w-px origin-top bg-deep-muted" animate={reduce ? undefined : { scaleY: [0, 1, 0], y: [0, 0, 16] }} transition={{ duration: 2, repeat: Infinity }} />
            {t('home.scrollHint')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function Bubbles({ w, h, color }) {
  const list = Array.from({ length: 16 }, (_, i) => i);
  return (
    <g>
      {list.map((i) => {
        const x = ((i * 97) % 100) / 100 * w;
        const r = 2 + (i % 4) * 1.6;
        return (
          <motion.circle
            key={i} r={r} initial={{ cx: x, cy: h + 10 }} fill="none" stroke={color} strokeOpacity=".5" strokeWidth="1.2"
            animate={{ cy: [h + 10, h * 0.45], cx: [x, x + ((i % 2) ? 14 : -14), x] }}
            transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.45, ease: 'easeIn' }}
          />
        );
      })}
    </g>
  );
}
