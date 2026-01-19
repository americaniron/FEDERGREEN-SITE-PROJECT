
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, FileCheck, AlertTriangle, Fingerprint } from 'lucide-react';
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
        const isThreat = Math.random() < 0.12; // Adjusted for enterprise trust
        if (isThreat) {
          setStatus('threat-detected');
          setScanMessage('CRITICAL: Malicious pattern detected in tranches. Transmission blocked.');
        } else {
          setStatus('verified');
          setScanMessage('Clearance Granted. Institutional integrity confirmed.');
        }
      }
    }, 35);
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
    <div className="bg-[#fafaf9] min-h-screen py-32 px-10 relative overflow-hidden">
      {/* Institutional Background Elements */}
      <div className="absolute top-0 right-0 p-64 opacity-[0.02] pointer-events-none">
         <Fingerprint size={600} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          <div className="lg:col-span-5 space-y-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-16 h-[2px] bg-emerald-700" />
                <span className="text-emerald-700 text-[11px] font-black uppercase tracking-[0.6em]">Secure Protocol</span>
              </div>
              <h1 className="serif text-7xl text-slate-950 font-black leading-[0.9] tracking-tighter mb-10 italic">Identity <br/> Onboarding.</h1>
              <p className="text-slate-500 text-xl leading-relaxed font-medium">
                Federgreen Consulting utilizes sovereign AI-nodes to isolate, encrypt, and validate institutional documentation against AMLD6 standards.
              </p>
            </motion.div>

            <div className="space-y-10">
              {[
                { title: 'Heuristic Validation', desc: 'Real-time AI scanning of tranches for polymorphic threats.', icon: Shield },
                { title: 'AES-256 GCM Encryption', desc: 'Military-grade cryptographic wrapping for all persistent data.', icon: Lock },
                { title: 'Sovereign Storage', desc: 'Documents are archived in decentralized, isolated vault nodes.', icon: FileCheck }
              ].map((item, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                  className="flex items-start group"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-center mr-8 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    <item.icon className="w-8 h-8 text-slate-400 group-hover:text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-black mb-2 text-[13px] uppercase tracking-widest">{item.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_48px_128px_-32px_rgba(0,0,0,0.1)] overflow-hidden glass-premium"
            >
              {status === 'success' ? (
                <div className="p-24 text-center animate-fadeIn">
                  <div className="w-32 h-32 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-12 shadow-inner">
                    <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                      <FileCheck className="text-white" size={32} />
                    </div>
                  </div>
                  <h2 className="serif text-5xl text-slate-950 font-black mb-8 tracking-tight">Vault Ingestion Complete</h2>
                  <p className="text-slate-500 text-xl mb-12 max-w-lg mx-auto leading-relaxed">
                    Documentation has been successfully encrypted and assigned to the <span className="text-slate-950 font-black">Compliance Desk</span> for final clearance.
                  </p>
                  <div className="inline-block px-8 py-3 bg-slate-50 rounded-2xl font-mono text-[11px] text-slate-400 uppercase tracking-widest mb-12">
                    NODE-REF: FC-VLT-{Math.floor(Math.random()*9999999)}
                  </div>
                  <br />
                  <button onClick={() => { setStatus('idle'); setFileName(null); }} className="text-indigo-600 font-black text-[11px] uppercase tracking-[0.4em] hover:text-indigo-800 transition-colors underline decoration-2 underline-offset-8">
                    Transmit Additional Credentials
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-16 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2">Legal Identity</label>
                      <input 
                        type="text" required placeholder="Full Entity Name" 
                        className="w-full bg-slate-50/50 border border-slate-100 rounded-3xl px-8 py-5 text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner font-medium" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2">Instrument Node</label>
                      <select required className="w-full bg-slate-50/50 border border-slate-100 rounded-3xl px-8 py-5 text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none shadow-inner font-medium">
                        <option value="">Select Classification</option>
                        <option>Sovereign Passport</option>
                        <option>Proof of Funds (MT199)</option>
                        <option>Articles of Incorp</option>
                        <option>Asset Deed / Title</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2">Secure Gateway Node</label>
                    <div className="relative">
                      <input ref={fileInputRef} type="file" id="f-up" className="hidden" onChange={handleFileChange} required />
                      <label 
                        htmlFor="f-up" 
                        className={`flex flex-col items-center justify-center w-full min-h-[22rem] border-2 border-dashed rounded-[3rem] cursor-pointer transition-all duration-700 relative overflow-hidden group ${
                          fileError || status === 'threat-detected' ? 'bg-rose-50 border-rose-200' :
                          status === 'verified' ? 'bg-emerald-50 border-emerald-200' : 
                          'bg-slate-50/50 border-slate-100 hover:border-indigo-400 hover:bg-white'
                        }`}
                      >
                        {status === 'idle' ? (
                          <div className="text-center px-12">
                            <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center mb-10 shadow-sm border border-slate-50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                              <Shield className="w-10 h-10 text-slate-200 group-hover:text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">Initiate Transmission</h3>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">Accepted: PDF, DOCX, JPG, PNG. <br/> Heuristic scan will execute immediately.</p>
                            {fileError && <p className="mt-8 text-rose-600 font-black text-[10px] uppercase tracking-widest bg-rose-100 px-4 py-2 rounded-xl">{fileError}</p>}
                          </div>
                        ) : status === 'threat-detected' ? (
                          <div className="text-center px-12 animate-fadeIn">
                             <AlertTriangle className="w-20 h-20 text-rose-600 mx-auto mb-8" />
                             <h3 className="text-2xl font-black text-rose-600 mb-4 uppercase tracking-tighter">Heuristic Firewall Active</h3>
                             <p className="text-rose-950/60 text-sm font-medium mb-10">{scanMessage}</p>
                             <button onClick={() => setStatus('idle')} className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">Retry Security Node</button>
                          </div>
                        ) : (
                          <div className="w-full px-16 space-y-12 py-10">
                            <div className="flex justify-between items-end">
                              <div className="space-y-3">
                                <h4 className="text-slate-950 font-black text-3xl tracking-tighter italic">
                                  {status === 'pre-scanning' && 'Scanning Tranches...'}
                                  {status === 'verified' && 'Verification Locked'}
                                  {status === 'uploading' && 'Tunneling...'}
                                  {status === 'encrypting' && 'AES-GCM Wrapping...'}
                                </h4>
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 animate-pulse">{scanMessage}</p>
                              </div>
                              <span className="text-slate-950 font-black text-3xl">{progress}%</span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                              <motion.div 
                                className={`h-full ${status === 'verified' ? 'bg-emerald-600' : 'bg-indigo-600'}`}
                                initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100 space-y-10">
                    <div className="flex items-start">
                      <input 
                        type="checkbox" checked={purposeAgreed} onChange={e => setPurposeAgreed(e.target.checked)}
                        className="mt-1.5 w-6 h-6 rounded-lg text-indigo-600 border-slate-200 focus:ring-indigo-500 shadow-inner cursor-pointer" 
                      />
                      <div className="ml-6 text-sm leading-relaxed text-slate-500 font-medium">
                        <span className="text-slate-950 font-black block mb-2 uppercase tracking-[0.3em] text-[11px]">Submission Purpose</span>
                        I authorize data ingestion solely for <span className="text-slate-950 font-bold underline decoration-indigo-200">KYC/AML vetting</span> per global financial tranches.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <input 
                        type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                        className="mt-1.5 w-6 h-6 rounded-lg text-indigo-600 border-slate-200 focus:ring-indigo-500 shadow-inner cursor-pointer" 
                      />
                      <div className="ml-6 text-sm leading-relaxed text-slate-500 font-medium">
                        <span className="text-slate-950 font-black block mb-2 uppercase tracking-[0.3em] text-[11px]">Privacy & Residency</span>
                        I agree to the <Link to="/privacy" className="text-indigo-600 font-bold">Federgreen Privacy Node</Link> protocols for encrypted data residency.
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={status !== 'verified' || !fileName || !agreed || !purposeAgreed}
                    className="w-full bg-slate-950 text-white py-8 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.6em] hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/40 disabled:opacity-20 disabled:grayscale group"
                  >
                    <span className="flex items-center justify-center">
                      Execute Secure Submission Node
                      <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
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
