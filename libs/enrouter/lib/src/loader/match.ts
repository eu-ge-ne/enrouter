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

  for (const { route } of matches) {
    if (route.loaded) {
      continue;
    }

    for (const { fileName, load } of route.modules) {
      const promise = loaders[fileName]?.({ route, load });
      if (promise) {
        promises.push(promise.then(() => (route.loaded = true)));
      }
    }
  }

  await Promise.all(promises);

  log("Matches loaded");
}
