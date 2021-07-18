import { Component, FC, ErrorInfo, ReactNode } from 'react';

import './styles.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const ErrorFallback: FC = () => (
  <div className="error-container ">
    <h1 className="error-title">Something went wrong</h1>
    <p className="error-description">You may refresh the page or try later</p>
  </div>
);

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

  public render(): ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? <ErrorFallback /> : children;
  }
}

export default ErrorBoundary;
