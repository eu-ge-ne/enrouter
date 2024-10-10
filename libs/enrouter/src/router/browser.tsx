import { useState, useCallback, useEffect, useMemo } from "react";

import { createLog } from "#log.js";
import { matchRoutes } from "#match/mod.js";
import { loadRouteMatches } from "#loader/match.js";
import { renderMatches } from "#render/mod.js";
import { RouterContext } from "./context.js";

import type { RouteHandler } from "#handler/mod.js";
import type { RouteModules } from "#modules.js";
import type { TRouterContext } from "./context.js";

const log = createLog("router/browser");

interface BrowserRouterProps {
  handlers: RouteHandler;
  modules: RouteModules;
}

export function BrowserRouter({ handlers, modules }: BrowserRouterProps) {
  const [location, setLocation] = useState(window.location.pathname);

  const handlePopState = useCallback((e: PopStateEvent) => {
    log("handlePopState %O", e);
    setLocation(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  const navigate = useCallback(async (to: string) => {
    log("Navigating to %O", to);

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
