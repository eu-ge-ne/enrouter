import type { ReactNode } from "react";

import { MatchProvider, useMatch } from "#lib/match/context.js";
import { NotFound } from "#lib/notFound.js";

export interface OutletProps {
  name: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const match = useMatch();
  if (!match) {
    return;
  }

  const { route, isFull, next } = match;

  if (!isFull && !next) {
    return route.elements.end?.[name] ?? <NotFound />;
  }

  if (!next) {
    return route.elements.index?.[name];
  }

  return (
    <MatchProvider value={next}>
      {next.route.elements.this?.[name]}
    </MatchProvider>
  );
}
