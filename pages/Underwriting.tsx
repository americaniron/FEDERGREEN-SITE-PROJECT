
import React, { useState } from 'react';
import { underwriteRealEstate } from '../services/geminiService';
import { RealEstateDeal } from '../types';
import { 
  ShieldCheck, ArrowRight, Printer, AlertTriangle, Calculator, FileText, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="24" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const Underwriting: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deal, setDeal] = useState<RealEstateDeal>({
    propertyType: '',
    location: '',
    purchasePrice: 0,
    estimatedRenovation: 0,
    arv: 0,
    rentalIncome: 0
  });

  const formatCurrency = (val: number) => {
    if (!val) return "";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const parseCurrency = (str: string) => {
    return Number(str.replace(/[^0-9.-]+/g, ""));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!deal.propertyType) newErrors.propertyType = "Asset class required";
    if (!deal.location) newErrors.location = "Geographic node required";
    if (deal.purchasePrice <= 0) newErrors.purchasePrice = "Invalid acquisition cost";
    if (deal.arv <= 0) newErrors.arv = "Invalid ARV target";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUnderwrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const evaluation = await underwriteRealEstate(deal);
      setResult(evaluation);
    } catch (error) {
      console.error(error);
      setErrors({ global: "Node timeout: Could not reach underwriting engine." });
    } finally {
      setLoading(false);
    }
  };

  const InputGroup = ({ label, id, value, onChange, placeholder, prefix, type = "text", error }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label htmlFor={id} className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{label}</label>
        {error && (
          <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} className="text-[9px] font-bold text-rose-500 uppercase flex items-center">
            <AlertCircle size={10} className="mr-1" /> {error}
          </motion.span>
        )}
      </div>
      <div className="relative group">
        {prefix && <span className={`absolute left-5 top-1/2 -translate-y-1/2 font-bold text-sm transition-colors ${error ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-brand-primary'}`}>{prefix}</span>}
        <motion.input 
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
          className={`w-full bg-slate-50/50 border rounded-2xl py-5 text-slate-900 focus:bg-white outline-none transition-all shadow-inner text-sm font-medium ${prefix ? 'pl-10' : 'pl-6'} pr-12 ${
            error ? 'border-rose-200 focus:border-rose-500 bg-rose-50/30' : 
            value ? 'border-emerald-100 focus:border-emerald-500' : 'border-slate-100 focus:border-brand-primary'
          }`}
        />
        {value && !error && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500">
            <CheckCircle2 size={16} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#fafaf9] min-h-screen py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-[2px] bg-emerald-700" />
            <span className="text-emerald-700 text-[11px] font-black uppercase tracking-[0.6em]">Institutional Credit Desk</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="serif text-4xl md:text-7xl text-slate-950 font-black leading-[0.9] tracking-tighter mb-8 italic">
            Sovereign <br/> Underwriting.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
            Immediate algorithmic analysis for multi-family and commercial tranches. Executing deep-node risk assessment in sub-second intervals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_48px_128px_-32px_rgba(0,0,0,0.08)] space-y-10 glass-premium"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 shadow-inner">
                <Calculator size={20} />
              </div>
              <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.4em]">Submission Matrix</h2>
            </div>
            
            <form onSubmit={handleUnderwrite} className="space-y-6">
              <InputGroup 
                label="Asset Classification" 
                id="propertyType"
                placeholder="e.g. Class-A Multi-family"
                value={deal.propertyType}
                error={errors.propertyType}
                onChange={(e: any) => {
                  setDeal({...deal, propertyType: e.target.value});
                  if(errors.propertyType) setErrors({...errors, propertyType: ''});
                }}
              />
              
              <InputGroup 
                label="Geographic Node" 
                id="location"
                placeholder="City, State / Region"
                value={deal.location}
                error={errors.location}
                onChange={(e: any) => {
                  setDeal({...deal, location: e.target.value});
                  if(errors.location) setErrors({...errors, location: ''});
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputGroup 
                  label="Acquisition Cost" 
                  id="purchasePrice"
                  prefix="$"
                  placeholder="0"
                  value={deal.purchasePrice ? deal.purchasePrice.toLocaleString() : ""}
                  error={errors.purchasePrice}
                  onChange={(e: any) => {
                    const val = parseCurrency(e.target.value);
                    setDeal({...deal, purchasePrice: val});
                    if(errors.purchasePrice) setErrors({...errors, purchasePrice: ''});
                  }}
                />
                <InputGroup 
                  label="Capex (Est)" 
                  id="estimatedRenovation"
                  prefix="$"
                  placeholder="0"
                  value={deal.estimatedRenovation ? deal.estimatedRenovation.toLocaleString() : ""}
                  onChange={(e: any) => setDeal({...deal, estimatedRenovation: parseCurrency(e.target.value)})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputGroup 
                  label="Target ARV" 
                  id="arv"
                  prefix="$"
                  placeholder="0"
                  value={deal.arv ? deal.arv.toLocaleString() : ""}
                  error={errors.arv}
                  onChange={(e: any) => {
                    const val = parseCurrency(e.target.value);
                    setDeal({...deal, arv: val});
                    if(errors.arv) setErrors({...errors, arv: ''});
                  }}
                />
                <InputGroup 
                  label="Monthly Yield" 
                  id="rentalIncome"
                  prefix="$"
                  placeholder="0"
                  value={deal.rentalIncome ? deal.rentalIncome.toLocaleString() : ""}
                  onChange={(e: any) => setDeal({...deal, rentalIncome: parseCurrency(e.target.value)})}
                />
              </div>

              {errors.global && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold uppercase tracking-widest flex items-center">
                  <AlertTriangle size={14} className="mr-2" /> {errors.global}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-950 text-white py-6 md:py-8 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.6em] hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-900/40 disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="flex items-center justify-center relative z-10">
                  {loading ? 'Executing AI Underwrite Node...' : 'Initiate Memo Generation'}
                  {!loading && <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={18} />}
                </span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col h-full min-h-[600px] lg:min-h-[700px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -20 }}
                  className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.12)] p-8 md:p-16 flex flex-col glass-premium relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                    <FileText size={200} />
                  </div>

                  <div className="flex justify-between items-start mb-12 md:mb-16 border-b border-slate-50 pb-8 md:pb-10 relative z-10">
                    <div>
                      <h2 className="serif text-3xl md:text-4xl font-black text-slate-950 mb-3 tracking-tighter">Credit Memorandum</h2>
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Reference Node: FC-UWR-{Math.floor(Math.random()*900000)}</p>
                    </div>
                    <button onClick={() => window.print()} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all shadow-inner text-slate-900">
                      <Printer size={20} />
                    </button>
                  </div>

                  <div className="mb-12 md:mb-16 relative z-10 text-center md:text-left">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 block mb-4">Underwriting Recommendation</span>
                    <div className="flex flex-col md:flex-row items-center md:space-x-6">
                      <h3 className={`text-4xl md:text-6xl font-black tracking-tighter italic mb-4 md:mb-0 ${result.recommendation.toLowerCase().includes('approve') ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {result.recommendation}
                      </h3>
                      {result.recommendation.toLowerCase().includes('approve') ? (
                         <CheckCircle2 className="text-emerald-500 shadow-emerald-500/20 shadow-xl" size={48} />
                      ) : (
                         <AlertTriangle className="text-rose-500 shadow-rose-500/20 shadow-xl" size={48} />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16 relative z-10">
                    <div className="bg-slate-50/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Coverage (DSCR)</p>
                      <p className="text-3xl md:text-5xl font-black text-slate-950 font-mono tracking-tighter">{result.dscr}x</p>
                    </div>
                    <div className="bg-slate-50/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Estimated Yield</p>
                      <p className="text-3xl md:text-5xl font-black text-emerald-600 font-mono tracking-tighter">{result.estimatedRoi}%</p>
                    </div>
                  </div>

                  <div className="space-y-10 md:space-y-12 flex-grow relative z-10">
                    <div>
                      <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-950 mb-6 flex items-center">
                        <div className="w-8 h-[2px] bg-emerald-700 mr-3" /> Risk Node Breakdown
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.keyRisks.map((risk: string, i: number) => (
                          <li key={i} className="flex items-start text-xs md:text-[13px] font-medium text-slate-600 bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="mr-3 text-emerald-600 font-black">•</span> {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-950 mb-4 flex items-center">
                        <div className="w-8 h-[2px] bg-emerald-700 mr-3" /> Executive Analysis
                      </h4>
                      <p className="text-base md:text-lg leading-relaxed text-slate-500 font-medium italic">
                        {result.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] space-y-4 sm:space-y-0 relative z-10">
                    <span className="flex items-center"><LogoMark className="mr-2 w-3 h-3" color="#6366f1" /> Analytical Engine: Gemini-3-Institutional</span>
                    <span>Node FC-ZURICH | Verified </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex-grow border-2 border-dashed border-slate-200 rounded-[4rem] flex flex-col items-center justify-center p-8 md:p-20 text-center bg-white/40 shadow-inner"
                >
                  {loading ? (
                    <div className="space-y-10 flex flex-col items-center">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-[6px] border-slate-100 rounded-full" />
                        <div className="absolute inset-0 border-[6px] border-emerald-600 border-t-transparent rounded-full animate-spin shadow-2xl" />
                      </div>
                      <div className="space-y-4">
                         <p className="text-slate-950 font-black uppercase tracking-[0.6em] text-[13px] animate-pulse">Modeling Yield Tranches...</p>
                         <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black">Applying sovereign heuristic checks</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 shadow-inner">
                        <ShieldCheck size={40} />
                      </div>
                      <div className="space-y-4">
                        <h3 className="serif text-3xl md:text-4xl text-slate-950 font-black tracking-tighter">Waiting for Briefing.</h3>
                        <p className="text-slate-500 text-base md:text-lg max-w-sm mx-auto font-medium">
                          Input the deal metadata to initiate the institutional underwriting protocol.
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
