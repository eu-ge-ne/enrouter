import type { ComponentType } from "react";

import type { RouteHandler } from "#handlers/mod.js";

type Loader = (params: {
  handler: RouteHandler;
  module: RouteHandler["modules"][0];
  load: () => Promise<unknown>;
}) => Promise<void> | void;

interface _Layout {
  components: Record<string, ComponentType>;
}

interface _Index {
  components: Record<string, ComponentType>;
}

export const loaders: Record<string, Loader> = {
  "_layout.tsx": async ({ handler, module, load }) => {
    const fn = load as () => Promise<_Layout>;
    const { components } = await fn();
    handler.layout = Object.fromEntries(
      Object.entries(components).map(([key, C]) => [key, <C />]),
    );
    module.loaded = true;
  },
  "_index.tsx": async ({ handler, module, load }) => {
    const fn = load as () => Promise<_Index>;
    const { components } = await fn();
    handler.index = Object.fromEntries(
      Object.entries(components).map(([key, C]) => [key, <C />]),
    );
    module.loaded = true;
  },
};
