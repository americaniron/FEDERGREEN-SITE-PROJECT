
import React from 'react';
import { ShieldAlert, Info, Scale, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const InvestorDisclaimer: React.FC = () => {
  return (
    <div className="bg-brand-stone min-h-screen py-32 px-10 lg:px-48">
      <div className="max-w-5xl mx-auto">
        <header className="mb-24">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-[2px] bg-rose-600" />
            <span className="text-rose-600 text-[11px] font-black uppercase tracking-[0.6em]">Risk Node Protocol</span>
          </div>
          <h1 className="serif text-7xl text-brand-primary font-black leading-[0.9] tracking-tighter mb-10 italic">
            Institutional <br/> Disclaimer.
          </h1>
          <p className="text-slate-500 text-xl leading-relaxed font-medium italic">
            Maintaining total regulatory hygiene and capital integrity across all Federgreen institutional nodes.
          </p>
        </header>

        <div className="space-y-16">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8"
          >
            <div className="flex items-center space-x-4 mb-4">
              <ShieldAlert className="text-rose-600" size={24} />
              <h2 className="text-[12px] font-black text-brand-primary uppercase tracking-[0.4em]">Investment Risk Tranches</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-500 text-lg leading-relaxed italic font-medium space-y-6">
              <p>
                Participation in private investment tranches involves significant risk of total capital loss. Federgreen Consulting Group acts as a strategic architect and advisor; we do not provide guarantees of ROI nodes. All institutional members are expected to perform independent due diligence.
              </p>
              <p>
                The opportunities presented within the Hub are intended to demonstrate high-alpha potential but may be affected by global liquidity shifts, sovereign policy changes, and operational failures. While capital preservation is supported through collateral nodes where applicable, total recovery is never a guaranteed fact.
              </p>
              <p>
                Nothing on this site constitutes an offer to sell, or a solicitation of an offer to buy, any security or investment instrument. Access to specific tranches is restricted to accredited and institutional investors as defined by their respective jurisdictions.
              </p>
            </div>
          </motion.section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 space-y-6">
              <div className="flex items-center space-x-4">
                <Scale className="text-brand-primary" size={20} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Advisory Boundary</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                Federgreen is not a registered investment advisor (RIA) or broker-dealer. Our advisory node provides structural architecture and strategic mapping. Seek independent legal and tax counsel before initiating capital commitments.
              </p>
            </div>
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 space-y-6">
              <div className="flex items-center space-x-4">
                <Globe className="text-brand-primary" size={20} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Jurisdictional Nodes</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                Certain tranches may be legally restricted in specific sovereign regions. Membership is subject to successful KYC/AML clearance nodes in alignment with global PDPL and PDPA tranches.
              </p>
            </div>
          </div>

          <section className="bg-brand-primary p-12 rounded-[4rem] text-white flex flex-col items-center text-center space-y-8 shadow-premium">
            <Info className="text-brand-accent" size={48} />
            <h2 className="serif text-4xl font-black italic tracking-tighter">Agreement Node.</h2>
            <p className="text-indigo-100/60 text-lg max-w-2xl leading-relaxed italic font-medium">
              By accessing the Investors Hub, you acknowledge these risk tranches and agree to operate within the restricted Federgreen institutional protocol.
            </p>
            <button onClick={() => window.history.back()} className="px-12 py-6 bg-white text-brand-primary rounded-[3rem] font-black uppercase text-[11px] tracking-[0.5em] shadow-2xl hover:bg-brand-accent hover:text-white transition-all">
              Acknowledge & Finalize
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InvestorDisclaimer;
