export default function Field({ id, label, error, hint, as = 'input', className = '', ...rest }) {
  const Tag = as;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <label htmlFor={id} className="ui text-sm">{label}</label>
      <Tag
        id={id} name={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy}
        className={`w-full rounded-sm border bg-surface px-4 py-3.5 text-base outline-none transition-[border-color,box-shadow] duration-300 focus:border-ink focus:shadow-[0_0_0_3px_rgba(143,84,22,.18)] ${error ? 'border-error' : 'border-line'} ${as === 'textarea' ? 'min-h-36 resize-y' : ''}`}
        {...rest}
      />
      {hint && <p id={`${id}-hint`} className="text-sm text-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="text-sm text-error">{error}</p>}
    </div>
  );
}
