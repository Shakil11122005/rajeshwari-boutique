import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Clock, Users, CheckCircle2 } from 'lucide-react';

export const Training = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Aari Embroidery - Basic',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const courses = [
    {
      title: "Hand Embroidery (Aari Work)",
      levels: ["Basic", "Advanced", "Professional"],
      duration: "1 - 3 Months",
      benefits: ["Individual Attention", "Materials needs to own", "Be on the time", "Need to practice"]
    },
    {
      title: "Designer Tailoring",
      levels: ["Blouse Mastery", "Ethnic Wear", "Kids Wear"],
      duration: "2 - 4 Months",
      benefits: ["Pattern Making", "Perfect Fitting Techniques", "Individual Attention", "Materials needs to own"]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', course: 'Aari Embroidery - Basic', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-4 bg-magenta/10 rounded-full mb-6"
          >
            <GraduationCap className="text-magenta" size={32} />
          </motion.div>
          <h1 className="text-5xl font-display uppercase tracking-widest mb-4 text-magenta">Training</h1>
          <p className="text-gold font-brand text-2xl">Shape Your Career in Fashion</p>
          <div className="w-24 h-px bg-gradient-to-r from-magenta to-teal mx-auto mt-8"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Course Details */}
          <div className="space-y-12">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card-festive relative overflow-hidden group !p-10"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <h3 className="text-2xl mb-6 flex items-center font-bold text-teal-dark">
                  <BookOpen className="mr-3 text-gold" size={24} /> {course.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-2 text-teal-dark opacity-80">
                    <Clock size={16} className="text-magenta" />
                    <span className="text-sm font-sans">{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-teal-dark opacity-80">
                    <Users size={16} className="text-magenta" />
                    <span className="text-sm font-sans">Batch: 5 Students</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-display uppercase text-xs tracking-widest text-magenta font-bold">Curriculum Highlights:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center text-sm text-teal-dark italic font-sans">
                        <CheckCircle2 size={14} className="mr-2 text-gold" /> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            <div className="bg-teal-dark p-10 text-cream rounded-3xl shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <h3 className="font-display text-2xl mb-6 tracking-widest text-gold uppercase">Why Choose Us ?</h3>
              <p className="text-sm leading-relaxed opacity-80 mb-8 italic font-sans">
                Our mission is to empower women by providing them with the professional tools and techniques needed to excel. With a legacy of artistry and 100% practical focus, we turn passion into profitable careers.
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-display text-gold font-bold">50+</span>
                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold opacity-60">Success Stories</span>
                </div>
                <div className="flex flex-col text-right">
                   <span className="text-3xl font-display text-gold font-bold">Hands</span>
                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold opacity-60">on Training</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 shadow-2xl border-t-8 border-gold sticky top-32 rounded-2xl"
          >
            <h3 className="text-3xl font-display uppercase tracking-widest mb-2 text-magenta font-bold underline decoration-gold/20">Course Enquiry</h3>
            <p className="text-teal font-brand text-2xl mb-10">Start your creative journey</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none transition-colors text-sm font-sans bg-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none transition-colors text-sm font-sans bg-transparent"
                    placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none transition-colors text-sm font-sans bg-transparent"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Choose Course</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none transition-colors text-sm bg-transparent font-sans"
                >
                  <option>Aari Embroidery - Basic</option>
                  <option>Aari Embroidery - Advanced</option>
                  <option>Designer Tailoring - Master</option>
                  <option>Bridal Look - Pro</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Message (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border border-gold/20 p-4 focus:border-magenta outline-none transition-colors text-sm italic font-sans rounded-xl bg-teal/5"
                  placeholder="Your goals..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-royal py-5 text-sm"
              >
                {status === 'loading' ? 'Processing...' : 'Secure Your Seat'}
              </button>

              {status === 'success' && (
                <p className="text-center text-green-600 text-sm italic">Thank you! We will get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-center text-red-600 text-sm italic">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
