import {
  type ReactNode,
  type ComponentType,
  useState,
  useCallback,
  useEffect,
} from "react";

import { logger } from "#lib/debug.js";
import { type Match, matchLocation } from "#lib/match/match.js";
import * as browser from "#lib/browser/mod.js";
import { Root } from "#lib/root/root.js";

const log = logger("router/browser");

export interface BrowserRouterProps {
  root?: ComponentType;
  void?: Record<string, ComponentType>;
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

  return (
    <Root
      params={{ root: props.root, void: props.void }}
      navigate={navigate}
      location={location}
      matches={matches}
    />
  );
}
