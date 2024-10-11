import type { RouteModules } from "enrouter";

const globs = import.meta.glob(["./app/**/_*.tsx"]);

const entries = Object.entries(globs).map(([key, load]) => [
  "src" + key.slice(".".length),
  {
    path: key.slice("./app/".length),
    load,
  },
]);

export const modules: RouteModules = Object.fromEntries(entries);
