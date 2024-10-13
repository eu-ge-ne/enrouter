import type { ReactElement } from "react";

import { logger } from "#lib/debug.js";
import type { Route } from "#lib/route/mod.js";

const log = logger("handler");

/**
 * "Hydrated" instance of `Route`.
 * Contains corresponding path `RegExp`, imported modules
 * and rendered React components
 */
export interface RouteHandler {
  route: Route;

  modules: { id: string; loaded?: true }[];

  layout?: Record<string, ReactElement>;
  index?: Record<string, ReactElement>;
  notFound?: Record<string, ReactElement>;

  tree?: RouteHandler[];
}

/**
 * Build `RouteHandler` tree from `Route`s.
 */
export function buildRouteHandlers(route: Route): RouteHandler {
  log("Building handlers");

  const handler = recur(route);

  log("Handlers built: %o", handler);

  return handler;
}

function recur(route: Route): RouteHandler {
  const handler: RouteHandler = {
    route,
    modules: route.modules.map(({ id }) => ({ id })),
  };

  if (route.tree) {
    handler.tree = route.tree.map(recur);
  }

  return handler;
}
