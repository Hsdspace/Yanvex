import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { SERVICES } from '../../constants';
import { staggerContainer, staggerItem, hoverLift } from '../../animations';
import { GlassCard } from '../ui/Button';

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-dark-900 relative overflow-hidden">
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
            Our Services
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Comprehensive AI Solutions
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            From AI integration to advanced analytics, we offer end-to-end solutions to
            accelerate your digital transformation journey.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              {...hoverLift}
            >
              <GlassCard hover className="group h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  className="text-5xl md:text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3 + index * 0.5, repeat: Infinity }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-400 mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>

                {/* Link */}
                <motion.div
                  className="flex items-center gap-2 text-cyan-400 text-sm font-medium cursor-pointer group/link"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <FiArrowRight className="group-hover/link:translate-x-2 transition-transform" />
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-6">
            Can't find what you're looking for?
          </p>
          <motion.button
            className="px-8 py-3 rounded-lg bg-dark-700 border border-cyan-400/30 text-cyan-400 hover:border-cyan-400 transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Custom Solutions
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
