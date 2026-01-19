
import React from 'react';
import { FileText, Presentation, BarChart3, ArrowDown } from 'lucide-react';

const Work: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-7xl text-slate-900 font-bold mb-8">Our Work</h1>
          <p className="text-slate-600 text-xl leading-relaxed max-w-2xl">
            We produce the institutional-grade artifacts required to command attention and secure capital in complex markets.
          </p>
        </div>
      </section>

      {/* Business Plans */}
      <section id="business-plans" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <FileText size={32} />
            </div>
            <h2 className="serif text-5xl text-slate-900 font-bold">Business Plans</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Proprietary strategic documents mapping multi-year operational nodes, competitor arbitrage, and global market positioning. Our plans are the foundation for large-scale enterprise growth.
            </p>
          </div>
          <div className="lg:w-1/2 w-full aspect-video bg-slate-50 rounded-[40px] border border-slate-200 p-12 flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <div className="w-1/3 h-2 bg-indigo-100 rounded-full" />
              <div className="w-2/3 h-2 bg-indigo-100 rounded-full" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">Architecture Visual Sample</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-white rounded-xl border border-slate-100 shadow-sm" />
              <div className="w-full h-12 bg-white rounded-xl border border-slate-100 shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Investor Decks */}
      <section id="investor-decks" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
              <Presentation size={32} />
            </div>
            <h2 className="serif text-5xl text-slate-900 font-bold">Investor Decks</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              High-fidelity visual narratives designed for senior credit committees and sovereign wealth boards. We distill complexity into absolute clarity.
            </p>
          </div>
          <div className="lg:w-1/2 w-full aspect-video bg-white rounded-[40px] border border-slate-200 p-12 flex flex-col items-center justify-center gap-6 shadow-xl">
            <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200 shadow-inner relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent" />
               <div className="absolute bottom-8 left-8 right-8">
                 <div className="w-full h-2 bg-slate-200 rounded-full mb-2" />
                 <div className="w-1/2 h-2 bg-slate-200 rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financials */}
      <section id="financials" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <BarChart3 size={32} />
            </div>
            <h2 className="serif text-5xl text-slate-900 font-bold">Financials</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Audit-ready projections, DCF modeling, and sensitivity analysis. We provide the hard data that institutional capital demands.
            </p>
          </div>
          <div className="lg:w-1/2 w-full bg-slate-50 rounded-[40px] border border-slate-200 p-12 space-y-8 shadow-inner">
             <div className="grid grid-cols-4 gap-4 h-32 items-end">
               <div className="h-1/2 bg-white rounded-lg shadow-sm" />
               <div className="h-full bg-indigo-100 rounded-lg shadow-sm" />
               <div className="h-2/3 bg-white rounded-lg shadow-sm" />
               <div className="h-5/6 bg-emerald-100 rounded-lg shadow-sm" />
             </div>
             <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">EBITDA Node V.2</span>
                  <span className="text-[10px] text-slate-900 font-mono font-bold">14.2%</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Cash Reserve</span>
                  <span className="text-[10px] text-slate-900 font-mono font-bold">$4.2M</span>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;