import { createContext, useContext, useMemo } from "react";

import type { Match } from "./match.js";

const MatchesContext = createContext<Match[]>([]);
const MatchIndexContext = createContext<number>(-1);

export const MatchesProvider = MatchesContext.Provider;
export const MatchIndexProvider = MatchIndexContext.Provider;

export interface MatchContext {
  matches: Match[];
  matchIndex: number;
  match: Match | undefined;
  nextMatch: Match | undefined;
  lastMatch: Match | undefined;
  voidMatch: Match | undefined;
  isExactMatch: boolean;
}

export function useMatchContext(): MatchContext {
  const matches = useContext(MatchesContext);
  const matchIndex = useContext(MatchIndexContext);

  const match = matches[matchIndex];
  const nextMatch = matches[matchIndex + 1];
  const lastMatch = matches.at(-1);
  const voidMatch = matches.findLast((x) => x.route?.elements._void);

  const isExactMatch = Boolean(lastMatch?.route);

  return {
    matches,
    matchIndex,
    match,
    nextMatch,
    lastMatch,
    voidMatch,
    isExactMatch,
  };
}

export function useMatch(path: string): Match | undefined {
  return useContext(MatchesContext).find((x) => x.route?.path === path);
}
