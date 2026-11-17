/**
 * @one-bank/market 入口
 * 作为 qiankun 子应用：导出 bootstrap / mount / unmount 生命周期（UMD）；
 * 独立运行（非 qiankun 环境）时自动自行挂载，保证可脱离基座本地开发。
 */
import './market.css';
import { mount as mountApp, unmount as unmountApp } from './main';

type QiankunMountProps = { container?: HTMLElement };

export async function bootstrap() {
  console.log('[market] bootstrap');
}

export async function mount(props: QiankunMountProps) {
  console.log('[market] mount', props);
  await mountApp(props.container);
}

export async function unmount() {
  console.log('[market] unmount');
  unmountApp();
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  mountApp(document.getElementById('market-root') ?? undefined);
}
