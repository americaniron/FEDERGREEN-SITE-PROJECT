
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
    <rect width="100" height="100" rx="24" fill={color} />
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
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#grad-${color.replace('#','')})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
    </svg>
  );
};

const MarketPulseSection = () => {
  const [marketData, setMarketData] = useState({
    btc: { price: 64230.15, history: [64100, 64250, 64180, 64300, 64200, 64230] },
    eth: { price: 3421.40, history: [3450, 3430, 3410, 3440, 3425, 3421] },
    gold: { price: 2315.80, history: [2310, 2312, 2314, 2318, 2316, 2315] },
    sp500: { price: 5430.20, history: [5420, 5425, 5428, 5432, 5431, 5430] }
  });
  
  const [sentiment, setSentiment] = useState<{text: string, sources: any[]} | null>(null);
  const [loadingSentiment, setLoadingSentiment] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const update = (current: number) => current + (Math.random() - 0.5) * (current * 0.001);
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
    }, 4000);
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
        setSentiment({ text: "Market liquidity analysis offline.", sources: [] });
      } finally {
        setLoadingSentiment(false);
      }
    };
    fetchSentiment();
  }, []);

  return (
    <section className="py-24 sm:py-48 px-6 sm:px-10 lg:px-32 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 sm:mb-32 gap-10 sm:gap-16">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-10">
              <Activity className="text-emerald-400" size={20} sm:size={24} />
              <span className="text-emerald-400 text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">Institutional Terminal Node</span>
            </motion.div>
            <h2 className="serif text-5xl sm:text-7xl md:text-9xl text-white font-black leading-[1] sm:leading-[0.95] tracking-tighter">Market <br className="hidden sm:block"/> Pulse.</h2>
          </div>
          <p className="text-indigo-100/40 text-lg sm:text-2xl leading-relaxed max-w-md font-light italic">
            Live telemetry from global liquidity sensors. Grounded in real-time Search tranches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] backdrop-blur-3xl group hover:border-white/30 transition-all shadow-2xl"
                >
                  <div className="flex justify-between items-start mb-8 sm:mb-12">
                    <div>
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                        <span className="text-white/30 font-mono text-xs sm:text-sm">{asset.symbol}</span>
                        <p className="text-[9px] sm:text-[11px] font-black text-indigo-300 uppercase tracking-[0.2em] sm:tracking-[0.3em]">{asset.label}</p>
                      </div>
                      <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tighter">
                        {data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-[9px] sm:text-[11px] font-black ${isUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {isUp ? <MoveUpRight size={12} sm:size={14} /> : <MoveDownRight size={12} sm:size={14} />}
                      <span>{isUp ? '+' : ''}{(Math.random() * 2).toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="h-20 sm:h-24">
                    <Sparkline data={data.history} color={asset.color} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1e3a8a] to-[#0a0f1a] h-full rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col group border border-white/10"
            >
              <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 p-16 sm:p-24 opacity-10 rotate-12 transition-transform duration-[4s] group-hover:rotate-[35deg]">
                <LogoMark className="w-64 h-64 sm:w-80 sm:h-80 opacity-20" color="white" />
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex items-center space-x-4 sm:space-x-5 mb-8 sm:mb-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-2xl sm:rounded-[1.8rem] flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl shadow-indigo-900/50">
                    <LogoMark className="w-6 h-6 sm:w-8 sm:h-8" color="white" />
                  </div>
                  <div>
                    <h3 className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Sovereign Sentiment</h3>
                    <p className="text-[8px] sm:text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] mt-1 flex items-center">
                       <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full mr-1.5 sm:mr-2 animate-pulse" />
                       Real-time Intelligence
                    </p>
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-10 min-h-[250px] sm:min-h-[350px]">
                  <AnimatePresence mode="wait">
                    {loadingSentiment ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 sm:space-y-6">
                        <div className="h-4 sm:h-6 w-full bg-white/10 rounded-xl animate-pulse" />
                        <div className="h-4 sm:h-6 w-11/12 bg-white/10 rounded-xl animate-pulse" />
                        <div className="h-4 sm:h-6 w-4/6 bg-white/10 rounded-xl animate-pulse" />
                      </motion.div>
                    ) : (
                      <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6 sm:space-y-10">
                        <p className="text-xl sm:text-2xl leading-[1.5] sm:leading-[1.6] font-medium italic tracking-tight text-indigo-50/90">
                          {sentiment?.text}
                        </p>
                        {sentiment?.sources && sentiment.sources.length > 0 && (
                          <div className="pt-6 sm:pt-10 border-t border-white/10">
                            <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-indigo-300 mb-4 sm:mb-6">Grounded Intel Sources</p>
                            <div className="space-y-2 sm:space-y-3">
                              {sentiment.sources.slice(0, 3).map((s, idx) => (
                                <a key={idx} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center text-[10px] sm:text-[12px] text-emerald-400 hover:text-white transition-all hover:translate-x-2 truncate">
                                  <ExternalLink size={10} sm:size={12} className="mr-2 sm:mr-3 flex-shrink-0" />
                                  <span className="font-medium">{s.title}</span>
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
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-ivory">
      <section className="relative min-h-[90vh] sm:min-h-[100vh] flex items-center px-6 sm:px-10 lg:px-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.05] filter brightness-[0.5] sm:brightness-[0.6] saturate-[0.8] contrast-[1.15]">
            <source src="https://player.vimeo.com/external/517090025.hd.mp4?s=07e77b63c8736e4f1659a35e4e89f816c14e135e&profile_id=172&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/60 to-transparent" />
          <div className="absolute inset-0 bg-[#0a0f1a]/20 backdrop-blur-[2px] sm:backdrop-blur-[4px]" />
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl relative z-10 py-20 sm:py-32">
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 sm:space-x-5 px-5 py-2.5 sm:px-8 sm:py-4 bg-white/10 border border-white/20 rounded-full backdrop-blur-3xl shadow-2xl mb-10 sm:mb-16">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(52,211,153,0.9)]" />
            <span className="text-[10px] sm:text-[12px] font-black text-white uppercase tracking-[0.4em] sm:tracking-[0.6em]">Institutional Node FG-04</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="serif text-6xl sm:text-8xl md:text-[11rem] text-white font-black leading-[1] sm:leading-[0.82] tracking-tighter mb-10 sm:mb-16 italic">
            Capital <br />
            <span className="text-emerald-400">Redefined.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-indigo-50/80 text-xl sm:text-2xl md:text-3xl max-w-3xl leading-relaxed font-light mb-12 sm:mb-20 italic tracking-tight">
            Architecting high-stakes capital structures for global visionaries.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            <Link to="/contact" className="px-10 py-6 sm:px-16 sm:py-8 bg-indigo-600 text-white rounded-[2rem] sm:rounded-[2.5rem] font-black text-[11px] sm:text-[12px] uppercase tracking-[0.5em] flex items-center justify-center group hover:bg-white hover:text-[#0a0f1a] transition-all duration-700 shadow-xl">
              Initiate Briefing
              <ArrowRight className="ml-4 sm:ml-5 group-hover:translate-x-3 transition-transform" size={20} />
            </Link>
            <Link to="/work" className="px-10 py-6 sm:px-16 sm:py-8 bg-white/10 border border-white/20 text-white rounded-[2rem] sm:rounded-[2.5rem] font-black text-[11px] sm:text-[12px] uppercase tracking-[0.5em] flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-3xl group">
              View Case Files
              <Zap className="ml-3 sm:ml-4 text-emerald-400 group-hover:scale-125 transition-transform" size={16} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 right-10 hidden xl:flex space-x-20">
          {[
            { label: 'Advised AUM', val: '$2.1B+' },
            { label: 'Yield Alpha', val: '18.4%' }
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1.4 + (i * 0.2) }} className="text-right border-r border-white/10 pr-12 last:border-r-0">
              <p className="text-[10px] text-white/40 uppercase tracking-[0.5em] mb-3 font-black">{m.label}</p>
              <p className="text-4xl text-white font-black tracking-tighter italic">{m.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-64 px-6 sm:px-10 lg:px-32 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-32 items-start sm:items-end mb-24 sm:mb-40">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-emerald-800 text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-6 sm:mb-10 flex items-center">
                <div className="w-12 h-[2px] bg-emerald-800 mr-4 shadow-sm" /> Global Advisory Node
              </span>
              <h2 className="serif text-5xl sm:text-7xl md:text-8xl text-[#0a0f1a] font-black leading-[1.1] sm:leading-[0.88] tracking-tighter italic">Navigating <br/> High-Stakes <br/> Complexity.</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 sm:space-y-8">
              <p className="text-slate-500 text-xl sm:text-2xl leading-relaxed font-medium italic opacity-90">
                We operate exclusively at the intersection of traditional institutional finance and the high-velocity digital frontier. 
              </p>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-medium italic">
                Our proprietary FEDERGREEN-driven mapping provides structural clarity where others see opacity.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { icon: Landmark, title: 'Capital Advisory', desc: 'Bespoke debt and equity tranches for global infrastructure.', path: '/services', accent: 'bg-indigo-50 text-indigo-600' },
              { icon: Shield, title: 'Compliance Node', desc: 'Tier-1 KYC/AML/CTF protocols for institutional-grade integrity.', path: '/kyc-node', accent: 'bg-emerald-50 text-emerald-800' },
              { icon: Globe, title: 'Global Markets', desc: 'Deep-market liquidity sentiment mapping across digital asset classes.', path: '/areas', accent: 'bg-[#0a0f1a] text-white' }
            ].map((item, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="group p-10 sm:p-16 bg-[#fcfcfb] rounded-[3rem] sm:rounded-[4rem] border border-slate-100 hover:bg-white transition-all duration-700 hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-8 group-hover:translate-y-0"><TrendingUp className="text-indigo-100" size={100} sm:size={160} /></div>
                <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-[2.2rem] flex items-center justify-center mb-10 sm:mb-16 shadow-inner transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6 ${item.accent}`}><item.icon size={32} sm:size={40} /></div>
                <h3 className="text-3xl sm:text-4xl text-[#0a0f1a] font-black mb-6 sm:mb-10 group-hover:text-indigo-600 transition-colors tracking-tight italic">{item.title}</h3>
                <p className="text-slate-500 text-lg sm:text-xl leading-relaxed mb-10 sm:mb-16 font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                <Link to={item.path} className="flex items-center text-indigo-600 font-black text-[10px] sm:text-[12px] uppercase tracking-[0.4em] group-hover:translate-x-4 transition-transform">Access Node <ChevronRight className="ml-1 sm:ml-2" size={14} sm:size={16} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarketPulseSection />

      <section className="py-32 sm:py-64 px-6 sm:px-10 lg:px-32 bg-[#0a0f1a] text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-20 relative z-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
            <Star className="w-20 h-20 sm:w-28 sm:h-28 text-emerald-400 mx-auto animate-pulse mb-10 sm:mb-16 shadow-[0_0_40px_rgba(52,211,153,0.3)]" />
          </motion.div>
          <h2 className="serif text-5xl sm:text-8xl md:text-[11rem] font-black leading-[1.1] sm:leading-[0.85] tracking-tighter italic">Architect your <br/> sovereign growth.</h2>
          <p className="text-indigo-100/60 text-xl sm:text-3xl leading-relaxed max-w-4xl mx-auto font-light italic">Accepted high-net-worth engagements follow a rigorous vetting process.</p>
          <div className="flex justify-center pt-10 sm:pt-20">
            <Link to="/contact" className="px-10 py-6 sm:px-24 sm:py-10 bg-white text-[#0a0f1a] rounded-[2rem] sm:rounded-[3.5rem] font-black text-[11px] sm:text-[13px] uppercase tracking-[0.5em] sm:tracking-[0.6em] hover:bg-emerald-400 hover:text-white transition-all duration-700 shadow-2xl group">
              Apply Consultation Node 
              <ArrowRight className="inline-block ml-3 sm:ml-6 group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
