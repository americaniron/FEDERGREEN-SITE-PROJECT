
import React, { useState, useEffect } from 'react';
import { underwriteRealEstate } from '../services/geminiService';
import { RealEstateDeal } from '../types';
import { 
  ShieldCheck, ArrowRight, Printer, AlertTriangle, Calculator, 
  FileText, CheckCircle2, History, Trash2, ExternalLink, 
  TrendingUp, BarChart4, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#0a0f1a" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="24" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const Underwriting: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [deal, setDeal] = useState<RealEstateDeal>({
    propertyType: '',
    location: '',
    purchasePrice: 0,
    estimatedRenovation: 0,
    arv: 0,
    rentalIncome: 0
  });

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('underwriting_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("History corruption detected.");
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('underwriting_history', JSON.stringify(history));
  }, [history]);

  const handleUnderwrite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const evaluation = await underwriteRealEstate(deal);
      const newArtifact = { 
        ...evaluation, 
        id: Date.now(), 
        timestamp: new Date().toLocaleString(),
        inputs: { ...deal }
      };
      setResult(newArtifact);
      setHistory(prev => [newArtifact, ...prev].slice(0, 10)); // Keep last 10 tranches
    } catch (error) {
      console.error(error);
      alert("Institutional node timeout.");
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const loadHistoryItem = (item: any) => {
    setResult(item);
    setDeal(item.inputs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const InputGroup = ({ label, suffix, prefix, ...props }: any) => (
    <div className="space-y-2 sm:space-y-3">
      <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.4em] ml-1">{label}</label>
      <div className="relative group">
        {prefix && <span className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{prefix}</span>}
        <input 
          {...props}
          className={`w-full bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl py-5 sm:py-6 text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner text-sm sm:text-[15px] font-medium ${prefix ? 'pl-10 sm:pl-11' : 'pl-6 sm:pl-7'} ${suffix ? 'pr-12 sm:pr-14' : 'pr-6 sm:pr-7'}`}
        />
        {suffix && <span className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-slate-300 font-black text-[9px] sm:text-[10px] uppercase tracking-widest">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="bg-[#fafaf9] min-h-screen py-24 sm:py-40 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 sm:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 sm:gap-16">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-4 sm:space-x-5 mb-8 sm:mb-10">
              <div className="w-12 sm:w-16 h-[2px] bg-emerald-700" />
              <span className="text-emerald-700 text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">Institutional Credit Desk</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="serif text-5xl sm:text-7xl md:text-8xl text-[#0a0f1a] font-black leading-[1.1] sm:leading-[0.88] tracking-tighter mb-8 sm:mb-10 italic">
              Sovereign <br/> Underwriting.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500 text-xl sm:text-2xl leading-relaxed font-medium italic opacity-90">
              Heuristic deep-node risk assessment via FEDERGREEN nodes.
            </motion.p>
          </div>
          
          {history.length > 0 && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-6 sm:space-x-8 text-slate-400">
                <BarChart4 size={24} sm:size={28} className="text-indigo-600 animate-pulse" />
                <div>
                   <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Audit Trail Active</p>
                   <p className="text-xs sm:text-sm font-bold text-[#0a0f1a] mt-1">{history.length} Tranches Archived</p>
                </div>
             </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-24 items-start">
          {/* Submission Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-10 sm:space-y-12"
          >
            <div className="bg-white p-8 sm:p-14 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 shadow-xl space-y-10 sm:space-y-12 glass-premium">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 sm:space-x-5">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 rounded-[1.5rem] sm:rounded-[1.8rem] flex items-center justify-center text-emerald-700 shadow-inner">
                            <Calculator size={20} sm:size={24} />
                        </div>
                        <h2 className="text-[12px] sm:text-[14px] font-black text-[#0a0f1a] uppercase tracking-[0.3em] sm:tracking-[0.4em]">Submission</h2>
                    </div>
                    {result && (
                       <button onClick={() => { setResult(null); setDeal({ propertyType: '', location: '', purchasePrice: 0, estimatedRenovation: 0, arv: 0, rentalIncome: 0 }); }} className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 border-b border-indigo-100 pb-1">Clear</button>
                    )}
                </div>
                
                <form onSubmit={handleUnderwrite} className="space-y-8 sm:space-y-10">
                <InputGroup 
                    label="Asset Class" 
                    placeholder="e.g. Multi-family"
                    value={deal.propertyType}
                    onChange={(e: any) => setDeal({...deal, propertyType: e.target.value})}
                    required 
                />
                
                <InputGroup 
                    label="Geographic Node" 
                    placeholder="City, State"
                    value={deal.location}
                    onChange={(e: any) => setDeal({...deal, location: e.target.value})}
                    required 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <InputGroup 
                    label="Acquisition" 
                    type="number" 
                    prefix="$"
                    value={deal.purchasePrice || ''}
                    onChange={(e: any) => setDeal({...deal, purchasePrice: Number(e.target.value)})}
                    required 
                    />
                    <InputGroup 
                    label="Capex" 
                    type="number" 
                    prefix="$"
                    value={deal.estimatedRenovation || ''}
                    onChange={(e: any) => setDeal({...deal, estimatedRenovation: Number(e.target.value)})}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <InputGroup 
                    label="Target ARV" 
                    type="number" 
                    prefix="$"
                    value={deal.arv || ''}
                    onChange={(e: any) => setDeal({...deal, arv: Number(e.target.value)})}
                    required 
                    />
                    <InputGroup 
                    label="Monthly Yield" 
                    type="number" 
                    prefix="$"
                    value={deal.rentalIncome || ''}
                    onChange={(e: any) => setDeal({...deal, rentalIncome: Number(e.target.value)})}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#0a0f1a] text-white py-7 sm:py-9 rounded-[2rem] sm:rounded-[2.5rem] font-black text-[11px] sm:text-[12px] uppercase tracking-[0.5em] sm:tracking-[0.6em] hover:bg-indigo-600 transition-all shadow-2xl disabled:opacity-30 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="flex items-center justify-center relative z-10">
                    {loading ? (
                        <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-4 sm:mr-5" />
                            Heuristic Scan...
                        </>
                    ) : (
                        <>
                            Initiate Memo
                            <ArrowRight className="ml-4 sm:ml-5 group-hover:translate-x-3 transition-transform" size={18} sm:size={20} />
                        </>
                    )}
                    </span>
                </button>
                </form>
            </div>

            {/* Historical Section */}
            <div className="bg-[#f2f2ef] p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200/50">
               <div className="flex items-center space-x-4 sm:space-x-5 mb-8 sm:mb-10">
                  <History className="text-slate-400" size={20} sm:size={24} />
                  <h3 className="text-[12px] sm:text-[13px] font-black text-[#0a0f1a] uppercase tracking-[0.3em] sm:tracking-[0.4em]">Historical Tranches</h3>
               </div>
               
               <div className="space-y-4 sm:space-y-5">
                  <AnimatePresence>
                  {history.length > 0 ? (
                    history.map((item) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 group flex items-center justify-between hover:border-indigo-300 transition-all cursor-pointer"
                        onClick={() => loadHistoryItem(item)}
                      >
                         <div className="flex items-center space-x-4 sm:space-x-6 overflow-hidden">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0 ${item.recommendation.toLowerCase().includes('approve') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                               <ShieldCheck size={18} sm:size={20} />
                            </div>
                            <div className="truncate">
                               <p className="font-black text-[#0a0f1a] text-[13px] sm:text-[15px] truncate">{item.inputs.propertyType}</p>
                               <p className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] mt-1 sm:mt-1.5 truncate">{item.inputs.location}</p>
                            </div>
                         </div>
                         <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
                            <button onClick={(e) => { e.stopPropagation(); deleteHistoryItem(item.id); }} className="p-2 sm:p-3 text-slate-300 hover:text-rose-600 transition-colors bg-slate-50 rounded-lg">
                               <Trash2 size={16} />
                            </button>
                         </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10 sm:py-16 opacity-30">
                       <LogoMark className="mx-auto w-10 h-10 sm:w-12 sm:h-12 mb-4 grayscale opacity-20" />
                       <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Historical Node</p>
                    </div>
                  )}
                  </AnimatePresence>
               </div>
            </div>
          </motion.div>

          {/* Result Visualization */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[600px] sm:min-h-[800px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.98, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -30 }}
                  className="bg-white rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 shadow-2xl p-8 sm:p-20 flex flex-col glass-premium relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 sm:p-16 opacity-[0.03] pointer-events-none rotate-12">
                    <FileText size={200} sm:size={400} />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start mb-12 sm:mb-20 border-b border-slate-50 pb-8 sm:pb-12 relative z-10 gap-6">
                    <div>
                      <h2 className="serif text-3xl sm:text-5xl font-black text-[#0a0f1a] mb-2 sm:mb-4 tracking-tighter italic leading-tight">Credit Memo.</h2>
                      <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-slate-400">FG-UWR-{Math.floor(Math.random()*900000)} • {result.timestamp}</p>
                    </div>
                    <button onClick={() => window.print()} className="p-4 sm:p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-all shadow-inner text-[#0a0f1a] hidden sm:block">
                        <Printer size={20} sm:size={24} />
                    </button>
                  </div>

                  <div className="mb-12 sm:mb-20 relative z-10">
                    <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-slate-400 block mb-4 sm:mb-6">Recommendation</span>
                    <div className="flex items-center space-x-6 sm:space-x-8">
                      <h3 className={`text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter italic leading-tight ${result.recommendation.toLowerCase().includes('approve') ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {result.recommendation}
                      </h3>
                      <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center shadow-2xl flex-shrink-0 ${result.recommendation.toLowerCase().includes('approve') ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                         {result.recommendation.toLowerCase().includes('approve') ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20 relative z-10">
                    <div className="bg-slate-50/50 p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-inner group hover:bg-white transition-all duration-700">
                      <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-slate-400 mb-2 sm:mb-4">Coverage (DSCR)</p>
                      <p className="text-4xl sm:text-6xl font-black text-[#0a0f1a] font-mono tracking-tighter">{result.dscr}x</p>
                    </div>
                    <div className="bg-slate-50/50 p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-inner group hover:bg-white transition-all duration-700">
                      <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-slate-400 mb-2 sm:mb-4">Est. Yield</p>
                      <p className="text-4xl sm:text-6xl font-black text-emerald-600 font-mono tracking-tighter">{result.estimatedRoi}%</p>
                    </div>
                  </div>

                  <div className="space-y-12 sm:space-y-16 flex-grow relative z-10">
                    <div>
                      <h4 className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[#0a0f1a] mb-6 sm:mb-10 flex items-center">
                        <div className="w-8 sm:w-10 h-[2px] bg-indigo-600 mr-4 sm:mr-5 shadow-sm" /> Risk Breakdown
                      </h4>
                      <ul className="grid grid-cols-1 gap-4 sm:gap-6">
                        {result.keyRisks.map((risk: string, i: number) => (
                          <motion.li 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i + 0.3 }}
                            key={i} 
                            className="flex items-start text-sm sm:text-[14px] font-medium text-slate-600 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm leading-relaxed"
                          >
                            <span className="mr-3 sm:mr-4 text-emerald-600 font-black text-lg">•</span> {risk}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-indigo-950/5 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-indigo-100/50">
                      <h4 className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[#0a0f1a] mb-4 sm:mb-6 flex items-center">
                        <div className="w-8 sm:w-10 h-[2px] bg-indigo-600 mr-4 sm:mr-5 shadow-sm" /> Executive Summary
                      </h4>
                      <p className="text-lg sm:text-xl leading-relaxed text-slate-700 font-medium italic tracking-tight">
                        {result.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px] sm:text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] sm:tracking-[0.5em] relative z-10 text-center sm:text-left">
                    <span className="flex items-center"><LogoMark className="mr-2 sm:mr-3 w-3 sm:w-4 h-3 sm:h-4" color="#6366f1" /> Engine: FEDERGREEN-3</span>
                    <span className="hidden sm:block">FC-NODE-GENEVA | SEC-256</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex-grow border-4 border-dashed border-slate-100 rounded-[3rem] sm:rounded-[4rem] flex flex-col items-center justify-center p-12 sm:p-32 text-center bg-white/50 shadow-inner"
                >
                  {loading ? (
                    <div className="space-y-8 sm:space-y-12 flex flex-col items-center">
                      <div className="relative w-20 h-20 sm:w-32 sm:h-32">
                        <div className="absolute inset-0 border-[6px] sm:border-[8px] border-slate-100 rounded-full" />
                        <div className="absolute inset-0 border-[6px] sm:border-[8px] border-emerald-600 border-t-transparent rounded-full animate-spin shadow-2xl" />
                      </div>
                      <p className="text-[#0a0f1a] font-black uppercase tracking-[0.3em] sm:tracking-[0.6em] text-[13px] sm:text-[15px] animate-pulse">Modeling tranches...</p>
                    </div>
                  ) : (
                    <div className="space-y-8 sm:space-y-12">
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-slate-50 border border-slate-100 rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center mx-auto text-slate-200">
                        <ShieldCheck size={40} sm:size={56} />
                      </div>
                      <div className="space-y-4">
                        <h3 className="serif text-3xl sm:text-5xl text-[#0a0f1a] font-black tracking-tighter italic">Waiting for Node.</h3>
                        <p className="text-slate-500 text-lg sm:text-xl max-w-sm mx-auto font-medium italic opacity-80 leading-relaxed">
                          Input metadata to initiate the underwriting protocol.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Underwriting;
