
import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, ShieldCheck, Target, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-48 pb-32 px-10 lg:px-32 bg-[#fdfdfc] border-b border-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <div className="flex items-center space-x-6 mb-12">
                    <span className="w-16 h-[2px] bg-indigo-600 shadow-sm"></span>
                    <span className="text-indigo-600 text-[12px] font-black uppercase tracking-[0.6em]">Our Legacy Node</span>
                </div>
                <h1 className="serif text-7xl md:text-8xl font-black text-[#0a0f1a] mb-12 leading-[0.9] tracking-tighter italic">Empowering Vision <br/><span className="text-indigo-600">Through Capital.</span></h1>
                <div className="space-y-8 text-2xl text-slate-500 leading-relaxed font-medium italic opacity-90">
                  <p>
                    Federgreen Consulting was founded with a singular mission: to provide sophisticated financial architecture for global visionaries.
                  </p>
                  <p>
                    Led by Davina Federgreen, our firm bridges the gap between traditional institutional capital and the emerging world of digital asset tranches.
                  </p>
                </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="aspect-square bg-slate-100 rounded-[5rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)] group">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop" alt="Executive team" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay" />
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="absolute -bottom-12 -right-12 bg-indigo-600 text-white p-12 rounded-[3.5rem] shadow-[0_48px_96px_-24px_rgba(79,70,229,0.5)] max-w-xs border-4 border-white relative z-10">
                <p className="text-5xl font-black mb-4 italic tracking-tighter">20+</p>
                <p className="text-sm font-black uppercase tracking-[0.4em] opacity-80 leading-relaxed">Years of Institutional Financial Expertise.</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-48 px-10 lg:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Landmark, title: "Capital Logic", desc: "Every structure is built on a foundation of rigorous mathematical tranches." },
              { icon: ShieldCheck, title: "Sovereign Trust", desc: "Absolute discretion and multi-layer security for every engagement node." },
              { icon: Target, title: "Yield Alpha", desc: "Identifying asymmetric opportunities where risk is mitigated by structural design." },
              { icon: Globe, title: "Fluid Markets", desc: "Global reach with localized node intelligence in every major financial corridor." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="group">
                <div className="w-16 h-16 bg-[#fdfdfc] border border-slate-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#0a0f1a] transition-all duration-700 group-hover:shadow-2xl">
                  <item.icon className="text-slate-400 group-hover:text-emerald-400 transition-colors" size={28} />
                </div>
                <h3 className="text-2xl text-[#0a0f1a] font-black mb-4 italic tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium italic opacity-80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Tranche */}
      <section className="py-48 px-10 lg:px-32 bg-[#0a0f1a] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
           <div className="lg:w-1/2">
              <span className="text-emerald-400 text-[12px] font-black uppercase tracking-[0.6em] block mb-10">Strategic Command</span>
              <h2 className="serif text-7xl md:text-8xl font-black mb-12 italic tracking-tighter leading-[0.9]">Davina <br/> Federgreen.</h2>
              <p className="text-indigo-100/60 text-2xl leading-relaxed font-light italic mb-12">
                "We don't just find capital; we architect the environment where capital thrives. In the new world of fluid finance, structural integrity is the only true currency."
              </p>
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-emerald-400"><Globe size={20}/></div>
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Sovereign Principal & Architect</span>
              </div>
           </div>
           <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] bg-white/5 rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60 z-10" />
                <div className="w-full h-full bg-slate-800 animate-pulse opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="text-[10px] font-black uppercase tracking-[1em] text-white/20">Classified Artifact</span>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
