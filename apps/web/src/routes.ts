import type { RouteModules } from "enrouter";

export const modules: RouteModules = Object.fromEntries(
  Object.entries(import.meta.glob(["./app/**/_*.tsx"])).map(([key, load]) => [
    "src" + key.slice(".".length),
    { path: key.slice("./app/".length), load },
  ]),
);
