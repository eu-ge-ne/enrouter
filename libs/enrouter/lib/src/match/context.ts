import { createContext, useContext } from "react";

import type { Match } from "./mod.js";

const MatchContext = createContext<Match | undefined>({
  route: {
    path: "",
    test: { keys: [], pattern: new RegExp("") },
    modules: [],
    loaded: false,
    elements: {},
  },
  full: false,
  location: "",
  params: {},
});

export const MatchProvider = MatchContext.Provider;

export function useMatch(): Match | undefined {
  return useContext(MatchContext);
}
