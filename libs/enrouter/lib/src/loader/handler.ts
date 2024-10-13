import { logger } from "#lib/debug.js";
import { loaders } from "./loaders.js";

import type { RouteModules } from "#lib/modules.js";
import type { RouteHandler } from "#lib/handler/mod.js";

const log = logger("loader/handler");

export interface LoadRouteHandlersParams {
  handlers: RouteHandler;
  modules: RouteModules;
}

// TODO: not needed?
export async function loadRouteHandlers({
  handlers,
  modules,
}: LoadRouteHandlersParams): Promise<void> {
  log("Loading handlers");

  const promises: Promise<unknown>[] = [];

  recur([handlers], modules, promises);

  await Promise.all(promises);

  log("Handlers loaded");
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

      const { fileName, load } = modules[module.id]!;

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
