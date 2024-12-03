import type { ReactNode, ComponentType } from "react";

import type { Match } from "#lib/match/match.js";
import { type Navigate, NavigateProvider } from "#lib/navigate/mod.js";
import { LocationProvider } from "#lib/location/mod.js";
import { MatchesProvider, MatchIndexProvider } from "#lib/match/context.js";
import { Outlet } from "#lib/outlet/outlet.js";
import { VoidProvider } from "./context.js";

interface RootProps {
  root?: ComponentType;
  void?: Record<string, ComponentType>;
  navigate: Navigate;
  location: string;
  matches: Match[];
}

export function Root(props: RootProps): ReactNode {
  return (
    <VoidProvider value={props.void}>
      <NavigateProvider value={props.navigate}>
        <LocationProvider value={props.location}>
          <MatchesProvider value={props.matches}>
            <MatchIndexProvider value={-1}>
              {props.root ? <props.root /> : <Outlet />}
            </MatchIndexProvider>
          </MatchesProvider>
        </LocationProvider>
      </NavigateProvider>
    </VoidProvider>
  );
}
