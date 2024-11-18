import type { Match } from "./mod.js";
import { useMatches, useMatch } from "./context.js";

export function useRoot(): Match | undefined {
  const matches = useMatches();

  for (let i = matches.length - 1; i >= 0; i -= 1) {
    if (matches[i]?.route.elements._layout?.Root) {
      return matches[i];
    }
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
