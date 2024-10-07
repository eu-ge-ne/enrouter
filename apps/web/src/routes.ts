import type { RouteModules } from "enrouter";

const _modules = import.meta.glob(["./app/**/_*.tsx"]);

export const modules: RouteModules = Object.fromEntries(
  Object.entries(_modules).map(([key, load]) => [
    "src" + key.slice(".".length),
    { path: key.slice("./app/".length), load },
  ]),
);
