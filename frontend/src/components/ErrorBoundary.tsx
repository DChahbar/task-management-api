import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from './ui/ErrorState'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg px-4 py-16">
          <ErrorState
            title="Unexpected error"
            message="Something broke in the app. Try reloading the page."
            onRetry={() => window.location.reload()}
          />
          <p className="mt-4 text-center">
            <button
              type="button"
              onClick={this.handleReset}
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Dismiss and continue
            </button>
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
