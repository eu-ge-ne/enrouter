export { buildRoutes } from "./routes/mod.js";
export { buildRouteHandlers } from "./handlers/mod.js";
export { matchRoutes } from "./matches/mod.js";

export { loadRouteHandlers } from "./load/handlers.js";
export { loadRouteMatches } from "./load/matches.js";

export { StaticRouter } from "./routers/static.js";
export { BrowserRouter } from "./routers/browser.js";

export { useOutlets, Outlet } from "./outlets/mod.js";
export { useLocation, usePath, useMatch } from "./hooks.js";
export { useLinkProps } from "./link.js";

export type { Route } from "./routes/mod.js";
export type { GetModuleAssets } from "./routes/assets.js";
export type { RouteModules } from "./modules.js";
