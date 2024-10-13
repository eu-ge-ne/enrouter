import { logger } from "#lib/debug.js";
import { loaders } from "./loaders.js";

import type { RouteHandler } from "#lib/handler/mod.js";

const log = logger("loader/handler");

export interface LoadRouteHandlersParams {
  handlers: RouteHandler;
}

// TODO: not needed?
export async function loadRouteHandlers({
  handlers,
}: LoadRouteHandlersParams): Promise<void> {
  log("Loading handlers");

  const promises: Promise<unknown>[] = [];

  recur([handlers], promises);

  await Promise.all(promises);

  log("Handlers loaded");
}

function recur(handlers: RouteHandler[], promises: Promise<unknown>[]): void {
  for (const handler of handlers) {
    if (handler.route.loaded) {
      continue;
    }

    for (const module of handler.route.modules) {
      const { fileName, load } = handler.route.modules.find(
        (x) => x.id === module.id,
      )!;

      const promise = loaders[fileName]?.({ handler, load });
      if (promise) {
        promises.push(promise.then(() => (handler.route.loaded = true)));
      }
    }

    if (handler.tree) {
      recur(handler.tree, promises);
    }
  }
}
