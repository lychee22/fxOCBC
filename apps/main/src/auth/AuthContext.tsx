import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { bus, BUS_EVENTS, createSession, type SessionInfo } from '@one-bank/sdk';

type AuthCtx = {
  session: SessionInfo | null;
  login: (name: string) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

const SESSION_KEY = 'onebank.session';

/** 会话存 sessionStorage（不落明文长期凭据；真实 Token 接入后改走内存 + HttpOnly Cookie） */
function loadSession(): SessionInfo | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionInfo) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionInfo | null>(loadSession);

  const value = useMemo<AuthCtx>(
    () => ({
      session,
      login: (name: string) => {
        const s = createSession({ name: name || '柜员', roles: ['teller'] });
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
        setSession(s);
        bus.emit(BUS_EVENTS.SESSION_CHANGED, s);
      },
      logout: () => {
        sessionStorage.removeItem(SESSION_KEY);
        setSession(null);
        bus.emit(BUS_EVENTS.SESSION_CHANGED, null);
      },
    }),
    [session],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be used within AuthProvider');
  return v;
}
