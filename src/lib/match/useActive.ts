import { useMatch } from "./useMatch.js";
import { useMatchFor } from "./useMatchFor.js";

export interface UseActiveParams<T> {
  path: string;
  loose?: boolean;
  value: [T, T];
}

export function useActive<T>({
  path,
  loose,
  value: [yes, no],
}: UseActiveParams<T>): T {
  const match = useMatchFor(path);
  const { last } = useMatch();

  if (!match?.route) {
    return no;
  }

  if (loose) {
    return yes;
  }

  if (match !== last) {
    return no;
  }

  return match?.route ? yes : no;
}
