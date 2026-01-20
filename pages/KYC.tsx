
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, FileCheck, AlertTriangle, Fingerprint, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const KYC: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const [purposeAgreed, setPurposeAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'pre-scanning' | 'threat-detected' | 'verified' | 'uploading' | 'encrypting' | 'success'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [entityName, setEntityName] = useState('');
  const [classification, setClassification] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
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
      startAIScan(file.name);
    }
  };

  const startAIScan = (name: string) => {
    setStatus('pre-scanning');
    setProgress(0);
    setScanMessage('AI Node initializing heuristic layer...');

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress === 15) setScanMessage('Parsing metadata signatures & header logic...');
      if (currentProgress === 40) setScanMessage('AI executing polymorphic pattern detection...');
      if (currentProgress === 65) setScanMessage('Cross-referencing global sovereign threat databases...');
      if (currentProgress === 85) setScanMessage('Finalizing cryptographic integrity tranches...');

      if (currentProgress >= 100) {
        clearInterval(interval);
        const isThreat = Math.random() < 0.08; 
        if (isThreat) {
          setStatus('threat-detected');
          setScanMessage('CRITICAL: Malicious pattern detected in tranches. Transmission blocked.');
        } else {
          setStatus('verified');
          setScanMessage('Clearance Granted. Institutional integrity confirmed.');
        }
      }
    }, 45);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!entityName || entityName.length < 3) {
      setFormError("Valid entity identifier required");
      return;
    }
    if (!classification) {
      setFormError("Instrument classification required");
      return;
    }
    if (!agreed || !purposeAgreed) {
      setFormError("Full protocol agreement required");
      return;
    }
    if (status !== 'verified') {
      setFormError("Credential validation required");
      return;
    }
    
    setStatus('uploading');
    setProgress(0);
    setScanMessage('Opening secure tunnel to vault node...');
    
    let current = 0;
    const transInterval = setInterval(() => {
      current += 2;
      setProgress(current);
      if (current === 40) {
        setStatus('encrypting');
        setScanMessage('Executing AES-256-GCM wrapping sequence...');
      }
      if (current === 75) {
        setScanMessage('Sealing document in sovereign storage unit...');
      }
      if (current >= 100) {
        clearInterval(transInterval);
        setStatus('success');
      }
    }, 50);
  };

  return (
    <div className="bg-brand-stone min-h-screen py-32 px-6 lg:px-12 xl:px-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-64 opacity-[0.03] pointer-events-none">
         <Fingerprint size={600} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-5 space-y-12 lg:space-y-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-[2px] bg-brand-primary shadow-xl shadow-brand-primary/10" />
                <span className="text-brand-primary text-[11px] font-black uppercase tracking-[0.5em]">Secure Protocol v2.5</span>
              </div>
              <h1 className="serif text-brand-primary font-black leading-none tracking-tightest mb-10 italic">Identity <br/> Onboarding.</h1>
              <p className="text-brand-slate text-xl leading-relaxed font-medium italic">
                Federgreen Consulting utilizes sovereign AI-nodes to isolate, encrypt, and validate institutional documentation against global AMLD6 tranches.
              </p>
            </motion.div>

            <div className="space-y-8 lg:space-y-10">
              {[
                { title: 'Heuristic Validation', desc: 'Real-time AI scanning of tranches for polymorphic threats.', icon: Shield },
                { title: 'AES-256 GCM Encryption', desc: 'Military-grade cryptographic wrapping for all persistent data.', icon: Lock },
                { title: 'Sovereign Storage', desc: 'Documents are archived in decentralized, isolated vault nodes.', icon: FileCheck }
              ].map((item, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                  className="flex items-start group"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white border border-brand-stone/50 rounded-[1.8rem] flex items-center justify-center mr-8 group-hover:bg-brand-primary group-hover:text-brand-accent transition-all duration-700 shadow-sm group-hover:shadow-xl group-hover:shadow-brand-primary/20 group-hover:-translate-y-1 group-hover:rotate-6">
                    <item.icon className="w-8 h-8 text-brand-stone group-hover:text-brand-accent transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-brand-primary font-black mb-2 text-[12px] uppercase tracking-[0.2em] group-hover:text-brand-accent-deep transition-colors">{item.title}</h4>
                    <p className="text-sm text-brand-slate/80 leading-relaxed font-medium italic">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] md:rounded-[4rem] border border-brand-stone shadow-2xl overflow-hidden glass-premium"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="p-10 md:p-16 lg:p-24 text-center relative"
                  >
                    <div className="absolute inset-0 bg-brand-primary/5 backdrop-blur-3xl opacity-50" />
                    <div className="relative z-10">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="w-32 h-32 lg:w-36 lg:h-36 bg-brand-stone border border-brand-stone/60 rounded-full flex items-center justify-center mx-auto mb-10 lg:mb-12 shadow-inner"
                      >
                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-brand-primary rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-primary/40 rotate-12">
                          <FileCheck className="text-brand-accent" size={40} />
                        </div>
                      </motion.div>
                      <h2 className="serif text-5xl lg:text-6xl text-brand-primary font-black mb-8 tracking-tighter italic">Vault Ingestion Complete</h2>
                      <p className="text-brand-slate text-xl mb-12 max-w-lg mx-auto leading-relaxed font-medium italic">
                        Documentation has been successfully encrypted and assigned to the <span className="text-brand-primary font-black">Compliance Desk</span> for final node clearance.
                      </p>
                      <div className="inline-block px-10 py-4 bg-brand-primary rounded-2xl font-mono text-[11px] text-brand-stone uppercase tracking-widest mb-12 shadow-xl shadow-brand-primary/30">
                        NODE-REF: FC-VLT-{Math.floor(Math.random()*9999999)}
                      </div>
                      <br />
                      <button onClick={() => { setStatus('idle'); setFileName(null); setEntityName(''); setClassification(''); }} className="group flex items-center justify-center mx-auto text-brand-primary font-black text-[11px] uppercase tracking-[0.4em] hover:text-brand-accent-deep transition-colors underline decoration-2 underline-offset-8">
                        <RefreshCcw size={14} className="mr-3 group-hover:rotate-180 transition-transform duration-700" />
                        Transmit Additional Credentials
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 md:p-12 lg:p-16 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-brand-slate/60 uppercase tracking-[0.4em] ml-2">Legal Identity</label>
                        <div className="relative">
                          <input 
                            type="text" required placeholder="Full Entity Name" 
                            value={entityName}
                            onChange={e => setEntityName(e.target.value)}
                            className={`w-full bg-brand-stone/40 border rounded-[1.8rem] px-8 py-5 text-brand-primary font-black focus:bg-white outline-none transition-all shadow-inner text-sm tracking-tight ${
                              entityName.length >= 3 ? 'border-emerald-100 focus:border-emerald-500' : 'border-brand-stone focus:border-brand-primary'
                            }`} 
                          />
                          {entityName.length >= 3 && <CheckCircle2 size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500" />}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-brand-slate/60 uppercase tracking-[0.4em] ml-2">Instrument Node</label>
                        <div className="relative">
                          <select 
                            required 
                            value={classification}
                            onChange={e => setClassification(e.target.value)}
                            className={`w-full bg-brand-stone/40 border rounded-[1.8rem] px-8 py-5 text-brand-primary font-black focus:bg-white outline-none transition-all cursor-pointer appearance-none shadow-inner text-sm tracking-tight ${
                              classification ? 'border-emerald-100 focus:border-emerald-500' : 'border-brand-stone focus:border-brand-primary'
                            }`}
                          >
                            <option value="">Select Classification</option>
                            <option>Sovereign Passport</option>
                            <option>Proof of Funds (MT199)</option>
                            <option>Articles of Incorp</option>
                            <option>Asset Deed / Title</option>
                          </select>
                          <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-brand-stone pointer-events-none" size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[11px] font-black text-brand-slate/60 uppercase tracking-[0.4em] ml-2">Secure Gateway Node</label>
                      <div className="relative">
                        <input ref={fileInputRef} type="file" id="f-up" className="hidden" onChange={handleFileChange} required />
                        <label 
                          htmlFor="f-up" 
                          className={`flex flex-col items-center justify-center w-full min-h-[20rem] lg:min-h-[24rem] border-2 border-dashed rounded-[3.5rem] cursor-pointer transition-all duration-700 relative overflow-hidden group ${
                            fileError || status === 'threat-detected' ? 'bg-rose-50 border-rose-200 shadow-xl shadow-rose-900/5' :
                            status === 'verified' ? 'bg-brand-primary/5 border-brand-primary/20 shadow-xl' : 
                            'bg-brand-stone/20 border-brand-stone hover:border-brand-primary/30 hover:bg-white hover:shadow-2xl hover:shadow-brand-primary/5'
                          }`}
                        >
                          {status === 'idle' ? (
                            <div className="text-center px-12">
                              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-[2.5rem] bg-white flex items-center justify-center mx-auto mb-8 shadow-sm border border-brand-stone group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 group-hover:bg-brand-primary group-hover:text-brand-accent">
                                <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-brand-stone/40 group-hover:text-brand-accent transition-colors" />
                              </div>
                              <h3 className="serif text-3xl font-black text-brand-primary mb-4 tracking-tight italic">Initiate Transmission</h3>
                              <p className="text-sm text-brand-slate font-medium leading-relaxed italic opacity-70">Accepted: PDF, DOCX, JPG, PNG. <br/> Heuristic scan will execute immediately.</p>
                              {fileError && <p className="mt-8 text-rose-600 font-black text-[10px] uppercase tracking-[0.3em] bg-rose-100 px-6 py-3 rounded-2xl animate-bounce">{fileError}</p>}
                            </div>
                          ) : status === 'threat-detected' ? (
                            <div className="text-center px-12 animate-fadeIn">
                               <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-xl shadow-rose-900/20">
                                  <AlertTriangle className="w-10 h-10 text-rose-600" />
                               </div>
                               <h3 className="serif text-3xl font-black text-rose-600 mb-4 tracking-tighter italic">Heuristic Firewall Active</h3>
                               <p className="text-rose-950/60 text-sm font-medium mb-10 italic">{scanMessage}</p>
                               <button onClick={() => setStatus('idle')} className="px-10 py-4 bg-rose-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.5em] shadow-xl hover:bg-rose-700 transition-all">Retry Security Node</button>
                            </div>
                          ) : (
                            <div className="w-full px-8 md:px-12 lg:px-16 space-y-10 py-12">
                              <div className="flex justify-between items-end">
                                <div className="space-y-4">
                                  <h4 className="serif text-3xl lg:text-4xl text-brand-primary font-black tracking-tighter italic">
                                    {status === 'pre-scanning' && 'Scanning Tranches...'}
                                    {status === 'verified' && 'Verification Locked'}
                                    {status === 'uploading' && 'Tunneling to Vault...'}
                                    {status === 'encrypting' && 'AES-GCM Wrapping...'}
                                  </h4>
                                  <div className="flex items-center space-x-3">
                                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-brand-primary rounded-full" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary/70">{scanMessage}</p>
                                  </div>
                                </div>
                                <span className="serif text-4xl lg:text-5xl font-black text-brand-primary italic">{progress}%</span>
                              </div>
                              <div className="w-full h-4 bg-brand-stone rounded-full overflow-hidden shadow-inner p-1">
                                <motion.div 
                                  className={`h-full rounded-full shadow-lg ${status === 'verified' ? 'bg-emerald-600 shadow-emerald-500/30' : 'bg-brand-primary shadow-brand-primary/30'}`}
                                  initial={{ width: 0 }} 
                                  animate={{ width: `${progress}%` }}
                                  transition={{ type: 'spring', stiffness: 45 }}
                                />
                              </div>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="bg-brand-stone/20 rounded-[3rem] p-8 lg:p-10 border border-brand-stone space-y-8 shadow-inner">
                      <div className="flex items-start">
                        <div className="relative flex items-center pt-1">
                          <input 
                            type="checkbox" checked={purposeAgreed} onChange={e => setPurposeAgreed(e.target.checked)}
                            className="w-6 h-6 rounded-lg text-brand-primary border-brand-stone focus:ring-brand-accent shadow-inner cursor-pointer" 
                          />
                        </div>
                        <div className="ml-6 text-sm leading-relaxed text-brand-slate font-medium italic">
                          <span className="text-brand-primary font-black block mb-1 uppercase tracking-[0.3em] text-[11px]">Submission Purpose</span>
                          I authorize data ingestion solely for <span className="text-brand-primary font-bold underline decoration-brand-accent decoration-2 underline-offset-4">KYC/AML vetting</span> per global financial tranches.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="relative flex items-center pt-1">
                          <input 
                            type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                            className="w-6 h-6 rounded-lg text-brand-primary border-brand-stone focus:ring-brand-accent shadow-inner cursor-pointer" 
                          />
                        </div>
                        <div className="ml-6 text-sm leading-relaxed text-brand-slate font-medium italic">
                          <span className="text-brand-primary font-black block mb-1 uppercase tracking-[0.3em] text-[11px]">Privacy & Residency</span>
                          I agree to the <Link to="/privacy" className="text-brand-accent-deep font-bold hover:text-brand-primary transition-colors">Privacy Node</Link> protocols for encrypted data residency.
                        </div>
                      </div>
                    </div>

                    {formError && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[10px] font-black uppercase tracking-widest flex items-center">
                        <AlertTriangle size={14} className="mr-2" /> {formError}
                      </motion.div>
                    )}

                    <motion.button 
                      whileHover={{ scale: status === 'verified' && agreed && purposeAgreed ? 1.01 : 1 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={status !== 'verified' || !fileName || !agreed || !purposeAgreed || !entityName || !classification}
                      className="w-full bg-brand-primary text-brand-stone py-8 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] hover:bg-brand-primary-dark transition-all shadow-premium disabled:opacity-25 disabled:grayscale group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="flex items-center justify-center relative z-10">
                        Execute Secure Submission Node
                        <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform duration-500" />
                      </span>
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;
