import React, { useState } from 'react';
import clsx from 'clsx';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  sizes = '100vw',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      {!loaded && (
        <div
          aria-hidden="true"
          className={clsx(
            'absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-slate-700/20',
            placeholderClassName
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={clsx(
          'h-full w-full object-cover transition duration-700',
          loaded ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0'
        )}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
