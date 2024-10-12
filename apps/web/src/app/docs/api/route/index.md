# Route

See also: [Building Routes](/docs/arch/routes), [RouteModules](/docs/api/modules),
[ModuleAssets](/docs/api/assets).

## Interfaces

```ts
/**
 * Base building block of routing.
 * Routes are orginized into a tree.
 * Every branch of the tree maps a segment of url to a code and its assets.
 * The code will generate the UI which corresponds to the segment of the url.
 */
export interface Route {
  /**
   * Full path to url segment
   * @see https://github.com/lukeed/regexparam
   */
  path: string;

  /**
   * Ids of route's modules
   */
  mod: string[];

  /**
   * Urls of assets associated with the route
   */
  link: [string[], string[]]; // [styles[], modules[]]

  /**
   * Child routes
   */
  tree?: Route[];
}
```

## Functions

```ts
interface BuildRoutesParams {
  entryId: string;
  modules: RouteModules;
  assets: ModuleAssets;
}

/**
 * Builds `Route`s from `RouteModules` and `ModuleAssets`
 */
declare function buildRoutes({
  entryId,
  modules,
  assets,
}: BuildRoutesParams): Route | undefined;
```

## Examples

### buildRoutes

```ts
import { buildRoutes } from "enrouter";

import { modules } from "./modules.js";
import { assets } from "./assets.js";

const routes = buildRoutes({ entryId: "src/main.tsx", modules, assets });
```
