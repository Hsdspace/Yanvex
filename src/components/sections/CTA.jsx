import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Button, GradientText } from '../ui/Button';
import { staggerContainer, staggerItem } from '../../animations';

const CTA = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-dark-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl bg-gradient-to-r from-white/14 to-slate-500/18"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Transform Your
            <br />
            <GradientText>Business with AI?</GradientText>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join industry leaders who are already leveraging AI to drive growth, reduce costs,
            and gain competitive advantage. Let's discuss how we can help your organization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <Button size="lg" className="text-base">
              Schedule Consultation
              <FiArrowRight />
            </Button>
            <Button variant="secondary" size="lg" className="text-base">
              Download Brochure
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row justify-center gap-8 pt-12 border-t border-white/10"
          >
            {[
              { number: '30min', label: 'Free Initial Consultation' },
              { number: '100%', label: 'Satisfaction Guaranteed' },
              { number: '24/7', label: 'Expert Support' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex-1"
                whileHover={{ y: -5 }}
              >
                <p className="text-2xl font-bold text-slate-100">{item.number}</p>
                <p className="text-slate-400 text-sm mt-1">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-md mx-auto"
        >
          <div className="backdrop-blur-xl bg-dark-800/50 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Get Your Free AI Assessment</h3>
            <form className="space-y-4" aria-label="Free AI assessment form">
              <label className="sr-only" htmlFor="assessment-name">Full Name</label>
              <input
                id="assessment-name"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none transition-all duration-300"
              />
              <label className="sr-only" htmlFor="assessment-email">Email Address</label>
              <input
                id="assessment-email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none transition-all duration-300"
              />
              <label className="sr-only" htmlFor="assessment-phone">Phone Number</label>
              <input
                id="assessment-phone"
                type="tel"
                placeholder="Phone Number"
                autoComplete="tel"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none transition-all duration-300"
              />
              <label className="sr-only" htmlFor="assessment-industry">Select Industry</label>
              <select
                id="assessment-industry"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white focus:border-white/40 focus:outline-none transition-all duration-300"
                defaultValue=""
              >
                <option value="">Select Industry</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
              <Button size="md" className="w-full" type="submit">
                Get Assessment
              </Button>
            </form>
            <p className="text-xs text-slate-500 mt-4 text-center">
              We'll get back to you within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
