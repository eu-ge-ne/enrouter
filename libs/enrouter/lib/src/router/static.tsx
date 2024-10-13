import { useMemo } from "react";

import { renderMatches } from "#lib/render/mod.js";
import { RouterContext } from "./context.js";

import type { Route } from "#lib/route/mod.js";
import type { RouteMatch } from "#lib/match/mod.js";
import type { TRouterContext } from "./context.js";

export interface StaticRouterProps {
  routes: Route;
  location: string;
  matches: RouteMatch[];
}

export function StaticRouter({ routes, location, matches }: StaticRouterProps) {
  const context = useMemo<TRouterContext>(
    () => ({
      routes,
      location,
      navigate: () => undefined,
    }),
    [routes, location],
  );

  const children = useMemo(() => renderMatches(matches), [matches]);

  return (
    <RouterContext.Provider value={context}>{children}</RouterContext.Provider>
  );
}
