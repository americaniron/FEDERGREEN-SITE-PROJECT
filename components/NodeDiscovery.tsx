
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Compass, Loader2, ExternalLink, Globe, ChevronRight, AlertCircle } from 'lucide-react';
import { findNearbyHubs } from '../services/geminiService';

const NodeDiscovery: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ analysis: string, hubs: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedSector, setSelectedSector] = useState('Institutional Finance');

    const sectors = [
        'Institutional Finance', 'Real Estate', 'Technology', 'Healthcare', 'Renewable Energy', 
        'Aerospace', 'Manufacturing', 'Logistics'
    ];

    const handleLocate = () => {
        setLoading(true);
        setError(null);
        setResult(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this node environment.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const res = await findNearbyHubs({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }, selectedSector);
                setResult(res);
            } catch (err) {
                console.error(err);
                setError("Node sync failure. Could not retrieve regional intelligence via Google Maps Grounding.");
            } finally {
                setLoading(false);
            }
        }, (err) => {
            setError("Location access denied. Institutional proximity check aborted.");
            setLoading(false);
        });
    };

    return (
        <div className="bg-[#0a0f1a] rounded-[4rem] p-12 sm:p-20 text-white relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none transform rotate-12">
                <Compass size={400} />
            </div>

            <div className="max-w-4xl relative z-10">
                <div className="flex items-center space-x-6 mb-12">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-inner">
                        <Navigation size={24} />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] text-emerald-400">Global Node Discovery</span>
                </div>

                <h2 className="serif text-5xl sm:text-7xl font-black italic tracking-tighter mb-10 leading-tight">Institutional <br/> Proximity.</h2>
                <p className="text-indigo-100/50 text-xl font-light italic leading-relaxed mb-16 max-w-2xl">
                    Utilize the FEDERGREEN-2.5 Discovery Node to locate tier-1 hubs, sovereign banks, and corporate headquarters. Analysis is grounded in real-time geographic data.
                </p>

                <div className="flex flex-col sm:flex-row gap-8 mb-16">
                    <div className="relative flex-1">
                        <select 
                            value={selectedSector} 
                            onChange={(e) => setSelectedSector(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white font-black uppercase text-[12px] tracking-[0.3em] outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none shadow-inner"
                        >
                            {sectors.map(s => <option key={s} value={s} className="bg-[#0a0f1a] text-white">{s}</option>)}
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-white/30 pointer-events-none" size={18} />
                    </div>
                    <button 
                        onClick={handleLocate}
                        disabled={loading}
                        className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black uppercase text-[12px] tracking-[0.5em] flex items-center justify-center transition-all shadow-2xl disabled:opacity-50 active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin mr-4" size={18} /> : <MapPin className="mr-4" size={18} />}
                        Execute Scan
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0 }}
                            className="p-8 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-rose-400 flex items-center space-x-4 mb-12 shadow-xl"
                        >
                            <AlertCircle size={20} />
                            <span className="font-medium italic text-lg">{error}</span>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="space-y-12 border-t border-white/5 pt-12"
                        >
                            <div>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-300 mb-6 flex items-center">
                                    <Globe size={14} className="mr-3" /> Node Analysis
                                </h3>
                                <div className="text-xl sm:text-2xl leading-relaxed text-indigo-50 font-light italic tracking-tight whitespace-pre-wrap">
                                    {result.analysis}
                                </div>
                            </div>

                            {result.hubs && result.hubs.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-6">Verified Grounding Links</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {result.hubs.map((hub, i) => (
                                            <a 
                                                key={i} href={hub.uri} target="_blank" rel="noreferrer" 
                                                className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/10 hover:border-white/10 transition-all shadow-sm"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                                        <MapPin size={14} />
                                                    </div>
                                                    <span className="font-bold text-sm text-indigo-100 group-hover:text-white transition-colors">{hub.title}</span>
                                                </div>
                                                <ExternalLink size={14} className="text-white/20 group-hover:text-emerald-400 transition-all" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NodeDiscovery;
