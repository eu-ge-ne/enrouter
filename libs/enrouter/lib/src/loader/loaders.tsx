import type { ComponentType } from "react";

import type { RouteHandler } from "#lib/handler/mod.js";

type Loader = (params: {
  handler: RouteHandler;
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
  "_layout.tsx": async ({ handler, load }) => {
    handler.layout = await render(load);
  },
  "_index.tsx": async ({ handler, load }) => {
    handler.index = await render(load);
  },
  "_notFound.tsx": async ({ handler, load }) => {
    handler.notFound = await render(load);
  },
};
