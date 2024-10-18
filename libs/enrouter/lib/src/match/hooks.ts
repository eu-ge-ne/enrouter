import type { Match } from "./mod.js";
import { useMatch } from "./context.js";

export function usePath(path: string): Match | undefined {
  let match = useMatch().fist;

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

  const isActive = loose ? match !== undefined : Boolean(match?.isFull);

  return isActive ? value[0] : value[1];
}
