import type { ReactNode } from "react";

import type { Match } from "#lib/match/mod.js";
import { type Navigate, NavigateProvider } from "#lib/navigate/mod.js";
import { LocationProvider } from "#lib/location/mod.js";
import { MatchesProvider, MatchIndexProvider } from "#lib/match/context.js";

interface RootProps {
  navigate: Navigate;
  location: string;
  matches: Match[];
}

export function Root({ navigate, location, matches }: RootProps): ReactNode {
  return (
    <NavigateProvider value={navigate}>
      <LocationProvider value={location}>
        <MatchesProvider value={matches}>
          <MatchIndexProvider value={0}>
            {matches[0]?.route.elements._layout?.Root}
          </MatchIndexProvider>
        </MatchesProvider>
      </LocationProvider>
    </NavigateProvider>
  );
}
