
import React, { useState } from 'react';
import { getBusinessValuation } from '../services/geminiService';
import { ValuationData } from '../types';
import { Calculator, ArrowRight, TrendingUp, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
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

  const parseNumber = (str: string) => Number(str.replace(/[^0-9.-]+/g, ""));

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName) newErrors.businessName = "Entity name required";
    if (!formData.industry) newErrors.industry = "Industry node required";
    if (formData.annualRevenue <= 0) newErrors.annualRevenue = "Valid revenue required";
    if (formData.ebitda === 0) newErrors.ebitda = "EBITDA required";
    if (formData.growthRate < 0) newErrors.growthRate = "Invalid growth tranches";
    if (!formData.description || formData.description.length < 20) newErrors.description = "Provide detailed narrative (min 20 chars)";
    
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
      setErrors({ global: "Valuation engine error. Please verify input tranches." });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, id, value, onChange, placeholder, prefix, suffix, error, type = "text" }: any) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center px-1">
        <label htmlFor={id} className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest">{label}</label>
        {error && (
          <span className="text-[9px] font-bold text-rose-500 uppercase flex items-center">
            <AlertCircle size={10} className="mr-1" /> {error}
          </span>
        )}
      </div>
      <div className="relative">
        {prefix && <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{prefix}</span>}
        <motion.input 
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          animate={error ? { x: [-1, 1, -1, 1, 0] } : {}}
          className={`w-full bg-[#fdfcfb] border rounded-xl px-5 py-4 text-indigo-950 outline-none transition-all text-sm ${
            prefix ? 'pl-10' : ''
          } ${suffix ? 'pr-10' : ''} ${
            error ? 'border-rose-200 focus:border-rose-500 bg-rose-50/20' : 
            value ? 'border-emerald-100 focus:border-emerald-500' : 'border-indigo-50 focus:border-indigo-500'
          }`}
        />
        {suffix && <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 font-black text-[10px] uppercase tracking-widest">{suffix}</span>}
        {value && !error && (
          <div className={`absolute ${suffix ? 'right-12' : 'right-5'} top-1/2 -translate-y-1/2 text-emerald-500`}>
            <CheckCircle2 size={14} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-32">
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
          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-[2.5rem] border border-indigo-50 shadow-sm space-y-8 glass-premium">
            <div className="flex items-center space-x-3">
              <Calculator className="text-emerald-700" size={20} />
              <h2 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Business Intelligence</h2>
            </div>

            <form onSubmit={handleValuate} className="space-y-6">
              <InputField 
                label="Entity Name"
                id="businessName"
                value={formData.businessName}
                error={errors.businessName}
                onChange={(e: any) => setFormData({...formData, businessName: e.target.value})}
              />
              
              <InputField 
                label="Industry Node"
                id="industry"
                value={formData.industry}
                error={errors.industry}
                onChange={(e: any) => setFormData({...formData, industry: e.target.value})}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField 
                  label="Revenue (Annual)"
                  id="annualRevenue"
                  prefix="$"
                  value={formData.annualRevenue ? formData.annualRevenue.toLocaleString() : ""}
                  error={errors.annualRevenue}
                  onChange={(e: any) => setFormData({...formData, annualRevenue: parseNumber(e.target.value)})}
                />
                <InputField 
                  label="EBITDA"
                  id="ebitda"
                  prefix="$"
                  value={formData.ebitda ? formData.ebitda.toLocaleString() : ""}
                  error={errors.ebitda}
                  onChange={(e: any) => setFormData({...formData, ebitda: parseNumber(e.target.value)})}
                />
              </div>

              <InputField 
                label="Revenue Growth"
                id="growthRate"
                suffix="%"
                placeholder="0"
                value={formData.growthRate || ""}
                error={errors.growthRate}
                onChange={(e: any) => setFormData({...formData, growthRate: parseNumber(e.target.value)})}
              />

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label htmlFor="description" className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest">Model Description</label>
                  {errors.description && <span className="text-[9px] font-bold text-rose-500 uppercase">{errors.description}</span>}
                </div>
                <textarea 
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className={`w-full bg-[#fdfcfb] border rounded-xl px-5 py-4 text-indigo-950 outline-none transition-all text-sm h-28 resize-none ${
                    errors.description ? 'border-rose-200 focus:border-rose-500' : 'border-indigo-50 focus:border-indigo-500'
                  }`} 
                  placeholder="Summarize revenue mechanics and market positioning..."
                />
              </div>

              {errors.global && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-[10px] font-black uppercase flex items-center">
                  <AlertCircle size={14} className="mr-2" /> {errors.global}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-emerald-700 transition-all shadow-xl shadow-indigo-900/20 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center">
                  {loading ? 'Analyzing Capital Structure...' : 'Generate Valuation'}
                  {!loading && <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />}
                </span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full min-h-[500px] lg:min-h-[600px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-indigo-950 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col min-h-[600px] h-full"
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
                <div className="flex-grow border-2 border-dashed border-indigo-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white/50 h-full">
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
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Valuation;
