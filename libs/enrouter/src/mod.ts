export { buildRoutes } from "./routes/mod.js";
export { buildRouteHandlers } from "./handlers/mod.js";
export { matchRoutes } from "./matches/mod.js";

export { loadRouteHandlers } from "./load/handlers.js";
export { loadRouteMatches } from "./load/matches.js";

export { StaticRouter } from "./routers/static.js";
export { BrowserRouter } from "./routers/browser.js";

export type { RouteModules } from "./modules.js";

import { createLog } from "#log.js";

const log = createLog("hello");

export function hello() {
  log("0");
  const result = "Hello";
  log("1 %s", result);
  return result;
}
