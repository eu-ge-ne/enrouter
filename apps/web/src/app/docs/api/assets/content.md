# ModuleAssets

```typescript
type ModuleAssets = Record<
  string,
  {
    styles: string[];
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

### Create using Vite

```ts

```
