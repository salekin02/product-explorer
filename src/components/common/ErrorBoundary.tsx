import * as React from 'react';
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Something went wrong!
          </h1>

          <p className="mt-3 text-red-600">
            {this.state.error?.message || 'Unknown error occurred'}
          </p>

          <button
            onClick={this.handleReload}
            className="mt-6 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary;