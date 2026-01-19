
import React from 'react';
import { Calendar, Mail, Clock, ShieldCheck } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-7xl text-slate-900 font-bold mb-8">Contact Us</h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            Direct access to the senior advisory desk.
          </p>
        </div>
      </section>

      {/* Schedule A Meeting */}
      <section id="schedule-meeting" className="py-24 px-8 lg:px-24 border-t border-slate-100 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <h2 className="serif text-5xl text-slate-900 font-bold leading-tight">Schedule A Meeting</h2>
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
            <div className="bg-white border border-slate-200 p-12 rounded-[48px] shadow-2xl relative overflow-hidden">
               <form className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Representative</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 text-sm outline-none focus:border-indigo-500 transition-all shadow-inner" placeholder="Full Legal Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Institution</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 text-sm outline-none focus:border-indigo-500 transition-all shadow-inner" placeholder="Entity Name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Engagement Node</label>
                    <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-600 text-sm outline-none focus:border-indigo-500 transition-all shadow-inner cursor-pointer appearance-none">
                      <option>Initial Alpha Briefing</option>
                      <option>Capital Advisory Consultation</option>
                      <option>Due Diligence Node Mapping</option>
                      <option>Sovereign Instrument Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Context</label>
                    <textarea className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 text-sm outline-none focus:border-indigo-500 transition-all shadow-inner" rows={4} placeholder="Brief summary of requirements..." />
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-3">
                    <Calendar size={16} />
                    <span>Request Meeting Slot</span>
                  </button>
               </form>
               <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-50 blur-[100px] rounded-full pointer-events-none opacity-50" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;