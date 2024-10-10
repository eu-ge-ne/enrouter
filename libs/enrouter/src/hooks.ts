import { useContext } from "react";

import { RouterContext } from "./routers/context.js";
import { RouteRenderContext } from "./render/context.js";

import type { RouteMatch } from "./match/mod.js";

export function useLocation(): string {
  const { location } = useContext(RouterContext);
  return location;
}

export function usePath(path: string): RouteMatch | undefined {
  let nodes = useContext(RouteRenderContext).last;
  while (nodes) {
    if (nodes.match.handler.route.path === path) {
      return nodes.match;
    }
    nodes = nodes.prev;
  }
}

export function useMatch(): RouteMatch {
  return useContext(RouteRenderContext).match;
}
