import { NOTES } from '../data/notes';

/** One plain line per product: every note for a fragrance, key ingredients with amounts for skincare. */
export const sentence = (parts) => parts.map((w, i) => (i === 0 ? w : w.charAt(0).toLowerCase() + w.slice(1))).join(', ');
export const detailLine = (p, pick) =>
  p.type === 'fragrance'
    ? sentence([...p.notes.top, ...p.notes.heart, ...p.notes.base].map((n) => pick(NOTES[n])))
    : sentence(p.key.map((k) => `${pick(k.name)}${k.amount ? ` ${k.amount}` : ''}`));

