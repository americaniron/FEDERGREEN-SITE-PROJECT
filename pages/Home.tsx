
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Star, Globe, Landmark, 
  TrendingUp, Zap, Activity, MoveUpRight, MoveDownRight,
  Shield, ChevronRight, ExternalLink, Cpu, Layers, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMarketSentiment } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#1e3a5f" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" rx="32" fill={color} />
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
        const update = (current: number) => current + (Math.random() - 0.5) * (current * 0.0006);
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
    <section className="py-32 lg:py-48 px-10 lg:px-22 bg-brand-primary-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-[2]" />
      
      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 lg:mb-32 gap-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center space-x-6 mb-10">
              <Activity className="text-brand-accent" size={24} />
              <span className="text-ui-caps text-brand-accent tracking-[0.5em]">Institutional Pulse Node</span>
            </motion.div>
            <h2 className="serif italic text-white leading-none tracking-tighter">Market Intelligence.</h2>
          </div>
          <p className="text-indigo-100/40 text-2xl leading-relaxed max-w-md font-light italic">
            Telemetry from global liquidity sensors. Grounded in real-time institutional search tranches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {[
              { id: 'btc', label: 'BTC / USDT', color: '#c5a059', symbol: '₿' },
              { id: 'eth', label: 'ETH / USDT', color: '#c5a059', symbol: 'Ξ' },
              { id: 'gold', label: 'GOLD (XAU)', color: '#c5a059', symbol: 'Au' },
              { id: 'sp500', label: 'S&P 500', color: '#c5a059', symbol: 'SPX' }
            ].map((asset, i) => {
              const data = marketData[asset.id as keyof typeof marketData];
              const isUp = data.history[data.history.length-1] >= data.history[data.history.length-2];
              
              return (
                <motion.div 
                  key={asset.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/5 border border-white/10 p-12 rounded-6xl backdrop-blur-3xl group hover:border-brand-accent/30 transition-all shadow-2xl"
                >
                  <div className="flex justify-between items-start mb-16">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-white/20 font-mono text-sm uppercase tracking-widest">{asset.symbol}</span>
                        <p className="text-ui-caps text-indigo-300 tracking-[0.4em]">{asset.label}</p>
                      </div>
                      <p className="text-5xl font-black text-white font-mono tracking-tighter italic">
                        {data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <motion.div 
                      animate={{ scale: isUp ? [1, 1.05, 1] : [1, 0.98, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-ui-caps ${isUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}
                    >
                      {isUp ? <MoveUpRight size={14} /> : <MoveDownRight size={14} />}
                      <span>{(Math.random() * 1.5).toFixed(2)}%</span>
                    </motion.div>
                  </div>
                  <div className="h-20 opacity-80 group-hover:opacity-100 transition-opacity duration-1000">
                    <Sparkline data={data.history} color={asset.color} width={200} height={60} />
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
              className="bg-gradient-to-br from-brand-primary to-brand-primary-dark h-full rounded-6xl p-16 text-white shadow-2xl relative overflow-hidden flex flex-col group border border-white/5"
            >
              <div className="absolute top-0 right-0 p-32 opacity-[0.06] rotate-12 transition-transform duration-[6s] group-hover:rotate-[24deg] group-hover:scale-110">
                <LogoMark className="w-80 h-80" color="white" />
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center space-x-6 mb-16">
                  <div className="w-16 h-16 bg-white/10 rounded-4xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <LogoMark className="w-8 h-8" color="white" />
                  </div>
                  <div>
                    <h3 className="text-ui-caps tracking-[0.4em]">Sovereign Sentiment</h3>
                    <p className="text-ui-caps text-brand-accent mt-2 flex items-center">
                       <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mr-3 animate-pulse" />
                       Node FC-04 Active
                    </p>
                  </div>
                </div>

                <div className="flex-1 min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {loadingSentiment ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                        <div className="h-6 w-full bg-white/5 rounded-2xl animate-pulse" />
                        <div className="h-6 w-11/12 bg-white/5 rounded-2xl animate-pulse" />
                        <div className="h-6 w-3/4 bg-white/5 rounded-2xl animate-pulse" />
                      </motion.div>
                    ) : (
                      <motion.div key="content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col h-full">
                        <p className="text-2xl leading-relaxed font-medium italic text-indigo-50/80 mb-16">
                          {sentiment?.text}
                        </p>
                        {sentiment?.sources && sentiment.sources.length > 0 && (
                          <div className="mt-auto pt-12 border-t border-white/5">
                            <p className="text-ui-caps text-indigo-300 mb-8">Verified Grounding Nodes</p>
                            <div className="space-y-4">
                              {sentiment.sources.slice(0, 3).map((s, idx) => (
                                <a key={idx} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center text-sm text-brand-accent hover:text-white transition-all hover:translate-x-2 truncate group/link">
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
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-brand-stone flex flex-col h-full">
      <section className="relative min-h-screen flex items-center px-10 lg:px-22 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-[1.01]">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1]">
            <source src="https://player.vimeo.com/external/517090025.hd.mp4?s=07e77b63c8736e4f1659a35e4e89f816c14e135e&profile_id=172&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/60 to-transparent" />
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="section-container relative z-10 py-32 lg:py-48">
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-5 px-8 py-4 bg-white/10 border border-white/20 rounded-full backdrop-blur-3xl mb-12">
            <div className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_20px_rgba(197,160,89,0.7)]" />
            <span className="text-ui-caps text-white tracking-[0.4em]">Sovereign Node FG-04 Active</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="serif italic text-white tracking-tighter mb-16 relative">
            <span className="relative z-10">Capital</span> <br />
            <span className="text-brand-accent underline decoration-white/10 decoration-8 underline-offset-8 relative z-10">Redefined.</span>
            <div className="absolute -top-12 -left-20 w-64 h-64 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-white/70 text-3xl max-w-3xl leading-relaxed font-light mb-24 italic tracking-tight">
            Architecting high-stakes capital structures for the world's most aggressive visionaries.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-10">
            <Link to="/contact" className="px-16 py-8 bg-brand-accent text-white rounded-5xl text-ui-caps flex items-center justify-center group hover:bg-white hover:text-brand-primary transition-all duration-[0.7s] shadow-2xl active:scale-95">
              Initiate Briefing
              <ArrowRight className="ml-5 group-hover:translate-x-3 transition-transform duration-500" size={20} />
            </Link>
            <Link to="/work" className="px-16 py-8 bg-white/10 border border-white/20 text-white rounded-5xl text-ui-caps flex items-center justify-center hover:bg-white/20 transition-all duration-[0.7s] backdrop-blur-3xl group active:scale-95">
              View Case Files
              <Zap className="ml-4 text-brand-accent group-hover:scale-110 transition-transform duration-500" size={18} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-16 right-16 hidden xl:flex space-x-24">
          {[
            { label: 'Advised AUM', val: '$2.1B+' },
            { label: 'Yield Alpha', val: '18.4%' }
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 1.2 + (i * 0.2), ease: [0.16, 1, 0.3, 1] }} className="text-right border-r-2 border-white/10 pr-12 last:border-r-0">
              <p className="text-ui-caps text-white/40 mb-3">{m.label}</p>
              <p className="text-5xl text-white font-black tracking-tighter italic leading-none">{m.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Architectural Edge Section */}
      <section className="py-40 lg:py-64 px-10 lg:px-22 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-40 opacity-[0.03] pointer-events-none transform scale-150 rotate-45"><Landmark size={800} /></div>
        
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
            <motion.div initial={{ opacity: 0, x: -48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-12">
              <div className="inline-flex items-center space-x-6 px-6 py-2 bg-brand-stone rounded-full border border-brand-accent/20">
                <ShieldCheck className="text-brand-accent" size={18} />
                <span className="text-ui-caps text-brand-primary tracking-[0.4em]">The Architectural Edge</span>
              </div>
              <h2 className="serif italic text-brand-primary font-black leading-tight tracking-tighter">Commanding Fluid Markets.</h2>
              <p className="text-slate-500 text-2xl leading-relaxed font-medium italic opacity-90">
                In an epoch defined by rapid capital migration, Federgreen provides the structural integrity required for sovereign-grade asset growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8">
                {[
                  { icon: Cpu, title: 'Heuristic Node Modeling', desc: 'Predictive liquidity mapping via FEDERGREEN 3.' },
                  { icon: Layers, title: 'Multi-Tranche Security', desc: 'Triple-redundant institutional risk mitigation.' }
                ].map((edge, i) => (
                  <div key={i} className="space-y-4 group">
                    <div className="w-14 h-14 bg-brand-primary text-brand-accent rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 group-hover:scale-110 shadow-lg">
                      <edge.icon size={24} />
                    </div>
                    <h4 className="font-black text-brand-primary text-lg italic tracking-tight">{edge.title}</h4>
                    <p className="text-slate-400 font-medium italic">{edge.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-brand-slate rounded-[5rem] overflow-hidden shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" alt="Institutional Architecture" className="w-full h-full object-cover filter grayscale contrast-[1.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-16 left-16 right-16">
                  <p className="text-ui-caps text-brand-accent mb-4 tracking-[0.8em]">Sovereign Archive</p>
                  <p className="text-3xl text-white font-black italic tracking-tighter leading-tight">Managing $2.1B in Global Infrastructure Tranches.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-40 lg:py-64 px-10 lg:px-22 bg-white border-b border-slate-100 relative">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-start mb-32 lg:mb-48">
            <motion.div initial={{ opacity: 0, x: -48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="text-ui-caps text-brand-primary block mb-10 flex items-center">
                <div className="w-14 h-[2px] bg-brand-primary mr-5" /> Institutional Advisory Node
              </span>
              <h2 className="serif italic text-brand-primary tracking-tighter">Navigating High-Stakes Complexity.</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
              <p className="text-slate-500 text-2xl leading-relaxed font-medium italic opacity-90">
                We operate exclusively at the intersection of traditional sovereign finance and the high-velocity digital frontier. 
              </p>
              <p className="text-slate-400 text-xl leading-relaxed font-medium italic">
                Our proprietary FEDERGREEN-driven mapping provides structural clarity where others see opacity.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            {[
              { icon: Landmark, title: 'Capital Advisory', desc: 'Bespoke debt and equity tranches for global infrastructure.', path: '/services', accent: 'bg-brand-stone text-brand-primary border border-brand-accent/10' },
              { icon: Shield, title: 'Compliance Node', desc: 'Tier-1 KYC/AML/CTF protocols for institutional-grade integrity.', path: '/kyc-node', accent: 'bg-brand-stone text-brand-emerald border border-brand-emerald/10' },
              { icon: Globe, title: 'Global Markets', desc: 'Deep-market liquidity sentiment mapping across digital asset classes.', path: '/areas', accent: 'bg-brand-primary text-brand-accent border border-white/5 shadow-2xl' }
            ].map((item, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
                className={`group p-14 rounded-6xl transition-all duration-[0.7s] hover:shadow-2xl relative overflow-hidden active:scale-95 ${item.accent}`}
              >
                <div className={`w-20 h-20 rounded-4xl flex items-center justify-center mb-12 shadow-inner transition-all duration-700 group-hover:scale-105 group-hover:rotate-3 ${item.accent.includes('bg-brand-primary') ? 'bg-white/10' : 'bg-white'}`}><item.icon size={32} /></div>
                <h3 className="text-3xl font-black mb-8 group-hover:translate-x-2 transition-transform tracking-tighter italic leading-none">{item.title}</h3>
                <p className="text-lg leading-relaxed mb-12 font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                <Link to={item.path} className="flex items-center font-black text-ui-caps group-hover:translate-x-4 transition-transform duration-500">Access Node <ChevronRight className="ml-2" size={16} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarketPulseSection />

      <section className="py-40 lg:py-64 px-10 lg:px-22 bg-brand-primary text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="section-container space-y-24 relative z-10">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <Star className="w-24 h-24 text-brand-accent mx-auto animate-pulse mb-12 shadow-[0_0_64px_rgba(197,160,89,0.3)]" fill="currentColor" />
          </motion.div>
          <h2 className="serif italic text-white leading-none tracking-tighter">Architect your sovereign growth.</h2>
          <p className="text-white/60 text-3xl leading-relaxed max-w-4xl mx-auto font-light italic">Accepted high-net-worth engagements follow a rigorous vetting process.</p>
          <div className="flex justify-center pt-16">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.6 }}>
              <Link to="/contact" className="px-24 py-10 bg-brand-accent text-white rounded-5xl text-ui-caps hover:bg-white hover:text-brand-primary transition-all duration-[0.7s] shadow-2xl group flex items-center text-lg">
                Apply Consultation Node 
                <ArrowRight className="inline-block ml-6 group-hover:translate-x-3 transition-transform duration-500" size={24} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
