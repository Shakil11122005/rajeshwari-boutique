import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Mail, GraduationCap, Trash2, Check, RefreshCcw, User, Phone, FileText, Image as ImageIcon, Plus, X } from 'lucide-react';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'enquiries' | 'gallery'>('contacts');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', imageUrl: '', category: 'tailoring' });
  const navigate = useNavigate();

  const fetchItems = async () => {
    setLoading(true);
    const token = localStorage.getItem('boutique_admin_token');
    if (!token) { navigate('/admin'); return; }

    const endpoint = activeTab === 'contacts' ? '/api/contacts' : 
                     activeTab === 'enquiries' ? '/api/enquiries' : '/api/gallery';
    try {
      const res = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('boutique_admin_token');
        navigate('/admin');
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('boutique_admin_token');
    const endpoint = activeTab === 'contacts' ? `/api/contacts/${id}` : 
                     activeTab === 'enquiries' ? `/api/enquiries/${id}` : `/api/gallery/${id}`;
    if (!window.confirm('Are you sure you want to delete this?')) return;

    try {
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setData(data.filter(item => item._id !== id));
    } catch (err) { console.error(err); }
  };

  const handleToggleRead = async (id: string) => {
      const token = localStorage.getItem('boutique_admin_token');
      const endpoint = activeTab === 'contacts' ? `/api/contacts/${id}/read` : `/api/enquiries/${id}/read`;
      try {
        await fetch(endpoint, {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setData(data.map(item => item._id === id ? { ...item, read: true } : item));
      } catch (err) { console.error(err); }
  };

  const handleCreateGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('boutique_admin_token');
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newGalleryItem)
      });
      if (res.ok) {
        fetchItems();
        setShowGalleryModal(false);
        setNewGalleryItem({ title: '', imageUrl: '', category: 'tailoring' });
      }
    } catch (err) { console.error(err); }
  };

  const logout = () => {
    localStorage.removeItem('boutique_admin_token');
    navigate('/admin');
  };

  return (
    <div className="pt-24 min-h-screen bg-teal/5 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white p-10 border-t-4 border-gold shadow-2xl rounded-3xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/5 rounded-full -mr-16 -mt-16"></div>
          <div>
            <h1 className="text-4xl font-display uppercase tracking-widest text-magenta font-bold">Manager Console</h1>
            <p className="text-gold font-brand text-2xl">Overseeing the Artistry</p>
          </div>
          <button onClick={logout} className="mt-4 md:mt-0 flex items-center text-[10px] uppercase tracking-[0.3em] text-teal-dark font-bold hover:text-magenta transition-colors bg-teal/5 px-6 py-3 rounded-full">
            <LogOut size={16} className="mr-2" /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-10 bg-white/50 backdrop-blur-md p-3 border border-gold/20 w-fit rounded-full shadow-lg">
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-full flex items-center ${
              activeTab === 'contacts' ? 'bg-magenta text-white shadow-xl scale-105' : 'text-teal-dark opacity-60 hover:opacity-100'
            }`}
          >
            <Mail size={16} className="mr-2" /> Contacts
          </button>
          <button 
             onClick={() => setActiveTab('enquiries')}
             className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-full flex items-center ${
              activeTab === 'enquiries' ? 'bg-magenta text-white shadow-xl scale-105' : 'text-teal-dark opacity-60 hover:opacity-100'
            }`}
          >
            <GraduationCap size={16} className="mr-2" /> Training
          </button>
          <button 
             onClick={() => setActiveTab('gallery')}
             className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-full flex items-center ${
              activeTab === 'gallery' ? 'bg-magenta text-white shadow-xl scale-105' : 'text-teal-dark opacity-60 hover:opacity-100'
            }`}
          >
            <ImageIcon size={16} className="mr-2" /> Gallery
          </button>
        </div>

        {activeTab === 'gallery' && (
          <div className="mb-10">
            <button 
              onClick={() => setShowGalleryModal(true)}
              className="btn-royal flex items-center space-x-3 px-8 py-4 text-[10px] tracking-widest"
            >
              <Plus size={18} /> <span>Upload New Artistry</span>
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="space-y-8">
          {loading ? (
             <div className="p-24 text-center">
               <RefreshCcw className="animate-spin mx-auto text-magenta mb-6" size={48} /> 
               <span className="text-xl font-brand text-gold animate-pulse">Summoning Records...</span>
             </div>
          ) : data.length === 0 ? (
            <div className="bg-white p-24 text-center border-2 border-gold/10 border-dashed rounded-3xl">
              <p className="text-teal-dark/40 font-display italic text-xl">The archives are currently silent.</p>
            </div>
          ) : activeTab === 'gallery' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
               {data.map(item => (
                 <div key={item._id} className="relative group bg-white border border-teal/10 p-4 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                   <img src={item.imageUrl} alt={item.title} className="w-full aspect-[3/4] object-cover rounded-2xl" referrerPolicy="no-referrer" />
                   <div className="mt-4">
                     <p className="text-[10px] font-bold uppercase text-magenta truncate tracking-widest">{item.title}</p>
                     <p className="text-[10px] uppercase text-gold font-sans font-bold mt-1">{item.category}</p>
                   </div>
                   <button 
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-6 right-6 bg-red-600/90 text-white p-2 rounded-full hover:scale-110 transition-transform shadow-xl backdrop-blur-sm"
                   >
                     <Trash2 size={14} />
                   </button>
                 </div>
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {data.map((item) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item._id}
                  className={`bg-white p-8 border-t-4 ${item.read ? 'border-teal/20' : 'border-magenta'} shadow-xl rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden`}
                >
                  {!item.read && <div className="absolute top-0 right-0 w-2 h-2 bg-magenta m-4 rounded-full animate-ping"></div>}
                  <div className="space-y-4 flex-grow">
                    <div className="flex flex-wrap items-center gap-6">
                      <span className="flex items-center text-[10px] uppercase font-bold text-magenta tracking-widest"><User size={14} className="mr-2" /> {item.name}</span>
                      <span className="flex items-center text-[10px] uppercase text-teal-dark opacity-60 tracking-widest"><Mail size={14} className="mr-2" /> {item.email}</span>
                      {item.phone && <span className="flex items-center text-[10px] uppercase text-teal-dark opacity-60 tracking-widest"><Phone size={14} className="mr-2" /> {item.phone}</span>}
                      {item.course && <span className="px-4 py-1 bg-magenta/5 text-magenta text-[9px] font-bold uppercase tracking-widest rounded-full border border-magenta/10">{item.course}</span>}
                    </div>
                    <div className="flex items-start gap-3 bg-teal/5 p-4 rounded-xl">
                       <FileText size={18} className="text-teal mt-1 shrink-0" />
                       <p className="text-sm italic text-teal-dark leading-relaxed font-sans font-medium">{item.message || '(Silence)'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 shrink-0">
                    {!item.read && (
                      <button 
                        onClick={() => handleToggleRead(item._id)}
                        className="p-3 text-teal border border-teal/20 hover:bg-teal hover:text-white rounded-full transition-all shadow-md"
                      >
                        <Check size={20} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="p-3 text-red-600 border border-red-600/20 hover:bg-red-600 hover:text-white rounded-full transition-all shadow-md"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGalleryModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGalleryModal(false)} className="absolute inset-0 bg-teal-dark/60 backdrop-blur-md"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white max-w-lg w-full p-10 shadow-full relative z-10 rounded-[2rem] border-2 border-gold/30">
              <button 
                onClick={() => setShowGalleryModal(false)}
                className="absolute top-6 right-6 text-teal-dark/40 hover:text-magenta transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-3xl font-display uppercase tracking-widest mb-8 text-magenta font-bold underline decoration-gold/30">Add Royal Design</h3>
              <form onSubmit={handleCreateGalleryItem} className="space-y-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-3">Item Title</label>
                  <input type="text" required value={newGalleryItem.title} onChange={e => setNewGalleryItem({...newGalleryItem, title: e.target.value})} className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none font-sans bg-transparent" placeholder="e.g. Bridal Blouse Masterpiece" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-3">Item URL</label>
                  <input type="url" required value={newGalleryItem.imageUrl} onChange={e => setNewGalleryItem({...newGalleryItem, imageUrl: e.target.value})} className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none font-sans bg-transparent" placeholder="HTTPS image path..." />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-3">Categorization</label>
                  <select value={newGalleryItem.category} onChange={e => setNewGalleryItem({...newGalleryItem, category: e.target.value})} className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none bg-transparent font-sans">
                    <option value="tailoring">Tailoring</option>
                    <option value="aari">Aari Work</option>
                    <option value="training">Academy</option>
                  </select>
                </div>
                <button type="submit" className="w-full btn-royal py-5 mt-6 text-sm font-bold tracking-[0.2em] uppercase">Publish to Gallery</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
