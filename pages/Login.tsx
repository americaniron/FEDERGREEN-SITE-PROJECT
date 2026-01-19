
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Shield } from 'lucide-react';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="24" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    if (email === 'client@federgreen.com' && password === 'password') {
      localStorage.setItem('authToken', 'mock-client-token');
      localStorage.setItem('userRole', 'client');
      navigate('/client-portal');
    } else if (email === 'investor@federgreen.com' && password === 'password') {
      localStorage.setItem('authToken', 'mock-investor-token');
      localStorage.setItem('userRole', 'investor');
      navigate('/investor-portal');
    } else {
      setError('Invalid credentials. Access to this institutional node is restricted.');
    }
  };

  return (
    <div className="min-h-screen bg-[#111e35] flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl z-10"
      >
        <div className="p-12 text-center">
          <LogoMark className="w-16 h-16 mx-auto mb-6" color="white"/>
          <h1 className="serif text-4xl font-black text-white italic tracking-tighter">Sovereign Portal</h1>
          <p className="text-indigo-100/60 mt-2 font-medium">Institutional Gateway Access</p>
        </div>

        <form onSubmit={handleLogin} className="p-12 border-t border-white/10 space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Institutional Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-emerald-400 transition-all"
              placeholder="entity@federgreen.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Access Key</label>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-emerald-400 transition-all"
              placeholder="••••••••••••"
              required
            />
          </div>
          
          {error && <p className="text-rose-400 text-xs text-center font-bold bg-rose-500/10 p-3 rounded-lg">{error}</p>}

          <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center group">
            Authenticate Node
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />
          </button>
        </form>

        <div className="p-8 border-t border-white/10 text-center text-[10px] text-indigo-100/40 font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
           <Shield size={12} />
           <span>All connections are encrypted via AES-256-GCM protocol.</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
