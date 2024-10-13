import { logger } from "#lib/debug.js";

import { loaders } from "./loaders.js";

import type { RouteModules } from "#lib/modules.js";
import type { RouteMatch } from "#lib/match/mod.js";

const log = logger("loader/match");

export interface LoadRouteMatchesParams {
  matches: RouteMatch[];
  modules: RouteModules;
}

export async function loadRouteMatches({
  matches,
  modules,
}: LoadRouteMatchesParams): Promise<void> {
  log("Loading matches");

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

  log("Matches loaded");
}
