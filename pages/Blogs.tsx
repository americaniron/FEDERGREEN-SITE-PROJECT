
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, Shield, ArrowRight, ExternalLink, Bookmark, User, Clock, ChevronRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blogs: React.FC = () => {
  const categories = [
    { label: 'Market Alpha', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Compliance Node', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Global Infrastructure', icon: Globe, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Asset Architecture', icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ];

  const articles = [
    { cat: 'Market Alpha', date: 'Oct 24, 2024', time: '12 min', title: 'The Convergence of Private Equity and Digital Collateral', desc: 'An architectural deep dive into why institutional liquidity is shifting toward digital collateral in Basel III/IV environments.' },
    { cat: 'Compliance Node', date: 'Oct 18, 2024', time: '8 min', title: 'Navigating Basel IV: Capital Adequacy in 2025', desc: 'Understanding how new capital requirements affect cross-border trade programs and monetization strategies.' },
    { cat: 'Global Infrastructure', date: 'Oct 12, 2024', time: '15 min', title: 'Renewable Energy Bonds: Yield vs Impact', desc: 'A feasibility study on high-ROI infrastructure project funding in emerging African and Asian markets.' },
    { cat: 'Asset Architecture', date: 'Oct 05, 2024', time: '10 min', title: 'The Evolution of Hybrid Instruments', desc: 'How debt/equity hybrids are being redesigned for the higher-interest-rate "New Normal" tranches.' }
  ];

  return (
    <div className="bg-[#fdfdfc] min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 sm:pt-48 pb-16 sm:pb-32 px-6 sm:px-10 lg:px-22 bg-[#0a0f1a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-[0.08] pointer-events-none rotate-12 scale-150 transform"><Globe size={600} /></div>
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-ui-caps text-emerald-400 block mb-10 flex items-center">
                <div className="w-14 h-[2px] bg-emerald-400 mr-5 shadow-[0_0_15px_rgba(52,211,153,0.5)]" /> Technical Archive
            </span>
            <h1 className="serif italic text-white tracking-tighter mb-12">Knowledge <br/> tranches.</h1>
            <p className="text-indigo-100/50 text-2xl leading-relaxed max-w-4xl font-light italic">
              In-depth analysis, whitepapers, and technical reports on the future of institutional finance and global capital markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-12 bg-white border-b border-slate-50 sticky top-0 z-[60] backdrop-blur-xl bg-white/80">
        <div className="section-container overflow-x-auto hide-scrollbar flex items-center space-x-12 sm:space-x-16">
           <button className="text-ui-caps text-[#0a0f1a] font-black border-b-2 border-[#0a0f1a] pb-1 whitespace-nowrap">All Insights</button>
           {categories.map(cat => (
              <button key={cat.label} className="text-ui-caps text-slate-400 font-bold hover:text-[#0a0f1a] transition-all whitespace-nowrap">{cat.label}</button>
           ))}
        </div>
      </section>

      {/* Featured Thesis */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-22 bg-white">
        <div className="section-container">
           <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center group">
              <div className="aspect-square bg-[#0a0f1a] rounded-6xl p-20 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-40" />
                 <div className="relative z-10 w-24 h-24 bg-white/5 border border-white/10 rounded-4xl flex items-center justify-center text-emerald-400">
                    <Bookmark size={40} />
                 </div>
                 <div className="relative z-10">
                    <p className="text-ui-caps text-white/40 tracking-[0.8em] mb-4">Primary Thesis</p>
                    <h2 className="serif italic text-white text-5xl sm:text-7xl font-black tracking-tighter leading-none">The Future <br/> of Sovereignty.</h2>
                 </div>
              </div>
              <div className="space-y-10">
                 <div className="flex items-center space-x-6 text-slate-400">
                    <div className="flex items-center"><User size={14} className="mr-2" /> <span className="text-[10px] font-black uppercase tracking-widest">D. Federgreen</span></div>
                    <div className="flex items-center"><Clock size={14} className="mr-2" /> <span className="text-[10px] font-black uppercase tracking-widest">24 MIN READ</span></div>
                 </div>
                 <h3 className="serif italic text-4xl sm:text-6xl text-[#0a0f1a] font-black tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">Architectural Integrity in the Digital Asset Epoch.</h3>
                 <p className="text-slate-500 text-xl sm:text-2xl leading-relaxed font-medium italic opacity-90 max-w-2xl">
                    An exhaustive exploration of how sovereign wealth is transitioning from physical residency to decentralized institutional tranches.
                 </p>
                 <button className="px-12 py-6 bg-[#0a0f1a] text-white rounded-3xl text-ui-caps hover:bg-emerald-600 transition-all duration-700 shadow-2xl flex items-center group/btn">
                    Access Deep Dive <ArrowRight className="ml-4 group-hover/btn:translate-x-2 transition-transform" />
                 </button>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-22 bg-[#fcfcfb] border-y border-slate-50">
        <div className="section-container">
           <div className="flex items-center space-x-4 mb-20">
              <div className="w-12 h-px bg-slate-200" />
              <p className="text-ui-caps text-slate-400">Strategic Nodes Feed</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
              {articles.map((art, i) => (
                 <motion.div 
                    key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 1 }}
                    className="group cursor-pointer flex flex-col h-full"
                 >
                    <div className="aspect-video bg-white border border-slate-100 rounded-5xl mb-12 overflow-hidden relative shadow-sm group-hover:shadow-2xl transition-all duration-1000">
                       <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f1a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                       <div className="absolute top-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0a0f1a] shadow-lg scale-0 group-hover:scale-100 transition-transform duration-700">
                          <ExternalLink size={18} />
                       </div>
                       <div className="w-full h-full flex items-center justify-center p-20 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-[3s]">
                          <Zap size={200} className="text-[#0a0f1a]" />
                       </div>
                    </div>
                    <div className="flex items-center space-x-6 mb-8">
                       <span className="text-ui-caps text-indigo-600">{art.cat}</span>
                       <span className="text-slate-300">•</span>
                       <span className="text-[10px] font-black font-mono text-slate-400 tracking-widest">{art.date}</span>
                    </div>
                    <h4 className="serif italic text-3xl sm:text-4xl text-[#0a0f1a] font-black mb-8 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors flex-1">{art.title}</h4>
                    <p className="text-slate-500 text-lg italic leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity mb-10">{art.desc}</p>
                    <div className="flex items-center text-ui-caps text-[#0a0f1a] font-black group-hover:translate-x-4 transition-all duration-700">
                       Analyze Node <ChevronRight size={16} className="ml-2" />
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 px-6 sm:px-10 lg:px-22 bg-white text-center">
        <div className="section-container space-y-16">
           <h2 className="serif italic text-6xl sm:text-8xl text-[#0a0f1a] font-black tracking-tighter leading-tight">Request specialized <br/> analysis.</h2>
           <p className="text-slate-400 text-2xl font-medium italic max-w-3xl mx-auto">
              Our advisory desk produces restricted technical artifacts for institutional clients on demand.
           </p>
           <div className="pt-10 flex justify-center">
              <Link to="/contact" className="px-16 py-8 bg-[#0a0f1a] text-white rounded-5xl text-ui-caps hover:bg-indigo-600 transition-all duration-700 shadow-2xl flex items-center group">
                 Commission Analysis Node <ArrowRight className="ml-5 group-hover:translate-x-3 transition-transform" />
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
