import { createContext, useContext } from "react";

import type { Match } from "./mod.js";

const MatchContext = createContext<Match | undefined>(undefined);

export const MatchProvider = MatchContext.Provider;

export function useMatch(): Match | undefined {
  return useContext(MatchContext);
}
