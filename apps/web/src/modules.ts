import { buildFromViteGlobs } from "enrouter";

export const modules = buildFromViteGlobs({
  globs: import.meta.glob(["./app/**/_*.tsx"]),
  moduleId: (key) => "src" + key.slice(".".length),
  path: (key) => key.slice("./app/".length),
});
