export { debug } from "./debug.js";

export type { Route } from "./route/mod.js";

export { type Match, matchLocation } from "./match/match.js";
export { type Matches, useMatches } from "./match/useMatches.js";
export { useMatchFor } from "./match/useMatchFor.js";
export { type UseActiveParams, useActive } from "./match/useActive.js";

export { type StaticRouterProps, StaticRouter } from "./router/static.js";
export { type BrowserRouterProps, BrowserRouter } from "./router/browser.js";

export { useLocation } from "./location/mod.js";
export { useNavigate } from "./navigate/mod.js";
export { type OutletProps, Outlet } from "./outlet/outlet.js";
export { type LinkProps, useLink } from "./link/mod.js";
