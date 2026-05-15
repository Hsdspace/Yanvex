import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Button, GradientText } from '../ui/Button';
import { staggerContainer, staggerItem } from '../../animations';
import { useMousePosition } from '../../hooks/index.js';

const Hero = () => {
  const { x, y } = useMousePosition();

  const scrollToCTA = () => {
    const ctaSection = document.querySelector('#contact');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const floatingElements = [
    { id: 1, size: 'w-64 h-64', delay: 0, blur: 'blur-3xl', gradient: 'from-white/12 to-transparent' },
    { id: 2, size: 'w-96 h-96', delay: 0.2, blur: 'blur-2xl', gradient: 'from-slate-500/16 to-transparent' },
    { id: 3, size: 'w-72 h-72', delay: 0.4, blur: 'blur-3xl', gradient: 'from-white/6 to-transparent' },
  ];

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden pt-20">
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute ${element.size} ${element.blur} rounded-full bg-gradient-to-r ${element.gradient}`}
            animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
            transition={{ duration: 8 + element.delay, repeat: Infinity }}
            style={{
              top: `${20 + element.id * 15}%`,
              left: `${10 + element.id * 20}%`,
              transform: `translate3d(${(x - 300) * 0.01 * element.id}px, ${(y - 200) * 0.01 * element.id}px, 0)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex min-h-screen flex-col items-center justify-center text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={staggerItem} className="mb-8 inline-block">
            <motion.div
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.12)' }}
            >
              Precision systems for modern AI brands
            </motion.div>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            Transform Your Business with
            <br />
            <GradientText className="mt-2 block text-6xl md:text-7xl lg:text-8xl">
              Intelligent AI Solutions
            </GradientText>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mb-8 max-w-2xl text-lg text-slate-400 md:text-xl"
          >
            Unlock the potential of artificial intelligence. From predictive analytics to
            intelligent automation, we deliver cutting-edge AI solutions that drive growth
            and innovation.
          </motion.p>

          <motion.div variants={staggerItem} className="mb-12 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="text-base" onClick={scrollToCTA}>
              Get Started Now
              <FiArrowRight />
            </Button>
            <Button variant="secondary" size="lg" className="text-base">
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 md:gap-8"
          >
            {[
              { label: '150+', description: 'Projects Delivered' },
              { label: '50+', description: 'Happy Clients' },
              { label: '8+', description: 'Years of Expertise' },
            ].map((stat) => (
              <motion.div key={stat.label} className="text-center" whileHover={{ y: -5 }}>
                <p className="mb-1 text-2xl font-bold text-white md:text-3xl">{stat.label}</p>
                <p className="text-xs text-slate-400 md:text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-slate-400">Scroll to explore</p>
            <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
              <motion.div
                className="mt-2 h-3 w-1 rounded-full bg-white"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
