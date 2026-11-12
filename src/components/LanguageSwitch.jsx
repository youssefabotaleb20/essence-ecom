import { useLang } from '../lib/useLang';

export default function LanguageSwitch({ className = '' }) {
  const { t, i18n, lang } = useLang();
  return (
    <div role="group" aria-label={t('lang.label')} className={`ui inline-flex items-center gap-1 text-xs ${className}`}>
      {['en', 'es'].map((l) => (
        <button
          key={l} type="button" lang={l} aria-pressed={lang === l}
          onClick={() => i18n.changeLanguage(l)}
          className={`rounded-sm px-2 py-1.5 transition-opacity ${lang === l ? 'opacity-100 underline underline-offset-4' : 'opacity-60 hover:opacity-100'}`}
        >
          {l === 'en' ? 'EN' : 'ES'}<span className="sr-only"> {t(`lang.${l}`)}</span>
        </button>
      ))}
    </div>
  );
}
