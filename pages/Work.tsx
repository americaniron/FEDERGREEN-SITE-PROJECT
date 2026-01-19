
import React, { useState, useEffect } from 'react';
import { FileText, Presentation, BarChart3, ArrowRight, Zap, Calculator, Target, MessageSquare, ShieldCheck, Database, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { checkApiStatus } from '../services/geminiService';

const ApiStatusIndicator: React.FC<{ status: 'checking' | 'online' | 'offline' }> = ({ status }) => {
    if (status === 'online') {
      return (
        <div className="flex items-center space-x-3 px-4 py-2 sm:px-5 sm:py-2 bg-emerald-500/10 text-emerald-700 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] shadow-sm">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full relative flex items-center justify-center">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full absolute animate-ping opacity-75"></div>
          </div>
          <span>FEDERGREEN: Active</span>
        </div>
      );
    }
    if (status === 'offline') {
      return (
        <div className="flex items-center space-x-3 px-4 py-2 bg-rose-500/10 text-rose-700 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
          <div className="w-2 h-2 bg-rose-50 rounded-full" />
          <span>Nodes Restricted</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-3 px-4 py-2 bg-slate-100 text-slate-500 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
        <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse" />
        <span>Verifying Protocol...</span>
      </div>
    );
};

const Work: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  useEffect(() => {
    const verifyApi = async () => {
      const isOnline = await checkApiStatus();
      setApiStatus(isOnline ? 'online' : 'offline');
    };
    verifyApi();
  }, []);

  const tools = [
    { 
        title: "Business Plans", 
        id: "BP-04",
        desc: "High-fidelity strategic narratives mapping operational nodes and arbitrage tranches.",
        icon: FileText,
        path: "/business-plans",
        accent: "from-emerald-500/20 to-transparent",
        iconColor: "text-emerald-600",
        cta: "Strategic Narrative",
        meta: "Heuristic: FG-STRAT"
    },
    { 
        title: "Investor Decks", 
        id: "ID-09",
        desc: "Institutional visual narratives featuring the proprietary Q&A Simulation node.",
        icon: Presentation,
        path: "/investor-decks",
        accent: "from-indigo-500/20 to-transparent",
        iconColor: "text-indigo-600",
        cta: "Initiate Simulation",
        meta: "Heuristic: FG-VEO"
    },
    { 
        title: "Financials", 
        id: "FM-12",
        desc: "Audit-ready projections and sensitivity tranches for rigorous capital assessment.",
        icon: BarChart3,
        path: "/financials",
        accent: "from-emerald-500/20 to-transparent",
        iconColor: "text-emerald-600",
        cta: "Model Capital Stack",
        meta: "Heuristic: FG-MOD"
    },
    { 
        title: "Market Pulse", 
        id: "MP-01",
        desc: "Real-time institutional sentiment reports grounded in global news tranches.",
        icon: Target,
        path: "/",
        accent: "from-indigo-500/20 to-transparent",
        iconColor: "text-indigo-600",
        cta: "Analyze Sentiment",
        meta: "Heuristic: FG-FLASH"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 sm:pt-48 pb-16 sm:pb-32 px-6 sm:px-10 lg:px-32 bg-[#fdfdfc] border-b border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 sm:p-40 opacity-[0.015] pointer-events-none transform rotate-12 scale-150"><Database size={400} /></div>
        <div className="max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-indigo-600 text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-6 sm:mb-10 flex items-center">
                <div className="w-12 h-[2px] bg-indigo-600 mr-4 sm:mr-5" /> Executive Portfolio
            </span>
            <h1 className="serif text-5xl sm:text-7xl md:text-9xl text-[#0a0f1a] font-black mb-8 sm:mb-12 italic tracking-tighter leading-[1] sm:leading-[0.88]">Case <br className="hidden sm:block"/> Artifacts.</h1>
            <p className="text-slate-500 text-lg sm:text-2xl leading-relaxed max-w-2xl font-medium italic opacity-80">
              Producing high-stakes institutional artifacts required to command capital in hyper-complex global environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEDERGREEN Financial Tools Section */}
      <section className="py-24 sm:py-40 px-6 sm:px-10 lg:px-32 bg-white relative">
        <div className="max-w-[1700px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 sm:mb-32 gap-12">
                <div className="max-w-3xl">
                    <div className="mb-10">
                        <ApiStatusIndicator status={apiStatus} />
                    </div>
                    <h2 className="serif text-4xl sm:text-6xl md:text-8xl text-[#0a0f1a] font-black mb-6 italic tracking-tighter leading-tight">FEDERGREEN Suite.</h2>
                    <p className="text-slate-400 text-xl sm:text-2xl font-medium italic leading-relaxed max-w-2xl">
                        Deploying sovereign intelligence nodes to generate board-ready strategic insights in real-time.
                    </p>
                </div>
                <div className="hidden lg:flex items-center space-x-6 text-slate-300">
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1">Architecture Node</p>
                        <p className="text-xs font-bold text-[#0a0f1a]">v2.5 Institutional</p>
                    </div>
                    <Layers size={32} strokeWidth={1} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {tools.map((tool, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link to={tool.path} className="group relative block h-full bg-[#fdfdfc] rounded-[3.5rem] border border-slate-100 overflow-hidden hover:bg-white hover:shadow-[0_96px_192px_-48px_rgba(10,15,26,0.12)] transition-all duration-1000 active:scale-[0.98]">
                            {/* Accent Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                            
                            <div className="relative z-10 p-10 sm:p-12 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-100 rounded-[1.8rem] flex items-center justify-center shadow-sm group-hover:bg-[#0a0f1a] transition-all duration-1000 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 group-hover:rotate-6">
                                        <tool.icon size={28} sm:size={32} className={`text-slate-400 group-hover:text-white transition-all ${tool.iconColor}`} />
                                    </div>
                                    <span className="text-[9px] sm:text-[11px] font-black text-slate-200 uppercase tracking-widest group-hover:text-slate-400 transition-colors">ID: {tool.id}</span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="serif text-3xl sm:text-4xl text-[#0a0f1a] font-black mb-6 italic tracking-tight leading-none group-hover:text-indigo-600 transition-colors">{tool.title}.</h3>
                                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-12 font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">{tool.desc}</p>
                                </div>

                                <div className="mt-auto pt-10 border-t border-slate-100/50 flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">{tool.meta}</p>
                                        <ShieldCheck size={14} className="text-emerald-500/20 group-hover:text-emerald-500 transition-colors" />
                                    </div>
                                    <div className="flex items-center text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] group-hover:translate-x-3 transition-transform">
                                        {tool.cta} <ArrowRight className="ml-3" size={14} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Content Blocks */}
      {[
        { id: "business-plans", title: "Business Plans", icon: FileText, desc: "Proprietary strategic documents mapping multi-year operational nodes, competitor arbitrage, and global market positioning. Our plans are the foundation for large-scale enterprise growth.", path: "/business-plans", bg: "bg-white", iconColor: "text-indigo-600" },
        { id: "investor-decks", title: "Investor Decks", icon: Presentation, desc: "High-fidelity visual narratives designed for senior credit committees and sovereign wealth boards. We distill massive complexity into clarity.", path: "/investor-decks", bg: "bg-[#fdfdfc]", reverse: true, iconColor: "text-emerald-600" },
        { id: "financials", title: "Financials", icon: BarChart3, desc: "Audit-ready projections, DCF modeling, and sensitivity analysis. Hard data that institutional capital demands with absolute precision.", path: "/financials", bg: "bg-white", iconColor: "text-indigo-600" }
      ].map((section, idx) => (
        <section key={section.id} id={section.id} className={`py-24 sm:py-48 px-6 sm:px-10 lg:px-32 border-t border-slate-50 scroll-mt-24 ${section.bg}`}>
          <div className={`max-w-7xl mx-auto flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 sm:gap-32 items-center`}>
            <div className="lg:w-1/2 space-y-8 sm:space-y-12">
              <motion.div initial={{ opacity: 0, x: section.reverse ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-100 rounded-2xl sm:rounded-[1.8rem] flex items-center justify-center ${section.iconColor} shadow-sm mb-8 sm:mb-10`}>
                  <section.icon size={28} sm:size={36} />
                </div>
                <h2 className="serif text-5xl sm:text-6xl text-[#0a0f1a] font-black mb-6 sm:mb-10 italic tracking-tighter leading-tight">{section.title}</h2>
                <p className="text-slate-500 text-lg sm:text-2xl leading-[1.6] sm:leading-[1.7] font-medium italic opacity-80 mb-10 sm:mb-12">
                  {section.desc}
                </p>
                <Link to={section.path} className="inline-flex items-center space-x-3 sm:space-x-4 text-indigo-600 font-black text-[10px] sm:text-[12px] uppercase tracking-[0.4em] sm:tracking-[0.5em] group hover:translate-x-4 transition-all duration-700 text-left">
                  <span>Access Node</span>
                  <div className="w-8 sm:w-12 h-px bg-indigo-600 group-hover:w-16 sm:group-hover:w-20 transition-all duration-700" />
                  <ArrowRight size={16} sm:size={18} />
                </Link>
              </motion.div>
            </div>
            <div className="lg:w-1/2 w-full">
               <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-video bg-[#0a0f1a] rounded-[3rem] sm:rounded-[5rem] shadow-2xl p-10 sm:p-20 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-50" />
                  <div className="space-y-4 sm:space-y-6 relative z-10">
                    <div className="w-1/3 h-1.5 sm:h-2 bg-white/20 rounded-full group-hover:w-1/2 transition-all duration-1000" />
                    <div className="w-2/3 h-1.5 sm:h-2 bg-white/10 rounded-full group-hover:w-3/4 transition-all duration-1000" />
                  </div>
                  <div className="text-center relative z-10">
                    <p className="text-[10px] sm:text-[12px] font-black text-white/30 uppercase tracking-[0.8em]">Artifact Simulation</p>
                  </div>
                  <div className="space-y-4 sm:space-y-6 relative z-10">
                    <div className="w-full h-12 sm:h-20 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/5 group-hover:bg-white/10 transition-all duration-700" />
                    <div className="w-full h-12 sm:h-20 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/5 group-hover:bg-white/10 transition-all duration-700" />
                  </div>
               </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Work;
