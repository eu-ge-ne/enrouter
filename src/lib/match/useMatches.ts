import { useContext } from "react";

import type { Match } from "./match.js";
import { MatchesContext, MatchIndexContext } from "./context.js";

export interface Matches {
  matches: Match[];
  matchIndex: number;
  match: Match | undefined;
  firstMatch: Match | undefined;
  nextMatch: Match | undefined;
  lastMatch: Match | undefined;
  voidMatch: Match | undefined;
  isExactMatch: boolean;
}

export function useMatches(): Matches {
  const matches = useContext(MatchesContext);
  const matchIndex = useContext(MatchIndexContext);

  const match = matches[matchIndex];
  const firstMatch = matches[0];
  const nextMatch = matches[matchIndex + 1];
  const lastMatch = matches.at(-1);
  const voidMatch = matches.findLast((x) => x.route?.elements._void);

  const isExactMatch = Boolean(lastMatch?.route);

  return {
    matches,
    matchIndex,
    match,
    firstMatch,
    nextMatch,
    lastMatch,
    voidMatch,
    isExactMatch,
  };
}
