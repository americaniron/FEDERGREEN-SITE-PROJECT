
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Landmark, Target, Zap, 
  Globe, Scale, Search, Users, TrendingUp 
} from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-32 sm:pt-48 pb-20 sm:pb-32 px-6 sm:px-10 lg:px-32 bg-[#fdfdfc] border-b border-slate-50">
        <div className="max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-emerald-800 text-[12px] font-black uppercase tracking-[0.6em] block mb-10 flex items-center">
              <div className="w-16 h-[2px] bg-emerald-800 mr-5" /> Operational Intelligence
            </span>
            <h1 className="serif text-5xl sm:text-7xl md:text-9xl text-[#0a0f1a] font-black mb-12 italic tracking-tighter leading-[0.9]">Consulting <br/> Frameworks.</h1>
            <p className="text-slate-500 text-xl sm:text-2xl leading-relaxed max-w-3xl font-medium italic opacity-80">
              Institutional mapping for a fluid global economy. We provide the structural logic required for high-stakes capital navigation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hub Categories */}
      <section className="py-24 sm:py-48 px-6 sm:px-10 lg:px-32 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-10 sm:p-16 bg-[#fcfcfb] rounded-[3rem] sm:rounded-[4rem] border border-slate-100 hover:shadow-2xl transition-all duration-700"
          >
            <Landmark className="text-emerald-600 mb-12" size={48} />
            <h2 className="serif text-4xl sm:text-6xl text-[#0a0f1a] font-black mb-8 italic tracking-tighter">Capital <br/> Advisory.</h2>
            <p className="text-slate-500 text-lg sm:text-xl leading-relaxed mb-12 italic font-medium">Bespoke financial architecture including raising capital, risk mitigation, and secured depositor programs.</p>
            <Link to="/capital-advisory" className="inline-flex items-center space-x-4 text-emerald-600 font-black text-[12px] uppercase tracking-[0.6em] group hover:translate-x-4 transition-transform duration-500">
              <span>Access Advisory Node</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-10 sm:p-16 bg-[#0a0f1a] rounded-[3rem] sm:rounded-[4rem] text-white hover:shadow-2xl transition-all duration-700"
          >
            <Zap className="text-emerald-400 mb-12" size={48} />
            <h2 className="serif text-4xl sm:text-6xl font-black mb-8 italic tracking-tighter">Enterprise <br/> Strategy.</h2>
            <p className="text-indigo-100/60 text-lg sm:text-xl leading-relaxed mb-12 italic font-light">Long-term enterprise navigation, market arbitrage, and alpha-structuring for legacy planning.</p>
            <Link to="/strategy" className="inline-flex items-center space-x-4 text-emerald-400 font-black text-[12px] uppercase tracking-[0.6em] group hover:translate-x-4 transition-transform duration-500">
              <span>Access Strategy Node</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
