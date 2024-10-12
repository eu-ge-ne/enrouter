# ModuleAssets

`ModuleAssets` is a collection of module assets descriptors.
It maps ids of modules to a lists of style and module urls.

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

### Create manually

```ts
import type { ModuleAssets } from "enrouter";

const assets: ModuleAssets = {
  "src/app/_layout.tsx": {
    styles: [],
    modules: ["/assets/_layout-U1yISC9D.js"],
  },
};
```

### Create from Vite manifest

```ts
import type { ModuleAssets } from "enrouter";

import manifest from "@app/web";

interface ViteManifestItem {
  file: string;
  css?: string[];
  imports?: string[];
}

const viteManifest = manifest as Record<string, ViteManifestItem>;

const toUrl = (x: string) => new URL(x, "http://localhost").pathname;

function getModulesRecur(item: ViteManifestItem, result: Set<string>) {
  result.add(item.file);

  (item.imports ?? [])
    .map((x) => viteManifest[x])
    .filter((x): x is ViteManifestItem => Boolean(x))
    .forEach((x) => getModulesRecur(x, result));
}

const entries = Object.entries(viteManifest).map(([key, item]) => {
  const modules = new Set<string>();
  getModulesRecur(item, modules);

  return [
    key,
    {
      styles: (item.css ?? []).map(toUrl),
      modules: [...modules].map(toUrl),
    },
  ];
});

const assets: ModuleAssets = Object.fromEntries(entries);
```
