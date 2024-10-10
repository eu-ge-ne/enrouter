# RouteModules API

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
