import { useId } from 'react';
import { motion, useReducedMotion, useTransform, isMotionValue, motionValue } from 'framer-motion';

// Drawn bottles, jars and tubes for every product, so the whole range reads as one set.
// viewBox is 200 x 300. `level` (0-1, number or MotionValue) sets how full the glass is.

// a constant motion value so useTransform can be called unconditionally
const fallbackMV = motionValue(0.8);

const SHAPES = {
  round: {
    body: 'M58 104 H142 Q170 104 170 140 V242 Q170 274 140 274 H60 Q30 274 30 242 V140 Q30 104 58 104 Z',
    neck: { x: 86, y: 86, w: 28, h: 20, r: 3 },
    cap: { x: 70, y: 34, w: 60, h: 54, r: 6 },
    top: 104, bottom: 274, label: { x: 52, y: 168, w: 96, h: 58 },
  },
  square: {
    body: 'M46 106 H154 Q160 106 160 112 V266 Q160 274 152 274 H48 Q40 274 40 266 V112 Q40 106 46 106 Z',
    neck: { x: 88, y: 92, w: 24, h: 16, r: 2 },
    cap: { x: 74, y: 40, w: 52, h: 54, r: 2 },
    top: 106, bottom: 274, label: { x: 58, y: 166, w: 84, h: 64 },
  },
  tall: {
    body: 'M74 80 H126 Q140 80 140 96 V262 Q140 276 126 276 H74 Q60 276 60 262 V96 Q60 80 74 80 Z',
    neck: { x: 90, y: 66, w: 20, h: 16, r: 2 },
    cap: { x: 82, y: 18, w: 36, h: 50, r: 5 },
    top: 80, bottom: 276, label: { x: 66, y: 156, w: 68, h: 70 },
  },
  dropper: {
    body: 'M78 140 H122 Q142 140 142 160 V258 Q142 276 124 276 H76 Q58 276 58 258 V160 Q58 140 78 140 Z',
    neck: { x: 86, y: 126, w: 28, h: 16, r: 2 },
    cap: { x: 80, y: 104, w: 40, h: 24, r: 4 },
    bulb: true,
    top: 140, bottom: 276, label: { x: 66, y: 186, w: 68, h: 56 },
  },
  jar: {
    body: 'M50 160 H150 Q166 160 166 176 V258 Q166 274 150 274 H50 Q34 274 34 258 V176 Q34 160 50 160 Z',
    cap: { x: 28, y: 118, w: 144, h: 44, r: 8 },
    top: 160, bottom: 274, label: { x: 56, y: 196, w: 88, h: 50 },
  },
  tube: {
    body: 'M52 30 H148 L124 236 H76 Z',
    cap: { x: 70, y: 234, w: 60, h: 42, r: 6 },
    opaque: true,
    top: 30, bottom: 236, label: { x: 72, y: 96, w: 56, h: 90 },
  },
  vial: {
    body: 'M90 76 H110 Q116 76 116 82 V262 Q116 274 104 274 H96 Q84 274 84 262 V82 Q84 76 90 76 Z',
    cap: { x: 82, y: 36, w: 36, h: 42, r: 4 },
    top: 76, bottom: 274,
  },
};

export default function ProductArt({ product, level = 0.82, wave = true, label = true, className = '', title }) {
  const uid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const s = SHAPES[product.shape] ?? SHAPES.round;
  const h = s.bottom - s.top;
  const lv = isMotionValue(level) ? level : null;
  const staticY = s.top + (1 - (lv ? 0.8 : level)) * h - 8;
  const motionY = useTransform(lv ?? fallbackMV, (v) => s.top + (1 - v) * h - 8);
  const y = lv ? motionY : staticY;
  const short = product.name.replace('Mineral Sunscreen SPF 30', 'Sunscreen').replace(' Serum', '').replace(' Cleanser', '');

  return (
    <svg viewBox="0 0 200 300" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <clipPath id={`b${uid}`}><path d={s.body} /></clipPath>
        <linearGradient id={`g${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".12" />
          <stop offset="1" stopColor="#fff" stopOpacity=".3" />
        </linearGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="100" cy={s.bottom + 8} rx={product.shape === 'vial' ? 26 : 70} ry="6" fill="var(--color-ink)" opacity=".12" />

      {s.bulb && <ellipse cx="100" cy="66" rx="17" ry="40" fill="var(--color-ink)" stroke="currentColor" strokeOpacity=".35" strokeWidth="1.5" />}
      {s.cap && <rect x={s.cap.x} y={s.cap.y} width={s.cap.w} height={s.cap.h} rx={s.cap.r} fill={s.opaque ? 'var(--color-ink)' : 'var(--color-deep)'} stroke="currentColor" strokeOpacity=".35" strokeWidth="1.5" />}
      {s.cap && !s.opaque && <rect x={s.cap.x + 4} y={s.cap.y + 4} width="5" height={s.cap.h - 8} rx="2" fill="#fff" opacity=".14" />}
      {s.neck && <rect x={s.neck.x} y={s.neck.y} width={s.neck.w} height={s.neck.h} rx={s.neck.r} fill="var(--color-mid)" />}

      {/* glass */}
      <path d={s.body} fill={s.opaque ? product.liquid : '#ffffff'} fillOpacity={s.opaque ? 1 : 0.38} />
      {!s.opaque && (
        <g clipPath={`url(#b${uid})`}>
          <motion.g style={{ y }}>
            <motion.path
              d="M-200 8 Q-175 0 -150 8 T-100 8 T-50 8 T0 8 T50 8 T100 8 T150 8 T200 8 T250 8 T300 8 T350 8 T400 8 V320 H-200 Z"
              fill={product.liquid}
              animate={wave && !reduce ? { x: [0, 100] } : undefined}
              transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
            />
          </motion.g>
        </g>
      )}
      <path d={s.body} fill={`url(#g${uid})`} />
      <path d={s.body} fill="none" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.5" />

      {label && s.label && (
        <g>
          <rect x={s.label.x} y={s.label.y} width={s.label.w} height={s.label.h} rx="2" fill="var(--color-surface)" />
          <text x="100" y={s.label.y + 18} textAnchor="middle" fontFamily="Mona Sans, sans-serif" fontSize="10" fontWeight="600" style={{ fontStretch: '75%' }} fill="var(--color-ink)">Essence</text>
          <text x="100" y={s.label.y + s.label.h / 2 + 10} textAnchor="middle" fontFamily="Newsreader, serif" fontSize={short.length > 12 ? 9 : 11} fill="var(--color-ink)">{short}</text>
          <line x1={s.label.x + 10} x2={s.label.x + s.label.w - 10} y1={s.label.y + 25} y2={s.label.y + 25} stroke="var(--color-ink)" strokeOpacity=".3" />
        </g>
      )}
    </svg>
  );
}
