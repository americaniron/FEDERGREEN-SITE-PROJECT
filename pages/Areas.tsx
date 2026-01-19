
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, Cpu, Stethoscope, Medal, Wind, Leaf, Utensils, 
  Gem, Rocket, Clapperboard, Pickaxe, Factory, ChevronRight, 
  ShieldCheck, TrendingUp, ArrowRight 
} from 'lucide-react';
import NodeDiscovery from '../components/NodeDiscovery';

const Areas: React.FC = () => {
  const sectors = [
    { 
      id: 'real-estate', 
      label: 'Real Estate', 
      icon: Building2, 
      path: '/area-real-estate',
      detail: 'Architecting mezzanine debt tranches for Class-A commercial developments and institutional-grade multi-family underwriting.'
    },
    { 
      id: 'technology', 
      label: 'Technology', 
      icon: Cpu, 
      path: '/area-technology',
      detail: 'Cap table optimization for Series B+ entities and visionary mapping for AI-driven operational nodes and fintech liquidity tranches.'
    },
    { 
      id: 'health', 
      label: 'Health', 
      icon: Stethoscope, 
      path: '/area-health',
      detail: 'Biotech R&D funding and specialized medical facility underwriting. Navigating complex regulatory tranches for longevity capital.'
    },
    { 
      id: 'sports', 
      label: 'Sports', 
      icon: Medal, 
      path: '/area-sports',
      detail: 'Stadium infrastructure bonds and team asset valuation. Architecting the capital environment for global performance and media rights.'
    },
    { 
      id: 'renewable-energy', 
      label: 'Renewable Energy', 
      icon: Wind, 
      path: '/area-renewable-energy',
      detail: 'Green bond issuance and project yield modeling for wind/solar tranches. Strategic alignment with sovereign ESG-aligned capital sources.'
    },
    { 
      id: 'sustainability', 
      label: 'Sustainability', 
      icon: Leaf, 
      path: '/area-sustainability',
      detail: 'Corporate ESG pivot advisory and impact reporting nodes. Unlocking green debt tranches for legacy manufacturing sectors.'
    },
    { 
      id: 'food-beverage', 
      label: 'Food & Beverage', 
      icon: Utensils, 
      path: '/area-food-beverage',
      detail: 'Ag-tech scaling rounds and global export distribution architecture. Brand valuation for legacy estates and flavor profile nodes.'
    },
    { 
      id: 'fashion-beauty', 
      label: 'Fashion & Beauty', 
      icon: Gem, 
      path: '/area-fashion-beauty',
      detail: 'Luxury brand exit advisory and institutional e-commerce scaling. Monetization of aesthetic brand equity in global lifestyle markets.'
    },
    { 
      id: 'aerospace', 
      label: 'Aerospace', 
      icon: Rocket, 
      path: '/area-aerospace',
      detail: 'Orbital logistics funding and defense contractor debt tranches. Navigating ITAR/EAR compliant financial environments with absolute integrity.'
    },
    { 
      id: 'film-entertainment', 
      label: 'Film & Entertainment', 
      icon: Clapperboard, 
      path: '/area-film-entertainment',
      detail: 'Multi-film slate funding and IP monetization strategy. Architecting studio-level infrastructure and narrative economy tranches.'
    },
    { 
      id: 'mining', 
      label: 'Mining', 
      icon: Pickaxe, 
      path: '/area-mining',
      detail: 'Critical mineral trade programs and heavy machinery debt tranches. Exploration node viability audits for high-yield commodity corridors.'
    },
    { 
      id: 'manufacturing', 
      label: 'Manufacturing/Distribution', 
      icon: Factory, 
      path: '/area-manufacturing',
      detail: 'Automated facility scaling and global supply chain node mapping. Industrial-grade operational yield optimization for mature enterprises.'
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-32 sm:pt-48 pb-20 sm:pb-32 px-6 sm:px-10 lg:px-32 bg-[#fdfdfc] border-b border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-40 opacity-[0.015] pointer-events-none transform scale-150 rotate-45">
          <Building2 size={600} />
        </div>
        <div className="max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-indigo-600 text-[12px] font-black uppercase tracking-[0.6em] block mb-10 flex items-center">
              <div className="w-16 h-[2px] bg-indigo-600 mr-5" /> Geographic Coverage
            </span>
            <h1 className="serif text-5xl sm:text-7xl md:text-9xl text-[#0a0f1a] font-black mb-12 italic tracking-tighter leading-[0.9]">Market <br/> Verticals.</h1>
            <p className="text-slate-500 text-xl sm:text-2xl leading-relaxed max-w-3xl font-medium italic opacity-80">
              Federgreen Coverage spans 12 core institutional nodes. We provide the structural logic and sector-specific artifacts required for high-velocity capital deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Institutional Node Locator Section */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-32 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-20">
             <NodeDiscovery />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-48 px-6 sm:px-10 lg:px-32 bg-white">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-12">
          {sectors.map((sector, i) => (
            <motion.div 
              key={sector.id} 
              initial={{ opacity: 0, y: 32 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-10 sm:p-14 bg-[#fcfcfb] rounded-[3rem] sm:rounded-[4rem] border border-slate-100 hover:bg-white hover:shadow-[0_96px_192px_-48px_rgba(10,15,26,0.12)] transition-all duration-1000 relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-[0.03] transition-all duration-[2s] -translate-y-8 group-hover:translate-y-0 group-hover:rotate-12 transform scale-150">
                <sector.icon size={120} />
              </div>
              
              <Link to={sector.path} className="flex-1 flex flex-col space-y-10 relative z-10">
                <div className="w-20 h-20 bg-white border border-slate-50 rounded-[1.8rem] flex items-center justify-center text-slate-300 group-hover:text-indigo-600 shadow-sm transition-all duration-[1s] group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl active:scale-95">
                  <sector.icon size={36} strokeWidth={1.5} />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl sm:text-4xl text-[#0a0f1a] font-black italic tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                    {sector.label}.
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                    {sector.detail}
                  </p>
                </div>

                <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center text-indigo-600 font-black text-[11px] uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 duration-700">
                    Access Node <ChevronRight className="ml-2" size={14} />
                  </div>
                  <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Sector Ref: FC-{sector.id.toUpperCase().slice(0, 3)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ESG Advisory Section */}
      <section className="py-32 sm:py-40 px-6 sm:px-10 lg:px-32 bg-[#fdfdfc] border-t border-slate-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -48 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex items-center space-x-6">
                <div className="w-16 h-[2px] bg-emerald-700 shadow-sm" />
                <span className="text-emerald-700 text-ui-caps">Sustainability Node</span>
              </div>
              <h2 className="serif italic text-5xl sm:text-6xl text-[#0a0f1a] font-black tracking-tighter leading-tight">
                ESG & Green Capital Architecture.
              </h2>
              <p className="text-slate-500 text-2xl leading-relaxed font-medium italic opacity-80">
                We guide enterprises through the complex transition to sustainable operational models, unlocking access to dedicated green capital tranches and hardening long-term institutional value.
              </p>
              <div className="space-y-8 pt-8">
                {[
                  { icon: Leaf, title: "Green Bond Issuance & Structuring", desc: "Architecting bankable green bonds that meet stringent institutional criteria." },
                  { icon: ShieldCheck, title: "ESG Reporting & Compliance Node", desc: "Ensuring your sustainability metrics align with global standards like SASB and TCFD." },
                  { icon: TrendingUp, title: "Impact Metric Optimization", desc: "Translating sustainable practices into quantifiable data that attracts premium capital." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                      <item.icon className="text-emerald-700" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-[#0a0f1a] tracking-tight">{item.title}</h4>
                      <p className="text-slate-400 text-sm font-medium italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
               <div className="pt-12">
                <Link to="/contact" className="inline-flex items-center space-x-6 text-emerald-700 text-ui-caps group hover:translate-x-4 transition-all duration-700">
                    <span>Access Green Capital Node</span>
                    <div className="w-12 h-px bg-emerald-700 group-hover:w-20 transition-all duration-700" />
                    <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="lg:w-full w-full"
            >
              <div className="aspect-square bg-[#0a0f1a] rounded-6xl p-16 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50" />
                <div className="flex justify-between items-start z-10">
                  <h3 className="text-ui-caps text-emerald-400 tracking-[0.6em]">Impact Yield</h3>
                  <Leaf size={24} className="text-emerald-400/30" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-end gap-4 h-48">
                    <motion.div initial={{ height: '10%' }} whileInView={{ height: '40%' }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} className="w-full bg-emerald-400/20 rounded-t-2xl border-t-2 border-emerald-400" />
                    <motion.div initial={{ height: '20%' }} whileInView={{ height: '60%' }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }} className="w-full bg-emerald-400/20 rounded-t-2xl border-t-2 border-emerald-400" />
                    <motion.div initial={{ height: '15%' }} whileInView={{ height: '50%' }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }} className="w-full bg-emerald-400/20 rounded-t-2xl border-t-2 border-emerald-400" />
                    <motion.div initial={{ height: '30%' }} whileInView={{ height: '80%' }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }} className="w-full bg-emerald-400 rounded-t-2xl border-t-2 border-emerald-400" />
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between text-[10px] font-mono text-white/30">
                    <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                  </div>
                </div>
                <p className="text-ui-caps text-white/20 text-center z-10 tracking-[0.8em]">Metric Velocity</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institutional Note Tranche */}
      <section className="py-32 sm:py-48 px-6 sm:px-10 lg:px-32 bg-[#0a0f1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="serif text-5xl sm:text-6xl text-white font-black italic tracking-tighter mb-10 leading-tight">
              Cross-Sector <br/> Fluidity.
            </h2>
            <p className="text-indigo-100/40 text-2xl font-light italic leading-relaxed mb-16 mx-auto max-w-2xl">
              We specialize in the convergence of sectors—where technology meets aerospace, or renewable energy tranches intersect with large-scale real estate.
            </p>
            <Link to="/contact" className="inline-flex items-center px-16 py-8 bg-white text-[#0a0f1a] rounded-full font-black text-[12px] uppercase tracking-[0.5em] hover:bg-emerald-400 hover:text-white transition-all duration-[0.8s] shadow-2xl active:scale-95 group">
              Consult Advisory Node 
              <ChevronRight className="ml-4 group-hover:translate-x-2 transition-transform" size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Areas;
