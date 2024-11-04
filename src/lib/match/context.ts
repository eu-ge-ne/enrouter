import { createContext, useContext } from "react";

import type { Match } from "./mod.js";

const Context = createContext<Match | undefined>(undefined);

export const MatchProvider = Context.Provider;

export function useMatch(path?: string): Match | undefined {
  let match = useContext(Context);

  if (path) {
    match = match?.first;

    while (match) {
      if (match.route.path === path) {
        return match;
      }
      match = match.next;
    }
  }

  return match;
}
