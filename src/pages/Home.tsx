import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, GraduationCap, ArrowRight, Quote } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, link, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="card-festive h-full flex flex-col items-center text-center group"
  >
    <div className="w-16 h-16 bg-magenta/10 flex items-center justify-center rounded-full mb-6 group-hover:bg-magenta transition-colors">
      <Icon className="text-magenta group-hover:text-white transition-colors" size={32} />
    </div>
    <h3 className="text-xl mb-4 uppercase tracking-wider text-teal-dark font-bold">{title}</h3>
    <p className="text-gray-600 text-sm italic mb-6 flex-grow">{description}</p>
    <Link to={link} className="text-gold flex items-center text-xs tracking-[0.2em] font-sans font-bold uppercase group-hover:translate-x-2 transition-transform">
      Learn More <ArrowRight size={14} className="ml-2" />
    </Link>
  </motion.div>
);

export const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden hero-pattern">
        <div className="relative max-w-7xl mx-auto px-4 w-full text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-brand text-6xl md:text-8xl text-gold mb-2 drop-shadow-lg">Rajeshwari</h2>
            <h1 className="font-display text-2xl md:text-4xl tracking-[0.6em] uppercase text-white font-bold mb-8 drop-shadow-md">
              Boutique & Aari Works
            </h1>
            <p className="text-white text-lg md:text-2xl font-display italic mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-sm opacity-90">
              Transforming your celebrations with the royal touch of traditional Aari artistry and bespoke designer wear.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/gallery" className="btn-royal text-sm px-10">Explore Collection</Link>
              <Link to="/training" className="btn-outline-royal text-sm px-10">Training</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-white border-y-8 border-gold/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="font-brand text-5xl mb-2 text-magenta">Elite Craftsmanship</h3>
            <h2 className="text-3xl tracking-[0.3em] uppercase text-teal-dark font-bold">Bridal Specialists</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-magenta via-gold to-teal mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
               { icon: Scissors, title: "Designer Blouses", desc: "Expert tailoring that blends traditional silhouettes with modern comfort and perfect fit.", delay: 0.1 },
               { icon: Sparkles, title: "Royal Aari Work", desc: "Heavy bridal embroidery using premium beads and zardosi for a majestic presence.", delay: 0.2 },
               { icon: GraduationCap, title: "Fashion Design Training", desc: "Empowering women with professional development and Career-focused training.", delay: 0.3 }
            ].map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: svc.delay }}
                viewport={{ once: true }}
                className="card-festive flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-magenta/5 flex items-center justify-center rounded-2xl mb-8 group-hover:bg-magenta transition-all duration-500 group-hover:rotate-12">
                  <svc.icon className="text-magenta group-hover:text-white transition-colors" size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl mb-4 uppercase tracking-wider text-teal-dark font-bold">{svc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed italic">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-teal/5 relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-magenta/5 rounded-full -ml-32 -mt-32"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Quote className="text-gold mx-auto mb-6" size={48} />
            <h2 className="text-4xl tracking-[0.3em] uppercase font-bold text-teal-dark">Voices of Elegance</h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                text: "I never visited to her shop but she satisfied me with her work each and every time.Either suit or blouse she is perfect and make me happy always. Definitely recommended!",
                author: "Priyanka",
                role: "Customer"
              },
              { 
                text: "Joining the Aari training was the best decision. The instructors are so patient and skilled.",
                author: "Karthika",
                role: "Student"
              }
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-10 relative border-t-4 border-magenta shadow-xl rounded-2xl group hover:bg-magenta transition-colors duration-500"
              >
                <Quote className="absolute top-4 right-4 text-gold opacity-20 group-hover:rotate-12 transition-transform" size={40} />
                <p className="text-teal-dark font-sans italic mb-8 leading-relaxed group-hover:text-cream transition-colors">"{t.text}"</p>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-magenta uppercase tracking-widest text-sm group-hover:text-gold transition-colors">{t.author}</span>
                  <span className="text-[10px] text-gold uppercase tracking-widest font-bold">{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-24 bg-magenta text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute inset-0 hero-pattern rotate-180"></div>
        </div>
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="font-brand text-6xl text-gold mb-8 drop-shadow-md underline decoration-gold/30">Ready to Shine?</h2>
          <p className="text-white mb-12 font-display italic text-xl opacity-90">Consult with our expert designers today for personalized royal styling.</p>
          <Link to="/contact" className="btn-outline-royal border-white text-white hover:bg-white hover:text-magenta px-12 block md:inline-block">
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
};
