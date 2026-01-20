
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, FileText, ChevronRight, List, Cpu, Send, Loader2, BarChart3, Presentation } from 'lucide-react';
import { frameworkContent, PageContent } from '../services/content.config';
import { generateBusinessNarrative, simulateInvestorQA, optimizeCapitalStructure } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="24" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const FrameworkPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const content: PageContent | undefined = frameworkContent[path];
  const [activeSection, setActiveSection] = useState('overview');
  
  // FEDERGREEN Tool State
  const [federgreenLoading, setFedergreenLoading] = useState(false);
  const [federgreenResult, setFedergreenResult] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState({ v1: '', v2: '', v3: '' });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'deliverables', 'methodology', 'segments', 'case-study', 'faq', 'federgreen-node'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 md:p-20 text-center bg-brand-stone">
        <h1 className="serif text-4xl md:text-5xl font-black mb-6 text-brand-primary">Node Not Found.</h1>
        <p className="text-slate-500 mb-10 max-w-md font-medium">This institutional node is either restricted or does not exist in the current capital architecture.</p>
        <Link to="/" className="px-10 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Return to Command</Link>
      </div>
    );
  }

  const handleToolExecute = async () => {
    setFedergreenLoading(true);
    setFedergreenResult(null);
    try {
      if (path === '/business-plans') {
        const res = await generateBusinessNarrative(toolInput.v1, toolInput.v2);
        setFedergreenResult(res);
      } else if (path === '/investor-decks') {
        const res = await simulateInvestorQA(toolInput.v1);
        setFedergreenResult(res);
      } else if (path === '/financials') {
        const res = await optimizeCapitalStructure(Number(toolInput.v1), Number(toolInput.v2), toolInput.v3);
        setFedergreenResult(res);
      }
    } catch (e) {
      setFedergreenResult("Node execution failed. Institutional firewall active.");
    } finally {
      setFedergreenLoading(false);
    }
  };

  const renderContextualTool = () => {
    if (path === '/business-plans') {
      return (
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <input value={toolInput.v1} onChange={e => setToolInput({...toolInput, v1: e.target.value})} placeholder="Venture Concept" className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-emerald-400 transition-all text-white placeholder:text-white/30" />
             <input value={toolInput.v2} onChange={e => setToolInput({...toolInput, v2: e.target.value})} placeholder="Industry Node" className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-emerald-400 transition-all text-white placeholder:text-white/30" />
          </div>
          <button onClick={handleToolExecute} disabled={federgreenLoading} className="w-full py-4 bg-emerald-600 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center">
            {federgreenLoading ? <Loader2 className="animate-spin mr-2" size={14} /> : <FileText className="mr-2" size={14} />}
            Generate Strategic Narrative
          </button>
        </div>
      );
    }
    if (path === '/investor-decks') {
      return (
        <div className="space-y-4 md:space-y-6">
          <input value={toolInput.v1} onChange={e => setToolInput({...toolInput, v1: e.target.value})} placeholder="Primary Pitch Thesis" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-indigo-400 transition-all text-white placeholder:text-white/30" />
          <button onClick={handleToolExecute} disabled={federgreenLoading} className="w-full py-4 bg-indigo-600 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center">
            {federgreenLoading ? <Loader2 className="animate-spin mr-2" size={14} /> : <Presentation className="mr-2" size={14} />}
            Execute Q&A Simulation
          </button>
        </div>
      );
    }
    if (path === '/financials') {
      return (
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <input type="number" value={toolInput.v1} onChange={e => setToolInput({...toolInput, v1: e.target.value})} placeholder="EBITDA ($M)" className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-emerald-400 transition-all text-white placeholder:text-white/30" />
             <input type="number" value={toolInput.v2} onChange={e => setToolInput({...toolInput, v2: e.target.value})} placeholder="Asset Value ($M)" className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-emerald-400 transition-all text-white placeholder:text-white/30" />
          </div>
          <input value={toolInput.v3} onChange={e => setToolInput({...toolInput, v3: e.target.value})} placeholder="Primary Capital Goal" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-emerald-400 transition-all text-white placeholder:text-white/30" />
          <button onClick={handleToolExecute} disabled={federgreenLoading} className="w-full py-4 bg-emerald-700 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center">
            {federgreenLoading ? <Loader2 className="animate-spin mr-2" size={14} /> : <BarChart3 className="mr-2" size={14} />}
            Optimize Capital Stack
          </button>
        </div>
      );
    }
    return null;
  };

  const isWorkSubPage = ['/business-plans', '/investor-decks', '/financials'].includes(path);

  const tocItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'deliverables', label: 'Deliverables' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'segments', label: 'Target Segments' },
    ...(isWorkSubPage ? [{ id: 'federgreen-node', label: 'FEDERGREEN Node' }] : []),
    { id: 'case-study', label: 'Case Analysis' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="bg-brand-stone min-h-screen relative overflow-x-hidden">
      {/* TOC Sidebar */}
      <div className="hidden xl:block fixed left-[10%] 2xl:left-[15%] top-48 w-48 z-40">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-slate-300 mb-8">
            <List size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Navigation</span>
          </div>
          {tocItems.map(item => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`block text-[10px] font-black uppercase tracking-widest transition-all text-left ${
                activeSection === item.id ? 'text-brand-accent translate-x-2' : 'text-slate-400 hover:text-brand-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="xl:pl-[300px] 2xl:pl-[400px]">
        {/* Breadcrumbs */}
        <nav className="px-6 md:px-12 lg:px-24 pt-12 pb-4 flex items-center space-x-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-brand-primary truncate max-w-[150px] md:max-w-none">{content.title}</span>
        </nav>

        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 border-b border-slate-100 bg-white">
          <div className="max-w-5xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-[2px] bg-brand-primary" />
                <span className="text-brand-primary text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] md:tracking-[0.6em]">Sovereign Node Protocol</span>
              </div>
              <h1 className="serif text-brand-primary font-black leading-[0.95] tracking-tighter mb-10 italic">
                {content.title}.
              </h1>
              <p className="text-brand-slate text-lg md:text-2xl max-w-3xl leading-relaxed font-medium mb-12 italic">
                {content.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Link to="/schedule-meeting" className="px-8 md:px-12 py-5 md:py-6 bg-brand-primary text-white rounded-3xl md:rounded-[2rem] font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] flex items-center justify-center group shadow-2xl">
                  Schedule Meeting <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={18} />
                </Link>
                <Link to="/contact" className="px-8 md:px-12 py-5 md:py-6 border border-slate-200 text-brand-primary rounded-3xl md:rounded-[2rem] font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] flex items-center justify-center hover:bg-slate-50 transition-all">
                  Contact Advisory
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEDERGREEN Integration Section */}
        {isWorkSubPage && (
          <section id="federgreen-node" className="px-6 md:px-12 lg:px-24 py-20 md:py-32 bg-brand-primary text-white border-y border-white/5 scroll-mt-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none rotate-12 hidden lg:block">
              <LogoMark className="w-96 h-96" color="white" />
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 relative z-10">
              <div className="lg:col-span-5">
                <div className="flex items-center space-x-3 mb-6">
                  <LogoMark className="w-5 h-5" color="white" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Contextual Node Analysis</span>
                </div>
                <h2 className="serif text-4xl md:text-5xl font-bold mb-6 italic tracking-tight text-white">FEDERGREEN Financial Tool.</h2>
                <p className="text-indigo-100/60 text-base md:text-lg mb-10 italic leading-relaxed">
                  Executing strategic reasoning tranches using the Gemini Pro architecture. Map your specific node against global institutional data.
                </p>
                {renderContextualTool()}
              </div>

              <div className="lg:col-span-7">
                <div className="h-full min-h-[350px] md:min-h-[400px] bg-white/5 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 p-8 md:p-12 flex flex-col relative group">
                  <AnimatePresence mode="wait">
                    {federgreenLoading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center space-y-6">
                        <Loader2 size={40} className="animate-spin text-brand-accent" />
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300 animate-pulse text-center">Syncing with Sovereign Intelligence Node...</p>
                      </motion.div>
                    ) : federgreenResult ? (
                      <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6">
                          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-accent">Analysis Artifact</p>
                          <button onClick={() => setFedergreenResult(null)} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white">Clear Node</button>
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-[400px] md:max-h-[500px] pr-4 hide-scrollbar">
                           <p className="text-indigo-50 text-base md:text-lg font-medium leading-relaxed italic whitespace-pre-wrap">
                             {federgreenResult}
                           </p>
                        </div>
                        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-widest flex justify-between">
                          <span>Model: Gemini-3-Pro-Strategic</span>
                          <span className="hidden sm:inline">Verified Engagement Artifact</span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                        <Cpu size={48} md:size={64} className="text-white" />
                        <div>
                          <h4 className="serif text-xl md:text-2xl font-bold mb-2 text-white">Node Idle</h4>
                          <p className="text-xs md:text-sm font-medium italic text-white/70">Input tranches to begin heuristic generation.</p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Executive Overview */}
        <section id="overview" className="px-6 md:px-12 lg:px-24 py-20 md:py-24 max-w-5xl scroll-mt-32">
          <h2 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 mb-8 md:mb-12">Executive Overview</h2>
          <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-slate-600 leading-relaxed font-medium italic">
            {content.overview.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        {/* Deliverables & Methodology */}
        <section id="deliverables" className="px-6 md:px-12 lg:px-24 py-20 md:py-24 bg-white border-y border-slate-100 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 mb-8 md:mb-12">Institutional Deliverables</h3>
              <div className="space-y-4 md:space-y-6">
                {content.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start p-5 md:p-6 bg-brand-stone/30 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm">
                    <CheckCircle2 className="text-brand-accent-deep mr-4 md:mr-6 flex-shrink-0" size={20} md:size={24} />
                    <p className="text-brand-primary font-bold text-base md:text-lg leading-tight tracking-tight">{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id="methodology" className="scroll-mt-32">
              <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 mb-8 md:mb-12">Advisory Methodology</h3>
              <div className="space-y-6 md:space-y-8">
                {content.methodology.map((m, i) => (
                  <div key={i} className="flex items-start relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary text-white rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xs md:text-sm flex-shrink-0 mr-6 md:mr-8 shadow-xl">
                      0{i + 1}
                    </div>
                    <div>
                      <p className="text-brand-primary font-black text-base md:text-lg mb-1 md:mb-2 tracking-tight">{m.split(':')[0]}</p>
                      <p className="text-brand-slate text-xs md:text-sm font-medium italic opacity-70">{m.split(':')[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Segments & Outcomes */}
        <section id="segments" className="px-6 md:px-12 lg:px-24 py-20 md:py-24 scroll-mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            <div className="bg-brand-primary p-10 md:p-16 rounded-[2.5rem] md:rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 md:p-10 opacity-10 pointer-events-none hidden sm:block">
                <LogoMark className="w-24 h-24 md:w-32 md:h-32" color="white" />
              </div>
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-10 text-brand-accent">Target Capital Segments</h3>
              <ul className="space-y-4 md:space-y-6">
                {content.whoItsFor.map((s, i) => <li key={i} className="text-lg md:text-xl font-black italic tracking-tight">{s}</li>)}
              </ul>
            </div>
            <div className="bg-brand-stone p-10 md:p-16 border border-brand-primary/10 rounded-[2.5rem] md:rounded-[3rem] text-brand-primary shadow-2xl relative overflow-hidden">
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-10 text-brand-accent-deep">Anticipated Yield Nodes</h3>
              <ul className="space-y-4 md:space-y-6">
                {content.outcomes.map((o, i) => <li key={i} className="text-lg md:text-xl font-black italic tracking-tight">{o}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Case Study Example */}
        <section id="case-study" className="mx-6 md:mx-12 lg:mx-24 mb-24 relative overflow-hidden scroll-mt-32">
          <div className="bg-brand-primary text-white p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 max-w-4xl">
              <div className="flex items-center space-x-4 mb-8">
                <FileText className="text-brand-accent" size={24} />
                <span className="text-brand-accent text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">Node Engagement Artifact</span>
              </div>
              <h2 className="serif text-4xl md:text-5xl font-black mb-6 md:mb-8 italic tracking-tighter text-white">Case File: {content.caseStudy.title}</h2>
              <p className="text-lg md:text-xl text-indigo-100/70 leading-relaxed font-light italic">{content.caseStudy.description}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-6 md:px-12 lg:px-24 py-20 md:py-32 bg-white border-t border-slate-100 scroll-mt-32">
          <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 mb-12 md:mb-20 text-center">Institutional FAQ</h3>
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
            {content.faq.map((f, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-lg md:text-xl font-black text-brand-primary tracking-tight italic flex items-start">
                  <AlertCircle className="mr-4 text-brand-accent flex-shrink-0" size={20} md:size={24} />
                  {f.q}
                </h4>
                <p className="text-brand-slate text-base md:text-lg font-medium leading-relaxed pl-10 md:pl-10 italic opacity-70">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BAND */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-brand-primary text-white text-center">
          <h2 className="serif text-4xl md:text-7xl font-black mb-10 md:mb-12 tracking-tighter italic text-white">Initiate node <br className="sm:hidden" /> engagement.</h2>
          <Link to="/schedule-meeting" className="inline-block px-10 md:px-16 py-6 md:py-8 bg-white text-brand-primary rounded-full md:rounded-[3rem] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] shadow-2xl hover:bg-brand-accent hover:text-white transition-all duration-700 text-[10px] md:text-[11px]">
            Request Institutional Slot
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FrameworkPage;
