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
  const matches = useMatches();
  const matchIndex = useMatchIndex();

  if (!path) {
    return matches[matchIndex];
  }

  return matches.find((x) => x.route?.path === path);
}

export function useVoidMatch(): Match | undefined {
  return useMatches().findLast((x) => x.route?.elements._void);
}
