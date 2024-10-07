# enrouter

```mermaid
graph TD;
  RM[RouteModules];
  R[Route];
  RH[RouteHandler];

  RM---|buildRoutes|R;
  R---|buildRouteHandlers|RH;
```
