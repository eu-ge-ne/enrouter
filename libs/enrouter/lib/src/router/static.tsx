import type { ReactNode } from "react";

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
  location: string;
  matches: Match[];
}

export function Static({ location, matches }: StaticProps): ReactNode {
  const staticContext: TRouterStaticContext = {
    navigate: () => {},
  };

  const dynamicContext: TRouterDynamicContext = {
    location,
  };

  return (
    <RouterStaticProvider value={staticContext}>
      <RouterDynamicProvider value={dynamicContext}>
        <MatchProvider value={matches[0]!}>
          <Root />
        </MatchProvider>
      </RouterDynamicProvider>
    </RouterStaticProvider>
  );
}
