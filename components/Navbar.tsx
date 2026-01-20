
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navConfig } from '../nav.config';
import { ChevronDown, Menu, X, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
      scrolled ? 'py-3 md:py-4' : 'py-6 md:py-8'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className={`flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-700 border ${
          scrolled ? 'bg-brand-stone/90 backdrop-blur-3xl border-brand-accent/20 shadow-2xl' : 'bg-transparent border-transparent'
        }`}>
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3 md:space-x-4 group focus-visible:outline-brand-accent">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-700 ${
              scrolled ? 'bg-brand-primary text-brand-stone' : 'bg-brand-stone text-brand-primary'
            } group-hover:rotate-12`}>
              <Landmark size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] leading-none mb-1 md:mb-1.5 ${
                scrolled ? 'text-brand-primary' : 'text-brand-primary'
              }`}>Federgreen</p>
              <p className={`text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none ${
                scrolled ? 'text-brand-slate' : 'text-brand-primary/60'
              }`}>Consulting Group</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-2">
            {navConfig.map((item) => (
              <div 
                key={item.id} 
                className="relative group/item"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.path === '#' ? (
                  <button className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center transition-colors ${
                    scrolled ? 'text-brand-primary hover:bg-brand-stone' : 'text-brand-primary hover:bg-brand-stone/10'
                  }`}>
                    {item.label}
                    {item.children && <ChevronDown size={12} className="ml-2 opacity-40" />}
                  </button>
                ) : (
                  <Link to={item.path} className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center transition-colors ${
                    scrolled ? 'text-brand-primary hover:bg-brand-stone' : 'text-brand-primary hover:bg-brand-stone/10'
                  }`}>
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {activeDropdown === item.id && item.children && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-brand-stone rounded-3xl shadow-2xl border border-brand-accent/20 overflow-hidden"
                    >
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link 
                            key={child.id} 
                            to={child.path}
                            className="block px-6 py-4 rounded-2xl hover:bg-white/60 transition-colors group/link"
                          >
                            <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1 group-hover/link:text-brand-accent-deep">{child.label}</p>
                            {child.children && (
                                <p className="text-[9px] text-brand-slate font-bold uppercase tracking-widest opacity-60">Sub-Tranches Available</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center space-x-2 md:space-x-4">
             <Link 
              to="/login" 
              className={`hidden sm:flex px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all ${
                scrolled ? 'bg-brand-primary text-brand-stone shadow-xl shadow-brand-primary/20 hover:bg-brand-primary-dark' : 'bg-brand-primary/10 text-brand-primary backdrop-blur-md hover:bg-brand-primary/20'
              }`}
            >
              Portal Login
            </Link>
            <button 
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2.5 md:p-3 rounded-xl transition-colors ${
                scrolled ? 'bg-brand-stone text-brand-primary' : 'bg-brand-primary/10 text-brand-primary'
              }`}
            >
              {isOpen ? <X size={18} className="md:w-5 md:h-5" /> : <Menu size={18} className="md:w-5 md:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-[99] bg-brand-primary text-brand-stone p-8 md:p-12 lg:hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto pt-24 space-y-10 md:space-y-12">
              {navConfig.map((item) => (
                <div key={item.id} className="space-y-6 md:space-y-8">
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] text-brand-stone/40">{item.label}</p>
                  <div className="space-y-4 ml-3 md:ml-4">
                    {item.children ? item.children.map(child => (
                      <Link 
                        key={child.id} 
                        to={child.path} 
                        className="block serif text-3xl md:text-4xl font-black italic tracking-tighter hover:text-brand-accent transition-colors"
                      >
                        {child.label}.
                      </Link>
                    )) : (
                      <Link to={item.path} className="block serif text-3xl md:text-4xl font-black italic tracking-tighter hover:text-brand-accent transition-colors">
                        {item.label}.
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-10 md:pt-12 border-t border-brand-stone/10 space-y-6">
               <Link to="/login" className="block w-full py-5 md:py-6 bg-brand-stone text-brand-primary text-center rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em]">Portal Node Access</Link>
               <p className="text-[8px] md:text-[9px] text-center text-brand-stone/40 font-black uppercase tracking-[0.5em]">Sovereign Link Active</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
