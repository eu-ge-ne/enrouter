import { buildRouteModulesFromViteGlobs } from "enrouter";

export const modules = buildRouteModulesFromViteGlobs({
  globs: import.meta.glob(["./app/**/_*.tsx"]),
  moduleId: (key) => "src" + key.slice(".".length),
  path: (key) => key.slice("./app/".length),
});
