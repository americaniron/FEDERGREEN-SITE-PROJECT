
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, ArrowRight, Loader2, Minimize2 } from 'lucide-react';
import { askConcierge } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the Federgreen Sovereign Node. I am your Strategic Concierge. How may I assist your institutional requirements today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Tell me about Business Plans",
    "How does Capital Advisory work?",
    "Underwrite a Real Estate deal",
    "KYC Onboarding Process",
    "Digital Asset Lending"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Map internal message history to the format required by Gemini API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await askConcierge(query, history);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Node communication failure. Please retry transmission.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Security firewall active. Institutional node sync timed out.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[200] w-16 h-16 bg-[#0a0f1a] text-white rounded-2xl flex items-center justify-center shadow-[0_24px_48px_-12px_rgba(10,15,26,0.5)] border border-white/10 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <MessageSquare size={28} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0f1a] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-[200] w-[90vw] sm:w-[420px] h-[600px] max-h-[70vh] bg-white rounded-[2.5rem] shadow-[0_48px_96px_-24px_rgba(10,15,26,0.25)] border border-slate-100 overflow-hidden flex flex-col glass-premium"
          >
            {/* Header */}
            <div className="p-8 bg-[#0a0f1a] text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none" />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                  <Bot className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="serif text-xl font-black italic tracking-tight">Sovereign Concierge.</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400/80">Node Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors relative z-10">
                <Minimize2 size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 hide-scrollbar bg-[#fdfdfc]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm sm:text-[15px] leading-relaxed font-medium italic shadow-sm
                      ${msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-indigo-200' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-slate-200'
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-5 rounded-[1.8rem] rounded-bl-none shadow-sm flex items-center space-x-3">
                    <Loader2 size={18} className="animate-spin text-indigo-600" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Heuristic Analysis...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer with Input and Chips */}
            <div className="p-6 sm:p-8 bg-white border-t border-slate-50 space-y-6">
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="relative group"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query institutional node..."
                  className="w-full bg-slate-50 border border-slate-100 p-5 pr-16 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-indigo-600 transition-all shadow-inner placeholder:text-slate-300"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#0a0f1a] text-white rounded-xl shadow-xl disabled:opacity-20 hover:bg-indigo-600 transition-all active:scale-90"
                >
                  <Send size={18} />
                </button>
              </form>
              
              <div className="text-center">
                <span className="text-[9px] font-black text-slate-200 uppercase tracking-[0.4em]">AES-256 Encrypted Security Link</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIConcierge;
