
import React, { useState } from 'react';
import { getBusinessValuation } from '../services/geminiService';
import { ValuationData } from '../types';
import { Calculator, ArrowRight, TrendingUp, Info, BarChart3, ShieldCheck, Landmark, Target, AlertCircle, FileText, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Valuation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFullReport, setShowFullReport] = useState(false);
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
    setShowFullReport(false);
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
    w-full bg-slate-50 border rounded-xl sm:rounded-2xl px-6 sm:px-8 py-5 sm:py-6 text-brand-primary font-black outline-none transition-all shadow-inner text-sm sm:text-[15px]
    ${errors[field] ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:bg-white focus:border-brand-primary'}
  `;

  return (
    <div className="bg-brand-stone min-h-screen py-24 sm:py-48 px-6 sm:px-10 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 sm:mb-48">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center space-x-4 sm:space-x-6 mb-8 sm:mb-12">
                <span className="w-12 sm:w-20 h-[2px] bg-brand-emerald shadow-sm"></span>
                <span className="text-brand-emerald text-ui-caps tracking-[0.6em]">Corporate Strategy Desk</span>
            </div>
            <h1 className="serif text-5xl sm:text-7xl md:text-8xl text-brand-primary font-black mb-8 sm:mb-12 italic tracking-tighter leading-[1.1] sm:leading-[0.9]">Enterprise <br className="hidden sm:block"/> Valuation.</h1>
            <p className="text-slate-500 text-xl sm:text-2xl max-w-3xl leading-relaxed font-medium italic opacity-90">
                Algorithmic business assessment and deep-node risk report via sovereign FEDERGREEN nodes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="lg:col-span-5 bg-white p-8 sm:p-14 rounded-[3rem] sm:rounded-[4rem] border border-slate-100 shadow-2xl space-y-10 sm:space-y-16 glass-premium">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 sm:space-x-5">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-stone rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-brand-emerald shadow-inner">
                    <Calculator size={20} sm:size={28} />
                </div>
                <h2 className="text-[12px] sm:text-[14px] font-black text-brand-primary uppercase tracking-[0.4em]">Submission</h2>
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

            <form onSubmit={handleValuate} className="space-y-8 sm:space-y-12">
              <div className="space-y-4">
                <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-2">Entity Name</label>
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
              
              <div className="space-y-4">
                <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-2">Industry Node</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-2">Revenue ($)</label>
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
                <div className="space-y-4">
                  <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-2">EBITDA ($)</label>
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

              <div className="space-y-4">
                <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-2">Growth (%)</label>
                <input 
                  type="number" 
                  className={inputClasses('growthRate')}
                  value={formData.growthRate || ''}
                  onChange={e => setFormData({...formData, growthRate: Number(e.target.value)})}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-2">Description</label>
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
                className="w-full bg-brand-primary text-white py-8 sm:py-10 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.6em] hover:bg-brand-emerald transition-all shadow-2xl shadow-indigo-900/20 disabled:opacity-30 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="flex items-center justify-center relative z-10">
                  {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-5" />
                        Analyzing...
                    </>
                  ) : (
                    <>
                        Generate Risk Report
                        <ArrowRight className="ml-5 group-hover:translate-x-3 transition-transform" size={20} />
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
                  className="bg-brand-primary-dark rounded-[3rem] sm:rounded-[5rem] p-10 sm:p-24 text-white shadow-2xl relative overflow-hidden flex flex-col h-full border border-white/5"
                >
                  <div className="absolute top-0 right-0 p-12 sm:p-24 opacity-10 pointer-events-none rotate-12 scale-125 sm:scale-150 transform">
                     <TrendingUp size={200} sm:size={400} />
                  </div>

                  <div className="mb-12 sm:mb-24 border-b border-white/10 pb-12 sm:pb-16 relative z-10 flex justify-between items-end">
                    <div>
                        <h2 className="serif text-4xl sm:text-7xl font-black mb-4 italic tracking-tighter leading-tight">Institutional <br className="hidden sm:block"/> Report.</h2>
                        <p className="text-[11px] font-black uppercase tracking-[0.6em] text-brand-accent">Analytical Node: FG-3-PRO</p>
                    </div>
                    <button 
                        onClick={() => setShowFullReport(!showFullReport)}
                        className="px-8 py-4 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center shadow-xl"
                    >
                        {showFullReport ? 'Summary View' : 'Full Risk Analysis'}
                        <FileText size={16} className="ml-3" />
                    </button>
                  </div>

                  {!showFullReport ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16 sm:space-y-24 flex-grow relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
                            <div className="bg-white/5 p-10 sm:p-14 rounded-[3rem] sm:rounded-[4rem] border border-white/10 shadow-2xl backdrop-blur-3xl group hover:border-brand-accent/30 transition-all duration-700">
                                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-accent mb-6 sm:mb-10 flex items-center">
                                    <Landmark size={14} className="mr-3" /> Est. Enterprise Value
                                </p>
                                <p className="text-4xl sm:text-7xl font-black text-white italic tracking-tighter leading-none">{result.estimatedValue}</p>
                            </div>
                            <div className="bg-white/5 p-10 sm:p-14 rounded-[3rem] sm:rounded-[4rem] border border-white/10 shadow-2xl backdrop-blur-3xl group hover:border-emerald-400/30 transition-all duration-700">
                                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-accent mb-6 sm:mb-10 flex items-center">
                                    <Target size={14} className="mr-3" /> Viability Index
                                </p>
                                <p className="text-4xl sm:text-7xl font-black text-emerald-400 italic tracking-tighter leading-none">{result.viabilityScore}<span className="text-2xl sm:text-4xl text-white/30 ml-3 font-light">/100</span></p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[12px] sm:text-[15px] font-black uppercase tracking-[0.6em] text-brand-accent mb-10 sm:mb-12 flex items-center">
                            <Info size={18} className="mr-4 sm:mr-5" /> Risk Profile Executive Summary
                            </h4>
                            <p className="text-2xl sm:text-3xl leading-[1.6] sm:leading-[1.7] text-indigo-50/80 italic font-light tracking-tight">
                            {result.riskAssessment}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-[12px] sm:text-[15px] font-black uppercase tracking-[0.6em] text-brand-accent mb-10 sm:mb-12">Advisory Recommendations</h4>
                            <div className="grid grid-cols-1 gap-6 sm:gap-8">
                            {result.fundingRecommendations.map((rec: string, i: number) => (
                                <motion.div 
                                    key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i + 0.6 }}
                                    className="bg-white/5 p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] text-lg sm:text-xl border border-white/5 flex items-center italic font-medium"
                                >
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-brand-accent rounded-full mr-6 sm:mr-8 shadow-[0_0_20px_rgba(197,160,89,0.6)]" />
                                    {rec}
                                </motion.div>
                            ))}
                            </div>
                        </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-grow relative z-10">
                        <div className="bg-white/5 p-10 sm:p-16 rounded-[3rem] sm:rounded-[4rem] border border-white/10 h-full overflow-y-auto hide-scrollbar max-h-[700px] shadow-inner">
                            <h4 className="text-[12px] sm:text-[15px] font-black uppercase tracking-[0.6em] text-emerald-400 mb-12 flex items-center sticky top-0 bg-brand-primary-dark/80 backdrop-blur-md py-6 z-20">
                                <ClipboardCheck size={20} className="mr-5" /> Comprehensive Risk Assessment Report
                            </h4>
                            <div className="text-xl sm:text-2xl leading-[1.8] text-indigo-50/90 italic font-light tracking-tight whitespace-pre-wrap">
                                {result.detailedAnalysis}
                            </div>
                        </div>
                    </motion.div>
                  )}
                  
                  <div className="mt-24 sm:mt-32 pt-10 sm:pt-16 border-t border-white/10 text-[10px] sm:text-[12px] font-black text-white/20 uppercase tracking-[0.4em] sm:tracking-[0.8em] flex justify-between">
                    <span>AUTHENTICATED AI ARTIFACT</span>
                    <span className="hidden sm:block">RISK-NODE-955 | SECURE</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex-grow border-4 border-dashed border-slate-100 rounded-[3rem] sm:rounded-[5rem] flex flex-col items-center justify-center p-12 sm:p-32 text-center bg-white/50 shadow-inner"
                >
                  {loading ? (
                     <div className="space-y-12 sm:space-y-16 flex flex-col items-center">
                        <div className="relative w-24 h-24 sm:w-40 sm:h-40">
                            <div className="absolute inset-0 border-[8px] sm:border-[12px] border-slate-100 rounded-full" />
                            <div className="absolute inset-0 border-[8px] sm:border-[12px] border-brand-primary border-t-brand-accent rounded-full animate-spin shadow-2xl shadow-indigo-900/20" />
                        </div>
                        <p className="text-brand-primary font-black uppercase tracking-[0.6em] text-[15px] sm:text-[18px] animate-pulse">Modeling Risk Node...</p>
                     </div>
                  ) : (
                    <div className="space-y-12 sm:space-y-16">
                      <div className="w-24 h-24 sm:w-40 sm:h-40 bg-slate-50 border border-slate-100 rounded-[3rem] sm:rounded-[4rem] flex items-center justify-center mx-auto text-slate-200">
                        <BarChart3 size={48} sm:size={80} />
                      </div>
                      <div className="space-y-6">
                        <h3 className="serif text-4xl sm:text-6xl text-brand-primary font-black tracking-tighter italic">Risk Analysis Idle.</h3>
                        <p className="text-slate-500 text-xl sm:text-2xl max-w-md mx-auto leading-relaxed font-medium italic opacity-80">
                          The heuristic engine requires enterprise metadata to generate a comprehensive risk report.
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
