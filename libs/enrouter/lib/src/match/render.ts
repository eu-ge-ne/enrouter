import type { ReactNode } from "react";

import type { Match } from "./mod.js";

export function renderMatches(matches: Match[]): ReactNode {
  return Object.values(matches[0]?.elements?.layout ?? {})[0];
}
