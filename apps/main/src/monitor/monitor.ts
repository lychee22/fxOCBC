/** 基座统一监控埋点与错误上报（本期上报到控制台，预留发送通道） */
type TrackPayload = { event: string; props?: Record<string, unknown>; ts: number };

const queue: TrackPayload[] = [];

function report(payload: TrackPayload) {
  // TODO: 接入行内监控平台后改为实际上报
  queue.push(payload);
  if (queue.length > 100) queue.shift();
}

export function track(event: string, props?: Record<string, unknown>) {
  report({ event, props, ts: Date.now() });
}

export function installMonitor() {
  window.addEventListener('error', (e) => {
    track('js_error', { message: e.message, source: e.filename, line: e.lineno });
  });
  window.addEventListener('unhandledrejection', (e) => {
    track('promise_rejection', { reason: String(e.reason) });
  });
  track('app_boot');
}
