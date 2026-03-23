import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white border border-red-200 rounded-lg shadow-lg p-6 max-w-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-3">Something went wrong.</h1>
            <p className="text-gray-700 mb-3">An unexpected error occurred while rendering this page.</p>
            <details className="bg-gray-100 p-3 rounded text-sm text-gray-700">
              <summary className="font-medium">Error Details</summary>
              <p>{this.state.error?.toString()}</p>
              <pre className="whitespace-pre-wrap mt-2">{this.state.errorInfo?.componentStack}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
