export type Listener = (payload: unknown) => void;

/**
 * 极简事件总线（主/子应用共用）。
 * 子应用在 mount 时注册、unmount 时反注册，避免副作用残留。
 */
export class EventBus {
  private map = new Map<string, Set<Listener>>();

  on(event: string, fn: Listener): () => void {
    let set = this.map.get(event);
    if (!set) {
      set = new Set();
      this.map.set(event, set);
    }
    set.add(fn);
    return () => this.off(event, fn);
  }

  off(event: string, fn: Listener): void {
    this.map.get(event)?.delete(fn);
  }

  emit(event: string, payload?: unknown): void {
    this.map.get(event)?.forEach((fn) => {
      try {
        fn(payload);
      } catch (e) {
        console.error(`[EventBus] listener error for "${event}"`, e);
      }
    });
  }

  clear(): void {
    this.map.clear();
  }
}

export const bus = new EventBus();

export const BUS_EVENTS = {
  MARKET_RATE_UPDATED: 'market:rate-updated',
  SESSION_CHANGED: 'session:changed',
} as const;
