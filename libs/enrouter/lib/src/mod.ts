export { debug } from "./debug.js";

export type { Route } from "./route/mod.js";

export type { Match } from "./match/mod.js";
export { type MatchRoutesParams, matchRoutes } from "./match/match.js";
export { renderMatches } from "./match/render.js";
export { useMatch } from "./match/context.js";
export { type UseActiveParams, usePath, useActive } from "./match/hooks.js";

export { type StaticRouterProps, StaticRouter } from "./router/static.js";
export { type BrowserRouterProps, BrowserRouter } from "./router/browser.js";
export { useLocation, useContext } from "./router/hooks.js";

export { type OutletProps, Outlet } from "./outlet/mod.js";

export { type LinkProps, useLink } from "./link/mod.js";
