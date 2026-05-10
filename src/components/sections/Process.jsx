import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../constants';
import { staggerContainer, staggerItem } from '../../animations';
import { GlassCard } from '../ui/Button';

const Process = () => {
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
            Our Process
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            How We Transform Your Business
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            A proven methodology that ensures successful AI implementation and measurable ROI.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/20 via-purple-600/20 to-cyan-400/20" />

          {/* Process Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                variants={staggerItem}
                className="relative"
              >
                {/* Step Number Circle */}
                <motion.div
                  className="absolute -top-16 left-0 right-0 flex justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-600/20 border-2 border-cyan-400/50 flex items-center justify-center">
                    <span className="text-3xl font-bold text-cyan-400">
                      {step.number}
                    </span>
                  </div>
                </motion.div>

                {/* Step Card */}
                <GlassCard hover className="mt-20 h-full">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <motion.div
                    className="mt-6 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  />
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Implementation Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Typical Implementation Timeline
          </h3>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { phase: 'Week 1-2', title: 'Discovery & Planning', icon: '📋' },
              { phase: 'Week 3-4', title: 'Design & Architecture', icon: '🎨' },
              { phase: 'Week 5-8', title: 'Development & Testing', icon: '⚙️' },
              { phase: 'Week 9+', title: 'Deployment & Support', icon: '🚀' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="text-cyan-400 font-medium text-sm mb-2">{item.phase}</p>
                  <p className="text-white font-semibold">{item.title}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
