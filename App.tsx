
import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Workshop from './pages/GenerativeSuite';
import Services from './pages/Services';
import Areas from './pages/Areas';
import Funding from './pages/Funding';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Underwriting from './pages/Underwriting';
import Valuation from './pages/Valuation';
import KYC from './pages/KYC';
import Login from './pages/Login';
import AuthPortal from './pages/AuthPortal';
import ClientPortal from './pages/ClientPortal';
import InvestorPortal from './pages/InvestorPortal';

// Components
import FrameworkPage from './components/FrameworkPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import SEOManager from './components/SEOManager';

// Lazy Pages
const InvestmentCategories = lazy(() => import('./pages/Investors/InvestmentCategories'));
const InvestorFAQ = lazy(() => import('./pages/Investors/InvestorFAQ'));
const InvestorDisclaimer = lazy(() => import('./pages/Investors/InvestorDisclaimer'));

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow pt-[100px]">
      {children}
    </main>
    <footer className="bg-brand-primary text-brand-stone/40 py-20 px-10 border-t border-brand-accent/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-stone mb-2">Federgreen Consulting Group</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-accent/60">Sovereign-Grade Capital Advisory</p>
        </div>
        <div className="flex space-x-8 text-[9px] font-black uppercase tracking-widest">
           <a href="#/terms" className="hover:text-brand-accent transition-colors">Terms</a>
           <a href="#/privacy" className="hover:text-brand-accent transition-colors">Privacy</a>
           <span className="opacity-20">© 2024 Node-Protocol</span>
        </div>
      </div>
    </footer>
  </div>
);

const NotFound: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-20 text-center">
    <h1 className="serif text-6xl font-black text-brand-primary mb-6 italic">Node Redirect.</h1>
    <p className="text-brand-slate text-xl mb-10 max-w-md font-medium italic">
      The requested institutional node is either restricted or re-mapped.
    </p>
    <a href="#/" className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-primary/20 hover:bg-brand-accent transition-all">
      Return to Master Node
    </a>
  </div>
);

const AppRoutes: React.FC = () => {
    const location = useLocation();
    
    return (
        <ErrorBoundary>
            <SEOManager />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {/* Auth Routes */}
                    <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                    <Route path="/client-portal/login" element={<PageTransition><AuthPortal type="client" mode="login" /></PageTransition>} />
                    <Route path="/client-portal/signup" element={<PageTransition><AuthPortal type="client" mode="signup" /></PageTransition>} />
                    <Route path="/investor-portal/login" element={<PageTransition><AuthPortal type="investor" mode="login" /></PageTransition>} />
                    <Route path="/investor-portal/signup" element={<PageTransition><AuthPortal type="investor" mode="signup" /></PageTransition>} />
                    
                    {/* Protected Routes */}
                    <Route path="/client-portal" element={<ProtectedRoute role="client"><ClientPortal /></ProtectedRoute>} />
                    <Route path="/investor-portal" element={<ProtectedRoute role="investor"><InvestorPortal /></ProtectedRoute>} />
                    
                    {/* Public Shell */}
                    <Route path="/*" element={
                        <PublicLayout>
                            <Suspense fallback={
                                <div className="h-[60vh] flex flex-col items-center justify-center bg-brand-stone text-brand-primary">
                                    <div className="w-12 h-12 border-4 border-brand-primary border-t-brand-accent rounded-full animate-spin mb-6" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em]">Synchronizing Node...</p>
                                </div>
                            }>
                                <Routes>
                                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                                    <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                                    <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
                                    <Route path="/workshop" element={<PageTransition><Workshop /></PageTransition>} />
                                    <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                                    <Route path="/areas" element={<PageTransition><Areas /></PageTransition>} />
                                    <Route path="/funding" element={<PageTransition><Funding /></PageTransition>} />
                                    <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
                                    <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                                    <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
                                    <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                                    <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
                                    <Route path="/underwriting" element={<PageTransition><Underwriting /></PageTransition>} />
                                    <Route path="/valuation" element={<PageTransition><Valuation /></PageTransition>} />
                                    <Route path="/kyc-node" element={<PageTransition><KYC /></PageTransition>} />

                                    {/* Investor Hub */}
                                    <Route path="/investors" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/opportunities" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/what-we-do" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/expertise" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/expertise/early-stage" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/expertise/growth-stage" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/expertise/established" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/expertise/public" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/expertise/real-estate-infra" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/expertise/hnwi" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/private-membership" element={<PageTransition><FrameworkPage /></PageTransition>} />
                                    <Route path="/investors/membership" element={<PageTransition><InvestmentCategories /></PageTransition>} />
                                    <Route path="/investors/faqs" element={<PageTransition><InvestorFAQ /></PageTransition>} />
                                    <Route path="/investors/disclaimer" element={<PageTransition><InvestorDisclaimer /></PageTransition>} />
                                    
                                    {/* New World of Finance */}
                                    <Route path="/new-world-finance" element={<PageTransition><FrameworkPage /></PageTransition>} />

                                    {/* Safe Fallback */}
                                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                                </Routes>
                            </Suspense>
                        </PublicLayout>
                    } />
                </Routes>
            </AnimatePresence>
        </ErrorBoundary>
    );
}

const App: React.FC = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default App;
