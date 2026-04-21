import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { id: 'all', name: 'All Collection' },
  { id: 'tailoring', name: 'Tailoring' },
  { id: 'aari', name: 'Aari Work' },
  { id: 'training', name: 'Training' },
];

export const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data as fallback
  const mockItems = [
    { _id: '1', imageUrl: 'https://pisum.photos/seed/blouse-1/600/800', category: 'tailoring', title: 'Silk Bridal Blouse' },
    { _id: '2', imageUrl: 'https://picsum.photos/seed/aari-1/600/800', category: 'aari', title: 'Heavy Zardosi Work' },
    { _id: '3', imageUrl: 'https://picsum.photos/seed/training-1/600/800', category: 'training', title: 'Aari Basic Batch' },
    { _id: '4', imageUrl: 'https://picsum.photos/seed/blouse-2/600/800', category: 'tailoring', title: 'Velvet Design' },
    { _id: '5', imageUrl: 'https://picsum.photos/seed/aari-2/600/800', category: 'aari', title: 'Peacock Motif Aari' },
    { _id: '6', imageUrl: 'https://picsum.photos/seed/training-2/600/800', category: 'training', title: 'Tailoring Workshop' },
  ];

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(mockItems);
        }
        setLoading(false);
      })
      .catch(() => {
        setItems(mockItems);
        setLoading(false);
      });
  }, []);

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-display uppercase tracking-widest mb-4 text-magenta font-bold">Artisan Gallery</h1>
          <p className="text-gold font-brand text-3xl">Spectacular collection of exquisite designs</p>
          <div className="w-24 h-px bg-gradient-to-r from-magenta to-teal mx-auto mt-8"></div>
        </header>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-10 py-3 text-[10px] uppercase tracking-[0.3em] font-bold border-2 transition-all duration-500 rounded-full ${
                filter === cat.id 
                  ? 'bg-magenta text-white border-magenta shadow-xl scale-110' 
                  : 'text-teal-dark border-teal/20 hover:border-gold hover:text-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden bg-white aspect-[3/4] rounded-3xl border border-teal/10 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-teal-dark/95 via-teal-dark/50 to-transparent">
                  <span className="text-gold font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block font-sans">{item.category}</span>
                  <h4 className="text-cream font-display text-2xl tracking-wide font-bold">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
