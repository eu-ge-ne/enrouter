import { createLog } from "#log.js";

import { loaders } from "./loaders.js";

import type { RouteModules } from "#modules.js";
import type { RouteMatch } from "#matches/mod.js";

const log = createLog("load/matches");

interface LoadRouteMatchesParams {
  matches: RouteMatch[];
  modules: RouteModules;
}

export async function loadRouteMatches({
  matches,
  modules,
}: LoadRouteMatchesParams): Promise<void> {
  log("Loading route matches");

  const promises: Promise<unknown>[] = [];

  for (const { handler } of matches) {
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
  }

  await Promise.all(promises);

  log("Route matches loaded");
}
