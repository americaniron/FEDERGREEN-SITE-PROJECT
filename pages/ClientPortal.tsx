
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Bell, Settings, User, BarChart2, Briefcase, 
  FileText, Bot, Loader2, Upload, ShieldCheck, 
  Search, Eye, MessageSquare, Send, CheckCircle, 
  Lock, AlertCircle, FilePlus, Zap, History, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateClientBriefing, summarizePortalDocument, draftAdvisorResponse } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <rect width="100" height="100" rx="28" fill={color} />
      <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
    </svg>
);

const ClientPortal: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Acme Innovations', email: 'client@federgreen.com' });
    const [briefing, setBriefing] = useState<string | null>(null);
    const [loadingBriefing, setLoadingBriefing] = useState(true);
    
    const projectData = {
      projectName: "Project Olympus: Series B Capital Raise",
      status: "Finalizing Investor Deck",
      nextMilestone: "Investor Outreach Begins - Nov 1st, 2024",
      criticalNotices: ["Awaiting Q3 financial statements for model update."]
    };

    const [documents, setDocuments] = useState([
        { id: 1, name: "Strategic Plan v2.pdf", date: "Oct 20, 2024", type: "PDF" },
        { id: 2, name: "Financial Model Q3.xlsx", date: "Oct 18, 2024", type: "XLSX" },
        { id: 3, name: "Investor Deck Draft v4.pptx", date: "Oct 15, 2024", type: "PPTX" }
    ]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState("");
    const [summaryResult, setSummaryResult] = useState<{ id: number; text: string } | null>(null);
    const [isSummarizing, setIsSummarizing] = useState<number | null>(null);

    const [messages, setMessages] = useState([
        { id: 1, from: "D. Federgreen", subject: "Deck Finalization", body: "Team, the narrative looks strong. Let's sync on the financial visuals tomorrow AM.", date: "2h ago" },
        { id: 2, from: "Compliance Desk", subject: "KYC Document Request", body: "Please upload the certified articles of incorporation to the vault for secondary node validation.", date: "5h ago" }
    ]);
    const [activeMessage, setActiveMessage] = useState<any>(null);
    const [aiDraft, setAiDraft] = useState<string | null>(null);
    const [isDrafting, setIsDrafting] = useState(false);

    useEffect(() => {
        const fetchBriefing = async () => {
            setLoadingBriefing(true);
            try {
                const res = await generateClientBriefing(projectData);
                setBriefing(res);
            } catch (e) {
                setBriefing("FEDERGREEN Briefing Node offline. Manual audit of critical notices recommended.");
            } finally {
                setLoadingBriefing(false);
            }
        };
        fetchBriefing();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setIsUploading(true);
            setUploadProgress(0);
            setUploadMessage("Heuristic analysis initiated...");

            let progress = 0;
            const interval = setInterval(() => {
                progress += 2;
                setUploadProgress(progress);
                if (progress === 30) setUploadMessage("Scanning tranches...");
                if (progress === 60) setUploadMessage("AES-256 wrapping...");
                if (progress === 90) setUploadMessage("Vault finalized.");
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setDocuments(prev => [{ id: Date.now(), name: file.name, date: "Just now", type: file.name.split('.').pop()?.toUpperCase() || "DOC" }, ...prev]);
                    setTimeout(() => {
                        setIsUploading(false);
                        setUploadProgress(0);
                    }, 1000);
                }
            }, 60);
        }
    };

    const handleSummarize = async (doc: any) => {
        setIsSummarizing(doc.id);
        setSummaryResult(null);
        try {
            const res = await summarizePortalDocument(doc.name, projectData.projectName);
            setSummaryResult({ id: doc.id, text: res });
        } catch (e) {
            setSummaryResult({ id: doc.id, text: "Node Error: Summary sequence failed." });
        } finally {
            setIsSummarizing(null);
        }
    };

    const handleDraftReply = async (msg: any) => {
        setIsDrafting(true);
        setAiDraft(null);
        try {
            const res = await draftAdvisorResponse(msg.body, projectData.status);
            setAiDraft(res);
        } catch (e) {
            setAiDraft("Draft node offline.");
        } finally {
            setIsDrafting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1a] flex flex-col lg:flex-row text-indigo-50 font-sans">
            {/* Nav Sidebar */}
            <aside className="hidden lg:flex w-24 bg-[#0d1424] border-r border-white/5 flex-col items-center py-12 justify-between fixed h-full z-50 shadow-[32px_0_64px_-32px_rgba(0,0,0,0.5)]">
                <div>
                    <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                      <LogoMark className="w-12 h-12 shadow-2xl shadow-indigo-500/20" color="#10b981" />
                    </motion.div>
                    <nav className="mt-24 space-y-12">
                        <button className="block text-emerald-400 p-4 bg-white/5 rounded-[1.2rem] border border-white/10 shadow-2xl"><BarChart2 /></button>
                        <button className="block text-slate-500 hover:text-indigo-400 transition-all p-4"><Briefcase /></button>
                        <button className="block text-slate-500 hover:text-indigo-400 transition-all p-4"><FileText /></button>
                    </nav>
                </div>
                <div className="space-y-10">
                    <button className="text-slate-600 hover:text-indigo-400 transition-all p-4"><History size={20} /></button>
                    <button onClick={handleLogout} className="text-slate-600 hover:text-rose-500 transition-all p-4"><LogOut /></button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden flex justify-between items-center px-10 h-24 bg-[#0d1424] border-b border-white/5 sticky top-0 z-[60] backdrop-blur-xl">
                <LogoMark className="w-10 h-10" color="#10b981" />
                <div className="flex items-center space-x-6">
                    <button className="p-4 text-slate-400"><Bell size={24}/></button>
                    <button onClick={handleLogout} className="p-4 text-rose-500"><LogOut size={24}/></button>
                </div>
            </header>

            {/* Main Portal Body */}
            <main className="flex-1 lg:ml-24 overflow-y-auto p-12 lg:p-20 hide-scrollbar">
                <header className="hidden lg:flex justify-between items-end mb-24">
                    <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_16px_rgba(16,185,129,0.6)]" />
                            <p className="text-[12px] font-black uppercase tracking-[0.5em] text-emerald-500">Node FC-CP-04 SECURE</p>
                        </div>
                        <h1 className="serif text-7xl font-black text-white italic tracking-tighter leading-none">Sovereign Portal</h1>
                        <p className="text-slate-400 font-medium mt-4 text-xl italic opacity-80">Managing tranches for: <span className="text-indigo-300 font-bold">{user.name}</span></p>
                    </motion.div>
                    
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-4 px-8 py-5 bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                            <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#0a0f1a]">
                                <User className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Authorized Agent</p>
                                <p className="text-[15px] font-bold text-white tracking-tight">D. Federgreen</p>
                            </div>
                        </div>
                        <button className="p-6 bg-white/5 border border-white/10 rounded-[1.8rem] text-slate-400 hover:bg-white/10 hover:text-white transition-all shadow-xl"><Settings size={24}/></button>
                        <button className="p-6 bg-white/5 border border-white/10 rounded-[1.8rem] text-slate-400 hover:bg-white/10 hover:text-white transition-all relative shadow-xl">
                            <Bell size={24}/>
                            <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0a0f1a]" />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Briefing Card */}
                        <motion.div initial={{opacity:0, y:32}} animate={{opacity:1, y:0}} transition={{duration:1}} className="bg-gradient-to-br from-[#111e35] to-[#0d1424] text-white p-12 sm:p-16 rounded-[3.5rem] sm:rounded-[4.5rem] border border-white/10 shadow-[0_96px_192px_-48px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none rotate-12 transition-transform duration-[3s] group-hover:rotate-45 group-hover:scale-110">
                                <LogoMark className="w-96 h-96" color="white" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center space-x-6 mb-12">
                                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-[1.8rem] flex items-center justify-center text-emerald-400 shadow-2xl backdrop-blur-md">
                                        <Bot size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-[13px] font-black uppercase tracking-[0.4em] text-emerald-400 leading-tight">Institutional Briefing</h2>
                                        <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.5em] mt-2">Heuristic Node Analysis Active</p>
                                    </div>
                                </div>
                                
                                {loadingBriefing ? (
                                    <div className="space-y-6">
                                        <div className="h-6 bg-white/5 rounded-2xl w-full animate-pulse" />
                                        <div className="h-6 bg-white/5 rounded-2xl w-5/6 animate-pulse" />
                                        <div className="h-6 bg-white/5 rounded-2xl w-3/4 animate-pulse" />
                                    </div>
                                ) : (
                                    <p className="text-2xl sm:text-3xl leading-relaxed font-light italic text-indigo-50/90 whitespace-pre-wrap tracking-tight">
                                        {briefing}
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                            {[
                                { label: 'Primary Node', val: projectData.projectName, icon: Zap, color: 'text-indigo-400' },
                                { label: 'Status Node', val: projectData.status, icon: ShieldCheck, color: 'text-emerald-400' },
                                { label: 'Next Tranche', val: projectData.nextMilestone, icon: AlertCircle, color: 'text-amber-400' }
                            ].map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i, duration: 0.8 }} className="bg-[#0d1424] p-10 rounded-[3rem] border border-white/5 shadow-2xl group hover:border-white/10 transition-all duration-700 active:scale-95">
                                    <div className={`w-14 h-14 bg-white/5 rounded-[1.5rem] flex items-center justify-center mb-8 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6 ${m.color} shadow-inner`}>
                                        <m.icon size={28} />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4">{m.label}</p>
                                    <p className="text-[15px] font-black text-white leading-[1.3] tracking-tight group-hover:text-indigo-300 transition-colors">{m.val}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Vault Section */}
                        <div className="bg-[#0d1424] p-12 sm:p-20 rounded-[4rem] sm:rounded-[5rem] border border-white/5 shadow-[0_96px_192px_-48px_rgba(0,0,0,0.5)] relative overflow-hidden">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-12">
                                <div>
                                    <h2 className="serif text-4xl sm:text-5xl font-black italic tracking-tighter text-white">Secure Artifacts.</h2>
                                    <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-500 mt-3">Vault Node AES-256-GCM</p>
                                </div>
                                <div className="relative w-full sm:w-auto">
                                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <motion.button 
                                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                      className="w-full sm:w-auto px-12 py-6 bg-indigo-600 hover:bg-indigo-500 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.4em] flex items-center justify-center transition-all shadow-[0_32px_64px_-16px_rgba(79,70,229,0.4)]"
                                    >
                                        <FilePlus size={18} className="mr-4" /> Transmit Node
                                    </motion.button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isUploading && (
                                    <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="mb-16 bg-white/5 p-10 rounded-[2.5rem] border border-indigo-500/20 relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 left-0 h-1.5 bg-indigo-500 transition-all duration-700 ease-out" style={{ width: `${uploadProgress}%` }} />
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-6">
                                                <Loader2 size={24} className="animate-spin text-indigo-400" />
                                                <span className="text-lg font-bold tracking-tight text-indigo-100 italic">{uploadMessage}</span>
                                            </div>
                                            <span className="serif text-4xl font-black text-indigo-400 italic">{uploadProgress}%</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-6">
                                {documents.map((doc, idx) => (
                                    <motion.div key={doc.id} initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx, duration: 0.8 }} className="group bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 p-8 rounded-[2.5rem] flex flex-col transition-all duration-700 shadow-xl hover:translate-x-2">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                                            <div className="flex items-center space-x-8">
                                                <div className="w-16 h-16 bg-[#1d273d] rounded-[1.5rem] flex flex-col items-center justify-center text-indigo-300 border border-white/5 group-hover:border-indigo-500/40 transition-all duration-700 shadow-inner">
                                                    <FileText size={24} />
                                                    <span className="text-[9px] font-black uppercase mt-1.5 opacity-40">{doc.type}</span>
                                                </div>
                                                <div>
                                                    <p className="font-black text-xl sm:text-2xl text-white tracking-tighter italic leading-none">{doc.name}</p>
                                                    <p className="text-[11px] text-slate-500 uppercase font-black tracking-[0.4em] mt-3">Vault Archive • {doc.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
                                                <motion.button 
                                                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                  onClick={() => handleSummarize(doc)} disabled={isSummarizing === doc.id} 
                                                  className="flex-1 sm:flex-none px-8 py-4 bg-white/5 hover:bg-[#0a0f1a] border border-white/5 hover:border-emerald-500/30 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl"
                                                >
                                                    {isSummarizing === doc.id ? <Loader2 size={16} className="animate-spin" /> : <><Bot size={16} className="inline mr-3 text-emerald-400" /> Executive Digest</>}
                                                </motion.button>
                                                <button className="p-4 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-2xl"><Eye size={20}/></button>
                                            </div>
                                        </div>
                                        
                                        <AnimatePresence>
                                            {summaryResult?.id === doc.id && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-10 pt-10 border-t border-white/5">
                                                    <div className="flex items-center space-x-4 mb-6">
                                                        <Bot size={20} className="text-emerald-400" />
                                                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-400">FEDERGREEN Node Insights</span>
                                                    </div>
                                                    <p className="text-lg sm:text-xl font-medium italic text-indigo-100/70 leading-relaxed whitespace-pre-wrap tracking-tight">
                                                        {summaryResult.text}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-4 space-y-16">
                        <div className="bg-[#0d1424] p-12 rounded-[4rem] border border-white/5 shadow-[0_96px_192px_-48px_rgba(0,0,0,0.5)] flex flex-col min-h-[700px] sticky top-32">
                            <div className="flex items-center space-x-6 mb-12">
                                <div className="w-16 h-16 bg-indigo-500/10 rounded-[1.8rem] flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-2xl backdrop-blur-md">
                                    <MessageSquare size={28} />
                                </div>
                                <div>
                                    <h2 className="serif text-3xl font-black italic text-white tracking-tighter">Advisor Link.</h2>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400">End-to-End Encryption</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-8 overflow-y-auto pr-4 hide-scrollbar">
                                {messages.map(msg => (
                                    <motion.div 
                                        key={msg.id} 
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => { setActiveMessage(msg); setAiDraft(null); }}
                                        className={`p-8 rounded-[2.5rem] border transition-all duration-700 cursor-pointer group shadow-2xl ${activeMessage?.id === msg.id ? 'bg-indigo-600 border-indigo-400 shadow-indigo-900/40' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${activeMessage?.id === msg.id ? 'text-indigo-100' : 'text-indigo-400'}`}>{msg.from}</p>
                                            <span className="text-[10px] text-slate-500 font-black tracking-widest">{msg.date}</span>
                                        </div>
                                        <h4 className="text-lg font-black mb-3 tracking-tight italic leading-tight group-hover:translate-x-2 transition-transform duration-700">{msg.subject}</h4>
                                        <p className={`text-sm font-medium italic line-clamp-2 leading-relaxed ${activeMessage?.id === msg.id ? 'text-indigo-50' : 'text-slate-400'}`}>"{msg.body}"</p>
                                    </motion.div>
                                ))}
                            </div>

                            <AnimatePresence>
                                {activeMessage && (
                                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 pt-12 border-t border-white/5 space-y-8">
                                        <div className="flex justify-between items-center px-2">
                                            <button onClick={() => setActiveMessage(null)} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors">Clear Tranche</button>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                onClick={() => handleDraftReply(activeMessage)} 
                                                disabled={isDrafting}
                                                className="px-6 py-3 bg-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] flex items-center shadow-2xl"
                                            >
                                                {isDrafting ? <Loader2 size={16} className="animate-spin mr-3" /> : <Bot size={16} className="mr-3" />} Smart Draft
                                            </motion.button>
                                        </div>

                                        {aiDraft && (
                                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] shadow-2xl backdrop-blur-xl">
                                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 mb-6 flex items-center"><Bot size={14} className="mr-3" /> Node Suggestion</p>
                                                <p className="text-[15px] font-medium italic text-emerald-50/90 leading-relaxed tracking-tight">
                                                    {aiDraft}
                                                </p>
                                                <div className="mt-8 flex space-x-4">
                                                    <button className="flex-1 py-4 bg-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all">Apply Node</button>
                                                    <button onClick={() => setAiDraft(null)} className="px-6 py-4 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all">Discard</button>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="relative group">
                                            <textarea rows={4} placeholder="Compose response tranche..." className="w-full bg-white/5 border border-white/5 rounded-[2rem] p-8 text-sm outline-none focus:border-indigo-500 transition-all duration-700 resize-none shadow-inner placeholder:text-slate-600" />
                                            <button className="absolute bottom-5 right-5 p-5 bg-indigo-600 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all"><Send size={18}/></button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!activeMessage && (
                                <div className="mt-16 flex flex-col items-center justify-center p-16 opacity-10 text-center space-y-8">
                                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                                      <MessageSquare size={64} className="text-white" />
                                    </motion.div>
                                    <div>
                                      <p className="text-[12px] font-black uppercase tracking-[0.6em]">Node Idle</p>
                                      <p className="text-[11px] font-medium italic mt-3 opacity-60">Select institutional tranche.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Security Badge */}
                        <div className="bg-gradient-to-br from-[#111e35] to-[#0a0f1a] p-12 rounded-[4rem] border border-white/5 shadow-2xl flex flex-col items-center text-center group overflow-hidden relative">
                            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-8 shadow-inner group-hover:scale-110 transition-transform duration-1000">
                                <Lock size={24} />
                            </div>
                            <h4 className="text-[13px] font-black uppercase tracking-[0.5em] text-white">Institutional Compliance</h4>
                            <p className="text-[11px] text-slate-500 font-medium italic mt-4 leading-relaxed opacity-80">
                                Logged & encrypted per sovereign tranches. Private Secure Node Active.
                            </p>
                            <div className="mt-10 flex space-x-6">
                                <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-emerald-400/40 group-hover:text-emerald-400/80 transition-colors duration-1000">
                                    <CheckCircle size={14} /> <span>AES-256</span>
                                </div>
                                <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-emerald-400/40 group-hover:text-emerald-400/80 transition-colors duration-1000">
                                    <CheckCircle size={14} /> <span>ISO 27001</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClientPortal;
