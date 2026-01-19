
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building, LineChart, Briefcase, Globe, 
  Coins, Zap, Gem, ShieldCheck, ArrowRight 
} from 'lucide-react';

const Funding: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-32 sm:pt-48 pb-20 sm:pb-32 px-6 sm:px-10 lg:px-32 bg-[#fdfdfc] border-b border-slate-50">
        <div className="max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-emerald-800 text-[12px] font-black uppercase tracking-[0.6em] block mb-10 flex items-center">
              <div className="w-16 h-[2px] bg-emerald-800 mr-5" /> Capital Sourcing
            </span>
            <h1 className="serif text-5xl sm:text-7xl md:text-9xl text-[#0a0f1a] font-black mb-12 italic tracking-tighter leading-[0.9]">Liquidity <br/> Tranches.</h1>
            <p className="text-slate-500 text-xl sm:text-2xl leading-relaxed max-w-3xl font-medium italic opacity-80">
              Strategic capital architecture from traditional senior debt to digital collateral trade programs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 sm:py-48 px-6 sm:px-10 lg:px-32">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'debt', label: 'Debt', icon: Building, path: '/funding-debt' },
              { id: 'equity', label: 'Equity', icon: LineChart, path: '/funding-equity' },
              { id: 'private-funds', label: 'Private Funds', icon: Briefcase, path: '/funding-private-funds' },
              { id: 'new-world', label: 'New World of Finance', icon: Globe, path: '/new-world-finance', highlight: true }
            ].map((node) => (
              <Link key={node.id} to={node.path} className={`p-10 rounded-[3rem] border transition-all duration-700 flex flex-col items-center text-center group ${node.highlight ? 'bg-[#0a0f1a] text-white border-transparent' : 'bg-[#fcfcfb] border-slate-100 hover:shadow-2xl'}`}>
                <node.icon size={40} className={`mb-10 ${node.highlight ? 'text-emerald-400' : 'text-slate-300 group-hover:text-[#0a0f1a]'}`} />
                <h3 className="text-2xl font-black italic tracking-tight">{node.label}</h3>
                <div className={`mt-10 p-3 rounded-full border ${node.highlight ? 'border-emerald-400/20 text-emerald-400' : 'border-slate-100 text-slate-300 group-hover:bg-[#0a0f1a] group-hover:text-white group-hover:border-[#0a0f1a]'} transition-all`}>
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Funding;
