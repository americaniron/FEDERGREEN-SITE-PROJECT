
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wind, Zap, Rocket, HeartPulse, Building2, Leaf, 
  Cpu, Factory, Coins, Utensils, Clapperboard, Medal,
  ArrowRight, Shield
} from 'lucide-react';

const categories = [
  { id: 'renewable-energy', label: 'Renewable Energy', icon: Wind, desc: 'Solar, Wind, and Hydro-electric infrastructure tranches.' },
  { id: 'ev', label: 'EV', icon: Zap, desc: 'Electric vehicle architecture and battery node development.' },
  { id: 'aerospace', label: 'Aerospace', icon: Rocket, desc: 'Orbital logistics and next-gen propulsion tranches.' },
  { id: 'health-wellness', label: 'Health & Wellness', icon: HeartPulse, desc: 'Biotech, longevity labs, and healthcare infrastructure.' },
  { id: 'real-estate', label: 'Real Estate', icon: Building2, desc: 'Class-A commercial and sovereign-grade developments.' },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf, desc: 'ESG-centric capital nodes and circular economy tranches.' },
  { id: 'tech-robotics', label: 'Technology & Robotics', icon: Cpu, desc: 'AI-driven automation and industrial robotics tranches.' },
  { id: 'manufacturing', label: 'Manufacturing', icon: Factory, desc: 'Automated facility tranches and global supply chains.' },
  { id: 'web3-blockchain', label: 'Web3/Blockchain/Fintech', icon: Coins, desc: 'Digital liquidity programs and decentralized tranches.' },
  { id: 'food-beverage', label: 'Food & Beverage', icon: Utensils, desc: 'Ag-tech scaling and global distribution tranches.' },
  { id: 'film-entertainment', label: 'Film & Entertainment', icon: Clapperboard, desc: 'Slate financing and studio infrastructure tranches.' },
  { id: 'sports-entertainment', label: 'Sports & Entertainment', icon: Medal, desc: 'Arena developments and team ownership tranches.' },
];

const InvestmentCategories: React.FC = () => {
  return (
    <div className="bg-brand-stone min-h-screen py-32 px-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-[2px] bg-brand-primary" />
            <span className="text-brand-primary text-[11px] font-black uppercase tracking-[0.6em]">Membership Protocol</span>
          </div>
          <h1 className="serif text-7xl text-brand-primary font-black leading-[0.9] tracking-tighter mb-10 italic">
            Investment <br/> Categories.
          </h1>
          <p className="text-slate-500 text-2xl max-w-2xl leading-relaxed font-medium italic">
            Federgreen provides exclusive access to these twelve institutional tranches. Membership clearance required for full deal-flow ingestion.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-brand-primary/10 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-brand-stone rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all mb-8 shadow-inner">
                  <cat.icon size={28} />
                </div>
                <h3 className="text-xl text-brand-primary font-black mb-4 italic tracking-tight">{cat.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium italic opacity-60">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-slate-50">
                <Link to="/contact" className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent hover:text-brand-primary transition-colors">
                  Learn More <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="mt-32 p-20 bg-brand-primary text-white rounded-[4rem] relative overflow-hidden shadow-premium">
           <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
             <Shield size={200} />
           </div>
           <div className="relative z-10 max-w-4xl">
              <h2 className="serif text-5xl font-black mb-8 italic tracking-tighter">Request Membership Node.</h2>
              <p className="text-xl text-indigo-100/60 leading-relaxed font-medium italic mb-12">
                Unmapped or cross-sector tranches are available following a private consultation. Access our senior advisory desk to initiate your portfolio hardening sequence.
              </p>
              <Link to="/contact" className="inline-block px-12 py-6 bg-white text-brand-primary rounded-[3rem] font-black uppercase text-[11px] tracking-[0.5em] shadow-2xl hover:bg-brand-accent hover:text-white transition-all duration-700">
                Initiate Clearance Node
              </Link>
           </div>
        </section>
      </div>
    </div>
  );
};

export default InvestmentCategories;
