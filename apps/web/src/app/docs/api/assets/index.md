# ModuleAssets

See also: [Building Routes](/docs/arch/routes), [RouteModules](/docs/api/modules).

## Interfaces

```ts
/**
 * Collection of module asset descriptors.
 * Maps module id to a lists of style and module urls.
 */
type ModuleAssets = Record<
  string,
  {
    /**
     * Urls of styles
     */
    styles: string[];
    /**
     * Urls of modules
     */
    modules: string[];
  }
>;
```

## Functions

```ts
interface BuildModuleAssetsFromViteManifestParams {
  manifest: unknown;
  toUrl: (x: string) => string;
}

/**
 * Builds `ModuleAssets` from Vite manifest
 */
declare function buildModuleAssetsFromViteManifest({
  manifest,
  toUrl,
}: BuildModuleAssetsFromViteManifestParams): ModuleAssets;
```

## Examples

### Build manually

```ts
import type { ModuleAssets } from "enrouter";

const assets: ModuleAssets = {
  "src/app/_layout.tsx": {
    styles: [],
    modules: ["/assets/_layout-U1yISC9D.js"],
  },
};
```

### Build from Vite manifest

```ts
import { buildModuleAssetsFromViteManifest } from "enrouter";

import manifest from "@app/web/manifest";

const assets = buildModuleAssetsFromViteManifest({
  manifest,
  toUrl: (x) => new URL(x, "http://localhost").pathname,
});
```
