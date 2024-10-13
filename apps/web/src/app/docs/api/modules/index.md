# RouteModules

See also: [Building Routes](/docs/arch/routes).

## Interfaces

```ts
/**
 * Collection of route module descriptors.
 * Maps module id to fs path and async import function.
 */
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

## Functions

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
