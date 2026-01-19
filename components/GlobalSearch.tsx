
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { navConfig, NavItem } from '../nav.config';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="24" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const GlobalSearch: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NavItem[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Flatten the complex hierarchy for easy searching
  const flattenNav = (items: NavItem[]): NavItem[] => {
    return items.reduce((acc: NavItem[], item) => {
      acc.push(item);
      if (item.children) acc.push(...flattenNav(item.children));
      return acc;
    }, []);
  };

  const allNodes = flattenNav(navConfig).filter(n => n.path !== '#');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = allNodes.filter(node => 
        node.label.toLowerCase().includes(lowerQuery)
      ).slice(0, 8);
      setResults(filtered);
    }
  }, [query]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-6 bg-[#111e35]/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 glass-premium"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-8 py-6 border-b border-slate-50">
              <Search className="text-slate-300 mr-4" size={24} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search institutional nodes (e.g. BTC Lending, Risk Mitigation)..."
                className="flex-1 bg-transparent text-xl font-medium outline-none text-slate-900 placeholder:text-slate-300"
              />
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  ESC
                </div>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 hide-scrollbar">
              {results.length > 0 ? (
                <div className="space-y-2">
                  <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Node Matches</p>
                  {results.map((node, i) => (
                    <button
                      key={node.id + i}
                      onClick={() => handleSelect(node.path)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all text-left group"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-[#111e35] group-hover:text-white transition-all">
                          {node.icon ? <node.icon size={18} /> : <LogoMark className="w-5 h-5" color="currentColor" />}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 group-hover:text-[#111e35] tracking-tight">{node.label}</p>
                          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{node.path}</p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 flex items-center text-[#111e35] font-black text-[10px] uppercase tracking-widest transition-all">
                        Navigate <CornerDownLeft size={14} className="ml-2" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : query.trim() !== '' ? (
                <div className="py-20 text-center space-y-4">
                  <LogoMark className="mx-auto w-16 h-16 opacity-10" />
                  <p className="text-slate-400 font-medium italic">No institutional node found for "{query}".</p>
                </div>
              ) : (
                <div className="p-4 space-y-6">
                  <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Common Tranches</p>
                  <div className="grid grid-cols-2 gap-4">
                    {allNodes.slice(0, 6).map(node => (
                      <button
                        key={node.id}
                        onClick={() => handleSelect(node.path)}
                        className="flex items-center p-4 rounded-2xl border border-slate-50 hover:border-[#111e35]/30 hover:bg-slate-50/50 transition-all text-left group"
                      >
                        <ArrowRight size={14} className="mr-3 text-slate-300 group-hover:text-[#111e35]" />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{node.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <div className="flex items-center space-x-6">
                <span className="flex items-center"><CornerDownLeft size={12} className="mr-2" /> Select</span>
                <span className="flex items-center"><ArrowRight size={12} className="mr-2 rotate-90" /> Navigate</span>
              </div>
              <span>Federgreen Command Center v2.5</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;
