export type MicroAppId = 'market';

export type MicroAppProps = {
  container: HTMLElement | null;
  basename: string;
  session: SessionInfo | null;
  globalState?: Record<string, unknown>;
};

export type SessionInfo = {
  userId: string;
  userName: string;
  roles: string[];
  loggedAt: number;
};

export type AppEnv = 'dev' | 'test' | 'prod';

export const APP_ENV: AppEnv =
  (['prod', 'test'] as const).includes(process.env.NODE_ENV as never)
    ? ((process.env.NODE_ENV as 'prod' | 'test'))
    : 'dev';
