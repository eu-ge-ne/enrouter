export { debug } from "./debug.js";

export type { Route } from "./route/mod.js";

export { loadRoutes } from "./route/load.js";

export {
  type RouteMatch,
  type MatchRoutesParams,
  matchRoutes,
} from "./match/mod.js";

export { type StaticRouterProps, StaticRouter } from "./router/static.js";
export { type BrowserRouterProps, BrowserRouter } from "./router/browser.js";

export { type OutletProps, Outlet } from "./outlet/mod.js";

export {
  type LinkProps,
  type UseActiveLinkPropsParams,
  type ActiveLinkProps,
  useLinkProps,
  useActiveLinkProps,
} from "./link.js";

export { useLocation, usePath, useMatch } from "./hooks.js";
