import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button.jsx';

const Modal = ({ isOpen, title, onClose, children, footer }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-300 hover:text-white">
              Close
            </Button>
          </div>
          <div className="space-y-6">{children}</div>
          {footer && <div className="mt-6 flex flex-wrap justify-end gap-3">{footer}</div>}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
