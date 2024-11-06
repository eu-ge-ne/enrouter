import type { Match } from "./mod.js";
import { useMatch } from "./context.js";

export function useRoot(): Match | undefined {
  let match = useMatch()?.last;

  while (match) {
    if (match.route.elements._layout?.Root) {
      return match;
    }
    match = match.prev;
  }
}

export interface UseActiveParams<T> {
  path: string;
  loose?: boolean;
  value: [T, T];
}

export function useActive<T>({ path, loose, value }: UseActiveParams<T>): T {
  const match = useMatch(path);

  const isActive = loose ? match !== undefined : Boolean(match?.isExact);

  return isActive ? value[0] : value[1];
}
