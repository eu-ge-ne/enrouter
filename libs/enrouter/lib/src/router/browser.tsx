import { type ReactNode, useState, useCallback, useEffect } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { logger } from "#lib/debug.js";
import { match } from "#lib/match/match.js";
import { load } from "#lib/match/load.js";
import { NavigateProvider } from "./navigate.js";
import { LocationProvider } from "./location.js";
import { MatchProvider } from "#lib/match/context.js";
import { Root } from "./root.js";

const log = logger("router/browser");

export interface BrowserProps {
  routes: Route;
  matches: Match[];
}

export function Browser(props: BrowserProps): ReactNode {
  const [location, setLocation] = useState(window.location.pathname);
  const [matches, setMatches] = useState(props.matches);

  const navigate = useCallback(async (to: string) => {
    const matches = match({ routes: props.routes, location: to });
    await load(matches);

    window.history.pushState({}, "", to);

    setLocation(to);
    setMatches(matches);

    log("Navigated to %s", to);
  }, []);

  const handlePopState = useCallback(async (e: PopStateEvent) => {
    log("handlePopState %o", e);

    const to = window.location.pathname;
    const matches = match({ routes: props.routes, location: to });
    await load(matches);

    setLocation(to);
    setMatches(matches);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  return (
    <NavigateProvider value={navigate}>
      <LocationProvider value={location}>
        <MatchProvider value={matches[0]!}>
          <Root />
        </MatchProvider>
      </LocationProvider>
    </NavigateProvider>
  );
}
