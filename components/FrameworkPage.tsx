
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Added missing Landmark import
import { ArrowRight, CheckCircle2, AlertCircle, FileText, ChevronRight, List, Cpu, Send, Loader2, BarChart3, Presentation, Landmark } from 'lucide-react';
import { frameworkContent, PageContent } from '../services/content.config';
import { generateBusinessNarrative, simulateInvestorQA, optimizeCapitalStructure } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#1e3a5f" }) => (
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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState({ v1: '', v2: '', v3: '' });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'deliverables', 'methodology', 'segments', 'case-study', 'faq', 'ai-node'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-20 text-center bg-brand-stone">
        <h1 className="serif text-7xl font-black mb-10 text-brand-primary italic tracking-tighter">Node Not Found.</h1>
        <p className="text-slate-500 mb-16 max-w-md font-medium italic text-xl">This institutional node is either restricted or does not exist in the current capital architecture.</p>
        <Link to="/" className="px-16 py-8 bg-brand-primary text-white rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.6em] shadow-2xl hover:bg-brand-accent transition-all duration-700">Return to Command</Link>
      </div>
    );
  }

  const handleToolExecute = async () => {
    setAiLoading(true);
    setAiResult(null);
    try {
      if (path === '/business-plans') {
        const res = await generateBusinessNarrative(toolInput.v1, toolInput.v2);
        setAiResult(res);
      } else if (path === '/investor-decks') {
        const res = await simulateInvestorQA(toolInput.v1);
        setAiResult(res);
      } else if (path === '/financials') {
        const res = await optimizeCapitalStructure(Number(toolInput.v1), Number(toolInput.v2), toolInput.v3);
        setAiResult(res);
      }
    } catch (e) {
      setAiResult("Node execution failed. Institutional firewall active.");
    } finally {
      setAiLoading(false);
    }
  };

  const renderContextualTool = () => {
    if (path === '/business-plans') {
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <input value={toolInput.v1} onChange={e => setToolInput({...toolInput, v1: e.target.value})} placeholder="Venture Concept (e.g. Neo-Banking)" className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm outline-none focus:border-brand-accent transition-all shadow-inner" />
             <input value={toolInput.v2} onChange={e => setToolInput({...toolInput, v2: e.target.value})} placeholder="Industry Node (e.g. Fintech)" className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm outline-none focus:border-brand-accent transition-all shadow-inner" />
          </div>
          <button onClick={handleToolExecute} disabled={aiLoading || !toolInput.v1 || !toolInput.v2} className="w-full py-6 bg-brand-emerald rounded-[2rem] font-black uppercase text-[11px] tracking-[0.5em] hover:bg-emerald-500 transition-all flex items-center justify-center shadow-2xl disabled:opacity-30">
            {aiLoading ? <Loader2 className="animate-spin mr-3" size={18} /> : <FileText className="mr-3" size={18} />}
            Generate Strategic Narrative
          </button>
        </div>
      );
    }
    if (path === '/investor-decks') {
      return (
        <div className="space-y-8">
          <input value={toolInput.v1} onChange={e => setToolInput({...toolInput, v1: e.target.value})} placeholder="Primary Pitch Thesis (e.g. Market Dominance via Intelligence)" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm outline-none focus:border-indigo-400 transition-all shadow-inner" />
          <button onClick={handleToolExecute} disabled={aiLoading || !toolInput.v1} className="w-full py-6 bg-indigo-600 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.5em] hover:bg-indigo-500 transition-all flex items-center justify-center shadow-2xl disabled:opacity-30">
            {aiLoading ? <Loader2 className="animate-spin mr-3" size={18} /> : <Presentation className="mr-3" size={18} />}
            Execute Q&A Simulation
          </button>
        </div>
      );
    }
    if (path === '/financials') {
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <input type="number" value={toolInput.v1} onChange={e => setToolInput({...toolInput, v1: e.target.value})} placeholder="EBITDA ($M)" className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm outline-none focus:border-brand-accent transition-all shadow-inner" />
             <input type="number" value={toolInput.v2} onChange={e => setToolInput({...toolInput, v2: e.target.value})} placeholder="Total Asset Value ($M)" className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm outline-none focus:border-brand-accent transition-all shadow-inner" />
          </div>
          <input value={toolInput.v3} onChange={e => setToolInput({...toolInput, v3: e.target.value})} placeholder="Primary Capital Goal (e.g. Expansion Debt)" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm outline-none focus:border-brand-accent transition-all shadow-inner" />
          <button onClick={handleToolExecute} disabled={aiLoading || !toolInput.v1 || !toolInput.v2 || !toolInput.v3} className="w-full py-6 bg-brand-accent rounded-[2rem] font-black uppercase text-[11px] tracking-[0.5em] hover:bg-[#d4b06d] transition-all flex items-center justify-center shadow-2xl disabled:opacity-30">
            {aiLoading ? <Loader2 className="animate-spin mr-3" size={18} /> : <BarChart3 className="mr-3" size={18} />}
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
    ...(isWorkSubPage ? [{ id: 'ai-node', label: 'FEDERGREEN Node' }] : []),
    { id: 'case-study', label: 'Case Analysis' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="bg-brand-stone min-h-screen relative">
      {/* TOC Sidebar */}
      <div className="hidden 2xl:block fixed left-[380px] top-64 w-56 z-40">
        <div className="space-y-8">
          <div className="flex items-center space-x-4 text-slate-300 mb-10">
            <List size={20} />
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Artifact Index</span>
          </div>
          <div className="space-y-4">
            {tocItems.map(item => (
                <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`block text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-700 text-left border-l-2 pl-6 py-2 ${
                    activeSection === item.id ? 'text-brand-emerald border-brand-emerald bg-emerald-50/20 translate-x-2' : 'text-slate-400 border-transparent hover:text-brand-primary hover:translate-x-1'
                }`}
                >
                {item.label}
                </button>
            ))}
          </div>
        </div>
      </div>

      <div className="2xl:pl-[380px]">
        {/* Hero */}
        <section className="px-10 lg:px-32 py-16 lg:py-24 border-b border-slate-100 bg-[#fdfdfc] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-40 opacity-[0.02] pointer-events-none rotate-12 transform scale-150"><Landmark size={600} /></div>
          <div className="max-w-6xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center space-x-6 mb-12">
                <div className="w-16 h-[2px] bg-brand-emerald shadow-sm" />
                <span className="text-brand-emerald text-[12px] font-black uppercase tracking-[0.6em]">Sovereign Node Protocol</span>
              </div>
              <h1 className="serif text-8xl lg:text-[10rem] text-brand-primary font-black leading-[0.85] tracking-tighter mb-16 italic">
                {content.title}.
              </h1>
              <p className="text-slate-500 text-3xl max-w-4xl leading-relaxed font-medium mb-20 italic opacity-90">
                {content.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-10">
                <Link to="/schedule-meeting" className="px-16 py-8 bg-brand-primary text-white rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.6em] flex items-center justify-center group shadow-[0_32px_64px_-16px_rgba(30,58,95,0.3)]">
                  Schedule Meeting <ArrowRight className="ml-5 group-hover:translate-x-3 transition-transform" size={24} />
                </Link>
                <Link to="/contact" className="px-16 py-8 border-2 border-slate-200 text-brand-primary rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.6em] flex items-center justify-center hover:bg-white hover:border-brand-primary/10 hover:shadow-xl transition-all duration-700">
                  Contact Advisory
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEDERGREEN Integration Section (Only for Work sub-pages) */}
        {isWorkSubPage && (
          <section id="ai-node" className="px-10 lg:px-32 py-32 bg-brand-primary text-white border-y border-white/5 scroll-mt-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-40 opacity-[0.08] pointer-events-none rotate-45 transform scale-150">
              <LogoMark className="w-96 h-96" color="white" />
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 relative z-10">
              <div className="lg:col-span-5 flex flex-col justify-center">
                {path === '/business-plans' && (
                  <div className="mb-6 flex items-center opacity-40">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-accent border border-brand-accent/30 px-3 py-1 rounded-lg">FEDERGREEN Node: FG-STRAT</span>
                  </div>
                )}
                <div className="flex items-center space-x-4 mb-10">
                  <LogoMark className="w-8 h-8" color="white" />
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-brand-accent">Contextual Node Analysis</span>
                </div>
                <h2 className="serif text-6xl font-black mb-10 italic tracking-tighter leading-tight">FEDERGREEN <br/> Financial Tool.</h2>
                <p className="text-indigo-100/50 text-2xl mb-16 italic leading-relaxed font-light">
                  Executing strategic reasoning tranches using the proprietary FEDERGREEN architecture. Map your specific node against global institutional data in real-time.
                </p>
                {renderContextualTool()}
              </div>

              <div className="lg:col-span-7">
                <div className="h-full min-h-[600px] bg-white/5 rounded-[4rem] border border-white/10 p-16 flex flex-col relative group backdrop-blur-3xl shadow-[0_64px_128px_-32px_rgba(0,0,0,0.4)]">
                  <AnimatePresence mode="wait">
                    {aiLoading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center space-y-10">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 border-[6px] border-white/10 rounded-full" />
                            <div className="absolute inset-0 border-[6px] border-brand-accent border-t-transparent rounded-full animate-spin" />
                        </div>
                        <p className="text-[12px] font-black uppercase tracking-[0.6em] text-indigo-300 animate-pulse text-center">Syncing with Sovereign <br/> Intelligence Node...</p>
                      </motion.div>
                    ) : aiResult ? (
                      <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-10">
                          <p className="text-[12px] font-black uppercase tracking-[0.4em] text-brand-accent">Heuristic Analysis Artifact</p>
                          <button onClick={() => setAiResult(null)} className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white border-b border-transparent hover:border-white/30 transition-all">Clear Node</button>
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-[600px] pr-8 hide-scrollbar">
                           <p className="text-indigo-50 text-2xl font-medium leading-[1.7] italic whitespace-pre-wrap tracking-tight">
                             {aiResult}
                           </p>
                        </div>
                        <div className="mt-12 pt-10 border-t border-white/5 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] flex flex-col sm:flex-row justify-between gap-4">
                          <span>Model: FEDERGREEN-3-STRATEGIC</span>
                          <span>VERIFIED INSTITUTIONAL ENGAGEMENT ARTIFACT</span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 opacity-20">
                        <Cpu size={120} className="text-white transform group-hover:rotate-12 transition-transform duration-[3s]" />
                        <div className="space-y-4">
                          <h4 className="serif text-4xl font-black italic tracking-tighter">Analytical Node Idle</h4>
                          <p className="text-xl font-medium italic opacity-60">Input specific tranches to begin heuristic generation sequence.</p>
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
        <section id="overview" className="px-10 lg:px-32 py-32 max-w-7xl scroll-mt-48">
          <h2 className="text-[13px] font-black uppercase tracking-[0.6em] text-slate-300 mb-16 flex items-center">
            <div className="w-12 h-[2px] bg-slate-200 mr-5" /> Executive Overview
          </h2>
          <div className="space-y-12 text-3xl text-slate-700 leading-relaxed font-medium italic tracking-tight opacity-90">
            {content.overview.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        {/* Deliverables & Methodology */}
        <section id="deliverables" className="px-10 lg:px-32 py-40 bg-white border-y border-slate-50 scroll-mt-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-[0.6em] text-slate-300 mb-20">Institutional Deliverables</h3>
              <div className="space-y-10">
                {content.deliverables.map((d, i) => (
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="flex items-start p-10 bg-brand-stone rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 group">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mr-8 flex-shrink-0 group-hover:bg-brand-primary transition-all duration-700 shadow-inner group-hover:shadow-2xl group-hover:scale-110">
                        <CheckCircle2 className="text-brand-emerald group-hover:text-brand-accent" size={28} />
                    </div>
                    <p className="text-brand-primary font-black text-2xl leading-tight tracking-tighter italic">{d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div id="methodology" className="scroll-mt-48">
              <h3 className="text-[13px] font-black uppercase tracking-[0.6em] text-slate-300 mb-20">Advisory Methodology</h3>
              <div className="space-y-12">
                {content.methodology.map((m, i) => (
                  <div key={i} className="flex items-start relative group">
                    <div className="w-16 h-16 bg-brand-primary text-white rounded-[1.8rem] flex items-center justify-center font-black text-xl flex-shrink-0 mr-10 shadow-[0_24px_48px_-12px_rgba(30,58,95,0.3)] group-hover:scale-110 transition-transform duration-700">
                      0{i + 1}
                    </div>
                    <div className="pt-2">
                      <p className="text-brand-primary font-black text-3xl mb-4 tracking-tighter italic">{m.split(':')[0]}</p>
                      <p className="text-slate-400 text-lg font-medium italic leading-relaxed">{m.split(':')[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Segments & Outcomes */}
        <section id="segments" className="px-10 lg:px-32 py-40 scroll-mt-48">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-brand-primary p-20 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:rotate-45 transition-transform duration-1000 transform scale-150">
                <LogoMark className="w-48 h-48" color="white" />
              </div>
              <h3 className="text-[12px] font-black uppercase tracking-[0.6em] mb-16 text-brand-accent">Target Capital Segments</h3>
              <ul className="space-y-10">
                {content.whoItsFor.map((s, i) => (
                    <li key={i} className="text-3xl font-black italic tracking-tighter border-l-4 border-brand-accent/20 pl-8 hover:border-brand-accent transition-all duration-700 py-2">{s}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-brand-emerald p-20 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
              <h3 className="text-[12px] font-black uppercase tracking-[0.6em] mb-16 text-emerald-200">Anticipated Yield Nodes</h3>
              <ul className="space-y-10">
                {content.outcomes.map((o, i) => (
                    <li key={i} className="text-3xl font-black italic tracking-tighter border-l-4 border-white/20 pl-8 hover:border-white transition-all duration-700 py-2">{o}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Case Study Example */}
        <section id="case-study" className="px-10 lg:px-32 py-40 bg-brand-primary text-white rounded-[5rem] mx-10 lg:mr-32 mb-40 relative overflow-hidden scroll-mt-48 shadow-[0_96px_192px_-48px_rgba(30,58,95,0.3)]">
          <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative z-10 max-w-5xl">
            <div className="flex items-center space-x-6 mb-12">
              <FileText className="text-brand-accent" size={32} />
              <span className="text-brand-accent text-[12px] font-black uppercase tracking-[0.6em]">Engagement Artifact (Restricted Sample)</span>
            </div>
            <h2 className="serif text-7xl font-black mb-12 italic tracking-tighter leading-[0.9]">Case File: <br/> {content.caseStudy.title}</h2>
            <p className="text-2xl text-slate-300 leading-relaxed font-light italic opacity-90">{content.caseStudy.description}</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-10 lg:px-32 py-40 bg-white border-t border-slate-50 scroll-mt-48">
          <h3 className="text-[13px] font-black uppercase tracking-[0.6em] text-slate-300 mb-24 text-center">Institutional FAQ</h3>
          <div className="max-w-5xl mx-auto space-y-16">
            {content.faq.map((f, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={i} className="space-y-6 group">
                <h4 className="text-3xl font-black text-brand-primary tracking-tighter italic flex items-start leading-tight">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-brand-primary transition-all duration-700 shadow-inner group-hover:shadow-xl">
                    <AlertCircle className="text-brand-emerald group-hover:text-white" size={20} />
                  </div>
                  {f.q}
                </h4>
                <p className="text-slate-500 text-xl leading-[1.8] pl-14 italic font-medium opacity-80">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA BAND */}
        <section className="py-64 px-10 lg:px-32 bg-brand-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
          <h2 className="serif text-8xl md:text-9xl font-black mb-16 tracking-tighter italic leading-[0.85] relative z-10">Initiate node <br/> engagement.</h2>
          <Link to="/schedule-meeting" className="inline-block px-24 py-10 bg-brand-accent text-white rounded-[3.5rem] font-black uppercase tracking-[0.6em] shadow-2xl hover:bg-white hover:text-brand-primary transition-all duration-700 relative z-10 text-[13px] group">
            Request Institutional Slot
            <ArrowRight className="inline-block ml-6 group-hover:translate-x-4 transition-transform" size={24} />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FrameworkPage;
