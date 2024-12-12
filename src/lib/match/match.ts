import type { Route } from "#lib/route/mod.js";
import { getRouteTree } from "#lib/route/tree.js";
import { loadRoutes } from "#lib/route/load.js";

export interface Match {
  route?: Route;
  location: string;
  params: Record<string, string>;
}

export async function matchLocation(location: string): Promise<Match[]> {
  const matches: Match[] = [];

  let routes: Route[] | undefined = [getRouteTree()];

  while (routes) {
    const match = matchRoute(routes, location);

    routes = match?.route?.tree;

    if (match) {
      matches.push(match);
    }
  }

  await loadRoutes(matches.map((x) => x.route!));

  if (matches.at(-1)?.location !== location) {
    matches.push({ location, params: {} });
  }

  return matches;
}

function matchRoute(routes: Route[], location: string): Match | undefined {
  let matched = routes
    .map((route) => {
      const execs = route.test.pattern.exec(location);
      if (execs) {
        return { route, execs };
      }
    })
    .filter((x) => x !== undefined);

  if (matched.length === 0) {
    return;
  }

  // TODO: improve

  if (matched.length > 1) {
    matched = matched.filter((x) => x.route.test.keys.length === 0);
  }

  if (matched.length !== 1) {
    throw new Error("Found >1 match");
  }

  const { route, execs } = matched[0]!;

  return {
    route,
    location: execs[0] || "/",
    params: Object.fromEntries(
      route.test.keys.map((key, i) => [key, execs![i + 1]!] as const),
    ),
  };
}
