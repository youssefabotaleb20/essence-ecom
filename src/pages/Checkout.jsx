import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useBag } from '../lib/bag';
import { useLang } from '../lib/useLang';
import { ease } from '../lib/motion';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import Field from '../components/Field';
import ProductArt from '../components/ProductArt';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function validate(f) {
  const e = {};
  if (!emailOk(f.email)) e.email = 'email';
  if (f.name.trim().length < 2) e.name = 'name';
  if (f.address.trim().length < 4) e.address = 'address';
  if (!f.city.trim()) e.city = 'city';
  if (!f.country.trim()) e.country = 'country';
  if (f.card.replace(/\s/g, '').length !== 16) e.card = 'card';
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry.trim())) e.expiry = 'expiry';
  if (!/^\d{3}$/.test(f.cvc.trim())) e.cvc = 'cvc';
  return e;
}

export default function Checkout() {
  const bag = useBag();
  const { t, price } = useLang();
  useDocumentTitle(t('checkout.title'));
  const [f, setF] = useState({ email: '', name: '', address: '', city: '', country: '', card: '', expiry: '', cvc: '' });
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false);
  const [state, setState] = useState('form'); // form | placing | placed
  const [order, setOrder] = useState(null);

  const onChange = (k) => (e) => {
    let v = e.target.value;
    if (k === 'card') v = v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    if (k === 'expiry') v = v.replace(/[^\d/]/g, '').slice(0, 5).replace(/^(\d{2})(\d)/, '$1/$2');
    if (k === 'cvc') v = v.replace(/\D/g, '').slice(0, 3);
    const next = { ...f, [k]: v };
    setF(next);
    if (tried) setErrors(validate(next));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTried(true);
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setState('placing');
    setOrder({ lines: bag.lines, total: bag.subtotal, name: f.name.trim().split(' ')[0] });
    setTimeout(() => { setState('placed'); bag.clear(); window.scrollTo({ top: 0 }); }, 1400);
  };

  const err = (k) => (errors[k] ? t(`checkout.errors.${errors[k]}`) : undefined);

  if (state === 'placed' && order) return <Placed order={order} />;

  if (bag.lines.length === 0 && state === 'form') {
    return (
      <section data-tone="light" className="gutter grid min-h-[80svh] place-items-center bg-bg pt-24">
        <div className="grid justify-items-center gap-6 text-center">
          <h1 className="narrow text-[44px] leading-none md:text-[64px]">{t('checkout.title')}</h1>
          <p className="text-lg text-muted">{t('checkout.emptyBag')}</p>
          <Link to="/shop" className="ui rounded-sm bg-accent px-6 py-4 text-sm text-surface">{t('notFound.cta')}</Link>
        </div>
      </section>
    );
  }

  return (
    <section data-tone="light" className="gutter bg-bg pb-28 pt-28 md:pt-36">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <form noValidate onSubmit={onSubmit} className="grid content-start gap-10">
          <div className="grid gap-4">
            <h1 className="narrow text-[56px] leading-none tracking-[-0.02em] md:text-[88px]">{t('checkout.title')}</h1>
            <p className="ui rounded-sm bg-mid/60 px-4 py-3 text-sm">{t('checkout.demo')}</p>
            <AnimatePresence>
              {tried && Object.keys(errors).length > 0 && (
                <motion.p role="alert" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="ui text-sm text-error">{t('checkout.errors.summary')}</motion.p>
              )}
            </AnimatePresence>
          </div>

          <Step title={t('checkout.contact')} i={0}>
            <Field id="email" type="email" autoComplete="email" label={t('checkout.email')} value={f.email} onChange={onChange('email')} error={err('email')} />
          </Step>
          <Step title={t('checkout.delivery')} i={1}>
            <Field id="name" autoComplete="name" label={t('checkout.name')} value={f.name} onChange={onChange('name')} error={err('name')} />
            <Field id="address" autoComplete="street-address" label={t('checkout.address')} value={f.address} onChange={onChange('address')} error={err('address')} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="city" autoComplete="address-level2" label={t('checkout.city')} value={f.city} onChange={onChange('city')} error={err('city')} />
              <Field id="country" autoComplete="country-name" label={t('checkout.country')} value={f.country} onChange={onChange('country')} error={err('country')} />
            </div>
          </Step>
          <Step title={t('checkout.payment')} i={2}>
            <Field id="card" inputMode="numeric" autoComplete="off" label={t('checkout.card')} hint={t('checkout.cardHint')} value={f.card} onChange={onChange('card')} error={err('card')} />
            <div className="grid grid-cols-2 gap-4">
              <Field id="expiry" inputMode="numeric" autoComplete="off" placeholder="08/28" label={t('checkout.expiry')} value={f.expiry} onChange={onChange('expiry')} error={err('expiry')} />
              <Field id="cvc" inputMode="numeric" autoComplete="off" label={t('checkout.cvc')} value={f.cvc} onChange={onChange('cvc')} error={err('cvc')} />
            </div>
          </Step>

          <button type="submit" disabled={state === 'placing'} className="ui relative overflow-hidden rounded-sm bg-accent px-6 py-4 text-sm text-surface disabled:opacity-90 lg:hidden">
            {state === 'placing' ? t('checkout.placing') : `${t('checkout.place')}, ${price(bag.subtotal)}`}
          </button>
          <div className="hidden lg:block">
            <button type="submit" disabled={state === 'placing'} className="ui relative w-full overflow-hidden rounded-sm bg-accent px-6 py-4 text-sm text-surface">
              {state === 'placing' && <motion.span className="absolute inset-y-0 left-0 bg-deep/30" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.4 }} />}
              <span className="relative">{state === 'placing' ? t('checkout.placing') : `${t('checkout.place')}, ${price(bag.subtotal)}`}</span>
            </button>
          </div>
        </form>

        <aside aria-labelledby="summary-title" className="order-first grid content-start gap-5 rounded-md bg-surface p-6 lg:sticky lg:top-28 lg:order-none">
          <h2 id="summary-title" className="semi text-xl">{t('checkout.summary')}</h2>
          <ul className="grid gap-4">
            {bag.lines.map((l) => (
              <li key={`${l.slug}-${l.ml}`} className="grid grid-cols-[56px_1fr_auto] items-center gap-4">
                <div className="grid h-16 place-items-center rounded-sm bg-bg"><ProductArt product={l.product} wave={false} label={false} className="h-14" /></div>
                <div className="grid">
                  <span className="semi font-sans text-base">{l.product.name}</span>
                  <span className="ui text-xs text-muted">{l.ml} ml × {l.qty}</span>
                </div>
                <span className="ui tabular text-sm">{price(l.total)}</span>
              </li>
            ))}
          </ul>
          <dl className="ui grid gap-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt>{t('bag.subtotal')}</dt><dd className="tabular">{price(bag.subtotal)}</dd></div>
            <div className="flex justify-between"><dt>{t('checkout.shippingLine')}</dt><dd>{t('checkout.free')}</dd></div>
            <div className="flex justify-between text-base"><dt>{t('checkout.total')}</dt><dd className="tabular">{price(bag.subtotal)}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function Step({ title, i, children }) {
  return (
    <motion.fieldset initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.1 }} className="grid gap-4">
      <legend className="mb-4 flex items-baseline gap-3">
        <span className="narrow tabular font-sans text-2xl text-accent">{i + 1}</span>
        <span className="semi font-sans text-2xl">{title}</span>
      </legend>
      {children}
    </motion.fieldset>
  );
}

function Placed({ order }) {
  const { t, price } = useLang();
  return (
    <section data-tone="deep" className="grain on-deep gutter grid min-h-[100svh] place-items-center bg-deep pt-24 text-deep-ink">
      <div className="grid max-w-[560px] justify-items-center gap-8 text-center">
        <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
          <motion.circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-deep-accent)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease }} />
          <motion.path d="M38 62 L54 77 L84 45" fill="none" stroke="var(--color-deep-accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease, delay: 0.9 }} />
        </svg>
        <h1 className="narrow text-[56px] leading-none tracking-[-0.02em] md:text-[88px]">{t('checkout.placed')}</h1>
        <p className="text-lg text-deep-muted" role="status">{t('checkout.placedLine', { name: order.name })}</p>
        <p className="ui tabular text-sm">{t('checkout.total')}: {price(order.total)}</p>
        <Link to="/shop" className="ui rounded-sm bg-deep-accent px-6 py-4 text-sm text-deep">{t('product.back')}</Link>
      </div>
    </section>
  );
}
