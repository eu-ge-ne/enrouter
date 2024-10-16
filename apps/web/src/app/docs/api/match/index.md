# Match

## Interfaces

```ts
/**
 * Represents matched `Route` instance.
 */
export interface Match {
  route: Route;

  location: string;
  params: Record<string, string>;
  isFull: boolean;

  next?: Match;
  last?: Match;
}
```

## Functions

```ts
interface MatchRoutesParams {
  routes: Route;
  location: string;
}

declare function matchRoutes({ routes, location }: MatchRoutesParams): Match[];
```
