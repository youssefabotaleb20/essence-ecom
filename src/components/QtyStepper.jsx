import { MinusIcon, PlusIcon } from './Icons';
import { useLang } from '../lib/useLang';

export default function QtyStepper({ value, onChange, label }) {
  const { t } = useLang();
  return (
    <div role="group" aria-label={label ?? t('bag.quantity')} className="ui inline-flex items-center rounded-sm border border-current/25">
      <button type="button" className="grid h-9 w-9 place-items-center disabled:opacity-30" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={t('bag.decrease')}><MinusIcon width={16} height={16} /></button>
      <span className="tabular w-7 text-center text-sm" aria-live="polite">{value}</span>
      <button type="button" className="grid h-9 w-9 place-items-center disabled:opacity-30" onClick={() => onChange(value + 1)} disabled={value >= 10} aria-label={t('bag.increase')}><PlusIcon width={16} height={16} /></button>
    </div>
  );
}
