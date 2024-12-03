import type { ReactNode, ReactElement } from "react";

import type { Match } from "#lib/match/match.js";
import { type Navigate, NavigateProvider } from "#lib/navigate/mod.js";
import { LocationProvider } from "#lib/location/mod.js";
import { MatchesProvider, MatchIndexProvider } from "#lib/match/context.js";
import { Outlet } from "#lib/outlet/outlet.js";
import { RootVoidProvider } from "./context.js";

interface RootProps {
  root?: ReactElement;
  void?: Record<string, ReactElement>;
  navigate: Navigate;
  location: string;
  matches: Match[];
}

export function Root({
  root,
  void: rootVoid,
  navigate,
  location,
  matches,
}: RootProps): ReactNode {
  return (
    <RootVoidProvider value={rootVoid}>
      <NavigateProvider value={navigate}>
        <LocationProvider value={location}>
          <MatchesProvider value={matches}>
            <MatchIndexProvider value={-1}>
              {root ?? <Outlet />}
            </MatchIndexProvider>
          </MatchesProvider>
        </LocationProvider>
      </NavigateProvider>
    </RootVoidProvider>
  );
}
