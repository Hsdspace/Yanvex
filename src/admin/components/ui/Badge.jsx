import React from 'react';
import clsx from 'clsx';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/20',
    secondary: 'bg-white/5 text-slate-300 ring-1 ring-white/10',
    success: 'bg-white/10 text-slate-200 ring-1 ring-white/15',
    danger: 'bg-slate-500/20 text-slate-100 ring-1 ring-slate-400/20',
  };
  return (
    <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]', variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
