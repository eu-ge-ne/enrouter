# Loaders API

## Functions

### loadRouteHandlers

```typescript
interface LoadRouteHandlersParams {
  handlers: RouteHandler;
  modules: RouteModules;
}

async function loadRouteHandlers({
  handlers,
  modules,
}: LoadRouteHandlersParams): Promise<void>;
```

### loadRouteMatches

```typescript
interface LoadRouteMatchesParams {
  matches: RouteMatch[];
  modules: RouteModules;
}

async function loadRouteMatches({
  matches,
  modules,
}: LoadRouteMatchesParams): Promise<void>;
```
