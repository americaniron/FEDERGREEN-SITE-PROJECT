
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Landmark, Target, Zap, 
  Globe, Scale, Search, Users, TrendingUp,
  Activity, BarChart3, Database, FileCheck, Layers, Binary,
  Shield, Cpu
} from 'lucide-react';

const ServiceNode = ({ icon: Icon, title, desc, outcome, path, accent }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="group relative bg-white border border-slate-100 p-12 rounded-[3.5rem] hover:bg-white hover:shadow-2xl transition-all duration-1000 flex flex-col h-full overflow-hidden"
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
        
        <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 bg-brand-stone border border-slate-50 rounded-3xl flex items-center justify-center text-slate-300 group-hover:text-brand-primary shadow-sm transition-all duration-700 mb-12">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            
            <div className="flex-1">
                <h3 className="serif text-3xl font-black text-brand-primary mb-6 italic tracking-tight group-hover:text-brand-primary transition-colors">{title}.</h3>
                <p className="text-slate-500 text-[17px] leading-relaxed font-medium italic opacity-80 mb-10">{desc}</p>
            </div>

            <div className="mt-auto space-y-8 pt-8 border-t border-slate-100/50">
                <div>
                    <p className="text-ui-caps text-indigo-300 mb-3">Strategic Outcome</p>
                    <p className="text-sm font-black text-brand-primary leading-tight italic">{outcome}</p>
                </div>
                <Link to={path} className="flex items-center text-brand-primary font-black text-ui-caps group-hover:translate-x-4 transition-transform duration-700">
                    Access Node <ArrowRight size={14} className="ml-3" />
                </Link>
            </div>
        </div>
    </motion.div>
);

const Services: React.FC = () => {
  const serviceClusters = [
    {
      title: "Capital Advisory Node",
      icon: Landmark,
      nodes: [
        { icon: TrendingUp, title: "Raising Capital", desc: "Orchestrating sophisticated equity and debt tranches from institutional and sovereign liquidity pools.", outcome: "Optimized WACC and minimized dilution artifacts.", path: "/raising-capital", accent: "from-brand-primary/5 to-transparent" },
        { icon: ShieldCheck, title: "Risk Mitigation", desc: "Deploying algorithmic threat-neutralizing strategies to safeguard global asset tranches from black-swan events.", outcome: "Hardened downside protection in fluid economies.", path: "/risk-mitigation", accent: "from-brand-emerald/5 to-transparent" },
        { icon: Activity, title: "Secured Depositors", desc: "Fixed-yield institutional instruments with triple-redundant bank-grade collateral security.", outcome: "Superior low-volatility liquidity growth.", path: "/secured-depositor-programs", accent: "from-brand-primary/5 to-transparent" }
      ]
    },
    {
      title: "Strategy & Intelligence Cluster",
      icon: Binary,
      nodes: [
        { icon: Target, title: "Enterprise Strategy", desc: "Board-level navigation through complex multi-jurisdictional scaling and market arbitrage tranches.", outcome: "Architected multi-generational strategic clarity.", path: "/strategy", accent: "from-brand-primary/5 to-transparent" },
        { icon: Globe, title: "Scaling Nodes", desc: "Mapping localized liquidity sensors and regulatory tranches for rapid international expansion.", outcome: "Reduced friction for global market entry.", path: "/scaling-businesses", accent: "from-brand-emerald/5 to-transparent" },
        { icon: Search, title: "Institutional Analysis", desc: "Real-time heuristic sensing of global capital flows and sovereign policy shifts affecting AUM.", outcome: "Deep-node intelligence for decision velocity.", path: "/analysis", accent: "from-brand-primary/5 to-transparent" }
      ]
    },
    {
      title: "Compliance & Trust Protocol",
      icon: Layers,
      nodes: [
        { icon: Shield, title: "KYC/AML Tranches", desc: "Tier-1 digital identity onboarding with AES-256 GCM encrypted data residency.", outcome: "Absolute institutional integrity verification.", path: "/kyc-node", accent: "from-brand-emerald/5 to-transparent" },
        { icon: FileCheck, title: "Due Diligence Node", desc: "Exhaustive counterparty and asset vetting via proprietary FEDERGREEN-3 deep-scan tranches.", outcome: "Eliminated informational asymmetry in M&A.", path: "/due-diligence", accent: "from-brand-primary/5 to-transparent" },
        { icon: BarChart3, title: "Entity Valuations", desc: "Algorithmic assessment of enterprise value grounded in real-time sector-specific news news and news news news grounding.", outcome: "Audit-ready institutional valuation artifacts.", path: "/valuation", accent: "from-brand-emerald/5 to-transparent" }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-32 lg:pt-48 pb-20 lg:pb-32 px-10 lg:px-32 bg-brand-stone border-b border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-40 opacity-[0.015] pointer-events-none transform scale-150 rotate-45"><Database size={600} /></div>
        <div className="max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-brand-emerald text-ui-caps block mb-10 flex items-center">
              <div className="w-16 h-[2px] bg-brand-emerald mr-5" /> Operational Intelligence
            </span>
            <h1 className="serif text-6xl lg:text-9xl text-brand-primary font-black mb-12 italic tracking-tighter leading-[0.9]">Institutional <br/> Mapping.</h1>
            <p className="text-slate-500 text-2xl leading-relaxed max-w-3xl font-medium italic opacity-80">
              Federgreen Consulting operates at the highest tranches of corporate strategy. We provide the structural logic required for high-stakes capital navigation.
            </p>
          </motion.div>
        </div>
      </section>

      {serviceClusters.map((cluster, i) => (
        <section key={i} className={`py-32 lg:py-48 px-10 lg:px-32 ${i % 2 === 0 ? 'bg-white' : 'bg-brand-stone border-y border-slate-50'}`}>
          <div className="section-container">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
                <div className="max-w-2xl">
                    <div className="flex items-center space-x-6 mb-10">
                        <cluster.icon className="text-brand-primary" size={24} />
                        <span className="text-ui-caps text-brand-primary tracking-[0.4em]">{cluster.title}</span>
                    </div>
                    <h2 className="serif text-5xl lg:text-6xl text-brand-primary font-black italic tracking-tighter leading-tight">Commanding {cluster.title.split(' ')[0]} tranches.</h2>
                </div>
                <div className="lg:max-w-md">
                    <p className="text-slate-400 text-xl font-medium italic leading-relaxed">
                        Architecting the environment where institutional capital thrives through rigorous structural nodes.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {cluster.nodes.map((node, j) => (
                <ServiceNode key={j} {...node} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-48 px-10 lg:px-32 bg-brand-primary text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="section-container space-y-16 relative z-10">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <Cpu className="w-24 h-24 text-brand-accent mx-auto animate-pulse mb-12 shadow-[0_0_64px_rgba(197,160,89,0.3)]" />
          </motion.div>
          <h2 className="serif italic text-white leading-none tracking-tighter">Initiate Briefing Node.</h2>
          <p className="text-white/60 text-2xl leading-relaxed max-w-4xl mx-auto font-light italic">Accepted institutional engagements follow a rigorous structural vetting process.</p>
          <div className="flex justify-center pt-16">
            <Link to="/contact" className="px-16 py-8 bg-brand-accent text-white rounded-5xl text-ui-caps hover:bg-white hover:text-brand-primary transition-all duration-[0.7s] shadow-2xl flex items-center group">
                Apply Consultation Node 
                <ArrowRight className="ml-5 group-hover:translate-x-4 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
