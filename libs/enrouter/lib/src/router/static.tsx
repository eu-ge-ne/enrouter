import type { ReactNode } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { MatchProvider } from "#lib/match/context.js";
import {
  type TRouterStaticContext,
  type TRouterDynamicContext,
  RouterStaticProvider,
  RouterDynamicProvider,
} from "./context.js";
import { Root } from "./root.js";

export interface StaticProps {
  routes: Route;
  location: string;
  matches: Match[];
}

export function Static({ routes, location, matches }: StaticProps): ReactNode {
  const staticContext: TRouterStaticContext = {
    routes,
    navigate: () => {},
  };

  const dynamicContext: TRouterDynamicContext = {
    location,
    matches,
  };

  return (
    <RouterStaticProvider value={staticContext}>
      <RouterDynamicProvider value={dynamicContext}>
        <MatchProvider value={dynamicContext.matches[0]!}>
          <Root />
        </MatchProvider>
      </RouterDynamicProvider>
    </RouterStaticProvider>
  );
}
