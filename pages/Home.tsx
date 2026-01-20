
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, Zap, Shield, Globe, 
  Target, BarChart3, Lock,
  Briefcase, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="bg-brand-stone flex flex-col min-h-screen">
      {/* Universal Institutional Entry (Hero) */}
      <section className="relative min-h-[70vh] lg:h-[75vh] flex items-center px-6 md:px-16 lg:px-32 xl:px-48 overflow-hidden bg-brand-primary py-24 lg:py-0">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 grayscale scale-[1.05]">
            <source src="https://player.vimeo.com/external/517090025.hd.mp4?s=07e77b63c8736e4f1659a35e4e89f816c14e135e&profile_id=172&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/40 via-brand-primary/95 to-brand-stone" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="section-container relative z-10 text-center lg:text-left"
        >
          <div className="inline-flex items-center space-x-4 md:space-x-6 px-6 md:px-10 py-3 md:py-4 bg-brand-stone/10 border border-brand-stone/20 rounded-full backdrop-blur-3xl shadow-2xl mb-12 lg:mb-16">
            <div className="w-2 md:w-3 h-2 md:h-3 bg-brand-accent rounded-full animate-pulse shadow-[0_0_24px_rgba(184,145,80,0.8)]" />
            <span className="text-[9px] md:text-[11px] font-black text-brand-stone/90 uppercase tracking-[0.5em]">Institutional Node Protocol Active</span>
          </div>
          
          <h1 className="serif text-brand-stone leading-[0.9] tracking-tightest mb-8 md:mb-10 italic">
            Institutional <br />
            <span className="text-brand-accent">Alpha.</span>
          </h1>
          
          <p className="text-brand-stone/70 text-xl md:text-3xl lg:text-4xl max-w-4xl leading-snug font-light italic tracking-tight mx-auto lg:mx-0">
            Sovereign-grade capital architecture and institutional liquidity tranches for global enterprises and strategic syndicates.
          </p>
        </motion.div>
      </section>

      {/* Primary Dual Pillar Section */}
      <section className="flex flex-col lg:flex-row min-h-screen">
        
        {/* PILLAR 1: SOVEREIGN CLIENTS */}
        <motion.div 
          initial={{ opacity: 0, x: -64 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 bg-white p-8 md:p-16 lg:p-32 xl:p-40 border-r border-brand-stone/60 flex flex-col justify-between group transition-colors duration-1000 hover:bg-brand-stone/30"
        >
          <div className="space-y-12 lg:space-y-16">
            <div className="flex items-center justify-between">
              <div className="w-16 md:w-20 h-16 md:h-20 bg-brand-stone rounded-2xl md:rounded-3xl flex items-center justify-center text-brand-primary shadow-inner group-hover:rotate-12 transition-transform duration-700 border border-brand-accent/20">
                <Landmark size={32} className="md:w-10 md:h-10" />
              </div>
              <span className="text-brand-slate text-[9px] md:text-[11px] font-black uppercase tracking-[0.6em] opacity-50">Client Mandate</span>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h2 className="serif text-brand-primary tracking-tightest leading-none italic">Sovereign <br/> Clients.</h2>
              <p className="text-brand-slate text-lg md:text-2xl font-medium italic leading-relaxed tracking-tight max-w-xl">
                For enterprises and high-growth founders navigating complex regulatory tranches and institutional capital requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:gap-8 pt-4 md:pt-8">
              {[
                { icon: BarChart3, label: "Capital Stack Optimization", desc: "Refining institutional debt/equity tranches for maximum enterprise velocity." },
                { icon: Shield, label: "Compliance Node Hardening", desc: "Tier-1 KYC/AML protocol mapping for global market ingestion." },
                { icon: Zap, label: "Strategic Scaling Roadmap", desc: "Multi-generational architecture for sovereign-grade expansion." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4 md:space-x-6">
                  <div className="mt-1 flex-shrink-0"><item.icon size={20} className="md:w-6 md:h-6 text-brand-accent-deep" /></div>
                  <div>
                    <p className="font-black text-brand-primary uppercase tracking-widest text-[10px] md:text-[12px]">{item.label}</p>
                    <p className="text-brand-slate text-sm md:text-base italic font-medium opacity-70 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-16 md:pt-24 space-y-4">
            <Link 
              to="/services" 
              className="w-full py-5 md:py-7 bg-brand-stone border border-brand-primary/15 text-brand-primary rounded-3xl md:rounded-[3rem] font-black uppercase text-[9px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] flex items-center justify-center hover:bg-white hover:border-brand-accent transition-all duration-700 group/link"
            >
              <Activity className="mr-4 md:mr-6 group-hover/link:rotate-90 transition-transform" size={20} md:size={24} />
              Initiate Strategic Advisory
            </Link>
            <div className="grid grid-cols-2 gap-4">
               <Link to="/client-portal/signup" className="py-4 md:py-6 bg-brand-primary text-brand-stone rounded-3xl md:rounded-[3rem] font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em] flex items-center justify-center hover:bg-brand-primary-dark transition-all">Enroll</Link>
               <Link to="/client-portal/login" className="py-4 md:py-6 bg-brand-stone/50 border border-brand-stone text-brand-primary rounded-3xl md:rounded-[3rem] font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em] flex items-center justify-center hover:bg-white transition-all">Portal</Link>
            </div>
          </div>
        </motion.div>

        {/* PILLAR 2: INSTITUTIONAL INVESTORS */}
        <motion.div 
          initial={{ opacity: 0, x: 64 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 bg-brand-primary p-8 md:p-16 lg:p-32 xl:p-40 text-brand-stone flex flex-col justify-between group transition-colors duration-1000 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none transform translate-x-1/2 translate-y-1/2 text-brand-accent">
            <Globe size={800} />
          </div>

          <div className="space-y-12 lg:space-y-16 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-16 md:w-20 h-16 md:h-20 bg-brand-stone/5 border border-brand-accent/30 rounded-2xl md:rounded-3xl flex items-center justify-center text-brand-accent backdrop-blur-3xl shadow-2xl group-hover:-rotate-12 transition-transform duration-700">
                <Target size={32} className="md:w-10 md:h-10" />
              </div>
              <span className="text-brand-stone/40 text-[9px] md:text-[11px] font-black uppercase tracking-[0.6em]">Investor Mandate</span>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h2 className="serif text-brand-stone tracking-tightest leading-none italic text-brand-accent">Institutional <br/> Investors.</h2>
              <p className="text-brand-stone/70 text-lg md:text-2xl font-medium italic leading-relaxed tracking-tight max-w-xl">
                For family offices and institutional syndicates seeking risk-weighted alpha and sovereign-grade deal flow.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:gap-8 pt-4 md:pt-8">
              {[
                { icon: Briefcase, label: "Alpha-Centric Deal Flow", desc: "Exclusive access to vetted institutional tranches on a global scale." },
                { icon: BarChart3, label: "Risk-Weighted Telemetry", desc: "Real-time institutional-grade performance and yield tracking." },
                { icon: Lock, label: "Managed Trade Nodes", desc: "Secure liquidity programs with triple-redundant asset protection." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4 md:space-x-6">
                  <div className="mt-1 flex-shrink-0"><item.icon size={20} className="md:w-6 md:h-6 text-brand-accent" /></div>
                  <div>
                    <p className="font-black text-brand-stone uppercase tracking-widest text-[10px] md:text-[12px]">{item.label}</p>
                    <p className="text-brand-stone/50 text-sm md:text-base italic font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-16 md:pt-24 space-y-4 relative z-10">
            <Link 
              to="/investors" 
              className="w-full py-5 md:py-7 bg-brand-accent/15 border border-brand-accent/30 text-brand-accent rounded-3xl md:rounded-[3rem] font-black uppercase text-[9px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all duration-700 group/link"
            >
              <Globe className="mr-4 md:mr-6 group-hover/link:scale-110 transition-transform" size={20} md:size={24} />
              Access Institutional Hub
            </Link>
            <div className="grid grid-cols-2 gap-4">
               <Link to="/investor-portal/signup" className="py-4 md:py-6 bg-brand-accent text-brand-primary rounded-3xl md:rounded-[3rem] font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em] flex items-center justify-center hover:bg-brand-stone transition-all">Enroll</Link>
               <Link to="/investor-portal/login" className="py-4 md:py-6 bg-white/5 border border-white/15 text-brand-stone rounded-3xl md:rounded-[3rem] font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em] flex items-center justify-center hover:bg-white/15 transition-all">Portal</Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
