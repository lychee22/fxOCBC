import { registerMicroApps, start, initGlobalState } from 'qiankun';
import { ACTIVE_RULES } from '@one-bank/sdk';

type MicroRegistryEntry = {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
  props?: Record<string, unknown>;
};

/** 子应用注册表（本期仅 app-market；后续子应用按接入协议追加） */
const MICRO_APPS: MicroRegistryEntry[] = [
  {
    name: 'market',
    entry: '//localhost:7101',
    container: '#subapp-viewport',
    activeRule: ACTIVE_RULES[0],
    props: { basename: '/market' },
  },
];

let started = false;

export function registerAndStart() {
  if (started) return;
  started = true;

  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: null,
    theme: 'light',
  });

  onGlobalStateChange((state) => {
    console.log('[main] globalState:', state);
  });

  registerMicroApps(
    MICRO_APPS.map((app) => ({
      ...app,
      loader: (loading: boolean) => {
        const el = document.querySelector('.subapp-loading');
        if (el) (el as HTMLElement).style.display = loading ? 'block' : 'none';
      },
    })),
    {
      beforeLoad: [async (app: { name: string }) => console.log('[main] beforeLoad', app.name)],
      beforeMount: [async (app: { name: string }) => console.log('[main] beforeMount', app.name)],
      afterUnmount: [async (app: { name: string }) => console.log('[main] afterUnmount', app.name)],
    },
  );

  start({ prefetch: false, sandbox: { experimentalStyleIsolation: false } });

  console.log('[main] qiankun started with apps:', MICRO_APPS.map((a) => a.name).join(', '));
  void setGlobalState;
}

/** 供导航点击：基座主导路由分发到子应用前缀 */
export function navigateTo(path: string) {
  window.history.pushState(null, '', path);
}
