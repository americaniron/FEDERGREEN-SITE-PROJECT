
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Settings, User, BarChart2, Briefcase, FileText, Bot, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
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

    useEffect(() => {
        const fetchBriefing = async () => {
            setLoadingBriefing(true);
            try {
                const res = await generateInvestorBriefing(user);
                setBriefing(res);
            } catch (e) {
                setBriefing("AI Briefing Node offline. Market sentiment analysis is currently unavailable.");
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
        setDealAnalysis(prev => ({...prev, [deal.id]: "AI Analysis Failed: Could not run due diligence simulation."}));
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
        <div className="space-y-4">
          {recommendation && (
             <div className={`p-4 rounded-xl flex items-center space-x-3
               ${recommendation === 'APPROVE' && 'bg-emerald-500/10 text-emerald-700'}
               ${recommendation === 'REVIEW' && 'bg-amber-500/10 text-amber-700'}
               ${recommendation === 'REJECT' && 'bg-rose-500/10 text-rose-700'}
             `}>
               {recommendation === 'APPROVE' && <CheckCircle size={20} />}
               {recommendation === 'REVIEW' && <AlertTriangle size={20} />}
               {recommendation === 'REJECT' && <XCircle size={20} />}
               <span className="text-xs font-black uppercase tracking-widest">Recommendation: {recommendation}</span>
             </div>
          )}
          {Object.entries(sections).map(([title, content]) => content && (
            <div key={title}>
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{title}</h5>
              <ul className="space-y-1 text-xs list-disc pl-4 text-slate-600 font-medium">
                {content.trim().split('\n').map((item, i) => item.trim() && <li key={i}>{item.replace(/^-/, '').trim()}</li>)}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <aside className="w-24 bg-white border-r border-slate-200 flex flex-col items-center py-8 justify-between">
                <div>
                    <LogoMark className="w-10 h-10" />
                    <nav className="mt-20 space-y-8">
                        <a href="#" className="block text-slate-400 hover:text-indigo-600 p-3 bg-slate-100 rounded-xl"><BarChart2 /></a>
                        <a href="#" className="block text-slate-400 hover:text-indigo-600 p-3"><Briefcase /></a>
                        <a href="#" className="block text-slate-400 hover:text-indigo-600 p-3"><FileText /></a>
                    </nav>
                </div>
                <div className="space-y-6">
                    <button onClick={handleLogout} className="text-slate-400 hover:text-rose-600 p-3"><LogOut /></button>
                </div>
            </aside>

            <main className="flex-1 p-12">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="serif text-4xl font-black text-slate-900">Investor Dashboard</h1>
                        <p className="text-slate-500 font-medium">Welcome, {user.name}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-3 bg-white border border-slate-200 rounded-full text-slate-500"><Bell size={20}/></button>
                        <button className="p-3 bg-white border border-slate-200 rounded-full text-slate-500"><Settings size={20}/></button>
                        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            <User />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* AI Briefing */}
                        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-[#111e35] text-white p-10 rounded-3xl shadow-2xl shadow-indigo-900/20">
                            <div className="flex items-center space-x-3 mb-6">
                                <Bot className="text-emerald-400" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-emerald-400">Sovereign Market Briefing</h2>
                            </div>
                            {loadingBriefing ? (
                                <div className="space-y-3">
                                    <div className="h-4 bg-white/10 rounded-full w-full animate-pulse"></div>
                                    <div className="h-4 bg-white/10 rounded-full w-5/6 animate-pulse"></div>
                                    <div className="h-4 bg-white/10 rounded-full w-3/4 animate-pulse"></div>
                                </div>
                            ) : (
                                <p className="text-indigo-100/80 leading-relaxed font-medium italic whitespace-pre-wrap">{briefing}</p>
                            )}
                        </motion.div>

                        {/* Deal Flow */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-200">
                            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Curated Deal Flow</h2>
                            <div className="space-y-4">
                              {dealFlow.map(deal => (
                                <div key={deal.id} className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200 space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-bold text-slate-900">{deal.name}</p>
                                      <p className="text-xs text-slate-500 font-medium">{deal.sector} - {deal.ask}</p>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">{deal.status}</span>
                                  </div>
                                  {dealAnalysis[deal.id] ? renderAnalysis(dealAnalysis[deal.id]) : (
                                    <button onClick={() => handleAnalyzeDeal(deal)} disabled={analyzingDeal === deal.id} className="w-full py-3 bg-white text-slate-900 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center disabled:opacity-50">
                                      {analyzingDeal === deal.id ? <><Loader2 className="animate-spin mr-2" size={12}/> Running Due Diligence Node</> : 'Execute AI Analysis'}
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Snapshot */}
                    <div className="bg-white p-10 rounded-3xl border border-slate-200">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Portfolio Snapshot</h2>
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 font-bold uppercase">Total Value</p>
                                <p className="serif text-5xl font-black text-slate-900 tracking-tighter mt-1">$12.4M</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold text-slate-500"><span>Project Terra</span> <span>$5.2M</span></div>
                                <div className="w-full h-2 bg-slate-100 rounded-full"><div className="w-[42%] h-full bg-emerald-500 rounded-full"></div></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold text-slate-500"><span>QuantumLeap AI</span> <span>$3.8M</span></div>
                                <div className="w-full h-2 bg-slate-100 rounded-full"><div className="w-[31%] h-full bg-indigo-500 rounded-full"></div></div>
                            </div>
                             <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold text-slate-500"><span>Liquid Reserves</span> <span>$3.4M</span></div>
                                <div className="w-full h-2 bg-slate-100 rounded-full"><div className="w-[27%] h-full bg-slate-400 rounded-full"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InvestorPortal;
