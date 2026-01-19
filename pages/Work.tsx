
import React, { useState, useEffect } from 'react';
import { FileText, Presentation, BarChart3, ArrowRight, Zap, Calculator, Target, MessageSquare, ShieldCheck, Database, Layers, Binary } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { checkApiStatus } from '../services/geminiService';

const ApiStatusIndicator: React.FC<{ status: 'checking' | 'online' | 'offline' }> = ({ status }) => {
    if (status === 'online') {
      return (
        <div className="flex items-center space-x-3 px-6 py-2.5 bg-emerald-500/10 text-emerald-700 rounded-full text-ui-caps shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute animate-ping opacity-75"></div>
          </div>
          <span>FEDERGREEN: Active</span>
        </div>
      );
    }
    if (status === 'offline') {
      return (
        <div className="flex items-center space-x-3 px-6 py-2.5 bg-rose-500/10 text-rose-700 rounded-full text-ui-caps">
          <div className="w-2 h-2 bg-rose-500 rounded-full" />
          <span>Nodes Restricted</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-3 px-6 py-2.5 bg-slate-100 text-slate-500 rounded-full text-ui-caps">
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
        accent: "from-brand-emerald/10 to-transparent",
        iconColor: "text-brand-emerald",
        cta: "Generate Strategic Narrative",
        meta: "Node: FG-STRAT"
    },
    { 
        title: "Investor Decks", 
        id: "ID-09",
        desc: "Institutional visual narratives featuring the proprietary Q&A Simulation node.",
        icon: Presentation,
        path: "/investor-decks",
        accent: "from-brand-primary/10 to-transparent",
        iconColor: "text-brand-primary",
        cta: "Execute Q&A Simulation",
        meta: "Node: FG-VEO"
    },
    { 
        title: "Financials", 
        id: "FM-12",
        desc: "Audit-ready projections and sensitivity tranches for rigorous capital assessment.",
        icon: BarChart3,
        path: "/financials",
        accent: "from-brand-emerald/10 to-transparent",
        iconColor: "text-brand-emerald",
        cta: "Optimize Capital Stack",
        meta: "Node: FG-MOD"
    },
    { 
        title: "Market Pulse", 
        id: "MP-01",
        desc: "Real-time institutional sentiment reports grounded in global news tranches.",
        icon: Target,
        path: "/",
        accent: "from-brand-primary/10 to-transparent",
        iconColor: "text-brand-primary",
        cta: "Analyze Sentiment",
        meta: "Node: FG-FLASH"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 sm:pt-48 pb-16 sm:pb-32 px-6 sm:px-10 lg:px-22 bg-brand-stone border-b border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-[0.015] pointer-events-none transform rotate-12 scale-150"><Database size={400} /></div>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-ui-caps text-brand-primary block mb-10 flex items-center">
                <div className="w-14 h-[2px] bg-brand-primary mr-5" /> Executive Portfolio
            </span>
            <h1 className="serif italic text-brand-primary tracking-tighter mb-12">Case Artifacts.</h1>
            <p className="text-slate-500 text-2xl leading-relaxed max-w-3xl font-medium italic opacity-80">
              Producing high-stakes institutional artifacts required to command capital in hyper-complex global environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEDERGREEN Financial Tools Section */}
      <section className="py-24 sm:py-48 px-6 sm:px-10 lg:px-22 bg-white relative">
        <div className="section-container">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 lg:mb-32 gap-12">
                <div className="max-w-3xl">
                    <div className="mb-12">
                        <ApiStatusIndicator status={apiStatus} />
                    </div>
                    <h2 className="serif italic text-brand-primary tracking-tighter mb-8 leading-tight">FEDERGREEN Financial Tools.</h2>
                    <p className="text-slate-400 text-2xl font-medium italic leading-relaxed max-w-2xl">
                        Deploying sovereign intelligence nodes to generate board-ready strategic insights in real-time.
                    </p>
                </div>
                <div className="hidden lg:flex items-center space-x-6 text-slate-300">
                    <div className="text-right">
                        <p className="text-ui-caps mb-2 tracking-[0.2em]">Architecture Node</p>
                        <p className="text-sm font-bold text-brand-primary">v2.5 Institutional</p>
                    </div>
                    <Binary size={40} strokeWidth={1} className="text-brand-accent" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {tools.map((tool, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link to={tool.path} className="group relative block h-full bg-brand-stone rounded-6xl border border-slate-100 overflow-hidden hover:bg-white hover:shadow-2xl transition-all duration-700 active:scale-95">
                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                            
                            <div className="relative z-10 p-12 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-16">
                                    <div className="w-20 h-20 bg-white border border-slate-100 rounded-5xl flex items-center justify-center shadow-sm group-hover:bg-brand-primary transition-all duration-700 group-hover:scale-105 group-hover:rotate-3 shadow-indigo-900/5">
                                        <tool.icon size={32} className={`text-slate-400 group-hover:text-brand-accent transition-all ${tool.iconColor}`} />
                                    </div>
                                    <span className="text-ui-caps text-slate-200 group-hover:text-slate-400 transition-colors">ID: {tool.id}</span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="serif italic text-brand-primary tracking-tight mb-6 group-hover:text-brand-primary transition-colors">{tool.title}.</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-16 font-medium italic opacity-80">{tool.desc}</p>
                                </div>

                                <div className="mt-auto pt-10 border-t border-slate-100/50 flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-ui-caps text-slate-300">{tool.meta}</p>
                                        <ShieldCheck size={16} className="text-brand-emerald opacity-20 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex items-center text-brand-primary font-black text-ui-caps group-hover:translate-x-3 transition-transform">
                                        {tool.cta} <ArrowRight className="ml-3" size={16} />
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
        { id: "business-plans", title: "Business Plans", icon: FileText, desc: "Proprietary strategic documents mapping multi-year operational nodes, competitor arbitrage, and global market positioning. Our plans are the foundation for large-scale enterprise growth.", path: "/business-plans", bg: "bg-white", iconColor: "text-brand-primary" },
        { id: "investor-decks", title: "Investor Decks", icon: Presentation, desc: "High-fidelity visual narratives designed for senior credit committees and sovereign wealth boards. We distill massive complexity into clarity.", path: "/investor-decks", bg: "bg-brand-stone", reverse: true, iconColor: "text-brand-emerald" },
        { id: "financials", title: "Financials", icon: BarChart3, desc: "Audit-ready projections, DCF modeling, and sensitivity analysis. Hard data that institutional capital demands with absolute precision.", path: "/financials", bg: "bg-white", iconColor: "text-brand-primary" }
      ].map((section, idx) => (
        <section key={section.id} id={section.id} className={`py-40 lg:py-64 px-6 sm:px-10 lg:px-22 border-t border-slate-50 scroll-mt-24 ${section.bg}`}>
          <div className="section-container">
            <div className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-24 lg:gap-48 items-center`}>
              <div className="lg:w-1/2 space-y-12">
                <motion.div initial={{ opacity: 0, x: section.reverse ? 48 : -48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <div className={`w-20 h-20 bg-white border border-slate-100 rounded-5xl flex items-center justify-center ${section.iconColor} shadow-sm mb-12 shadow-indigo-900/5`}>
                    <section.icon size={36} />
                  </div>
                  <h2 className="serif italic text-brand-primary tracking-tighter mb-10 leading-tight">{section.title}</h2>
                  <p className="text-slate-500 text-2xl leading-relaxed font-medium italic opacity-80 mb-16">
                    {section.desc}
                  </p>
                  <Link to={section.path} className="inline-flex items-center space-x-6 text-brand-primary font-black text-ui-caps group hover:translate-x-4 transition-all duration-700">
                    <span>Access Node</span>
                    <div className="w-12 h-px bg-brand-primary group-hover:w-20 transition-all duration-700" />
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </div>
              <div className="lg:w-1/2 w-full">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="aspect-video bg-brand-primary-dark rounded-6xl shadow-2xl p-16 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent opacity-50" />
                    <div className="space-y-6 relative z-10">
                      <div className="w-1/3 h-1.5 bg-white/20 rounded-full group-hover:w-1/2 transition-all duration-1000" />
                      <div className="w-2/3 h-1.5 bg-white/10 rounded-full group-hover:w-3/4 transition-all duration-1000" />
                    </div>
                    <div className="text-center relative z-10">
                      <p className="text-ui-caps text-white/30 tracking-[0.8em]">Artifact Simulation</p>
                    </div>
                    <div className="space-y-6 relative z-10">
                      <div className="w-full h-16 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-all duration-700 shadow-inner" />
                      <div className="w-full h-16 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-all duration-700 shadow-inner" />
                    </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Work;
