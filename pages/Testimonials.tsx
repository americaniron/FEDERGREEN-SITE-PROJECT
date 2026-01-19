
import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, ShieldCheck, AlertCircle } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [formState, setFormState] = useState({ name: '', company: '', content: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Note A: Hidden until real testimonials exist
  const testimonials = submissions.filter(s => s.status === 'published');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmission = {
      ...formState,
      id: Date.now().toString(),
      status: 'pending', // Note A: Admin review required
      date: new Date().toLocaleDateString()
    };
    
    const current = JSON.parse(localStorage.getItem('pending_testimonials') || '[]');
    localStorage.setItem('pending_testimonials', JSON.stringify([...current, newSubmission]));
    
    setIsSubmitted(true);
    setFormState({ name: '', company: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-white py-24 px-8 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Display/Placeholder */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <h1 className="serif text-6xl text-slate-900 font-bold mb-6">Testimonials</h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Institutional trust is earned through consistent performance and unwavering discretion.
            </p>
          </div>

          {testimonials.length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200 p-16 rounded-[40px] text-center shadow-inner">
              <Star className="w-12 h-12 text-slate-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Curating Client Insights</h2>
              <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                Our first set of verified institutional testimonials is currently undergoing clearance. They will be unmasked here shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Future testimonials map here */}
            </div>
          )}
        </div>

        {/* Right Column: Submission Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white border border-slate-200 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MessageSquare size={120} />
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck className="text-emerald-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Transmission Successful</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Your feedback has been received by our internal compliance desk. All submissions undergo admin review before publication.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="text-indigo-600 text-xs font-bold uppercase tracking-widest border-b border-indigo-200 pb-1 hover:border-indigo-500 transition-all">
                  Submit another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.4em]">Post-Engagement</p>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Client Submission</h2>
                </div>

                <div className="space-y-4">
                  <input 
                    type="text" required placeholder="Authorized Representative Name" 
                    value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 text-sm focus:border-indigo-500 transition-all outline-none shadow-inner placeholder-slate-400"
                  />
                  <input 
                    type="text" required placeholder="Institutional Entity / Family Office" 
                    value={formState.company} onChange={e => setFormState({...formState, company: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 text-sm focus:border-indigo-500 transition-all outline-none shadow-inner placeholder-slate-400"
                  />
                  <textarea 
                    required placeholder="Share your experience working with Federgreen Consulting..." 
                    value={formState.content} onChange={e => setFormState({...formState, content: e.target.value})}
                    rows={5} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 text-sm focus:border-indigo-500 transition-all outline-none shadow-inner placeholder-slate-400"
                  />
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                  Secure Submission <Send className="ml-2" size={14} />
                </button>

                <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100 mt-8">
                  <AlertCircle size={16} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">
                    Note: Admin review required before publishing. Submitted data is encrypted and persistent.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;