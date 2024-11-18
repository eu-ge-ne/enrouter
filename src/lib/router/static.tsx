import type { ReactNode } from "react";

import type { Match } from "#lib/match/mod.js";
import { NavigateProvider, noNavigate } from "#lib/navigate/mod.js";
import { LocationProvider } from "#lib/location/mod.js";
import { Root } from "./root.js";

export interface StaticRouterProps {
  location: string;
  matches: Match[];
}

export function StaticRouter({
  location,
  matches,
}: StaticRouterProps): ReactNode {
  return (
    <NavigateProvider value={noNavigate}>
      <LocationProvider value={location}>
        <Root matches={matches} />
      </LocationProvider>
    </NavigateProvider>
  );
}
