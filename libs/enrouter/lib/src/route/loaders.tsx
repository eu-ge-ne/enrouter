import type { ComponentType } from "react";

import type { Route } from "./mod.js";

type Loader = (
  route: Route,
  importFn: () => Promise<unknown>,
) => Promise<void> | void;

export const loaders: Record<string, Loader> = {
  "_layout.tsx": async (route, importFn) => {
    route.elements.layout = await load(importFn);
  },
  "_index.tsx": async (route, importFn) => {
    route.elements.index = await load(importFn);
  },
  "_notFound.tsx": async (route, importFn) => {
    route.elements.notFound = await load(importFn);
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
