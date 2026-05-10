import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2';
  const variants = {
    primary: 'bg-cyan-400 text-slate-950 shadow-glow hover:bg-cyan-300',
    secondary: 'bg-slate-800 text-white border border-white/10 hover:bg-slate-700',
    ghost: 'bg-transparent text-white/90 hover:bg-white/5',
    danger: 'bg-slate-600 text-white hover:bg-slate-500',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-3.5 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
