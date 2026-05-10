import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

const SmoothScrollProvider = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    let frameId = 0;

    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);
    window.lenis = lenis;

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      delete window.lenis;
    };
  }, [prefersReducedMotion]);

  return children;
};

export default SmoothScrollProvider;
