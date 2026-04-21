import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Sparkles, GraduationCap, Heart, Star, ShieldCheck } from 'lucide-react';

export const Services = () => {
  const serviceList = [
    {
      title: "Designer Tailoring",
      icon: Scissors,
      desc: "Perfectly fitted blouses, Chudidhars, and Lehengas tailored with precision.",
      features: ["Precise Body Measurements", "Trendy Neck Designs", "Quick Turnaround", "Fit Guarantee"]
    },
    {
      title: "Aari Embroidery",
      icon: Sparkles,
      desc: "Exquisite hand-worked embroidery using Zardosi, silk threads, and stones.",
      features: ["Custom Bridal Patterns", "Premium Materials", "Intricate Detailing", "Unique Themes"]
    },
    {
      title: "Training",
      icon: GraduationCap,
      desc: "Professional coaching for women to master the art of tailoring and embroidery.",
      features: ["Flexible Batches", "Practical Focus", "Hands-on Training", "Friendly Approach"]
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-20">
          <h1 className="text-5xl font-display uppercase tracking-widest mb-4 text-magenta">Our Services</h1>
          <p className="text-gold font-brand text-3xl">Bespoke excellence in every design</p>
          <div className="w-24 h-px bg-gradient-to-r from-magenta to-teal mx-auto mt-8"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {serviceList.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card-festive h-full group !p-10"
            >
              <div className="mb-8 text-magenta group-hover:scale-110 group-hover:text-teal transition-all duration-500">
                <svc.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl mb-4 font-bold tracking-tight text-teal-dark">{svc.title}</h3>
              <p className="text-gray-600 font-sans italic text-sm mb-8 leading-relaxed">{svc.desc}</p>
              <ul className="space-y-4">
                {svc.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center text-[10px] uppercase tracking-widest text-teal-dark font-bold opacity-70">
                    <Star size={10} className="mr-3 text-gold" fill="currentColor" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-teal-dark p-12 text-cream rounded-3xl shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-magenta/5 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-4xl text-gold mb-8 font-brand drop-shadow-md">Specialists in Bridal Art</h2>
            <p className="italic opacity-80 leading-relaxed mb-10 font-sans text-lg">
              We specialize in creating the most stunning bridal blouses with heavy Aari work that complements your wedding saree perfectly. From traditional motifs to contemporary patterns, our artisans bring your vision to life.
            </p>
            <div className="flex space-x-12">
              <div className="flex items-center text-[10px] uppercase tracking-widest font-bold"><Heart className="mr-3 text-gold" size={20} fill="currentColor" /> Hand-Crafted</div>
              <div className="flex items-center text-[10px] uppercase tracking-widest font-bold"><ShieldCheck className="mr-3 text-gold" size={20} /> Royal Quality</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <img src="/public/images/aari-work-1.jpeg" alt="Work 1" className="w-full h-56 object-cover rounded-2xl border-2 border-gold/20 shadow-xl" referrerPolicy="no-referrer" />
            <img src="/public/images/aari-work-2.jpeg" alt="Work 2" className="w-full h-56 object-cover rounded-2xl border-2 border-gold/20 shadow-xl" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </div>
  );
};
