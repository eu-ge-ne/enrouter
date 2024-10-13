import { useState, useCallback, useEffect, useMemo } from "react";

import { logger } from "#lib/debug.js";
import { matchRoutes } from "#lib/match/mod.js";
import { loadRouteMatches } from "#lib/loader/match.js";
import { renderMatches } from "#lib/render/mod.js";
import { RouterContext } from "./context.js";

import type { Route } from "#lib/route/mod.js";
import type { TRouterContext } from "./context.js";

const log = logger("router/browser");

export interface BrowserRouterProps {
  routes: Route;
}

export function BrowserRouter({ routes }: BrowserRouterProps) {
  const [location, setLocation] = useState(window.location.pathname);

  const handlePopState = useCallback((e: PopStateEvent) => {
    log("handlePopState %o", e);
    setLocation(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  const navigate = useCallback(async (to: string) => {
    log("Navigating to %s", to);

    const matches = matchRoutes({ routes, location: to });
    await loadRouteMatches({ matches });

    window.history.pushState({}, "", to);

    setLocation(to);
  }, []);

  const matches = useMemo(
    () => matchRoutes({ routes, location }),
    [routes, location],
  );

  const context = useMemo<TRouterContext>(
    () => ({
      routes,
      location,
      navigate,
    }),
    [routes, location, navigate],
  );

  const children = useMemo(() => renderMatches(matches), [matches]);

  return (
    <RouterContext.Provider value={context}>{children}</RouterContext.Provider>
  );
}
