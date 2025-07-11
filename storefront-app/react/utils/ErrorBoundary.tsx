import { Component } from 'react'

interface Props {
  fallback: React.ReactNode
  children?: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) return this.props.fallback

    return this.props.children
  }
}

export default ErrorBoundary
