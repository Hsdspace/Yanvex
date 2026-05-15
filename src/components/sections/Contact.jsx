import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Contact = () => {
  // Updated state to include 'phone' and 'industry' as required by your controller
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    industry: ''
  });
  
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Ensure VITE_API_URL is correctly set in your frontend .env
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`, 
        formData
      );
      
      if (response.data.success) {
        setStatus('success');
        // Reset form
        setFormData({ 
          name: '', email: '', phone: '', 
          subject: '', message: '', industry: '' 
        });
      }
    } catch (error) {
      // This will now print the specific validation error from your backend
      console.error("Backend Error Details:", error.response?.data?.message || error.message);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-900 text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-cyan-400">Get In Touch</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="w-full p-4 bg-dark-800 border border-slate-700 rounded-lg focus:border-cyan-400 outline-none"
              placeholder="Your Name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
              className="w-full p-4 bg-dark-800 border border-slate-700 rounded-lg focus:border-cyan-400 outline-none"
              placeholder="Your Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="w-full p-4 bg-dark-800 border border-slate-700 rounded-lg focus:border-cyan-400 outline-none"
              placeholder="Phone Number"
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <input
              className="w-full p-4 bg-dark-800 border border-slate-700 rounded-lg focus:border-cyan-400 outline-none"
              placeholder="Industry (e.g. Tech, Healthcare)"
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            />
          </div>

          <input
            className="w-full p-4 bg-dark-800 border border-slate-700 rounded-lg focus:border-cyan-400 outline-none"
            placeholder="Subject"
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />

          <textarea
            className="w-full p-4 bg-dark-800 border border-slate-700 rounded-lg h-32 focus:border-cyan-400 outline-none"
            placeholder="How can we help you?"
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>

          <button 
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-dark-900 font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {status === 'sending' ? 'Processing...' : 'Send Inquiry'}
          </button>

          {status === 'success' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center font-medium">
              ✓ Message sent successfully! We'll be in touch.
            </motion.p>
          )}
          
          {status === 'error' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium">
              ⚠ Error sending message. Please check all fields and try again.
            </motion.p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;