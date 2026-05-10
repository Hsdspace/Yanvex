import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = ({ label = 'Loading experience...' }) => (
  <div className="flex min-h-screen items-center justify-center bg-dark-900 px-4 text-white">
    <div className="flex max-w-sm flex-col items-center gap-5 text-center">
      <motion.div
        className="relative h-20 w-20 rounded-full border border-white/10 bg-white/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
      >
        <div className="absolute inset-3 rounded-full border border-white/10" />
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.02),rgba(255,255,255,0.35),rgba(255,255,255,0.02))]" />
      </motion.div>
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Yanvex</p>
        <p className="text-sm text-slate-300">{label}</p>
      </div>
      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-slate-300 via-white to-slate-400"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  </div>
);

export default PageLoader;
