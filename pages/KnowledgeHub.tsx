
import React from 'react';

const KnowledgeHub: React.FC = () => {
  const articles = [
    {
      title: "The Case for Bitcoin as a Tier-1 Bank Asset",
      readTime: "12 min",
      author: "Davina Federgreen",
      desc: "An architectural deep dive into why institutional liquidity is shifting toward digital collateral in Basel III/IV environments."
    },
    {
      title: "Navigating Basel IV: Capital Adequacy in 2025",
      readTime: "8 min",
      author: "Senior Compliance Desk",
      desc: "Understanding how new capital requirements affect cross-border trade programs and monetization strategies."
    },
    {
      title: "Renewable Energy Bonds: Yield vs Impact",
      readTime: "15 min",
      author: "Sovereign Desk",
      desc: "A feasibility study on high-ROI infrastructure project funding in emerging African and Asian markets."
    },
    {
      title: "The Evolution of Hybrid Instruments",
      readTime: "10 min",
      author: "Capital Strategy",
      desc: "How debt/equity hybrids are being redesigned for the higher-interest-rate 'New Normal'."
    }
  ];

  return (
    <div className="bg-[#fdfcfb] min-h-screen">
      <div className="bg-indigo-950 py-32 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="serif text-5xl md:text-6xl text-white font-bold mb-6">Knowledge Hub</h1>
          <p className="text-indigo-200 text-xl max-w-3xl leading-relaxed">
            In-depth analysis, whitepapers, and technical reports on the future of institutional finance and global capital markets.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {articles.map((art, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">{art.author}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 text-xs">{art.readTime} read</span>
                </div>
                <h3 className="text-3xl font-bold text-indigo-950 group-hover:text-emerald-800 transition-colors mb-4">{art.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">{art.desc}</p>
                <button className="flex items-center text-emerald-700 font-bold hover:text-emerald-800 transition-all text-sm uppercase tracking-widest">
                  Download Whitepaper
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                </button>
                <div className="mt-12 h-[1px] bg-indigo-50"></div>
              </div>
            ))}
          </div>

          <aside className="space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-indigo-50">
              <h4 className="font-bold text-indigo-950 mb-6 uppercase tracking-widest text-xs">Market Deep Dives</h4>
              <ul className="space-y-4">
                {['Sustainability Reporting', 'Digital Asset Custody', 'Cross-Border AML', 'Sovereign Wealth Trends'].map(item => (
                  <li key={item} className="flex justify-between items-center text-sm font-medium text-slate-600 hover:text-emerald-700 cursor-pointer transition-colors group">
                    <span>{item}</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl">
              <h4 className="font-bold text-xl mb-4">Ask Our Senior AI Analyst</h4>
              <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
                Need immediate insight on a specific asset class? Use our context-aware financial engine.
              </p>
              <textarea placeholder="e.g. Current liquidity of USDT trade programs..." className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-white/40 mb-4 h-24 outline-none focus:border-white transition-all"></textarea>
              <button className="w-full bg-emerald-700 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition-all uppercase text-xs tracking-widest">Submit Query</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;