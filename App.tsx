
import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Menu, X, Lock, ArrowRight, Search, 
  MessageSquare, Sparkles, Send, Globe, Command,
  Calculator, ShieldAlert, Cpu, Landmark
} from 'lucide-react';
import { navConfig, NavItem } from './nav.config';
import { askConcierge } from './services/geminiService';

// --- Lazy Loading Pages for Performance ---
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Work = lazy(() => import('./pages/Work'));
const Services = lazy(() => import('./pages/Services'));
const Areas = lazy(() => import('./pages/Areas'));
const Funding = lazy(() => import('./pages/Funding'));
const Media = lazy(() => import('./pages/Media'));
const Contact = lazy(() => import('./pages/Contact'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Underwriting = lazy(() => import('./pages/Underwriting'));
const Valuation = lazy(() => import('./pages/Valuation'));
const KYC = lazy(() => import('./pages/KYC'));

// --- Global Branding Components ---

const Logo: React.FC<{ variant?: 'full' | 'compact' }> = ({ variant = 'full' }) => (
  <div className="flex items-center space-x-4 group cursor-pointer">
    <div className="relative w-11 h-11 flex-shrink-0">
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl group-hover:rotate-[360deg] transition-transform duration-[1.2s] ease-in-out">
        <rect width="100" height="100" rx="24" fill="#0f172a" />
        <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
        <circle cx="75" cy="25" r="7" fill="#10b981" className="animate-pulse" />
      </svg>
    </div>
    {variant === 'full' && (
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
          Federgreen
        </span>
        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.5em] mt-1.5 flex items-center">
          <Landmark size={8} className="mr-1.5" /> Consulting
        </span>
      </div>
    )}
  </div>
);

// --- Page Wrapper for Transitions ---
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// --- Sovereign Concierge AI Widget ---
const SovereignConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "How do I access BTC/USDT Lending?",
    "Underwrite a multi-family deal",
    "Compare Debt vs Equity funding",
    "KYC/AML procedure for family offices"
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const userMsg = textOverride || query;
    if (!userMsg.trim() || isLoading) return;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const response = await askConcierge(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Secure node timeout.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Institutional firewall active. Please retry submission.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] hidden md:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
            className="absolute bottom-24 right-0 w-[420px] h-[640px] bg-white rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(15,23,42,0.15)] border border-slate-100 flex flex-col overflow-hidden glass-premium"
          >
            <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest leading-none mb-1">Sovereign Concierge</h3>
                  <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Advisory Node Active</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X size={20} /></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar bg-slate-50/30">
              {messages.length === 0 && (
                <div className="py-12 text-center space-y-8">
                  <Globe size={48} className="mx-auto text-slate-100" />
                  <div className="space-y-3">
                    <p className="text-slate-900 font-bold text-sm px-6 leading-relaxed">Direct AI-access to our institutional capital advisory framework.</p>
                    <p className="text-slate-400 text-xs px-12">How can I assist with your global requirements today?</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 px-4">
                    {suggestedPrompts.map((p, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSend(p)}
                        className="px-4 py-3 bg-white border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all text-left flex items-center group shadow-sm"
                      >
                        <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] px-5 py-4 rounded-[2rem] text-[13px] leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white font-medium rounded-tr-sm' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest animate-pulse ml-2">Consulting sovereign nodes...</div>}
            </div>

            <div className="p-6 bg-white border-t border-slate-50">
              <div className="flex items-center space-x-3 bg-slate-50 rounded-2xl px-5 py-3 border border-slate-100 focus-within:bg-white focus-within:border-indigo-500 transition-all shadow-inner">
                <input 
                  value={query} 
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about tranches..." 
                  className="flex-1 bg-transparent outline-none text-sm font-medium py-1" 
                />
                <button onClick={() => handleSend()} className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-600/20">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(79,70,229,0.5)] hover:scale-110 active:scale-95 transition-all animate-subtle border-4 border-white overflow-hidden relative group ${
          isOpen ? 'bg-slate-900' : 'bg-indigo-600'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="text-white" size={32} /> : <MessageSquare className="text-white" size={32} />}
      </button>
    </div>
  );
};

// --- Enterprise Command Palette ---
const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const flattenedLinks = useCallback(() => {
    const links: { label: string; path: string; parent?: string; icon?: any }[] = [];
    const traverse = (items: NavItem[], parentLabel?: string) => {
      items.forEach(item => {
        if (item.path !== '#') links.push({ label: item.label, path: item.path, parent: parentLabel, icon: item.icon });
        if (item.children) traverse(item.children, item.label);
      });
    };
    traverse(navConfig);
    return links;
  }, []);

  const filteredLinks = flattenedLinks().filter(l => 
    l.label.toLowerCase().includes(search.toLowerCase()) || 
    l.parent?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-32 px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" />
          <motion.div 
            initial={{ scale: 0.98, y: -20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.98, y: -20, opacity: 0 }}
            className="w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_64px_128px_-24px_rgba(0,0,0,0.3)] overflow-hidden relative z-10 border border-slate-100"
          >
            <div className="p-8 flex items-center space-x-6 border-b border-slate-50">
              <Search className="text-indigo-600" size={28} />
              <input 
                autoFocus 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                placeholder="Search global tranches (e.g. 'BTC Trade', 'Underwriting')..." 
                className="flex-1 bg-transparent outline-none text-xl font-medium text-slate-800 placeholder-slate-300" 
              />
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black text-slate-300 border border-slate-100 px-3 py-1.5 rounded-lg bg-slate-50 uppercase tracking-widest">ESC</span>
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto p-4 space-y-2 hide-scrollbar">
              {filteredLinks.length > 0 ? filteredLinks.map((link, i) => (
                <div 
                  key={i} 
                  onClick={() => { navigate(link.path); setIsOpen(false); }}
                  className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 rounded-[2rem] cursor-pointer transition-all group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                      {link.icon ? <link.icon size={20} /> : <Globe size={20} />}
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-slate-800">{link.label}</p>
                      {link.parent && <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">{link.parent}</p>}
                    </div>
                  </div>
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mr-3">Access Node</span>
                    <ArrowRight size={16} className="text-indigo-600" />
                  </div>
                </div>
              )) : (
                <div className="p-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                    <Search size={32} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">No institutional data matches your query.</p>
                </div>
              )}
            </div>
            <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-8">
              <span>Sovereign Search v4.2</span>
              <span className="flex items-center"><Command size={10} className="mr-1" /> K to search anytime</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Sidebar Item ---
const SidebarNavItem: React.FC<{ 
  item: NavItem; 
  depth?: number; 
  onNavigate: () => void;
  expandedIds: string[];
  toggleId: (id: string) => void;
}> = ({ item, depth = 0, onNavigate, expandedIds, toggleId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedIds.includes(item.id);
  
  const isActive = location.pathname === item.path.split('#')[0] && 
                   (!item.path.includes('#') || location.hash === `#${item.path.split('#')[1]}`);
  
  const checkAnyChildActive = (node: NavItem): boolean => {
    if (location.pathname === node.path.split('#')[0]) return true;
    if (node.children) return node.children.some(checkAnyChildActive);
    return false;
  };
  const isParentGroupActive = hasChildren && checkAnyChildActive(item);

  const handleLabelClick = (e: React.MouseEvent) => {
    if (item.path === '#' || (hasChildren && !item.path)) {
      e.preventDefault();
      toggleId(item.id);
    } else {
      onNavigate();
      if (item.path.includes('#')) {
        const [path, hash] = item.path.split('#');
        navigate(path);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        navigate(item.path);
      }
      if (hasChildren && !isExpanded) toggleId(item.id);
    }
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleId(item.id);
  };

  return (
    <div className="mb-1" role="none">
      <div 
        onClick={handleLabelClick}
        role="menuitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        className={`
          group flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer transition-all duration-500
          ${depth === 0 ? 'text-[12px] font-black uppercase tracking-widest' : 'text-xs font-semibold'}
          ${isActive 
            ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 active-nav-glow' 
            : isParentGroupActive 
              ? 'text-slate-900 bg-indigo-50/50 border-indigo-100' 
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}
        `}
        style={{ marginLeft: depth > 0 ? `${depth * 12}px` : '0' }}
      >
        <div className="flex items-center space-x-4 overflow-hidden">
          {item.icon && depth === 0 && (
            <item.icon size={18} className={`${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-indigo-600'} transition-colors duration-500`} />
          )}
          {depth > 0 && (
             <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? 'bg-emerald-500 scale-150' : 'bg-slate-200 group-hover:bg-indigo-400'}`} />
          )}
          <span className="truncate">{item.label}</span>
        </div>
        
        {hasChildren && (
          <button 
            onClick={handleChevronClick}
            className={`p-1 rounded-lg hover:bg-black/5 transition-colors ${isActive ? 'text-white/60' : 'text-slate-300'}`}
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <ChevronDown size={14} />
            </motion.div>
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden relative"
          >
            <div className="absolute left-[32px] top-0 bottom-4 w-[1px] bg-slate-100" />
            <div className="py-2">
              {item.children?.map(child => (
                <SidebarNavItem 
                  key={child.id} 
                  item={child} 
                  depth={depth + 1} 
                  onNavigate={onNavigate}
                  expandedIds={expandedIds}
                  toggleId={toggleId}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App Component ---
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const location = useLocation();

  const toggleId = (id: string) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  useEffect(() => {
    const idsToExpand: string[] = [];
    const findActivePath = (items: NavItem[]): boolean => {
      for (const item of items) {
        if (location.pathname === item.path.split('#')[0]) return true;
        if (item.children && findActivePath(item.children)) {
          idsToExpand.push(item.id);
          return true;
        }
      }
      return false;
    };
    if (findActivePath(navConfig)) {
      setExpandedIds(prev => Array.from(new Set([...prev, ...idsToExpand])));
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-[#fafaf9]">
      <CommandPalette />
      <SovereignConcierge />
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[320px] h-screen fixed top-0 left-0 bg-white border-r border-slate-100 z-50 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.02)] glass-premium">
        <div className="p-10 pb-12">
          <Link to="/" className="outline-none">
            <Logo />
          </Link>
          <div className="mt-10">
             <button 
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:border-indigo-200 transition-all group shadow-inner"
             >
               <div className="flex items-center space-x-3">
                 <Search size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                 <span className="text-[11px] font-bold uppercase tracking-widest">Sovereign Search</span>
               </div>
               <span className="text-[10px] font-black border border-slate-200 px-2 py-1 rounded-lg uppercase bg-white">⌘K</span>
             </button>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar">
          {navConfig.map(item => (
            <SidebarNavItem 
              key={item.id} 
              item={item} 
              onNavigate={() => {}} 
              expandedIds={expandedIds}
              toggleId={toggleId}
            />
          ))}
        </nav>
        
        <div className="p-8 border-t border-slate-50 bg-slate-50/50">
          <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4 group cursor-pointer hover:border-emerald-200 transition-all duration-500">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 shadow-inner">
              <Lock size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Compliance Node</p>
              <p className="text-[10px] text-slate-400 truncate tracking-tight uppercase font-medium mt-0.5">Verified Institutional</p>
            </div>
            <ArrowRight size={14} className="text-slate-200 group-hover:text-emerald-700 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-2xl border-b border-slate-100 z-[60] flex items-center justify-between px-8 shadow-sm">
        <Link to="/"><Logo variant="compact" /></Link>
        <div className="flex items-center space-x-6">
          <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-slate-50 text-slate-900 rounded-2xl active:scale-90 transition-all shadow-inner">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Content Injection Node */}
      <main className="flex-1 lg:ml-[320px] flex flex-col min-h-screen">
        <div className="flex-grow pt-20 lg:pt-0">
          <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center bg-white">
              <div className="flex flex-col items-center space-y-6">
                 <div className="w-16 h-16 border-[5px] border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">Initializing Sovereign Node</p>
              </div>
            </div>
          }>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
                <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                <Route path="/areas" element={<PageTransition><Areas /></PageTransition>} />
                <Route path="/funding" element={<PageTransition><Funding /></PageTransition>} />
                <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
                <Route path="/underwriting" element={<PageTransition><Underwriting /></PageTransition>} />
                <Route path="/valuation" element={<PageTransition><Valuation /></PageTransition>} />
                <Route path="/kyc" element={<PageTransition><KYC /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </div>
        
        <footer className="bg-white border-t border-slate-50 py-24 px-10 lg:px-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
            <div className="space-y-10">
              <Logo />
              <p className="text-slate-500 text-lg max-w-md leading-relaxed">
                Architecting institutional tranches and global capital nodes for family offices, sovereign funds, and elite growth enterprises.
              </p>
              <div className="flex space-x-12 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms of Use</Link>
                <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy Node</Link>
                <span className="text-emerald-600">Sovereign Protocol v4.0</span>
              </div>
            </div>
            <div className="flex flex-col lg:items-end justify-center space-y-4">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em]">© 2024 FEDERGREEN CONSULTING GROUP. GLOBAL ARCHITECTURE FC-9921.</p>
              <p className="text-[9px] text-slate-200 font-mono tracking-widest uppercase">Encryption Mode: AES-256 Enabled</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
             <Landmark size={400} />
          </div>
        </footer>
      </main>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[70] lg:hidden" />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-[90%] bg-white z-[80] lg:hidden p-10 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="mb-12 flex justify-between items-center">
                <Logo />
                <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-50 rounded-2xl"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto hide-scrollbar">
                {navConfig.map(item => (
                  <SidebarNavItem key={item.id} item={item} onNavigate={() => setIsOpen(false)} expandedIds={expandedIds} toggleId={toggleId} />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppLayout>
        {/* Router content is injected via Suspense in AppLayout */}
        <div className="hidden" /> 
      </AppLayout>
    </HashRouter>
  );
};

export default App;
