
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Star, Globe, Landmark, 
  TrendingUp, Zap, Activity, MoveUpRight, MoveDownRight,
  Shield, ChevronRight, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMarketSentiment } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#0a0f1a" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="28" fill={color} />
    <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
  </svg>
);

const Sparkline = ({ data, color, width = 100, height = 40 }: { data: number[], color: string, width?: number, height?: number }) => {
  const points = useMemo(() => {
    if (data.length < 2) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    
    return data.map((val, i) => {
      const x = i * stepX;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(" ");
  }, [data, width, height]);

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#grad-${color.replace('#','')})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </svg>
  );
};

const MarketPulseSection = () => {
  const [marketData, setMarketData] = useState({
    btc: { price: 64230.15, history: [64100, 64250, 64180, 64300, 64200, 64230, 64190, 64280, 64350, 64230] },
    eth: { price: 3421.40, history: [3450, 3430, 3410, 3440, 3425, 3421, 3415, 3438, 3452, 3421] },
    gold: { price: 2315.80, history: [2310, 2312, 2314, 2318, 2316, 2315, 2313, 2319, 2321, 2315] },
    sp500: { price: 5430.20, history: [5420, 5425, 5428, 5432, 5431, 5430, 5427, 5435, 5440, 5430] }
  });
  
  const [sentiment, setSentiment] = useState<{text: string, sources: any[]} | null>(null);
  const [loadingSentiment, setLoadingSentiment] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const update = (current: number) => current + (Math.random() - 0.5) * (current * 0.0008);
        const newData = { ...prev };
        (Object.keys(newData) as Array<keyof typeof newData>).forEach(key => {
          const newPrice = update(newData[key].price);
          newData[key] = {
            price: newPrice,
            history: [...newData[key].history.slice(-19), newPrice]
          };
        });
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSentiment = async () => {
      setLoadingSentiment(true);
      try {
        const pricesOnly = Object.fromEntries(Object.entries(marketData).map(([k, v]) => [k, (v as any).price]));
        const res = await getMarketSentiment(pricesOnly);
        setSentiment(res);
      } catch (e) {
        setSentiment({ text: "Market liquidity analysis offline. Sovereign tranches stable.", sources: [] });
      } finally {
        setLoadingSentiment(false);
      }
    };
    fetchSentiment();
  }, []);

  return (
    <section className="py-32 sm:py-48 px-10 lg:px-32 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-[2]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 sm:mb-40 gap-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center space-x-6 mb-12">
              <Activity className="text-emerald-400" size={24} />
              <span className="text-emerald-400 text-[12px] font-black uppercase tracking-[0.5em]">Institutional Pulse Node</span>
            </motion.div>
            <h2 className="serif text-7xl sm:text-9xl text-white font-black leading-[0.85] tracking-tighter italic">Market <br/> Intelligence.</h2>
          </div>
          <p className="text-indigo-100/40 text-2xl leading-relaxed max-w-md font-light italic">
            Telemetry from global liquidity sensors. Grounded in real-time institutional search tranches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {[
              { id: 'btc', label: 'BTC / USDT', color: '#10b981', symbol: '₿' },
              { id: 'eth', label: 'ETH / USDT', color: '#6366f1', symbol: 'Ξ' },
              { id: 'gold', label: 'GOLD (XAU)', color: '#f59e0b', symbol: 'Au' },
              { id: 'sp500', label: 'S&P 500', color: '#3b82f6', symbol: 'SPX' }
            ].map((asset, i) => {
              const data = marketData[asset.id as keyof typeof marketData];
              const isUp = data.history[data.history.length-1] >= data.history[data.history.length-2];
              
              return (
                <motion.div 
                  key={asset.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/5 border border-white/10 p-12 rounded-[3rem] sm:rounded-[4rem] backdrop-blur-3xl group hover:border-white/30 transition-all shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex justify-between items-start mb-16">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-white/20 font-mono text-sm uppercase tracking-widest">{asset.symbol}</span>
                        <p className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.4em]">{asset.label}</p>
                      </div>
                      <p className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tighter italic">
                        {data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <motion.div 
                      animate={{ scale: isUp ? [1, 1.1, 1] : [1, 0.95, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-[11px] font-black shadow-2xl ${isUp ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/20 text-rose-400 border border-rose-500/20'}`}
                    >
                      {isUp ? <MoveUpRight size={14} /> : <MoveDownRight size={14} />}
                      <span>{(Math.random() * 2.5).toFixed(2)}%</span>
                    </motion.div>
                  </div>
                  <div className="h-24 opacity-80 group-hover:opacity-100 transition-opacity duration-1000">
                    <Sparkline data={data.history} color={asset.color} width={200} height={60} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#111e35] to-[#0a0f1a] h-full rounded-[4rem] p-12 sm:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col group border border-white/5"
            >
              <div className="absolute top-0 right-0 p-32 opacity-[0.04] rotate-12 transition-transform duration-[6s] group-hover:rotate-[25deg] group-hover:scale-110">
                <LogoMark className="w-80 h-80" color="white" />
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center space-x-6 mb-16">
                  <div className="w-16 h-16 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
                    <LogoMark className="w-8 h-8" color="white" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-black uppercase tracking-[0.4em]">Sovereign Sentiment</h3>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.4em] mt-1.5 flex items-center">
                       <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5 animate-pulse" />
                       Node FC-04 Active
                    </p>
                  </div>
                </div>

                <div className="flex-1 min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {loadingSentiment ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                        <div className="h-6 w-full bg-white/5 rounded-2xl animate-pulse" />
                        <div className="h-6 w-11/12 bg-white/5 rounded-2xl animate-pulse" />
                        <div className="h-6 w-3/4 bg-white/5 rounded-2xl animate-pulse" />
                        <div className="pt-12 space-y-4">
                           <div className="h-4 w-1/3 bg-white/5 rounded-full" />
                           <div className="h-3 w-1/2 bg-white/5 rounded-full" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="content" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col h-full">
                        <p className="text-2xl sm:text-3xl leading-[1.4] font-medium italic tracking-tight text-indigo-50/80 mb-16">
                          {sentiment?.text}
                        </p>
                        {sentiment?.sources && sentiment.sources.length > 0 && (
                          <div className="mt-auto pt-16 border-t border-white/5">
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-300 mb-8">Verified Grounding Nodes</p>
                            <div className="space-y-4">
                              {sentiment.sources.slice(0, 3).map((s, idx) => (
                                <a key={idx} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center text-[13px] text-emerald-400 hover:text-white transition-all hover:translate-x-3 truncate group/link">
                                  <ExternalLink size={14} className="mr-4 flex-shrink-0 opacity-40 group-hover/link:opacity-100 transition-opacity" />
                                  <span className="font-medium">{s.title || 'Institutional Dataset Node'}</span>
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-ivory flex flex-col h-full">
      <section className="relative min-h-screen flex items-center px-10 lg:px-32 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-[1.02]">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] saturate-[0.8]">
            <source src="https://player.vimeo.com/external/517090025.hd.mp4?s=07e77b63c8736e4f1659a35e4e89f816c14e135e&profile_id=172&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#0a0f1a]/10 backdrop-blur-[4px]" />
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl relative z-10 py-48">
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-6 px-10 py-5 bg-white/5 border border-white/20 rounded-full backdrop-blur-3xl shadow-2xl mb-16">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_24px_rgba(52,211,153,0.8)]" />
            <span className="text-[12px] font-black text-white uppercase tracking-[0.6em]">Sovereign Node FG-04 Active</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="serif text-8xl sm:text-9xl md:text-[12rem] text-white font-black leading-[0.82] tracking-tighter mb-16 italic">
            Capital <br />
            <span className="text-emerald-400 underline decoration-white/10 decoration-8 underline-offset-8">Redefined.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-indigo-50/60 text-2xl md:text-4xl max-w-4xl leading-[1.3] font-light mb-24 italic tracking-tight">
            Architecting high-stakes capital structures for the world's most aggressive visionaries.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-10">
            <Link to="/contact" className="px-20 py-10 bg-indigo-600 text-white rounded-[2.5rem] font-black text-[13px] uppercase tracking-[0.6em] flex items-center justify-center group hover:bg-white hover:text-[#0a0f1a] transition-all duration-[0.8s] shadow-[0_32px_96px_-16px_rgba(79,70,229,0.5)] active:scale-95">
              Initiate Briefing
              <ArrowRight className="ml-6 group-hover:translate-x-4 transition-transform duration-700" size={24} />
            </Link>
            <Link to="/work" className="px-20 py-10 bg-white/5 border border-white/20 text-white rounded-[2.5rem] font-black text-[13px] uppercase tracking-[0.6em] flex items-center justify-center hover:bg-white/20 transition-all duration-[0.8s] backdrop-blur-3xl group active:scale-95">
              View Case Files
              <Zap className="ml-5 text-emerald-400 group-hover:scale-125 transition-transform duration-700" size={20} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-20 right-20 hidden xl:flex space-x-32">
          {[
            { label: 'Advised AUM', val: '$2.1B+' },
            { label: 'Yield Alpha', val: '18.4%' }
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 64 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 1.5 + (i * 0.25), ease: [0.16, 1, 0.3, 1] }} className="text-right border-r-2 border-white/5 pr-16 last:border-r-0">
              <p className="text-[11px] text-white/30 uppercase tracking-[0.6em] mb-4 font-black">{m.label}</p>
              <p className="text-6xl text-white font-black tracking-tighter italic leading-none">{m.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-48 sm:py-64 px-10 lg:px-32 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 sm:gap-48 items-start sm:items-end mb-48 sm:mb-64">
            <motion.div initial={{ opacity: 0, x: -64 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <span className="text-emerald-800 text-[12px] font-black uppercase tracking-[0.6em] block mb-12 flex items-center">
                <div className="w-16 h-[2px] bg-emerald-800 mr-6 shadow-sm" /> Institutional Advisory Node
              </span>
              <h2 className="serif text-7xl sm:text-8xl md:text-9xl text-[#0a0f1a] font-black leading-[0.88] tracking-tighter italic">Navigating <br/> High-Stakes <br/> Complexity.</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 64 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="space-y-10 sm:space-y-12">
              <p className="text-slate-500 text-3xl leading-relaxed font-medium italic opacity-90">
                We operate exclusively at the intersection of traditional sovereign finance and the high-velocity digital frontier. 
              </p>
              <p className="text-slate-400 text-xl leading-relaxed font-medium italic">
                Our proprietary FEDERGREEN-driven mapping provides structural clarity where others see opacity.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            {[
              { icon: Landmark, title: 'Capital Advisory', desc: 'Bespoke debt and equity tranches for global infrastructure.', path: '/services', accent: 'bg-indigo-50 text-indigo-600' },
              { icon: Shield, title: 'Compliance Node', desc: 'Tier-1 KYC/AML/CTF protocols for institutional-grade integrity.', path: '/kyc-node', accent: 'bg-emerald-50 text-emerald-800' },
              { icon: Globe, title: 'Global Markets', desc: 'Deep-market liquidity sentiment mapping across digital asset classes.', path: '/areas', accent: 'bg-[#0a0f1a] text-white' }
            ].map((item, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 64 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 1 }}
                className="group p-12 sm:p-16 bg-[#fcfcfb] rounded-[4rem] border border-slate-100 hover:bg-white transition-all duration-[0.8s] hover:shadow-[0_96px_128px_-48px_rgba(10,15,26,0.12)] relative overflow-hidden active:scale-95"
              >
                <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-[0.03] transition-all duration-1000 -translate-y-12 group-hover:translate-y-0 scale-150"><TrendingUp size={200} /></div>
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-[2.5rem] flex items-center justify-center mb-16 shadow-inner transition-all duration-[1.2s] group-hover:scale-110 group-hover:rotate-6 ${item.accent}`}><item.icon size={40} /></div>
                <h3 className="text-4xl text-[#0a0f1a] font-black mb-10 group-hover:text-indigo-600 transition-colors tracking-tighter italic leading-none">{item.title}</h3>
                <p className="text-slate-500 text-xl leading-relaxed mb-16 font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                <Link to={item.path} className="flex items-center text-indigo-600 font-black text-[12px] uppercase tracking-[0.5em] group-hover:translate-x-6 transition-transform duration-700">Access Node <ChevronRight className="ml-3" size={18} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarketPulseSection />

      <section className="py-48 sm:py-72 px-10 lg:px-32 bg-[#0a0f1a] text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
            <Star className="w-24 h-24 sm:w-32 sm:h-32 text-emerald-400 mx-auto animate-pulse mb-16 shadow-[0_0_64px_rgba(52,211,153,0.4)]" />
          </motion.div>
          <h2 className="serif text-7xl sm:text-9xl md:text-[12rem] font-black leading-[0.85] tracking-tighter italic">Architect your <br/> sovereign growth.</h2>
          <p className="text-indigo-100/60 text-2xl sm:text-4xl leading-relaxed max-w-5xl mx-auto font-light italic">Accepted high-net-worth engagements follow a rigorous vetting process.</p>
          <div className="flex justify-center pt-24">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <Link to="/contact" className="px-24 py-12 bg-white text-[#0a0f1a] rounded-[3.5rem] font-black text-[14px] uppercase tracking-[0.6em] hover:bg-emerald-400 hover:text-white transition-all duration-[0.8s] shadow-[0_64px_128px_-32px_rgba(255,255,255,0.2)] group flex items-center">
                Apply Consultation Node 
                <ArrowRight className="inline-block ml-8 group-hover:translate-x-4 transition-transform duration-700" size={24} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
