
import React from 'react';
import { 
  Building2, 
  Cpu, 
  Stethoscope, 
  Medal, 
  Wind, 
  Leaf, 
  Utensils, 
  Gem, 
  Rocket, 
  Clapperboard, 
  Pickaxe, 
  Factory 
} from 'lucide-react';

const Areas: React.FC = () => {
  const sectors = [
    { id: 'real-estate', label: 'Real Estate', icon: Building2 },
    { id: 'technology', label: 'Technology', icon: Cpu },
    { id: 'health', label: 'Health', icon: Stethoscope },
    { id: 'sports', label: 'Sports', icon: Medal },
    { id: 'renewable-energy', label: 'Renewable Energy', icon: Wind },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf },
    { id: 'food-beverage', label: 'Food & Beverage', icon: Utensils },
    { id: 'fashion-beauty', label: 'Fashion & Beauty', icon: Gem },
    { id: 'aerospace', label: 'Aerospace', icon: Rocket },
    { id: 'film-entertainment', label: 'Film & Entertainment', icon: Clapperboard },
    { id: 'mining', label: 'Mining', icon: Pickaxe },
    { id: 'manufacturing', label: 'Manufacturing/Distribution', icon: Factory },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-7xl text-slate-900 font-bold mb-8">Areas We Cover</h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            Specialized advisory across the global node-map. From heavy infrastructure to digital frontier markets.
          </p>
        </div>
      </section>

      {/* Sector Grid */}
      <section className="py-24 px-8 lg:px-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sectors.map(sector => (
            <div 
              key={sector.id} 
              id={sector.id} 
              className="group bg-slate-50 border border-slate-100 p-10 rounded-[32px] hover:border-indigo-300 transition-all hover:bg-white hover:shadow-xl scroll-mt-28 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all mb-6 shadow-sm">
                <sector.icon size={24} />
              </div>
              <h3 className="text-slate-900 font-bold mb-4">{sector.label}</h3>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest leading-relaxed">
                Institutional advisory & capital matching for the {sector.label.toLowerCase()} sector.
              </p>
              <div className="mt-8 pt-6 border-t border-slate-200 w-full">
                <button className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all">
                  Request Sector Node
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Reach Callout */}
      <section className="py-24 px-8 lg:px-24 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-white border border-slate-200 p-16 rounded-[48px] text-center space-y-8 shadow-sm">
           <h2 className="serif text-4xl text-slate-900 font-bold">Unmapped Opportunities</h2>
           <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
             Our coverage is fluid. If your enterprise operates at the intersection of these nodes, we provide the capital bridge to mature.
           </p>
           <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all shadow-md">
             Global Node Request
           </button>
        </div>
      </section>
    </div>
  );
};

export default Areas;