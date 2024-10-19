import { type ReactNode, useState, useCallback, useEffect } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { logger } from "#lib/debug.js";
import { match } from "#lib/match/match.js";
import { load } from "#lib/match/load.js";
import { MatchProvider } from "#lib/match/context.js";
import {
  type TRouterDynamicContext,
  RouterDynamicProvider,
} from "./context.js";
import { NavigateProvider } from "./navigate.js";
import { Root } from "./root.js";

const log = logger("router/browser");

export interface BrowserProps {
  routes: Route;
  matches: Match[];
}

export function Browser(props: BrowserProps): ReactNode {
  const [dynamicContext, setDynamicContext] = useState<TRouterDynamicContext>({
    location: window.location.pathname,
  });
  const [matches, setMatches] = useState(props.matches);

  const navigate = useCallback(async (location: string) => {
    log("Navigating to %s", location);

    window.history.pushState({}, "", location);

    const matches = match({ routes: props.routes, location });
    await load(matches);

    setDynamicContext({ location });
    setMatches(matches);
  }, []);

  const handlePopState = useCallback(async (e: PopStateEvent) => {
    log("handlePopState %o", e);

    const location = window.location.pathname;
    const matches = match({ routes: props.routes, location });
    await load(matches);

    setDynamicContext({ location });
    setMatches(matches);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  return (
    <NavigateProvider value={navigate}>
      <RouterDynamicProvider value={dynamicContext}>
        <MatchProvider value={matches[0]!}>
          <Root />
        </MatchProvider>
      </RouterDynamicProvider>
    </NavigateProvider>
  );
}
