# RouteHandler API

Will soon be updated...

## Interfaces

### RouteHandler

```typescript
interface RouteHandler {
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

### buildRouteHandlers

```typescript
function buildRouteHandlers(route: Route): RouteHandler;
```
