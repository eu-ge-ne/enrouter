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
  }

  await Promise.all(promises);

  log("Matches loaded");
}
