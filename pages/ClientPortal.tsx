
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
      <rect width="100" height="100" rx="24" fill={color} />
      <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
    </svg>
);

const ClientPortal: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Acme Innovations', email: 'client@federgreen.com' });
    const [briefing, setBriefing] = useState<string | null>(null);
    const [loadingBriefing, setLoadingBriefing] = useState(true);
    
    // Project Data
    const projectData = {
      projectName: "Project Olympus: Series B Capital Raise",
      status: "Finalizing Investor Deck",
      nextMilestone: "Investor Outreach Begins - Nov 1st, 2024",
      criticalNotices: ["Awaiting Q3 financial statements for model update."]
    };

    // Document State
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

    // Messaging State
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
            }, 50);
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
        <div className="min-h-screen bg-[#0a0f1a] flex flex-col lg:flex-row text-indigo-50">
            {/* Nav Sidebar - Hidden on mobile, fixed on desktop */}
            <aside className="hidden lg:flex w-24 bg-[#0d1424] border-r border-white/5 flex-col items-center py-10 justify-between fixed h-full z-50">
                <div>
                    <LogoMark className="w-10 h-10 shadow-2xl shadow-indigo-500/20" color="#10b981" />
                    <nav className="mt-20 space-y-10">
                        <button className="block text-emerald-400 p-4 bg-white/5 rounded-2xl border border-white/10"><BarChart2 /></button>
                        <button className="block text-slate-500 hover:text-indigo-400 transition-colors p-4"><Briefcase /></button>
                        <button className="block text-slate-500 hover:text-indigo-400 transition-colors p-4"><FileText /></button>
                    </nav>
                </div>
                <div className="space-y-8">
                    <button className="text-slate-500 hover:text-indigo-400 p-4"><History size={20} /></button>
                    <button onClick={handleLogout} className="text-slate-500 hover:text-rose-500 p-4"><LogOut /></button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden flex justify-between items-center px-6 h-20 bg-[#0d1424] border-b border-white/5 sticky top-0 z-[60]">
                <LogoMark className="w-8 h-8" color="#10b981" />
                <div className="flex items-center space-x-4">
                    <button className="p-3 text-slate-400"><Bell size={20}/></button>
                    <button onClick={handleLogout} className="p-3 text-rose-500"><LogOut size={20}/></button>
                </div>
            </header>

            {/* Main Portal Body */}
            <main className="flex-1 lg:ml-24 overflow-y-auto p-6 sm:p-8 lg:p-12 hide-scrollbar">
                <header className="hidden lg:flex justify-between items-center mb-16">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Authenticated Node FC-CP-04</p>
                        </div>
                        <h1 className="serif text-5xl font-black text-white italic tracking-tighter">Sovereign Portal</h1>
                        <p className="text-slate-400 font-medium mt-1">Management Desk: <span className="text-indigo-300">{user.name}</span></p>
                    </motion.div>
                    
                    <div className="flex items-center space-x-6">
                        <div className="flex -space-x-3">
                            <div className="px-3 py-1 bg-[#1d273d] border-2 border-[#0a0f1a] rounded-full flex items-center justify-center font-bold text-[10px] text-emerald-400 shadow-xl">FG</div>
                            <div className="w-12 h-12 bg-indigo-600 border-2 border-[#0a0f1a] rounded-full flex items-center justify-center shadow-xl">
                                <User className="text-white" size={20} />
                            </div>
                        </div>
                        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:bg-white/10 transition-all"><Settings size={20}/></button>
                        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:bg-white/10 transition-all relative">
                            <Bell size={20}/>
                            <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full border border-[#0a0f1a]" />
                        </button>
                    </div>
                </header>

                <div className="lg:hidden mb-10">
                    <h1 className="serif text-4xl font-black text-white italic tracking-tighter">Sovereign Portal</h1>
                    <p className="text-slate-400 font-medium mt-1 text-sm">Desk: {user.name}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Left Column: Briefing & Dashboard */}
                    <div className="lg:col-span-8 space-y-8 lg:space-y-10">
                        {/* FEDERGREEN Project Briefing */}
                        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-gradient-to-br from-[#111e35] to-[#0d1424] text-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12 transition-transform duration-700 group-hover:rotate-45">
                                <LogoMark className="w-48 sm:w-64 h-48 sm:h-64" color="white" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center space-x-4 mb-6 sm:mb-8">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-400 shadow-xl">
                                        <Bot size={20} sm:size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-emerald-400 leading-tight">Sovereign FEDERGREEN Briefing</h2>
                                        <p className="text-[8px] sm:text-[10px] text-indigo-300 font-bold uppercase tracking-widest mt-0.5">Insight Engine Active</p>
                                    </div>
                                </div>
                                
                                {loadingBriefing ? (
                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                                        <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse" />
                                        <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse" />
                                    </div>
                                ) : (
                                    <p className="text-lg sm:text-xl leading-relaxed font-medium italic text-indigo-50/80 whitespace-pre-wrap tracking-tight">
                                        {briefing}
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Project Dashboard Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                { label: 'Active Project', val: projectData.projectName, icon: Zap, color: 'text-indigo-400' },
                                { label: 'Node Status', val: projectData.status, icon: ShieldCheck, color: 'text-emerald-400' },
                                { label: 'Next Event', val: projectData.nextMilestone, icon: AlertCircle, color: 'text-amber-400' }
                            ].map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-[#0d1424] p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-xl group hover:border-white/10 transition-all">
                                    <div className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-500 group-hover:scale-110 ${m.color}`}>
                                        <m.icon size={18} />
                                    </div>
                                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 mb-2">{m.label}</p>
                                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">{m.val}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Document Vault Section */}
                        <div className="bg-[#0d1424] p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/5 shadow-2xl relative">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                                <div>
                                    <h2 className="serif text-2xl sm:text-3xl font-black italic tracking-tight text-white">Secure Vault.</h2>
                                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 mt-1">Encrypted Node AES-256</p>
                                </div>
                                <div className="relative w-full sm:w-auto">
                                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center justify-center transition-all shadow-lg">
                                        <FilePlus size={14} className="mr-3" /> Transmit Document
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isUploading && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-10 bg-white/5 p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/20 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 h-1 bg-indigo-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-3">
                                                <Loader2 size={16} className="animate-spin text-indigo-400" />
                                                <span className="text-xs font-bold tracking-tight text-indigo-100">{uploadMessage}</span>
                                            </div>
                                            <span className="font-mono text-[10px] text-indigo-400">{uploadProgress}%</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 gap-4">
                                {documents.map((doc, idx) => (
                                    <motion.div key={doc.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * idx }} className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col transition-all">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="flex items-center space-x-4 sm:space-x-6">
                                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1d273d] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-indigo-300 border border-white/5 group-hover:border-indigo-500/30 transition-all">
                                                    <FileText size={18} sm:size={20} />
                                                    <span className="text-[7px] sm:text-[8px] font-black uppercase mt-1 opacity-50">{doc.type}</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm sm:text-base text-white tracking-tight leading-tight">{doc.name}</p>
                                                    <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Archived {doc.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                                <button onClick={() => handleSummarize(doc)} disabled={isSummarizing === doc.id} className="flex-1 sm:flex-none px-4 py-2 sm:px-5 sm:py-2.5 bg-white/5 hover:bg-indigo-600 rounded-lg sm:rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all">
                                                    {isSummarizing === doc.id ? <Loader2 size={12} className="animate-spin" /> : <><Bot size={12} className="inline mr-1.5" /> Briefing</>}
                                                </button>
                                                <button className="p-2.5 sm:p-3 text-slate-500 hover:text-white transition-colors"><Eye size={16} sm:size={18} /></button>
                                                <button className="p-2.5 sm:p-3 text-slate-500 hover:text-white transition-colors"><Upload size={16} sm:size={18} className="rotate-180" /></button>
                                            </div>
                                        </div>
                                        
                                        {/* FEDERGREEN Summary Artifact */}
                                        <AnimatePresence>
                                            {summaryResult?.id === doc.id && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-5 pt-5 border-t border-white/5">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <Bot size={14} className="text-emerald-400" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">FEDERGREEN Analysis</span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm font-medium italic text-indigo-100/70 leading-relaxed whitespace-pre-wrap">
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

                    {/* Right Column: Communication Node */}
                    <div className="lg:col-span-4 space-y-8 sm:space-y-10">
                        <div className="bg-[#0d1424] p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 shadow-2xl flex flex-col h-full min-h-[500px] sm:min-h-[600px]">
                            <div className="flex items-center space-x-4 mb-8 sm:mb-10">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-xl">
                                    <MessageSquare size={20} sm:size={22} />
                                </div>
                                <div>
                                    <h2 className="serif text-xl sm:text-2xl font-black italic text-white tracking-tight">Advisor Link.</h2>
                                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-emerald-400">Encrypted Terminal</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-5 overflow-y-auto pr-2 hide-scrollbar">
                                {messages.map(msg => (
                                    <div 
                                        key={msg.id} 
                                        onClick={() => { setActiveMessage(msg); setAiDraft(null); }}
                                        className={`p-5 sm:p-6 rounded-[1.5rem] sm:rounded-3xl border transition-all cursor-pointer group ${activeMessage?.id === msg.id ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <p className={`text-[9px] font-black uppercase tracking-widest ${activeMessage?.id === msg.id ? 'text-indigo-100' : 'text-indigo-400'}`}>{msg.from}</p>
                                            <span className="text-[9px] text-slate-500 font-bold">{msg.date}</span>
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-bold mb-2 tracking-tight">{msg.subject}</h4>
                                        <p className={`text-[11px] sm:text-xs font-medium italic line-clamp-2 ${activeMessage?.id === msg.id ? 'text-indigo-50' : 'text-slate-400'}`}>"{msg.body}"</p>
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence>
                                {activeMessage && (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <button onClick={() => setActiveMessage(null)} className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white">Clear Active</button>
                                            <button 
                                                onClick={() => handleDraftReply(activeMessage)} 
                                                disabled={isDrafting}
                                                className="px-4 py-2 bg-emerald-600 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest flex items-center shadow-lg"
                                            >
                                                {isDrafting ? <Loader2 size={10} className="animate-spin mr-2" /> : <Bot size={10} className="mr-2" />} Intel Draft
                                            </button>
                                        </div>

                                        {aiDraft && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-3">FEDERGREEN Intelligence Draft</p>
                                                <p className="text-[11px] sm:text-xs font-medium italic text-emerald-50/80 leading-relaxed">
                                                    {aiDraft}
                                                </p>
                                                <div className="mt-4 flex space-x-3">
                                                    <button className="flex-1 py-2 bg-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest">Apply</button>
                                                    <button onClick={() => setAiDraft(null)} className="px-3 py-2 bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest">Discard</button>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="relative">
                                            <textarea rows={3} placeholder="Compose response..." className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-[11px] sm:text-xs outline-none focus:border-indigo-500 transition-all resize-none shadow-inner" />
                                            <button className="absolute bottom-3 right-3 p-3 bg-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-all"><Send size={12}/></button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!activeMessage && (
                                <div className="mt-8 flex flex-col items-center justify-center p-8 sm:p-10 opacity-20 text-center">
                                    <MessageSquare size={40} sm:size={48} className="mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Terminal Idle</p>
                                    <p className="text-[9px] font-medium italic mt-2">Select message tranche.</p>
                                </div>
                            )}
                        </div>

                        {/* Security Badge Footer */}
                        <div className="bg-[#111e35] p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center text-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-4">
                                <Lock size={18} sm:size={20} />
                            </div>
                            <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-white">Sovereign Compliance</h4>
                            <p className="text-[8px] sm:text-[10px] text-slate-500 font-medium italic mt-2 leading-relaxed">
                                Logged & encrypted per global tranches. Private Node active.
                            </p>
                            <div className="mt-6 flex space-x-3 sm:space-x-4">
                                <div className="flex items-center space-x-2 text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-emerald-400/50">
                                    <CheckCircle size={10} /> <span>AES-256</span>
                                </div>
                                <div className="flex items-center space-x-2 text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-emerald-400/50">
                                    <CheckCircle size={10} /> <span>ISO 27001</span>
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
