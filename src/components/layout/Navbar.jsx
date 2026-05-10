import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { Button, GradientText } from '../ui/Button';
import { NAV_ITEMS } from '../../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl bg-dark-900/80 border-b border-white/10 shadow-glow'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center"
            >
              <div className="text-2xl font-bold">
                <GradientText>Yanvex</GradientText>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="secondary" size="sm">
                Demo
              </Button>
              <Button size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="md:hidden text-slate-200"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        aria-hidden={!isOpen}
        initial={{ opacity: 0, height: 0 }}
        animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed top-16 left-0 right-0 z-30 backdrop-blur-xl bg-dark-900/95 border-b border-white/10"
      >
        <div className="px-4 py-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="block text-slate-400 hover:text-cyan-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 10 }}
            >
              {item.label}
            </motion.a>
          ))}
          <div className="pt-4 space-y-2 border-t border-white/10">
            <Button variant="secondary" size="sm" className="w-full">
              Demo
            </Button>
            <Button size="sm" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
