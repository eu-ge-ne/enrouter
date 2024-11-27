import { createContext, useContext } from "react";

import type { Match } from "./match.js";

const MatchesContext = createContext<Match[]>([]);
const MatchIndexContext = createContext<number>(-1);

export const MatchesProvider = MatchesContext.Provider;
export const MatchIndexProvider = MatchIndexContext.Provider;

export function useMatches(): Match[] {
  return useContext(MatchesContext);
}

export function useMatchIndex(): number {
  return useContext(MatchIndexContext);
}

export function useMatch(path?: string): Match | undefined {
  const matches = useContext(MatchesContext);
  const matchIndex = useContext(MatchIndexContext);

  if (!path) {
    return matches[matchIndex];
  }

  return matches.find((x) => x.route.path === path);
}
