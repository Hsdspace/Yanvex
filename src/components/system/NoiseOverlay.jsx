import React from 'react';

const NoiseOverlay = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[1] opacity-[0.045] mix-blend-soft-light"
    style={{
      backgroundImage:
        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0.7px, transparent 0.8px), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.22) 0.7px, transparent 0.8px)',
      backgroundSize: '18px 18px, 24px 24px',
    }}
  />
);

export default NoiseOverlay;
