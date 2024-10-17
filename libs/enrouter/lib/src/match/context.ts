import { createContext, useContext } from "react";

import type { Match } from "./mod.js";

const MatchContext = createContext<Match>({
  route: {
    path: "",
    test: { keys: [], pattern: new RegExp("") },
    modules: [],
    loaded: false,
    elements: {},
  },

  isFull: false,
  location: "",
  params: {},
});

export const MatchProvider = MatchContext.Provider;

export function useMatch(): Match {
  return useContext(MatchContext);
}
