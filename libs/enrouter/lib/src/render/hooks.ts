import { useContext } from "react";

import { RouteRenderContext } from "./context.js";
import type { RouteMatch } from "#lib/match/mod.js";

export function useMatch(): RouteMatch {
  return useContext(RouteRenderContext).match;
}

export function usePath(path: string): RouteMatch | undefined {
  let nodes = useContext(RouteRenderContext).last;
  while (nodes) {
    if (nodes.match.route.path === path) {
      return nodes.match;
    }
    nodes = nodes.prev;
  }
}

export interface UseActiveParams<T> {
  path: string;
  loose?: boolean;
  value: [T, T];
}

export function useActive<T>({ path, loose, value }: UseActiveParams<T>): T {
  const match = usePath(path);

  const isActive = loose ? match !== undefined : Boolean(match?.isFull);

  return isActive ? value[0] : value[1];
}
