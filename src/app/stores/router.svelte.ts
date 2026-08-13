/** Simple hash-based SPA router. */

export type Route = 'dashboard' | 'library' | 'project' | 'canvases' | 'runway' | 'id-pipeline' | 'event-loop' | 'rep-matrix' | 'el-storyboard' | 'learn-el' | 'data-flow' | 'rate-limiter' | 'queue' | 'cache-aside' | 'failover' | 'payment-lesson';

let _route = $state<{ page: Route; params: Record<string, string> }>({ page: 'dashboard', params: {} });

export const router = {
  get page(): Route {
    return _route.page;
  },
  get params(): Record<string, string> {
    return _route.params;
  },

  go(page: Route, params: Record<string, string> = {}) {
    _route = { page, params };
    const q = new URLSearchParams(params).toString();
    window.location.hash = q ? `#/${page}?${q}` : `#/${page}`;
  },

  /** Call once on boot to sync from current hash. */
  sync() {
    const hash = window.location.hash.replace('#/', '');
    const [page, qs] = hash.split('?');
    const params: Record<string, string> = {};
    if (qs) new URLSearchParams(qs).forEach((v, k) => (params[k] = v));

    if (page === 'library' || page === 'project' || page === 'canvases' || page === 'runway' || page === 'id-pipeline' || page === 'event-loop' || page === 'rep-matrix' || page === 'el-storyboard' || page === 'learn-el' || page === 'data-flow' || page === 'rate-limiter' || page === 'queue' || page === 'cache-aside' || page === 'failover' || page === 'payment-lesson') {
      _route = { page, params };
    } else {
      _route = { page: 'dashboard', params: {} };
    }
  },
};

// Listen to browser back/forward
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => router.sync());
}
