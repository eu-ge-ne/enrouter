import type { ReactNode } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { render } from "#lib/match/render.js";
import { RouterStaticProvider, RouterDynamicProvider } from "./context.js";

export interface StaticProps {
  routes: Route;
  location: string;
  matches: Match[];
}

export function Static({ routes, location, matches }: StaticProps): ReactNode {
  const staticContext = {
    routes,
    navigate: () => {},
  };

  const dynamicContext = {
    location,
    matches,
    children: render(matches),
  };

  return (
    <RouterStaticProvider value={staticContext}>
      <RouterDynamicProvider value={dynamicContext}>
        {dynamicContext.children}
      </RouterDynamicProvider>
    </RouterStaticProvider>
  );
}
