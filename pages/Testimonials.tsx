
import React, { useState } from 'react';
import { Star, MessageSquare, Send, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', institution: '', text: '' });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Representative identity required";
    if (!form.institution) newErrors.institution = "Institutional node required";
    if (!form.text || form.text.length < 10) newErrors.text = "Engagement narrative required (min 10 chars)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate node transmission
    setTimeout(() => {
      console.log("Pending Institutional Review:", form);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const FormField = ({ label, id, value, onChange, placeholder, error, textarea = false }: any) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <label htmlFor={id} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{label}</label>
        {error && <span className="text-[9px] font-bold text-rose-500 uppercase flex items-center"><AlertCircle size={10} className="mr-1" /> {error}</span>}
      </div>
      <div className="relative">
        {textarea ? (
          <motion.textarea 
            id={id}
            required 
            value={value} 
            onChange={onChange} 
            rows={5} 
            animate={error ? { x: [-1, 1, -1, 1, 0] } : {}}
            className={`w-full bg-slate-50 p-6 rounded-2xl outline-none border transition-all resize-none font-medium text-sm ${
              error ? 'border-rose-200 focus:border-rose-500 bg-rose-50/30' : 
              value ? 'border-emerald-100 focus:border-brand-primary' : 'border-transparent focus:border-brand-primary'
            }`} 
            placeholder={placeholder} 
          />
        ) : (
          <motion.input 
            id={id}
            required 
            value={value} 
            onChange={onChange} 
            animate={error ? { x: [-1, 1, -1, 1, 0] } : {}}
            className={`w-full bg-slate-50 p-6 rounded-2xl outline-none border transition-all font-medium text-sm ${
              error ? 'border-rose-200 focus:border-rose-500 bg-rose-50/30' : 
              value ? 'border-emerald-100 focus:border-brand-primary' : 'border-transparent focus:border-brand-primary'
            }`} 
            placeholder={placeholder} 
          />
        )}
        {value && !error && (
          <div className="absolute right-6 top-6 text-emerald-500">
            <CheckCircle2 size={16} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-stone py-32 px-6 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="serif text-5xl md:text-7xl font-black text-brand-primary mb-10 tracking-tighter italic">Client Testimonials.</h1>
            <p className="text-xl text-slate-500 font-medium italic mb-12 md:mb-20 leading-relaxed">Institutional trust is earned through sustained performance and absolute discretion.</p>
            
            {/* Restricted State */}
            <div className="p-12 md:p-20 border-2 border-dashed border-slate-200 rounded-[3rem] md:rounded-[4rem] text-center bg-white/40 shadow-inner">
              <Star className="mx-auto text-slate-200 mb-8" size={64} />
              <h3 className="serif text-3xl font-black text-brand-primary mb-4 italic tracking-tight">Institutional Confidentiality Node.</h3>
              <p className="text-slate-400 font-medium italic max-w-md mx-auto leading-relaxed">
                Federgreen Consulting adheres to strict non-disclosure protocols. Verified client performance records are currently undergoing compliance clearance for restricted public disclosure. Direct verification may be requested through our senior advisory desk.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl glass-premium">
            <div className="flex items-center space-x-4 mb-10">
              <MessageSquare className="text-brand-accent" size={24} />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Performance Feedback</span>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <ShieldCheck className="mx-auto text-emerald-600 mb-8" size={80} />
                  <h3 className="serif text-3xl font-black text-brand-primary mb-4 italic tracking-tight">Transmission Verified.</h3>
                  <p className="text-slate-500 font-medium italic mb-10">Your submission has been archived for institutional administrative review. Thank you for your professional feedback.</p>
                  <button onClick={() => { setIsSubmitted(false); setForm({name:'', institution:'', text:''}); }} className="text-brand-primary font-black uppercase text-[10px] tracking-widest underline underline-offset-8">Transmit Additional Data</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <FormField 
                    label="Authorized Representative" id="name" placeholder="Full Legal Name" 
                    value={form.name} error={errors.name}
                    onChange={(e: any) => setForm({...form, name: e.target.value})}
                  />
                  <FormField 
                    label="Institution" id="institution" placeholder="Entity / Family Office" 
                    value={form.institution} error={errors.institution}
                    onChange={(e: any) => setForm({...form, institution: e.target.value})}
                  />
                  <FormField 
                    label="Engagement Narrative" id="text" placeholder="Brief summary of engagement success..." 
                    textarea
                    value={form.text} error={errors.text}
                    onChange={(e: any) => setForm({...form, text: e.target.value})}
                  />
                  
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-4">
                    <AlertCircle className="text-brand-primary flex-shrink-0" size={18} />
                    <p className="text-[10px] text-slate-400 font-black uppercase leading-relaxed">Submissions are strictly confidential until verified by the compliance desk.</p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.5em] shadow-xl hover:bg-brand-accent transition-all duration-700 flex items-center justify-center disabled:opacity-50 group"
                  >
                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : 'Submit Qualification'}
                    {!isSubmitting && <Send className="ml-4" size={18} />}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
