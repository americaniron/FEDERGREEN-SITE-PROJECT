
import React, { useState, useEffect } from 'react';
import { FileText, Presentation, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { checkApiStatus } from '../services/geminiService';

const ApiStatusIndicator: React.FC<{ status: 'checking' | 'online' | 'offline' }> = ({ status }) => {
    if (status === 'online') {
      return (
        <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
          <div className="w-2 h-2 bg-emerald-500 rounded-full relative flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full absolute animate-ping"></div>
          </div>
          <span>API Nodes: Online</span>
        </div>
      );
    }
    if (status === 'offline') {
      return (
        <div className="flex items-center space-x-2 px-3 py-1 bg-rose-500/10 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest">
          <div className="w-2 h-2 bg-rose-500 rounded-full" />
          <span>API Nodes: Offline</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-slate-500/10 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" />
        <span>Verifying Sovereign API...</span>
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

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-7xl text-slate-900 font-bold mb-8">Our Work</h1>
          <p className="text-slate-600 text-xl leading-relaxed max-w-2xl">
            We produce the institutional-grade artifacts required to command attention and secure capital in complex markets.
          </p>
        </div>
      </section>

      {/* AI Financial Tools Section */}
      <section className="py-24 px-8 lg:px-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="flex justify-center mb-6">
                    <ApiStatusIndicator status={apiStatus} />
                </div>
                <h2 className="serif text-5xl text-slate-900 font-bold mb-6">AI Financial Tools</h2>
                <p className="text-slate-500 text-lg">
                    Leverage our proprietary AI nodes to generate institutional-grade financial artifacts and strategic insights in real-time.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { 
                        title: "Strategic Narrative Generator", 
                        desc: "Generate board-ready business plans grounded in real-time market data.",
                        icon: FileText,
                        path: "/business-plans",
                        accent: "text-emerald-600"
                    },
                    { 
                        title: "Investor Q&A Simulator", 
                        desc: "Simulate critical questions from Tier-1 VCs and credit committees.",
                        icon: Presentation,
                        path: "/investor-decks",
                        accent: "text-indigo-600"
                    },
                    { 
                        title: "Capital Structure Optimizer", 
                        desc: "Model and optimize your capital stack with AI-driven recommendations.",
                        icon: BarChart3,
                        path: "/financials",
                        accent: "text-emerald-600"
                    }
                ].map((tool, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link to={tool.path} className="block bg-white p-10 rounded-[3rem] border border-slate-100 h-full group hover:shadow-2xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-indigo-600 transition-all">
                                <tool.icon size={28} className={`text-slate-400 group-hover:text-white transition-all ${tool.accent}`} />
                            </div>
                            <h3 className="text-xl text-slate-900 font-bold mb-4">{tool.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8">{tool.desc}</p>
                            <div className="flex items-center text-indigo-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                Access AI Node <ArrowRight className="ml-2" size={14} />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Business Plans */}
      <section id="business-plans" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <FileText size={32} />
            </div>
            <h2 className="serif text-5xl text-slate-900 font-bold">Business Plans</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Proprietary strategic documents mapping multi-year operational nodes, competitor arbitrage, and global market positioning. Our plans are the foundation for large-scale enterprise growth.
            </p>
            <Link to="/business-plans" className="inline-flex items-center space-x-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">
              <span>Access Node</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="lg:w-1/2 w-full aspect-video bg-slate-50 rounded-[40px] border border-slate-200 p-12 flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <div className="w-1/3 h-2 bg-indigo-100 rounded-full" />
              <div className="w-2/3 h-2 bg-indigo-100 rounded-full" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">Architecture Visual Sample</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-white rounded-xl border border-slate-100 shadow-sm" />
              <div className="w-full h-12 bg-white rounded-xl border border-slate-100 shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Investor Decks */}
      <section id="investor-decks" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
              <Presentation size={32} />
            </div>
            <h2 className="serif text-5xl text-slate-900 font-bold">Investor Decks</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              High-fidelity visual narratives designed for senior credit committees and sovereign wealth boards. We distill complexity into absolute clarity.
            </p>
            <Link to="/investor-decks" className="inline-flex items-center space-x-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">
              <span>Access Node</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="lg:w-1/2 w-full aspect-video bg-white rounded-[40px] border border-slate-200 p-12 flex flex-col items-center justify-center gap-6 shadow-xl">
            <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200 shadow-inner relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent" />
               <div className="absolute bottom-8 left-8 right-8">
                 <div className="w-full h-2 bg-slate-200 rounded-full mb-2" />
                 <div className="w-1/2 h-2 bg-slate-200 rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financials */}
      <section id="financials" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <BarChart3 size={32} />
            </div>
            <h2 className="serif text-5xl text-slate-900 font-bold">Financials</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Audit-ready projections, DCF modeling, and sensitivity analysis. We provide the hard data that institutional capital demands.
            </p>
            <Link to="/financials" className="inline-flex items-center space-x-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">
              <span>Access Node</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="lg:w-1/2 w-full bg-slate-50 rounded-[40px] border border-slate-200 p-12 space-y-8 shadow-inner">
             <div className="grid grid-cols-4 gap-4 h-32 items-end">
               <div className="h-1/2 bg-white rounded-lg shadow-sm" />
               <div className="h-full bg-indigo-100 rounded-lg shadow-sm" />
               <div className="h-2/3 bg-white rounded-lg shadow-sm" />
               <div className="h-5/6 bg-emerald-100 rounded-lg shadow-sm" />
             </div>
             <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">EBITDA Node V.2</span>
                  <span className="text-[10px] text-slate-900 font-mono font-bold">14.2%</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Cash Reserve</span>
                  <span className="text-[10px] text-slate-900 font-mono font-bold">$4.2M</span>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
