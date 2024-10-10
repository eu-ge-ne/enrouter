import type { ReactElement } from "react";
import * as regexparam from "regexparam";

import type { Route } from "#route/mod.js";

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
  const handler: RouteHandler = {
    route,
    test: regexparam.parse(route.path, true),
    modules: route.mod.map((id) => ({ id })),
  };

  if (route.tree) {
    handler.tree = route.tree.map(buildRouteHandlers);
  }

  return handler;
}
