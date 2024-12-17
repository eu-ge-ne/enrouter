import { useContext } from "react";

import type { Match } from "./match.js";
import { MatchesContext, MatchIndexContext } from "./context.js";

export interface UseMatchResult {
  current: Match | undefined;
  first: Match | undefined;
  next: Match | undefined;
  last: Match | undefined;
  fallback: Match | undefined;
  isExact: boolean;
}

export function useMatch(): UseMatchResult {
  const matches = useContext(MatchesContext);
  const matchIndex = useContext(MatchIndexContext);

  const current = matches[matchIndex];
  const first = matches[0];
  const next = matches[matchIndex + 1];
  const last = matches.at(-1);
  const fallback = matches.findLast((x) => x.route?.elements._fallback);

  const isExact = Boolean(last?.route);

  return {
    current,
    first,
    next,
    last,
    fallback,
    isExact,
  };
}
