import React from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { useMousePosition, useWindowSize } from '../../hooks/index.js';

const CursorGlow = () => {
  const prefersReducedMotion = useReducedMotion();
  const { width } = useWindowSize();
  const mousePosition = useMousePosition();
  const x = useSpring(mousePosition.x - 180, { stiffness: 180, damping: 26 });
  const y = useSpring(mousePosition.y - 180, { stiffness: 180, damping: 26 });

  if (prefersReducedMotion || width < 1024) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[5] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.10)_0%,_rgba(163,163,163,0.06)_30%,_transparent_72%)] blur-3xl"
      style={{ x, y }}
    />
  );
};

export default CursorGlow;
