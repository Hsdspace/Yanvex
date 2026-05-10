import React from 'react';
import { motion } from 'framer-motion';
import { TRUSTED_COMPANIES } from '../../constants';
import { staggerContainer, staggerItem } from '../../animations';

const TrustedCompanies = () => {
  // Duplicate companies for infinite scroll effect
  const duplicatedCompanies = [...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES];

  return (
    <section className="py-16 md:py-24 bg-dark-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p
            variants={staggerItem}
            className="text-cyan-400 font-medium text-sm mb-2"
          >
            Trusted By Industry Leaders
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Join 50+ companies transforming with AI
          </motion.h2>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative mt-12">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-900 to-transparent z-10" />

          {/* Marquee */}
          <motion.div
            className="flex gap-8 md:gap-16"
            animate={{ x: ['0%', `-${50 * TRUSTED_COMPANIES.length}%`] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedCompanies.map((company, index) => (
              <motion.div
                key={`${company.id}-${index}`}
                className="flex-shrink-0 w-40 md:w-48"
                whileHover={{ y: -5 }}
              >
                <div className="h-20 md:h-24 bg-dark-800 border border-white/10 rounded-lg flex items-center justify-center hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group">
                  <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                    {company.logo}
                  </span>
                </div>
                <p className="text-center mt-3 text-sm md:text-base text-slate-400 group-hover:text-cyan-400 transition-colors">
                  {company.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Below */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10"
        >
          {[
            { value: '150+', label: 'Projects' },
            { value: '8+', label: 'Years' },
            { value: '40+', label: 'Experts' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                {stat.value}
              </h3>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
