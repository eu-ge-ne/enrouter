import dbg from "debug";
import type { ReactElement } from "react";
import * as regexparam from "regexparam";

import type { Route } from "#routes/mod.js";

const debug = dbg("enrouter/handlers");

export interface RouteHandler {
  route: Route;

  /**
   * @see https://github.com/lukeed/regexparam
   */
  test: { keys: string[]; pattern: RegExp };

  modules: { id: string; loaded?: true }[];

  layout?: Record<string, ReactElement>;
  index?: Record<string, ReactElement>;

  children?: RouteHandler[];
}

interface BuildRouteHandlersParams {
  routes: Route;
}

export function buildRouteHandlers({
  routes,
}: BuildRouteHandlersParams): RouteHandler {
  debug("Building route handlers");

  const handlers = recur(routes);

  debug("Route handlers built");

  return handlers;
}

function recur(route: Route): RouteHandler {
  const handler: RouteHandler = {
    route,
    test: regexparam.parse(route.path, true),
    modules: route.mod.map((id) => ({ id })),
  };

  if (route.tree) {
    handler.children = route.tree.map(recur);
  }

  return handler;
}
