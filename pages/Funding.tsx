
import React from 'react';
import { 
  ArrowRight, 
  Coins, 
  LineChart, 
  Building, 
  Zap, 
  Gem, 
  Briefcase 
} from 'lucide-react';

const Funding: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-7xl text-slate-900 font-bold mb-8">Funding</h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            From traditional debt tranches to digital liquidity programs. We bridge the capital gaps for institutional visionaries.
          </p>
        </div>
      </section>

      {/* Main Categories */}
      <section className="py-24 px-8 lg:px-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'debt', label: 'Debt', icon: Building, desc: 'Senior secured, mezzanine & mezzanine bridge financing.' },
            { id: 'equity', label: 'Equity', icon: LineChart, desc: 'Growth equity, venture debt & private placements.' },
            { id: 'private-funds', label: 'Private Funds', icon: Briefcase, desc: 'Exclusive access to closed institutional liquidity nodes.' }
          ].map(item => (
            <div key={item.id} id={item.id} className="bg-slate-50 border border-slate-100 p-10 rounded-[32px] hover:bg-white hover:shadow-xl transition-all scroll-mt-28">
              <item.icon className="text-emerald-600 mb-6" size={24} />
              <h3 className="text-slate-900 font-bold mb-4">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{item.desc}</p>
              <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center group">
                Access Node <ArrowRight className="ml-2 group-hover:translate-x-1 transition-all" size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* New World of Finance Section */}
      <section id="new-world-of-finance" className="py-24 px-8 lg:px-24 bg-slate-50 border-t border-slate-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-16">
            <h2 className="serif text-5xl text-slate-900 font-bold mb-6">New World of Finance</h2>
            <p className="text-slate-500 text-lg">Bridging traditional assets with the digital frontier through innovative liquidity instruments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'hybrid', label: 'Hybrid', icon: Zap, desc: 'Convertible debt & equity node-wrapping.' },
              { id: 'btc-lending', label: 'BTC/USDT Lending Programs', icon: Coins, desc: 'Institutional liquidity leveraging digital collateral.' },
              { id: 'fine-art', label: 'Fine Art', icon: Gem, desc: 'Monetization of high-value tangible nodes.' },
              { id: 'commodities', label: 'Commodities', icon: Building, desc: 'Trade programs for physical assets.' },
              { id: 'trade-programs', label: 'Trade Programs', icon: LineChart, desc: 'High-velocity institutional trade nodes.' }
            ].map(item => (
              <div key={item.id} id={item.id} className="bg-white border border-slate-200 p-10 rounded-[40px] shadow-sm hover:shadow-md transition-all scroll-mt-28">
                <item.icon className="text-indigo-600 mb-6" size={24} />
                <h4 className="text-slate-900 font-bold mb-4">{item.label}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}

            {/* Assets Nested Sub-pages */}
            <div id="assets" className="md:col-span-2 lg:col-span-3 bg-white border border-slate-200 p-12 rounded-[48px] scroll-mt-28 mt-8 shadow-sm">
               <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                  <div className="md:w-1/3">
                    <h3 className="serif text-4xl text-slate-900 font-bold mb-4">Assets</h3>
                    <p className="text-slate-500 text-sm">Monetization and leveraging of non-traditional nodes for high-alpha returns.</p>
                  </div>
                  <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { id: 'btc-trade', label: 'BTC/USDT Trade Programs' },
                      { id: 'leveraging', label: 'Leveraging Programs' },
                      { id: 'monetization', label: 'Monetization' },
                      { id: 'financial-instruments', label: 'Financial Instruments' }
                    ].map(node => (
                      <div key={node.id} id={node.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 scroll-mt-28 flex items-center justify-between group cursor-pointer hover:border-indigo-400 hover:bg-white hover:shadow-sm transition-all">
                        <span className="text-slate-900 font-bold text-xs uppercase tracking-widest">{node.label}</span>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-600" />
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Funding;