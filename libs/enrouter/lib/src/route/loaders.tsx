import type { ComponentType } from "react";

import type { Route } from "./mod.js";

type Loader = (
  route: Route,
  importFn: () => Promise<unknown>,
) => Promise<void> | void;

export const loaders: Record<string, Loader> = {
  "_this.tsx": async (route, importFn) => {
    route.elements.this = await load(importFn);
  },
  "_index.tsx": async (route, importFn) => {
    route.elements.index = await load(importFn);
  },
  "_end.tsx": async (route, importFn) => {
    route.elements.end = await load(importFn);
  },
};

async function load(importFn: () => Promise<unknown>) {
  const fn = importFn as () => Promise<{
    default: Record<string, ComponentType>;
  }>;
  const { default: components } = await fn();
  return Object.fromEntries(
    Object.entries(components).map(([key, C]) => [key, <C />]),
  );
}
