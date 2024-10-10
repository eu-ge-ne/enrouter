export { buildRoutes } from "./route/mod.js";
export { buildRouteHandlers } from "./handler/mod.js";
export { matchRoutes } from "./match/mod.js";

export { loadRouteHandlers } from "./load/handler.js";
export { loadRouteMatches } from "./load/match.js";

export { StaticRouter } from "./routers/static.js";
export { BrowserRouter } from "./routers/browser.js";

export { useOutlets, Outlet } from "./outlets/mod.js";
export { useLocation, usePath, useMatch } from "./hooks.js";
export { useLinkProps } from "./link.js";

export type { Route } from "./route/mod.js";
export type { RouteHandler } from "./handler/mod.js";
export type { RouteMatch } from "./match/mod.js";
export type { RouteModules } from "./modules.js";
export type { ModuleAssets } from "./assets.js";
