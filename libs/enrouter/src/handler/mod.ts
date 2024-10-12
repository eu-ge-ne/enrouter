import type { ReactElement } from "react";
import * as regexparam from "regexparam";

import { logger } from "#debug.js";
import type { Route } from "#route/mod.js";

const log = logger("handler");

export interface RouteHandler {
  route: Route;

  /**
   * @see https://github.com/lukeed/regexparam
   */
  test: { keys: string[]; pattern: RegExp };

  modules: { id: string; loaded?: true }[];

  layout?: Record<string, ReactElement>;
  index?: Record<string, ReactElement>;
  notFound?: Record<string, ReactElement>;

  tree?: RouteHandler[];
}

export function buildRouteHandlers(route: Route): RouteHandler {
  log("Building handlers");

  const handler = recur(route);

  log("Handlers built: %o", handler);

  return handler;
}

function recur(route: Route): RouteHandler {
  const handler: RouteHandler = {
    route,
    test: regexparam.parse(route.path, true),
    modules: route.mod.map((id) => ({ id })),
  };

  if (route.tree) {
    handler.tree = route.tree.map(recur);
  }

  return handler;
}
