import { useState, useCallback, useEffect, useMemo } from "react";

import { logger } from "#lib/debug.js";
import { matchRoutes } from "#lib/match/mod.js";
import { loadRouteMatches } from "#lib/loader/match.js";
import { renderMatches } from "#lib/render/mod.js";
import { RouterContext } from "./context.js";

import type { RouteHandler } from "#lib/handler/mod.js";
import type { RouteModules } from "#lib/modules.js";
import type { TRouterContext } from "./context.js";

const log = logger("router/browser");

export interface BrowserRouterProps {
  handlers: RouteHandler;
  modules: RouteModules;
}

export function BrowserRouter({ handlers, modules }: BrowserRouterProps) {
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

    const matches = matchRoutes({ handlers, location: to });
    await loadRouteMatches({ matches, modules });

    window.history.pushState({}, "", to);

    setLocation(to);
  }, []);

  const matches = useMemo(
    () => matchRoutes({ handlers, location }),
    [handlers, location],
  );

  const context = useMemo<TRouterContext>(
    () => ({
      handlers,
      location,
      navigate,
    }),
    [handlers, location, navigate],
  );

  const children = useMemo(() => renderMatches(matches), [matches]);

  return (
    <RouterContext.Provider value={context}>{children}</RouterContext.Provider>
  );
}
