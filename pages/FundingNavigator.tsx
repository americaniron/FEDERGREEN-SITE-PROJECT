
import React, { useState } from 'react';

const FundingNavigator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<any>({});

  const next = () => setStep(step + 1);
  const reset = () => { setStep(1); setAnswers({}); };

  return (
    <div className="bg-slate-50 min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Funding Navigator</h1>
              <p className="text-slate-400 text-sm">Match your project with institutional capital.</p>
            </div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Step {step} of 4</div>
          </div>

          <div className="p-12">
            {step === 1 && (
              <div className="space-y-8 animate-fadeIn">
                <h2 className="text-2xl font-bold text-slate-900">What is the primary nature of your capital requirement?</h2>
                <div className="grid grid-cols-1 gap-4">
                  {['Real Estate Development', 'Corporate Scaling/Debt', 'Commodity Trade', 'Aerospace/Heavy Infra'].map(q => (
                    <button key={q} onClick={() => { setAnswers({...answers, type: q}); next(); }} className="w-full text-left p-6 border rounded-xl hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fadeIn">
                <h2 className="text-2xl font-bold text-slate-900">What is the required funding volume?</h2>
                <div className="grid grid-cols-1 gap-4">
                  {['$1M - $5M', '$5M - $25M', '$25M - $100M', '$100M+'].map(q => (
                    <button key={q} onClick={() => { setAnswers({...answers, amount: q}); next(); }} className="w-full text-left p-6 border rounded-xl hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fadeIn">
                <h2 className="text-2xl font-bold text-slate-900">What is your current EBITDA or Asset Value?</h2>
                <div className="grid grid-cols-1 gap-4">
                  {['Under $500k', '$500k - $2M', '$2M - $10M', '$10M+'].map(q => (
                    <button key={q} onClick={() => { setAnswers({...answers, revenue: q}); next(); }} className="w-full text-left p-6 border rounded-xl hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-8 animate-fadeIn">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Assessment Complete.</h2>
                <p className="text-slate-600">Based on your inputs, we have identified **3 Institutional Instruments** matching your profile.</p>
                
                <div className="bg-slate-50 p-6 rounded-2xl text-left border border-slate-200">
                  <p className="text-sm font-bold text-indigo-600 mb-2 uppercase tracking-widest">Recommended Match</p>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Mezzanine Debt Structure B</h4>
                  <p className="text-sm text-slate-500">Includes interest-only periods and flexible exit terms for large-scale infrastructure.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <button onClick={() => window.location.hash = '#/kyc'} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all">Continue to Secure Onboarding</button>
                  <button onClick={reset} className="text-slate-400 text-sm hover:text-slate-900">Restart Assessment</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingNavigator;
