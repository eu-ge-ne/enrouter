import type { ReactNode } from "react";

import type { Match } from "./mod.js";

export function renderMatches(matches: Match[]): ReactNode {
  if (matches.length === 0) {
    throw new Error("No matches");
  }

  return matches[0]?.elements?.layout?.["Root"];
}
