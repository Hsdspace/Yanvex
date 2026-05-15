import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button.jsx';
import { reportFrontendError } from '../../../utils/errorTracking.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    reportFrontendError(error, { componentStack: errorInfo?.componentStack });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
          <div className="text-center">
            <AlertTriangle size={48} className="mx-auto mb-4 text-slate-200" />
            <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
            <p className="text-slate-400 mb-4 text-sm">{this.state.error?.message || 'An unexpected error occurred'}</p>
            <Button variant="primary" onClick={this.resetError} className="flex items-center gap-2 mx-auto">
              <RefreshCw size={16} />
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
