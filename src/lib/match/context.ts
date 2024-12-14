import { createContext } from "react";

import type { Match } from "./match.js";

export const MatchesContext = createContext<Match[]>([]);
export const MatchIndexContext = createContext<number>(-1);

export const MatchesProvider = MatchesContext.Provider;
export const MatchIndexProvider = MatchIndexContext.Provider;
