import type { ReactNode } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { renderMatches } from "#lib/match/render.js";
import { RouterStaticProvider, RouterDynamicProvider } from "./context.js";

export interface StaticRouterProps {
  routes: Route;
  location: string;
  matches: Match[];
}

export function StaticRouter({
  routes,
  location,
  matches,
}: StaticRouterProps): ReactNode {
  const staticContext = {
    routes,
    navigate: () => {},
  };

  const dynamicContext = {
    location,
    matches,
    children: renderMatches(matches),
  };

  return (
    <RouterStaticProvider value={staticContext}>
      <RouterDynamicProvider value={dynamicContext}>
        {dynamicContext.children}
      </RouterDynamicProvider>
    </RouterStaticProvider>
  );
}
