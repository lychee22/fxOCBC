import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

/** 基座全局错误兜底：任何渲染异常都不允许白屏 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[main] boundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="shell-error">
          <h2>页面出现异常</h2>
          <p>{this.state.error.message}</p>
          <button onClick={() => location.assign('/')}>回到首页</button>
        </div>
      );
    }
    return this.props.children;
  }
}
