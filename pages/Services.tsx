
import React from 'react';
import { 
  BarChart3, 
  Users, 
  Banknote, 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  Globe, 
  Target,
  FileSearch,
  Scale,
  Search
} from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-7xl text-slate-900 font-bold mb-8">Services</h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            Institutional frameworks for a fluid economy. Our services span from strategic core consulting to high-stakes capital advisory.
          </p>
        </div>
      </section>

      {/* Capital Advisory Sub-Section */}
      <section id="capital-advisory" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="max-w-2xl">
            <h2 className="serif text-5xl text-slate-900 font-bold mb-6">Capital Advisory</h2>
            <p className="text-slate-500 text-lg">Expertise in multi-layered financial structures, global risk nodes, and high-ROI institutional strategies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'analysis', icon: BarChart3, label: 'Analysis', desc: 'Deep-market liquidity & sentiment mapping.' },
              { id: 'corporate-advisory', icon: Users, label: 'Corporate Advisory', desc: 'Board-level strategic guidance.' },
              { id: 'raising-capital', icon: Banknote, label: 'Raising Capital', desc: 'Bespoke investor node connection.' },
              { id: 'funding', icon: TrendingUp, label: 'Funding', desc: 'Institutional debt & equity architecture.' },
              { id: 'risk-mitigation', icon: ShieldCheck, label: 'Risk Mitigation', desc: 'Algorithmic threat neutralizing.' },
              { id: 'secured-depositor', icon: Lock, label: 'Secured Depositor Programs', desc: 'Fixed-yield institutional instruments.' },
              { id: 'scaling', icon: Globe, label: 'Scaling Businesses Locally/Internationalally', desc: 'Global market node expansion.' },
              { id: 'hnwi', icon: Target, label: 'Assist HNWI Achieve High ROIs With Low Risk', desc: 'Private family office alpha.' }
            ].map(service => (
              <div key={service.id} id={service.id} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:border-indigo-200 transition-all hover:bg-white hover:shadow-xl scroll-mt-28">
                <service.icon className="text-indigo-600 mb-6" size={24} />
                <h4 className="text-slate-900 font-bold mb-3">{service.label}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Nested Due Diligence */}
          <div id="due-diligence" className="bg-slate-50 border border-slate-200 p-12 rounded-[48px] scroll-mt-28 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="md:w-1/3">
                <h3 className="serif text-4xl text-slate-900 font-bold mb-4">Due Diligence</h3>
                <p className="text-slate-600 text-sm">Triple-redundant validation systems for high-stakes transactions.</p>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { id: 'security-checks', icon: FileSearch, label: 'Security Checks/KYC/AML/Due Diligence', desc: 'Node-level verification.' },
                  { id: 'valuations', icon: Scale, label: 'Third-Party Valuations', desc: 'Audit-ready asset assessments.' },
                  { id: 'feasibility', icon: Search, label: 'Feasibility Studies', desc: 'Project viability nodes.' }
                ].map(item => (
                  <div key={item.id} id={item.id} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm scroll-mt-28">
                    <item.icon className="text-emerald-600 mb-4" size={20} />
                    <h5 className="text-slate-900 font-bold text-xs mb-2 leading-tight">{item.label}</h5>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Sub-Section */}
      <section id="strategy" className="py-24 px-8 lg:px-24 border-t border-slate-100 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="serif text-5xl text-slate-900 font-bold">Strategy</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Long-term enterprise navigation in an era of fluid capital. We build the decision-making nodes that ensure multi-generational stability and hyper-growth scaling.
            </p>
            <div className="grid grid-cols-2 gap-4">
               {['Market Arbitrage', 'Node Governance', 'Alpha Structuring', 'Legacy Planning'].map(p => (
                 <div key={p} className="flex items-center space-x-2 text-slate-900">
                   <div className="w-1 h-1 bg-indigo-600 rounded-full" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">{p}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full bg-slate-50 rounded-[40px] border border-slate-200 p-12 shadow-inner">
             <div className="aspect-square bg-white rounded-full border border-slate-200 flex items-center justify-center p-8 shadow-sm">
                <div className="w-full h-full border border-indigo-100 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite]">
                  <div className="w-3/4 h-3/4 border border-emerald-50 rounded-full flex items-center justify-center">
                     <div className="w-1/2 h-1/2 bg-indigo-50 blur-3xl opacity-50" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;