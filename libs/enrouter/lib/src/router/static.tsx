import type { ReactNode } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { RouterStaticProvider, RouterDynamicProvider } from "./context.js";
import { renderMatches } from "#lib/match/render.js";

const navigate = () => undefined;

export interface StaticRouterProps {
  routes: Route;
  location: string;
  matches: Match[];
  ctx?: unknown;
}

export function StaticRouter({
  routes,
  location,
  matches,
  ctx,
}: StaticRouterProps): ReactNode {
  const staticContext = { routes, navigate, ctx };

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
