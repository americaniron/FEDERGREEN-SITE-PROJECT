
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

// --- Reusable Brand Components ---
const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#0a0f1a" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="24" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const Logo: React.FC<{ variant?: 'full' | 'compact' }> = ({ variant = 'full' }) => (
  <div className="flex items-center space-x-3 sm:space-x-5 group cursor-pointer">
    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
      <LogoMark className="w-full h-full drop-shadow-2xl group-hover:rotate-[360deg] transition-transform duration-[1.2s] ease-in-out" />
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
    </div>
    {variant === 'full' && (
      <div className="flex flex-col leading-none">
        <span className="text-lg sm:text-2xl font-black tracking-tighter text-[#0a0f1a] uppercase">
          Federgreen
        </span>
        <span className="text-[9px] sm:text-[11px] font-black text-emerald-800 uppercase tracking-[0.4em] mt-1 sm:mt-1.5 flex items-center">
          <Landmark size={10} className="mr-1 sm:mr-2" /> Consulting
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
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// --- Audio Utilities for TTS ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


const SovereignConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Welcome to Federgreen Command. How may I assist with your institutional capital requirements today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // TTS State
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  let nextStartTime = 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const playAudio = async (base64Audio: string) => {
    if (isMuted || !base64Audio) return;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    
    nextStartTime = Math.max(nextStartTime, ctx.currentTime);
    const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
    
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    
    source.start(nextStartTime);
    nextStartTime += audioBuffer.duration;
    
    audioQueueRef.current.push(source);
    source.onended = () => {
      audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
    };
  };

  const stopAudio = () => {
    audioQueueRef.current.forEach(source => source.stop());
    audioQueueRef.current = [];
    nextStartTime = 0;
  };

  const handleSend = async (textOverride?: string) => {
    const userMsg = textOverride || query;
    if (!userMsg.trim() || isLoading) return;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const responseText = await askConcierge(userMsg, messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })));
      setMessages(prev => [...prev, { role: 'model', text: responseText || 'Secure node timeout.' }]);
      if (responseText) {
        const audioData = await generateSpeech(responseText);
        if (audioData) playAudio(audioData);
      }
    } catch (e) {
      const errorMsg = 'Institutional firewall active. Please contact the senior desk directly.';
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
      const audioData = await generateSpeech(errorMsg);
      if (audioData) playAudio(audioData);
    } finally { 
      setIsLoading(false); 
    }
  };

  const suggestedPrompts = [
    "BTC Lending",
    "Risk Mitigation",
    "Meeting"
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-10 sm:right-10 z-[150]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="absolute bottom-20 right-0 sm:bottom-28 sm:right-0 w-[calc(100vw-32px)] sm:w-[440px] h-[70vh] sm:h-[720px] bg-white rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_64px_128px_-32px_rgba(10,15,26,0.15)] border border-slate-100 flex flex-col overflow-hidden glass-premium"
          >
            <div className="bg-[#0a0f1a] p-6 sm:p-10 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-5"><LogoMark className="w-24 h-24 sm:w-36 sm:h-36" color="white" /></div>
              <div className="flex items-center space-x-3 sm:space-x-5 relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
                  <LogoMark className="w-5 h-5 sm:w-6 sm:h-6" color="white" />
                </div>
                <div>
                  <h3 className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">Sovereign Concierge</h3>
                  <p className="text-[8px] sm:text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] mt-0.5 sm:mt-1 flex items-center">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full mr-1.5 sm:mr-2 animate-pulse" />
                    Insight Active
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                <button onClick={() => { setIsMuted(!isMuted); stopAudio(); }} className="p-2 sm:p-3 hover:bg-white/10 rounded-2xl transition-colors">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 sm:p-3 hover:bg-white/10 rounded-2xl transition-colors"><X size={18} /></button>
              </div>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 sm:space-y-8 bg-[#fdfdfc]/50 hide-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] sm:max-w-[88%] px-5 py-4 sm:px-6 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] text-[13px] sm:text-[14px] leading-[1.5] sm:leading-[1.6] ${
                    m.role === 'user' 
                      ? 'bg-[#0a0f1a] text-white shadow-2xl rounded-tr-none' 
                      : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none font-medium italic'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-4 sm:px-6 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm border border-slate-100 rounded-tl-none flex space-x-1.5">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 }} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 bg-white border-t border-slate-50">
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {suggestedPrompts.map(p => (
                  <button 
                    key={p} 
                    onClick={() => handleSend(p)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#fdfdfc] border border-slate-100 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-[#0a0f1a] transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <input 
                  value={query} 
                  onChange={e => setQuery(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleSend()} 
                  placeholder="Ask advisor..." 
                  className="flex-1 bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-sm outline-none font-medium text-slate-900 border border-transparent focus:border-emerald-200 transition-all shadow-inner" 
                />
                <button 
                  onClick={() => handleSend()} 
                  disabled={!query.trim() || isLoading}
                  className="p-4 sm:p-5 bg-[#0a0f1a] text-white rounded-xl sm:rounded-2xl hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-20 flex-shrink-0"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)} 
        className="w-16 h-16 sm:w-24 h-24 bg-[#0a0f1a] text-white rounded-full flex items-center justify-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] transition-all border-[4px] sm:border-[6px] border-white active-nav-glow relative z-10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="logo" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <LogoMark className="w-7 h-7 sm:w-10 sm:h-10" color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

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
  const isActive = location.pathname === item.path;

  const handleLabelClick = (e: React.MouseEvent) => {
    if (hasChildren && item.path === '#') {
      e.preventDefault();
      toggleId(item.id);
    } else {
      onNavigate();
      navigate(item.path);
      if (hasChildren && !isExpanded) toggleId(item.id);
    }
  };

  return (
    <div className="mb-1">
      <button 
        onClick={handleLabelClick}
        aria-expanded={hasChildren ? isExpanded : undefined}
        className={`w-full flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 rounded-[1.2rem] sm:rounded-[1.5rem] cursor-pointer transition-all duration-500 group focus:outline-none
          ${depth === 0 ? 'text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em]' : 'text-[12px] sm:text-[13px] font-semibold tracking-tight'}
          ${isActive 
            ? 'bg-[#0a0f1a] text-white shadow-xl scale-[1.01]' 
            : 'text-slate-400 hover:bg-slate-50/80 hover:text-[#0a0f1a] hover:translate-x-1'}
        `}
        style={{ marginLeft: `${depth * 12}px`, width: `calc(100% - ${depth * 12}px)` }}
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          {item.icon && depth === 0 && <item.icon size={18} className={`${isActive ? 'text-emerald-400' : 'text-slate-300 group-hover:text-[#0a0f1a] transition-colors'}`} />}
          <span>{item.label}</span>
        </div>
        {hasChildren && <ChevronDown size={12} className={`transition-transform duration-700 ${isExpanded ? 'rotate-180' : ''} ${isActive ? 'text-white' : 'text-slate-300'}`} />}
      </button>
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-l border-slate-100 ml-8 sm:ml-10 my-1 space-y-1"
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
    try {
      const item = window.localStorage.getItem('federgreen-nav-expanded');
      return item ? JSON.parse(item) : ['home'];
    } catch (error) {
      return ['home'];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('federgreen-nav-expanded', JSON.stringify(expandedIds));
    } catch (error) {
      console.error("Error saving expanded state to localStorage", error);
    }
  }, [expandedIds]);

  const toggleId = (id: string) => setExpandedIds(prev => 
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const expandPath = (items: NavItem[]): boolean => {
      for (const item of items) {
        if (location.pathname === item.path) return true;
        if (item.children && expandPath(item.children)) {
          setExpandedIds(prev => Array.from(new Set([...prev, item.id])));
          return true;
        }
      }
      return false;
    };
    expandPath(navConfig);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fdfdfc]">
      <SovereignConcierge />
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[360px] h-screen fixed top-0 left-0 bg-white border-r border-slate-100 z-50 glass-premium">
        <div className="p-10 border-b border-slate-50/50">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="px-8 py-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-[#0a0f1a] transition-all text-[11px] font-black uppercase tracking-widest group"
          >
            <Search size={14} className="text-slate-300" />
            <span>Search Command</span>
            <span className="ml-auto text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md">⌘K</span>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-2 hide-scrollbar">
          {navConfig.map(item => (
            <SidebarNavItem 
              key={item.id} 
              item={item} 
              onNavigate={() => setIsMobileMenuOpen(false)} 
              expandedIds={expandedIds} 
              toggleId={toggleId} 
            />
          ))}
        </nav>
        <div className="p-8 border-t border-slate-50">
           <Link to="/contact" className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] group hover:bg-[#0a0f1a] transition-all duration-500">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white">Secure Access</span>
              <Lock size={14} className="text-slate-300 group-hover:text-emerald-400" />
           </Link>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <nav className="lg:hidden fixed top-0 left-0 w-full h-20 sm:h-24 bg-white border-b border-slate-100 z-[60] flex items-center justify-between px-6 sm:px-10 glass-premium">
        <Link to="/"><Logo variant="compact" /></Link>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button onClick={() => setIsSearchOpen(true)} className="p-3 sm:p-4 bg-slate-50 rounded-2xl text-[#0a0f1a]"><Search size={20} /></button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 sm:p-4 bg-[#0a0f1a] rounded-2xl text-white shadow-lg"><Menu size={20} /></button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-white lg:hidden overflow-y-auto p-8 flex flex-col pt-24"
          >
            <div className="flex justify-between items-center mb-12">
               <Logo />
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-slate-50 rounded-2xl"><X size={24} /></button>
            </div>
            <nav className="space-y-2 mb-12">
              {navConfig.map(item => (
                <SidebarNavItem 
                  key={item.id} 
                  item={item} 
                  onNavigate={() => setIsMobileMenuOpen(false)} 
                  expandedIds={expandedIds} 
                  toggleId={toggleId} 
                />
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-slate-100">
               <Link 
                 to="/login" 
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="flex items-center justify-center p-6 bg-[#0a0f1a] text-white rounded-3xl font-black uppercase text-[12px] tracking-[0.3em] shadow-xl"
               >
                 <Lock size={16} className="mr-4" /> Authenticate Portal
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-[360px] pt-20 sm:pt-24 lg:pt-0 overflow-x-hidden">
        {children}
        <footer className="bg-white border-t border-slate-50 py-16 sm:py-32 px-6 sm:px-10 lg:px-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 sm:p-32 opacity-[0.02] pointer-events-none"><Landmark size={300} sm:size={600} /></div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 sm:gap-20">
            <div className="max-w-md">
              <Logo />
              <p className="mt-6 sm:mt-10 text-slate-400 text-base sm:text-lg leading-[1.6] sm:leading-[1.8] font-medium italic">
                Architecting high-stakes capital structures globally since 2004.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-6 sm:gap-10 w-full md:w-auto">
              <div className="flex flex-wrap md:justify-end gap-x-8 sm:gap-x-12 gap-y-4">
                <Link to="/privacy" className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#0a0f1a] transition-colors">Privacy</Link>
                <Link to="/terms" className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#0a0f1a] transition-colors">Terms</Link>
                <Link to="/contact" className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#0a0f1a] transition-colors">Compliance</Link>
              </div>
              <div className="md:text-right border-t border-slate-50 pt-6 md:border-none md:pt-0 w-full">
                <span className="text-[9px] sm:text-[11px] font-black text-slate-300 uppercase tracking-widest block mb-1">
                  © 2024 FEDERGREEN CONSULTING GROUP.
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-200 uppercase tracking-[0.4em] sm:tracking-[0.6em]">
                  SOVEREIGN CAPITAL ARCHITECTURE.
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};


const AppRoutes: React.FC = () => {
    const location = useLocation();
    
    return (
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center bg-[#fdfdfc]">
            <div className="space-y-6 sm:space-y-10 flex flex-col items-center p-8 text-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <div className="absolute inset-0 border-[4px] sm:border-[6px] border-slate-100 rounded-full" />
                <div className="absolute inset-0 border-[4px] sm:border-[6px] border-[#0a0f1a] border-t-emerald-400 rounded-full animate-spin" />
              </div>
              <p className="text-[10px] sm:text-[11px] font-black text-[#0a0f1a] uppercase tracking-[0.4em] sm:tracking-[0.6em] animate-pulse">Syncing Institutional Node...</p>
            </div>
          </div>
        }>
            <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                
                {/* Protected Routes */}
                 <Route path="/client-portal" element={<ProtectedRoute role="client"><ClientPortal /></ProtectedRoute>} />
                 <Route path="/investor-portal" element={<ProtectedRoute role="investor"><InvestorPortal /></ProtectedRoute>} />

                {/* Public Layout Routes */}
                <Route path="/*" element={
                    <PublicLayout>
                        <Routes>
                            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                            <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
                            <Route path="/workshop" element={<PageTransition><Workshop /></PageTransition>} />
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
                            <Route path="/kyc-node" element={<PageTransition><KYC /></PageTransition>} />
                            <Route path="*" element={<PageTransition><FrameworkPage /></PageTransition>} />
                        </Routes>
                    </PublicLayout>
                } />
            </Routes>
        </Suspense>
    );
}

const App: React.FC = () => (
  <HashRouter>
    <AppRoutes />
  </HashRouter>
);

export default App;
