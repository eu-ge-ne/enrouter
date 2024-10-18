import type { Route } from "./mod.js";
import { loaders } from "./loaders.js";

export async function loadRoutes(routes: Route[]): Promise<void> {
  const promises: Promise<unknown>[] = [];

  for (const route of routes) {
    if (route.loaded) {
      continue;
    }

    for (const { fileName, importFn } of route.modules) {
      const promise = loaders[fileName]?.(route, importFn);
      if (promise) {
        promises.push(promise.then(() => (route.loaded = true)));
      }
    }
  }

  await Promise.all(promises);
}
