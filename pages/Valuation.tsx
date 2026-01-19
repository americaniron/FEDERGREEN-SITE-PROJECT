
import React, { useState } from 'react';
import { getBusinessValuation } from '../services/geminiService';
import { ValuationData } from '../types';
import { Calculator, ArrowRight, TrendingUp, Info, BarChart3, ShieldCheck, Landmark, Target, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Valuation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ValuationData>({
    businessName: '',
    industry: '',
    annualRevenue: 0,
    growthRate: 0,
    ebitda: 0,
    description: ''
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName.trim()) newErrors.businessName = "Entity name is required.";
    if (!formData.industry.trim()) newErrors.industry = "Industry node must be defined.";
    if (formData.annualRevenue <= 0) newErrors.annualRevenue = "Revenue must be positive.";
    if (formData.ebitda === 0) newErrors.ebitda = "EBITDA cannot be zero.";
    if (formData.description.length < 20) newErrors.description = "Provide more strategic context (min 20 chars).";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValuate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setResult(null);
    try {
      const evaluation = await getBusinessValuation(formData);
      setResult(evaluation);
    } catch (error) {
      console.error(error);
      setErrors({ global: "Institutional node error. Heuristic sync failed." });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (field: string) => `
    w-full bg-slate-50 border rounded-xl sm:rounded-2xl px-6 sm:px-8 py-5 sm:py-6 text-[#0a0f1a] font-black outline-none transition-all shadow-inner text-sm sm:text-[15px]
    ${errors[field] ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:bg-white focus:border-[#0a0f1a]'}
  `;

  return (
    <div className="bg-[#fdfdfc] min-h-screen py-24 sm:py-40 px-6 sm:px-10 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 sm:mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center space-x-4 sm:space-x-6 mb-8 sm:mb-10">
                <span className="w-12 sm:w-16 h-[2px] bg-emerald-700"></span>
                <span className="text-emerald-700 text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">Corporate Strategy Desk</span>
            </div>
            <h1 className="serif text-5xl sm:text-7xl md:text-8xl text-[#0a0f1a] font-black mb-8 sm:mb-10 italic tracking-tighter leading-[1.1] sm:leading-[0.9]">Enterprise <br className="hidden sm:block"/> Valuation.</h1>
            <p className="text-slate-500 text-xl sm:text-2xl max-w-2xl leading-relaxed font-medium italic opacity-90">
                Algorithmic business assessment via sovereign FEDERGREEN nodes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="lg:col-span-5 bg-white p-8 sm:p-14 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 shadow-xl space-y-10 sm:space-y-12 glass-premium">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 sm:space-x-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 rounded-[1.5rem] sm:rounded-[1.8rem] flex items-center justify-center text-emerald-700 shadow-inner">
                    <Calculator size={20} sm:size={24} />
                </div>
                <h2 className="text-[12px] sm:text-[14px] font-black text-[#0a0f1a] uppercase tracking-[0.3em] sm:tracking-[0.4em]">Submission</h2>
              </div>
              <AnimatePresence>
                {Object.keys(errors).length > 0 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center text-rose-500 space-x-2">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Errors Found</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form onSubmit={handleValuate} className="space-y-8 sm:space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.4em] ml-2">Entity Name</label>
                <input 
                  type="text" 
                  className={inputClasses('businessName')}
                  value={formData.businessName}
                  onChange={e => {
                    setFormData({...formData, businessName: e.target.value});
                    if (errors.businessName) setErrors(prev => ({ ...prev, businessName: '' }));
                  }}
                  placeholder="Full Legal Title"
                />
                {errors.businessName && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-2">{errors.businessName}</motion.p>}
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-2">Industry Node</label>
                <input 
                  type="text" 
                  className={inputClasses('industry')}
                  value={formData.industry}
                  onChange={e => {
                    setFormData({...formData, industry: e.target.value});
                    if (errors.industry) setErrors(prev => ({ ...prev, industry: '' }));
                  }}
                  placeholder="e.g. Fintech"
                />
                {errors.industry && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-2">{errors.industry}</motion.p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-2">Revenue ($)</label>
                  <input 
                    type="number" 
                    className={inputClasses('annualRevenue')}
                    value={formData.annualRevenue || ''}
                    onChange={e => {
                      setFormData({...formData, annualRevenue: Number(e.target.value)});
                      if (errors.annualRevenue) setErrors(prev => ({ ...prev, annualRevenue: '' }));
                    }}
                  />
                  {errors.annualRevenue && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-2">{errors.annualRevenue}</motion.p>}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-2">EBITDA ($)</label>
                  <input 
                    type="number" 
                    className={inputClasses('ebitda')}
                    value={formData.ebitda || ''}
                    onChange={e => {
                      setFormData({...formData, ebitda: Number(e.target.value)});
                      if (errors.ebitda) setErrors(prev => ({ ...prev, ebitda: '' }));
                    }}
                  />
                  {errors.ebitda && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-2">{errors.ebitda}</motion.p>}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-2">Growth (%)</label>
                <input 
                  type="number" 
                  className={inputClasses('growthRate')}
                  value={formData.growthRate || ''}
                  onChange={e => setFormData({...formData, growthRate: Number(e.target.value)})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-2">Description</label>
                <textarea 
                  className={inputClasses('description') + " h-32 resize-none leading-relaxed font-medium"} 
                  placeholder="Strategic revenue mechanics..."
                  value={formData.description}
                  onChange={e => {
                    setFormData({...formData, description: e.target.value});
                    if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                  }}
                />
                {errors.description && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-2">{errors.description}</motion.p>}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0a0f1a] text-white py-7 sm:py-8 rounded-[2rem] sm:rounded-[2.5rem] font-black text-[11px] sm:text-[12px] uppercase tracking-[0.5em] sm:tracking-[0.6em] hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-30 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="flex items-center justify-center relative z-10">
                  {loading ? (
                    <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-4 sm:mr-5" />
                        Analyzing...
                    </>
                  ) : (
                    <>
                        Valuate Node
                        <ArrowRight className="ml-4 sm:ml-5 group-hover:translate-x-3 transition-transform" size={18} sm:size={20} />
                    </>
                  )}
                </span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col min-h-[600px] sm:min-h-[800px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.98, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -30 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#0a0f1a] rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-20 text-white shadow-2xl relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 p-12 sm:p-20 opacity-10 pointer-events-none rotate-12 scale-125 sm:scale-150 transform">
                     <TrendingUp size={200} sm:size={300} />
                  </div>

                  <div className="mb-12 sm:mb-20 border-b border-white/10 pb-10 sm:pb-12 relative z-10">
                    <h2 className="serif text-4xl sm:text-6xl font-black mb-4 italic tracking-tighter leading-tight">Valuation <br className="hidden sm:block"/> Artifact.</h2>
                    <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-indigo-300">Analytical Node: FG-3-PRO</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-20 relative z-10">
                     <div className="bg-white/5 p-8 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl group hover:border-indigo-400/30 transition-all duration-700">
                        <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-indigo-300 mb-4 sm:mb-6 flex items-center">
                            <Landmark size={14} className="mr-2 sm:mr-3" /> Est. Enterprise Value
                        </p>
                        <p className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter leading-none">{result.estimatedValue}</p>
                     </div>
                     <div className="bg-white/5 p-8 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl group hover:border-emerald-400/30 transition-all duration-700">
                        <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-indigo-300 mb-4 sm:mb-6 flex items-center">
                            <Target size={14} className="mr-2 sm:mr-3" /> Viability Index
                        </p>
                        <p className="text-4xl sm:text-6xl font-black text-emerald-400 italic tracking-tighter leading-none">{result.viabilityScore}<span className="text-2xl sm:text-3xl text-white/30 ml-2 font-light">/100</span></p>
                     </div>
                  </div>

                  <div className="space-y-12 sm:space-y-16 flex-grow relative z-10">
                     <div>
                        <h4 className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-indigo-300 mb-6 sm:mb-8 flex items-center">
                          <Info size={16} className="mr-3 sm:mr-4" /> Risk Profile
                        </h4>
                        <p className="text-xl sm:text-2xl leading-[1.6] sm:leading-[1.7] text-indigo-50/80 italic font-light tracking-tight">
                          {result.riskAssessment}
                        </p>
                     </div>

                     <div>
                        <h4 className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-indigo-300 mb-6 sm:mb-8">Recommendations</h4>
                        <div className="grid grid-cols-1 gap-4 sm:gap-5">
                           {result.fundingRecommendations.map((rec: string, i: number) => (
                             <motion.div 
                                key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i + 0.6 }}
                                className="bg-white/5 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] text-sm sm:text-[15px] border border-white/5 flex items-center italic font-medium"
                             >
                                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full mr-4 sm:mr-6 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                {rec}
                             </motion.div>
                           ))}
                        </div>
                     </div>
                  </div>
                  
                  <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-white/10 text-[9px] sm:text-[11px] font-black text-white/20 uppercase tracking-[0.3em] sm:tracking-[0.6em] flex justify-between">
                    <span>AUTHENTICATED ARTIFACT</span>
                    <span className="hidden sm:block">SEC-955 | VERIFIED</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex-grow border-4 border-dashed border-slate-100 rounded-[3rem] sm:rounded-[4rem] flex flex-col items-center justify-center p-12 sm:p-32 text-center bg-white/50 shadow-inner"
                >
                  {loading ? (
                     <div className="space-y-10 sm:space-y-12 flex flex-col items-center">
                        <div className="relative w-20 h-20 sm:w-32 sm:h-32">
                            <div className="absolute inset-0 border-[6px] sm:border-[8px] border-slate-100 rounded-full" />
                            <div className="absolute inset-0 border-[6px] sm:border-[8px] border-[#0a0f1a] border-t-emerald-400 rounded-full animate-spin" />
                        </div>
                        <p className="text-[#0a0f1a] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[13px] sm:text-[15px] animate-pulse">Modeling Node...</p>
                     </div>
                  ) : (
                    <div className="space-y-10 sm:space-y-12">
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-slate-50 border border-slate-100 rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center mx-auto text-slate-200">
                        <BarChart3 size={40} sm:size={56} />
                      </div>
                      <div className="space-y-4">
                        <h3 className="serif text-3xl sm:text-5xl text-[#0a0f1a] font-black tracking-tighter italic">Valuation Idle.</h3>
                        <p className="text-slate-500 text-lg sm:text-xl max-w-sm mx-auto leading-relaxed font-medium italic opacity-80">
                          The analytical engine requires metadata to begin sequence.
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

export default Valuation;
