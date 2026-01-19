
import React, { useState } from 'react';
import { getBusinessValuation } from '../services/geminiService';
import { ValuationData } from '../types';
import { Calculator, ArrowRight, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Valuation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState<ValuationData>({
    businessName: '',
    industry: '',
    annualRevenue: 0,
    growthRate: 0,
    ebitda: 0,
    description: ''
  });

  const handleValuate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const evaluation = await getBusinessValuation(formData);
      setResult(evaluation);
    } catch (error) {
      console.error(error);
      alert("Valuation engine error. Please verify input tranches.");
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
            <span className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.4em]">Corporate Strategy Desk</span>
          </div>
          <h1 className="serif text-5xl md:text-6xl text-indigo-950 font-bold mb-4">Enterprise Valuation</h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Algorithmic business model assessment using industry-standard DCF and multi-factor multiples.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 bg-white p-10 rounded-[2.5rem] border border-indigo-50 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 mb-2">
              <Calculator className="text-emerald-700" size={20} />
              <h2 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Business Intelligence</h2>
            </div>

            <form onSubmit={handleValuate} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Entity Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                  value={formData.businessName}
                  onChange={e => setFormData({...formData, businessName: e.target.value})}
                  required 
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Industry Node</label>
                <input 
                  type="text" 
                  className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                  value={formData.industry}
                  onChange={e => setFormData({...formData, industry: e.target.value})}
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Revenue (Annual $)</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                    value={formData.annualRevenue || ''}
                    onChange={e => setFormData({...formData, annualRevenue: Number(e.target.value)})}
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">EBITDA ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                    value={formData.ebitda || ''}
                    onChange={e => setFormData({...formData, ebitda: Number(e.target.value)})}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Revenue Growth (%)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm" 
                  value={formData.growthRate || ''}
                  onChange={e => setFormData({...formData, growthRate: Number(e.target.value)})}
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Model Description</label>
                <textarea 
                  className="w-full bg-[#fdfcfb] border border-indigo-50 rounded-xl px-5 py-4 text-indigo-950 focus:border-indigo-500 outline-none transition-all text-sm h-24 resize-none" 
                  placeholder="Summarize revenue mechanics..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-900 transition-all shadow-xl shadow-indigo-900/20 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center">
                  {loading ? 'Analyzing Capital Structure...' : 'Generate Valuation'}
                  {!loading && <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />}
                </span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            {result ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-indigo-950 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <TrendingUp size={140} />
                </div>

                <div className="mb-12 border-b border-white/10 pb-8">
                  <h2 className="serif text-4xl font-bold mb-2">Valuation Artifact</h2>
                  <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-indigo-300">Generated via Gemini 3 Pro reasoning engine</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2">Est. Enterprise Value</p>
                      <p className="text-4xl font-bold text-white">{result.estimatedValue}</p>
                   </div>
                   <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2">Viability Index</p>
                      <p className="text-4xl font-bold text-emerald-400">{result.viabilityScore}/100</p>
                   </div>
                </div>

                <div className="space-y-10 flex-grow">
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-4 flex items-center">
                        <Info size={12} className="mr-2" /> Risk Profile Analysis
                      </h4>
                      <p className="text-sm leading-relaxed text-indigo-100/70 italic">
                        {result.riskAssessment}
                      </p>
                   </div>

                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-4">Capital Recommendations</h4>
                      <div className="grid grid-cols-1 gap-3">
                         {result.fundingRecommendations.map((rec: string, i: number) => (
                           <div key={i} className="bg-white/5 p-4 rounded-xl text-xs border border-white/5 flex items-center">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3" />
                              {rec}
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/10">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-4">Heuristic Breakdown</h4>
                      <p className="text-xs leading-relaxed text-indigo-100/50">
                        {result.detailedAnalysis}
                      </p>
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-grow border-2 border-dashed border-indigo-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white/50">
                {loading ? (
                   <div className="space-y-6">
                      <div className="w-16 h-16 border-4 border-indigo-900 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
                      <p className="text-indigo-950 font-bold uppercase tracking-widest text-xs animate-pulse">Running Monte Carlo Simulations...</p>
                   </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto text-indigo-900/20">
                      <TrendingUp size={32} />
                    </div>
                    <div>
                      <h3 className="serif text-2xl text-indigo-900 font-bold mb-2">Valuation Desk Idle</h3>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                        The sovereign analytical engine requires business model metadata to begin the valuation sequence.
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

export default Valuation;
