import { type ReactNode, useState, useCallback, useEffect } from "react";

import type { Match } from "#lib/match/mod.js";
import { logger } from "#lib/debug.js";
import { matchLocation } from "#lib/match/location.js";
import { NavigateProvider } from "#lib/navigate/mod.js";
import { LocationProvider } from "#lib/location/mod.js";
import * as browser from "#lib/browser/mod.js";
import { Root } from "./root.js";

const log = logger("router/browser");

export interface BrowserRouterProps {
  matches: Match[];
}

export function BrowserRouter(props: BrowserRouterProps): ReactNode {
  const [location, setLocation] = useState(window.location.pathname);
  const [matches, setMatches] = useState(props.matches);

  const navigate = useCallback(async (to: string) => {
    let newMatches: Match[] = [];

    try {
      newMatches = await matchLocation(to);
    } catch (err) {
      log("matchLocation error %o", err);
    }

    setLocation(to);
    setMatches(newMatches);

    if (newMatches.length > 0) {
      browser.pushHistory(to);
    } else {
      browser.assignLocation(to);
    }

    log("Navigated to %s", to);
  }, []);

  const handlePopState = useCallback(async (e: PopStateEvent) => {
    log("handlePopState %o", e);

    const to = window.location.pathname;
    setLocation(to);

    setMatches(await matchLocation(to));
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  return (
    <NavigateProvider value={navigate}>
      <LocationProvider value={location}>
        <Root matches={matches} />
      </LocationProvider>
    </NavigateProvider>
  );
}
