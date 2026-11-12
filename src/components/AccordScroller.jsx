import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import ProductArt from './ProductArt';
import { C } from '../lib/tokens';
import { ease, useFinePointer } from '../lib/motion';

/**
 * The signature section. A tall scroll track with a sticky stage: as you scroll, the ground moves
 * from sage to bottle green, the liquid in the bottle drops, and the notes (or key ingredients)
 * play in order, top to heart to base, each one condensing out of a blur.
 *
 * stages: [{ id, label, words: string[], line, big? }]
 * head: optional block shown before the first stage (the home hero); it lifts away as you scroll.
 */
export default function AccordScroller({ product, stages, head, headAside, id, labelledBy, title, titleLink }) {
  const track = useRef(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const hasHead = Boolean(head);
  const start = hasHead ? 0.16 : 0.02;
  const n = stages.length;
  const [active, setActive] = useState(hasHead ? -1 : 0);
  const r = 1 - start;

  // one ground colour per stage: first is sage, last is bottle green, any between is the mid tone
  const stageColors = n === 1 ? [C.mid] : stages.map((_, i) => (i === 0 ? C.bg : i === n - 1 ? C.deep : C.mid));
  const input = [0];
  const output = [hasHead ? C.bg : stageColors[0]];
  if (hasHead) { input.push(start - 0.02, start + 0.02); output.push(C.bg, stageColors[0]); }
  for (let i = 1; i < n; i++) {
    const b = start + (r * i) / n;
    input.push(b - 0.025, b + 0.025);
    output.push(stageColors[i - 1], stageColors[i]);
  }
  input.push(1); output.push(stageColors[n - 1]);
  const bg = useTransform(p, input, output);
  const deep = active >= 0 && stageColors[active] === C.deep;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(v < start ? (hasHead ? -1 : 0) : Math.min(n - 1, Math.floor(((v - start) / r) * n)));
  });

  const level = useTransform(p, [0, 1], [0.86, 0.3]);
  const headY = useTransform(p, [0, start], ['0%', '-30%']);
  const headOpacity = useTransform(p, [0, start * 0.9], [1, 0]);
  const artScale = useTransform(p, [0, start, 1], [1, 0.86, 0.78]);
  const artRotate = useTransform(p, [0, 1], [-4, 6]);
  const barScale = useTransform(p, [start, 1], [0, 1]);

  // pointer tilt for the bottle on desktop
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (!fine || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 14, y: ((e.clientY - r.top) / r.height - 0.5) * -10 });
  };

  const stage = active >= 0 ? stages[active] : null;

  return (
    <section
      ref={track} id={id} aria-labelledby={labelledBy}
      className="relative"
      style={{ height: `${(hasHead ? 120 : 60) + n * 90}svh` }}
    >
      <motion.div
        data-tone={deep ? 'deep' : 'light'}
        className={`sticky top-0 flex h-[100svh] flex-col overflow-hidden transition-colors duration-500 ${deep ? 'on-deep text-deep-ink' : 'text-ink'}`}
        style={{ backgroundColor: bg }}
        onPointerMove={onMove}
      >
        <Vapor active={!reduce} deep={deep} color={product.liquid} />

        <div className="gutter relative mx-auto grid h-full w-full max-w-[1440px] grid-rows-[1fr_auto] pt-20 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:grid-rows-1 md:pt-24">
          {/* text side */}
          <div className="relative row-start-2 flex min-w-0 flex-col justify-end pb-[max(28px,env(safe-area-inset-bottom,0px))] md:row-start-1 md:justify-center md:pb-16">
            {hasHead && (
              <motion.div style={{ y: headY, opacity: headOpacity }} className="absolute inset-x-0 bottom-[max(28px,env(safe-area-inset-bottom,0px))] md:bottom-auto md:top-1/2 md:-translate-y-1/2" aria-hidden={active >= 0}>
                {head}
              </motion.div>
            )}

            {title && (
              <Link to={titleLink} className="semi relative z-10 mb-2 justify-self-start font-sans text-xl underline-offset-4 hover:underline md:mb-0 md:text-2xl">{title}</Link>
            )}
            <div className="relative min-h-[46svh] md:min-h-[50svh]" aria-live="polite">
              <AnimatePresence mode="popLayout">
                {stage && (
                  <motion.div key={stage.id} className="absolute inset-x-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.35 } }}
                  >
                    <motion.p
                      className="ui mb-4 text-sm opacity-80 md:mb-6"
                      initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 0.8 }} transition={{ duration: 0.5, ease }}
                    >
                      {stage.label}
                    </motion.p>
                    {stage.big && (
                      <motion.p
                        className="narrow tabular font-sans text-[22vw] leading-[0.85] tracking-[-0.04em] md:text-[11vw]"
                        initial={{ filter: 'blur(18px)', opacity: 0, fontVariationSettings: '"wdth" 125' }}
                        animate={{ filter: 'blur(0px)', opacity: 1, fontVariationSettings: '"wdth" 75' }}
                        exit={{ filter: 'blur(14px)', opacity: 0, y: -30 }}
                        transition={{ duration: 0.9, ease }}
                      >
                        {stage.big}
                      </motion.p>
                    )}
                    <p className="font-sans text-[13vw] leading-[0.92] tracking-[-0.025em] md:text-[6.4vw]">
                      {stage.words.map((w, i) => (
                        <span key={w} className="block overflow-hidden pb-[0.06em]">
                          <motion.span
                            className="narrow block"
                            initial={{ y: '105%', filter: 'blur(10px)', fontVariationSettings: '"wdth" 110' }}
                            animate={{ y: '0%', filter: 'blur(0px)', fontVariationSettings: '"wdth" 75' }}
                            exit={{ y: '-60%', filter: 'blur(12px)', opacity: 0 }}
                            transition={{ duration: 0.85, ease, delay: 0.08 + i * 0.09 }}
                          >
                            {w}
                          </motion.span>
                        </span>
                      ))}
                    </p>
                    <motion.p
                      className="mt-5 max-w-[40ch] text-base opacity-80 md:mt-7 md:text-lg"
                      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.85 }} transition={{ duration: 0.7, ease, delay: 0.3 }}
                    >
                      {stage.line}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* progress through the stages */}
            <motion.div className="mt-6 flex items-center gap-3 md:mt-10" aria-hidden="true" animate={{ opacity: active < 0 ? 0 : 1 }}>
              {stages.map((s, i) => (
                <span key={s.id} className={`ui text-xs transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-70'}`}>{s.short ?? s.label}</span>
              ))}
              <span className="relative ml-2 h-px flex-1 bg-current/25">
                <motion.span className="absolute inset-0 origin-left bg-current" style={{ scaleX: barScale }} />
              </span>
            </motion.div>
          </div>

          {/* bottle side */}
          <div className="pointer-events-none relative row-start-1 flex min-h-0 items-center justify-center md:pointer-events-auto">
            {headAside}
            <motion.div style={{ scale: artScale, rotate: artRotate }} className="relative h-[38svh] md:h-[72svh]">
              <motion.div animate={{ rotateY: tilt.x, rotateX: tilt.y }} transition={{ type: 'spring', stiffness: 80, damping: 15 }} style={{ transformPerspective: 900 }} className="h-full">
                <motion.div animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="h-full">
                  <ProductArt product={product} level={level} className="h-full w-auto" title={product.name} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/** Soft particles drifting up from the bottle: the scent leaving the glass. */
function Vapor({ active, deep, color }) {
  if (!active) return null;
  const dots = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[45%]">
      {dots.map((i) => {
        const left = 30 + ((i * 37) % 40);
        const size = 10 + ((i * 13) % 30);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full blur-[10px]"
            style={{ left: `${left}%`, bottom: '18%', width: size, height: size, backgroundColor: deep ? C.deepAccent : color }}
            animate={{ y: [0, -420 - (i % 5) * 60], x: [0, ((i % 2) ? 1 : -1) * (20 + (i % 4) * 15)], opacity: [0, 0.55, 0], scale: [0.6, 1.4, 1.8] }}
            transition={{ duration: 7 + (i % 5), repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}
