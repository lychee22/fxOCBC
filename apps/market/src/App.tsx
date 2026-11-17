import { useEffect, useState } from 'react';
import { bus, BUS_EVENTS, formatRate } from '@one-bank/sdk';

type Quote = { USDCNY: number; XAUCNY: number; ts: number };

const INIT: Quote = { USDCNY: 6.9123, XAUCNY: 468.5, ts: Date.now() };

export default function App() {
  const [quote, setQuote] = useState<Quote>(INIT);

  useEffect(() => {
    // 行情推送节流：最多 500ms 一次渲染
    let last = 0;
    let pending: Quote | null = null;
    const off = bus.on(BUS_EVENTS.MARKET_RATE_UPDATED, (p) => {
      pending = p as Quote;
      const now = Date.now();
      if (now - last >= 500) {
        last = now;
        setQuote(pending);
        pending = null;
      }
    });
    const flush = window.setInterval(() => {
      if (pending) {
        setQuote(pending);
        pending = null;
        last = Date.now();
      }
    }, 500);
    return () => {
      off();
      window.clearInterval(flush);
    };
  }, []);

  return (
    <div className="market-app">
      <h2>公共行情 app-market</h2>
      <p className="market-desc">汇率 / 金价行情 · 经基座总线向其他子应用分发</p>
      <ul className="market-quotes">
        <li>
          <span>USD/CNY</span>
          <b>{formatRate(quote.USDCNY)}</b>
        </li>
        <li>
          <span>黄金（元/克）</span>
          <b>{quote.XAUCNY.toFixed(2)}</b>
        </li>
        <li className="market-ts">更新时间：{new Date(quote.ts).toLocaleTimeString('zh-CN')}</li>
      </ul>
    </div>
  );
}
