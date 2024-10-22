import type { ComponentType } from "react";

import type { Route } from "./mod.js";

type ImportRootFn = () => Promise<{ default: ComponentType }>;

type ImportFn = () => Promise<{
  default: ComponentType | Record<string, ComponentType>;
}>;

type Loader = (route: Route, fn: () => Promise<unknown>) => Promise<void>;

export const loaders: Record<string, Loader> = {
  "_root.tsx": async ({ elements }, fn) => {
    elements.root = await loadRoot(fn);
  },
  "_page.tsx": async ({ elements }, fn) => {
    elements.page = await load(fn);
  },
  "_index.tsx": async ({ elements }, fn) => {
    elements.index = await load(fn);
  },
  "_end.tsx": async ({ elements }, fn) => {
    elements.end = await load(fn);
  },
};

async function loadRoot(fn: () => Promise<unknown>) {
  const { default: C } = await (fn as ImportRootFn)();
  return <C />;
}

async function load(fn: () => Promise<unknown>) {
  const { default: Comp } = await (fn as ImportFn)();

  if (typeof Comp === "function") {
    return <Comp />;
  }

  return Object.fromEntries(
    Object.entries(Comp).map(([key, C]) => [key, <C />]),
  );
}
