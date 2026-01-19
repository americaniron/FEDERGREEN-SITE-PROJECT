
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ShieldCheck, History, Download, Send, CheckCircle, Search, Layers } from 'lucide-react';

const Newsletters: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  const archives = [
    { id: '42', title: 'The Basel IV Node', date: 'Oct 24, 2024', desc: 'Sovereign reserve architecture in a post-globalization liquidity tranche.' },
    { id: '41', title: 'Alpha Corridor Shift', date: 'Oct 17, 2024', desc: 'Tracing capital migration from G7 markets into high-velocity digital hubs.' },
    { id: '40', title: 'Hybrid Asset Residency', date: 'Oct 10, 2024', desc: 'The legal and financial mapping of RWA (Real World Asset) tokens in sovereign vaults.' },
    { id: '39', title: 'Debt Waterfalls v2.5', date: 'Oct 03, 2024', desc: 'Refining priority tranches in mezzanine infrastructure project funding.' }
  ];

  return (
    <div className="bg-[#fdfdfc] min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 sm:pt-48 pb-20 sm:pb-30 px-6 sm:px-10 lg:px-22 border-b border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-[0.012] pointer-events-none transform rotate-45 scale-150"><Mail size={500} /></div>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-ui-caps text-indigo-600 block mb-10 flex items-center">
                <div className="w-14 h-[2px] bg-indigo-600 mr-5" /> Subscription Node
            </span>
            <h1 className="serif italic text-[#0a0f1a] tracking-tighter mb-12">The Sovereign <br/> Briefing.</h1>
            <p className="text-slate-500 text-2xl leading-relaxed max-w-3xl font-medium italic opacity-80">
              A proprietary weekly intelligence artifact delivered to select institutional tranches. Grounded in real-time liquidity sensing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-22 bg-white relative border-b border-slate-50">
        <div className="section-container flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
           <div className="lg:w-1/2 space-y-10">
              <h2 className="serif italic text-4xl sm:text-5xl text-[#0a0f1a] font-black tracking-tighter">Initiate Briefing Link.</h2>
              <p className="text-slate-400 text-xl leading-relaxed italic font-medium">
                Subscribe to our secure transmission node. Every briefing undergoes strict institutional clearance before deployment.
              </p>
              <div className="space-y-6">
                 {['Private Alpha Mapping', 'Sovereign Debt Telemetry', 'Compliance Node Updates'].map((t, i) => (
                    <div key={i} className="flex items-center space-x-4 text-ui-caps text-[#0a0f1a]">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                       <span className="opacity-60">{t}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="lg:w-1/2 w-full">
              <div className="bg-white border border-slate-100 p-10 sm:p-16 rounded-5xl shadow-2xl relative overflow-hidden glass-premium">
                 <AnimatePresence mode="wait">
                    {status === 'success' ? (
                       <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-8">
                          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                             <CheckCircle className="text-emerald-600" size={48} />
                          </div>
                          <h3 className="serif text-4xl font-black italic text-[#0a0f1a]">Node Verified.</h3>
                          <p className="text-slate-500 font-medium italic">Your institutional node has been added to our distribution tranche. Confirmation artifact transmitted.</p>
                       </motion.div>
                    ) : (
                       <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubscribe} className="space-y-10 relative z-10">
                          <div className="space-y-4">
                             <label className="text-ui-caps text-slate-400 ml-2">Institutional Entry Point</label>
                             <input 
                                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="entity@federgreen.com"
                                className="w-full bg-slate-50 border border-slate-100 p-8 rounded-3xl text-slate-900 font-black outline-none focus:bg-white focus:border-indigo-600 transition-all shadow-inner italic"
                             />
                          </div>
                          <button type="submit" disabled={status === 'submitting'} className="w-full py-8 bg-[#0a0f1a] text-white rounded-4xl text-ui-caps hover:bg-indigo-600 transition-all duration-700 shadow-2xl flex items-center justify-center group disabled:opacity-50">
                             {status === 'submitting' ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <>Access Briefing Node <Send className="ml-4 group-hover:translate-x-2 transition-transform" size={18} /></>}
                          </button>
                          <p className="text-[10px] text-slate-300 uppercase font-black text-center tracking-widest flex items-center justify-center">
                             <ShieldCheck size={14} className="mr-3 opacity-30" /> AES-256 Encrypted Security Link Active
                          </p>
                       </motion.form>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="py-32 px-6 sm:px-10 lg:px-22 bg-white">
        <div className="section-container">
           <div className="flex justify-between items-end mb-24 gap-12">
              <div className="max-w-2xl">
                 <div className="flex items-center space-x-4 mb-8">
                    <History size={16} className="text-indigo-400" />
                    <p className="text-ui-caps text-slate-400">Intelligence Archive</p>
                 </div>
                 <h2 className="serif italic text-4xl sm:text-6xl text-[#0a0f1a] font-black tracking-tighter">Previous Briefs.</h2>
              </div>
              <div className="hidden sm:flex items-center px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 shadow-inner">
                 <Search size={18} className="mr-4" />
                 <input type="text" placeholder="Filter Artifacts..." className="bg-transparent text-sm font-bold outline-none" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {archives.map((item, i) => (
                 <motion.div 
                    key={item.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="group bg-[#fcfcfb] border border-slate-100 rounded-5xl p-10 flex flex-col h-full hover:bg-white hover:shadow-2xl transition-all duration-700 cursor-pointer active:scale-95"
                 >
                    <div className="flex justify-between items-start mb-12">
                       <span className="text-[32px] serif italic font-black text-slate-200 group-hover:text-indigo-100 transition-colors">#{item.id}</span>
                       <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 shadow-sm transition-all">
                          <Download size={18} />
                       </div>
                    </div>
                    <div className="flex-1">
                       <p className="text-ui-caps text-slate-400 mb-4">{item.date}</p>
                       <h4 className="serif italic text-2xl text-[#0a0f1a] font-black mb-6 leading-tight group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                       <p className="text-slate-500 text-base italic leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-100 flex items-center text-indigo-600 text-ui-caps opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                       Access Artifact <ArrowRight className="ml-3" size={14} />
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletters;
