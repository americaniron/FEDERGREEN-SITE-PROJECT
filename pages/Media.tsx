
import React from 'react';
import { Mail, Newspaper, ArrowRight, ExternalLink, Globe, Zap, History, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Media: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 sm:pt-48 pb-20 sm:pb-30 px-6 sm:px-10 lg:px-22 bg-[#fdfdfc] border-b border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-[0.012] pointer-events-none transform rotate-12 scale-150"><Newspaper size={400} /></div>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-ui-caps text-indigo-600 block mb-10 flex items-center">
                <div className="w-14 h-[2px] bg-indigo-600 mr-5" /> Intelligence Network
            </span>
            <h1 className="serif italic text-[#0a0f1a] tracking-tighter mb-12">Institutional <br/> Knowledge.</h1>
            <p className="text-slate-500 text-2xl leading-relaxed max-w-3xl font-medium italic opacity-80">
              Market intelligence nodes from the Federgreen senior advisory desk. Distilling global complexity into operational clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gateway Grid */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-22 bg-white relative">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            
            {/* Newsletter Gateway */}
            <motion.div 
              initial={{ opacity: 0, x: -32 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="group p-12 sm:p-20 bg-[#fcfcfb] rounded-6xl border border-slate-100 hover:bg-white transition-all duration-[0.7s] hover:shadow-2xl relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-[0.03] transition-all duration-[2s] group-hover:rotate-12 transform scale-150">
                <Mail size={200} />
              </div>
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-4xl flex items-center justify-center mb-12 shadow-inner transition-transform duration-700 group-hover:scale-105">
                <Mail size={32} />
              </div>
              <h2 className="serif italic text-4xl sm:text-6xl text-[#0a0f1a] font-black mb-10 tracking-tighter leading-tight">Weekly <br/> Alpha Brief.</h2>
              <p className="text-slate-500 text-xl leading-relaxed font-medium italic opacity-80 mb-16 flex-1">
                Strategic updates on global liquidity shifts, sovereign debt tranches, and private equity arbitrage nodes.
              </p>
              <Link to="/newsletters" className="inline-flex items-center space-x-6 text-indigo-600 text-ui-caps group-hover:translate-x-4 transition-all duration-700">
                <span>View Briefing Archive</span>
                <div className="w-12 h-px bg-indigo-600 group-hover:w-20 transition-all duration-700" />
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Blog Gateway */}
            <motion.div 
              initial={{ opacity: 0, x: 32 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="group p-12 sm:p-20 bg-[#0a0f1a] rounded-6xl text-white hover:bg-[#0d1424] transition-all duration-[0.7s] hover:shadow-2xl relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-[2s] group-hover:rotate-12 transform scale-150">
                <Globe size={200} />
              </div>
              <div className="w-20 h-20 bg-white/5 border border-white/10 text-emerald-400 rounded-4xl flex items-center justify-center mb-12 shadow-2xl transition-transform duration-700 group-hover:scale-105">
                <Zap size={32} />
              </div>
              <h2 className="serif italic text-4xl sm:text-6xl font-black mb-10 tracking-tighter leading-tight text-white">Technical <br/> Deep Dives.</h2>
              <p className="text-indigo-100/40 text-xl leading-relaxed font-light italic mb-16 flex-1">
                Long-form analysis on Basel IV capital adequacy, cross-border trade program mechanics, and digital asset residency.
              </p>
              <Link to="/blogs" className="inline-flex items-center space-x-6 text-emerald-400 text-ui-caps group-hover:translate-x-4 transition-all duration-700">
                <span>Access Knowledge Hub</span>
                <div className="w-12 h-px bg-emerald-400 group-hover:w-20 transition-all duration-700" />
                <ArrowRight size={20} />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Insight Band */}
      <section className="py-32 px-6 sm:px-10 lg:px-22 bg-[#fdfdfc] border-t border-slate-50 relative overflow-hidden">
        <div className="section-container">
           <div className="flex items-center space-x-4 mb-12">
             <History size={16} className="text-slate-300" />
             <p className="text-ui-caps text-slate-400">Latest Intelligence Node</p>
           </div>
           <div className="bg-white border border-slate-100 p-10 sm:p-16 rounded-5xl shadow-xl flex flex-col lg:flex-row items-center gap-12 sm:gap-20 group">
              <div className="lg:w-1/3 aspect-[4/5] bg-slate-50 rounded-4xl overflow-hidden shadow-inner flex items-center justify-center">
                 <div className="text-center p-12">
                    <span className="text-[64px] serif italic font-black text-slate-100 mb-4 block leading-none">042</span>
                    <p className="text-ui-caps text-slate-300 tracking-[0.6em]">Alpha Node</p>
                 </div>
              </div>
              <div className="lg:w-2/3 space-y-8">
                 <div className="flex items-center space-x-4">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Macro Strategy</span>
                    <span className="text-slate-300 font-mono text-xs">OCTOBER 24, 2024</span>
                 </div>
                 <h3 className="serif italic text-4xl sm:text-6xl text-[#0a0f1a] font-black tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">The Basel IV Node: Future-Proofing Sovereign Reserves.</h3>
                 <p className="text-slate-500 text-xl leading-relaxed font-medium italic opacity-90 max-w-2xl">
                    Our technical lead outlines the architectural shifts required to maintain capital adequacy tranches in the next regulatory epoch.
                 </p>
                 <Link to="/blogs" className="flex items-center text-indigo-600 text-ui-caps group/link">
                    Read Analysis <ChevronRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
