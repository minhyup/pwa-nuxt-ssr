(this.workbox = this.workbox || {}),
  (this.workbox.routing = (function(t, e) {
    "use strict";
    try {
      self["workbox:routing:5.1.3"] && _();
    } catch (t) {}
    const s = (t) => (t && "object" == typeof t ? t : { handle: t });
    class r {
      constructor(t, e, r = "GET") {
        (this.handler = s(e)), (this.match = t), (this.method = r);
      }
    }
    class n extends r {
      constructor(t, e, s) {
        super(
          ({ url: e }) => {
            const s = t.exec(e.href);
            if (s && (e.origin === location.origin || 0 === s.index))
              return s.slice(1);
          },
          e,
          s
        );
      }
    }
    class o {
      constructor() {
        this.t = new Map();
      }
      get routes() {
        return this.t;
      }
      addFetchListener() {
        self.addEventListener("fetch", (t) => {
          const { request: e } = t,
            s = this.handleRequest({ request: e, event: t });
          s && t.respondWith(s);
        });
      }
      addCacheListener() {
        self.addEventListener("message", (t) => {
          if (t.data && "CACHE_URLS" === t.data.type) {
            const { payload: e } = t.data,
              s = Promise.all(
                e.urlsToCache.map((t) => {
                  "string" == typeof t && (t = [t]);
                  const e = new Request(...t);
                  return this.handleRequest({ request: e });
                })
              );
            t.waitUntil(s),
              t.ports && t.ports[0] && s.then(() => t.ports[0].postMessage(!0));
          }
        });
      }
      handleRequest({ request: t, event: e }) {
        const s = new URL(t.url, location.href);
        if (!s.protocol.startsWith("http")) return;
        const { params: r, route: n } = this.findMatchingRoute({
          url: s,
          request: t,
          event: e,
        });
        let o,
          i = n && n.handler;
        if ((!i && this.s && (i = this.s), i)) {
          try {
            o = i.handle({ url: s, request: t, event: e, params: r });
          } catch (t) {
            o = Promise.reject(t);
          }
          return (
            o instanceof Promise &&
              this.o &&
              (o = o.catch((r) =>
                this.o.handle({ url: s, request: t, event: e })
              )),
            o
          );
        }
      }
      findMatchingRoute({ url: t, request: e, event: s }) {
        const r = this.t.get(e.method) || [];
        for (const n of r) {
          let r;
          const o = n.match({ url: t, request: e, event: s });
          if (o)
            return (
              (r = o),
              ((Array.isArray(o) && 0 === o.length) ||
                (o.constructor === Object && 0 === Object.keys(o).length) ||
                "boolean" == typeof o) &&
                (r = void 0),
              { route: n, params: r }
            );
        }
        return {};
      }
      setDefaultHandler(t) {
        this.s = s(t);
      }
      setCatchHandler(t) {
        this.o = s(t);
      }
      registerRoute(t) {
        this.t.has(t.method) || this.t.set(t.method, []),
          this.t.get(t.method).push(t);
      }
      unregisterRoute(t) {
        if (!this.t.has(t.method))
          throw new e.WorkboxError(
            "unregister-route-but-not-found-with-method",
            { method: t.method }
          );
        const s = this.t.get(t.method).indexOf(t);
        if (!(s > -1))
          throw new e.WorkboxError("unregister-route-route-not-registered");
        this.t.get(t.method).splice(s, 1);
      }
    }
    let i;
    const u = () => (
      i || ((i = new o()), i.addFetchListener(), i.addCacheListener()), i
    );
    return (
      (t.NavigationRoute = class extends r {
        constructor(t, { allowlist: e = [/./], denylist: s = [] } = {}) {
          super((t) => this.i(t), t), (this.u = e), (this.h = s);
        }
        i({ url: t, request: e }) {
          if (e && "navigate" !== e.mode) return !1;
          const s = t.pathname + t.search;
          for (const t of this.h) if (t.test(s)) return !1;
          return !!this.u.some((t) => t.test(s));
        }
      }),
      (t.RegExpRoute = n),
      (t.Route = r),
      (t.Router = o),
      (t.registerRoute = function(t, s, o) {
        let i;
        if ("string" == typeof t) {
          const e = new URL(t, location.href);
          i = new r(({ url: t }) => t.href === e.href, s, o);
        } else if (t instanceof RegExp) i = new n(t, s, o);
        else if ("function" == typeof t) i = new r(t, s, o);
        else {
          if (!(t instanceof r))
            throw new e.WorkboxError("unsupported-route-type", {
              moduleName: "workbox-routing",
              funcName: "registerRoute",
              paramName: "capture",
            });
          i = t;
        }
        return u().registerRoute(i), i;
      }),
      (t.setCatchHandler = function(t) {
        u().setCatchHandler(t);
      }),
      (t.setDefaultHandler = function(t) {
        u().setDefaultHandler(t);
      }),
      t
    );
  })({}, workbox.core._private));
