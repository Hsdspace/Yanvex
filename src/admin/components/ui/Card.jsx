import React from 'react';
import clsx from 'clsx';

const Card = ({ title, subtitle, children, className = '' }) => (
  <div className={clsx('rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-glow', className)}>
    {(title || subtitle) && (
      <div className="mb-4 space-y-1">
        {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

export default Card;
