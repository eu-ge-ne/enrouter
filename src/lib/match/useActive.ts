import { useMatches } from "./useMatches.js";
import { useMatch } from "./useMatch.js";

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
  const match = useMatch(path);
  const { lastMatch } = useMatches();

  if (!match?.route) {
    return no;
  }

  if (loose) {
    return yes;
  }

  if (match !== lastMatch) {
    return no;
  }

  return match?.route ? yes : no;
}
