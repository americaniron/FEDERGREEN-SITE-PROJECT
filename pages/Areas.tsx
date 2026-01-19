
import React, { useState } from 'react';
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
  Factory,
  MapPin,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { findNearbyHubs } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="24" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const Areas: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [hubs, setHubs] = useState<{analysis: string, hubs: any[]} | null>(null);

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

  const handleHubSearch = (sector: string) => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await findNearbyHubs({ lat: pos.coords.latitude, lng: pos.coords.longitude }, sector);
        setHubs(res);
      } catch (e) {
        console.error("Maps Grounding Error", e);
      } finally {
        setLoading(false);
      }
    }, (err) => {
      setLoading(false);
      alert("Please allow geolocation to map nearby institutional hubs.");
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl">
          <h1 className="serif text-7xl text-slate-900 font-bold mb-8">Areas We Cover</h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            Specialized advisory across the global node-map. Grounded in geographic institutional data.
          </p>
        </div>
      </section>

      {/* Hub Mapper Tool */}
      <section className="py-24 px-8 lg:px-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111e35] text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 opacity-5">
              <LogoMark className="w-80 h-80" color="white" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="text-emerald-400" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Google Maps Grounding</span>
                </div>
                <h2 className="serif text-5xl font-black mb-6 italic tracking-tight text-white">Institutional Hub Mapper.</h2>
                <p className="text-indigo-100/60 text-lg leading-relaxed mb-10 max-w-md">
                  Execute a localized node audit to identify tier-1 financial infrastructure and sectoral headquarters near your current residency.
                </p>
                <div className="flex flex-wrap gap-3">
                  {sectors.slice(0, 5).map(s => (
                    <button 
                      key={s.id} 
                      onClick={() => handleHubSearch(s.label)}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:border-emerald-600 transition-all"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-[400px] bg-white/5 rounded-[2.5rem] border border-white/10 p-10 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center space-y-6">
                      <Loader2 size={48} className="animate-spin text-emerald-400" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Synchronizing Maps Grounding...</p>
                    </motion.div>
                  ) : hubs ? (
                    <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Node Analysis</p>
                        <p className="text-indigo-50 font-medium italic leading-relaxed text-sm">
                          {hubs.analysis}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Identified Hubs</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {hubs.hubs.slice(0, 4).map((h, i) => (
                            <a key={i} href={h.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                              <span className="text-[10px] font-black uppercase tracking-tight text-indigo-50 group-hover:text-white truncate pr-2">{h.title}</span>
                              <ExternalLink size={12} className="text-indigo-400 flex-shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center space-y-4">
                      <MapPin size={48} className="mx-auto text-white/10" />
                      <p className="text-indigo-100/30 text-xs font-black uppercase tracking-widest italic">Select a sector to map hubs</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
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
                <button 
                  onClick={() => handleHubSearch(sector.label)}
                  className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all"
                >
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
