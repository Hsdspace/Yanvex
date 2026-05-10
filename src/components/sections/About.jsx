import React from 'react';
import { motion } from 'framer-motion';
import { STATISTICS } from '../../constants';
import { staggerContainer, staggerItem, hoverLift } from '../../animations';
import { GlassCard, Counter } from '../ui/Button';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-dark-900 relative overflow-hidden">
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
            About Us
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Pioneering AI Innovation
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            We're a team of AI experts dedicated to transforming businesses through intelligent
            automation and data-driven insights. Our mission is to make cutting-edge AI accessible
            to companies of all sizes.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Left Content */}
          <motion.div
            variants={staggerItem}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Built for Tomorrow's Challenges
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Our team combines deep expertise in machine learning, cloud computing, and
                enterprise software to deliver solutions that truly transform business operations.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 pt-4">
              {[
                'Advanced AI & Machine Learning',
                'Cloud-Native Architecture',
                '24/7 Expert Support',
                'Scalable Solutions',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            variants={staggerItem}
            className="relative h-96 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-2xl" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-6xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🚀
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {STATISTICS.map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
            >
              <GlassCard hover className="h-full">
                <div className="space-y-2">
                  <h4 className="text-3xl md:text-4xl font-bold text-cyan-400">
                    {stat.value}
                  </h4>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <GlassCard className="text-center p-8 md:p-12">
            <p className="text-lg md:text-xl text-slate-300">
              "We believe AI is not just a technology—it's a business imperative. Our mission is
              to democratize AI and empower every organization to harness its transformative power."
            </p>
            <p className="text-cyan-400 font-medium mt-4">— Our Founding Philosophy</p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
