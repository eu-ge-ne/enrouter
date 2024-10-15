# RouteMatch

## Interfaces

```ts
/**
 * Represents matched `Route` instance.
 */
export interface RouteMatch {
  route: Route;

  location: string;
  isFull: boolean;
  params: Record<string, string>;

  next?: RouteMatch;
  last?: RouteMatch;
}
```

## Functions

```ts
interface MatchRoutesParams {
  routes: Route;
  location: string;
}

declare function matchRoutes({
  routes,
  location,
}: MatchRoutesParams): RouteMatch[];
```
