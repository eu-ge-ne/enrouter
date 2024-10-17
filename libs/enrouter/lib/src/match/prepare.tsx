import type { ReactElement } from "react";

import type { Match } from "./mod.js";
import { loadRoutes } from "#lib/route/load.js";
import { MatchProvider } from "./context.js";

export async function prepareMatches(matches: Match[]) {
  await loadRoutes(matches.map((x) => x.route).filter((x) => x !== undefined));

  for (let i = matches.length - 1; i >= 0; i -= 1) {
    const match = matches[i]!;

    const wrap = (els?: Record<string, ReactElement>) =>
      els
        ? Object.fromEntries(
            Object.entries(els).map(([key, children]) => [
              key,
              <MatchProvider key={key} value={match}>
                {children}
              </MatchProvider>,
            ]),
          )
        : undefined;

    match.elements = {
      layout: wrap(match.route?.elements.layout),
      index: wrap(match.route?.elements.index),
      notFound: wrap(match.route?.elements.notFound),
    };
  }
}
