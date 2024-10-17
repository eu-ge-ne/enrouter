import {
  type ReactNode,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { logger } from "#lib/debug.js";
import { matchRoutes } from "#lib/match/match.js";
import { prepareMatches } from "#lib/match/prepare.js";
import {
  type StaticContext,
  type DynamicContext,
  StaticProvider,
  DynamicProvider,
} from "./context.js";

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
  const [dynamicContext, setDynamicContext] = useState<DynamicContext>({
    location: window.location.pathname,
    matches: m,
  });

  const navigate = useCallback(async (to: string) => {
    log("Navigating to %s", to);

    window.history.pushState({}, "", to);

    const mm = matchRoutes({ routes, location: to });
    await prepareMatches(mm);

    setDynamicContext({
      location: to,
      matches: mm,
    });
  }, []);

  const handlePopState = useCallback(async (e: PopStateEvent) => {
    log("handlePopState %o", e);

    const location = window.location.pathname;
    const mm = matchRoutes({ routes, location });
    await prepareMatches(mm);

    setDynamicContext({
      location,
      matches: mm,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  const staticContext: StaticContext = {
    routes,
    navigate,
    ctx,
  };

  const children = useMemo(
    () => Object.values(dynamicContext.matches[0]?.elements?.layout ?? {})[0],
    [dynamicContext.matches],
  );

  return (
    <StaticProvider value={staticContext}>
      <DynamicProvider value={dynamicContext}>{children}</DynamicProvider>
    </StaticProvider>
  );
}
