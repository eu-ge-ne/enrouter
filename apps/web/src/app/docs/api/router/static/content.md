# StaticRouter API

## Components

### StaticRouter

```typescript
interface StaticRouterProps {
  handlers: RouteHandler;
  location: string;
  matches: RouteMatch[];
}

function StaticRouter({ handlers, location, matches }: StaticRouterProps);
```
