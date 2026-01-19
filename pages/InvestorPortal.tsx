
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Bell, Settings, User, BarChart2, Briefcase, 
  FileText, Bot, Loader2, CheckCircle, XCircle, AlertTriangle,
  Layers, Globe, ArrowUpRight, TrendingUp, Zap, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateInvestorBriefing, analyzeInvestmentDeal } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <rect width="100" height="100" rx="24" fill={color} />
      <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
    </svg>
);

const InvestorPortal: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Sovereign Investor', email: 'investor@federgreen.com', interests: ['Renewable Energy', 'Fintech', 'Aerospace Debt Instruments'] });
    const [briefing, setBriefing] = useState<string | null>(null);
    const [loadingBriefing, setLoadingBriefing] = useState(true);
    const [dealFlow, setDealFlow] = useState([
        { id: 1, name: 'Project Terra: Solar Infrastructure Bond', sector: 'Renewable Energy', ask: '$50M', status: 'Due Diligence' },
        { id: 2, name: 'QuantumLeap AI: Series B', sector: 'Fintech', ask: '$25M', status: 'Term Sheet' },
        { id: 3, name: 'Orion Aerospace: Mezzanine Debt', sector: 'Aerospace Debt Instruments', ask: '$75M', status: 'Open' },
    ]);
    const [analyzingDeal, setAnalyzingDeal] = useState<number | null>(null);
    const [dealAnalysis, setDealAnalysis] = useState<Record<number, string>>({});

    const sectors = [
        { name: 'Energy', val: 78, trend: 'up' },
        { name: 'Fintech', val: 92, trend: 'up' },
        { name: 'Aero', val: 64, trend: 'down' },
        { name: 'Mining', val: 42, trend: 'down' }
    ];

    useEffect(() => {
        const fetchBriefing = async () => {
            setLoadingBriefing(true);
            try {
                const res = await generateInvestorBriefing(user);
                setBriefing(res);
            } catch (e) {
                setBriefing("FEDERGREEN Briefing Node offline. Market sentiment analysis is currently unavailable.");
            } finally {
                setLoadingBriefing(false);
            }
        };
        fetchBriefing();
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        navigate('/login');
    };
    
    const handleAnalyzeDeal = async (deal: any) => {
      setAnalyzingDeal(deal.id);
      try {
        const res = await analyzeInvestmentDeal(user, deal);
        setDealAnalysis(prev => ({...prev, [deal.id]: res}));
      } catch (e) {
        setDealAnalysis(prev => ({...prev, [deal.id]: "FEDERGREEN Analysis Failed: Could not run due diligence simulation."}));
      } finally {
        setAnalyzingDeal(null);
      }
    }
    
    const renderAnalysis = (text: string) => {
      const recommendationMatch = text.match(/Final Recommendation: (APPROVE|REVIEW|REJECT)/);
      const recommendation = recommendationMatch ? recommendationMatch[1] : null;
      
      const sections = {
        'Strategic Alignment': text.split('Strategic Alignment')[1]?.split('Institutional Risks')[0],
        'Institutional Risks': text.split('Institutional Risks')[1]?.split('Final Recommendation')[0]
      };
      
      return (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6 pt-6 border-t border-slate-100">
          {recommendation && (
             <div className={`p-4 rounded-xl flex items-center justify-between
               ${recommendation === 'APPROVE' && 'bg-emerald-50 text-emerald-700 border border-emerald-100'}
               ${recommendation === 'REVIEW' && 'bg-amber-50 text-amber-700 border border-amber-100'}
               ${recommendation === 'REJECT' && 'bg-rose-50 text-rose-700 border border-rose-100'}
             `}>
               <div className="flex items-center space-x-3">
                  {recommendation === 'APPROVE' && <CheckCircle size={20} />}
                  {recommendation === 'REVIEW' && <AlertTriangle size={20} />}
                  {recommendation === 'REJECT' && <XCircle size={20} />}
                  <span className="text-xs font-black uppercase tracking-widest">Node Verdict: {recommendation}</span>
               </div>
               <span className="text-[10px] font-mono opacity-40">REF: FG-AI-204</span>
             </div>
          )}
          {Object.entries(sections).map(([title, content]) => content && (
            <div key={title} className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</h5>
              <div className="space-y-2">
                {content.trim().split('\n').map((item, i) => {
                    const clean = item.replace(/^-/, '').trim();
                    return clean && (
                        <div key={i} className="flex items-start text-xs text-slate-600 font-medium bg-white p-3 rounded-lg border border-slate-50 shadow-sm italic">
                            <span className="mr-3 text-indigo-300">•</span> {clean}
                        </div>
                    );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-28 bg-white border-r border-slate-200 flex-col items-center py-10 justify-between fixed h-full z-50 shadow-xl">
                <div>
                    <LogoMark className="w-12 h-12 shadow-2xl" />
                    <nav className="mt-20 space-y-12">
                        <button className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl"><BarChart2 /></button>
                        <button className="p-4 text-slate-300 hover:text-indigo-600 transition-all"><Globe /></button>
                        <button className="p-4 text-slate-300 hover:text-indigo-600 transition-all"><Layers /></button>
                    </nav>
                </div>
                <div className="space-y-8">
                    <button className="p-4 text-slate-300 hover:text-slate-600 transition-all"><Settings /></button>
                    <button onClick={handleLogout} className="p-4 text-slate-300 hover:text-rose-600 transition-all"><LogOut /></button>
                </div>
            </aside>

            <main className="flex-1 lg:ml-28 p-12 lg:p-20 overflow-y-auto">
                <header className="flex justify-between items-end mb-16">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                           <p className="text-ui-caps text-slate-400 tracking-[0.4em]">Investor Node 12-B Active</p>
                        </div>
                        <h1 className="serif text-5xl font-black text-slate-900 tracking-tighter">Institutional Hub.</h1>
                        <p className="text-slate-500 font-medium mt-3 italic">Authorized Access: <span className="text-indigo-600 font-bold uppercase tracking-widest">{user.name}</span></p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                           <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">V</div>
                           <div className="text-right">
                              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Sentiment</p>
                              <p className="text-sm font-black text-slate-900 tracking-tighter">OPTIMISTIC</p>
                           </div>
                        </div>
                        <button className="p-5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm relative">
                           <Bell size={20}/>
                           <div className="absolute top-4 right-4 w-2 h-2 bg-rose-500 rounded-full" />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Heatmap/Sentiment Graph */}
                        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl overflow-hidden relative">
                           <div className="flex justify-between items-center mb-10">
                              <h3 className="text-ui-caps text-slate-400 tracking-[0.6em]">Sector Sentiment Heatmap</h3>
                              <TrendingUp className="text-emerald-500" size={20} />
                           </div>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                              {sectors.map((s, i) => (
                                 <div key={i} className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                       <span>{s.name}</span>
                                       <span className={s.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}>{s.trend === 'up' ? '↑' : '↓'}</span>
                                    </div>
                                    <div className="h-24 bg-slate-50 rounded-2xl relative overflow-hidden flex items-end p-2 border border-slate-100">
                                       <motion.div initial={{ height: 0 }} animate={{ height: `${s.val}%` }} transition={{ duration: 2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }} className={`w-full rounded-xl shadow-lg ${s.trend === 'up' ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                                    </div>
                                    <p className="text-center font-black text-slate-900 text-lg tracking-tighter">{s.val}%</p>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Briefing */}
                        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-[#111e35] text-white p-12 rounded-[3.5rem] shadow-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none rotate-45 transform scale-150"><Globe size={300} /></div>
                            <div className="flex items-center space-x-6 mb-10 relative z-10">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-inner">
                                   <Bot size={28} />
                                </div>
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-emerald-400">Sovereign Intel Briefing</h2>
                            </div>
                            {loadingBriefing ? (
                                <div className="space-y-4 relative z-10">
                                    <div className="h-4 bg-white/5 rounded-full w-full animate-pulse"></div>
                                    <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse"></div>
                                    <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                                </div>
                            ) : (
                                <p className="text-indigo-100/70 leading-relaxed font-medium italic relative z-10 text-xl tracking-tight whitespace-pre-wrap">{briefing}</p>
                            )}
                        </motion.div>

                        {/* Pipeline / Deals */}
                        <div className="bg-white p-12 rounded-[4.5rem] border border-slate-200 shadow-xl">
                            <div className="flex justify-between items-center mb-12">
                               <h2 className="text-ui-caps text-slate-400 tracking-[0.6em]">Curated High-Alpha Pipeline</h2>
                               <div className="flex space-x-3">
                                  <button className="p-3 bg-slate-50 rounded-xl text-slate-300 hover:text-indigo-600 transition-all"><Layers size={18}/></button>
                                  <button className="p-3 bg-slate-50 rounded-xl text-slate-300 hover:text-indigo-600 transition-all"><Settings size={18}/></button>
                               </div>
                            </div>
                            <div className="space-y-6">
                              {dealFlow.map(deal => (
                                <div key={deal.id} className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 transition-all duration-700 hover:bg-white hover:shadow-2xl group overflow-hidden">
                                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                                    <div className="flex items-center space-x-6">
                                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-200 group-hover:text-indigo-600 transition-all border border-slate-100 shadow-sm"><Briefcase size={24}/></div>
                                       <div>
                                          <p className="font-black text-slate-900 text-xl tracking-tighter italic group-hover:text-indigo-600 transition-colors">{deal.name}</p>
                                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">{deal.sector} • Ask: <span className="text-slate-900">{deal.ask}</span></p>
                                       </div>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white border border-slate-100 px-5 py-2.5 rounded-2xl shadow-sm text-slate-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">{deal.status}</span>
                                  </div>
                                  
                                  <div className="relative">
                                    {dealAnalysis[deal.id] ? (
                                        renderAnalysis(dealAnalysis[deal.id])
                                    ) : (
                                        <button 
                                            onClick={() => handleAnalyzeDeal(deal)} 
                                            disabled={analyzingDeal === deal.id} 
                                            className="w-full py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#111e35] hover:text-white transition-all flex items-center justify-center disabled:opacity-50 shadow-sm group-hover:border-transparent"
                                        >
                                            {analyzingDeal === deal.id ? (
                                                <><Loader2 className="animate-spin mr-3" size={16}/> Executing FEDERGREEN Node 3-PRO</>
                                            ) : (
                                                <><Bot size={16} className="mr-3 text-indigo-400" /> Run AI Due Diligence Simulation</>
                                            )}
                                        </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column Portfolio */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl sticky top-32">
                            <div className="flex justify-between items-center mb-12">
                               <h2 className="text-ui-caps text-slate-400 tracking-[0.6em]">AUM Snapshot</h2>
                               <BarChart2 className="text-indigo-600" size={20} />
                            </div>
                            <div className="space-y-12">
                                <div className="text-center bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100 shadow-inner">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mb-4">Total Portfolio Value</p>
                                    <p className="serif text-7xl font-black text-slate-900 tracking-tighter italic leading-none">$12.4M</p>
                                    <div className="mt-8 flex items-center justify-center text-emerald-500 font-black text-xs uppercase tracking-widest">
                                       <TrendingUp size={14} className="mr-2" /> +8.4% FY24
                                    </div>
                                </div>
                                
                                <div className="space-y-10">
                                    {[
                                        { name: 'Project Terra', val: '$5.2M', perc: 42, color: 'bg-emerald-500' },
                                        { name: 'QuantumLeap', val: '$3.8M', perc: 31, color: 'bg-indigo-500' },
                                        { name: 'Liquid Node', val: '$3.4M', perc: 27, color: 'bg-slate-400' }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-4">
                                            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                               <span className="text-slate-400">{item.name}</span> 
                                               <span className="text-slate-900 italic">{item.val}</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-100 rounded-full shadow-inner overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }} animate={{ width: `${item.perc}%` }} transition={{ duration: 2, delay: i * 0.3 }}
                                                    className={`h-full rounded-full shadow-xl ${item.color}`} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="pt-8 border-t border-slate-100">
                                   <button className="w-full py-6 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center group">
                                      Generate Report Node <ArrowUpRight size={14} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                   </button>
                                </div>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="bg-[#111e35] p-10 rounded-[3.5rem] text-center text-white relative overflow-hidden group">
                           <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                           {/* Added ShieldCheck to the imports to resolve reference error */}
                           <ShieldCheck className="mx-auto mb-6 text-emerald-400 opacity-40" size={40} />
                           <p className="text-ui-caps text-white/40 tracking-[0.4em] mb-4">Security Tranche</p>
                           <p className="text-[11px] font-medium italic text-indigo-100/60 leading-relaxed">
                              This session is cryptographically isolated and audited per MMXXIV compliance nodes.
                           </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InvestorPortal;
