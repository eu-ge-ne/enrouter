export { debug } from "./debug.js";

export {
  type ViteManifest,
  type ViteManifestItem,
  type ModuleAssets,
  type GetModuleAssetsParams,
  getModuleAssets,
} from "./assets.js";

export { type RouteModules } from "./modules.js";

export {
  type Route,
  type BuildRoutesParams,
  buildRoutes,
} from "./route/mod.js";
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
