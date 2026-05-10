import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from 'react-icons/fa';
import { GradientText } from '../ui/Button';
import { staggerContainer, staggerItem } from '../../animations';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Enterprise', href: '#' },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Support', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Compliance', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FaEnvelope, url: 'mailto:hello@yanvex.ai', label: 'Email' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-white/10 relative overflow-hidden">
      {/* Top CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Let's Talk About Your Next Project
            </h3>
            <p className="text-slate-400">
              Have an interesting challenge? We'd love to hear about it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hello@yanvex.ai"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-white to-slate-300 text-dark-900 font-medium hover:shadow-glow-lg transition-all duration-300 text-center"
            >
              hello@yanvex.ai
            </a>
            <a
              href="tel:+1234567890"
              className="px-6 py-3 rounded-lg bg-dark-700 border border-white/10 text-white hover:border-white/40 transition-all duration-300 text-center"
            >
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div variants={staggerItem} className="mb-4">
              <div className="text-2xl font-bold mb-2">
                <GradientText>Yanvex</GradientText>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transforming businesses through intelligent AI solutions. We partner with
                leading companies to unlock the potential of artificial intelligence.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={staggerItem} className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-700 border border-white/10 flex items-center justify-center text-slate-200 hover:border-white/40 hover:bg-dark-600 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h4
                variants={staggerItem}
                className="text-white font-semibold text-sm mb-4"
              >
                {category}
              </motion.h4>
              <motion.ul
                className="space-y-3"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
              >
                {links.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={staggerItem}
                  >
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500"
        >
          <p>© {currentYear} Yanvex Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>

      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-white/5 to-transparent blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
