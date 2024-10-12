# RouteModules

See also: [Building Routes](/docs/arch/routes), [ModuleAssets](/docs/api/assets).

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

```ts
interface BuildRouteModulesFromViteGlobsParams {
  globs: Record<string, () => Promise<unknown>>;
  moduleId: (key: string) => string;
  path: (key: string) => string;
}

/**
 * Builds `RouteModules` from Vite glob import
 */
declare function buildRouteModulesFromViteGlobs({
  globs,
  moduleId,
  path,
}: BuildRouteModulesFromViteGlobsParams): RouteModules;
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
import { buildRouteModulesFromViteGlobs } from "enrouter";

const modules = buildRouteModulesFromViteGlobs({
  globs: import.meta.glob(["./app/**/_*.tsx"]),
  moduleId: (key) => "src" + key.slice(".".length),
  path: (key) => key.slice("./app/".length),
});
```
