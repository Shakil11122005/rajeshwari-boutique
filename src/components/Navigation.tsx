import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingBag, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Training', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-magenta border-b-2 border-gold shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3">
             <img 
               src="/boutique-logo.png" 
               alt="Rajeshwari Boutique Logo" 
               className="h-14 w-14 object-contain brightness-110"
               onError={(e) => {
                 // Fallback to text if image hasn't been uploaded yet
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.parentElement?.querySelector('.logo-text-fallback')?.classList.remove('hidden');
               }}
             />
             <div className="flex flex-col logo-text-fallback hidden">
                <span className="font-brand text-3xl leading-none text-white">Rajeshwari</span>
                <span className="font-display text-[8px] tracking-[0.4em] uppercase text-gold -mt-1 font-bold">Boutique</span>
             </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-display text-[11px] uppercase tracking-widest transition-colors hover:text-gold ${
                  location.pathname === link.path ? 'text-gold font-bold underline underline-offset-8' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+919698615411" className="text-white hover:text-gold transition-colors">
              <Phone size={20} />
            </a>
            <Link to="/contact" className="btn-royal py-2 px-6 shadow-none hover:shadow-lg border border-gold/30">Enquire</Link>
          </div>


          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-6">
            <a href="tel:+919698615411" className="text-white hover:text-gold transition-colors">
              <Phone size={24} />
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-magenta border-t border-gold shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-6 pb-10 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block font-display text-sm uppercase tracking-widest ${
                    location.pathname === link.path ? 'text-gold font-bold underline underline-offset-8' : 'text-white/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full btn-royal text-center py-4 rounded-xl shadow-none"
                >
                  Book Appointment
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Call Button for Mobile */}
      <div className="md:hidden fixed bottom-8 right-6 z-[60]">
        <motion.a
          href="tel:+919698615411"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-magenta p-4 rounded-full shadow-[0_10px_30px_rgba(136,14,79,0.5)] border-2 border-gold flex items-center justify-center text-white relative group"
        >
          <span className="absolute -top-12 right-0 bg-white text-magenta text-[10px] font-bold py-1 px-3 rounded-lg shadow-md border border-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest pointer-events-none">
            Call Us Now
          </span>
          <Phone size={28} strokeWidth={2.5} />
          <span className="absolute inset-0 rounded-full bg-magenta animate-ping -z-10 opacity-40"></span>
        </motion.a>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-teal-dark text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
        <div className="space-y-4">
          <div className="flex flex-col">
            <img 
              src="/boutique-logo.png" 
              alt="Logo" 
              className="h-24 w-24 object-contain mb-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.footer-logo-text')?.classList.remove('hidden');
              }}
            />
            <div className="footer-logo-text hidden flex flex-col">
              <span className="font-brand text-5xl leading-none text-white">Rajeshwari</span>
              <span className="font-display text-[10px] tracking-[0.4em] uppercase text-gold font-bold">Boutique</span>
            </div>
          </div>
          <p className="text-white/70 text-sm italic font-display leading-relaxed">
            Celebrating the vibrant heritage of Indian fashion since 2015. Bringing intricate Aari artistry to every celebration.
          </p>
        </div>
        
        <div>
          <h4 className="font-display text-lg mb-6 text-gold uppercase tracking-widest">Explore</h4>
          <ul className="space-y-3 text-sm tracking-wide opacity-80 font-sans">
            <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link to="/training" className="hover:text-gold transition-colors">Academy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-6 text-gold uppercase tracking-widest">Specialties</h4>
          <ul className="space-y-3 text-sm tracking-wide opacity-80 font-sans">
            <li>Bridal Aari Work</li>
            <li>Designer Blouses</li>
            <li>Langa Voni Sets</li>
            <li>Professional Training</li>
          </ul>
        </div>

        <div>
           <h4 className="font-display text-lg mb-6 text-gold uppercase tracking-widest">Visit Us</h4>
          <div className="space-y-3 text-sm opacity-80 font-sans">
            <p>Rajeshwari boutique & aari work</p>
            <p>RVC5+WMX, Mettur</p>
            <p>Tamil Nadu 636404</p>
            <p className="pt-2 font-bold text-white">PH: +91 9698615411</p>
          </div>
        </div>
      </div>
      
      <div className="bg-teal py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] font-sans">
          <div className="text-white opacity-70">© {new Date().getFullYear()} Rajeshwari Boutique & Aari Works | All Rights Reserved</div>
          <a href="https://wa.me/919698615411" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-6 py-2.5 mt-6 md:mt-0 rounded-full flex items-center gap-2 font-bold normal-case tracking-normal shadow-lg hover:scale-105 transition-transform">
            <MessageSquare size={16} /> Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};
