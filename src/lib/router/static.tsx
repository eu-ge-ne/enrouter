import type { ReactNode, ComponentType } from "react";

import type { Match } from "#lib/match/match.js";
import { noNavigate } from "#lib/navigate/mod.js";
import { Root } from "#lib/root/root.js";

export interface StaticRouterProps {
  root?: ComponentType;
  void?: Record<string, ComponentType>;
  location: string;
  matches: Match[];
}

export function StaticRouter({
  root,
  void: v,
  location,
  matches,
}: StaticRouterProps): ReactNode {
  return (
    <Root
      params={{ root, void: v }}
      location={location}
      matches={matches}
      navigate={noNavigate}
    />
  );
}
