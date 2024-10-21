import type { ComponentType } from "react";

import type { Route } from "./mod.js";

type ImportComponentFn = () => Promise<{ default: ComponentType }>;
type ImportComponentsFn = () => Promise<{
  default: Record<string, ComponentType>;
}>;
type Loader = (route: Route, fn: () => Promise<unknown>) => Promise<void>;

export const loaders: Record<string, Loader> = {
  "_root.tsx": async (route, fn) => {
    route.elements.root = await loadComponent(fn);
  },
  "_page.tsx": async (route, fn) => {
    route.elements.page = await loadComponents(fn);
  },
  "_index.tsx": async (route, fn) => {
    route.elements.index = await loadComponents(fn);
  },
  "_end.tsx": async (route, fn) => {
    route.elements.end = await loadComponents(fn);
  },
};

async function loadComponent(fn: () => Promise<unknown>) {
  const { default: Component } = await (fn as ImportComponentFn)();

  return <Component />;
}

async function loadComponents(fn: () => Promise<unknown>) {
  const { default: components } = await (fn as ImportComponentsFn)();

  return Object.fromEntries(
    Object.entries(components).map(([key, Component]) => [key, <Component />]),
  );
}
