import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const whatsappNumber = "919698615411";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi Rajeshwari Boutique, I'd like to enquire about your services.`;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <h1 className="text-5xl font-display uppercase tracking-widest mb-6 text-magenta">Contact Us</h1>
            <p className="text-gold font-brand text-2xl mb-12">We value every thread of conversation</p>
            
            <div className="space-y-8">
              {[
                { icon: Phone, title: "Phone", content: "+91 9698615411", sub: "Mon-Sat: 09:00 AM - 8:00 PM" },
                { icon: Mail, title: "Email", content: "rajeshwariboutique.aariworks@gmail.com", sub: "Response within 24 hours" },
                { icon: MapPin, title: "Address", content: "Rajeshwari boutique & aari work", sub: "RVC5+WMX, Mettur, Tamil Nadu 636404" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-magenta" />
                  </div>
                  <div>
                    <h4 className="font-display uppercase text-xs tracking-widest text-gold font-bold mb-1">{item.title}</h4>
                    <p className="text-teal-dark font-medium font-sans">{item.content}</p>
                    <p className="text-teal-dark/60 text-xs italic font-sans">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-teal/10 border-l-4 border-teal rounded-r-2xl overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-xl font-display mb-4 text-teal-dark font-bold underline decoration-gold/30">Instant Support</h4>
                <p className="text-sm text-teal-dark/80 mb-6 italic font-sans font-medium">Chat directly with our designers on WhatsApp for quick design discussions and status updates.</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-10 py-3 bg-[#25D366] text-white rounded-full text-sm font-bold shadow-xl hover:scale-105 transition-transform">
                  <MessageSquare size={18} className="mr-2" /> Message on WhatsApp
                </a>
              </div>
              <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 text-teal-dark">
                <MessageSquare size={180} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card-festive p-8 md:p-12">
            <h3 className="text-2xl font-display uppercase tracking-widest mb-8 text-magenta font-bold underline decoration-gold/20">Direct Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none transition-colors font-sans bg-transparent" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none transition-colors font-sans bg-transparent" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Message</label>
                <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full border border-gold/20 p-4 focus:border-magenta outline-none transition-colors italic font-sans rounded-xl bg-teal/5" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" disabled={status === 'loading'} className="btn-royal w-full py-5 uppercase text-xs font-bold tracking-widest">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-center text-teal-dark font-sans italic mt-4 font-bold">Message sent successfully!</p>}
              {status === 'error' && <p className="text-center text-red-600 font-sans italic mt-4 font-bold">Failed to send message.</p>}
            </form>
          </motion.div>
        </div>

        <div className="mt-24 h-[400px] bg-cream border-2 border-magenta/20 shadow-2xl relative rounded-3xl overflow-hidden">
           <iframe 
            src="https://www.google.com/maps?q=Rajeshwari+boutique+%26+aari+work,+RVC5%2BWMX,+Mettur,+Tamil+Nadu+636404&output=embed" 
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            title="Boutique Location"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

