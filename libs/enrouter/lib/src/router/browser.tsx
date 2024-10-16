import { useState, useCallback, useEffect, useMemo } from "react";

import type { Route } from "#lib/route/mod.js";
import type { TRouterContext } from "./context.js";
import { logger } from "#lib/debug.js";
import { loadRoutes } from "#lib/route/load.js";
import { matchRoutes } from "#lib/match/match.js";
import { createContent } from "#lib/content/create.js";
import { RouterContext } from "./context.js";

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

    await loadRoutes(matches.map((x) => x.route));

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

  const children = useMemo(() => createContent(matches), [matches]);

  return (
    <RouterContext.Provider value={context}>{children}</RouterContext.Provider>
  );
}
