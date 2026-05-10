import React from 'react';
import { motion } from 'framer-motion';

const RouteTransition = ({ children, routeKey }) => (
  <motion.div
    key={routeKey}
    initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.985 }}
    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
    exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.01 }}
    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default RouteTransition;
