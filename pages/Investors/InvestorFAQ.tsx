
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, Shield, Info } from 'lucide-react';

const faqs = [
  { 
    q: "What is my potential ROI?", 
    a: "ROI is fundamentally a function of the specific tranche, sector velocity, and macro-economic tranches active during the investment lifecycle. While our models are architected to target significant alpha, actual returns are subject to systemic risk and operational performance. We provide detailed historical performance tranches for context, acknowledging that past performance is not a guarantee of future results." 
  },
  { 
    q: "Are these companies vetted?", 
    a: "Every enterprise node undergoes a proprietary, triple-redundant vetting sequence. This includes a 360-degree financial audit, technical IP stress-testing, and a sovereign compliance check (KYC/AML). We prioritize absolute node integrity, presenting only tier-1 institutional-grade opportunities to our membership." 
  },
  { 
    q: "What are the biggest challenges and risks with these companies?", 
    a: "Institutional risks typically include jurisdictional policy shifts, global liquidity contractions, and execution-level operational hurdles. We mitigate these variables through diversified tranches and the implementation of defensive structural architecture at the entity level." 
  },
  { 
    q: "How will our capital be utilized?", 
    a: "Capital is typically deployed to accelerate enterprise velocity. This includes the hardening of technical infrastructure, expansion into new sovereign market nodes, and the optimization of operational scaling. Every opportunity includes a detailed Use of Funds memorandum." 
  },
  { 
    q: "How will our time be utilized?", 
    a: "Membership is designed for minimal operational friction. While certain tranches offer board-level oversight nodes for strategic partners, most opportunities are managed by the Federgreen senior advisory desk, providing a turn-key institutional experience." 
  },
  { 
    q: "How do you make sure the companies will make the volume of revenues needed to achieve up to a 10X ROI?", 
    a: "Targeting outsized returns is a function of identifying extreme enterprise velocity in underserved market nodes. While a 10X outcome is an aspirational benchmark in high-conviction tranches, actual performance is subject to systemic variables and operational execution. We utilize proprietary stress-testing to validate the underlying revenue logic, acknowledging that risk increases significantly with targeted yields." 
  },
  { 
    q: "How do you de-risk our investment?", 
    a: "De-risking is architected through a combination of secured asset collateralization, algorithmic threat neutralizing, and the implementation of sovereign-grade governance nodes. We build defensive tranches into every deal node to help ensure institutional capital preservation." 
  },
  { 
    q: "Do these companies have collateral so that we can get our money back in case they go bankrupt?", 
    a: "Many of our tranches are backed by tangible or digital asset collateral, including real estate deeds, mineral rights tranches, or digital liquidity reserves. The specific collateral structure of each node is detailed in the confidential offering memorandum." 
  },
  { 
    q: "What is \"The New World of Finance\"?", 
    a: "The New World of Finance represents the modular node where traditional institutional capital meets the digital frontier. It utilizes BTC/USDT lending, fine art monetization, and hybrid instruments to create a fluid, high-alpha economy designed for the 21st-century allocator." 
  },
];

const InvestorFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-brand-stone min-h-screen py-32 px-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-24 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
            <div className="w-16 h-[2px] bg-emerald-600" />
            <span className="text-emerald-600 text-[11px] font-black uppercase tracking-[0.6em]">Institutional Inquiries</span>
          </div>
          <h1 className="serif text-7xl text-brand-primary font-black leading-[0.9] tracking-tighter mb-10 italic">
            Investors <br/> FAQs.
          </h1>
          <p className="text-slate-500 text-xl leading-relaxed font-medium italic">
            Detailed responses regarding the tranches of institutional engagement within the Federgreen node.
          </p>
        </header>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              className={`bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all duration-700 ${openIndex === i ? 'shadow-2xl border-brand-primary/10' : 'hover:bg-slate-50'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-10 flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${openIndex === i ? 'bg-brand-primary text-white' : 'bg-brand-stone text-slate-300'}`}>
                    <Target size={20} />
                  </div>
                  <h3 className="text-xl text-brand-primary font-black italic tracking-tight">{faq.q}</h3>
                </div>
                <ChevronDown className={`text-slate-200 transition-transform duration-700 ${openIndex === i ? 'rotate-180' : ''}`} size={24} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="px-28 pb-10"
                  >
                    <div className="flex space-x-8">
                      <div className="w-1 h-auto bg-brand-accent/20 rounded-full" />
                      <p className="text-slate-500 text-lg leading-relaxed font-medium italic py-2">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white rounded-[3.5rem] border border-slate-100 flex items-start space-x-8 italic shadow-sm">
           <Info className="text-brand-accent shrink-0 mt-1" size={24} />
           <p className="text-slate-400 text-sm leading-relaxed">
             This FAQ node is for institutional briefing purposes only. Every engagement is strictly governed by private tranches and disclosure agreements. Direct verification may be requested at <a href="#/contact" className="text-brand-primary font-black underline decoration-brand-accent decoration-2 underline-offset-4">/contact</a>.
           </p>
        </div>
      </div>
    </div>
  );
};

export default InvestorFAQ;
