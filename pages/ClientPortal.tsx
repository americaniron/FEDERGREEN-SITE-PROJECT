
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Bell, Settings, User, BarChart2, Briefcase, 
  FileText, Bot, Loader2, Layout, Plus, X, Check,
  Save, Sliders, MessageSquare, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateClientBriefing } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#111e35" }) => (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <rect width="100" height="100" rx="24" fill={color} />
      <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
    </svg>
);

type WidgetId = 'federgreen-briefing' | 'project-metrics' | 'document-vault' | 'advisor-comms';

interface Widget {
  id: WidgetId;
  label: string;
  icon: any;
  description: string;
}

const ALL_WIDGETS: Widget[] = [
  { id: 'federgreen-briefing', label: 'Sovereign Briefing', icon: Bot, description: 'Real-time FEDERGREEN status assessment' },
  { id: 'project-metrics', label: 'Node Metrics', icon: BarChart2, description: 'Project status and milestones' },
  { id: 'document-vault', label: 'Secure Vault', icon: FileText, description: 'Encrypted document access' },
  { id: 'advisor-comms', label: 'Advisor Comms', icon: MessageSquare, description: 'Direct senior advisory link' },
];

const ClientPortal: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Acme Innovations', email: 'client@federgreen.com' });
    const [briefing, setBriefing] = useState<string | null>(null);
    const [loadingBriefing, setLoadingBriefing] = useState(true);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [activeWidgets, setActiveWidgets] = useState<WidgetId[]>(() => {
        const saved = localStorage.getItem('federgreen-client-widgets');
        return saved ? JSON.parse(saved) : ['federgreen-briefing', 'project-metrics', 'document-vault', 'advisor-comms'];
    });
    
    const projectData = {
      projectName: "Project Olympus: Series B Capital Raise",
      status: "Finalizing Investor Deck",
      nextMilestone: "Investor Outreach Begins - Nov 1st, 2024",
      criticalNotices: ["Awaiting Q3 financial statements for model update."]
    };

    useEffect(() => {
        const fetchBriefing = async () => {
            setLoadingBriefing(true);
            try {
                const res = await generateClientBriefing(projectData);
                setBriefing(res);
            } catch (e) {
                setBriefing("FEDERGREEN Briefing Node offline. Please check critical notices manually.");
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

    const toggleWidget = (id: WidgetId) => {
        const next = activeWidgets.includes(id) 
            ? activeWidgets.filter(w => w !== id) 
            : [...activeWidgets, id];
        setActiveWidgets(next);
        localStorage.setItem('federgreen-client-widgets', JSON.stringify(next));
    };

    const isWidgetActive = (id: WidgetId) => activeWidgets.includes(id);

    return (
        <div className="min-h-screen bg-brand-stone flex">
            {/* Sidebar Navigation */}
            <aside className="w-28 bg-white border-r border-slate-100 flex flex-col items-center py-10 justify-between glass-premium sticky top-0 h-screen">
                <div className="space-y-12 flex flex-col items-center">
                    <LogoMark className="w-12 h-12 shadow-2xl" />
                    <nav className="space-y-6">
                        {[
                          { icon: Layout, active: true },
                          { icon: Briefcase, active: false },
                          { icon: FileText, active: false },
                          { icon: ShieldCheck, active: false }
                        ].map((item, i) => (
                            <button key={i} className={`p-4 rounded-3xl transition-all duration-500 group ${item.active ? 'bg-brand-primary text-white shadow-xl shadow-indigo-900/20' : 'text-slate-300 hover:text-brand-primary hover:bg-slate-50'}`}>
                                <item.icon size={24} />
                            </button>
                        ))}
                    </nav>
                </div>
                <button onClick={handleLogout} className="p-4 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-3xl transition-all">
                    <LogOut size={24} />
                </button>
            </aside>

            <main className="flex-1 p-16">
                {/* Header */}
                <header className="flex justify-between items-center mb-20">
                    <div>
                        <h1 className="serif text-5xl font-black text-brand-primary italic tracking-tighter">Client Portal</h1>
                        <div className="flex items-center mt-2 space-x-3">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Authorized Node: {user.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={() => setIsConfigOpen(true)}
                            className="flex items-center space-x-3 px-6 py-4 bg-white border border-slate-100 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-primary hover:border-brand-primary/20 transition-all shadow-sm"
                        >
                            <Sliders size={14} />
                            <span>Manage Node Layout</span>
                        </button>
                        <div className="flex items-center space-x-3">
                            <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-brand-primary transition-all shadow-sm relative">
                                <Bell size={20}/>
                                <div className="absolute top-3 right-3 w-2 h-2 bg-brand-accent rounded-full border-2 border-white" />
                            </button>
                            <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center text-brand-accent font-black text-lg shadow-xl shadow-indigo-900/30">
                               FG
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        <AnimatePresence mode="popLayout">
                            {isWidgetActive('federgreen-briefing') && (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-brand-primary text-white p-12 rounded-[4rem] shadow-2xl shadow-indigo-950/40 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none rotate-12">
                                        <Bot size={240} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center space-x-4 mb-10">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                                                <Bot className="text-emerald-400" size={24} />
                                            </div>
                                            <div>
                                                <h2 className="text-[12px] font-black uppercase tracking-[0.5em] text-emerald-400">Sovereign Briefing</h2>
                                                <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">Real-time Node Assessment</p>
                                            </div>
                                        </div>
                                        {loadingBriefing ? (
                                            <div className="space-y-4">
                                                <div className="h-4 bg-white/10 rounded-full w-full animate-pulse" />
                                                <div className="h-4 bg-white/10 rounded-full w-5/6 animate-pulse" />
                                                <div className="h-4 bg-white/10 rounded-full w-3/4 animate-pulse" />
                                            </div>
                                        ) : (
                                            <p className="text-indigo-50/80 text-xl leading-relaxed font-medium italic whitespace-pre-wrap">
                                                {briefing}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {isWidgetActive('project-metrics') && (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                                >
                                    {[
                                        { label: 'Primary Node', val: projectData.projectName },
                                        { label: 'Current Tranche', val: projectData.status },
                                        { label: 'Next Deployment', val: projectData.nextMilestone }
                                    ].map((m, i) => (
                                        <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-4 group-hover:text-brand-primary transition-colors">{m.label}</p>
                                            <p className="text-lg font-black text-brand-primary leading-tight">{m.val}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {isWidgetActive('document-vault') && (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-12">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                                <FileText size={20} />
                                            </div>
                                            <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900">Secure Document Vault</h2>
                                        </div>
                                        <button className="text-[10px] font-black uppercase tracking-widest text-brand-accent flex items-center hover:translate-x-1 transition-transform">
                                            Manage Artifacts <Plus size={12} className="ml-2" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {["Strategic Plan v2.pdf", "Financial Model Q3.xlsx", "Investor Deck Draft v4.pptx"].map(doc => (
                                            <div key={doc} className="group flex justify-between items-center bg-slate-50/50 p-6 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-500">
                                                <div className="flex items-center">
                                                    <FileText className="text-slate-300 group-hover:text-brand-primary transition-colors mr-6" />
                                                    <span className="font-bold text-slate-700 text-[15px]">{doc}</span>
                                                </div>
                                                <button className="text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm">
                                                    Download Node
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-4">
                        <AnimatePresence mode="popLayout">
                            {isWidgetActive('advisor-comms') && (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm sticky top-16"
                                >
                                    <div className="flex items-center space-x-4 mb-12">
                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                            <MessageSquare size={20} />
                                        </div>
                                        <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900">Advisor Comms</h2>
                                    </div>
                                    <div className="space-y-8">
                                        {[
                                            { from: 'D. Federgreen', sub: 'Deck Finalization', msg: 'Team, the narrative looks strong. Let\'s sync on the financial visuals tomorrow AM...' },
                                            { from: 'Compliance Desk', sub: 'KYC Document Request', msg: 'Please upload the certified articles of incorporation to the vault...' }
                                        ].map((item, i) => (
                                            <div key={i} className="space-y-4 group cursor-pointer">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-[11px] font-black text-brand-primary uppercase tracking-widest mb-1 group-hover:text-brand-accent transition-colors">{item.from}</p>
                                                        <p className="text-xs font-bold text-slate-400">{item.sub}</p>
                                                    </div>
                                                    <span className="text-[9px] font-black text-slate-200 uppercase">2h ago</span>
                                                </div>
                                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium italic border-l-2 border-slate-50 pl-5 group-hover:border-brand-accent transition-colors">
                                                    "{item.msg}"
                                                </p>
                                                {i === 0 && <div className="h-[1px] bg-slate-50 pt-4" />}
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-12 py-5 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-primary hover:text-white transition-all shadow-inner">
                                        Initiate Advisor Link
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {activeWidgets.length === 0 && (
                            <div className="text-center p-20 bg-white/40 border-2 border-dashed border-slate-200 rounded-[4rem]">
                                <Layout size={48} className="mx-auto text-slate-200 mb-6" />
                                <p className="text-slate-400 font-bold italic">No active data tranches.</p>
                                <button onClick={() => setIsConfigOpen(true)} className="mt-6 text-brand-primary font-black uppercase text-[10px] tracking-widest underline underline-offset-8">Configure Dashboard</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Dashboard Architect Modal */}
            <AnimatePresence>
                {isConfigOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsConfigOpen(false)}
                            className="fixed inset-0 bg-brand-primary/40 backdrop-blur-md z-[300]" 
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.4)] z-[301] overflow-hidden"
                        >
                            <div className="p-12 border-b border-slate-50 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h3 className="serif text-4xl font-black text-brand-primary italic tracking-tight">Dashboard Architect</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-2">Personalize Intelligence Nodes</p>
                                </div>
                                <button onClick={() => setIsConfigOpen(false)} className="p-4 hover:bg-white rounded-2xl transition-all text-slate-400">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-12 space-y-4">
                                {ALL_WIDGETS.map(widget => (
                                    <div 
                                        key={widget.id}
                                        onClick={() => toggleWidget(widget.id)}
                                        className={`group flex items-center justify-between p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${
                                            isWidgetActive(widget.id) 
                                                ? 'bg-white border-brand-primary/10 shadow-xl' 
                                                : 'bg-slate-50/50 border-transparent grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isWidgetActive(widget.id) ? 'bg-brand-primary text-brand-accent shadow-lg' : 'bg-white text-slate-300'}`}>
                                                <widget.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="font-black text-brand-primary uppercase tracking-widest text-[12px]">{widget.label}</p>
                                                <p className="text-xs text-slate-400 font-medium italic mt-1">{widget.description}</p>
                                            </div>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isWidgetActive(widget.id) ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white border border-slate-100 text-slate-100'}`}>
                                            <Check size={20} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-12 bg-slate-50 flex justify-center">
                                <button 
                                    onClick={() => setIsConfigOpen(false)}
                                    className="flex items-center space-x-3 px-12 py-6 bg-brand-primary text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[0.5em] shadow-2xl shadow-indigo-900/30 hover:bg-emerald-600 transition-all group"
                                >
                                    <Save size={16} className="group-hover:scale-110 transition-transform" />
                                    <span>Deploy Configuration</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClientPortal;
