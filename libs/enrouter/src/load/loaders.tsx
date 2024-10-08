import type { ComponentType } from "react";

import type { RouteHandler } from "#handlers/mod.js";

type Loader = (params: {
  handler: RouteHandler;
  module: RouteHandler["modules"][0];
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
  "_layout.tsx": async ({ handler, module, load }) => {
    handler.layout = await render(load);
    module.loaded = true;
  },
  "_index.tsx": async ({ handler, module, load }) => {
    handler.index = await render(load);
    module.loaded = true;
  },
  "_notFound.tsx": async ({ handler, module, load }) => {
    handler.notFound = await render(load);
    module.loaded = true;
  },
};
