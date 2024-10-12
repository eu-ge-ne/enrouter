# Route

See also: [Building Routes](/docs/arch/routes), [RouteModules](/docs/api/modules).

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
interface BuildRoutesWithViteManifestParams {
  modules: RouteModules;
  manifest: unknown;
  mapAssetUrl: (x: string) => string;
  entryId: string;
}

/**
 * Builds `Route`s from `RouteModules` and Vite manifest
 */
declare function buildRoutesWithViteManifest({
  modules,
  manifest,
  mapAssetUrl,
  entryId,
}: BuildRoutesWithViteManifestParams): Route | undefined;
```

## Examples

### buildRoutesWithViteManifest

```ts
import { buildRoutes } from "enrouter";

import { modules } from "./modules.js";
import { assets } from "./assets.js";

const routes = buildRoutes({ entryId: "src/main.tsx", modules, assets });
```
