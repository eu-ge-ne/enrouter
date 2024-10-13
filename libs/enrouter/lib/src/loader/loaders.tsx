import type { ComponentType } from "react";

import type { Route } from "#lib/route/mod.js";

type Loader = (params: {
  route: Route;
  load: () => Promise<unknown>;
}) => Promise<void> | void;

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
  "_layout.tsx": async ({ route, load }) => {
    route.layout = await render(load);
  },
  "_index.tsx": async ({ route, load }) => {
    route.index = await render(load);
  },
  "_notFound.tsx": async ({ route, load }) => {
    route.notFound = await render(load);
  },
};
