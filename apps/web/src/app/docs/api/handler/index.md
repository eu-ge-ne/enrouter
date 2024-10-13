# RouteHandler

## Interfaces

```ts
/**
 * "Hydrated" instance of `Route`.
 * Contains corresponding path `RegExp`, imported modules
 * and rendered React components
 */
export interface RouteHandler {
  route: Route;

  /**
   * @see https://github.com/lukeed/regexparam
   */
  test: { keys: string[]; pattern: RegExp };

  modules: { id: string; loaded?: true }[];

  layout?: Record<string, ReactElement>;
  index?: Record<string, ReactElement>;
  notFound?: Record<string, ReactElement>;

  tree?: RouteHandler[];
}
```

## Functions

```ts
/**
 * Build `RouteHandler` tree from `Route`s.
 */
declare function buildRouteHandlers(route: Route): RouteHandler;
```

## Examples

### buildRouteHandlers

```ts
import { buildRouteHandlers } from "enrouter";

const handlers = buildRouteHandlers(routes);
```
