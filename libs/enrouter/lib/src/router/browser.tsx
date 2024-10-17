import {
  type ReactNode,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import type { TRouterContext } from "./context.js";
import { logger } from "#lib/debug.js";
import { matchRoutes } from "#lib/match/match.js";
import { renderMatches } from "#lib/match/render.js";
import { RouterProvider } from "./context.js";

const log = logger("router/browser");

export interface BrowserRouterProps {
  routes: Route;
  matches: Match[];
  ctx?: unknown;
}

export function BrowserRouter({
  routes,
  matches: m,
  ctx,
}: BrowserRouterProps): ReactNode {
  const [location, setLocation] = useState(window.location.pathname);
  const [matches, setMatches] = useState(m);

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

    const mm = matchRoutes({ routes, location: to });
    await renderMatches(mm);

    window.history.pushState({}, "", to);

    setLocation(to);
    setMatches(mm);
  }, []);

  //TODO: useState
  const context = useMemo<TRouterContext>(
    () => ({
      routes,
      location,
      navigate,
      ctx,
    }),
    [routes, location, navigate, ctx],
  );

  const children = useMemo(
    () => Object.values(matches[0]?.elements?.layout ?? {})[0],
    [matches],
  );

  return <RouterProvider value={context}>{children}</RouterProvider>;
}
