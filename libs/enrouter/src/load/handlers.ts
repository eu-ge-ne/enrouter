import { createLog } from "#log.js";
import { loaders } from "./loaders.js";

import type { RouteModules } from "#modules.js";
import type { RouteHandler } from "#handlers/mod.js";

const log = createLog("load/handlers");

interface LoadRouteHandlersParams {
  handlers: RouteHandler;
  modules: RouteModules;
}

export async function loadRouteHandlers({
  handlers,
  modules,
}: LoadRouteHandlersParams): Promise<void> {
  log("Loading route handlers");

  const promises: Promise<unknown>[] = [];

  recur([handlers], modules, promises);

  await Promise.all(promises);

  log("Route handlers loaded");
}

function recur(
  handlers: RouteHandler[],
  modules: RouteModules,
  promises: Promise<unknown>[],
): void {
  for (const handler of handlers) {
    for (const module of handler.modules) {
      if (module.loaded) {
        continue;
      }

      const { path, load } = modules[module.id]!;

      const fileName = path.slice(path.lastIndexOf("/") + 1);

      const promise = loaders[fileName]?.({ handler, module, load });
      if (promise) {
        promises.push(promise);
      }
    }

    if (handler.tree) {
      recur(handler.tree, modules, promises);
    }
  }
}
