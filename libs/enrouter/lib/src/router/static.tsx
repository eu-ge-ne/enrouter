import type { ReactNode } from "react";

import type { Match } from "#lib/match/mod.js";
import { NavigateProvider, noNavigate } from "./navigate.js";
import { LocationProvider } from "./location.js";
import { MatchProvider } from "#lib/match/context.js";
import { Root } from "./root.js";

export interface StaticProps {
  location: string;
  matches: Match[];
}

export function Static({ location, matches }: StaticProps): ReactNode {
  return (
    <NavigateProvider value={noNavigate}>
      <LocationProvider value={location}>
        <MatchProvider value={matches[0]!}>
          <Root />
        </MatchProvider>
      </LocationProvider>
    </NavigateProvider>
  );
}
