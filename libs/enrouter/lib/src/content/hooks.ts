import type { Match } from "#lib/match/mod.js";
import { useContent } from "./context.js";

export function useMatch(): Match {
  return useContent().match;
}

export function usePath(path: string): Match | undefined {
  let x = useContent().last;
  while (x) {
    if (x.match.route.path === path) {
      return x.match;
    }
    x = x.prev;
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
