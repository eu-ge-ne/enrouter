import type { ReactNode } from "react";

import { MatchProvider, useMatch } from "#lib/match/context.js";
import { NotFound } from "#lib/notFound.js";

export interface OutletProps {
  name: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const { route, next } = useMatch();

  if (!next) {
    return route?.elements.index?.[name];
  }

  if (next.route) {
    return (
      <MatchProvider value={next}>
        {next.route.elements.layout?.[name]}
      </MatchProvider>
    );
  }
}
