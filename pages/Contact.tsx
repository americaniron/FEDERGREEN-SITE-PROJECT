
import React, { useState } from 'react';
import { Calendar, Mail, Clock, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    node: 'Initial Alpha Briefing',
    context: ''
  });

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (!digits) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Representative required";
    if (!form.institution) newErrors.institution = "Entity required";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Valid institutional email required";
    if (form.phone && form.phone.length < 14) newErrors.phone = "Complete node coordinate required";
    if (!form.context) newErrors.context = "Engagement context required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API node delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const FormInput = ({ label, id, value, onChange, placeholder, error, type = "text" }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label htmlFor={id} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
        {error && <span className="text-[9px] font-bold text-rose-500 uppercase flex items-center"><AlertCircle size={10} className="mr-1" /> {error}</span>}
      </div>
      <motion.input 
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        animate={error ? { x: [-1, 1, -1, 1, 0] } : {}}
        className={`w-full bg-slate-50/50 border p-4 rounded-xl text-slate-900 text-sm outline-none transition-all shadow-inner ${
          error ? 'border-rose-200 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
        }`}
      />
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-4xl md:text-7xl text-slate-900 font-bold mb-8">Contact Us</h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            Direct access to the senior advisory desk.
          </p>
        </div>
      </section>

      {/* Schedule A Meeting */}
      <section id="schedule-meeting" className="py-24 px-6 md:px-8 lg:px-24 border-t border-slate-100 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <h2 className="serif text-4xl md:text-5xl text-slate-900 font-bold leading-tight">Schedule A Meeting</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We prioritize high-velocity enterprises and established family offices. Select your engagement node below.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Clock, label: 'Response Target', val: '< 2 Hours' },
                { icon: Calendar, label: 'Node Hours', val: '24/7 Global Desk' },
                { icon: ShieldCheck, label: 'Security Node', val: 'AES-256 Link' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-slate-900 font-bold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden glass-premium">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 space-y-8 relative z-10"
                  >
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xl shadow-emerald-500/10">
                      <CheckCircle2 size={48} />
                    </div>
                    <div>
                      <h3 className="serif text-4xl font-black text-brand-primary italic">Transmission Received</h3>
                      <p className="text-slate-500 font-medium italic mt-4 max-w-sm mx-auto">
                        Your strategic inquiry has been archived. A senior advisory node will initiate contact within the specified response target.
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-[10px] font-black uppercase tracking-widest text-brand-primary underline underline-offset-8"
                    >
                      New Engagement Node
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormInput 
                        label="Representative" id="name" placeholder="Full Legal Name" 
                        value={form.name} error={errors.name}
                        onChange={(e: any) => setForm({...form, name: e.target.value})}
                      />
                      <FormInput 
                        label="Institution" id="institution" placeholder="Entity Name" 
                        value={form.institution} error={errors.institution}
                        onChange={(e: any) => setForm({...form, institution: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormInput 
                        label="Institutional Email" id="email" type="email" placeholder="name@entity.com" 
                        value={form.email} error={errors.email}
                        onChange={(e: any) => setForm({...form, email: e.target.value})}
                      />
                      <FormInput 
                        label="Direct Coord (Optional)" id="phone" placeholder="(555) 000-0000" 
                        value={form.phone} error={errors.phone}
                        onChange={(e: any) => setForm({...form, phone: formatPhone(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="node" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Engagement Node</label>
                      <select 
                        id="node"
                        value={form.node}
                        onChange={e => setForm({...form, node: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-600 text-sm outline-none focus:border-indigo-500 transition-all shadow-inner cursor-pointer appearance-none"
                      >
                        <option>Initial Alpha Briefing</option>
                        <option>Capital Advisory Consultation</option>
                        <option>Due Diligence Node Mapping</option>
                        <option>Sovereign Instrument Inquiry</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label htmlFor="context" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Context</label>
                        {errors.context && <span className="text-[9px] font-bold text-rose-500 uppercase">{errors.context}</span>}
                      </div>
                      <textarea 
                        id="context"
                        value={form.context}
                        onChange={e => setForm({...form, context: e.target.value})}
                        className={`w-full bg-slate-50 border p-4 rounded-xl text-slate-900 text-sm outline-none transition-all shadow-inner h-32 resize-none ${
                          errors.context ? 'border-rose-200 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
                        }`} 
                        placeholder="Brief summary of requirements..." 
                      />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-3 disabled:opacity-50 group"
                    >
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Calendar size={16} />}
                      <span>{isSubmitting ? 'Syncing Node...' : 'Request Meeting Slot'}</span>
                      {!isSubmitting && <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                )}
              </AnimatePresence>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-50 blur-[100px] rounded-full pointer-events-none opacity-50" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
