import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, ShieldAlert } from 'lucide-react';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('boutique_admin_token');
    if (token) navigate('/admin/dashboard');
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('boutique_admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection refused. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 border-t-8 border-gold shadow-2xl rounded-3xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-5 bg-magenta text-white rounded-full mb-6 shadow-xl border-4 border-gold/20">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-3xl font-display uppercase tracking-widest text-magenta font-bold">Admin Portal</h2>
          <p className="text-gold font-brand text-2xl mt-2 drop-shadow-sm">Secure access only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Username</label>
            <input 
              type="text" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none transition-colors text-sm font-sans bg-transparent" 
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-teal-dark font-bold mb-2">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gold/30 py-3 focus:border-magenta outline-none transition-colors text-sm font-sans bg-transparent" 
            />
          </div>

          {error && <p className="text-red-500 text-xs italic text-center font-bold">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-royal py-5 flex items-center justify-center group text-xs font-bold tracking-[0.2em]"
          >
            {loading ? 'Authenticating...' : (
              <>
                <LogIn size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                Access Dashboard
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
