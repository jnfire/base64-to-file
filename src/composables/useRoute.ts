import { ref, readonly } from 'vue';

export type Route = 'decode' | 'encode' | 'settings';

/** Turns `location.hash` into a route. Anything unknown is the decoder. */
export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  if (path === 'ajustes') return 'settings';
  if (path === 'codificar') return 'encode';
  return 'decode';
}

export function routeToHash(route: Route): string {
  if (route === 'settings') return '#/ajustes';
  if (route === 'encode') return '#/codificar';
  return '#/';
}

const current = ref<Route>(
  typeof window === 'undefined' ? 'decode' : parseRoute(window.location.hash),
);

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    current.value = parseRoute(window.location.hash);
  });
}

const go = (route: Route) => {
  const hash = routeToHash(route);
  if (window.location.hash === hash) {
    current.value = route;
    return;
  }
  window.location.hash = hash;
};

export function useRoute() {
  return {
    route: readonly(current),
    goDecode: () => go('decode'),
    goEncode: () => go('encode'),
    goSettings: () => go('settings'),
  };
}
