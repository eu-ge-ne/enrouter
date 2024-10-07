export { buildRoutes } from "./routes/mod.js";
export { buildRouteHandlers } from "./handlers/mod.js";

export type { RouteModules } from "./modules.js";

import { createLog } from "#log.js";

const log = createLog("hello");

export function hello() {
  log("a");
  const result = "Hello";
  log("b");
  return result;
}
