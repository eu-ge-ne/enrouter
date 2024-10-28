import type { ComponentType } from "react";

import type { Route } from "./mod.js";

type ImportAny = () => Promise<{
  default: ComponentType | Record<string, ComponentType>;
}>;

type Loader = (route: Route, fn: () => Promise<unknown>) => Promise<void>;

export const loaders: Record<string, Loader> = {
  "_layout.tsx": async ({ elements }, fn) => {
    elements._layout = await loadAny(fn);
  },
  "_content.tsx": async ({ elements }, fn) => {
    elements._content = await loadAny(fn);
  },
  "_void.tsx": async ({ elements }, fn) => {
    elements._void = await loadAny(fn);
  },
};

async function loadAny(fn: () => Promise<unknown>) {
  const { default: Comp } = await (fn as ImportAny)();

  if (typeof Comp === "function") {
    return <Comp />;
  }

  return Object.fromEntries(
    Object.entries(Comp).map(([key, C]) => [key, <C />]),
  );
}
