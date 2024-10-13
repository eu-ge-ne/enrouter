# Loaders

## Functions

```ts
interface LoadRouteMatchesParams {
  matches: RouteMatch[];
  modules: RouteModules;
}

async function loadRouteMatches({
  matches,
  modules,
}: LoadRouteMatchesParams): Promise<void>;
```
