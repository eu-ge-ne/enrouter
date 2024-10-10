# Architecture

## Building Routes

```mermaid
graph LR;
  RM(RouteModules)
  MA(ModuleAssets)
  BR((buildRoutes))
  subgraph RTT [" "]
    RT(Route)
    RT1(Route1)
    RT2(Route2)
    RT3(Route3)

    RT-->RT1
    RT-->RT2
    RT2-->RT3
  end

  RM-->BR
  MA-->BR
  BR-->RTT
```

## Building RouteHandlers

```mermaid
graph LR;
  subgraph RTT [" "]
    RT(Route)
    RT1(Route1)
    RT2(Route2)

    RT-->RT1
    RT-->RT2
  end
  subgraph RHH [" "]
    RH(RouteHandler)
    RH1(RouteHandler1)
    RH2(RouteHandler2)

    RH-->RH1
    RH-->RH2
  end
  BRH((buildRouteHandlers))

  RTT-->BRH
  BRH-->RHH
```

## TODO

```mermaid
graph TD;
  RH[RouteHandler];
  NAV(("navigation event"));
  LOC[Location];
  RM[RouteMatch];
  RN[RouteNodes];

  RH-->NAV;
  LOC-->NAV;
  NAV---|matchRoutes|RM;
  RM---|renderMatches|RN;
```
