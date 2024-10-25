import type { ReactNode } from "react";

import type { Match } from "#lib/match/mod.js";
import { NavigateProvider, noNavigate } from "#lib/navigate/mod.js";
import { LocationProvider } from "#lib/location/mod.js";
import { MatchProvider } from "#lib/match/context.js";
import { Root } from "./root.js";

export interface StaticRouterProps {
  location: string;
  match: Match | undefined;
}

export function StaticRouter({
  location,
  match,
}: StaticRouterProps): ReactNode {
  return (
    <NavigateProvider value={noNavigate}>
      <LocationProvider value={location}>
        <MatchProvider value={match}>
          <Root />
        </MatchProvider>
      </LocationProvider>
    </NavigateProvider>
  );
}
