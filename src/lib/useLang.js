import { useTranslation } from 'react-i18next';

/** Current language ('en' | 'es') plus helpers for picking localised fields and formatting prices. */
export function useLang() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || 'en').startsWith('es') ? 'es' : 'en';
  const pick = (field) => (field && typeof field === 'object' ? field[lang] ?? field.en : field);
  const fmt = new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const price = (n) => fmt.format(n);
  return { t, i18n, lang, pick, price };
}
