import type { ReactNode } from "react";

import type { Match } from "./mod.js";
import { NotFound } from "./notFound.js";

export function renderMatches(matches: Match[]): ReactNode {
  const last = matches.at(-1);

  if (!last?.route) {
    return <NotFound />;
  }

  return Object.values(matches[0]?.elements?.layout ?? {})[0];
}
