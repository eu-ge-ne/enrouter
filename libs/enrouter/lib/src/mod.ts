export { debug } from "./debug.js";

export type { Route } from "./route/mod.js";

export { loadRoutes } from "./route/load.js";

export type { Match } from "./match/mod.js";
export { type MatchRoutesParams, matchRoutes } from "./match/match.js";

export {
  type UseActiveParams,
  useMatch,
  usePath,
  useActive,
} from "./render/hooks.js";

export { type StaticRouterProps, StaticRouter } from "./router/static.js";
export { type BrowserRouterProps, BrowserRouter } from "./router/browser.js";
export { useLocation } from "./router/hooks.js";

export { type OutletProps, Outlet } from "./outlet/mod.js";

export { type LinkProps, useLink } from "./link/mod.js";
