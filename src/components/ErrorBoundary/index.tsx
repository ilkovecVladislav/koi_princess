import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  public renderFallback = (): JSX.Element => <div>Something went wrong</div>;

  public render(): React.ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? this.renderFallback() : children;
  }
}

export default ErrorBoundary;
