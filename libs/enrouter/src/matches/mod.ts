import { createLog } from "#log.js";

import type { RouteHandler } from "#handlers/mod.js";

const log = createLog("matches");

export interface RouteMatch {
  handler: RouteHandler;
  location: string;
  params: Record<string, string>;
  next?: RouteMatch;
}

interface MatchRoutesParams {
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

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i]!;
    match.next = matches[i + 1];
  }

  log("Matched routes %O", matches);

  return matches;
}

function recur(
  handlers: RouteHandler[],
  location: string,
  matches: RouteMatch[],
): void {
  let matchedHandlers = handlers
    .map((x) => [x, x.test?.pattern.exec(location)] as const)
    .filter((x): x is [RouteHandler, RegExpExecArray] => Boolean(x[1]));

  if (matchedHandlers.length === 0) {
    return;
  }

  // TODO: improve
  if (matchedHandlers.length > 1) {
    matchedHandlers = matchedHandlers.filter(
      (x) => x[0].test?.keys.length === 0,
    );
  }

  const [handler, results] = matchedHandlers[0]!;

  const params = Object.fromEntries(
    handler.test.keys.map((key, i) => {
      return [key, results![i + 1]!] as const;
    }),
  );

  matches.push({ handler, location: results[0] || "/", params });

  if (handler.tree) {
    recur(handler.tree, location, matches);
  }
}
