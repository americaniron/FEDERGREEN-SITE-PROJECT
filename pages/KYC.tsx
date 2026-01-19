
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, FileCheck, AlertTriangle, Fingerprint, RefreshCcw, Loader2, ShieldCheck, Award, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SecurityCertificate = () => (
  <motion.div 
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className="mt-16 inline-flex items-center space-x-8 bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(30,58,95,0.1)] backdrop-blur-sm group relative overflow-hidden"
  >
    {/* Subtle gradient background for the badge area */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-50" />
    
    <div className="relative">
      {/* Intricate Badge Visual */}
      <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center shadow-2xl shadow-indigo-950/30 group-hover:scale-105 transition-transform duration-1000 relative z-10 border-4 border-white">
        <ShieldCheck className="text-brand-accent" size={40} strokeWidth={1.5} />
      </div>
      
      {/* Rotating concentric rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-brand-accent/30 rounded-full scale-125 pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-brand-primary/10 rounded-full scale-150 pointer-events-none opacity-50"
      />
      
      {/* Floating particles or "nodes" around the badge */}
      <motion.div 
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-white shadow-lg"
      />
    </div>

    <div className="relative z-10">
      <div className="flex items-center space-x-3 mb-2">
        <p className="text-ui-caps text-brand-primary font-black tracking-[0.2em]">AES-256 GCM Certified</p>
        <Zap size={14} className="text-brand-accent fill-brand-accent animate-pulse" />
      </div>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">Institutional Encryption Artifact</p>
      
      <div className="mt-5 flex items-center space-x-4 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-mono text-brand-primary font-black tracking-widest uppercase">NODE: FC-SEC-882-VERIFIED</span>
      </div>
    </div>
  </motion.div>
);

const KYC: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const [purposeAgreed, setPurposeAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'pre-scanning' | 'threat-detected' | 'verified' | 'uploading' | 'encrypting' | 'success'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!allowedTypes.includes(file.type)) {
        setFileError("Node error: Document format rejected. Standard PDF, DOCX, JPG, or PNG required.");
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      setFileName(file.name);
      startFEDERGREENScan(file.name);
    }
  };

  const startFEDERGREENScan = (name: string) => {
    setStatus('pre-scanning');
    setProgress(0);
    setScanMessage('Initializing heuristic layer...');

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress === 15) setScanMessage('Parsing metadata signatures...');
      if (currentProgress === 40) setScanMessage('FEDERGREEN executing polymorphic pattern detection...');
      if (currentProgress === 65) setScanMessage('Cross-referencing sovereign threat databases...');
      if (currentProgress === 85) setScanMessage('Finalizing cryptographic integrity tranches...');

      if (currentProgress >= 100) {
        clearInterval(interval);
        const isThreat = Math.random() < 0.05; 
        if (isThreat) {
          setStatus('threat-detected');
          setScanMessage('CRITICAL: Malicious pattern detected. Transmission blocked.');
        } else {
          setStatus('verified');
          setScanMessage('Clearance Granted. Institutional integrity confirmed.');
        }
      }
    }, 40);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !purposeAgreed) return;
    if (status !== 'verified') return;
    
    setStatus('uploading');
    setProgress(0);
    setScanMessage('Opening secure tunnel to vault node...');
    
    let current = 0;
    const transInterval = setInterval(() => {
      current += 2;
      setProgress(current);
      if (current === 40) {
        setStatus('encrypting');
        setScanMessage('Executing AES-256-GCM wrapping...');
      }
      if (current === 75) {
        setScanMessage('Sealing document in sovereign storage...');
      }
      if (current >= 100) {
        clearInterval(transInterval);
        setStatus('success');
      }
    }, 45);
  };

  return (
    <div className="bg-brand-stone min-h-screen py-32 lg:py-48 px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-80 opacity-[0.03] pointer-events-none rotate-12">
         <Fingerprint size={800} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          
          <div className="lg:col-span-5 space-y-16 lg:space-y-24">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center space-x-6 mb-12">
                <div className="w-16 h-[2px] bg-brand-emerald shadow-sm" />
                <span className="text-brand-emerald text-ui-caps tracking-[0.5em]">Secure Protocol v2.5</span>
              </div>
              <h1 className="serif text-7xl lg:text-8xl text-brand-primary font-black leading-[0.85] tracking-tighter mb-12 italic">Identity <br/> Onboarding.</h1>
              <p className="text-slate-500 text-2xl leading-relaxed font-medium italic opacity-90">
                Federgreen Consulting utilizes sovereign FEDERGREEN nodes to isolate, encrypt, and validate institutional documentation.
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                { title: 'Heuristic Validation', desc: 'Real-time FEDERGREEN scanning for polymorphic threats.', icon: Shield },
                { title: 'AES-256 GCM Encryption', desc: 'Military-grade cryptographic wrapping for persistent nodes.', icon: Lock },
                { title: 'Sovereign Storage', desc: 'Documents archived in decentralized, isolated vault tranches.', icon: FileCheck }
              ].map((item, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 * i }}
                  className="flex items-start group"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-white border border-slate-100 rounded-[2.2rem] flex items-center justify-center mr-10 group-hover:bg-brand-primary transition-all duration-1000 shadow-sm group-hover:shadow-2xl group-hover:shadow-indigo-900/40 group-hover:-translate-y-2">
                    <item.icon className="w-10 h-10 text-slate-300 group-hover:text-brand-accent transition-colors duration-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-brand-primary font-black mb-3 text-[14px] uppercase tracking-[0.3em] group-hover:text-brand-emerald transition-colors duration-700">{item.title}</h4>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium italic">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <SecurityCertificate />
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_96px_192px_-48px_rgba(30,58,95,0.12)] overflow-hidden glass-premium"
            >
              {status === 'success' ? (
                <div className="p-24 lg:p-32 text-center animate-fadeIn relative">
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }}
                      className="w-44 h-44 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-16 shadow-inner"
                    >
                      <div className="w-28 h-28 bg-brand-emerald rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-600/40 rotate-12">
                        <FileCheck className="text-white" size={48} />
                      </div>
                    </motion.div>
                    <h2 className="serif text-6xl lg:text-7xl text-brand-primary font-black mb-10 tracking-tighter italic leading-tight">Vault Ingestion <br/> Complete</h2>
                    <p className="text-slate-500 text-2xl mb-16 max-w-lg mx-auto leading-relaxed font-medium italic opacity-80">
                      Documentation successfully encrypted and assigned to the <span className="text-brand-primary font-black underline decoration-brand-accent/20 decoration-8 underline-offset-4">Compliance Desk</span>.
                    </p>
                    <div className="inline-block px-12 py-5 bg-brand-primary rounded-[2rem] font-mono text-[13px] text-white uppercase tracking-[0.4em] mb-16 shadow-2xl">
                      NODE-REF: FC-VLT-{Math.floor(Math.random()*9999999)}
                    </div>
                    <br />
                    <button onClick={() => { setStatus('idle'); setFileName(null); }} className="group flex items-center justify-center mx-auto text-brand-primary font-black text-ui-caps hover:text-brand-accent transition-all duration-700 underline decoration-2 underline-offset-8">
                      <RefreshCcw size={16} className="mr-4 group-hover:rotate-180 transition-transform duration-1000" />
                      Transmit Additional Credentials
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-12 lg:p-20 space-y-12 lg:space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-3">Legal Identity</label>
                      <input 
                        type="text" required placeholder="Full Entity Name" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-[2.2rem] px-8 py-6 text-brand-primary font-black focus:bg-white focus:border-brand-primary outline-none transition-all shadow-inner text-[15px]" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-3">Instrument Node</label>
                      <div className="relative">
                        <select required className="w-full bg-slate-50 border border-slate-100 rounded-[2.2rem] px-8 py-6 text-brand-primary font-black focus:bg-white focus:border-brand-primary outline-none transition-all cursor-pointer appearance-none shadow-inner text-[15px]">
                          <option value="">Select Classification</option>
                          <option>Sovereign Passport</option>
                          <option>Proof of Funds (MT199)</option>
                          <option>Articles of Incorp</option>
                          <option>Asset Deed / Title</option>
                        </select>
                        <ArrowRight className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 text-slate-300 pointer-events-none" size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] ml-3">Secure Gateway Node</label>
                    <div className="relative">
                      <input ref={fileInputRef} type="file" id="f-up" className="hidden" onChange={handleFileChange} required />
                      <label 
                        htmlFor="f-up" 
                        className={`flex flex-col items-center justify-center w-full min-h-[28rem] border-4 border-dashed rounded-[4rem] cursor-pointer transition-all duration-1000 relative overflow-hidden group ${
                          fileError || status === 'threat-detected' ? 'bg-rose-50 border-rose-200 shadow-2xl' :
                          status === 'verified' ? 'bg-emerald-50 border-emerald-200 shadow-2xl' : 
                          'bg-slate-50 border-slate-100 hover:border-brand-primary/20 hover:bg-white hover:shadow-2xl'
                        }`}
                      >
                        {status === 'idle' ? (
                          <div className="text-center px-16 space-y-10">
                            <div className="w-32 h-32 rounded-5xl bg-white flex items-center justify-center mx-auto shadow-sm border border-slate-50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000 group-hover:bg-brand-primary group-hover:text-brand-accent group-hover:shadow-2xl">
                              <Shield className="w-14 h-14 text-slate-200 group-hover:text-brand-accent transition-colors duration-700" />
                            </div>
                            <div className="space-y-4">
                              <h3 className="serif text-4xl font-black text-brand-primary mb-2 tracking-tighter italic">Initiate Transmission</h3>
                              <p className="text-lg text-slate-400 font-medium leading-relaxed italic opacity-80">Accepted: PDF, DOCX, JPG, PNG. <br/> FEDERGREEN scan executes immediately.</p>
                            </div>
                            {fileError && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-rose-600 font-black text-[11px] uppercase tracking-[0.4em] bg-rose-100 px-8 py-3.5 rounded-2xl inline-block">{fileError}</motion.p>}
                          </div>
                        ) : status === 'threat-detected' ? (
                          <div className="text-center px-16 animate-fadeIn space-y-10">
                             <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-2xl shadow-rose-900/30">
                                <AlertTriangle className="w-12 h-12 text-rose-600" />
                             </div>
                             <div className="space-y-4">
                                <h3 className="serif text-4xl font-black text-rose-600 mb-2 tracking-tighter italic">Heuristic Firewall</h3>
                                <p className="text-rose-950/60 text-lg font-medium italic">{scanMessage}</p>
                             </div>
                             <button onClick={() => setStatus('idle')} className="px-14 py-6 bg-rose-600 text-white rounded-[2.5rem] font-black text-ui-caps shadow-2xl hover:bg-rose-700 transition-all duration-700">Retry Security Node</button>
                          </div>
                        ) : (
                          <div className="w-full px-12 lg:px-20 space-y-12 lg:space-y-16 py-12">
                            <div className="flex justify-between items-end">
                              <div className="space-y-6">
                                <h4 className="serif text-4xl lg:text-5xl text-brand-primary font-black tracking-tighter italic">
                                  {status === 'pre-scanning' && 'Scanning Tranches...'}
                                  {status === 'verified' && 'Verification Locked'}
                                  {status === 'uploading' && 'Tunneling to Vault...'}
                                  {status === 'encrypting' && 'AES-GCM Wrapping...'}
                                </h4>
                                <div className="flex items-center space-x-4">
                                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                                  <p className="text-[11px] font-black uppercase tracking-[0.6em] text-indigo-600">{scanMessage}</p>
                                </div>
                              </div>
                              <span className="serif text-5xl lg:text-6xl font-black text-brand-primary italic">{progress}%</span>
                            </div>
                            <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden shadow-inner p-1.5">
                              <motion.div 
                                className={`h-full rounded-full shadow-2xl ${status === 'verified' ? 'bg-brand-emerald' : 'bg-brand-primary'}`}
                                initial={{ width: 0 }} 
                                animate={{ width: `${progress}%` }}
                                transition={{ type: 'spring', stiffness: 40 }}
                              />
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 rounded-[3.5rem] p-12 border border-slate-100 space-y-12 shadow-inner">
                    <div className="flex items-start">
                      <div className="relative flex items-center pt-2">
                        <input 
                          type="checkbox" checked={purposeAgreed} onChange={e => setPurposeAgreed(e.target.checked)}
                          className="w-8 h-8 rounded-xl text-brand-primary border-slate-200 focus:ring-brand-primary shadow-inner cursor-pointer" 
                        />
                      </div>
                      <div className="ml-8 text-lg leading-[1.8] text-slate-500 font-medium italic">
                        <span className="text-brand-primary font-black block mb-2 uppercase tracking-[0.4em] text-[12px]">Submission Purpose</span>
                        I authorize data ingestion solely for <span className="text-brand-primary font-bold underline decoration-brand-accent/20 decoration-8 underline-offset-1">KYC/AML vetting</span> per global protocols.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="relative flex items-center pt-2">
                        <input 
                          type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                          className="w-8 h-8 rounded-xl text-brand-primary border-slate-200 focus:ring-brand-primary shadow-inner cursor-pointer" 
                        />
                      </div>
                      <div className="ml-8 text-lg leading-[1.8] text-slate-500 font-medium italic">
                        <span className="text-brand-primary font-black block mb-2 uppercase tracking-[0.4em] text-[12px]">Privacy & Residency</span>
                        I agree to the <Link to="/privacy" className="text-indigo-600 font-bold hover:text-brand-primary transition-colors">Federgreen Privacy Node</Link> for encrypted data residency.
                      </div>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: status === 'verified' && agreed && purposeAgreed ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status !== 'verified' || !fileName || !agreed || !purposeAgreed}
                    className="w-full bg-brand-primary text-white py-10 rounded-[2.5rem] font-black text-ui-caps hover:bg-brand-emerald transition-all duration-700 shadow-2xl disabled:opacity-20 disabled:grayscale group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="flex items-center justify-center relative z-10">
                      Execute Secure Submission Node
                      <ArrowRight className="ml-6 group-hover:translate-x-4 transition-transform duration-700" />
                    </span>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;
