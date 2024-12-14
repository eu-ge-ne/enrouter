import { useContext } from "react";

import type { Match } from "./match.js";
import { MatchesContext } from "./context.js";

export function useMatch(path: string): Match | undefined {
  return useContext(MatchesContext).find((x) => x.route?.path === path);
}
