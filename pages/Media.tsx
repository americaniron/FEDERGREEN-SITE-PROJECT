
import React from 'react';
import { Mail, Newspaper, ArrowRight, ExternalLink } from 'lucide-react';

const Media: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-7xl text-slate-900 font-bold mb-8">Media</h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            Market intelligence nodes from the Federgreen senior advisory desk.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletters" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600">
              <Mail size={32} />
            </div>
            <h2 className="serif text-5xl text-slate-900 font-bold">Newsletters</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Proprietary weekly briefing on global liquidity shifts, private credit arbitrage, and institutional node mapping. 
            </p>
            <div className="flex bg-white border border-slate-300 rounded-2xl overflow-hidden focus-within:border-indigo-500 shadow-sm transition-all">
              <input type="email" placeholder="Institutional Email" className="flex-1 bg-transparent px-6 py-5 text-slate-900 outline-none" />
              <button className="px-8 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all">Subscribe</button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="aspect-[3/4] bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-end hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg mb-4 shadow-sm" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Issue #04{i}</p>
                  <h4 className="text-xs text-slate-900 font-bold uppercase tracking-tight">Q3 Liquidity Node Report</h4>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section id="blogs" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <h2 className="serif text-5xl text-slate-900 font-bold">Blogs</h2>
            <p className="text-slate-500 text-sm hidden md:block uppercase tracking-widest font-bold">Deep-dive technical analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { date: 'Oct 24, 2024', title: 'The Convergence of Private Equity and Digital Collateral', cat: 'Alpha' },
              { date: 'Oct 18, 2024', title: 'Managing Sovereign Debt Nodes in Volatile Corridors', cat: 'Strategy' }
            ].map((blog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[16/9] bg-white border border-slate-200 rounded-[40px] mb-8 overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all">
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-100 to-transparent opacity-20" />
                   <div className="absolute top-8 right-8 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-md opacity-0 group-hover:opacity-100 transition-all">
                      <ExternalLink size={18} />
                   </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                   <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">{blog.cat}</span>
                   <span className="text-slate-400 font-mono text-[10px]">{blog.date}</span>
                </div>
                <h3 className="text-2xl text-slate-900 font-bold group-hover:text-indigo-600 transition-colors leading-tight">
                  {blog.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;