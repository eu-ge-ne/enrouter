import type { ComponentType } from "react";

import type { Route } from "./mod.js";

type ImportSingle = () => Promise<{ default: ComponentType }>;

type ImportAny = () => Promise<{
  default: ComponentType | Record<string, ComponentType>;
}>;

type Loader = (route: Route, fn: () => Promise<unknown>) => Promise<void>;

export const loaders: Record<string, Loader> = {
  "_root.tsx": async ({ elements }, fn) => {
    elements._root = await loadSingle(fn);
  },
  "__void.tsx": async ({ elements }, fn) => {
    elements.__void = await loadSingle(fn);
  },
  "_outlets.tsx": async ({ elements }, fn) => {
    elements._outlets = await loadAny(fn);
  },
  "_page.tsx": async ({ elements }, fn) => {
    elements._page = await loadAny(fn);
  },
  "_index.tsx": async ({ elements }, fn) => {
    elements._index = await loadAny(fn);
  },
};

async function loadSingle(fn: () => Promise<unknown>) {
  const { default: C } = await (fn as ImportSingle)();
  return <C />;
}

async function loadAny(fn: () => Promise<unknown>) {
  const { default: Comp } = await (fn as ImportAny)();

  if (typeof Comp === "function") {
    return <Comp />;
  }

  return Object.fromEntries(
    Object.entries(Comp).map(([key, C]) => [key, <C />]),
  );
}
