import type { ReactNode } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import type { TRouterContext } from "./context.js";
import { createContent } from "#lib/content/create.js";
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
    navigate: () => undefined,
    ctx,
  };

  const children = createContent(matches);

  return <RouterProvider value={context}>{children}</RouterProvider>;
}
