import React from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

const Checkbox = React.forwardRef(({ label, error, className = '', ...props }, ref) => (
  <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer">
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        {...props}
      />
      <div
        className={clsx(
          'h-5 w-5 rounded border-2 border-white/10 bg-slate-950/80 transition',
          props.checked ? 'border-cyan-400 bg-cyan-500' : 'hover:border-cyan-400/50'
        )}
      >
        {props.checked && <Check size={16} className="absolute inset-0.5 text-white" />}
      </div>
    </div>
    {label && <span className="font-medium text-slate-200">{label}</span>}
    {error && <p className="mt-1 text-xs text-[#ff9aa2] col-span-full">{error}</p>}
  </label>
));

Checkbox.displayName = 'Checkbox';

export default Checkbox;
