import type { ReactNode } from "react";

import type { Match } from "#lib/match/match.js";
import { type Navigate, NavigateProvider } from "#lib/navigate/mod.js";
import { LocationProvider } from "#lib/location/mod.js";
import { MatchesProvider, MatchIndexProvider } from "#lib/match/context.js";
import { Outlet } from "#lib/outlet/outlet.js";
import { type RootParams, RootParamsProvider } from "./context.js";

interface RootProps {
  params: RootParams;
  navigate: Navigate;
  location: string;
  matches: Match[];
}

export function Root(props: RootProps): ReactNode {
  return (
    <RootParamsProvider value={props.params}>
      <NavigateProvider value={props.navigate}>
        <LocationProvider value={props.location}>
          <MatchesProvider value={props.matches}>
            <MatchIndexProvider value={-1}>
              {props.params.root ? <props.params.root /> : <Outlet />}
            </MatchIndexProvider>
          </MatchesProvider>
        </LocationProvider>
      </NavigateProvider>
    </RootParamsProvider>
  );
}
