import type { ReactNode } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import type { TRouterContext } from "./context.js";
import { RouterProvider } from "./context.js";

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
  const context: TRouterContext = {
    routes,
    location,
    matches,
    navigate: () => undefined,
    ctx,
  };

  const children = Object.values(matches[0]?.elements?.layout ?? {})[0];

  return <RouterProvider value={context}>{children}</RouterProvider>;
}
