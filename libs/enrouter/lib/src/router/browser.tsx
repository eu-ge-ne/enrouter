import { type ReactElement, type ReactNode, useState, useCallback, useEffect } from "react";

import type { Match } from "#lib/match/mod.js";
import { logger } from "#lib/debug.js";
import { matchLocation } from "#lib/match/location.js";
import { NavigateProvider } from "#lib/navigate/mod.js";
import { LocationProvider } from "#lib/location/mod.js";
import { MatchProvider } from "#lib/match/context.js";

const log = logger("router/browser");

export interface BrowserRouterProps {
  match: Match | undefined;
}

export function BrowserRouter(props: BrowserRouterProps): ReactNode {
  const [location, setLocation] = useState(window.location.pathname);
  const [match, setMatch] = useState(props.match);

  const navigate = useCallback(async (to: string) => {
    window.history.pushState({}, "", to);
    setLocation(to);

    setMatch(await matchLocation(to));

    log("Navigated to %s", to);
  }, []);

  const handlePopState = useCallback(async (e: PopStateEvent) => {
    log("handlePopState %o", e);

    const to = window.location.pathname;
    setLocation(to);

    setMatch(await matchLocation(to));
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  return (
    <NavigateProvider value={navigate}>
      <LocationProvider value={location}>
        <MatchProvider value={match}>
          {match?.route.elements._layout as ReactElement}
        </MatchProvider>
      </LocationProvider>
    </NavigateProvider>
  );
}
