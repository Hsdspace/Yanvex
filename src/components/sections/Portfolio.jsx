import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { staggerContainer, staggerItem, hoverLift } from '../../animations';
import { GlassCard } from '../ui/Button';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${apiUrl}/projects`);
        // Assuming your API returns { success: true, data: [...] }
        setProjects(response.data.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Dynamically generate categories from the actual data in MongoDB
  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="bg-dark-900 py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mx-auto"></div>
        <p className="text-slate-400 mt-4">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-dark-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-cyan-400 font-medium text-sm mb-2">
            Portfolio
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore our latest AI solutions and success stories from industry leaders.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-cyan-400 text-dark-900'
                  : 'bg-dark-700 text-slate-400 border border-white/10 hover:border-cyan-400/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={staggerItem}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                {...hoverLift}
              >
                <GlassCard hover className="group overflow-hidden h-full flex flex-col">
                  {/* Project Image/Visual */}
                  <motion.div
                    className="relative h-48 md:h-56 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 rounded-lg mb-6 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  >
                    {project.images && project.images[0] ? (
                      <img 
                        src={project.images[0]} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.div
                        className="text-5xl"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3 + index * 0.5, repeat: Infinity }}
                      >
                        {/* Fallback to emojis if no image is present */}
                        {project.category === 'Analytics' ? '📊' : '🤖'}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Link */}
                  <motion.div
                    className="flex items-center gap-2 text-cyan-400 text-sm font-medium cursor-pointer group/link"
                    whileHover={{ x: 5 }}
                  >
                    View Case Study
                    <FiArrowRight className="group-hover/link:translate-x-2 transition-transform" />
                  </motion.div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <motion.button
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-600 text-dark-900 font-medium hover:shadow-glow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <FiArrowRight className="inline ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;