# RouteModules

`RouteModules` is a collection of route module descriptors.
It maps ids of modules to their fs path and async import function.

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

### Create manually

```ts
import type { RouteModules } from "enrouter";

const modules: RouteModules = {
  "src/app/_layout.tsx": {
    path: "_layout.tsx",
    load: () => import("src/app/_layout.tsx"),
  },
};
```

### Create using Vite glob import

```ts
import type { RouteModules } from "enrouter";

const globs = import.meta.glob(["./app/**/_*.tsx"]);

const entries = Object.entries(globs).map(([key, load]) => [
  "src" + key.slice(".".length),
  {
    path: key.slice("./app/".length),
    load,
  },
]);

const modules: RouteModules = Object.fromEntries(entries);
```
