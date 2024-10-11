# RouteModules API

Will soon be updated...

## Interfaces

### RouteModules

```typescript
type RouteModules = Record<
  string,
  {
    path: string;
    load: () => Promise<unknown>;
  }
>;
```
