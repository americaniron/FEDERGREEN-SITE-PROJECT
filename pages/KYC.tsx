
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, FileCheck, AlertTriangle, Fingerprint, RefreshCcw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="bg-ivory min-h-screen py-48 px-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-80 opacity-[0.03] pointer-events-none rotate-12">
         <Fingerprint size={800} />
      </div>
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-start">
          
          <div className="lg:col-span-5 space-y-24">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center space-x-6 mb-12">
                <div className="w-16 h-[2.5px] bg-emerald-700 shadow-xl shadow-emerald-700/20" />
                <span className="text-emerald-700 text-[12px] font-black uppercase tracking-[0.6em]">Secure Protocol v2.5</span>
              </div>
              <h1 className="serif text-8xl text-[#0a0f1a] font-black leading-[0.85] tracking-tighter mb-12 italic">Identity <br/> Onboarding.</h1>
              <p className="text-slate-500 text-2xl leading-relaxed font-medium italic opacity-90">
                Federgreen Consulting utilizes sovereign FEDERGREEN nodes to isolate, encrypt, and validate institutional documentation against global AMLD6 tranches.
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                { title: 'Heuristic Validation', desc: 'Real-time FEDERGREEN scanning of tranches for polymorphic threats.', icon: Shield },
                { title: 'AES-256 GCM Encryption', desc: 'Military-grade cryptographic wrapping for all persistent data nodes.', icon: Lock },
                { title: 'Sovereign Storage', desc: 'Documents are archived in decentralized, isolated vault tranches.', icon: FileCheck }
              ].map((item, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 * i }}
                  className="flex items-start group"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-white border border-slate-100 rounded-[2.2rem] flex items-center justify-center mr-10 group-hover:bg-[#0a0f1a] transition-all duration-1000 shadow-sm group-hover:shadow-2xl group-hover:shadow-indigo-900/40 group-hover:-translate-y-2 group-hover:rotate-6">
                    <item.icon className="w-10 h-10 text-slate-300 group-hover:text-emerald-400 transition-colors duration-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[#0a0f1a] font-black mb-3 text-[14px] uppercase tracking-[0.3em] group-hover:text-emerald-800 transition-colors duration-700">{item.title}</h4>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium italic">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_96px_192px_-48px_rgba(10,15,26,0.18)] overflow-hidden glass-premium"
            >
              {status === 'success' ? (
                <div className="p-32 text-center animate-fadeIn relative">
                  <div className="absolute inset-0 bg-emerald-50/20 backdrop-blur-3xl opacity-50" />
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }}
                      className="w-44 h-44 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-16 shadow-inner"
                    >
                      <div className="w-28 h-28 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-600/40 rotate-12">
                        <FileCheck className="text-white" size={48} />
                      </div>
                    </motion.div>
                    <h2 className="serif text-7xl text-[#0a0f1a] font-black mb-10 tracking-tighter italic leading-tight">Vault Ingestion <br/> Complete</h2>
                    <p className="text-slate-500 text-2xl mb-16 max-w-lg mx-auto leading-relaxed font-medium italic opacity-80">
                      Documentation successfully encrypted and assigned to the <span className="text-[#0a0f1a] font-black underline decoration-emerald-200 decoration-8 underline-offset-4">Compliance Desk</span> for clearance.
                    </p>
                    <div className="inline-block px-12 py-5 bg-[#0a0f1a] rounded-[2rem] font-mono text-[13px] text-white uppercase tracking-[0.4em] mb-16 shadow-2xl shadow-indigo-900/40">
                      NODE-REF: FC-VLT-{Math.floor(Math.random()*9999999)}
                    </div>
                    <br />
                    <button onClick={() => { setStatus('idle'); setFileName(null); }} className="group flex items-center justify-center mx-auto text-[#0a0f1a] font-black text-[12px] uppercase tracking-[0.5em] hover:text-indigo-600 transition-all duration-700 underline decoration-2 underline-offset-8">
                      <RefreshCcw size={16} className="mr-3 group-hover:rotate-180 transition-transform duration-1000" />
                      Transmit Additional Credentials
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-20 space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] ml-3">Legal Identity</label>
                      <input 
                        type="text" required placeholder="Full Entity Name" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-[2.2rem] px-10 py-6 text-[#0a0f1a] font-black focus:bg-white focus:border-[#0a0f1a] outline-none transition-all shadow-inner text-[15px] tracking-tight" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] ml-3">Instrument Node</label>
                      <div className="relative">
                        <select required className="w-full bg-slate-50 border border-slate-100 rounded-[2.2rem] px-10 py-6 text-[#0a0f1a] font-black focus:bg-white focus:border-[#0a0f1a] outline-none transition-all cursor-pointer appearance-none shadow-inner text-[15px] tracking-tight">
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
                    <label className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] ml-3">Secure Gateway Node</label>
                    <div className="relative">
                      <input ref={fileInputRef} type="file" id="f-up" className="hidden" onChange={handleFileChange} required />
                      <label 
                        htmlFor="f-up" 
                        className={`flex flex-col items-center justify-center w-full min-h-[28rem] border-4 border-dashed rounded-[4rem] cursor-pointer transition-all duration-1000 relative overflow-hidden group ${
                          fileError || status === 'threat-detected' ? 'bg-rose-50 border-rose-200 shadow-2xl' :
                          status === 'verified' ? 'bg-emerald-50 border-emerald-200 shadow-2xl' : 
                          'bg-slate-50 border-slate-100 hover:border-[#0a0f1a]/20 hover:bg-white hover:shadow-[0_64px_128px_-32px_rgba(0,0,0,0.08)]'
                        }`}
                      >
                        {status === 'idle' ? (
                          <div className="text-center px-16 space-y-10">
                            <div className="w-32 h-32 rounded-[2.8rem] bg-white flex items-center justify-center mx-auto shadow-sm border border-slate-50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000 group-hover:bg-[#0a0f1a] group-hover:text-emerald-400 group-hover:shadow-2xl">
                              <Shield className="w-14 h-14 text-slate-200 group-hover:text-emerald-400 transition-colors duration-700" />
                            </div>
                            <div className="space-y-4">
                              <h3 className="serif text-4xl font-black text-[#0a0f1a] mb-2 tracking-tighter italic">Initiate Transmission</h3>
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
                             <button onClick={() => setStatus('idle')} className="px-14 py-6 bg-rose-600 text-white rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.6em] shadow-2xl hover:bg-rose-700 transition-all duration-700">Retry Security Node</button>
                          </div>
                        ) : (
                          <div className="w-full px-20 space-y-16 py-12">
                            <div className="flex justify-between items-end">
                              <div className="space-y-6">
                                <h4 className="serif text-5xl text-[#0a0f1a] font-black tracking-tighter italic">
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
                              <span className="serif text-6xl font-black text-[#0a0f1a] italic">{progress}%</span>
                            </div>
                            <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden shadow-inner p-1.5">
                              <motion.div 
                                className={`h-full rounded-full shadow-2xl ${status === 'verified' ? 'bg-emerald-600' : 'bg-[#0a0f1a]'}`}
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
                      <div className="relative flex items-center pt-1">
                        <input 
                          type="checkbox" checked={purposeAgreed} onChange={e => setPurposeAgreed(e.target.checked)}
                          className="w-8 h-8 rounded-xl text-[#0a0f1a] border-slate-200 focus:ring-[#0a0f1a] shadow-inner cursor-pointer" 
                        />
                      </div>
                      <div className="ml-8 text-lg leading-[1.8] text-slate-500 font-medium italic">
                        <span className="text-[#0a0f1a] font-black block mb-2 uppercase tracking-[0.4em] text-[12px]">Submission Purpose</span>
                        I authorize data ingestion solely for <span className="text-[#0a0f1a] font-bold underline decoration-emerald-200 decoration-8 underline-offset-1">KYC/AML vetting</span> per global financial tranches.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="relative flex items-center pt-1">
                        <input 
                          type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                          className="w-8 h-8 rounded-xl text-[#0a0f1a] border-slate-200 focus:ring-[#0a0f1a] shadow-inner cursor-pointer" 
                        />
                      </div>
                      <div className="ml-8 text-lg leading-[1.8] text-slate-500 font-medium italic">
                        <span className="text-[#0a0f1a] font-black block mb-2 uppercase tracking-[0.4em] text-[12px]">Privacy & Residency</span>
                        I agree to the <Link to="/privacy" className="text-indigo-600 font-bold hover:text-[#0a0f1a] transition-colors">Federgreen Privacy Node</Link> protocols for encrypted data residency.
                      </div>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: status === 'verified' && agreed && purposeAgreed ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status !== 'verified' || !fileName || !agreed || !purposeAgreed}
                    className="w-full bg-[#0a0f1a] text-white py-10 rounded-[2.5rem] font-black text-[13px] uppercase tracking-[0.6em] hover:bg-emerald-700 transition-all duration-700 shadow-[0_48px_96px_-24px_rgba(10,15,26,0.3)] disabled:opacity-20 disabled:grayscale group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
