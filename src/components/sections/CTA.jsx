import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Button, GradientText } from '../ui/Button';
import { staggerContainer, staggerItem } from '../../animations';

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    message: '',
    subject: 'AI Assessment Request',
  });
  const [status, setStatus] = useState('');

  const scrollToForm = () => {
    const formSection = document.querySelector('.assessment-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const downloadBrochure = () => {
    // Create a link to download brochure (you can replace with actual brochure URL)
    const link = document.createElement('a');
    link.href = '/brochure.pdf'; // Replace with actual brochure path
    link.download = 'AI-Solutions-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const apiUrl = import.meta.env.VITE_API_URL || '/api';

    try {
      const response = await axios.post(`${apiUrl}/contact`, formData);
      if (response.data?.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          industry: '',
          message: '',
          subject: 'AI Assessment Request',
        });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus('');
        }, 5000);
      } else {
        setStatus('error');
        setTimeout(() => {
          setStatus('');
        }, 4000);
      }
    } catch (error) {
      console.error('Contact submission failed:', error.response?.data || error.message);
      setStatus('error');
      setTimeout(() => {
        setStatus('');
      }, 4000);
    }
  };

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
            <Button size="lg" className="text-base" onClick={scrollToForm}>
              Schedule Consultation
              <FiArrowRight />
            </Button>
            <Button variant="secondary" size="lg" className="text-base" onClick={downloadBrochure}>
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
          className="mt-16 max-w-md mx-auto assessment-form"
        >
          <div className="backdrop-blur-xl bg-dark-800/50 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Get Your Free AI Assessment</h3>
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Free AI assessment form">
              <input type="hidden" name="subject" value={formData.subject} />
              <label className="sr-only" htmlFor="assessment-name">Full Name</label>
              <input
                id="assessment-name"
                name="name"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none transition-all duration-300"
              />
              <label className="sr-only" htmlFor="assessment-email">Email Address</label>
              <input
                id="assessment-email"
                name="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none transition-all duration-300"
              />
              <label className="sr-only" htmlFor="assessment-phone">Phone Number</label>
              <input
                id="assessment-phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none transition-all duration-300"
              />
              <label className="sr-only" htmlFor="assessment-industry">Select Industry</label>
              <select
                id="assessment-industry"
                name="industry"
                value={formData.industry}
                onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white focus:border-white/40 focus:outline-none transition-all duration-300"
              >
                <option value="">Select Industry</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
              <label className="sr-only" htmlFor="assessment-message">Tell us how we can help</label>
              <textarea
                id="assessment-message"
                name="message"
                placeholder="Tell us how we can help"
                required
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-white/10 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none transition-all duration-300 h-32 resize-none"
              />
              <Button size="md" className="w-full" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Get Assessment'}
              </Button>
            </form>
            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center mt-4">
                ✓ Your request has been sent. We’ll contact you soon.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center mt-4">
                ⚠ Something went wrong. Please try again.
              </motion.p>
            )}
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
