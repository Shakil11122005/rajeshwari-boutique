import React from 'react';
import { motion } from 'motion/react';

export const About = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2">
          <h1 className="text-5xl font-display uppercase tracking-widest mb-4 text-magenta font-bold">Our Story</h1>
          <h2 className="text-gold font-brand text-4xl mb-8">Established in 2010</h2>
          <div className="space-y-6 text-teal-dark font-sans leading-relaxed italic text-lg opacity-90">
            <p>Rajeshwari Boutique & Aari Works was born out of a passion for traditional South Indian craftsmanship and a vision to blend it with modern fashion trends.</p>
            <p>What started as a small home-based project has now evolved into a premier destination for women's designer wear and a thriving training academy. We specialize in bringing intricate Aari embroidery to life, turning every garment into a work of art.</p>
            <p>Our founder believed that fashion is not just about clothes; it's about confidence and empowering women. This philosophy drives our training center, where we've helped hundreds of women gain financial independence through skill-building.</p>
          </div>
          <div className="mt-12 flex gap-12">
            <div><span className="block text-4xl font-display text-magenta font-bold">10+</span><span className="text-[10px] uppercase tracking-widest text-gold font-bold font-sans">Years Experience</span></div>
            <div><span className="block text-4xl font-display text-magenta font-bold">500+</span><span className="text-[10px] uppercase tracking-widest text-gold font-bold font-sans">Happy Clients</span></div>
            <div><span className="block text-4xl font-display text-magenta font-bold">1000+</span><span className="text-[10px] uppercase tracking-widest text-gold font-bold font-sans">Design Collections</span></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2 relative">
          <div className="bg-teal/10 w-full h-[500px] rounded-3xl relative z-0 translate-x-6 translate-y-6 border-2 border-teal/20"></div>
          <img src="""D:\ChatGPT Image Apr 21, 2026, 11_52_48 AM.png""" alt="Founder Work" className="absolute inset-0 w-full h-[500px] object-cover rounded-3xl z-10 shadow-2xl border-2 border-magenta/20" referrerPolicy="no-referrer" />
        </motion.div>
      </div>

      <div className="bg-teal-dark p-20 text-center rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10 rotate-45 pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="font-brand text-5xl mb-8 text-gold">Our Sacred Mission</h3>
          <p className="max-w-4xl mx-auto text-2xl font-display italic text-cream leading-relaxed uppercase tracking-widest">
            "To preserve the heritage of hand embroidery while empowering women with skills that foster independence and creativity."
          </p>
        </div>
      </div>

      <div className="py-32 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h3 className="text-3xl font-display uppercase tracking-widest mb-6 text-magenta underline decoration-gold/30 font-bold">Traditional Mastery</h3>
          <p className="text-teal-dark font-sans italic leading-loose text-lg opacity-80">
            Every bead, every sequence, and every stitch in our Aari work is placed by hand. We employ traditional artisans who have practiced this craft for generations, ensuring that the soul of the embroidery remains intact while meeting modern design sensibilities.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-display uppercase tracking-widest mb-6 text-magenta underline decoration-gold/30 font-bold">Quality Guarantee</h3>
          <p className="text-teal-dark font-sans italic leading-loose text-lg opacity-80">
            We source only the finest fabrics and materials. From pure Kanchipuram silks to high-grade Zardosi threads, our commitment to quality is unwavering. We believe a bridal outfit is an heirloom, and we treat it with that level of respect.
          </p>
        </div>
      </div>
    </div>
  </div>
);
