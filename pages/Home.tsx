
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Globe, Landmark, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-[#fafaf9]">
      {/* Sovereign Hero Section */}
      <section className="relative min-h-[95vh] flex items-center px-10 lg:px-32 overflow-hidden">
        {/* Premium Background Node */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.02] filter brightness-[0.85] saturate-[0.75] contrast-[1.05]">
            <source src="https://player.vimeo.com/external/517090025.hd.mp4?s=07e77b63c8736e4f1659a35e4e89f816c14e135e&profile_id=172&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/30 to-transparent" />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        </div>

        <motion.div 
          variants={containerVariants} initial="hidden" animate="visible"
          className="max-w-6xl relative z-10 py-32"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-4 px-6 py-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-2xl shadow-2xl mb-12">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.6)]" />
            <span className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Institutional Node Protocol: 04-B</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="serif text-8xl md:text-[10rem] text-white font-black leading-[0.85] tracking-tighter mb-12">
            Global <br />
            <span className="text-emerald-400">Capital.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-slate-100/70 text-2xl md:text-3xl max-w-2xl leading-relaxed font-light mb-16">
            Architecting high-stakes capital structures and navigating sovereign regulatory tranches for the next generation of global visionaries.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8">
            <Link to="/contact" className="px-14 py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.5em] flex items-center justify-center group hover:bg-white hover:text-slate-900 transition-all duration-500 shadow-2xl shadow-indigo-600/30">
              Initiate Briefing
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
            <Link to="/work" className="px-14 py-7 bg-white/5 border border-white/20 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.5em] flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-3xl group">
              View Case Files
              <Zap className="ml-3 text-emerald-400 group-hover:scale-125 transition-transform" size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Global Node Telemetry */}
        <div className="absolute bottom-16 right-16 hidden xl:flex space-x-20">
          {[
            { label: 'Advised AUM', val: '$2.1B+' },
            { label: 'Sovereign Nodes', val: '14 Active' },
            { label: 'Target Alpha', val: '18.4%' }
          ].map((m, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + (i * 0.1) }}
              className="text-right border-r border-white/10 pr-12 last:border-r-0"
            >
              <p className="text-[10px] text-white/40 uppercase tracking-[0.5em] mb-3 font-black">{m.label}</p>
              <p className="text-4xl text-white font-black tracking-tighter">{m.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expertise Tranche Section */}
      <section className="py-40 px-10 lg:px-32 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-32">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-emerald-700 text-[11px] font-black uppercase tracking-[0.6em] block mb-8 flex items-center">
                <div className="w-12 h-[2px] bg-emerald-700 mr-4" /> Global Advisory Node
              </span>
              <h2 className="serif text-7xl text-slate-950 font-black leading-tight tracking-tighter">Navigating High-Stakes <br/> Complexity.</h2>
            </motion.div>
            <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-slate-400 text-xl leading-relaxed max-w-lg mb-4">
              We operate exclusively at the intersection of traditional institutional finance and the high-velocity digital frontier. Our proprietary mapping provides clarity where others see opacity.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Landmark, 
                title: 'Capital Advisory', 
                desc: 'Bespoke debt and equity tranches for global infrastructure and trade development programs.',
                path: '/services#capital-advisory',
                accent: 'bg-indigo-50 text-indigo-600'
              },
              { 
                icon: Shield, 
                title: 'Compliance Node', 
                desc: 'Tier-1 KYC/AML/CTF protocols ensuring absolute institutional-grade counterparty integrity.',
                path: '/kyc',
                accent: 'bg-emerald-50 text-emerald-600'
              },
              { 
                icon: Globe, 
                title: 'Global Markets', 
                desc: 'Deep-market liquidity sentiment mapping across digital and legacy asset classes globally.',
                path: '/areas',
                accent: 'bg-slate-900 text-white'
              }
            ].map((item, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-16 bg-[#fafaf9] rounded-[3rem] border border-slate-100 hover:bg-white hover:border-indigo-600/30 transition-all duration-700 hover:shadow-[0_48px_128px_-32px_rgba(0,0,0,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <TrendingUp className="text-indigo-100" size={120} />
                </div>
                <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-12 shadow-sm transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${item.accent}`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-3xl text-slate-950 font-black mb-8 group-hover:text-indigo-600 transition-colors tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium opacity-80 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                <Link to={item.path} className="flex items-center text-indigo-600 font-black text-[11px] uppercase tracking-[0.4em] group-hover:translate-x-4 transition-transform">
                  Access Node <ArrowRight className="ml-3" size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sovereign Call-to-Action */}
      <section className="py-48 px-10 lg:px-32 bg-slate-950 text-white relative overflow-hidden">
        {/* Advanced Grid Visual */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-5xl mx-auto text-center space-y-16 relative z-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
            <Star className="w-20 h-20 text-emerald-400 mx-auto animate-pulse mb-12" />
          </motion.h2>
          <h2 className="serif text-7xl md:text-9xl font-black leading-tight tracking-tighter">Architect your <br/> sovereign growth.</h2>
          <p className="text-emerald-100/60 text-2xl leading-relaxed max-w-3xl mx-auto font-light">
            Federgreen Consulting Group accepts high-net-worth individual and institutional engagements following a rigorous internal vetting process.
          </p>
          <div className="flex justify-center pt-12">
            <Link to="/contact" className="px-16 py-8 bg-white text-slate-950 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.6em] hover:bg-emerald-400 hover:text-white transition-all duration-700 shadow-[0_32px_96px_-16px_rgba(255,255,255,0.2)]">
              Apply for Consultation Node
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
