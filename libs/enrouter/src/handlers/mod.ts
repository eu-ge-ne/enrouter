import type { ReactElement } from "react";
import * as regexparam from "regexparam";

import { createLog } from "#log.js";

import type { Route } from "#route/mod.js";

const log = createLog("handlers");

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

interface BuildRouteHandlersParams {
  routes: Route;
}

export function buildRouteHandlers({
  routes,
}: BuildRouteHandlersParams): RouteHandler {
  log("Building route handlers");

  const handlers = recur(routes);

  log("Route handlers built: %O", handlers);

  return handlers;
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
