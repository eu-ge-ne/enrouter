import type { ReactNode } from "react";

import type { Match } from "#lib/match/mod.js";
import { MatchProvider } from "#lib/match/context.js";
import {
  type TRouterDynamicContext,
  RouterDynamicProvider,
} from "./context.js";
import { NavigateProvider, noNavigate } from "./navigate.js";
import { Root } from "./root.js";

export interface StaticProps {
  location: string;
  matches: Match[];
}

export function Static({ location, matches }: StaticProps): ReactNode {
  const dynamicContext: TRouterDynamicContext = {
    location,
  };

  return (
    <NavigateProvider value={noNavigate}>
      <RouterDynamicProvider value={dynamicContext}>
        <MatchProvider value={matches[0]!}>
          <Root />
        </MatchProvider>
      </RouterDynamicProvider>
    </NavigateProvider>
  );
}
