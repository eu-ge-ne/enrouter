import { useMemo } from "react";

import { renderMatches } from "#lib/render/mod.js";
import { RouterContext } from "./context.js";

import type { RouteHandler } from "#lib/handler/mod.js";
import type { RouteMatch } from "#lib/match/mod.js";
import type { TRouterContext } from "./context.js";

export interface StaticRouterProps {
  handlers: RouteHandler;
  location: string;
  matches: RouteMatch[];
}

export function StaticRouter({
  handlers,
  location,
  matches,
}: StaticRouterProps) {
  const context = useMemo<TRouterContext>(
    () => ({
      handlers,
      location,
      navigate: () => undefined,
    }),
    [handlers, location],
  );

  const children = useMemo(() => renderMatches(matches), [matches]);

  return (
    <RouterContext.Provider value={context}>{children}</RouterContext.Provider>
  );
}
