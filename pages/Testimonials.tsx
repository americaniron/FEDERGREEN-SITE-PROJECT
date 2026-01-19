
import React, { useState } from 'react';
import { Star, MessageSquare, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', institution: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log("Pending Review:", form);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ivory py-32 px-10 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
        
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="serif text-7xl font-black text-oxford-navy mb-10 tracking-tighter italic">Client Testimonials.</h1>
            <p className="text-xl text-slate-500 font-medium italic mb-20 leading-relaxed">Institutional trust is earned through performance. Our track record is our greatest credential.</p>
            
            {/* Empty State */}
            <div className="p-20 border-2 border-dashed border-slate-200 rounded-[4rem] text-center bg-white/40 shadow-inner">
              <Star className="mx-auto text-slate-200 mb-8" size={64} />
              <h3 className="serif text-3xl font-black text-oxford-navy mb-4 italic tracking-tight">Curating Institutional Feedback.</h3>
              <p className="text-slate-400 font-medium italic">Verified testimonials from our senior advisory tranches will be published here following institutional clearance.</p>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl glass-premium">
            <div className="flex items-center space-x-4 mb-10">
              <MessageSquare className="text-forest-green" size={24} />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Submission Gateway</span>
            </div>

            {isSubmitted ? (
              <div className="text-center py-20">
                <ShieldCheck className="mx-auto text-forest-green mb-8" size={80} />
                <h3 className="serif text-3xl font-black text-oxford-navy mb-4 italic tracking-tight">Transmission Verified.</h3>
                <p className="text-slate-500 font-medium italic mb-10">Your submission has been archived for administrative review. Thank you for your institutional feedback.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-oxford-navy font-black uppercase text-[10px] tracking-widest underline underline-offset-8">Transmit Additional Data</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-3 ml-2">Authorized Representative</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-slate-50 p-6 rounded-2xl outline-none border border-transparent focus:border-oxford-navy transition-all" placeholder="Full Legal Name" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-3 ml-2">Institution</label>
                  <input required value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} className="w-full bg-slate-50 p-6 rounded-2xl outline-none border border-transparent focus:border-oxford-navy transition-all" placeholder="Entity / Family Office" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-3 ml-2">Engagement Narrative</label>
                  <textarea required value={form.text} onChange={e => setForm({...form, text: e.target.value})} rows={5} className="w-full bg-slate-50 p-6 rounded-2xl outline-none border border-transparent focus:border-oxford-navy transition-all resize-none" placeholder="Share your experience..." />
                </div>
                
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-4">
                  <AlertCircle className="text-oxford-navy flex-shrink-0" size={18} />
                  <p className="text-[10px] text-slate-400 font-black uppercase leading-relaxed">Submissions are private until verified by the Federgreen Compliance Desk.</p>
                </div>

                <button type="submit" className="w-full py-6 bg-oxford-navy text-white rounded-2xl font-black uppercase tracking-[0.5em] shadow-xl hover:bg-forest-green transition-all duration-700 flex items-center justify-center">
                  Submit Feedback <Send className="ml-4" size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
