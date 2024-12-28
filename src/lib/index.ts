export { debug } from "./debug.js";

export type { Route } from "./route/route.js";

export { type Match, matchLocation } from "./match/match.js";
export { type UseMatchResult, useMatch } from "./match/useMatch.js";
export { useMatchFor } from "./match/useMatchFor.js";
export { type UseActiveParams, useActive } from "./match/useActive.js";

export { type StaticRouterProps, StaticRouter } from "./router/static.js";
export { type BrowserRouterProps, BrowserRouter } from "./router/browser.js";

export { useLocation } from "./location/location.js";
export { useNavigate } from "./navigate/navigate.js";
export { type OutletProps, Outlet } from "./outlet/outlet.js";
export { type LinkProps, useLink } from "./link/link.js";
