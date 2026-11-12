import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { bySlug } from '../data/products';

const BagContext = createContext(null);
const KEY = 'essence-bag-v2';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items.filter((i) => bySlug(i.slug)) : [];
  } catch {
    return [];
  }
}

export function BagProvider({ children }) {
  const [items, setItems] = useState(load);
  const [open, setOpen] = useState(false);
  const [flight, setFlight] = useState(null); // { id, x, y, color } for the add-to-bag droplet
  const [justAdded, setJustAdded] = useState(0);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage blocked: bag lives in memory */ }
  }, [items]);

  const add = useCallback((slug, ml, from) => {
    setItems((prev) => {
      const hit = prev.find((i) => i.slug === slug && i.ml === ml);
      if (hit) return prev.map((i) => (i === hit ? { ...i, qty: Math.min(10, i.qty + 1) } : i));
      return [...prev, { slug, ml, qty: 1 }];
    });
    const p = bySlug(slug);
    if (from) setFlight({ id: Date.now(), x: from.x, y: from.y, color: p?.liquid });
    setJustAdded(Date.now());
  }, []);

  const setQty = useCallback((slug, ml, qty) => {
    setItems((prev) => prev.map((i) => (i.slug === slug && i.ml === ml ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i)));
  }, []);
  const remove = useCallback((slug, ml) => setItems((prev) => prev.filter((i) => !(i.slug === slug && i.ml === ml))), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const lines = items.map((i) => {
      const product = bySlug(i.slug);
      const size = product.sizes.find((s) => s.ml === i.ml) ?? product.sizes[0];
      return { ...i, product, price: size.price, total: size.price * i.qty };
    });
    return {
      items, lines,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.total, 0),
      add, setQty, remove, clear,
      open, setOpen, flight, setFlight, justAdded,
    };
  }, [items, add, setQty, remove, clear, open, flight, justAdded]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBag = () => useContext(BagContext);
