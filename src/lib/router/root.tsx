import type { ReactNode } from "react";

import type { Match } from "#lib/match/mod.js";
import { MatchesProvider, MatchIndexProvider } from "#lib/match/context.js";
//import { useRoot } from "#lib/match/hooks.js";

interface RootProps {
  matches: Match[];
}

export function Root({ matches }: RootProps): ReactNode {
  //const match = useRoot();

  let match: Match | undefined;

  for (let i = matches.length - 1; i >= 0; i -= 1) {
    if (matches[i]?.route.elements._layout?.Root) {
      match = matches[i];
    }
  }

  return (
    <MatchesProvider value={matches}>
      <MatchIndexProvider value={0}>
        {match?.route.elements._layout?.Root}
      </MatchIndexProvider>
    </MatchesProvider>
  );
}
