import { bus, BUS_EVENTS } from '@one-bank/sdk';
import { createRoot, type Root } from 'react-dom/client';
import App from './App';

let root: Root | null = null;
let timer: number | null = null;
let unsub: (() => void) | null = null;

/** 模拟行情：定时刷新汇率（qiankun interval 沙箱会随 unmount 自动清理兜底，但这里显式管理） */
function startMockFeed() {
  timer = window.setInterval(() => {
    bus.emit(BUS_EVENTS.MARKET_RATE_UPDATED, {
      USDCNY: Number((6.9 + Math.random() * 0.2).toFixed(4)),
      XAUCNY: Number((460 + Math.random() * 20).toFixed(2)),
      ts: Date.now(),
    });
  }, 3000);
}

export async function mount(container?: HTMLElement) {
  const el = container ?? document.getElementById('market-root');
  if (!el) throw new Error('[market] mount container not found');
  root = createRoot(el);
  root.render(<App />);
  unsub = bus.on(BUS_EVENTS.MARKET_RATE_UPDATED, () => {
    /* 行情推送节流后由 App 内部订阅处理，这里保底反注册用 */
  });
  startMockFeed();
}

export function unmount() {
  root?.unmount();
  root = null;
  if (timer != null) window.clearInterval(timer);
  timer = null;
  unsub?.();
  unsub = null;
}
