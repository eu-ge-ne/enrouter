# ModuleAssets

`ModuleAssets` is a collection of module assets descriptors.
It maps ids of modules to a lists of style and module urls.

See also: [Building Routes](/docs/arch/routes), [RouteModules](/docs/api/modules).

```ts
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
