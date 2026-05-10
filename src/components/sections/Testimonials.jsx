import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { TESTIMONIALS } from '../../constants';
import { staggerContainer, staggerItem } from '../../animations';
import { GlassCard } from '../ui/Button';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setAutoPlay(false);
  };

  return (
    <section className="py-16 md:py-24 bg-dark-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            variants={staggerItem}
            className="text-cyan-400 font-medium text-sm mb-2"
          >
            Testimonials
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Hear from the industry leaders we've worked with.
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className="h-auto md:h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Avatar */}
                  <motion.div
                    className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border-2 border-cyan-400/50 flex items-center justify-center text-5xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {TESTIMONIALS[current].image}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Stars */}
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-yellow-400 text-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>

                    {/* Message */}
                    <motion.p
                      className="text-lg md:text-xl text-slate-100 mb-6 leading-relaxed italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      "{TESTIMONIALS[current].message}"
                    </motion.p>

                    {/* Author */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="text-white font-bold text-lg">
                        {TESTIMONIALS[current].name}
                      </h4>
                      <p className="text-cyan-400 text-sm">
                        {TESTIMONIALS[current].title}
                      </p>
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className="w-10 h-10 rounded-lg bg-dark-700 border border-white/10 flex items-center justify-center text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2 items-center">
              {TESTIMONIALS.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    setAutoPlay(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'bg-cyan-400 w-8'
                      : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="w-10 h-10 rounded-lg bg-dark-700 border border-white/10 flex items-center justify-center text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Testimonial Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-12 border-t border-white/10 grid grid-cols-3 gap-6 md:gap-12 text-center"
        >
          {[
            { value: '4.9/5', label: 'Avg Rating' },
            { value: '50+', label: 'Happy Clients' },
            { value: '98%', label: 'Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-cyan-400">
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
