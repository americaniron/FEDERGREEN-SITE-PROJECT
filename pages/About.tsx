
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
                <span className="w-12 h-[2px] bg-indigo-600"></span>
                <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em]">Our Legacy</span>
            </div>
            <h1 className="serif text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">Empowering Vision <br/><span className="text-indigo-600">Through Capital.</span></h1>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Federgreen Consulting was founded with a singular mission: to provide sophisticated financial architecture for global visionaries. Led by Davina Federgreen, our firm bridges the gap between traditional institutional capital and the emerging world of digital assets.
              </p>
              <p>
                With decades of collective experience in corporate advisory, due diligence, and capital markets, our team specializes in high-stakes environments where precision and trust are paramount.
              </p>
              <p>
                Our proprietary vetting protocols and AI-driven valuation tools ensure that every deal we touch is grounded in reality and optimized for long-term viability.
              </p>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop" alt="Executive team" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-8 -right-8 bg-indigo-600 text-white p-10 rounded-3xl shadow-2xl max-w-xs">
                <p className="text-3xl font-bold mb-2">20+</p>
                <p className="text-sm font-medium opacity-90">Years of cross-border financial expertise.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;