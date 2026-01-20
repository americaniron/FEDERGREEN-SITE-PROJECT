
import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Institutional Error Boundary
 * Orchestrates fail-safe rendering for the sovereign node tree.
 */
// Explicitly using React.Component ensures the compiler correctly identifies the class as a React component having state and props
export class ErrorBoundary extends React.Component<Props, State> {
  // Fix: Explicitly initialize state through constructor to ensure proper inheritance typing in strict environments
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  // Fix: Static method correctly typed to return State for getDerivedStateFromError
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Fix: Lifecycle method correctly typed with Error and ErrorInfo
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Institutional Node Crash:', error, errorInfo);
  }

  public render(): ReactNode {
    // Fix: Destructuring state to safely access error and hasError properties which are now correctly identified via React.Component inheritance
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div className="min-h-screen bg-brand-stone flex items-center justify-center p-12">
          <div className="max-w-2xl w-full bg-white p-16 rounded-[4rem] border border-slate-100 shadow-2xl text-center">
            <div className="w-24 h-24 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-rose-600 shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <h1 className="serif text-5xl font-black text-brand-primary mb-6 italic tracking-tight">Node Error.</h1>
            <p className="text-slate-500 text-lg leading-relaxed font-medium italic mb-10">
              An unexpected failure has occurred in the sovereign render tree. The administrative desk has been notified.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl mb-12 text-left font-mono text-[10px] text-rose-50 border border-rose-50">
              {error?.message}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center px-10 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-900/20 hover:bg-brand-accent transition-all"
              >
                <RefreshCw size={14} className="mr-3" /> Refresh Node
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center px-10 py-5 border border-slate-200 text-brand-primary rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all"
              >
                <Home size={14} className="mr-3" /> Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Fix: Accessing children via this.props which is correctly inherited and typed from React.Component<Props, State>
    return this.props.children;
  }
}
