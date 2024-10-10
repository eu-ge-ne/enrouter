import { logger } from "#debug.js";

import type { RouteHandler } from "#handler/mod.js";

const log = logger("match");

export interface RouteMatch {
  handler: RouteHandler;

  location: string;
  isFull: boolean;
  params: Record<string, string>;

  next?: RouteMatch;
  last?: RouteMatch;
}

export interface MatchRoutesParams {
  handlers: RouteHandler;
  location: string;
}

export function matchRoutes({
  handlers,
  location,
}: MatchRoutesParams): RouteMatch[] {
  log("Matching routes for location %s", location);

  const matches: RouteMatch[] = [];

  recur([handlers], location, matches);

  const last = matches.at(-1);
  matches.forEach((x, i) => {
    x.next = matches[i + 1];
    x.last = last;
  });

  log("Matched routes: %o", matches);

  return matches;
}

function recur(
  handlers: RouteHandler[],
  location: string,
  matches: RouteMatch[],
): void {
  let matched = handlers
    .map((x) => [x, x.test?.pattern.exec(location)] as const)
    .filter((x): x is [RouteHandler, RegExpExecArray] => Boolean(x[1]));

  if (matched.length === 0) {
    return;
  }

  // TODO: improve
  if (matched.length > 1) {
    matched = matched.filter((x) => x[0].test?.keys.length === 0);
  }

  const [handler, results] = matched[0]!;

  const params = Object.fromEntries(
    handler.test.keys.map((key, i) => {
      return [key, results![i + 1]!] as const;
    }),
  );

  const matchedLocation = results[0] || "/";

  matches.push({
    handler,
    location: matchedLocation,
    isFull: matchedLocation === location,
    params,
  });

  if (handler.tree) {
    recur(handler.tree, location, matches);
  }
}
