
import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Menu, X, Lock, ArrowRight, Search, 
  Send, Globe, Command,
  Calculator, ShieldAlert, Cpu, Landmark, Volume2, VolumeX
} from 'lucide-react';
import { navConfig, NavItem } from './nav.config';
import { askConcierge, generateSpeech } from './services/geminiService';
import GlobalSearch from './components/GlobalSearch';
import AIConcierge from './components/AIConcierge';

// --- Reusable Brand Components ---
const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#0a0f1a" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="28" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const Logo: React.FC<{ variant?: 'full' | 'compact' }> = ({ variant = 'full' }) => (
  <div className="flex items-center space-x-5 group cursor-pointer">
    <div className="relative w-12 h-12 flex-shrink-0">
      <LogoMark className="w-full h-full drop-shadow-2xl group-hover:rotate-[360deg] transition-transform duration-[1.5s] ease-in-out" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
    </div>
    {variant === 'full' && (
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tighter text-[#0a0f1a] uppercase">
          Federgreen
        </span>
        <span className="text-[11px] font-black text-emerald-800 uppercase tracking-[0.5em] mt-1.5 flex items-center">
          <Landmark size={10} className="mr-2" /> Consulting
        </span>
      </div>
    )}
  </div>
);

// --- Lazy Loading Pages ---
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
const FrameworkPage = lazy(() => import('./components/FrameworkPage'));
const Workshop = lazy(() => import('./pages/GenerativeSuite'));
const Login = lazy(() => import('./pages/Login'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));
const InvestorPortal = lazy(() => import('./pages/InvestorPortal'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

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
  
  const isDeepActive = useCallback((node: NavItem): boolean => {
    if (location.pathname === node.path) return true;
    if (node.children) {
      return node.children.some(child => isDeepActive(child));
    }
    return false;
  }, [location.pathname]);

  const isActive = isDeepActive(item);

  const handleLabelClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      toggleId(item.id);
    } else {
      onNavigate();
      navigate(item.path);
    }
  };

  return (
    <div className="mb-1.5">
      <motion.button 
        whileTap={{ scale: 0.98 }}
        onClick={handleLabelClick}
        aria-expanded={hasChildren ? isExpanded : undefined}
        className={`w-full flex items-center justify-between px-6 py-4 rounded-[1.5rem] cursor-pointer transition-all duration-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50
          ${depth === 0 ? 'text-[12px] font-black uppercase tracking-[0.3em]' : 'text-[13px] font-semibold tracking-tight'}
          ${isActive 
            ? 'bg-[#0a0f1a] text-white shadow-xl active-nav-glow scale-[1.01]' 
            : 'text-slate-400 hover:bg-slate-50 hover:text-[#0a0f1a] hover:translate-x-1'}
        `}
        style={{ marginLeft: `${depth * 16}px`, width: `calc(100% - ${depth * 16}px)` }}
      >
        <div className="flex items-center space-x-4">
          {item.icon && depth === 0 && (
            <item.icon size={18} className={`${isActive ? 'text-emerald-400' : 'text-slate-300 group-hover:text-[#0a0f1a] transition-colors duration-300'}`} />
          )}
          <span>{item.label}</span>
        </div>
        {hasChildren && (
          <ChevronDown size={14} className={`transition-transform duration-500 ease-in-out ${isExpanded ? 'rotate-180' : ''} ${isActive ? 'text-white' : 'text-slate-200'}`} />
        )}
      </motion.button>
      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-l-2 border-slate-50 ml-10 my-2 space-y-1.5"
          >
            {item.children?.map(child => (
              <SidebarNavItem key={child.id} item={child} depth={depth + 1} onNavigate={onNavigate} expandedIds={expandedIds} toggleId={toggleId} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const [expandedIds, setExpandedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('sidebar_expanded_nodes');
    return saved ? JSON.parse(saved) : ['home'];
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar_expanded_nodes', JSON.stringify(expandedIds));
  }, [expandedIds]);

  // Auto-expand parents of active route
  useEffect(() => {
    const findParentIds = (items: NavItem[], targetPath: string, currentParents: string[] = []): string[] | null => {
      for (const item of items) {
        if (item.path === targetPath) return currentParents;
        if (item.children) {
          const result = findParentIds(item.children, targetPath, [...currentParents, item.id]);
          if (result) return result;
        }
      }
      return null;
    };

    const parents = findParentIds(navConfig, location.pathname);
    if (parents) {
      setExpandedIds(prev => {
        const newSet = new Set([...prev, ...parents]);
        return Array.from(newSet);
      });
    }
  }, [location.pathname]);

  const toggleId = (id: string) => setExpandedIds(prev => 
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fdfdfc]">
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <aside className="hidden lg:flex flex-col w-[380px] h-screen fixed top-0 left-0 bg-white border-r border-slate-100 z-50 glass-premium shadow-[32px_0_64px_-32px_rgba(0,0,0,0.03)]">
        <div className="p-12 border-b border-slate-50/50">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="px-10 py-8">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center space-x-4 px-5 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] text-slate-400 hover:text-[#0a0f1a] transition-all duration-700 text-[12px] font-black uppercase tracking-[0.2em] group shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30"
          >
            <Search size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
            <span>Search Command</span>
            <span className="ml-auto text-[10px] bg-white px-2 py-1 rounded-lg border border-slate-200">⌘K</span>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-8 py-4 hide-scrollbar">
          {navConfig.map(item => (
            <SidebarNavItem key={item.id} item={item} onNavigate={() => {}} expandedIds={expandedIds} toggleId={toggleId} />
          ))}
        </nav>
        <div className="p-10 border-t border-slate-50 flex items-center justify-between">
           <Link to="/contact" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#0a0f1a] transition-colors duration-500">Compliance Node</Link>
           <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200"><Lock size={16} /></div>
        </div>
      </aside>

      <nav className="lg:hidden fixed top-0 left-0 w-full h-24 bg-white border-b border-slate-100 z-[60] flex items-center justify-between px-8 glass-premium">
        <Link to="/"><Logo variant="compact" /></Link>
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(true)} className="p-4 bg-slate-50 rounded-2xl text-slate-400"><Search size={20} /></button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-4 bg-[#0a0f1a] rounded-2xl text-white shadow-2xl active-nav-glow"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-white lg:hidden overflow-y-auto p-10 flex flex-col pt-24"
          >
            <div className="flex justify-between items-center mb-16">
               <Logo />
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-5 bg-slate-50 rounded-[2rem] hover:rotate-90 transition-transform duration-700"><X size={28} /></button>
            </div>
            <nav className="space-y-3 mb-16">
              {navConfig.map(item => (
                <SidebarNavItem key={item.id} item={item} onNavigate={() => setIsMobileMenuOpen(false)} expandedIds={expandedIds} toggleId={toggleId} />
              ))}
            </nav>
            <div className="mt-auto pt-10 border-t border-slate-100 flex justify-center">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">© 2024 Federgreen Consulting</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-[380px] pt-24 lg:pt-0 overflow-x-hidden min-h-screen flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <AIConcierge />
        <footer className="bg-white border-t border-slate-50 py-24 px-10 lg:px-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 opacity-[0.02] pointer-events-none transform scale-150 rotate-12"><Landmark size={400} /></div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 sm:gap-20">
            <div className="max-w-md">
              <Logo />
              <p className="mt-8 text-slate-400 text-lg leading-relaxed font-medium italic opacity-80">
                Architecting institutional capital tranches with absolute structural integrity since 2004.
              </p>
            </div>
            <div className="flex flex-col items-end gap-10 w-full md:w-auto">
              <div className="flex space-x-12">
                <Link to="/privacy" className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-[#0a0f1a] transition-all">Privacy Policy</Link>
                <Link to="/terms" className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-[#0a0f1a] transition-all">Terms of Use</Link>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em] block mb-2">
                  SOVEREIGN CAPITAL ADVISORY GROUP.
                </span>
                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-[0.8em]">
                  ALL RIGHTS RESERVED • MMXXIV
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <Suspense fallback={
      <div className="h-screen flex flex-col items-center justify-center bg-[#fdfdfc] space-y-12">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-[6px] border-slate-100 rounded-full" />
          <div className="absolute inset-0 border-[6px] border-[#0a0f1a] border-t-emerald-400 rounded-full animate-spin shadow-2xl" />
        </div>
        <p className="text-[12px] font-black text-[#0a0f1a] uppercase tracking-[0.6em] animate-pulse">Syncing Institutional Node...</p>
      </div>
    }>
      <PublicLayout>
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/areas" element={<PageTransition><Areas /></PageTransition>} />
          <Route path="/funding" element={<PageTransition><Funding /></PageTransition>} />
          <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          
          <Route path="/underwriting" element={<PageTransition><Underwriting /></PageTransition>} />
          <Route path="/valuation" element={<PageTransition><Valuation /></PageTransition>} />
          <Route path="/kyc-node" element={<PageTransition><KYC /></PageTransition>} />
          
          <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
          
          <Route path="*" element={<PageTransition><FrameworkPage /></PageTransition>} />
        </Routes>
      </PublicLayout>
    </Suspense>
  </HashRouter>
);

export default App;
