import React, { Component } from 'react';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
            <AlertCircle size={48} className="text-red-500" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter">Something went wrong</h1>
          <p className="text-text-muted max-w-md mb-10 leading-relaxed">
            We're sorry for the inconvenience. Our team has been notified. 
            In the meantime, you can try refreshing the page or head back to home.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={this.resetError}
              className="btn-primary py-3 px-8 rounded-full font-bold flex items-center gap-2 w-full sm:w-auto"
            >
              <RefreshCw size={20} /> Refresh Page
            </button>
            <a 
              href="/"
              className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full font-bold transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Home size={20} /> Back to Home
            </a>
          </div>

          <div className="mt-20 p-4 bg-white/5 rounded-xl border border-white/5 max-w-2xl w-full text-left overflow-auto max-h-40">
            <p className="text-xs font-mono text-zinc-500">
              Error Details: {this.state.error?.message || "Unknown Error"}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
