import React from 'react';
import clsx from 'clsx';

const Select = React.forwardRef(({ label, options = [], error, className = '', ...props }, ref) => (
  <label className="block w-full text-sm text-slate-300">
    {label && <span className="mb-2 inline-block text-sm font-medium text-slate-200">{label}</span>}
    <select
      ref={ref}
      className={clsx(
        'w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white shadow-inner transition duration-200 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/15',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-2 text-xs text-[#ff9aa2]">{error}</p>}
  </label>
));

Select.displayName = 'Select';

export default Select;
