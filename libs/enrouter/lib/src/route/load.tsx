import type { ComponentType } from "react";

import { logger } from "#lib/debug.js";

import type { Route } from "./mod.js";

const log = logger("route/load");

export async function loadRoutes(routes: Route[]): Promise<void> {
  log("Loading routes");

  const promises: Promise<unknown>[] = [];

  for (const route of routes) {
    if (route.loaded) {
      continue;
    }

    for (const { fileName, load } of route.modules) {
      const promise = loaders[fileName]?.(route, load);
      if (promise) {
        promises.push(promise.then(() => (route.loaded = true)));
      }
    }
  }

  await Promise.all(promises);

  log("Routes loaded");
}

type Loader = (
  route: Route,
  load: () => Promise<unknown>,
) => Promise<void> | void;

interface _Components {
  components: Record<string, ComponentType>;
}

async function render(load: () => Promise<unknown>) {
  const fn = load as () => Promise<_Components>;
  const { components } = await fn();
  return Object.fromEntries(
    Object.entries(components).map(([key, C]) => [key, <C />]),
  );
}

export const loaders: Record<string, Loader> = {
  "_layout.tsx": async (route, load) => {
    route.elements.layout = await render(load);
  },
  "_index.tsx": async (route, load) => {
    route.elements.index = await render(load);
  },
  "_notFound.tsx": async (route, load) => {
    route.elements.notFound = await render(load);
  },
};
