import type { MicroAppId, MicroAppProps, SessionInfo } from './types';

export const ACTIVE_RULES = ['/market'] as const;

export const APP_IDS: MicroAppId[] = ['market'];

export const DEFAULT_LOGIN_PATH = '/login';
export const DEFAULT_HOME_PATH = '/';

export function buildMicroAppProps(partial: Partial<MicroAppProps> = {}): MicroAppProps {
  return {
    container: partial.container ?? null,
    basename: partial.basename ?? '/',
    session: partial.session ?? null,
    globalState: partial.globalState,
  };
}

export function createSession(userInfo: { name: string; roles?: string[] }): SessionInfo {
  return {
    userId: 'u_' + Math.random().toString(36).slice(2, 10),
    userName: userInfo.name,
    roles: userInfo.roles ?? ['default'],
    loggedAt: Date.now(),
  };
}
