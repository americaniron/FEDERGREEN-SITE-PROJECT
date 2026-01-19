
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Bell, Settings, User, BarChart2, Briefcase, 
  FileText, Bot, Loader2, Upload, ShieldCheck, 
  Eye, MessageSquare, Send, CheckCircle, 
  Lock, AlertCircle, FilePlus, Zap, History, Menu,
  Clock, DollarSign, ArrowUpRight, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateClientBriefing, summarizePortalDocument, draftAdvisorResponse } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#1e3a5f" }) => (
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

    const timeline = [
        { label: 'Ingestion', date: 'Sept 01', status: 'completed' },
        { label: 'Modeling', date: 'Sept 15', status: 'completed' },
        { label: 'Deck Draft', date: 'Oct 10', status: 'completed' },
        { label: 'Outreach', date: 'Nov 01', status: 'upcoming' },
        { label: 'Closing', date: 'Dec 15', status: 'upcoming' }
    ];

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
        <div className="min-h-screen bg-brand-primary flex flex-col lg:flex-row text-indigo-50 font-sans">
            {/* Nav Sidebar */}
            <aside className="hidden lg:flex w-24 bg-brand-primary-dark border-r border-white/5 flex-col items-center py-12 justify-between fixed h-full z-50 shadow-[32px_0_64px_-32px_rgba(0,0,0,0.5)]">
                <div>
                    <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.8 }}>
                      <LogoMark className="w-12 h-12 shadow-2xl shadow-indigo-500/20" color="#c5a059" />
                    </motion.div>
                    <nav className="mt-24 space-y-12">
                        <button className="block text-brand-accent p-4 bg-white/5 rounded-[1.2rem] border border-white/10 shadow-2xl"><BarChart2 /></button>
                        <button className="block text-slate-500 hover:text-brand-accent transition-all p-4"><Briefcase /></button>
                        <button className="block text-slate-500 hover:text-brand-accent transition-all p-4"><FileText /></button>
                    </nav>
                </div>
                <div className="space-y-10">
                    <button className="text-slate-600 hover:text-brand-accent transition-all p-4"><History size={20} /></button>
                    <button onClick={handleLogout} className="text-slate-600 hover:text-rose-500 transition-all p-4"><LogOut /></button>
                </div>
            </aside>

            {/* Main Portal Body */}
            <main className="flex-1 lg:ml-24 overflow-y-auto p-12 lg:p-20 hide-scrollbar bg-brand-primary-dark/40">
                <header className="hidden lg:flex justify-between items-end mb-24">
                    <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse shadow-[0_0_16px_rgba(197,160,89,0.6)]" />
                            <p className="text-[12px] font-black uppercase tracking-[0.5em] text-brand-accent">Node FC-CP-04 SECURE</p>
                        </div>
                        <h1 className="serif text-7xl font-black text-white italic tracking-tighter leading-none">Sovereign Portal</h1>
                        <p className="text-white/60 font-medium mt-4 text-xl italic opacity-80">Managing tranches for: <span className="text-brand-accent font-bold">{user.name}</span></p>
                    </motion.div>
                    
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-4 px-8 py-5 bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                            <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-brand-primary">
                                <User className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Authorized Agent</p>
                                <p className="text-[15px] font-bold text-white tracking-tight">D. Federgreen</p>
                            </div>
                        </div>
                        <button className="p-6 bg-white/5 border border-white/10 rounded-[1.8rem] text-slate-400 hover:bg-white/10 hover:text-white transition-all shadow-xl"><Settings size={24}/></button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Timeline */}
                        <div className="bg-brand-primary-dark p-12 rounded-[4rem] border border-white/5 shadow-2xl overflow-x-auto hide-scrollbar">
                           <h3 className="text-ui-caps text-brand-accent tracking-[0.6em] mb-12">Project Velocity</h3>
                           <div className="flex items-center justify-between min-w-[800px] px-8">
                              {timeline.map((step, i) => (
                                 <div key={i} className="flex flex-col items-center relative flex-1">
                                    {i < timeline.length - 1 && (
                                       <div className={`absolute top-5 left-1/2 w-full h-[2px] ${step.status === 'completed' ? 'bg-brand-accent' : 'bg-white/10'}`} />
                                    )}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 border-2 transition-all duration-700 ${step.status === 'completed' ? 'bg-brand-accent border-brand-accent shadow-[0_0_20px_rgba(197,160,89,0.4)]' : 'bg-brand-primary border-white/20'}`}>
                                       {step.status === 'completed' ? <CheckCircle size={16} className="text-brand-primary" /> : <div className="w-2 h-2 bg-white/20 rounded-full" />}
                                    </div>
                                    <p className="mt-6 text-[11px] font-black uppercase tracking-widest text-white/80">{step.label}</p>
                                    <p className="mt-2 text-[10px] font-mono text-indigo-300/40 uppercase">{step.date}</p>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Briefing Card */}
                        <motion.div initial={{opacity:0, y:32}} animate={{opacity:1, y:0}} className="bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white p-16 rounded-[4.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none rotate-12 transition-transform duration-[3s] group-hover:rotate-45 group-hover:scale-110">
                                <LogoMark className="w-96 h-96" color="white" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center space-x-6 mb-12">
                                    <div className="w-16 h-16 bg-brand-accent/10 border border-brand-accent/20 rounded-[1.8rem] flex items-center justify-center text-brand-accent shadow-2xl backdrop-blur-md">
                                        <Bot size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-[13px] font-black uppercase tracking-[0.4em] text-brand-accent leading-tight">Institutional Briefing</h2>
                                        <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.5em] mt-2">Heuristic Node Analysis Active</p>
                                    </div>
                                </div>
                                {loadingBriefing ? (
                                    <div className="space-y-6">
                                        <div className="h-6 bg-white/5 rounded-2xl w-full animate-pulse" />
                                        <div className="h-6 bg-white/5 rounded-2xl w-5/6 animate-pulse" />
                                    </div>
                                ) : (
                                    <p className="text-2xl sm:text-3xl leading-relaxed font-light italic text-indigo-50/90 whitespace-pre-wrap tracking-tight">
                                        {briefing}
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Vault */}
                        <div className="bg-brand-primary-dark p-12 lg:p-20 rounded-[4rem] lg:rounded-[5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-12">
                                <div>
                                    <h2 className="serif text-4xl sm:text-5xl font-black italic tracking-tighter text-white">Secure Artifacts.</h2>
                                    <p className="text-ui-caps text-slate-500 mt-3">Vault Node AES-256-GCM</p>
                                </div>
                                <div className="relative w-full sm:w-auto">
                                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <motion.button 
                                      whileHover={{ scale: 1.05 }}
                                      className="w-full sm:w-auto px-12 py-6 bg-indigo-600 hover:bg-indigo-500 rounded-[2rem] text-ui-caps flex items-center justify-center transition-all shadow-xl"
                                    >
                                        <FilePlus size={18} className="mr-4" /> Transmit Node
                                    </motion.button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {documents.map((doc, idx) => (
                                    <motion.div key={doc.id} initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }} className="group bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 p-8 rounded-[2.5rem] flex flex-col transition-all duration-700 shadow-xl hover:translate-x-2">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                                            <div className="flex items-center space-x-8">
                                                <div className="w-16 h-16 bg-[#1d273d] rounded-[1.5rem] flex flex-col items-center justify-center text-brand-accent border border-white/5 shadow-inner">
                                                    <FileText size={24} />
                                                    <span className="text-[9px] font-black uppercase mt-1.5 opacity-40">{doc.type}</span>
                                                </div>
                                                <div>
                                                    <p className="font-black text-xl sm:text-2xl text-white tracking-tighter italic leading-none">{doc.name}</p>
                                                    <p className="text-[11px] text-slate-500 uppercase font-black tracking-[0.4em] mt-3">Vault Archive • {doc.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
                                                <button onClick={() => handleSummarize(doc)} disabled={isSummarizing === doc.id} className="px-8 py-4 bg-white/5 hover:bg-brand-primary border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all">
                                                    {isSummarizing === doc.id ? <Loader2 size={16} className="animate-spin" /> : 'Executive Digest'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-4 space-y-16">
                        <div className="bg-brand-primary-dark p-12 rounded-[4rem] border border-white/5 shadow-2xl flex flex-col min-h-[500px] sticky top-32">
                            <div className="flex items-center space-x-6 mb-12">
                                <div className="w-16 h-16 bg-brand-accent/10 rounded-[1.8rem] flex items-center justify-center text-brand-accent border border-brand-accent/20 shadow-2xl backdrop-blur-md">
                                    <MessageSquare size={28} />
                                </div>
                                <div>
                                    <h2 className="serif text-3xl font-black italic text-white tracking-tighter">Advisor Link.</h2>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-emerald">Encrypted Node</p>
                                </div>
                            </div>
                            <div className="flex-1 space-y-8 overflow-y-auto pr-4 hide-scrollbar">
                                {messages.map(msg => (
                                    <motion.div 
                                        key={msg.id} 
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setActiveMessage(msg)}
                                        className={`p-8 rounded-[2.5rem] border transition-all duration-700 cursor-pointer group shadow-2xl ${activeMessage?.id === msg.id ? 'bg-brand-primary border-brand-accent shadow-indigo-900/40' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                                    >
                                        <p className={`text-[10px] font-black uppercase tracking-[0.5em] mb-4 ${activeMessage?.id === msg.id ? 'text-brand-accent' : 'text-slate-500'}`}>{msg.from}</p>
                                        <h4 className="text-lg font-black mb-3 tracking-tight italic leading-tight">{msg.subject}</h4>
                                        <p className="text-sm font-medium italic line-clamp-2 opacity-60">"{msg.body}"</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClientPortal;
