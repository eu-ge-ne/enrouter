import type { ReactNode } from "react";

import { MatchProvider, useMatch } from "#lib/match/context.js";
import { NotFound } from "#lib/notFound.js";

export interface OutletProps {
  name: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const { route, next, isFull } = useMatch();

  if (!isFull && !next) {
    return route.elements.notFound?.[name] ?? <NotFound />;
  }

  if (!next) {
    return route.elements.index?.[name];
  }

  return (
    <MatchProvider value={next}>
      {next.route.elements.layout?.[name]}
    </MatchProvider>
  );
}
