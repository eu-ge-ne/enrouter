import type { Match } from "./mod.js";
import { useMatch } from "./context.js";

export function useRoot(): Match | undefined {
  let match = useMatch()?.last;

  do {
    if (match?.route.elements._root) {
      return match;
    }
    match = match?.prev;
  } while (match);
}

export function usePath(path: string): Match | undefined {
  let match = useMatch()?.first;

  while (match) {
    if (match.route?.path === path) {
      return match;
    }

    match = match.next;
  }
}

export interface UseActiveParams<T> {
  path: string;
  loose?: boolean;
  value: [T, T];
}

export function useActive<T>({ path, loose, value }: UseActiveParams<T>): T {
  const match = usePath(path);

  const isActive = loose ? match !== undefined : Boolean(match?.full);

  return isActive ? value[0] : value[1];
}
