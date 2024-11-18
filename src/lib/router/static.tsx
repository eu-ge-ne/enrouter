import type { ReactNode } from "react";

import type { Match } from "#lib/match/mod.js";
import { noNavigate } from "#lib/navigate/mod.js";
import { Root } from "./root.js";

export interface StaticRouterProps {
  location: string;
  matches: Match[];
}

export function StaticRouter({
  location,
  matches,
}: StaticRouterProps): ReactNode {
  return <Root navigate={noNavigate} location={location} matches={matches} />;
}
