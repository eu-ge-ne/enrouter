import type { ComponentType } from "react";

import type { Route } from "./route.js";

type ImportFn = () => Promise<{
  default: Record<string, ComponentType>;
}>;

type Loader = (route: Route, fn: () => Promise<unknown>) => Promise<void>;

export const loaders: Record<string, Loader> = {
  "_layout.tsx": async ({ elements }, fn) => {
    elements._layout = await load(fn);
  },
  "_content.tsx": async ({ elements }, fn) => {
    elements._content = await load(fn);
  },
  "_fallback.tsx": async ({ elements }, fn) => {
    elements._fallback = await load(fn);
  },
};

async function load(fn: () => Promise<unknown>) {
  const { default: Components } = await (fn as ImportFn)();

  return Object.fromEntries(
    Object.entries(Components).map(([key, C]) => [key, <C />]),
  );
}
