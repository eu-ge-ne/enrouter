export { debug } from "./debug.js";

export { type RouteModules } from "./modules.js";

export {
  type Route,
  type BuildRoutesWithViteManifestParams,
  buildRoutesWithViteManifest,
} from "./route/mod.js";

export { buildRouteHandlers } from "./handler/mod.js";
export { matchRoutes } from "./match/mod.js";

export { loadRouteHandlers } from "./loader/handler.js";
export { loadRouteMatches } from "./loader/match.js";

export { StaticRouter } from "./router/static.js";
export { BrowserRouter } from "./router/browser.js";

export { Outlet } from "./outlet/mod.js";
export { useLinkProps } from "./link.js";
export { useLocation, usePath, useMatch } from "./hooks.js";

export type { RouteHandler } from "./handler/mod.js";
export type { RouteMatch, MatchRoutesParams } from "./match/mod.js";
export type { LoadRouteHandlersParams } from "./loader/handler.js";
export type { LoadRouteMatchesParams } from "./loader/match.js";
export type { StaticRouterProps } from "./router/static.js";
export type { BrowserRouterProps } from "./router/browser.js";
export type { OutletProps } from "./outlet/mod.js";
