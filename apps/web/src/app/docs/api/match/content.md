# RouteMatch API

## Interfaces

### RouteMatch

```typescript
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

### matchRoutes

```typescript
interface MatchRoutesParams {
  handlers: RouteHandler;
  location: string;
}

function matchRoutes({ handlers, location }: MatchRoutesParams): RouteMatch[];
```
