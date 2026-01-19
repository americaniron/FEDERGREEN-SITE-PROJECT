
import React from 'react';

const InvestorPortal: React.FC = () => {
  return (
    <div className="bg-indigo-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="animate-fadeIn">
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-8 h-[2px] bg-[#b9975b]"></span>
              <span className="text-[#b9975b] text-xs font-bold uppercase tracking-[0.4em]">Institutional Gateway</span>
            </div>
            <h1 className="serif text-5xl md:text-7xl text-white font-bold leading-tight mb-8">
              Strategic Assets. <br />
              <span className="text-indigo-300 italic">Curated Growth.</span>
            </h1>
            <p className="text-indigo-100/70 text-lg mb-12 leading-relaxed max-w-lg">
              We offer exclusive access to private debt instruments, BTC/USDT trade programs, and high-yield infrastructure bonds. Each opportunity is architected with multi-layered security protocols.
            </p>
            <div className="flex gap-4">
              <button className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 shadow-xl shadow-emerald-900/20 transition-all uppercase text-xs tracking-widest">
                Credential Verification
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { label: 'Avg Alpha', val: '18.4%' },
               { label: 'Portfolio LTV', val: '42.0%' },
               { label: 'AUM Advised', val: '$2.1B' },
               { label: 'Asset Classes', val: '14+' }
             ].map((stat, i) => (
               <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center backdrop-blur-sm">
                  <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className="text-3xl text-white font-bold">{stat.val}</p>
               </div>
             ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-16">
          <h2 className="serif text-4xl text-white">Active Instrument Tranches</h2>
          <div className="flex-grow h-[1px] bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { name: 'Secured Depositor Program', yield: '12-15% PA', status: 'Open', desc: 'Direct bank-backed growth instruments with capital protection guarantees.' },
            { name: 'Infrastructure Hybrid Bond', yield: '18% PA', status: 'Closed', desc: 'Sovereign-backed energy infrastructure project in Southeast Asia.' },
            { name: 'Digital Liquidity Program', yield: 'Variable', status: 'Limited', desc: 'Institutional BTC/USDT lending and market-neutral trade structures.' }
          ].map((program, i) => (
            <div key={i} className="bg-white/5 p-10 rounded-[32px] flex flex-col h-full border border-white/10 group hover:border-[#b9975b]/50 transition-all duration-500">
              <div className="flex justify-between items-center mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${program.status === 'Open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>
                  {program.status}
                </span>
                <span className="text-[#b9975b] font-bold text-sm">{program.yield}</span>
              </div>
              <h3 className="text-xl text-white font-bold mb-4 group-hover:text-emerald-400 transition-colors">{program.name}</h3>
              <p className="text-indigo-100/60 text-sm mb-12 leading-relaxed flex-grow">{program.desc}</p>
              <button className="w-full py-4 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-indigo-950 transition-all rounded-xl">
                View Prospectus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorPortal;