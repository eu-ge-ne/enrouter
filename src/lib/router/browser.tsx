import { type ReactNode, useState, useCallback, useEffect } from "react";

import type { Match } from "#lib/match/mod.js";
import { logger } from "#lib/debug.js";
import { matchLocation } from "#lib/match/location.js";
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
    try {
      const newMatches = await matchLocation(to);

      setLocation(to);
      setMatches(newMatches);

      browser.pushHistory(to);

      log("Navigated to %s", to);
    } catch (err) {
      log("matchLocation error %o", err);

      browser.assignLocation(to);
    }
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

  return <Root navigate={navigate} location={location} matches={matches} />;
}
