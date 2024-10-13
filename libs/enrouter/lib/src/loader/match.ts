import { logger } from "#lib/debug.js";

import { loaders } from "./loaders.js";

import type { RouteMatch } from "#lib/match/mod.js";

const log = logger("loader/match");

export interface LoadRouteMatchesParams {
  matches: RouteMatch[];
}

export async function loadRouteMatches({
  matches,
}: LoadRouteMatchesParams): Promise<void> {
  log("Loading matches");

  const promises: Promise<unknown>[] = [];

  for (const { handler } of matches) {
    for (const module of handler.modules) {
      if (module.loaded) {
        continue;
      }

      //const { fileName, load } = modules[module.id]!;
      const mod = handler.route.modules.find((x) => x.id === module.id)!;
      const { fileName, load } = mod;

      const promise = loaders[fileName]?.({ handler, module, load });
      if (promise) {
        promises.push(promise);
      }
    }
  }

  await Promise.all(promises);

  log("Matches loaded");
}
