# RouteModules

`RouteModules` is a collection of route module descriptors.
Maps module id to fs path and async import function.

```ts
type RouteModules = Record<
  string,
  {
    /**
     * FS path of module
     */
    path: string;
    /**
     * Async module import function
     */
    load: () => Promise<unknown>;
  }
>;
```

## Examples

### Build manually

```ts
import type { RouteModules } from "enrouter";

const modules: RouteModules = {
  "src/app/_layout.tsx": {
    path: "_layout.tsx",
    load: () => import("src/app/_layout.tsx"),
  },
};
```

### Build from Vite glob import

```ts
import { buildFromViteGlobs } from "enrouter";

const modules = buildFromViteGlobs({
  globs: import.meta.glob(["./app/**/_*.tsx"]),
  moduleId: (key) => "src" + key.slice(".".length),
  path: (key) => key.slice("./app/".length),
});
```
