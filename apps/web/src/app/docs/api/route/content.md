# Route API

Will soon be updated...

Route is a base building block of routing.
Routes are orginized into a tree of routes.
Every branch of the tree maps a segment of url to some code and its assets.
The code will generate the UI which corresponds to the segment of the url.

## Interfaces

### Route

```typescript
interface Route {
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

### buildRoutes

```typescript
interface BuildRoutesParams {
  entryId: string;
  modules: RouteModules;
  assets: ModuleAssets;
}

declare function buildRoutes({
  entryId,
  modules,
  assets,
}: BuildRoutesParams): Route | undefined;
```
