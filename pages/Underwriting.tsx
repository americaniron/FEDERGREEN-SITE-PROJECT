import React, { useState } from 'react';
import { underwriteRealEstate } from '../services/geminiService';
import { RealEstateDeal } from '../types';
// Fixed missing Calculator import
import { ShieldCheck, ArrowRight, Printer, AlertTriangle, Calculator } from 'lucide-react';
// Fixed missing motion import
import { motion } from 'framer-motion';

const Underwriting: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [deal, setDeal] = useState<RealEstateDeal>({
    propertyType: '',
    location: '',
    purchasePrice: 0,
    estimatedRenovation: 0,
    arv: 0,
    rentalIncome: 0
  });

  const handleUnderwrite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const evaluation = await underwriteRealEstate(deal);
      setResult(evaluation);
    } catch (error) {
      console.error(error);
      alert("Error generating underwriting report. Institutional node timed out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-12 h-[2px] bg-emerald-700"></span>
            <span className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.4em]">Institutional Credit Desk</span>
          </div>
          <h1 className="serif text-5xl md:text-6xl text-indigo-950 font-bold mb-4">RE Underwriting</h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Immediate algorithmic analysis for multi-family, commercial, and residential institutional tranches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Input Form */}
          <div className="lg:col-span-5 bg-white p-10 rounded-[2.5rem] border border-indigo-50 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 mb-2">
              <ShieldCheck className="text-emerald-700" size={20} />
              <h2 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Deal Parameters</h2>
            </div>
            
            <form onSubmit={handleUnderwrite} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Asset Classification</label>
                <input 
                  type="text" 
                  className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 text-sm" 
                  placeholder="e.g. Class-A Multi-family"
                  value={deal.propertyType}
                  onChange={e => setDeal({...deal, propertyType: e.target.value})}
                  required 
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Geographic Node</label>
                <input 
                  type="text" 
                  className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 text-sm" 
                  placeholder="City, State / Region"
                  value={deal.location}
                  onChange={e => setDeal({...deal, location: e.target.value})}
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Acquisition ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                    value={deal.purchasePrice || ''}
                    onChange={e => setDeal({...deal, purchasePrice: Number(e.target.value)})}
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Capex ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                    value={deal.estimatedRenovation || ''}
                    onChange={e => setDeal({...deal, estimatedRenovation: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Target ARV ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                    value={deal.arv || ''}
                    onChange={e => setDeal({...deal, arv: Number(e.target.value)})}
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Monthly Yield ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                    value={deal.rentalIncome || ''}
                    onChange={e => setDeal({...deal, rentalIncome: Number(e.target.value)})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-900 transition-all shadow-xl shadow-indigo-900/20 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center">
                  {loading ? 'Performing AI Underwrite...' : 'Execute Submission'}
                  {!loading && <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />}
                </span>
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-7 min-h-[600px] flex flex-col">
            {result ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex-grow rounded-[2.5rem] text-white p-12 shadow-2xl relative overflow-hidden flex flex-col ${
                  result.recommendation.toLowerCase().includes('approve') ? 'bg-emerald-900' : 'bg-amber-900'
                }`}
              >
                {/* Visual Accent */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
                
                <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8 relative z-10">
                  <div>
                    <h2 className="serif text-4xl font-bold mb-2">Executive Summary</h2>
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/60">Reference: FC-UWR-{Math.floor(Math.random()*90000)}</p>
                  </div>
                  <button onClick={() => window.print()} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                    <Printer size={20} />
                  </button>
                </div>

                <div className="mb-12 relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-2">Committee Recommendation</span>
                  <div className="flex items-center space-x-4">
                    <h3 className="text-5xl font-black tracking-tighter">{result.recommendation}</h3>
                    {result.recommendation.toLowerCase().includes('approve') ? (
                       <ShieldCheck className="text-emerald-400" size={32} />
                    ) : (
                       <AlertTriangle className="text-amber-400" size={32} />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12 relative z-10">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Debt Svc Coverage (DSCR)</p>
                    <p className="text-3xl font-bold font-mono">{result.dscr}x</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Estimated ROI</p>
                    <p className="text-3xl font-bold font-mono text-emerald-300">{result.estimatedRoi}%</p>
                  </div>
                </div>

                <div className="space-y-8 flex-grow relative z-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4">Risk Node Analysis</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.keyRisks.map((risk: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-white/80 bg-black/10 p-3 rounded-lg border border-white/5">
                          <span className="mr-2 text-emerald-400">•</span> {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Technical Commentary</h4>
                    <p className="text-sm leading-relaxed text-white/70 italic">
                      {result.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] relative z-10">
                  <span>Engine: Gemini-3-Flash-Financial</span>
                  <span>Institutional Node FC-ZURICH</span>
                </div>
              </motion.div>
            ) : (
              <div className="flex-grow border-2 border-dashed border-indigo-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white/50">
                {loading ? (
                  <div className="space-y-6 flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-indigo-950 border-t-emerald-600 rounded-full animate-spin"></div>
                    <div className="space-y-2">
                       <p className="text-indigo-950 font-bold uppercase tracking-widest text-xs animate-pulse">Modeling Yield Curves...</p>
                       <p className="text-slate-400 text-[10px] uppercase tracking-widest">Applying heuristic cross-checks</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto text-indigo-900/20">
                      <Calculator size={32} />
                    </div>
                    <div>
                      <h3 className="serif text-2xl text-indigo-900 font-bold mb-2">Ready for Submission</h3>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto">
                        Provide deal metadata on the left to initiate the sovereign underwriting protocol.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Underwriting;