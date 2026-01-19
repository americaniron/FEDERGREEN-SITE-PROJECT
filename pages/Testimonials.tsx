
import React, { useState } from 'react';
/* Added ArrowRight to the imports from lucide-react */
import { Star, MessageSquare, Send, ShieldCheck, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', institution: '', text: '' });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.institution.trim()) e.institution = "Institution is required.";
    if (form.text.length < 20) e.text = "Feedback must be at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    setTimeout(() => {
      console.log("INTERNAL LOG: Submission captured. Status: Pending Review.");
      setStatus('success');
    }, 1500);
  };

  const inputClasses = (field: string) => `
    w-full bg-slate-50 border p-6 rounded-2xl outline-none transition-all shadow-inner font-medium
    ${errors[field] ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:bg-white focus:border-[#0a0f1a]'}
  `;

  return (
    <div className="min-h-screen bg-[#fdfdfc] py-24 sm:py-32 px-6 sm:px-10 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 sm:gap-24">
        
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center space-x-4 mb-8">
              <Star className="text-emerald-500" size={24} fill="currentColor" />
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-emerald-800">Credential Audit</span>
            </div>
            <h1 className="serif text-5xl sm:text-7xl font-black text-[#0a0f1a] mb-10 tracking-tighter italic">Client Testimonials.</h1>
            
            {/* Conditional Display Note */}
            <div className="p-12 sm:p-20 border-2 border-dashed border-slate-200 rounded-[3rem] text-center bg-white/40 shadow-inner">
              <MessageSquare className="mx-auto text-slate-200 mb-8" size={64} />
              <h3 className="serif text-2xl sm:text-3xl font-black text-[#0a0f1a] mb-4 italic tracking-tight">Curating Institutional Feedback.</h3>
              <p className="text-slate-400 font-medium italic text-lg leading-relaxed">
                Verified testimonials from our senior advisory tranches will be published here following institutional clearance and compliance review.
              </p>
              {status === 'success' && (
                <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center space-x-3">
                  <ShieldCheck size={18} className="text-emerald-600" />
                  <span className="text-[10px] font-black uppercase text-emerald-800 tracking-widest">Feedback archived for review</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-100 shadow-2xl glass-premium min-h-[500px] flex flex-col justify-center">
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-10 h-10 bg-[#0a0f1a] rounded-xl flex items-center justify-center text-white">
                <Send size={18} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Submission Gateway</span>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <ShieldCheck className="mx-auto text-emerald-500 mb-8" size={80} />
                  <h3 className="serif text-3xl font-black text-[#0a0f1a] mb-4 italic tracking-tight">Transmission Captured.</h3>
                  <p className="text-slate-500 font-medium italic mb-10 text-lg">Your documentation has been archived for compliance review.</p>
                  <button onClick={() => setStatus('idle')} className="text-[#0a0f1a] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#0a0f1a] pb-1">Submit Additional Data</button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="serif text-2xl font-black italic tracking-tight">Project Feedback</h2>
                    <p className="text-slate-400 text-sm italic">Designed for submission immediately after project node completion.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-1 ml-2">Authorized Representative</label>
                    <input 
                      className={inputClasses('name')} 
                      placeholder="Full Legal Name" 
                      value={form.name}
                      onChange={e => { setForm({...form, name: e.target.value}); if (errors.name) setErrors(prev => ({...prev, name: ''})); }}
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-2">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-1 ml-2">Institution</label>
                    <input 
                      className={inputClasses('institution')} 
                      placeholder="Entity / Family Office" 
                      value={form.institution}
                      onChange={e => { setForm({...form, institution: e.target.value}); if (errors.institution) setErrors(prev => ({...prev, institution: ''})); }}
                    />
                    {errors.institution && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-2">{errors.institution}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-1 ml-2">Engagement Narrative</label>
                    <textarea 
                      rows={5} 
                      className={inputClasses('text') + " resize-none"} 
                      placeholder="Experience details..." 
                      value={form.text}
                      onChange={e => { setForm({...form, text: e.target.value}); if (errors.text) setErrors(prev => ({...prev, text: ''})); }}
                    />
                    {errors.text && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-2">{errors.text}</p>}
                  </div>
                  
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-4">
                    <AlertCircle className="text-[#0a0f1a] flex-shrink-0" size={18} />
                    <p className="text-[10px] text-slate-400 font-black uppercase leading-relaxed tracking-tight">Compliance Note: Feedback is strictly private until authorized for node publication.</p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full py-7 bg-[#0a0f1a] text-white rounded-3xl font-black uppercase tracking-[0.6em] shadow-xl hover:bg-emerald-600 transition-all duration-700 flex items-center justify-center text-sm disabled:opacity-50"
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin mr-4" size={20} /> : <ArrowRight className="mr-4 opacity-0" size={18} />}
                    {status === 'submitting' ? 'Executing Submission...' : 'Execute Submission'}
                    <ArrowRight className={`ml-4 ${status === 'submitting' ? 'hidden' : 'block'}`} size={18} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
