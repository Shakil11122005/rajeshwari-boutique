import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div>
      <motion.div
d className="h-[300px] lg:h-[500px] border-magenta/20 bg-[#3a0a1a] p-8" // Background div
>
        <img
          src="/images/rajeshwari-logo.jpg"
          className="object-cover h-full w-full" // Updated to object-cover
          alt="Rajeshwari Boutique Logo"
        />
      </motion.div>
    </div>
  );
};

export default About;