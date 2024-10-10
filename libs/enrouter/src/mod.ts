export { buildRoutes } from "./route/mod.js";
export { buildRouteHandlers } from "./handler/mod.js";
export { matchRoutes } from "./match/mod.js";

export { loadRouteHandlers } from "./loader/handler.js";
export { loadRouteMatches } from "./loader/match.js";

export { StaticRouter } from "./router/static.js";
export { BrowserRouter } from "./router/browser.js";

export { Outlet } from "./outlet/mod.js";
export { useLocation, usePath, useMatch } from "./hooks.js";
export { useLinkProps } from "./link.js";

export { debug } from "./debug.js";

export type { Route } from "./route/mod.js";
export type { RouteHandler } from "./handler/mod.js";
export type { RouteMatch } from "./match/mod.js";
export type { RouteModules } from "./modules.js";
export type { ModuleAssets } from "./assets.js";
