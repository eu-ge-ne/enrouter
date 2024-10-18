import { type ReactNode, useState, useCallback, useEffect } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { logger } from "#lib/debug.js";
import { match } from "#lib/match/match.js";
import { load } from "#lib/match/load.js";
import { render } from "#lib/match/render.js";
import {
  type TRouterDynamicContext,
  RouterStaticProvider,
  RouterDynamicProvider,
} from "./context.js";

const log = logger("router/browser");

export interface BrowserProps {
  routes: Route;
  matches: Match[];
}

export function Browser({
  routes,
  matches: initialMatches,
}: BrowserProps): ReactNode {
  const [dynamicContext, setDynamicContext] = useState<TRouterDynamicContext>({
    location: window.location.pathname,
    matches: initialMatches,
    children: render(initialMatches),
  });

  const navigate = useCallback(async (location: string) => {
    log("Navigating to %s", location);

    window.history.pushState({}, "", location);

    const matches = match({ routes, location });
    await load(matches);
    const children = render(matches);

    setDynamicContext({ location, matches, children });
  }, []);

  const handlePopState = useCallback(async (e: PopStateEvent) => {
    log("handlePopState %o", e);

    const location = window.location.pathname;
    const matches = match({ routes, location });
    await load(matches);
    const children = render(matches);

    setDynamicContext({ location, matches, children });
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  const staticContext = { routes, navigate };

  return (
    <RouterStaticProvider value={staticContext}>
      <RouterDynamicProvider value={dynamicContext}>
        {dynamicContext.children}
      </RouterDynamicProvider>
    </RouterStaticProvider>
  );
}
