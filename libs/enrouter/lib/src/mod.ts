export { debug } from "./debug.js";

export type { Route } from "./route/mod.js";
export { type BuildRoutesParams, buildRoutes } from "./route/build.js";
export { loadRoutes } from "./route/load.js";

export {
  type RouteMatch,
  type MatchRoutesParams,
  matchRoutes,
} from "./match/mod.js";

export { StaticRouter } from "./router/static.js";
export { BrowserRouter } from "./router/browser.js";

export { Outlet } from "./outlet/mod.js";
export { useLinkProps } from "./link.js";
export { useLocation, usePath, useMatch } from "./hooks.js";

export type { StaticRouterProps } from "./router/static.js";
export type { BrowserRouterProps } from "./router/browser.js";
export type { OutletProps } from "./outlet/mod.js";
