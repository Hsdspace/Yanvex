import React from 'react';
import { motion } from 'framer-motion';

/**
 * Primary Button Component
 */
export const Button = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-300 flex items-center gap-2 justify-center';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-white to-slate-400 text-dark-900 hover:shadow-glow-lg',
    secondary: 'bg-dark-700 border border-cyan-400/30 text-cyan-400 hover:bg-dark-600 hover:border-cyan-400/60',
    outline: 'border border-slate-400 text-slate-100 hover:border-cyan-400 hover:text-cyan-400',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  );
};

/**
 * Glassmorphism Card Component
 */
export const GlassCard = ({
  children,
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <motion.div
      className={`
        relative backdrop-blur-xl bg-white/5 border border-white/10
        rounded-2xl p-6 overflow-hidden group
        ${hover ? 'hover:border-cyan-400/50 hover:shadow-glow' : ''}
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { y: -5 } : {}}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

/**
 * Gradient Text Component
 */
export const GradientText = ({ children, className = '' }) => {
  return (
    <span className={`bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

/**
 * Badge Component
 */
export const Badge = ({ children, className = '', variant = 'default' }) => {
  const variantClasses = {
    default: 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-400',
    purple: 'bg-purple-600/10 border border-purple-600/30 text-purple-400',
    success: 'bg-white/10 border border-white/20 text-slate-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

/**
 * Icon Button Component
 */
export const IconButton = ({
  icon: Icon,
  onClick,
  className = '',
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <motion.button
      className={`
        flex items-center justify-center rounded-lg
        bg-dark-700 border border-white/10
        text-cyan-400 hover:border-cyan-400/50
        transition-all duration-300
        ${sizeClasses[size]} ${className}
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={20} />}
    </motion.button>
  );
};

/**
 * Section Title Component
 */
export const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = true,
  className = '' 
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
            className="text-slate-300 font-medium text-sm mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          {title}
        </motion.h2>
      )}
    </div>
  );
};

/**
 * Divider Component
 */
export const Divider = ({ className = '' }) => {
  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-white/30 to-transparent ${className}`} />
  );
};

/**
 * Animated Counter Component
 */
export const Counter = ({ value, suffix = '', duration = 2 }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const numValue = parseInt(value.toString().replace(/\D/g, ''));
    const increment = numValue / (duration * 60);
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setCount(numValue);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <span>{count}+</span>;
};
