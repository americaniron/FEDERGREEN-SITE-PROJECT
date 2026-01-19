
import React, { useState } from 'react';
import { Calendar, Mail, Clock, ShieldCheck, ArrowRight, MapPin, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', institution: '', node: 'Initial Alpha Briefing', context: '' });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Legal name required.";
    if (!form.institution.trim()) e.institution = "Institution required.";
    if (form.context.length < 10) e.context = "Provide more detail (min 10 chars).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const inputClasses = (field: string) => `
    w-full bg-slate-50 border p-6 rounded-2xl text-[#0a0f1a] text-[15px] font-black outline-none transition-all shadow-inner
    ${errors[field] ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:bg-white focus:border-[#0a0f1a]'}
  `;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-32 px-10 lg:px-32 bg-[#fdfdfc] border-b border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-40 opacity-[0.02] pointer-events-none rotate-45"><Mail size={400} /></div>
        <div className="max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-emerald-800 text-[12px] font-black uppercase tracking-[0.6em] block mb-10 flex items-center">
                <div className="w-16 h-[2px] bg-emerald-800 mr-5" /> Transmission Gateway
            </span>
            <h1 className="serif text-7xl md:text-9xl text-[#0a0f1a] font-black mb-12 italic tracking-tighter leading-[0.9]">Contact <br/> Command.</h1>
            <p className="text-slate-500 text-2xl leading-relaxed max-w-2xl font-medium italic opacity-80">
              Direct access to the senior advisory desk for high-stakes capital tranches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule A Meeting */}
      <section id="schedule-meeting" className="py-48 px-10 lg:px-32 bg-white relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32 items-start">
          
          <div className="lg:w-1/2 space-y-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="space-y-10">
              <h2 className="serif text-6xl text-[#0a0f1a] font-black leading-tight italic tracking-tighter">Initiate Briefing <br/> Sequence.</h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium italic max-w-md">
                We prioritize high-velocity enterprises and established family offices ready for institutional structural nodes.
              </p>
            </motion.div>

            <div className="space-y-10">
              {[
                { icon: Clock, label: 'Response Target', val: '< 2 Hours (SLA)' },
                { icon: Calendar, label: 'Node Hours', val: '24/7 Global Desk' },
                { icon: ShieldCheck, label: 'Security Node', val: 'AES-256 Link Active' }
              ].map((item, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="flex items-center space-x-8 group"
                >
                  <div className="w-16 h-16 bg-[#fdfdfc] border border-slate-100 rounded-[1.8rem] flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-[#0a0f1a] group-hover:text-emerald-400 transition-all duration-700 group-hover:shadow-2xl">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1.5">{item.label}</p>
                    <p className="text-[#0a0f1a] font-black text-[15px] tracking-tight">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-16 border-t border-slate-50 space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">Global Hubs</p>
                <div className="flex flex-wrap gap-8">
                   <div className="flex items-center space-x-3 text-slate-500 font-medium italic"><MapPin size={16} className="text-emerald-700"/> <span>Geneva, CH</span></div>
                   <div className="flex items-center space-x-3 text-slate-500 font-medium italic"><MapPin size={16} className="text-emerald-700"/> <span>Dubai, UAE</span></div>
                   <div className="flex items-center space-x-3 text-slate-500 font-medium italic"><MapPin size={16} className="text-emerald-700"/> <span>New York, USA</span></div>
                </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-slate-100 p-16 rounded-[4rem] shadow-[0_96px_192px_-48px_rgba(10,15,26,0.18)] relative overflow-hidden glass-premium min-h-[600px] flex flex-col justify-center"
            >
               <AnimatePresence mode="wait">
                 {status === 'success' ? (
                   <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
                     <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                        <CheckCircle className="text-emerald-600" size={48} />
                     </div>
                     <h3 className="serif text-4xl font-black italic tracking-tighter text-[#0a0f1a]">Request Received.</h3>
                     <p className="text-slate-500 font-medium italic max-w-xs mx-auto">Your institutional briefing request has been logged. An agent will sync with your node shortly.</p>
                     <button onClick={() => setStatus('idle')} className="text-indigo-600 font-black uppercase text-[10px] tracking-[0.4em] border-b-2 border-indigo-100 pb-1">Submit Another Node</button>
                   </motion.div>
                 ) : (
                   <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-12 relative z-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3">Representative</label>
                          <input 
                            type="text" 
                            className={inputClasses('name')} 
                            placeholder="Full Legal Name" 
                            value={form.name}
                            onChange={e => {
                              setForm({...form, name: e.target.value});
                              if (errors.name) setErrors(prev => ({...prev, name: ''}));
                            }}
                          />
                          {errors.name && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-3">{errors.name}</p>}
                        </div>
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3">Institution</label>
                          <input 
                            type="text" 
                            className={inputClasses('institution')} 
                            placeholder="Entity Name" 
                            value={form.institution}
                            onChange={e => {
                              setForm({...form, institution: e.target.value});
                              if (errors.institution) setErrors(prev => ({...prev, institution: ''}));
                            }}
                          />
                          {errors.institution && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-3">{errors.institution}</p>}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3">Engagement Node</label>
                        <div className="relative">
                            <select 
                              className="w-full bg-slate-50 border border-slate-100 p-6 rounded-2xl text-[#0a0f1a] text-[15px] font-black outline-none focus:bg-white focus:border-[#0a0f1a] transition-all shadow-inner cursor-pointer appearance-none"
                              value={form.node}
                              onChange={e => setForm({...form, node: e.target.value})}
                            >
                                <option>Initial Alpha Briefing</option>
                                <option>Capital Advisory Consultation</option>
                                <option>Due Diligence Node Mapping</option>
                                <option>Sovereign Instrument Inquiry</option>
                            </select>
                            <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-slate-300 pointer-events-none" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3">Strategic Context</label>
                        <textarea 
                          className={inputClasses('context') + " resize-none font-medium"} 
                          rows={5} 
                          placeholder="Brief summary of institutional requirements..." 
                          value={form.context}
                          onChange={e => {
                            setForm({...form, context: e.target.value});
                            if (errors.context) setErrors(prev => ({...prev, context: ''}));
                          }}
                        />
                        {errors.context && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-3">{errors.context}</p>}
                      </div>
                      <button 
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-[#0a0f1a] text-white py-9 rounded-[2.5rem] font-black text-[13px] uppercase tracking-[0.6em] hover:bg-indigo-600 transition-all shadow-[0_32px_64px_-16px_rgba(10,15,26,0.4)] flex items-center justify-center group overflow-hidden relative disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="flex items-center relative z-10">
                            {status === 'submitting' ? (
                              <Loader2 className="animate-spin mr-5" size={20} />
                            ) : (
                              <Calendar size={20} className="mr-5" />
                            )}
                            {status === 'submitting' ? 'Transmitting Node...' : 'Request Meeting Slot'}
                            {status === 'idle' && <ArrowRight className="ml-5 group-hover:translate-x-3 transition-transform" size={20} />}
                        </span>
                      </button>
                   </motion.form>
                 )}
               </AnimatePresence>
               <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
