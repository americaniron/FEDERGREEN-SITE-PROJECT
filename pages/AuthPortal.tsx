
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Fixed missing import: AlertTriangle
import { Lock, ArrowRight, Shield, UserPlus, LogIn, ChevronLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthPortalProps {
  type: 'client' | 'investor';
  mode: 'login' | 'signup';
}

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="24" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const AuthPortal: React.FC<AuthPortalProps> = ({ type, mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Institutional Mock Auth Nodes
    if (mode === 'login') {
      if (type === 'client' && email === 'client@federgreen.com' && password === 'password') {
        localStorage.setItem('authToken', 'mock-client-token');
        localStorage.setItem('userRole', 'client');
        navigate('/client-portal');
      } else if (type === 'investor' && email === 'investor@federgreen.com' && password === 'password') {
        localStorage.setItem('authToken', 'mock-investor-token');
        localStorage.setItem('userRole', 'investor');
        navigate('/investor-portal');
      } else {
        setError('Heuristic Validation Failed: Incorrect institutional credentials.');
      }
    } else {
      // Signup Mock Node
      setError('Sovereign Enrollment Restricted: Manual node clearance required for new tranches.');
    }
  };

  const isClient = type === 'client';
  const themeColor = isClient ? 'brand-primary' : 'emerald-600';
  const accentColor = isClient ? 'brand-accent' : 'emerald-400';

  return (
    <div className={`min-h-screen ${isClient ? 'bg-brand-stone' : 'bg-brand-primary'} flex items-center justify-center p-8 relative overflow-hidden transition-colors duration-1000`}>
      <div className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 ${isClient ? 'bg-brand-accent/10' : 'bg-emerald-500/10'} rounded-full blur-[120px]`} />
      <div className={`absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 ${isClient ? 'bg-brand-primary/10' : 'bg-indigo-500/10'} rounded-full blur-[120px]`} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-xl ${isClient ? 'bg-white' : 'bg-white/5 backdrop-blur-2xl'} rounded-[4.5rem] border ${isClient ? 'border-slate-100' : 'border-white/10'} shadow-premium z-10 overflow-hidden`}
      >
        <div className="p-16 text-center border-b border-slate-50/10">
          <Link to="/" className={`inline-flex items-center space-x-3 mb-10 text-[10px] font-black uppercase tracking-[0.4em] ${isClient ? 'text-slate-400 hover:text-brand-primary' : 'text-indigo-200/40 hover:text-white'} transition-colors`}>
            <ChevronLeft size={16} />
            <span>Return to Global Terminal</span>
          </Link>
          <div className={`w-20 h-20 mx-auto mb-10 flex items-center justify-center rounded-3xl ${isClient ? 'bg-brand-primary' : 'bg-white/10'} shadow-2xl`}>
             <LogoMark className="w-10 h-10" color="white" />
          </div>
          <h1 className={`serif text-5xl font-black italic tracking-tighter ${isClient ? 'text-brand-primary' : 'text-white'}`}>
            {type === 'client' ? 'Client' : 'Investor'} {mode === 'login' ? 'Gateway' : 'Enrollment'}
          </h1>
          <p className={`${isClient ? 'text-brand-slate' : 'text-indigo-100/40'} mt-4 font-bold text-sm uppercase tracking-[0.2em]`}>
            Authorized Institutional Access Only
          </p>
        </div>

        <form onSubmit={handleAuth} className="p-16 space-y-10">
          <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase tracking-widest ${isClient ? 'text-slate-400' : 'text-emerald-400'} ml-2`}>
              {type === 'client' ? 'Corporate Identifier' : 'Syndicate ID'}
            </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`w-full ${isClient ? 'bg-slate-50 border-slate-100 text-brand-primary' : 'bg-white/5 border-white/10 text-white'} border p-6 rounded-[1.8rem] outline-none focus:border-${accentColor} transition-all font-bold tracking-tight`}
              placeholder="node@federgreen.com"
              required
            />
          </div>
          <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase tracking-widest ${isClient ? 'text-slate-400' : 'text-emerald-400'} ml-2`}>
              Encryption Key
            </label>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full ${isClient ? 'bg-slate-50 border-slate-100 text-brand-primary' : 'bg-white/5 border-white/10 text-white'} border p-6 rounded-[1.8rem] outline-none focus:border-${accentColor} transition-all font-bold`}
              placeholder="••••••••••••"
              required
            />
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className={`text-xs text-center font-bold ${isClient ? 'bg-rose-50 text-rose-600' : 'bg-rose-500/10 text-rose-400'} p-5 rounded-2xl border ${isClient ? 'border-rose-100' : 'border-rose-500/20'}`}
            >
              <AlertTriangle className="inline-block mr-2" size={14} />
              {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            className={`w-full bg-${isClient ? 'brand-primary' : 'emerald-600'} text-white py-8 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.5em] hover:bg-${isClient ? 'brand-accent' : 'emerald-500'} transition-all shadow-premium group flex items-center justify-center`}
          >
            {mode === 'login' ? 'Validate Access' : 'Initiate Enrollment'}
            <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={20} />
          </button>
        </form>

        <div className={`p-10 border-t ${isClient ? 'border-slate-50' : 'border-white/10'} text-center text-[10px] ${isClient ? 'text-slate-300' : 'text-indigo-100/40'} font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-4`}>
           <Shield size={16} />
           <span>Sovereign Link AES-256 GCM SECURED.</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPortal;
