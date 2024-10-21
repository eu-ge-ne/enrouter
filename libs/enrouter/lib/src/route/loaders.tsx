import type { ComponentType } from "react";

import type { Route } from "./mod.js";

type ImportComponentFn = () => Promise<{ default: ComponentType }>;
type Loader = (route: Route, importFn: () => Promise<unknown>) => Promise<void>;

export const loaders: Record<string, Loader> = {
  "_root.tsx": async (route, importFn) => {
    route.elements.root = await loadComponent(importFn);
  },
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

async function loadComponent(fn: () => Promise<unknown>) {
  const { default: Component } = await (fn as ImportComponentFn)();
  return <Component />;
}

async function load(importFn: () => Promise<unknown>) {
  const fn = importFn as () => Promise<{
    default: Record<string, ComponentType>;
  }>;
  const { default: components } = await fn();
  return Object.fromEntries(
    Object.entries(components).map(([key, C]) => [key, <C />]),
  );
}
