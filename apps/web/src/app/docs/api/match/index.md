# RouteMatch

## Interfaces

```ts
/**
 * Represents matched `Route` instance.
 */
interface RouteMatch {
  handler: RouteHandler;

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
  handlers: RouteHandler;
  location: string;
}

declare function matchRoutes({
  handlers,
  location,
}: MatchRoutesParams): RouteMatch[];
```
