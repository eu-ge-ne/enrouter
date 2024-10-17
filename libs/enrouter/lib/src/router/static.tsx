import type { ReactNode } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { StaticProvider, DynamicProvider } from "./context.js";

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
  const children = Object.values(matches[0]?.elements?.layout ?? {})[0];

  return (
    <StaticProvider value={{ routes, navigate: () => undefined, ctx }}>
      <DynamicProvider value={{ location, matches }}>
        {children}
      </DynamicProvider>
    </StaticProvider>
  );
}
