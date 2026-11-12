import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../lib/useLang';
import { ease } from '../lib/motion';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import SplitWord from '../components/SplitWord';
import Field from '../components/Field';
import ProductArt from '../components/ProductArt';
import { fragrances } from '../data/products';

export default function About() {
  const { t } = useLang();
  useDocumentTitle(t('about.title'));
  return (
    <>
      <section data-tone="light" className="gutter relative overflow-hidden bg-bg pb-24 pt-28 md:pb-36 md:pt-40">
        <div className="mx-auto grid max-w-[1280px] gap-10">
          <h1 className="narrow font-sans text-[22vw] leading-[0.82] tracking-[-0.035em] md:text-[180px]"><SplitWord text={t('about.title')} delay={0.4} /></h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.9 }} className="max-w-[48ch] text-xl md:text-[28px] md:leading-[1.4]">
            {t('about.intro')}
          </motion.p>
        </div>
        <ShelfRow />
      </section>

      <section data-tone="deep" className="grain on-deep gutter bg-deep py-24 text-deep-ink md:py-36">
        <div className="mx-auto grid max-w-[1280px] gap-12">
          <h2 className="narrow text-[48px] leading-none tracking-[-0.02em] md:text-[80px]">{t('about.makeTitle')}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <motion.div key={n} className="grid content-start gap-3 border-t border-deep-line pt-6"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              >
                <h3 className="semi text-2xl text-deep-accent">{t(`about.make${n}t`)}</h3>
                <p className="text-lg text-deep-muted">{t(`about.make${n}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}

function ShelfRow() {
  return (
    <div aria-hidden="true" className="mx-auto mt-16 flex max-w-[1280px] items-end justify-between gap-2 overflow-hidden md:mt-24">
      {fragrances.map((f, i) => (
        <motion.div key={f.slug} className="h-32 md:h-64"
          initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 1 + i * 0.08 }}
        >
          <ProductArt product={f} label={false} className="h-full w-auto" />
        </motion.div>
      ))}
    </div>
  );
}

function Contact() {
  const { t } = useLang();
  const [f, setF] = useState({ cname: '', cemail: '', cmessage: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!f.cname.trim()) errs.cname = t('about.errors.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.cemail.trim())) errs.cemail = t('about.errors.email');
    if (!f.cmessage.trim()) errs.cmessage = t('about.errors.message');
    setErrors(errs);
    if (Object.keys(errs).length) { document.getElementById(Object.keys(errs)[0])?.focus(); return; }
    setSent(true);
  };
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <section id="contact" data-tone="light" className="gutter scroll-mt-24 bg-surface py-24 md:py-36">
      <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="grid content-start gap-4">
          <h2 className="narrow text-[48px] leading-none tracking-[-0.02em] md:text-[80px]">{t('about.contactTitle')}</h2>
          <p className="text-lg text-muted">{t('about.contactLine')}</p>
        </div>
        {sent ? (
          <motion.p role="status" initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} className="self-center text-2xl">{t('about.sent')}</motion.p>
        ) : (
          <form noValidate onSubmit={submit} className="grid gap-5">
            <Field id="cname" autoComplete="name" label={t('about.name')} value={f.cname} onChange={on('cname')} error={errors.cname} />
            <Field id="cemail" type="email" autoComplete="email" label={t('about.email')} value={f.cemail} onChange={on('cemail')} error={errors.cemail} />
            <Field id="cmessage" as="textarea" label={t('about.message')} value={f.cmessage} onChange={on('cmessage')} error={errors.cmessage} />
            <button type="submit" className="ui justify-self-start rounded-sm bg-accent px-6 py-4 text-sm text-surface">{t('about.send')}</button>
          </form>
        )}
      </div>
    </section>
  );
}
